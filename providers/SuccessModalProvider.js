import React, { useReducer } from "react";

export const SuccessModalContext = React.createContext();
const initialState = {
  isOpen: false,
  msg: "",
};

export const successModalActions = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
  SET_MSG: "SET_MSG",
};

const reducer = (successModalState, action) => {
  switch (action.type) {
    case successModalActions.OPEN_FORM:
      return (successModalState = { ...successModalState, isOpen: true });
    case successModalActions.CLOSE_FORM:
      return (successModalState = { ...successModalState, isOpen: false });
    case successModalActions.SET_MSG:
      return (successModalState = {
        ...successModalState,
        msg: action.payload,
      });
    default:
      break;
  }
};

const SuccessModalProvider = ({ children }) => {
  const [successModalState, dispatch] = useReducer(reducer, initialState);
  return (
    <SuccessModalContext.Provider value={{ successModalState, dispatch }}>
      {children}
    </SuccessModalContext.Provider>
  );
};

export default SuccessModalProvider;
