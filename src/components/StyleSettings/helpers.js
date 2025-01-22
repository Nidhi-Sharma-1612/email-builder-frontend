// Convert rem to px (assuming 1rem = 16px)
export const convertRemToPx = (remValue) => {
  const remInPx = parseFloat(remValue) * 16;
  return remInPx.toFixed(0);
};

// Convert px to rem (assuming 1rem = 16px)
export const convertPxToRem = (pxValue) => {
  const remValue = parseFloat(pxValue) / 16;
  return `${remValue.toFixed(2)}rem`;
};
