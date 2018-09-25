import { GraphQLServer } from "graphql-yoga";
import { resolve, join } from "path";
import { Compiler } from "./server";
import { getSyledDeclarations, updateCSSVariable } from "./services/css-in-js";

const typeDefs = `
  type Query {
    cssDeclarations(filePath: String): [CSSProperty]!
    fileSelection(filePath: String): String!
  }
  type Mutation {
    updateCSSVariable(filePath: String, propertyName: String, propertyValue: String): String
  }
  type CSSProperty {
    styleName: String
    name: String
    value: String
    fieldType: String
  }
`;

const resolvers = {
  Query: {
    cssDeclarations: async (_: any, { filePath }: any) =>
      await getSyledDeclarations(filePath),
    fileSelection: (_: any, { filePath }: any) =>
      console.log(filePath) || "Got it"
  },
  Mutation: {
    updateCSSVariable: async (
      _: any,
      { filePath, propertyName, propertyValue }: any
    ) => await updateCSSVariable(filePath, propertyName, propertyValue)
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
const projectRoot = resolve("./example");
const compiler = new Compiler(server.express, projectRoot);

getSyledDeclarations(join(projectRoot, "index.jsx"));

server.start(
  {
    playground: "/debug"
  },
  () => console.log("Server is running on localhost:4000")
);
