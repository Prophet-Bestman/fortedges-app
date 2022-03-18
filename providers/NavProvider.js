import React, { useReducer } from "react";

export const NavContext = React.createContext();
const initialNavState = "";

export const navActions = {
  SET_ACTIVE: "SET_ACTIVE",
};

export const navStates = {
  overview: "Overview",
  myPlans: "My Plans",
  feeds: "Feeds",
  account: "Account",
};

const reducer = (navState, action) => {
  switch (action.type) {
    case navActions.SET_ACTIVE:
      return (navState = action.payload);
  }
};

const NavProvider = ({ children }) => {
  const [navState, dispatch] = useReducer(reducer, initialNavState);
  return (
    <NavContext.Provider value={{ navState, dispatch }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
