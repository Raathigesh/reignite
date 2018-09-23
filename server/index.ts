import { GraphQLServer } from "graphql-yoga";
import { Compiler } from "./server";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
const compiler = new Compiler(server.express);

server.start(() => console.log("Server is running on localhost:4000"));
