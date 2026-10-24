// actions.js

export const setMessage = (message, type, dontClose, time) => {
  return {
    type: "SET_MESSAGE",
    payload: { message, type, dontClose, time },
  };
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  };
};
