import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import netlifyIdentity from "netlify-identity-widget";
import theme from "./theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProvideAuth from "./authCTX";
window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
