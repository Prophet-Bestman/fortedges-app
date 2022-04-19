import React, { useReducer } from "react";

export const PlanContext = React.createContext({});
const initialPlanState = {};

export const planActions = {
  SET_PLAN: "SET_PLAN",
};

const reducer = (planState, action) => {
  switch (action.type) {
    case planActions.SET_PLAN:
      return (planState = action.payload);
  }
};

const PlanProvider = ({ children }) => {
  const [plan, dispatch] = useReducer(reducer, initialPlanState);

  return (
    <PlanContext.Provider value={{ plan, dispatch }}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
