import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/emails";

console.log("API Base URL:", API_BASE_URL);

// Fetch the email layout and styles
export const fetchEmailLayout = () => async () => {
  try {
    const response = await fetch("/api/email-layout");
    console.log("REsponse:", response);
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid response data format.");
    }

    return data; // Ensure it returns a Promise
  } catch (error) {
    console.error("Failed to fetch email layout:", error);
    throw error; // Rethrow to handle errors in calling code
  }
};

// Upload image to the server
export const uploadImage = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_BASE_URL}/uploadImage`, formData, {
    onUploadProgress,
  });

  return response.data.imageUrl;
};

// Save email template settings
export const saveEmailTemplate = async (settings) => {
  await axios.post(`${API_BASE_URL}/uploadEmailConfig`, settings);
};

// Render and download the updated template
export const renderAndDownloadTemplate = async (settings) => {
  const response = await axios.post(
    `${API_BASE_URL}/renderAndDownloadTemplate`,
    settings,
    { responseType: "blob" }
  );
  return response.data;
};
