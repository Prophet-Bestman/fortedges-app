export const buttonStyle = {
  // style object for base or default style
  baseStyle: {
    rounded: "full",

    fontWeight: "500",
    _focus: {
      outline: 0,
      ring: "none",
    },
    _active: {
      outline: 0,
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    lg: {
      w: "327px",
      h: "64px",
    },
    md: {
      w: "200px",
      h: "56px",
    },
    sm: {
      w: "120px",
      h: "40px",
    },
    icon: {
      w: "54px",
      h: "54px",
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "app.primary",
      color: "white",
      _hover: {
        bg: "app.primary_hover",
      },
    },
    secondary: {
      bg: "#F1F2F4",
      color: "text.black",
      _hover: {
        bg: "#F1F2F4",
      },
    },

    outline: {
      bg: "#00000000",
      color: "app.primary",
      borderWidth: "2px",
      borderColor: "app.primary",
      _hover: {
        bg: "#00000000",
        borderColor: "app.primary_hover",
        color: "app.primary_hover",
      },
    },
    green: {
      bg: "#449562",
      color: "white",
      _hover: {
        bg: "#338541",
      },
    },
    yellow: {
      bg: "#F0B263",
      color: "white",
      _hover: {
        bg: "#e0a320",
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
    size: "lg",
  },
};
