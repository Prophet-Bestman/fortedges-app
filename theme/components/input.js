export const inputStyle = {
  // style object for base or default style
  baseStyle: {
    field: {
      borderRadius: "30px",
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    md: {
      field: {
        h: "56px",
      },
    },
    sm: {
      field: { h: "48px" },
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: {
      field: {
        borderRadius: "4px",
        "::placeholder": {
          color: "#71879C",
        },
        px: "16px",
        fontWeight: "500",
        bg: "#00000005",
        borderColor: "#0000001A",
        borderWidth: "1px",
        color: "text.black",
        _focus: {
          ring: "none",
          borderColor: "app.primary",
          borderWidth: "2px",
        },
      },
    },
    error: {
      field: {
        borderRadius: "4px",
        "::placeholder": {
          color: "#71879C",
        },
        px: "16px",
        fontWeight: "500",
        bg: "#00000005",
        borderColor: "red",
        borderWidth: "1px",
        color: "text.black",
        _focus: {
          ring: "none",
          borderColor: "red",
          borderWidth: "2px",
        },
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
