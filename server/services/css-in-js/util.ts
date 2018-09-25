export const ColorPropertyType = "color";

export function getTypeForCSSProperty(propertyName: string) {
  switch (propertyName) {
    case "backgroundColor":
      return ColorPropertyType;
  }
}
