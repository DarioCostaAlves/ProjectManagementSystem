const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
//will look to our enviroments variables for a PORT variable
const port = process.env.PORT || 5000;
//initializes express
const app = express();

//grapiql: use this tool when we are on development
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}));

app.listen(port, console.log(`Server running on port ${port}`));