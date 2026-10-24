import style from "./PasswordValidationBox.module.css";

const PasswordValidationBox = ({ enteredPassword }) => {
  return (
    <div className={style.passwordValidationContainer}>
      {[
        {
          condition: enteredPassword.length >= 8,
          message: "Password must be 8 Characters long",
        },
        {
          condition: /[A-Z]/.test(enteredPassword),
          message: "Should contain at least one Capital letter",
        },
        {
          condition: /[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword),
          message: "Should contain one Special character",
        },
        {
          condition: /\d/.test(enteredPassword),
          message: "Should contain one Numeric digit",
        },
      ].map((item, index) => (
        <div key={index} className={style.passwordValidation}>
          <ValidatePasswordFunction validate={item.condition} />
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidationBox;

const ValidatePasswordFunction = ({ validate }) => (
  <img
    src={require(`../../../assets/login-signup/${
      validate ? "correct.png" : "wrong.png"
    }`)}
    alt=""
  />
);
