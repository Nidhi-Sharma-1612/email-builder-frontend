/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { fetchEmailLayout } from "@/services/api";
import { defaultStyles } from "./styles";
import { parseStyleString, parseStyleStringToObject } from "./helpers";

const PreviewPanel = () => {
  const settings = useSelector((state) => state.email);
  const image = useSelector((state) => state.email.image);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layout, setLayout] = useState(null);
  const [parsedStyles, setParsedStyles] = useState({});

  // Sanitize fetched or merged styles
  const sanitizeStyles = (styles) => {
    return Object.entries(styles || {}).reduce((acc, [key, value]) => {
      if (
        typeof value === "string" ||
        (typeof value === "object" && value !== null)
      ) {
        acc[key] = value;
      } else {
        console.warn(`Invalid style for ${key}:`, value);
      }
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchHtmlLayout = async () => {
      try {
        const { layout: fetchedLayout, styles: fetchedStyles } =
          await fetchEmailLayout();
        setLayout(fetchedLayout);
        setParsedStyles(sanitizeStyles(fetchedStyles));
      } catch (err) {
        console.error("Failed to fetch email layout:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHtmlLayout();
  }, []);

  if (isLoading) {
    return (
      <div style={defaultStyles.loaderContainer}>
        <Loader size={48} strokeWidth={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={defaultStyles.errorContainer}>
        <p style={defaultStyles.errorText}>Error: {error}</p>
      </div>
    );
  }

  const mergedStyles = {
    ...defaultStyles,
    ...parsedStyles,
    ...settings.styles,
  };

  const safeStyle = (styleKey) => {
    const style = mergedStyles[styleKey];
    if (!style) return {};

    // If the style is already a valid object, return it
    if (typeof style === "object" && !Array.isArray(style)) {
      return style;
    }

    // If the style is a string, parse it
    if (typeof style === "string") {
      try {
        const styleObject = style
          .split(";")
          .filter((rule) => rule.trim()) // Remove empty rules
          .reduce((acc, rule) => {
            const [key, value] = rule.split(":").map((s) => s.trim());
            if (key && value) {
              const camelCaseKey = key.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase()
              );
              acc[camelCaseKey] = value;
            }
            return acc;
          }, {});
        return styleObject;
      } catch (error) {
        console.warn(`Failed to parse style for ${styleKey}:`, style, error);
      }
    }

    console.warn(`Invalid style format for ${styleKey}:`, style);
    return {};
  };

  return (
    <div style={safeStyle("emailContainer")}>
      <h1 style={safeStyle("emailHeader")}>
        {settings.title || "Default Title"}
      </h1>
      {settings.subheader && (
        <h2 style={safeStyle("emailSubheader")}>{settings.subheader}</h2>
      )}
      <div style={safeStyle("emailBody")}>
        {settings.content.split("\n").map((line, index) => (
          <p key={index} style={safeStyle("bodyContent")}>
            {line}
          </p>
        ))}
        {settings.image && (
          <img
            src={settings.image}
            alt="Email Content"
            style={safeStyle("image")}
          />
        )}

        {settings.ctaText && settings.ctaUrl && (
          <div style={safeStyle("ctaContainer")}>
            <a
              href={settings.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={safeStyle("ctaButton")}
            >
              {settings.ctaText}
            </a>
          </div>
        )}
      </div>
      <footer style={safeStyle("emailFooter")}>
        <div>{settings.footer || "Default Footer Text"}</div>
        {settings.unsubscribeUrl && (
          <div style={safeStyle("unsubscribeContainer")}>
            <a
              href={settings.unsubscribeUrl}
              style={safeStyle("unsubscribeLink")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsubscribe
            </a>
          </div>
        )}
      </footer>
    </div>
  );
};

export default PreviewPanel;
