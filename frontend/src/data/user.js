import { useSelector } from "react-redux";
import { Devops } from "./EdutechCourses/DevopsData/Devops";
import { JavaFullStackCourse } from "./EdutechCourses/JavaFullStackData/JavaFullStack";
import { useEffect } from "react";
import { url } from "../constants";
import useHttpsAxios from "../hooks/use-httpsAxios";

// export const user = {
//   id: 1,
//   name: "Kattula Pavan Kumar",
//   email: "pavan49450@gmail.com",
//   role: "student",
//   image: "profilePic.png",
//   joinOn: "02/03/2024",
//   mobileNumber: "8945612378",
//   enrolledCourses: [],
// };

// const UserDataComponent = () => {
//   const userId = useSelector((state) => state.login.userId);
//   const { sendRequest, responseData, statusCode, isLoading } = useHttpsAxios();

//   // const userDataFromRedux = useSelector((state) => state.userData.userData);

//   // const dispatch = useDispatch();

//   useEffect(() => {
//     if (userId && userId !== null) {
//       sendRequest({
//         url: `${url.backendBaseUrl}/vrpi-user/get-user-details/${userId}`,
//         headers: { "Content-Type": "application/json", Accept: "*/*" },
//       });
//     }
//   }, [userId, sendRequest]);

//   const MandatoryCertificatesData = [
//     {
//       title: "Income Certificate",
//       note: "Note: Upload Income Certificate which is valid for a period of 1 year from the date of issue.",
//       uploadedAreNot: responseData && (responseData.user.incomeCert || false),
//     },
//     {
//       title: "Aadhaar Card (Front)",
//       note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
//       uploadedAreNot: responseData && (responseData.user.aadharFront || false),
//     },
//     {
//       title: "Aadhaar Card (Back)",
//       note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
//       uploadedAreNot: responseData && (responseData.user.aadharBack || false),
//     },
//     {
//       title: "Passport Size photo",
//       note: "Note: Upload your Passport size Photo of size 5MB and can be of png.,jpeg., pdf.",
//       uploadedAreNot: responseData && (responseData.user.profilePic || false),
//     },
//   ];

//   // Calculate number of uploaded certificates
//   const uploadedCertificates = MandatoryCertificatesData.filter(
//     (certificate) => certificate.uploadedAreNot
//   ).length;

//   // Calculate number of certificates needed to upload
//   const certificatesToUpload =
//     MandatoryCertificatesData.length - uploadedCertificates;

//   const userData = {
//     user: responseData && responseData.user,
//     MandatoryCertificatesData,
//     uploadedCertificates,
//     certificatesToUpload,
//     // enrolledCourses:
//     //   responseData && responseData.courseList ? responseData.courseList : [],
//     educationalDetails: responseData && responseData.educationDetails,
//     courseList: responseData?.courseList && responseData.courseList,
//     allDocAreUploaded:
//       responseData &&
//       (responseData.user.incomeCert || false) &&
//       (responseData.user.aadharFront || false) &&
//       (responseData.user.aadharBack || false) &&
//       (responseData.user.profilePic || false),
//   };

//   // useEffect(() => {
//   //   if (userId && userId !== null) {
//   //     if (statusCode === 200) {
//   //       dispatch(
//   //         loginWithUserData({
//   //           userData: userData,
//   //           isLoading: isLoading,
//   //         })
//   //       );
//   //     }
//   //   }
//   // }, [userId, statusCode]);

//   useEffect(() => {
//     if (userId && userId !== null) {
//       if (statusCode === 200) {
//         // console.log("userData1", userDataFromRedux);
//         console.log(
//           "userData2",
//           responseData.courseList
//           // responseData && (responseData.educationalDetails || null)
//           // responseData.educationDetails
//           // userData
//         );
//       }
//     }
//   }, [userId, statusCode]);
//   return {
//     userData: userData,
//     isLoading: isLoading,
//   };
// };

import { useDispatch } from "react-redux";
import { loginWithUserData, logout } from "../store/LoginStateActions";

