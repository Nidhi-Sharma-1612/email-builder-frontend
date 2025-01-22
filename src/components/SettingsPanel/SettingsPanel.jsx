import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { saveEmailTemplate, uploadImage } from "@/services/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import ContentSettings from "../ContentSettings";
import ImageUpload from "../ImageUpload";
import StyleSettings from "../StyleSettings/StyleSettings";
import { updateSettings, updateStyle } from "@/store/emailSlice";

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSettings({ [name]: value }));
  };

  const handleStyleChange = (field, style, value) => {
    if (!field || !style || typeof value !== "string" || value.trim() === "") {
      console.error("Invalid style change input:", { field, style, value });
      return;
    }

    dispatch(updateStyle({ field, style, value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          toast.info(`Uploading... ${progress}%`);
        });
        dispatch(updateSettings({ image: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error.message);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const validateFields = () => {
    const requiredFields = ["title", "content", "footer"];
    for (const field of requiredFields) {
      if (!settings[field] || settings[field].trim() === "") {
        toast.error(`The ${field} field is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSaveTemplate = async () => {
    if (!validateFields()) return;

    try {
      // Prepare data for saving
      const saveData = {
        title: settings.title || "Default Title",
        content: settings.content || "Default Content",
        footer: settings.footer || "Default Footer",
        subheader: settings.subheader || "",
        image: settings.image || "",
        styles: settings.styles || {},
        ctaText: settings.ctaText || "",
        ctaUrl: settings.ctaUrl || "",
        unsubscribeUrl: settings.unsubscribeUrl || "",
      };

      console.log("Saving Template Data:", saveData);

      await saveEmailTemplate(saveData);
      toast.success("Template saved successfully!");
    } catch (error) {
      console.error("Error saving template:", error.message);
      toast.error("Failed to save template. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col p-4 mt-3 space-y-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
      style={{
        height: "calc(100vh - 4rem)", // Occupy full height minus header
      }}
    >
      {/* Content Settings Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() =>
            dispatch(updateSettings({ contentOpen: !settings.contentOpen }))
          }
        >
          <h3 className="text-base sm:text-lg md:text-lg font-bold mb-4">
            Content Settings
          </h3>
          {settings.contentOpen ? (
            <ChevronUp size={20} className="sm:h-6 sm:w-6" />
          ) : (
            <ChevronDown size={20} className="sm:h-6 sm:w-6" />
          )}
        </div>
        {settings.contentOpen && (
          <div className="overflow-y-auto max-h-[60vh] sm:max-h-[70vh] space-y-6 pr-4 sm:pr-6 scroll-padding-2">
            <ContentSettings
              localSettings={settings}
              handleChange={handleChange}
            />
            <ImageUpload
              handleImageUpload={handleImageUpload}
              uploading={false}
              uploadProgress={0}
            />
          </div>
        )}
      </div>

      {/* Style Settings Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer mt-6"
          onClick={() =>
            dispatch(updateSettings({ styleOpen: !settings.styleOpen }))
          }
        >
          <h3 className="text-base sm:text-lg md:text-lg font-bold mb-4">
            Style Settings
          </h3>
          {settings.styleOpen ? (
            <ChevronUp size={20} className="sm:h-6 sm:w-6" />
          ) : (
            <ChevronDown size={20} className="sm:h-6 sm:w-6" />
          )}
        </div>
        {settings.styleOpen && (
          <StyleSettings
            styles={settings.styles}
            handleStyleChange={handleStyleChange}
          />
        )}
      </div>

      {/* Save Template Button */}
      <div>
        <button
          onClick={handleSaveTemplate}
          className="px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md font-medium text-sm sm:text-base md:text-lg transition bg-gray-700 hover:bg-gray-800 text-white"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
