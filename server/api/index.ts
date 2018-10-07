import ComponentFileResolver from "./component-file/resolver";
import { buildSchema } from "type-graphql";

export async function getSchema() {
  return await buildSchema({
    resolvers: [ComponentFileResolver]
  });
}
