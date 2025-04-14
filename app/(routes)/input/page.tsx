'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PresentationCreator() {
  const [slideCount, setSlideCount] = useState(1);
  const [showSlideSelector, setShowSlideSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const handleSlideCountChange = (count: number) => {
    setSlideCount(count);
    setShowSlideSelector(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowSlideSelector(!showSlideSelector)}
                className="flex items-center text-sm text-gray-700 font-medium"
              >
                {slideCount} slide{slideCount !== 1 && 's'} <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {showSlideSelector && (
                <div className="absolute top-8 left-0 z-10">
                  <div className="bg-white border rounded-lg shadow-lg p-2 w-[240px]">
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                        <button
                          key={count}
                          onClick={() => handleSlideCountChange(count)}
                          className={`p-2 text-sm rounded hover:bg-gray-100 ${
                            count === slideCount ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Enter your Content
              </TabsTrigger>
              <TabsTrigger value="tone" className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Calibrate Tone & Verbosity
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">Input content for slides</span>
            </div>

            <div className="min-h-[300px] border rounded-md p-4">
              <p className="text-gray-500 text-sm">
                Paste your source material here — a document, notes, research data, blog draft,
                product specs, course outline, etc. The more detailed your content, the better the
                slides. You can also type bullet points of key information you want to communicate.
              </p>
            </div>

            <div className="border rounded-md p-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border rounded flex items-center justify-center mb-2">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Upload images</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <svg className="h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-medium">Instructions for AI</span>
            </div>

            <div className="min-h-[300px] border rounded-md p-4 space-y-4">
              <p className="text-gray-500 text-sm">
                Tell the AI exactly how to create your slides. You might want to instruct the AI on:
              </p>

              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  Structure (&ldquo;Break content into 5 key sections&rdquo;, &ldquo;Start with
                  problem statement, then solution&rdquo;, &ldquo;End with clear call to
                  action&rdquo;)
                </p>
                <p>
                  Content Focus (&ldquo;Emphasize cost savings&rdquo;, &ldquo;Include specific use
                  cases&rdquo;, &ldquo;Compare our solution with competitors&rdquo;, &ldquo;Show
                  before/after results&rdquo;)
                </p>
                <p>
                  Presentation Style (&ldquo;Use data visualizations where relevant&rdquo;,
                  &ldquo;Include thought-provoking questions&rdquo;, &ldquo;Limit text on each
                  slide&rdquo;)
                </p>
                <p>
                  Layout (&ldquo;Use a 2x2 comparison table to show features&rdquo;, &ldquo;Create a
                  timeline layout&rdquo;, &ldquo;Organize content in 3 columns&rdquo;)
                </p>
              </div>

              <p className="text-gray-500 text-sm">Be specific for best results.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium text-sm">ANSWER FOR BETTER RESULTS</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-1 h-5 w-5 p-0">
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">
                    Answering these questions will help the AI create more tailored slides for your
                    specific needs.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-blue-600 text-sm">What is the main goal of this presentation?</p>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-blue-600 text-sm">Who are you presenting to and where?</p>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-blue-600 text-sm">
                  How familiar is the audience with the topic?
                </p>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t">
          <Link href="/calibrate-tone">
            <Button className="flex items-center gap-2">Tone and Verbosity</Button>
          </Link>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}