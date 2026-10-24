// reducer.js

import { LOGIN, LOGINDA, LOGOUT } from "./LoginStateActions";

const initialUserState = {
  isVRPIUserLoggedIn: localStorage.getItem("isVRPIUserLoggedIn") === "true",
  userId: localStorage.getItem("userId"),
};

const initialUserDataState = {
  userData: {
    userData: {
      user: null,
      MandatoryCertificatesData: null,
      uploadedCertificates: 0,
      certificatesToUpload: 4,
      enrolledCourses: [],
      educationalDetails: null,
    },
    isLoading: false,
  },
};

const UserStateReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("isVRPIUserLoggedIn", "true");
      localStorage.setItem("userId", action.payload.userId);
      return {
        ...state,
        isVRPIUserLoggedIn: true,
        userId: action.payload.userId,
      };
    case LOGOUT:
      localStorage.setItem("isVRPIUserLoggedIn", "false");
      localStorage.removeItem("userId");
      return {
        ...state,
        isVRPIUserLoggedIn: false,
        userId: null,
      };
    default:
      return state;
  }
};

const UserDataStateReducer = (state = initialUserDataState, action) => {
  switch (action.type) {
    case LOGINDA:
      // localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      return {
        ...state,
        userData: action.payload.userData,
      };
    case LOGOUT:
      // localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export { UserStateReducer, UserDataStateReducer };
