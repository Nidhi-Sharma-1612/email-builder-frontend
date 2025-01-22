import { supabase } from "@/config/supabaseClient";

export const uploadImageToSupabase = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from("email-images") // Replace with your bucket name
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error.message);
      throw new Error(error.message);
    }

    // Generate public URL
    const { data: publicData, error: urlError } = supabase.storage
      .from("email-images")
      .getPublicUrl(data.path); // Use `data.path` from the upload response

    if (urlError) {
      console.error("Error generating public URL:", urlError.message);
      throw new Error(urlError.message);
    }

    return publicData.publicUrl; // This should return the correct URL
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
