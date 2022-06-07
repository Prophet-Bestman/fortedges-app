import { extendTheme } from "@chakra-ui/react";
import foundations from "./foundations";
import components from "./components";
import styles from "./styles";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "Ubassets",
};

const overrides = {
  config,
  styles,
  ...foundations,
  components,
};

const theme = extendTheme(overrides);

export default theme;
