/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { convertPxToRem, convertRemToPx } from "./helpers";

const allowedFields = {
  emailHeader: "Header",
  emailSubheader: "Subheader",
  emailBody: "Body Content",
  image: "Image",
  ctaButton: "CTA Button",
  emailFooter: "Footer",
  unsubscribeLink: "Unsubscribe Link",
};

const defaultStyles = {
  fontSize: "16px",
  fontWeight: "normal",
  fontStyle: "normal",
  textAlign: "center",
};

const StyleSettings = ({ styles, handleStyleChange }) => {
  const filteredStyles = Object.keys(styles || {}).filter((field) =>
    Object.keys(allowedFields).includes(field)
  );

  const [openSections, setOpenSections] = useState(
    filteredStyles.reduce((acc, field) => {
      acc[field] = field === "emailHeader"; // Open "Header" by default
      return acc;
    }, {})
  );

  const toggleSection = (field) => {
    setOpenSections((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-4 mb-10">
      {filteredStyles.map((field) => (
        <div key={field} className="space-y-4">
          {/* Section Header with Toggle */}
          <div
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => toggleSection(field)}
          >
            <h4 className="text-md font-semibold capitalize text-gray-800">
              {allowedFields[field]} Style
            </h4>
            {openSections[field] ? (
              <ChevronUp className="text-gray-500" size={20} />
            ) : (
              <ChevronDown className="text-gray-500" size={20} />
            )}
          </div>

          {/* Collapsible Content */}
          {openSections[field] && (
            <div className="grid grid-cols-2 gap-5">
              {field === "image" ? (
                <>
                  {/* Width */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-width`}
                      >
                        Width (%)
                      </label>
                      <input
                        type="number"
                        min={20}
                        max={100}
                        id={`${field}-width`}
                        value={
                          styles[field]?.width?.endsWith("%")
                            ? parseInt(styles[field].width, 10)
                            : 100 // Default %
                        }
                        onChange={(e) =>
                          handleStyleChange(
                            field,
                            "width",
                            `${e.target.value}%`
                          )
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Font Size, Font Weight, and Alignment */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-fontSize`}
                      >
                        Font Size (px)
                      </label>
                      <input
                        type="number"
                        id={`${field}-fontSize`}
                        value={
                          styles[field]?.fontSize?.endsWith("rem")
                            ? convertRemToPx(styles[field].fontSize)
                            : parseInt(styles[field]?.fontSize, 10) || 16
                        }
                        onChange={(e) =>
                          handleStyleChange(
                            field,
                            "fontSize",
                            convertPxToRem(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-textAlign`}
                      >
                        Alignment
                      </label>
                      <select
                        id={`${field}-textAlign`}
                        value={styles[field]?.textAlign || "left"}
                        onChange={(e) =>
                          handleStyleChange(field, "textAlign", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>

                  {/* Font Weight and Font Style */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-fontWeight`}
                      >
                        Font Weight
                      </label>
                      <select
                        id={`${field}-fontWeight`}
                        value={
                          styles[field]?.fontWeight || defaultStyles.fontWeight
                        }
                        onChange={(e) =>
                          handleStyleChange(field, "fontWeight", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="bolder">Bolder</option>
                        <option value="lighter">Lighter</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-fontStyle`}
                      >
                        Font Style
                      </label>
                      <select
                        id={`${field}-fontStyle`}
                        value={
                          styles[field]?.fontStyle || defaultStyles.fontStyle
                        }
                        onChange={(e) =>
                          handleStyleChange(field, "fontStyle", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      >
                        <option value="normal">Normal</option>
                        <option value="italic">Italic</option>
                        <option value="oblique">Oblique</option>
                      </select>
                    </div>
                  </div>

                  {/* Text Color and Background Color */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-2"
                        htmlFor={`${field}-color`}
                      >
                        Text Color
                      </label>
                      <input
                        type="color"
                        id={`${field}-color`}
                        value={styles[field]?.color || "#000000"}
                        onChange={(e) =>
                          handleStyleChange(field, "color", e.target.value)
                        }
                        className="w-full h-10 p-0 bg-transparent cursor-pointer"
                      />
                    </div>
                    {(field === "emailHeader" ||
                      field === "ctaButton" ||
                      field === "emailFooter") && (
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-800 mb-2"
                          htmlFor={`${field}-backgroundColor`}
                        >
                          Bg Color
                        </label>
                        <input
                          type="color"
                          id={`${field}-backgroundColor`}
                          value={styles[field]?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleStyleChange(
                              field,
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="w-full h-10 p-0 bg-transparent cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StyleSettings;