const UserDataComponent = (shouldFetch = false) => {
  const userId = useSelector((state) => state.login.userId);
  const reduxUserData = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();

  const { sendRequest, responseData, isLoading, error } =
    useHttpsAxios();

  useEffect(() => {
    if (shouldFetch && userId && (!reduxUserData || !reduxUserData.user)) {
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/get-user-details/${userId}`,
        headers: { "Content-Type": "application/json", Accept: "*/*" },
      });
    }
  }, [userId, sendRequest, shouldFetch, reduxUserData]);

  useEffect(() => {
    if (responseData?.user) {
      const MandatoryCertificatesData = [
        {
          title: "Income Certificate",
          note: "Note: Upload Income Certificate which is valid for a period of 1 year from the date of issue.",
          uploadedAreNot: responseData.user.incomeCert || false,
        },
        {
          title: "Aadhaar Card (Front)",
          note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
          uploadedAreNot: responseData.user.aadharFront || false,
        },
        {
          title: "Aadhaar Card (Back)",
          note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
          uploadedAreNot: responseData.user.aadharBack || false,
        },
        {
          title: "Passport Size photo",
          note: "Note: Upload your Passport size Photo of size 5MB and can be of png.,jpeg., pdf.",
          uploadedAreNot: responseData.user.profilePic || false,
        },
      ];

      const uploadedCertificates = MandatoryCertificatesData.filter(
        (certificate) => certificate.uploadedAreNot
      ).length;

      const certificatesToUpload =
        MandatoryCertificatesData.length - uploadedCertificates;

      const newUserData = {
        user: responseData.user,
        MandatoryCertificatesData,
        uploadedCertificates,
        certificatesToUpload,
        educationalDetails: responseData.educationDetails,
        courseList: responseData.courseList || [],
        allDocAreUploaded:
          responseData.user.incomeCert &&
          responseData.user.aadharFront &&
          responseData.user.aadharBack &&
          responseData.user.profilePic,
      };
      
      dispatch(loginWithUserData(newUserData));
    }
  }, [responseData, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  const activeUserData = reduxUserData?.user ? reduxUserData : null;

  return {
    userData: activeUserData,
    isLoading: shouldFetch ? isLoading : false,
    error: error,
  };
};

// export const SaveUserDataInRedux = () => {
//   const userData = UserDataComponent();
//   console.log(userData);
// };

// export const UserData = GetUserById();

export const user = {
  id: 1,
  name: "Kattula Pavan Kumar",
  email: "pavan49450@gmail.com",
  role: "student",
  image: "profilePic.png",
  joinOn: "02/03/2024",
  gender: "male",
  occupation: "student",
  DOB: "2000-09-02",
  mobileNumber: "8945612378",
  enrolledCourses: [JavaFullStackCourse, Devops],
  joinedDate: "2024-03-12",
  active: true,
  incomeCertificate: "true",
  aadharCardFront: "true",
  address: "12-13/1 , Shiv bhag colony , Hyderabad, Telangana, 500090",
  // aadharCardFront:'true',
  educationalDetails: {
    DegreeIn: "Bachelor’s of Engineering",
    InstituteName: "Stanley college of Engineering & Technology for Women",
    InstituteLocation: "Hyderabad",
    startYear: "2017",
    endYear: "2021",
    grade: "8.5",
  },
};

export const MandatoryCertificatesData = [
  {
    title: "Income Certificate",
    note: "Note: Upload Income Certificate which is valid for a period of 1 year from the date of issue.",
    // uploadedAreNot: responseData?.incomeCertificate || false,
    uploadedAreNot: false,
  },
  {
    title: "Aadhaar Card (Front)",
    note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
    uploadedAreNot: false,
  },
  {
    title: "Aadhaar Card (Back)",
    note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
    uploadedAreNot: false,
  },
  {
    title: "Passport Size photo",
    note: "Note: Upload your Passport size Photo of size 5MB and can be of png.,jpeg., pdf.",
    uploadedAreNot: false,
  },
];

export default UserDataComponent;
