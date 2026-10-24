import { useSelector } from "react-redux";
import styles from "./StudentDetails.module.css";

const StudentDetails = ({ user, educationalDetails }) => {
  // Define default values for each section if user data is undefined

  const userId = useSelector((state) => state.login.userId);

  const defaultPersonalDetails = {
    title: "Personal Details",
    content: [
      {
        title: "Name",
        content: `${user?.firstName || ""} ${user?.lastName || "No data"}`,
      },
      {
        title: "Date of Birth",
        content: user?.dateOfBirth || "No data",
      },
      {
        title: "Gender",
        content: user?.gender || "No data",
      },
      {
        title: "Occupation",
        content: user?.occupation || "No data",
      },
    ],
  };

  const defaultEducationalDetails = {
    title: "Education details",
    content: educationalDetails
      ? [
          {
            title: "Education level",
            content: educationalDetails.educationLevel || "No data",
          },
          {
            title: "Degree in",
            content: educationalDetails.degree || "No data",
          },
          {
            title: "Institute Name",
            content: educationalDetails.institutionName || "No data",
          },
          {
            title: "Institute Location",
            content: educationalDetails.instituteLocation || "No data",
          },
          {
            title: "Start Year",
            content: educationalDetails.startDate || "No data",
          },
          {
            title: "End Year",
            content: educationalDetails.endDate || "No data",
          },
          {
            title: "Percentage/ CGPA",
            content: educationalDetails.grade || "No data",
          },
        ]
      : [
          {
            title: "",
            content: "No educational data available",
            type: "onData",
          },
        ],
  };

  const defaultAccountDetails = {
    title: "Account Details",
    content: [
      {
        title: "Profile ID",
        content: userId || "No data",
      },
      // {
      //   title: "Date Joined",
      //   content: user?.joinedDate || "No data",
      // },
      {
        title: "Email",
        content: user?.email || "No data",
      },
    ],
  };

  // Combine default values with user-provided values
  const AllDetails = [
    defaultPersonalDetails,
    defaultEducationalDetails,
    defaultAccountDetails,
  ];

  return (
    <div className={styles.detailsContainer}>
      {AllDetails.map((details, index) => (
        <div key={index} className={styles.detailsCard}>
          <h2>{details.title}</h2>
          {details.content.map((detail, index) => (
            <div key={index} className={styles.eachContent}>
              <p className={styles.contentTitle}>
                {detail.title}
                {detail.type ? "" : ":"}&nbsp;
              </p>
              <p className={styles.contentData}>{detail.content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StudentDetails;
