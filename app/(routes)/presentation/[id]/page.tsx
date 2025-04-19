"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Share,
  Play,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function PresentationUI({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [activeCategory, setActiveCategory] = useState("BASIC");

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="flex items-center px-6 py-3 border-b border-gray-200/80 bg-white/70 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-purple-500/10">
            <div className="w-5 h-5 bg-white rounded-md"></div>
          </div>
          <div className="border-r border-gray-200 h-8 mx-3"></div>
          <span className="text-gray-800 font-semibold text-lg">
            Untitled Presentation
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-gray-100 transition-all">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-gray-100 transition-all">
            <Share className="h-5 w-5 text-gray-600" />
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
            <Play className="h-4 w-4 mr-2" />
            Present
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute right-8 top-4 w-10 h-10 rounded-full bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center hover:shadow-xl transition-all duration-300 group">
                <Settings className="h-5 w-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-white p-4 rounded-xl shadow-xl border border-gray-100"
            >
              <p className="text-sm text-center text-gray-600">
                You can change your theme
                <br />
                anytime from here
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Slide Preview */}
        <Link href={`/presentation/${id}/input`}>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden aspect-video relative transition-all duration-500 hover:-translate-y-1 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
              <div className="flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xl"
                >
                  <path d="M24 12L30 18L36 12L30 6L24 12Z" fill="#9333EA" className="group-hover:fill-purple-700 transition-colors duration-300" />
                  <path d="M36 24L30 18L36 12L42 18L36 24Z" fill="#A855F7" className="group-hover:fill-purple-600 transition-colors duration-300" />
                  <path d="M18 30L24 36L18 42L12 36L18 30Z" fill="#A855F7" className="group-hover:fill-purple-500 transition-colors duration-300" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center tracking-tight group-hover:scale-105 transition-transform duration-500">
                Create With AI
              </h1>
              <p className="text-lg text-gray-600 text-center max-w-xl leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                Enter your content, provide instructions and generate any number
                of slides automatically.
              </p>
            </div>
          </div>
        </Link>

        {/* Layout Options */}
        <div className="mt-16">
          <p className="text-center text-gray-600 mb-8 text-lg">Or DIY with a layout</p>

          <div className="flex justify-center gap-6">
            {/* Template Categories */}
            {["BASIC", "IMAGES", "SECTIONS", "PROCESS", "TABLE"].map(
              (category) => (
                <div
                  key={category}
                  className={`w-52 flex flex-col items-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ${
                    activeCategory === category ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <div className="border border-gray-100 rounded-xl overflow-hidden mb-3 w-full aspect-[4/3] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {category === "BASIC" && (
                      <div className="p-6">
                        <div className="h-3 w-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-3"></div>
                        <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                        <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                        <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                      </div>
                    )}
                    {category === "IMAGES" && (
                      <div className="p-6">
                        <div className="h-3 w-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-3"></div>
                        <div className="h-20 w-full bg-gray-100 rounded-xl flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 shadow-inner"></div>
                        </div>
                      </div>
                    )}
                    {category === "SECTIONS" && (
                      <div className="p-6 flex gap-4">
                        <div className="w-1/2">
                          <div className="h-2 w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-3"></div>
                          <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="w-1/2">
                          <div className="h-2 w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-3"></div>
                          <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    {category === "PROCESS" && (
                      <div className="p-6">
                        <div className="h-2 w-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-4"></div>
                        <div className="flex justify-between mb-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 shadow-inner"></div>
                          <div className="h-10 w-10 rounded-lg bg-gray-100 shadow-inner"></div>
                          <div className="h-10 w-10 rounded-lg bg-gray-100 shadow-inner"></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                          <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                          <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    {category === "TABLE" && (
                      <div className="p-6">
                        <div className="h-2 w-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-3"></div>
                        <div className="border border-gray-100 rounded-lg shadow-inner">
                          <div className="h-5 w-full bg-gray-50 flex">
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4"></div>
                          </div>
                          <div className="h-4 w-full flex">
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4"></div>
                          </div>
                          <div className="h-4 w-full flex">
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4 border-r border-gray-100"></div>
                            <div className="w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full p-0 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                    <span className="text-sm text-gray-500 min-w-[40px] text-center">
                      {category === "BASIC" && "1/6"}
                      {category === "IMAGES" && "1/5"}
                      {category === "SECTIONS" && "1/4"}
                      {category === "PROCESS" && "1/2"}
                      {category === "TABLE" && "1/1"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full p-0 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  <span className="text-sm font-medium text-gray-900">
                    {category}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
