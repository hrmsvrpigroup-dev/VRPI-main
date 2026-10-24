const GetCurrentDate = () => {
  const currentDate = new Date();

  // Get the current year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the current hour, minute, and second
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minute = String(currentDate.getMinutes()).padStart(2, "0");
  const second = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  return formattedDateTime;
};

export default GetCurrentDate;
