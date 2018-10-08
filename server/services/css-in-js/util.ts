export const ColorPropertyType = "color";

export function getTypeForCSSProperty(propertyName: string) {
  switch (propertyName) {
    case "background-color":
      return ColorPropertyType;
  }
}
