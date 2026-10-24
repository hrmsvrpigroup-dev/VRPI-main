// reducer.js

const initialState = {
  message: "",
  type: "",
  dontClose: false,
  time: 4,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        dontClose: action.payload.dontClose,
        time: action.payload.time,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: "",
        type: "",
        dontClose: false,
        time: 4,
      };
    default:
      return state;
  }
};

export default messageReducer;
