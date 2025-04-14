"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, HelpCircle, Share, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PresentationUI() {
  const [activeCategory, setActiveCategory] = useState("BASIC")

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center px-4 py-2 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-2">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div className="border-r border-gray-200 h-6 mx-2"></div>
          <span className="text-gray-700 font-medium">Untitled Presentation</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share className="h-5 w-5 text-gray-500" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Play className="h-4 w-4 mr-1" />
            Present
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-8 top-4">
                <div className="w-4 h-4"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
              <p className="text-sm text-center">
                You can change your theme
                <br />
                anytime from here
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Slide Preview */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden aspect-video relative">
          <div className="absolute inset-0 bg-purple-100/30 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="flex items-center justify-center mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12L30 18L36 12L30 6L24 12Z" fill="#9333EA" />
                <path d="M36 24L30 18L36 12L42 18L36 24Z" fill="#A855F7" />
                <path d="M18 30L24 36L18 42L12 36L18 30Z" fill="#A855F7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create With AI</h1>
            <p className="text-gray-600 text-center max-w-lg">
              Enter your content, provide instructions and generate any number of slides automatically.
            </p>
          </div>
        </div>

        {/* Layout Options */}
        <div className="mt-12">
          <p className="text-center text-gray-600 mb-6">Or DIY with a layout</p>

          <div className="flex justify-center gap-4">
            {/* Template Categories */}
            {["BASIC", "IMAGES", "SECTIONS", "PROCESS", "TABLE"].map((category, ) => (
              <div
                key={category}
                className={`w-48 flex flex-col items-center ${activeCategory === category ? "opacity-100" : "opacity-80"}`}
                onClick={() => setActiveCategory(category)}
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-2 w-full aspect-[4/3] bg-white">
                  {category === "BASIC" && (
                    <div className="p-4">
                      <div className="h-3 w-24 bg-gray-800 rounded mb-2"></div>
                      <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                      <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                      <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                  )}
                  {category === "IMAGES" && (
                    <div className="p-4">
                      <div className="h-3 w-24 bg-gray-800 rounded mb-2"></div>
                      <div className="h-16 w-full bg-gray-200 rounded flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  )}
                  {category === "SECTIONS" && (
                    <div className="p-4 flex">
                      <div className="w-1/2 pr-1">
                        <div className="h-2 w-full bg-gray-800 rounded mb-2"></div>
                        <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-1/2 pl-1">
                        <div className="h-2 w-full bg-gray-800 rounded mb-2"></div>
                        <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  )}
                  {category === "PROCESS" && (
                    <div className="p-4">
                      <div className="h-2 w-24 bg-gray-800 rounded mb-3"></div>
                      <div className="flex justify-between mb-1">
                        <div className="h-8 w-8 rounded bg-gray-200"></div>
                        <div className="h-8 w-8 rounded bg-gray-200"></div>
                        <div className="h-8 w-8 rounded bg-gray-200"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-2 w-8 bg-gray-400 rounded"></div>
                        <div className="h-2 w-8 bg-gray-400 rounded"></div>
                        <div className="h-2 w-8 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                  )}
                  {category === "TABLE" && (
                    <div className="p-4">
                      <div className="h-2 w-24 bg-gray-800 rounded mb-2"></div>
                      <div className="border border-gray-200 rounded">
                        <div className="h-4 w-full bg-gray-100 flex">
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4"></div>
                        </div>
                        <div className="h-3 w-full flex">
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4"></div>
                        </div>
                        <div className="h-3 w-full flex">
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4 border-r border-gray-200"></div>
                          <div className="w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-gray-500">
                    {category === "BASIC" && "1/6"}
                    {category === "IMAGES" && "1/5"}
                    {category === "SECTIONS" && "1/4"}
                    {category === "PROCESS" && "1/2"}
                    {category === "TABLE" && "1/1"}
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <span className="text-xs font-medium text-gray-500">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
