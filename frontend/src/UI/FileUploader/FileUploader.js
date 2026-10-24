import React, { useRef, useState } from "react";
import style from "./FileUploader.module.css"; // Assuming you have a CSS module for styling

const CustomFileUploader = ({
  onChange,
  buttonText,
  acceptedFileType,
  mandatory,
}) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && acceptedFileType.includes(file.type) && file.size <= 5242880) {
      // 5MB limit (5 * 1024 * 1024)
      onChange(file);
      setFileName(file.name); // Set the uploaded file name
      setFileSize(file.size); // Set the uploaded file size
    } else {
      // Handle invalid file type or size
      // console.log("Invalid file type or size");
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={`${style.inputContainer} `} style={{ width: "100%" }}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept={acceptedFileType.join(",")}
      />
      <button className={style.uploadButton} onClick={handleButtonClick}>
        <span className={`${fileName ? style.transition : style.placeholder}`}>
          {buttonText}
          <span style={{ color: "red" }}>&nbsp;{mandatory && "*"}</span>
        </span>
        <div className={style.fileNameAndSize}>
          <span style={{ color: fileName ? "#000" : "#a7a7a7" }}>
            {fileName && fileName} &nbsp;{" "}
            {fileSize && ` (${(fileSize / 1024).toFixed(2)} KB)`}
          </span>
        </div>
        <img
          src={require(`../../assets/login-signup/uploadIcon.png`)}
          alt="Upload Icon"
          className={style.uploadIcon}
        />
      </button>
    </div>
  );
};

export default CustomFileUploader;
