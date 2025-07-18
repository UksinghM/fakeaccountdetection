"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import RippleGrid from "./components/RippleGrid";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";


export default function Home() {
  return (
    <div className="relative min-h-screen font-sans bg-black text-white overflow-hidden">
      <Navbar />
      {/* Purple/Pink Cyber Grid Background */}
      <RippleGrid
        gridColor="#c026d3"
        rippleIntensity={0.15}
        gridSize={8.0}
        gridThickness={10.0}
        fadeDistance={2.0}
        vignetteStrength={2.5}
        glowIntensity={0.3}
        opacity={0.7}
        gridRotation={15}
        mouseInteraction={true}
        mouseInteractionRadius={1.5}
        enableRainbow={false}
      />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-16 gap-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl text-center">
          <div className="relative mb-8">
            <Image 
              src="/icons8-github-48.png" 
              alt="Social Media Scanner" 
              width={100} 
              height={100} 
              className="animate-pulse hover:animate-spin-slow transition-all duration-500 filter-purple"
            />
            <div className="absolute inset-0 rounded-full border-2 border-pink-500 opacity-70 animate-ping-slow pointer-events-none"></div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              VeriFi
            </span>
          </h1>
          
          <p className="text-xl sm:text-3xl text-gray-300 mb-10 font-mono max-w-3xl leading-relaxed">
            <span className="text-pink-400 font-bold">AI-powered detection</span> of fake social media accounts with 
            <span className="text-purple-400"> 98.7% accuracy</span>. Protect your brand and personal identity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#scanner-redirect"
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-purple-500/40 transition-all hover:scale-105 group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a
              href="/demo"
              className="relative overflow-hidden border-2 border-pink-500 text-pink-300 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-pink-900/30 transition-all hover:scale-105 group"
            >
              <span className="relative z-10">See How It Works</span>
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-4 text-pink-300">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-500"></div>
            Integrated with all major platforms
            <div className="h-px w-16 bg-gradient-to-r from-pink-500 to-transparent"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8 opacity-80 hover:opacity-100 transition-opacity">
            {/* Replace SVG icons with react-icons */}
            <div className="h-12 w-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <FaTwitter size={40} color="#1DA1F2" />
            </div>
            <div className="h-12 w-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <FaInstagram size={40} color="#E1306C" />
            </div>
            <div className="h-12 w-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <FaFacebook size={40} color="#1877F3" />
            </div>
            <div className="h-12 w-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <FaLinkedin size={40} color="#0A66C2" />
            </div>
            <div className="h-12 w-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <FaTiktok size={40} color="#000000" />
            </div>
          </div>
        </section>

        {/* Scanner Redirect Section */}
        <section id="scanner-redirect" className="w-full max-w-4xl py-20">
          <div className="bg-gradient-to-b from-purple-900/20 to-black/70 border border-purple-800/50 rounded-2xl p-12 text-center shadow-xl hover:shadow-purple-500/20 transition-all">
            <div className="mb-8 mx-auto w-24 h-24 relative">
              <Image 
                src="/scan-icon.svg" 
                alt="Scanner" 
                width={96} 
                height={96} 
                className="filter-purple animate-pulse"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Account Verification Scanner
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our advanced scanner checks 28+ indicators to detect fake accounts and bots across all major platforms.
            </p>
            <a
              href="/scanner" 
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all"
            >
              Go To Scanner Tool
            </a>
            <p className="text-sm text-purple-300 mt-4">
              (Coming soon - currently in beta testing)
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-6xl py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Our Detection Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced algorithms to uncover even the most sophisticated fake accounts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '/ai-icon.svg',
                title: 'AI-Powered Analysis',
                description: 'Deep learning models trained on millions of accounts to spot subtle patterns of inauthentic behavior.',
                badge: 'Patent Pending'
              },
              {
                icon: '/pattern-icon.svg',
                title: 'Behavioral Patterns',
                description: 'Detects suspicious activity patterns like burst posting, unnatural engagement, and bot-like interactions.',
                badge: ''
              },
              {
                icon: '/future-icon.svg',
                title: 'Future Security Suite',
                description: 'Expanding soon to include phishing detection, deepfake identification, and more security tools.',
                badge: 'Coming Soon'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="relative bg-gradient-to-b from-black/40 to-black/70 border border-purple-900/50 rounded-2xl p-8 flex flex-col items-center shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 group"
              >
                {feature.badge && (
                  <span className={`absolute -top-3 right-4 ${
                    feature.badge.includes('Patent') ? 'bg-purple-500' : 'bg-pink-500'
                  } text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {feature.badge}
                  </span>
                )}
                <div className="mb-6 p-4 bg-purple-900/20 rounded-full group-hover:bg-pink-500/20 transition-colors">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title} 
                    width={48} 
                    height={48} 
                    className="filter-purple"
                  />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-center text-white">{feature.title}</h3>
                <p className="text-gray-300 text-center opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-6xl py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98.7%", label: "Detection Accuracy" },
              { value: "2.3M+", label: "Accounts Analyzed" },
              { value: "28", label: "Detection Parameters" },
              { value: "0.5s", label: "Average Scan Time" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="w-full max-w-6xl py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Who Needs This?
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Brands & Influencers",
                description: "Protect your reputation by identifying and removing fake followers and engagement",
                icon: "influencer-icon.svg"
              },
              {
                title: "Journalists & Researchers",
                description: "Verify authenticity of sources before reporting or citing information",
                icon: "journalist-icon.svg"
              },
              {
                title: "Dating App Users",
                description: "Avoid catfishing by verifying profiles before connecting personally",
                icon: "dating-icon.svg"
              },
              {
                title: "General Users",
                description: "Maintain authentic social circles and avoid scams/spam accounts",
                icon: "users-icon.svg"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-black/50 border border-purple-900/30 rounded-xl p-6 flex items-start gap-4 hover:border-pink-500/50 transition-colors">
                <Image 
                  src={`/${useCase.icon}`} 
                  alt={useCase.title} 
                  width={40} 
                  height={40} 
                  className="filter-purple mt-1"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-gray-300">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl py-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/50 rounded-2xl p-12 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Ready to clean up your social presence?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with our fake account detection tool today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/signup"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all"
              >
                Start Free Trial
              </a>
              <a
                href="/demo"
                className="inline-block border-2 border-pink-500 text-pink-300 font-bold py-4 px-12 rounded-full hover:bg-pink-900/20 transition-all"
              >
                Enterprise Solutions
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}