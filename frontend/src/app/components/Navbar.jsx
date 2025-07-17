import Link from "next/link";
import Image from "next/image";

const Navbar = () => (
  <nav className="w-full px-6 py-3 bg-black/80 border-b border-pink-700/30 shadow-xl flex items-center justify-between fixed top-0 left-0 z-50 backdrop-blur-sm">
    <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
      <Image 
        src="/globe.svg" 
        alt="Logo" 
        width={42} 
        height={42} 
        className="hover:rotate-12 transition-transform duration-500 filter-purple"
      />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold text-2xl tracking-wider font-mono drop-shadow-lg">
        VeriFi
      </span>
    </div>
    
    <div className="flex gap-6 items-center">
      <Link 
        href="/" 
        className="relative font-medium text-purple-200 hover:text-white transition-colors duration-200 group"
      >
        Home
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
      
      
      
      <Link 
        href="/signup" 
        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
      >
        Sign Up
      </Link>
      
      <Link 
        href="#features" 
        className="relative font-medium text-purple-200 hover:text-white transition-colors duration-200 group"
      >
        Features
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </div>
  </nav>
);

export default Navbar;