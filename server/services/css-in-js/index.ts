import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { readFileContent, writeFile } from "../io";
import { parse } from "../ast/parser";
import { getTypeForCSSProperty } from "./util";
import process, { Declaration } from "./postcss-plugin";
import StyledComponent from "../../api/styled-component/type";

interface StyleExpresions {
  name: string;
  cssString: string;
}

export async function getTaggedTemplateExpressionStrings(ast: any) {
  const results: StyleExpresions[] = [];
  traverse(ast, {
    TaggedTemplateExpression(path: any) {
      const cssString = path.node.quasi.quasis[0].value.raw;
      results.push({
        name: path.parent.id.name,
        cssString
      });
    }
  });
  return results;
}

export async function getSyledDeclarations(
  path: string
): Promise<StyledComponent[]> {
  const content = await readFileContent(path);
  const ast = parse(content);

  const cssStrings = await getTaggedTemplateExpressionStrings(ast);
  const declarations = await Promise.all(
    cssStrings.map(async function(cssString) {
      return {
        name: cssString.name,
        declarations: await process(cssString.cssString)
      };
    })
  );
  return declarations;
}

export async function updateCSSVariable(
  declarationName: string,
  path: string,
  variableName: string,
  value: string
) {
  const content = await readFileContent(path);
  const ast = parse(content);
  traverse(ast, {
    VariableDeclaration(path: any) {
      const node = path.node;
      if (
        node.declarations[0].init.callee &&
        node.declarations[0].init.callee.callee.name === "styled"
      ) {
        const styleName = node.declarations[0].id.name;
        const styleObject = node.declarations[0].init.arguments[0];
        if (styleName === declarationName) {
          styleObject.properties.map((property: any) => {
            if (property.key.name === variableName) {
              property.value.value = value;
            }
          });
        }
      }
    }
  });

  const code = generate(ast).code;
  writeFile(path, code);
}
