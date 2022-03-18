import React, { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MainLayout } from "components/layouts";
import Head from "next/head";
import { navActions, NavContext, navStates } from "providers/NavProvider";

export default function Home() {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({ type: navActions.SET_ACTIVE, payload: navStates.overview });
  }, []);

  return (
    <div className="">
      <Head>
        <title>Fortedges | App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Box minH="100vh"></Box>
      </MainLayout>
    </div>
  );
}
