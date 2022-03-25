import React, { useReducer } from "react";

export const PlanFormContext = React.createContext();
const initialState = {
  isOpen: false,
};

export const planFormActions = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

const reducer = (planFormState, action) => {
  switch (action.type) {
    case planFormActions.OPEN_FORM:
      return (planFormState = { ...planFormState, isOpen: true });
    case planFormActions.CLOSE_FORM:
      return (planFormState = { ...planFormState, isOpen: false });

    default:
      break;
  }
};

const PlanFormProvider = ({ children }) => {
  const [planFormState, dispatch] = useReducer(reducer, initialState);
  return (
    <PlanFormContext.Provider value={{ planFormState, dispatch }}>
      {children}
    </PlanFormContext.Provider>
  );
};

export default PlanFormProvider;
