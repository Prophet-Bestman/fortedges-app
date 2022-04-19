import React, { useReducer } from "react";

export const FetchedUserContext = React.createContext();
const initialPlanState = {};

export const planActions = {
  SET_FETCHED_USER: "SET_FETCHED_USER",
};

const reducer = (fetchedUserState, action) => {
  switch (action.type) {
    case planActions.SET_FETCHED_USER:
      return (fetchedUserState = action.payload);
  }
};

const FetchedUserProvider = ({ children }) => {
  const [fetchedUser, dispatch] = useReducer(reducer, initialPlanState);

  return (
    <FetchedUserContext.Provider value={{ fetchedUser, dispatch }}>
      {children}
    </FetchedUserContext.Provider>
  );
};

export default FetchedUserProvider;
