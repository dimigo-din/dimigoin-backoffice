// "use client";

// import React from "react";

// export type themeType = "light" | "dark";
// function getInitialColorMode() {
//   if (typeof window === "undefined") return "light";
//   const persistedColorPreference =
//     typeof window.localStorage.getItem("color-mode");
//   const hasPersistedPreference = typeof persistedColorPreference === "string";
//   if (hasPersistedPreference) {
//     return persistedColorPreference;
//   }

//   const mql = window.matchMedia("(prefers-color-scheme: dark)");
//   const hasMediaQueryPreference = typeof mql.matches === "boolean";
//   if (hasMediaQueryPreference) {
//     return mql.matches ? "dark" : "light";
//   }

//   return "light";
// }

// export const ThemeContext = React.createContext({
//   colorMode: "light",
//   setColorMode: (value: themeType) => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [colorMode, rawSetColorMode] = React.useState(getInitialColorMode);
//   const setColorMode = (value: themeType) => {
//     rawSetColorMode(value);
//     window.localStorage.setItem("color-mode", value);
//   };
//   return (
//     <ThemeContext.Provider value={{ colorMode, setColorMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
