// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'
import "./index.css";
import { router } from "./routers/index";
import { RouterProvider } from "react-router-dom";
import React from "react";
// import "@/assets/scss/app.scss";
// import "./main.css";
// import theme from "@/common/theme";
// import { store } from "@/store/index.ts";
// import { ThemeProvider } from "@mui/material/styles";
// import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <React.StrictMode>
    {/* <Provider store={store}> */}
      {/* <ToastContainer style={{ zIndex: 9999999 }} /> */}
      {/* <ThemeProvider theme={theme}> */}
        <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    {/* </Provider> */}
  </React.StrictMode>
);
