import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import PreviewPanel from "../PreviewPanel/PreviewPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import { renderAndDownloadTemplate } from "@/services/api";
import { updateSettings } from "@/store/emailSlice";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.email);
  const isDownloading = useSelector((state) => state.email.isDownloading);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleDownloadTemplate = async () => {
    try {
      dispatch(updateSettings({ isDownloading: true }));

      const requestData = {
        title: settings.title,
        subheader: settings.subheader,
        content: settings.content,
        footer: settings.footer,
        image: settings.image,
        ctaText: settings.ctaText,
        ctaUrl: settings.ctaUrl,
        unsubscribeUrl: settings.unsubscribeUrl,
        styles: settings.styles,
      };

      const response = await renderAndDownloadTemplate(requestData);

      const blob = new Blob([response], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "email-template.html";
      link.click();
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      dispatch(updateSettings({ isDownloading: false }));
    }
  };
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="shadow-md">
        <Header isAsideOpen={isAsideOpen} setIsAsideOpen={setIsAsideOpen} />
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Overlay for Small Screens */}
        {isAsideOpen && (
          <div
            onClick={() => setIsAsideOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          ></div>
        )}

        {/* Settings Panel */}
        <aside
          className={`h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ${
            isAsideOpen
              ? "fixed top-[4rem] translate-x-0 w-3/4 sm:w-1/3"
              : "fixed top-[4rem] -translate-x-full w-3/4 sm:w-1/3"
          } md:translate-x-0 md:fixed md:top-[4rem] md:w-1/4`}
        >
          <SettingsPanel />
        </aside>

        <main
          className={`bg-gray-50 dark:bg-gray-900 shadow-md overflow-y-auto transition-all duration-300 max-w-6xl w-full md:w-[75%] md:ml-[25%]`}
          style={{
            paddingTop: "6rem",
          }}
        >
          {/* Toast Container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div
            className="flex flex-col justify-start h-full"
            style={{
              padding: "0 1rem",
            }}
          >
            {/* Title and Download Button */}
            <div
              className="flex items-center justify-between mb-6 w-full max-w-7xl"
              style={{
                margin: "0 auto",
              }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Email Preview
              </h2>
              <button
                onClick={handleDownloadTemplate}
                disabled={isDownloading}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md font-medium transition ${
                  isDownloading
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isDownloading ? "Downloading..." : "Download"}
              </button>
            </div>

            <div className="w-full mx-auto">
              <PreviewPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
