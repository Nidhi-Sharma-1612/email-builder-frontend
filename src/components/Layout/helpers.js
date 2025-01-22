export const serializeStyles = (styles) => {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      acc[key] = value.trim();
    } else if (typeof value === "object" && value !== null) {
      // Convert camelCase to kebab-case
      acc[key] = Object.entries(value)
        .map(
          ([prop, val]) =>
            `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val}`
        )
        .join("; ");
    }
    return acc;
  }, {});
};
