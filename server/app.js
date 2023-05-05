const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(
  "mongodb+srv://anj20:test123@cluster0.r81hyi6.mongodb.net/test"
);
mongoose.connection.once("open", () =>
  console.log("connected to the database")
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening to port 4000");
});
