/* eslint-disable react/prop-types */
import { Progress } from "@/components/ui/progress";

const ImageUpload = ({ handleImageUpload, uploading, uploadProgress }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image (Optional)
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border border-gray-300 rounded-md p-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 focus:outline-none"
      />
      {uploading && (
        <div className="mt-4 bg-gray-200 rounded-lg">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
