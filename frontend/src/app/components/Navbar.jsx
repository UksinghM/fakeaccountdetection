import Link from "next/link";
import Image from "next/image";

const Navbar = () => (
  <nav className="w-full px-6 py-4 bg-black/80 border-b border-green-700 shadow-lg flex items-center justify-between fixed top-0 left-0 z-20 backdrop-blur-md">
    <div className="flex items-center gap-3">
      <Image src="/globe.svg" alt="Logo" width={40} height={40} />
      <span className="text-green-400 font-extrabold text-xl tracking-wide font-mono drop-shadow-lg">
        SecureSphere
      </span>
    </div>
    <div className="flex gap-8 font-mono text-green-300 text-lg">
      <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
      <Link href="/login" className="hover:text-green-400 transition-colors">Login</Link>
      <Link href="/signup" className="hover:text-green-400 transition-colors">Signup</Link>
      <Link href="#features" className="hover:text-green-400 transition-colors">Features</Link>
    </div>
  </nav>
);

export default Navbar;