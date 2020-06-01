import {https} from 'firebase-functions';
const express = require('express');
const apollo = require('apollo-server-express');
const ApolloServer = apollo.ApolloServer;
const app = express();

const resolverFunctions = {
    Query: {
        hello: () => 'world'
    }
};

const schema = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;


const gqlServer = () => {
    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolverFunctions,
      introspection: true,
      playground: true
    });
  
    apolloServer.applyMiddleware({app, path: '/graphql', cors: true});
    return app;
}

exports.api = https.onRequest(gqlServer());