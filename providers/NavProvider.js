import React, { useReducer } from "react";

export const NavContext = React.createContext();
const initialNavState = "";

export const navActions = {
  SET_ACTIVE: "SET_ACTIVE",
};

export const navStates = {
  overview: { name: "Overview", pageTitle: "Overview" },
  myPlans: { name: "My Plans", pageTitle: "Plans" },
  feeds: { name: "Feeds", pageTitle: "Feeds" },
  account: { name: "Account", pageTitle: "Account" },
  creatPlans: { name: "My Plans", pageTitle: "Create Plans" },
  transactionHisory: {
    name: "Transaction History",
    pageTitle: "Transaction History",
  },
};

export const pageTitles = {
  overview: "Overview",
  plans: "Plans",
  settings: "Settings",
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
