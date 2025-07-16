"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import RippleGrid from "./components/RippleGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans bg-black text-green-400 overflow-hidden">
      <Navbar />
      {/* Animated Cyber Grid Background */}
      <RippleGrid
        gridColor="#00ff99"
        rippleIntensity={0.12}
        gridSize={8.0}
        gridThickness={10.0}
        fadeDistance={2.0}
        vignetteStrength={2.5}
        glowIntensity={0.25}
        opacity={0.7}
        gridRotation={15}
        mouseInteraction={true}
        mouseInteractionRadius={1.5}
        enableRainbow={false}
      />
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 gap-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-6">
            <Image src="/globe.svg" alt="Cyber Globe" width={64} height={64} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-green-400 drop-shadow-lg">
            SecureSphere Cybersecurity
          </h1>
          <p className="text-lg sm:text-2xl text-green-200 mb-8 font-mono">
            Defend your digital world with next-gen security solutions. Real-time protection, threat intelligence, and peace of mind for your business and personal data.
          </p>
          <a
            href="#features"
            className="inline-block bg-green-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-400 transition-colors text-lg"
          >
            Get Started
          </a>
        </div>
        {/* Features Section */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
          <div className="bg-black/60 border border-green-700 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <Image src="/file.svg" alt="Threat Detection" width={40} height={40} className="mb-3" />
            <h3 className="font-bold text-xl mb-2">Threat Detection</h3>
            <p className="text-green-200 text-center">AI-powered monitoring to identify and neutralize cyber threats in real time.</p>
          </div>
          <div className="bg-black/60 border border-green-700 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <Image src="/window.svg" alt="Data Privacy" width={40} height={40} className="mb-3" />
            <h3 className="font-bold text-xl mb-2">Data Privacy</h3>
            <p className="text-green-200 text-center">End-to-end encryption and privacy controls to keep your information safe.</p>
          </div>
          <div className="bg-black/60 border border-green-700 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <Image src="/vercel.svg" alt="24/7 Support" width={40} height={40} className="mb-3" />
            <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
            <p className="text-green-200 text-center">Expert assistance whenever you need it, with rapid response times.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
