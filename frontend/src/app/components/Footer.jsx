const Footer = () => (
  <footer className="w-full py-6 bg-black/80 border-t border-green-700 text-center text-green-400 font-mono text-sm mt-16 backdrop-blur-md">
    &copy; {new Date().getFullYear()} SecureSphere Cybersecurity. All rights reserved.
    <div className="mt-2 flex justify-center gap-6 text-green-300">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">GitHub</a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Twitter</a>
      <a href="mailto:support@securesphere.com" className="hover:text-green-400">Contact</a>
    </div>
  </footer>
);

export default Footer;