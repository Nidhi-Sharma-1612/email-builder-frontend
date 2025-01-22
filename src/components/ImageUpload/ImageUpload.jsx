/* eslint-disable react/prop-types */
const ImageUpload = ({ uploadProgress, uploading, handleImageUpload }) => {
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
        disabled={uploading}
      />
      {uploading && (
        <div className="mt-4 bg-gray-200 rounded-lg">
          <progress
            value={uploadProgress}
            max="100"
            className="w-full"
          ></progress>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
