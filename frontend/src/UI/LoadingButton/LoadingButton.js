import { CircularProgress } from "@material-ui/core";
import styles from "./LoadingButton.module.css";
import Button from "../Button/Button";
const LoadingButton = ({
  text,
  className,
  style,
  onClick,
  loaderColor,
  isLoading,
  doNotScrollToTop,
  disabled,
  disabledColor,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className ? className : styles.btn} `}
      doNotScrollToTop={doNotScrollToTop}
      disabled={disabled}
      style={{ ...style, backgroundColor: disabledColor }}
    >
      {isLoading ? <CircularProgress style={{ color: loaderColor }} /> : text}
    </Button>
  );
};
export default LoadingButton;
