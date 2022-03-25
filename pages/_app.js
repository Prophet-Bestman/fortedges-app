import { ChakraProvider, ModalContent, useDisclosure } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import "@fontsource/dm-sans";
import "@fontsource/coustard";
import NavProvider from "providers/NavProvider";
import { AuthLayout, MainLayout } from "components/layouts";
import PlanFormProvider from "providers/PlanFormProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {Component.requireAuth ? (
        <NavProvider>
          <MainLayout>
            <PlanFormProvider>
              <Component {...pageProps} />
            </PlanFormProvider>
          </MainLayout>
        </NavProvider>
      ) : (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
