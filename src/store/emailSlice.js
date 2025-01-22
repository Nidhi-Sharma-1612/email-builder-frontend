import { defaultStyles } from "@/components/PreviewPanel/styles";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Default Title",
  subheader: "Default Subheader",
  content: "Default Content goes here...",
  footer: "Default Footer Text",
  image: "https://placehold.co/600x400",
  ctaText: "Learn More",
  ctaUrl: "#",
  unsubscribeUrl: "#",
  styles: defaultStyles,
  isDownloading: false,
  contentOpen: false,
  styleOpen: false,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setInitialSettings(state, action) {
      return { ...state, ...action.payload };
    },
    updateSettings(state, action) {
      return { ...state, ...action.payload };
    },
    updateStyle(state, action) {
      const { field, style, value } = action.payload;

      if (!field || !style || typeof value !== "string") {
        console.warn("Invalid style update:", action.payload);
        return state;
      }

      return {
        ...state,
        styles: {
          ...state.styles,
          [field]: {
            ...state.styles[field],
            [style]: value,
          },
        },
      };
    },
  },
});

export const { setInitialSettings, updateSettings, updateStyle } =
  emailSlice.actions;
export default emailSlice.reducer;
