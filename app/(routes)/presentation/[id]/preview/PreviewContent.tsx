"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Monitor, ArrowLeft, ChevronLeft, ChevronRight, Save, Edit, XCircle } from "lucide-react"; // Added Save, Edit, XCircle
import { Button } from "@/components/ui/button";
import SlideCard from "./SlidesCard";
import axios from "axios"; // Import axios for API calls

// Define the structure for a slide based on previous context
interface SlideData {
  title: string;
  content: string[];
  visuals?: string;
  layout?: string;
}

// Define the structure for the presentation content
interface PresentationContent {
  slides: SlideData[];
}

export default function PreviewContent({ initialData }: { initialData: { id: string; generated_content: string | null; } | null }) {
  const [viewMode, setViewMode] = useState<"grid" | "preview" | "edit">("grid"); // grid, preview, edit
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [editedContent, setEditedContent] = useState<PresentationContent | null>(null);

  // Load initial data into editedContent state
  useEffect(() => {
    if (initialData?.generated_content) {
      try {
        const content: PresentationContent = JSON.parse(initialData.generated_content);
        setEditedContent(content);
      } catch (error) {
        console.error('Error parsing presentation content:', error);
        toast.error('Error loading presentation content');
        setEditedContent(null); // Reset on error
      }
    } else {
      setEditedContent(null); // Reset if no initial content
    }
  }, [initialData?.generated_content]);

  // Handlers for slide content changes
  const handleTitleChange = useCallback((newTitle: string) => {
    setEditedContent(prevContent => {
      if (!prevContent) return null;
      const newSlides = [...prevContent.slides];
      newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], title: newTitle };
      return { ...prevContent, slides: newSlides };
    });
  }, [currentSlideIndex]);

  const handleContentChange = useCallback((contentIndex: number, newContent: string) => {
    setEditedContent(prevContent => {
      if (!prevContent) return null;
      const newSlides = [...prevContent.slides];
      const currentSlide = { ...newSlides[currentSlideIndex] };
      const newSlideContent = [...currentSlide.content];
      newSlideContent[contentIndex] = newContent;
      currentSlide.content = newSlideContent;
      newSlides[currentSlideIndex] = currentSlide;
      return { ...prevContent, slides: newSlides };
    });
  }, [currentSlideIndex]);

  // Keyboard navigation for preview/edit modes
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (viewMode === "grid" || !editedContent) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { // Spacebar
      e.preventDefault(); // Prevent spacebar scroll
      setCurrentSlideIndex(prev => Math.min(prev + 1, editedContent.slides.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      setViewMode("grid"); // Exit preview/edit to grid view
    }
  }, [viewMode, editedContent]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Save changes function
  const handleSaveChanges = async () => {
    if (!initialData?.id || !editedContent) {
      toast.error("Cannot save. Presentation data is missing.");
      return;
    }
    setIsSaving(true);
    try {
      const response = await axios.put(`/api/presentation/${initialData.id}`, {
        generated_content: JSON.stringify(editedContent),
      });
      if (response.data.success) {
        toast.success("Changes saved successfully!");
        // Optionally refetch data or update initialData if needed
      } else {
        throw new Error(response.data.message || "Failed to save changes");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Render Logic ---

  if (!initialData) {
    // ... (loading state remains the same)
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

  if (!editedContent || !editedContent.slides) {
    // ... (no content state remains the same)
     return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Content Available</h2>
          <p className="text-gray-600">The presentation content could not be found or is invalid. Please try generating it again.</p>
        </div>
      </div>
    );
  }

  // --- Full Screen Preview Mode ---
  if (viewMode === "preview") {
    return (
      <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-[60]">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setViewMode("grid")} // Go back to grid
            title="Exit Preview (Esc)"
          >
            <XCircle className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[60]">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
            onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="bg-white/10 rounded-full px-4 py-1.5">
            <span className="text-white/90 text-sm font-medium">
              {currentSlideIndex + 1} / {editedContent.slides.length}
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
            onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, editedContent.slides.length - 1))}
            disabled={currentSlideIndex === editedContent.slides.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="w-full max-w-7xl aspect-video bg-white rounded-lg shadow-2xl overflow-hidden">
          <SlideCard
            key={`preview-${currentSlideIndex}`}
            {...editedContent.slides[currentSlideIndex]}
            isPreviewMode={true}
            isEditing={false} // Not editing in preview mode
          />
        </div>
      </div>
    );
  }

  // --- Edit Mode (Single Slide View) ---
  if (viewMode === "edit") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Header for Edit Mode */}
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                 <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setViewMode("grid")} // Go back to grid view
                    title="Back to Grid View"
                 >
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                 </Button>
                 <div>
                    <h1 className="text-lg font-semibold text-gray-900">Editing Slide {currentSlideIndex + 1}</h1>
                    <p className="text-sm text-gray-500">{editedContent.slides[currentSlideIndex].title || 'Untitled Slide'}</p>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 {/* Add Toolbar Buttons Here Later */}
                 <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 gap-2 hover:bg-gray-50 transition-all disabled:opacity-75"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                 >
                    {isSaving ? (
                       <>
                          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                          Saving...
                       </>
                    ) : (
                       <>
                          <Save className="h-4 w-4" />
                          Save Changes
                       </>
                    )}
                 </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Editing Area */}
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-5xl aspect-video bg-white rounded-lg shadow-xl overflow-hidden relative">
             {/* Slide Navigation Arrows */}
             {currentSlideIndex > 0 && (
                <Button
                   variant="ghost"
                   size="icon"
                   className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
                   onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                   title="Previous Slide (Left Arrow)"
                >
                   <ChevronLeft className="h-6 w-6" />
                </Button>
             )}
             {currentSlideIndex < editedContent.slides.length - 1 && (
                <Button
                   variant="ghost"
                   size="icon"
                   className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
                   onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                   title="Next Slide (Right Arrow)"
                >
                   <ChevronRight className="h-6 w-6" />
                </Button>
             )}

             {/* Editable Slide Card */}
             <SlideCard
                key={`edit-${currentSlideIndex}`}
                {...editedContent.slides[currentSlideIndex]}
                isPreviewMode={false} // Not full preview
                isEditing={true}      // Enable editing!
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
             />
          </div>
        </main>
      </div>
    );
  }

  // --- Default Grid View ---
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white">
      {/* Header for Grid View*/}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href={`/presentation/${initialData.id}/tone`}>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Preview & Edit Slides</h1>
                <p className="text-sm text-gray-500">{editedContent.slides.length} slides</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 gap-2 hover:bg-gray-50 transition-all"
                onClick={() => setViewMode("preview")} // Switch to preview mode
                title="Enter Full Screen Preview"
              >
                <Monitor className="h-4 w-4" />
                Preview
              </Button>
               <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 gap-2 hover:bg-gray-50 transition-all disabled:opacity-75"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  title="Save any changes made in edit mode"
               >
                  {isSaving ? (
                     <>
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        Saving...
                     </>
                  ) : (
                     <>
                        <Save className="h-4 w-4" />
                        Save Changes
                     </>
                  )}
               </Button>
              {/* Add Download Button back if needed */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Changed from flex horizontal scroll to vertical grid */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {editedContent.slides.map((slide, idx) => (
            <div
              key={`grid-${idx}`}
              // Removed flex-shrink-0 and fixed width
              className="bg-white rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 relative overflow-hidden group cursor-pointer hover:shadow-md"
              onClick={() => {
                 setCurrentSlideIndex(idx);
                 setViewMode("edit"); // Switch to edit mode on click
              }}
              title="Click to edit this slide"
            >
              {/* Edit Icon Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <Edit className="h-8 w-8 text-white" />
              </div>
              {/* Slide Number */}
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-[10px] font-semibold shadow-inner">
                  {idx + 1}
                </span>
              </div>
              {/* Non-editable Slide Card for Grid */}
              <SlideCard
                {...slide}
                isPreviewMode={false}
                isEditing={false} // Ensure cards in grid are not editable
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}