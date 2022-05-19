import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, userActions } from "providers/AuthProvider";

const AuthGuard = ({ children }) => {
  const { user, loading, setRedirect, redirect } = useContext(AuthContext);
  const router = useRouter();

  const [userState, setUserState] = useState("");

  useEffect(() => {
    if (!loading) {
      //auth is initialized and there is no user
      if (!user || Object.keys(user).length === 0) {
        // remember the page that user tried to access
        setRedirect(router.route);
        setUserState("UnAuthenticated");

        // redirect
        router.push("/auth/signin");
      }
    }
  }, [loading, router, user, setRedirect]);

  /* show loading indicator while the auth provider is still loading */
  if (loading) {
    return <h1>Application Loading</h1>;
  }

  // if auth initialized with a valid user show protected page
  // if (!loading) {
  //   return <>{children}</>;
  // }
  if (!loading && Object.keys(user).length !== 0) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
