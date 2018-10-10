import ComponentFileResolver from "./component-file/resolver";
import { buildSchema } from "type-graphql";
import { pubsub } from "../services/event-emitter";

export async function getSchema() {
  return await buildSchema({
    resolvers: [ComponentFileResolver],
    pubSub: pubsub
  });
}
