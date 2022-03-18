import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import "@fontsource/dm-sans";
import "@fontsource/coustard";
import NavProvider from "providers/NavProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NavProvider>
        <Component {...pageProps} />
      </NavProvider>
    </ChakraProvider>
  );
}

export default MyApp;
