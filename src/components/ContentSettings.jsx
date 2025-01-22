/* eslint-disable react/prop-types */
import { useState } from "react";

const ContentSettings = ({ localSettings, handleChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (["title", "content", "footer"].includes(name) && !value.trim()) {
      error = `${name} is required.`;
    } else if (
      ["ctaUrl", "unsubscribeUrl"].includes(name) &&
      value &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)
    ) {
      error = "Please enter a valid URL.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const renderInputField = ({
    id,
    name,
    value,
    placeholder,
    label,
    isRequired,
    helperText,
    type = "text",
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800 mb-1"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={label}
        aria-required={isRequired}
        className={`w-full border ${
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:outline-offset-0 transition duration-150`}
        placeholder={placeholder}
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderTextareaField = ({
    id,
    name,
    value,
    placeholder,
    label,
    isRequired,
    helperText,
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800 mb-1"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={label}
        aria-required={isRequired}
        className={`w-full border ${
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:outline-offset-0 transition duration-150`}
        rows="5"
        placeholder={placeholder}
      ></textarea>
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6 mb-6">
      {renderInputField({
        id: "title",
        name: "title",
        value: localSettings.title,
        placeholder: "Enter email title",
        label: "Title",
        isRequired: true,
        helperText: "Provide a descriptive and engaging title for your email.",
      })}
      {renderInputField({
        id: "subheader",
        name: "subheader",
        value: localSettings.subheader,
        placeholder: "Enter email subheader",
        label: "Subheader",
        isRequired: false,
        helperText: "This will appear below the title as additional context.",
      })}
      {renderTextareaField({
        id: "content",
        name: "content",
        value: localSettings.content,
        placeholder: "Enter email content",
        label: "Content",
        isRequired: true,
        helperText: "Add the main content of your email here.",
      })}
      {renderInputField({
        id: "footer",
        name: "footer",
        value: localSettings.footer,
        placeholder: "Enter footer text",
        label: "Footer",
        isRequired: true,
        helperText:
          "Add footer text, such as contact information or disclaimers.",
      })}
      {renderInputField({
        id: "ctaText",
        name: "ctaText",
        value: localSettings.ctaText,
        placeholder: "Enter button text",
        label: "Call-to-Action Text",
        isRequired: false,
        helperText: "Text to display on the Call-to-Action button.",
      })}
      {renderInputField({
        id: "ctaUrl",
        name: "ctaUrl",
        value: localSettings.ctaUrl,
        placeholder: "Enter button link",
        label: "Call-to-Action URL",
        type: "url",
        isRequired: false,
        helperText: "Provide the URL for the Call-to-Action button.",
      })}
      {renderInputField({
        id: "unsubscribeUrl",
        name: "unsubscribeUrl",
        value: localSettings.unsubscribeUrl,
        placeholder: "Enter unsubscribe link",
        label: "Unsubscribe URL",
        type: "url",
        isRequired: false,
        helperText: "Provide a link for users to unsubscribe from your emails.",
      })}
    </div>
  );
};

export default ContentSettings;
