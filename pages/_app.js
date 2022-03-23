import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "../theme";
import "@fontsource/dm-sans";
import "@fontsource/coustard";
import NavProvider from "providers/NavProvider";
import { AuthLayout, MainLayout } from "components/layouts";
import { PremiumPlan } from "components/plansModals";

function MyApp({ Component, pageProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      {Component.requireAuth ? (
        <NavProvider>
          <MainLayout>
            <Component {...pageProps} />
            <PremiumPlan onClose={onClose} onOpen={onOpen} isOpen={true} />
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
