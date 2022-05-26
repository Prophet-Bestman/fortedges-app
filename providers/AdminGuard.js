import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "providers/AuthProvider";

const AdminGuard = ({ children }) => {
  const { user, loading, setRedirect } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      //auth is initialized and there is no user
      if (!user || Object.keys(user).length === 0) {
        // remember the page that user tried to access

        let redirect = router.route;

        if (redirect.includes("[user]")) {
          if (!!router?.query?.user) {
            redirect = redirect.replace("[user]", router?.query?.user);
          }
        }
        setRedirect(redirect);

        // redirect
        router.push("/admin/auth/signin");
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

export default AdminGuard;
