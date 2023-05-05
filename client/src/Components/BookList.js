import React from "react";
import { gql } from "apollo-boost"; // to make the query
import { graphql } from "react-apollo"; // to bind the query together

const getBookQuery = gql`
  query book {
    name
    id
  }
`;

const BookList = (props) => {
  console.log(props);
  function booksVisual() {
    var data = props.data;
    if (data.loading) return <h1>Loading Data.....</h1>;
    else
      return data.book.map((book) => {
        return <li>{book.name}</li>;
      });
  }
  return (
    <div>
      <ul id="book-list">
        <li>{booksVisual()}</li>
      </ul>
    </div>
  );
};

export default graphql(getBookQuery)(BookList); // this binds the query and returns it to the server
