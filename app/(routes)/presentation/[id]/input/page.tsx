"use client";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ChevronDown, HelpCircle, X, ArrowRight, ChevronRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
 

const formSchema = z.object({
  content: z.string().min(1, "Input content cannot be Empty"),
  instructions: z.string().min(1, "Instructions Cannot be Empty"),
  goal: z.string().optional(),
  audience: z.string().optional(),
  familiarity: z.string().optional(),
});

export default function PresentationCreator({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [slideCount, setSlideCount] = useState(1);
  const [showSlideSelector, setShowSlideSelector] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [showOptimizeSection, setShowOptimizeSection] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      instructions: "",
      goal: "",
      audience: "",
      familiarity: "",
    },
  });

  const handleSlideCountChange = (count: number) => {
    setSlideCount(count);
    setShowSlideSelector(false);
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview); // Clean up the URL
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  type InputType = {
    instructions: string;
    content: string;
    goal?: string;
    familiarity?: string;
    audience?: string;
  };

  const onSubmit = async (data: InputType) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/input", { data, id , slideCount});
      if (response.data.success) {
        toast.success("Input and system instruction saved successfully");
        router.push(`/presentation/${response.data.id}/tone`);
      }
    } catch (error) {
      toast.error("Failed to save input");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white p-6">
      <div className="mx-auto max-w-7xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/70 backdrop-blur-lg sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowSlideSelector(!showSlideSelector)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700 font-medium border border-gray-200/50"
              >
                {slideCount} slide{slideCount !== 1 && "s"}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showSlideSelector && (
                <div className="absolute top-12 left-0 z-10">
                  <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-3 w-[280px]">
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                        <button
                          key={count}
                          onClick={() => handleSlideCountChange(count)}
                          className={`p-3 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
                            count === slideCount
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-600"
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

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-transparent p-0">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-full px-4 py-2 text-sm font-medium text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-1.5 rounded-md text-blue-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Input content
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="tone"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-full px-4 py-2 text-sm font-medium text-gray-600 ml-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-1.5 rounded-md text-purple-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    Calibrate Tone & Style
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-8 h-8 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Input content for slides</h2>
                    <p className="text-sm text-gray-500">Enter your content or paste from existing documents</p>
                  </div>
                </div>

                <textarea
                  {...register("content")}
                  className="w-full min-h-[300px] rounded-xl border border-gray-200 p-4 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none bg-white/50 backdrop-blur-sm"
                  placeholder="Paste your source material here — a document, notes, research data, blog draft, product specs, course outline, etc. The more detailed your content, the better the slides. You can also type bullet points of key information you want to communicate."
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    {errors.content.message}
                  </p>
                )}

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Additional visuals</h3>
                      <p className="text-xs text-gray-500">Add images to enhance your presentation</p>
                    </div>
                  </div>

                  <div className="group relative border-2 border-dashed border-gray-200 rounded-xl transition-all hover:border-blue-400">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      accept="image/jpeg,image/png,application/pdf" 
                      multiple 
                      onChange={handleFileUpload}
                    />
                    <div className="p-8 flex flex-col items-center justify-center">
                      <div className="mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-inner">
                          <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16.5L12 21m0 0l5-4.5M12 21V3" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Drop your files here or{" "}
                          <span className="text-blue-600 group-hover:text-blue-700 transition-colors">browse</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Supported formats: JPG, PNG, PDF (max. 10MB)
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                  </div>

                  {/* File Preview Section */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-4">
                      {uploadedFiles.map((file, index) => (
                        <div 
                          key={index}
                          className="group relative aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center hover:border-blue-400 transition-colors"
                        >
                          {file.file.type.startsWith('image/') ? (
                            // Use regular img tag for blob URLs instead of Next.js Image component
                            <img
                              src={file.preview} 
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 text-gray-400">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <button 
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                          >
                            <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-500 transition-colors" />
                          </button>
                          <div className="absolute bottom-1 left-1 right-1">
                            <p className="text-[10px] text-gray-500 truncate px-1.5 py-0.5 bg-white/90 rounded-full text-center">
                              {file.file.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg shadow-purple-500/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Instructions for AI</h2>
                    <p className="text-sm text-gray-500">Guide the AI to create your perfect slides</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl p-5 mb-4">
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Tell the AI exactly how to create your slides:
                  </p>

                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Structure</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          &ldquo;Break content into 5 key sections&rdquo;, &ldquo;Start with problem statement, then solution&rdquo;, &ldquo;End with clear call to action&rdquo;
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-200 transition-colors">
                        <span className="text-blue-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Content Focus</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          &ldquo;Emphasize cost savings&rdquo;, &ldquo;Include specific use cases&rdquo;, &ldquo;Compare our solution with competitors&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-green-200 transition-colors">
                        <span className="text-green-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Presentation Style</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          &ldquo;Use data visualizations&rdquo;, &ldquo;Include thought-provoking questions&rdquo;, &ldquo;Limit text per slide&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <textarea
                  {...register("instructions")}
                  className="w-full min-h-[200px] rounded-xl border border-gray-200 p-4 text-sm text-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your specific instructions here..."
                />
                {errors.instructions && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    {errors.instructions.message}
                  </p>
                )}
              </div>

              {/* Optional Questions - Enhanced */}
              <div className="pt-6 border-t border-gray-100">
                <div 
                  onClick={() => setShowOptimizeSection(!showOptimizeSection)}
                  className="w-full flex items-center gap-3 mb-6 group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2.5 rounded-xl text-white shadow-lg shadow-green-500/20">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        OPTIMIZE YOUR RESULTS
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white p-3 rounded-lg shadow-xl border border-gray-100">
                            <p className="text-xs text-gray-600 max-w-[200px]">
                              Optional but recommended. These details help the AI create
                              more tailored and effective slides.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-gray-500">Click to answer optional questions for better results</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showOptimizeSection ? 'rotate-90' : ''}`} />
                </div>

                {showOptimizeSection && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Card className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-blue-100/50 hover:from-blue-100/50 hover:to-blue-200/50 transition-all duration-300 group">
                      <p className="text-sm font-medium text-blue-700 mb-2 group-hover:text-blue-800">
                        What is the main goal of this presentation?
                      </p>
                      <textarea
                        {...register("goal")}
                        className="w-full rounded-lg border border-blue-200/50 p-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your answer here"
                        rows={3}
                      />
                    </Card>

                    <Card className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-purple-100/50 hover:from-purple-100/50 hover:to-purple-200/50 transition-all duration-300 group">
                      <p className="text-sm font-medium text-purple-700 mb-2 group-hover:text-purple-800">
                        Who are you presenting to and where?
                      </p>
                      <textarea
                        {...register("audience")}
                        className="w-full rounded-lg border border-purple-200/50 p-3 text-sm text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your answer here"
                        rows={3}
                      />
                    </Card>

                    <Card className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-green-50/50 to-green-100/50 hover:from-green-100/50 hover:to-green-200/50 transition-all duration-300 group">
                      <p className="text-sm font-medium text-green-700 mb-2 group-hover:text-green-800">
                        How familiar is the audience with the topic?
                      </p>
                      <textarea
                        {...register("familiarity")}
                        className="w-full rounded-lg border border-green-200/50 p-3 text-sm text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your answer here"
                        rows={3}
                      />
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8 py-2.5 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Next: Tone and Verbosity
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
