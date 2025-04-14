"use client";

import {
  ChevronDown,
  MessageSquare,
  Play,
  Share2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Card } from '@/components/ui/card';

export default function PresentationInterface() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="flex items-center px-4 h-14 border-b bg-white">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-2">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="mx-4 text-gray-700">Untitled Presentation</div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Presentation Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <Card className="w-full max-w-5xl aspect-video bg-white shadow-sm">
            <div className="flex flex-col p-12 w-full">
              <div className="flex gap-12">
                {/* Left content area - placeholder */}
                <div className="w-5/12 aspect-square bg-gray-100 rounded-md"></div>

                {/* Right content area - text placeholders */}
                <div className="w-7/12 flex flex-col gap-6">
                  <div className="h-6 bg-gray-100 rounded-md w-full"></div>
                  <div className="h-6 bg-gray-100 rounded-md w-5/6"></div>
                  <div className="h-6 bg-gray-100 rounded-md w-4/6"></div>

                  <div className="mt-auto">
                    <div className="h-6 bg-gray-100 rounded-md w-full mt-12"></div>
                    <div className="h-6 bg-gray-100 rounded-md w-5/6 mt-6"></div>
                    <div className="h-6 bg-gray-100 rounded-md w-4/6 mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l bg-white overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Generating variants
              </div>
              <div className="text-sm text-blue-600">0/4</div>
            </div>
          </div>

          <div className="p-4">
            <div className="aspect-video bg-gray-50 border rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="h-6 border-t bg-white flex items-center px-4">
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div className="bg-gray-400 h-1 w-1/3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
