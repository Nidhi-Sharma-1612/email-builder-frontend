/**
 * Convert a HEX color code to its RGB equivalent.
 * @param {string} hex - The HEX color code (e.g., #FFFFFF).
 * @returns {Array} - An array [R, G, B] with RGB values.
 */
const hexToRgb = (hex) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * Calculate the relative luminance of a color.
 * Formula: L = 0.2126 * R' + 0.7152 * G' + 0.0722 * B'
 * @param {Array} rgb - An array [R, G, B] with RGB values.
 * @returns {number} - The relative luminance.
 */
const calculateLuminance = (rgb) => {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculate the contrast ratio between two colors.
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * Where L1 is the lighter luminance and L2 is the darker luminance.
 * @param {string} color1 - The first color in HEX format.
 * @param {string} color2 - The second color in HEX format.
 * @returns {number} - The contrast ratio.
 */
export const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error(
      "Invalid color format. Please use HEX format (e.g., #FFFFFF)."
    );
  }

  const luminance1 = calculateLuminance(rgb1);
  const luminance2 = calculateLuminance(rgb2);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if a contrast ratio meets WCAG AA compliance.
 * @param {number} contrastRatio - The contrast ratio.
 * @returns {boolean} - True if accessible, otherwise false.
 */
export const isAccessible = (contrastRatio) => {
  return contrastRatio >= 4.5; // WCAG AA compliance for normal text
};
