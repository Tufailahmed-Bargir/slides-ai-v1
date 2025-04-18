"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Monitor, Download, ArrowLeft, PlayIcon, Settings, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlideCard from "./SlidesCard";

interface Slide {
  title: string;
  content: string[];
  visuals?: string;
  layout?: string;
}

export default function PreviewContent({ initialData }: { initialData: { id: string; generated_content: string | null; } | null }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  // Process the content
  const processedContent: { slides: Slide[] } | null = initialData?.generated_content
    ? JSON.parse(initialData.generated_content)
    : null;

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPreviewMode || !processedContent?.slides) return;
    
    if (e.key === "ArrowRight" || e.key === "Space") {
      setCurrentSlideIndex(prev => Math.min(prev + 1, processedContent.slides.length - 1));
    } else if (e.key === "ArrowLeft") {
      setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      setIsPreviewMode(false);
    }
  }, [isPreviewMode, processedContent?.slides]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const handleDownload = async () => {
    if (!processedContent) return;
    
    try {
      setIsDownloading(true);
      // TODO: Implement actual download functionality
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Presentation downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download presentation");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle loading state
  if (!initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Loading...</h2>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!processedContent || !processedContent.slides) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Content Available</h2>
          <p className="text-gray-600">The presentation content could not be found. Please try generating it again.</p>
        </div>
      </div>
    );
  }

  if (isPreviewMode) {
    return (
      <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsPreviewMode(false)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition-colors"
            onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="bg-white/10 rounded-full px-4 py-1.5">
            <span className="text-white/90 text-sm font-medium">
              {currentSlideIndex + 1} / {processedContent.slides.length}
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition-colors"
            onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, processedContent.slides.length - 1))}
            disabled={currentSlideIndex === processedContent.slides.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-full max-w-7xl aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform transform hover:scale-[1.02]">
          <SlideCard
            key={currentSlideIndex}
            {...processedContent.slides[currentSlideIndex]}
            isPreviewMode={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href={`/presentation/${initialData.id}/tone`}>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Preview Slides</h1>
                <p className="text-sm text-gray-500">{processedContent.slides.length} slides</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 gap-2 hover:bg-gray-50 transition-all"
                onClick={() => setIsPreviewMode(true)}
              >
                <Monitor className="h-4 w-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 gap-2 hover:bg-gray-50 transition-all"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download
                  </>
                )}
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
                onClick={() => router.push(`/presentation/${initialData.id}/present`)}
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Present
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {processedContent.slides.map((slide, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-200 group"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900/80 text-white text-xs font-medium">
                  {idx + 1}
                </span>
              </div>
              <SlideCard
                {...slide}
                isPreviewMode={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}