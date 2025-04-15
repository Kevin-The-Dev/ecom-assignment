
import { GlobeIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-12 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-2 text-gray-600">
        <span>Website developed by Kevin Patel</span>
        <a
          href="https://kevinpatel.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors duration-300"
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="relative inline-block after:absolute after:content-[''] after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-purple-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Portfolio
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
