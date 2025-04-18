"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Monitor, ArrowLeft,  ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlideCard from "./SlidesCard";
 

 

export default function PreviewContent({ initialData }: { initialData: { id: string; generated_content: string | null; } | null }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // const [isDownloading, setIsDownloading] = useState(false);
  const [processedContent, setProcessedContent] = useState<{
    slides: Array<{ title: string; content: string[]; visuals?: string; layout?: string; }>;
  } | null>(null);

  useEffect(() => {
    if (initialData?.generated_content) {
      try {
        const content = JSON.parse(initialData.generated_content);
        setProcessedContent(content);
      } catch (error) {
        console.error('Error parsing presentation content:', error);
        toast.error('Error loading presentation content');
      }
    }
  }, [initialData?.generated_content]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPreviewMode || !processedContent) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Space") {
      setCurrentSlideIndex(prev => Math.min(prev + 1, processedContent.slides.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      setIsPreviewMode(false);
    }
  }, [isPreviewMode, processedContent]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // const handleDownload = async () => {
  //   if (!initialData?.id) {
  //     toast.error("Presentation data not found");
  //     return;
  //   }
    
  //   try {
  //     setIsDownloading(true);
  //     const response = await axios.post("/api/download-ppt", {
  //       id: initialData.id
  //     });
      
  //     if (response.data.success) {
  //       // Convert base64 to Blob
  //       const byteCharacters = atob(response.data.data);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);
  //       const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });

  //       // Create download link
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = response.data.filename;
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);

  //       toast.success("Presentation downloaded successfully!");
  //     } else {
  //       throw new Error(response.data.message || 'Failed to download presentation');
  //     }
  //   } catch (err) {
  //     console.error("Download error:", err);
  //     toast.error(err instanceof Error ? err.message : "Failed to download presentation");
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

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
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsPreviewMode(false)}
          >
            <ArrowLeft className="h-5 w-5" />
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
              {/* <Button
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
                    Download PPT
                  </>
                )}
              </Button> */}
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