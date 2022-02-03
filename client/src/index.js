import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
