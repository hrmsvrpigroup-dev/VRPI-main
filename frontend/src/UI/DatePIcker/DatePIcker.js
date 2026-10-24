import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import style from "./DatePIcker.module.css";
import "./DatePickerMain.css";

const CustomDatePicker = ({
  selectedDate,
  onChange,
  className,
  placeholderText,
  mandatory,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const datePickerRef = useRef(null);

  const handleLabelClick = () => {
    setIsFocused(true);
    datePickerRef.current.input.focus();
    // datePickerRef.current.setOpen(true);
    // datePickerRef.current.click();
  };

  const handleDatePickerBlur = () => {
    setIsFocused(false);
  };

  // Function to format the date as "yyyy-MM-dd"

  return (
    <div className={style.container}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className={`${className} ${style.date}`}
        onFocus={handleLabelClick}
        onBlur={handleDatePickerBlur}
        customInput={<input />}
        ref={datePickerRef}
      />
      <label
        className={`${
          isFocused || selectedDate ? style.transition : style.placeholder
        }`}
        onClick={() => setIsFocused(true)}
      >
        {placeholderText}{" "}
        {mandatory && <span style={{ color: "red" }}>&nbsp;*</span>}
      </label>
      <span className={style.format}>yyyy-mm-dd</span>
    </div>
  );
};

export default CustomDatePicker;
