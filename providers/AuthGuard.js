import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "providers/AuthProvider";

const AuthGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      //auth is initialized and there is no user
      if (!user || Object.keys(user).length === 0) {
        // remember the page that user tried to access
        let redirect = router.route;

        if (redirect.includes("[plan]")) {
          if (!!router?.query?.plan) {
            redirect = redirect.replace("[plan]", router?.query?.plan);
          }
        }

        // redirect
        router.push("/auth/signin");
      }
    }
  }, [loading, router, user]);

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
