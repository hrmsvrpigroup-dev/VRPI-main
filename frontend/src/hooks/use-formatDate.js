export default function useFormatDate(dateString) {
  // Parse the input date string
  const dateObj = new Date(dateString);

  // Extract year, month, and day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format the date in 'YYYY-MM-DD' format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
