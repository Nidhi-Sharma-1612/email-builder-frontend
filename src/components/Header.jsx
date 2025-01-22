/* eslint-disable react/prop-types */
import { Menu } from "lucide-react";

const Header = ({ isAsideOpen, setIsAsideOpen }) => {
  const toggleAside = () => setIsAsideOpen((prev) => !prev);
  return (
    <header className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 max-w-7xl w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4 w-full ">
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-gray-800 font-extrabold text-sm sm:text-base md:text-lg">
              EB
            </span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
            Email Builder
          </h1>
        </div>

        {/* Menu Icon */}
        <button
          onClick={toggleAside}
          className="block md:hidden p-2 rounded-md text-white hover:bg-gray-700"
          aria-expanded={isAsideOpen}
        >
          <Menu
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
