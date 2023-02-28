import React, { useReducer } from "react";

export const NavContext = React.createContext();
const initialNavState = "";

export const navActions = {
  SET_ACTIVE: "SET_ACTIVE",
};

export const navStates = {
  overview: { name: "Overview", pageTitle: "Overview" },
  myPlans: { name: "My Plans", pageTitle: "Plans" },
  choosePlan: { name: "Choose a plan", pageTitle: "Choose a plan" },
  feeds: { name: "Feeds", pageTitle: "Feeds" },
  account: { name: "Account", pageTitle: "Account" },
  creatPlans: { name: "My Plans", pageTitle: "Create Plans" },
  planDetials: { name: "My Plans", pageTitle: "Plan Details" },
  transactionHisory: {
    name: "Transaction History",
    pageTitle: "Transaction History",
  },
  notifications: { name: "Notifications", pageTitle: "Notifications" },
  settings: {
    name: "Settings",
    pageTitle: "Settings",
  },

  dashboard: { name: "Dashboard", pageTitle: "Dashboard" },
  deposits: { name: "Deposits", pageTitle: "Deposits" },
  withdrawals: { name: "Withdrawals", pageTitle: "Withdrawals" },
  users: { name: "Users", pageTitle: "Users" },
  userDetails: { name: "Users" },
  addUser: { name: "Add User", pageTitle: "Add User" },
  idVerification: { name: "ID verification", pageTitle: "ID verification" },
  modeOfPayment: { name: "Mode of payment", pageTitle: "Mode of payment" },
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
