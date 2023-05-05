const graphql = require("graphql");
const _ = require("lodash");
const Books = require("../models/books");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//without mongodb
// var books = [
//   { name: "World of Fantasy", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Knight King", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The tale of wizard", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "Nineteen Tails", genre: "Faboulous", id: "4", authorId: "1" },
//   { name: "The Story of Fox", genre: "Drama", id: "5", authorId: "2" },
//   { name: "The Amazonia", genre: "Adventure", id: "6", authorId: "2" },
//   { name: "Chhota Bheem", genre: "Comic", id: "7", authorId: "1 " },
//   { name: "One Night Stand", genre: "Romance", id: "8", authorId: "3 " },
// ];
// var author = [
//   { name: "William Wordsworth", age: 45, id: "1" },
//   { name: "William Shakespeare", age: 56, id: "2" },
//   { name: "Ruskin Bond", age: 60, id: "3" },
// ];

const AuthType = new GraphQLObjectType({
  name: "Author",
  //we wrap things inside function because datatypes can be identified before decalring
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Books.find({ authId: parent.id });
      },
    },
  }),
});
const BookType = new GraphQLObjectType({
  name: "Books",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(author, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootsQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        console.log(typeof args.id); //string
        // return _.find(books, { id: args.id });
        return Books.findById(args.id);
      },
    },
    author: {
      type: AuthType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        // return _.find(author, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Books.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthType),
      resolve(parent, args) {
        // return author;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBooks: {
      type: BookType,
      args: {
        authorId: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, args) {
        let book = new Books({
          authorId: args.authorId,
          name: args.name,
          genre: args.genre,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
