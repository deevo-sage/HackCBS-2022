import { Theme } from "@react-navigation/native";
import { extendTheme } from "native-base";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
export const colors = {
  brand: {
    bg: "#0B132B",
    foreground: "#3A506B",
    mute: "#122C43",
    highlight: "#6FFFE9",
  },
};
// extend the theme
export const theme = extendTheme({
  config,
  colors,
  components: {
    Text: { defaultProps: { fontSize: "xs", fontFamily: "poppins" } },
    Button: {
      baseStyle: {},
      defaultProps: {
        h: 12,
        bg: "brand.highlight",
        borderColor: "brand.highlight",
      },
    },
    Input: {
      defaultProps: {
        h: "12",
        fontFamily: "space-mono",
        fontSize: "xs",
        borderColor: "brand.mute",
        placeholderTextColor: "brand.foreground",
      },
    },
  },
});
export const navigationTheme: Theme = {
  dark: true,
  colors: {
    background: colors.brand.bg,
    border: colors.brand.mute,
    card: colors.brand.mute,
    notification: colors.brand.bg,
    text: "white",
    primary: colors.brand.highlight,
  },
};
