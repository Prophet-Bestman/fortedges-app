import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import "@fontsource/dm-sans";
import "@fontsource/coustard";
import NavProvider from "providers/NavProvider";
import { AuthLayout, MainLayout } from "components/layouts";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {Component.requireAuth ? (
        <NavProvider>
          <MainLayout>
            <Component {...pageProps} />
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
