import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import style from "./Root.module.css";
import { useEffect } from "react";

const ErrorPage = ({ errorData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Error Page";
  }, []);

  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <main className={style.ErrorContainerMain}>
      {errorData && (
        <div className={style.ErrorContainer}>
          <img src={require(`../assets/errorPage/${errorData.image}`)} alt="" />
          <h2>{errorData.title}</h2>
          <p>{errorData.message}</p>
          {errorData.navigateButton && errorData.navigateTo && (
            <Button
              onClick={() => {
                navigate(errorData.navigateTo);
              }}
            >
              {errorData.navigateButton}
            </Button>
          )}
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      )}
    </main>
  );
};

export default ErrorPage;
