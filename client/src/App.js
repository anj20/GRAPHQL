import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// Component
import BookList from "./Components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello Ninja!</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
