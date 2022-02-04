import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { Auth0Provider } from "@auth0/auth0-react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-egi1ez2b.us.auth0.com"
      clientId="uITqUzsh5IRDkiWxNwu0WvOq9edfAn3B"
      redirectUri={window.location.origin}
    >
      <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
      </Auth0Provider>
    
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
