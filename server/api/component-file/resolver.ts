import { Resolver, Query, Arg } from "type-graphql";
import ComponentFile from "./type";
import { getSyledDeclarations } from "../../services/css-in-js";

@Resolver(ComponentFile)
export default class ComponentFileResolver {
  @Query(returns => ComponentFile)
  async getStyledComponents(@Arg("path") path: string) {
    const componentFile = new ComponentFile();
    componentFile.path = path;
    componentFile.styledComponents = await getSyledDeclarations(path);
    return componentFile;
  }
}
