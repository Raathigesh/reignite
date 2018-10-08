import * as postcss from "postcss";
import { getTypeForCSSProperty } from "./util";

async function processWithPlugin(cssString: string, plugin: any) {
  return postcss([plugin]).process(cssString);
}

export interface Declaration {
  name: string;
  value: string;
  type: string;
}

export default async function process(cssString: string) {
  const results: Declaration[] = [];
  const DeclarationWalker = postcss.plugin("reignite-style-parser", () => {
    return function(root, result) {
      return root.walkDecls(rule => {
        results.push({
          name: rule.prop,
          value: rule.value,
          type: getTypeForCSSProperty(rule.prop) || ""
        });
      });
    };
  });

  await processWithPlugin(cssString, DeclarationWalker);
  return results;
}
