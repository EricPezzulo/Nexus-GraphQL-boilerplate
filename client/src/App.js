import logo from "./logo.svg";
import "./App.css";
import {
  useQuery,
  gql,
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
} from "@apollo/client";
import DisplayData from "./components/DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <DisplayData />
    </ApolloProvider>
  );
}

export default App;
