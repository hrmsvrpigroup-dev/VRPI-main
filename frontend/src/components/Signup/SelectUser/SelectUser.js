import { useState } from "react";
import Button from "../../../UI/Button/Button";
import style from "./SelectUser.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/UserSlice";

const users = [
  {
    userRole: "student",
    userName: "Student",
    description:
      "Looking for Knowledge Hub Programs of VR PI Group of Companies",
    image: "student.png",
  },
  {
    userRole: "client",
    userName: "Client",

    description: "Looking for Company Services of VR PI Group of Companies",
    image: "client.png",
  },
];

const SelectUser = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const dispatch = useDispatch();

  return (
    <div className={style.container}>
      <div className={style.head}>
        <h1>Who you are?</h1>
        <p>Please select a role</p>
      </div>
      <div className={style.users}>
        {users.map((user, index) => (
          <div
            className={`${style.user} ${
              user.userRole === selectedRole && style.selected
            }`}
            key={index}
            onClick={() => setSelectedRole(user.userRole)}
            // style={{}}
          >
            <img
              src={require(`../../../assets/SelectUser/${user.image}`)}
              alt="student welcome pic"
            />
            <h2>I'm a {user.userName}</h2>
            <p>{user.description}</p>
          </div>
        ))}
      </div>
      <Button
        disabled={!selectedRole}
        onClick={() => {
          dispatch(setUser({ role: selectedRole, step: 1 }));
        }}
        className={`${style.continueBtn} ${
          selectedRole !== "" && style.btnActive
        }`}
      >
        Continue
      </Button>
    </div>
  );
};

export default SelectUser;
