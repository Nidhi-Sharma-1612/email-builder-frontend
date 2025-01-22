export const toCamelCase = (str) =>
  str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

export const parseStyleString = (styleString) => {
  if (!styleString || typeof styleString !== "string") return {};

  return styleString
    .split(";")
    .filter((rule) => rule.trim())
    .reduce((acc, rule) => {
      const [property, value] = rule.split(":").map((item) => item.trim());
      if (property && value) {
        acc[toCamelCase(property)] = value;
      }
      return acc;
    }, {});
};

// Utility function to parse string styles into an object
export const parseStyleStringToObject = (styleString) => {
  return styleString
    .split(";")
    .filter((style) => style.trim() !== "")
    .reduce((acc, style) => {
      const [key, value] = style.split(":");
      if (key && value) {
        const camelCasedKey = key
          .trim()
          .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        acc[camelCasedKey] = value.trim();
      }
      return acc;
    }, {});
};
