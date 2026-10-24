// actions.js

export const LOGIN = "LOGINID";
export const LOGINDA = "LOGINDA";
export const LOGOUT = "LOGOUT";

export const loginWithUserId = (userId) => ({
  type: LOGIN,
  payload: {
    userId,
  },
});
export const loginWithUserData = (userData) => ({
  type: LOGINDA,
  payload: {
    userData,
  },
});

export const logout = () => ({
  type: LOGOUT,
});
