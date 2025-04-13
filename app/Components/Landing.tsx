'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img from '@/public/img.png';
export default function AIPresentation() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="w-full bg-white py-3 px-6 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8 8C16.8 10.2091 14.9091 12 12.6 12C10.2909 12 8.4 10.2091 8.4 8C8.4 5.79086 10.2909 4 12.6 4C14.9091 4 16.8 5.79086 16.8 8Z" fill="black"/>
                <path d="M23.8 8C23.8 10.2091 21.9091 12 19.6 12C17.2909 12 15.4 10.2091 15.4 8C15.4 5.79086 17.2909 4 19.6 4C21.9091 4 23.8 5.79086 23.8 8Z" fill="black"/>
              </svg>
              <span className="ml-1 font-bold text-black text-lg">alai</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/join-discord" className="text-sm text-gray-700 hover:text-black transition-colors">Join Discord</Link>
          <Link href="/sign-in" className="text-sm text-gray-700 hover:text-black transition-colors">Sign In</Link>
          <Link href="/try-for-free" className="bg-[#0066FF] text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">Try for free →</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white w-full pt-16 pb-20 flex flex-col items-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-[#1A1A1A] leading-tight">
            Create high quality<br />presentations quickly with AI
          </h1>
          <p className="text-lg text-[#666666] mb-10 max-w-2xl mx-auto">
            Alai is a new presentation platform—because storytelling is about<br />ideas, not pixel tweaking
          </p>
          <Link href="/login">
          
          <button className="bg-[#0066FF] text-white px-8 py-3 rounded-md font-medium mb-8 hover:bg-blue-700 transition-colors shadow-sm">
            Try Alai for free →
          </button>
          </Link>
          <div className="flex justify-center items-center mb-14">
            <span className="text-sm text-[#666666]">Backed by</span>
            <div className="ml-2 bg-gray-100 px-2 py-1 rounded">
              <span className="font-semibold text-xs">Y Combinator</span>
            </div>
          </div>
          <div className="relative w-full max-w-4xl h-96 mb-8 shadow-lg rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-5"></div>
            <Image 
              src={img} 
              alt="AI Presentation Platform Screenshot" 
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Purple */}
      <section className="w-full bg-[#F6F2FF] py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-16 mb-12 md:mb-0">
            <h2 className="text-3xl font-bold mb-10 text-[#1A1A1A] leading-tight">
              Stop searching for the<br />perfect template
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-purple-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Easily arrange, resize, or reposition slide elements with AI-powered responsive grid</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-purple-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Content-aware layouts automatically adjust as you write</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-purple-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Take full control manually, or let Alai&apos;s AI instantly optimize your design</p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-[#007BFF] p-4 rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-72 md:h-80">
                <Image 
                  src={img} 
                  alt="AI Layout Features" 
                  fill
                  className="object-contain rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Yellow */}
      <section className="w-full bg-[#FFF8E6] py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 pl-0 md:pl-16 mb-12 md:mb-0">
            <h2 className="text-3xl font-bold mb-10 text-[#1A1A1A] leading-tight">
              Discover the best way to<br />get your point across
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-yellow-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Instead of forcing a single AI-generated slide, Alai gives you multiple options to choose from</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-yellow-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Explore different layouts, visual arrangements, content flow, and constantly be refine exactly what you need</p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-80 md:h-96 shadow-lg rounded-lg overflow-hidden">
              <Image 
                 src={img}
                alt="AI Content Options" 
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 right-4 flex space-x-1">
                <div className="w-6 h-1 rounded-full bg-gray-300"></div>
                <div className="w-6 h-1 rounded-full bg-gray-300"></div>
                <div className="w-6 h-1 rounded-full bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Blue */}
      <section className="w-full bg-[#F1F7FF] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A] text-center leading-tight">
              AI when you want it,<br />control when you need it
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-start">
            <div className="w-full md:w-1/2 md:pr-16 mb-12 md:mb-0">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-600 text-lg">•</div>
                  <p className="text-base text-[#666666]">Seamlessly transform any element type into another</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-600 text-lg">•</div>
                  <p className="text-base text-[#666666]">Work alongside AI as your co-creator, making iteration fast and effortless</p>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-80 md:h-96 shadow-lg rounded-lg overflow-hidden">
                <Image 
                   src={img}
                  alt="AI Collaboration Features" 
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-4 right-4 flex space-x-1">
                  <div className="w-6 h-1 rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 4 - Mint Green */}
      <section className="w-full bg-[#EFFFF9] py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 pl-0 md:pl-16 mb-12 md:mb-0">
            <h2 className="text-3xl font-bold mb-10 text-[#1A1A1A] leading-tight">
              AI that understands your<br />entire presentation
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Spend less time repeating content across slides</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 text-lg">•</div>
                <p className="text-base text-[#666666]">Terms and concepts you introduce early on are automatically applied to later slides</p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-80 md:h-96 shadow-lg rounded-lg overflow-hidden">
              <Image 
                 src={img}
                alt="Presentation Understanding Features" 
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 right-4 flex space-x-1">
                <div className="w-1 h-6 rounded-full bg-gray-300"></div>
                <div className="w-1 h-6 rounded-full bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theming System Section - Black */}
      <section className="w-full bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-white text-center leading-tight">
            A theming system that offers a wide aesthetic<br />range with just a few clicks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { bg: 'bg-yellow-200', title: 'Classic Economy' },
              { bg: 'bg-blue-200', title: 'Modern Corporate' },
              { bg: 'bg-green-200', title: 'Nature Inspired' },
              { bg: 'bg-purple-200', title: 'Creative Thinking' },
              { bg: 'bg-yellow-100', title: 'Lemon Backdrop' },
              { bg: 'bg-blue-100', title: 'Ocean Blue' },
              { bg: 'bg-green-100', title: 'Fresh Forest' },
              { bg: 'bg-red-100', title: 'Warm Sunset' },
              { bg: 'bg-gray-200', title: 'Minimalist' },
              { bg: 'bg-indigo-200', title: 'Deep Space' },
              { bg: 'bg-amber-200', title: 'Golden Hour' },
              { bg: 'bg-teal-200', title: 'Coastal Theme' }
            ].map((theme, i) => (
              <div key={i} className={`${theme.bg} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="relative w-full h-48">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                  <Image 
                     src={img} 
                    alt={`Theme example ${i+1}`} 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 text-sm font-medium text-black">
                    {theme.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black py-10 px-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-400">© 2025 Alai. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-8 mb-6 md:mb-0">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/cookie-settings" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Settings</Link>
          </div>
          
          <div className="flex space-x-6">
            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}