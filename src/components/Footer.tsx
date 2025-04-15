
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
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="underline">Portfolio</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
