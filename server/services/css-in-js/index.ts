import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { readFileContent, writeFile } from "../io";
import { parse } from "../ast/parser";

export async function getSyledDeclarations(path: string) {
  const content = await readFileContent(path);
  const ast = parse(content);

  const result: any = [];
  traverse(ast, {
    VariableDeclaration(path: any) {
      const node = path.node;
      if (
        node.declarations[0].init.callee &&
        node.declarations[0].init.callee.callee.name === "styled"
      ) {
        const styleObject = node.declarations[0].init.arguments[0];
        styleObject.properties.map((property: any) => {
          result.push({
            name: property.key.name,
            value: property.value.value
          });
        });
      }
    }
  });

  return result;
}

export async function updateCSSVariable(
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
        const styleObject = node.declarations[0].init.arguments[0];
        styleObject.properties.map((property: any) => {
          if (property.key.name === variableName) {
            property.value.value = value;
          }
        });
      }
    }
  });

  const code = generate(ast).code;
  writeFile(path, code);
}
