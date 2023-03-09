import React, { useReducer } from "react";

export const PlanFormContext = React.createContext();
const initialState = {
  isOpen: false,
  id: "",
  parent_plan_name: "",
  user_id: "",
  plan_id: "",
  plan_user: null,
};

export const planFormActions = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
  SET_ID: "SET_ID",
  SET_PARENT_NAME: "SET_PARENT_NAME",
  SET_PLAN_ID: "SET_PLAN_ID",
  SET_USER_ID: "SET_USER_ID",
  SET_PLAN_USER: "SET_PLAN_USER",
};

const reducer = (planFormState, action) => {
  switch (action.type) {
    case planFormActions.OPEN_FORM:
      return (planFormState = { ...planFormState, isOpen: true });
    case planFormActions.CLOSE_FORM:
      return (planFormState = { ...planFormState, isOpen: false });
    case planFormActions.SET_ID:
      return (planFormState = { ...planFormState, id: action.payload });
    case planFormActions.SET_PLAN_ID:
      return (planFormState = { ...planFormState, plan_id: action.payload });
    case planFormActions.SET_USER_ID:
      return (planFormState = {
        ...planFormState,
        user_id: action.payload,
      });
    case planFormActions.SET_PLAN_USER:
      return (planFormState = {
        ...planFormState,
        plan_user: action.payload,
      });
    case planFormActions.SET_PARENT_NAME:
      return (planFormState = {
        ...planFormState,
        parent_plan_name: action.payload,
      });

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
