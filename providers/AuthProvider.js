import { getUserFromLocalStorage } from "api/config";
import React, { useState, useEffect, useReducer } from "react";
import { config } from "utils";

export const AuthContext = React.createContext("USER_INITIAL_STATE");

export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  APPEND_PROFILE: "APPEND_PROFILE",
  RESET_USER: "RESET_USER",
};

const initialUserState = {};

function setRedirect(redirect) {
  window.sessionStorage.setItem(config.key.redirect, redirect);
}

function getRedirect() {
  return window.sessionStorage.getItem(config.key.redirect);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(config.key.redirect);
}

const reducer = (user, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      localStorage.setItem(config.key.user, JSON.stringify(action.payload));
      return (user = action.payload);
    case userActions.LOGOUT:
      localStorage.clear();
      return (user = {});
    case userActions.RESET_USER:
      return (user = {});

    case userActions.APPEND_PROFILE:
      const newUser = { ...user, ...action.payload };
      localStorage.setItem(config.key.user, JSON.stringify(newUser));
      return (user = newUser);
    default:
      return user;
  }
};

// const localUser = getUserFromLocalStorage();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, dispatch] = useReducer(reducer, initialUserState);
  const [localUser, setLocalUser] = useState();

  useEffect(() => {
    setTimeout(() => {
      const localUser = getUserFromLocalStorage();
      setLocalUser(localUser);
    }, 500);
  }, []);

  useEffect(() => {
    if (localUser !== undefined) {
      if (!localUser || Object.keys(localUser).length === 0) {
        // dispatch({ type: userActions.RESET_USER });
        setLoading(false);
      } else if (!!localUser) {
        dispatch({ type: userActions.LOGIN, payload: localUser });
        setLoading(false);
      }
    }
  }, [localUser]);

  const value = {
    user,
    loading,
    setLoading,
    dispatch,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return (
    typeof window !== "undefined" && (
      <AuthContext.Provider value={value}>
        {/*  */}
        {children}
      </AuthContext.Provider>
    )
  );
};

export default AuthProvider;
