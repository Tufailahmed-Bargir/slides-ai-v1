"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Info, ArrowLeft, SparklesIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  tone: z.string().min(1, "Please select a tone"),
  verbosity: z
    .number()
    .min(0, "Verbosity must be selected")
    .max(4, "Verbosity must be selected"),
  customTone: z.string().optional(),
});

export default function ToneCalibration({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [showCustomTone, setShowCustomTone] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tone: "Default",
      verbosity: 2,
      customTone: "",
    },
  });

  const selectedTone = watch("tone");
  const verbosity = watch("verbosity");

  const tones = [
    { name: "Default", row: 1 },
    { name: "Professional", row: 1 },
    { name: "Casual", row: 1 },
    { name: "Persuasive", row: 1 },
    { name: "Inspirational", row: 1 },
    { name: "Educational", row: 2 },
    { name: "Narrative", row: 2 },
    { name: "Authoritative", row: 2 },
    { name: "Technical", row: 2 },
    { name: "Empathetic", row: 2 },
  ];

  const verbosityLabels = [
    "LOW",
    "LOW-MEDIUM",
    "MEDIUM",
    "MEDIUM-HIGH",
    "HIGH",
  ];

  const handleToneSelect = async (tone: string) => {
    setValue("tone", tone, { shouldValidate: true });
    if (tone !== "Custom") {
      setShowCustomTone(false);
      setValue("customTone", "");
    }

    try {
      const data = {
        tone,
        id,
      };
      const response = await axios.post("/api/set-calibrate-tone", data);
      console.log("Tone response:", response.data);
      if (response.data.success) {
        toast.success("tone set success!");
      }
    } catch (err) {
      console.error("Error setting tone:", err);
    }
  };

  const handleCustomToneClick = () => {
    setShowCustomTone(true);
    setValue("tone", "Custom", { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white p-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white/70 backdrop-blur-lg sticky top-0 z-50">
          <Tabs defaultValue="calibrate" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-gray-50/50 rounded-xl">
              <TabsTrigger
                value="content"
                className="flex items-center gap-2 text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all"
                onClick={() => router.push(`/presentation/${id}/input`)}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 text-gray-500">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                Back to Content
              </TabsTrigger>
              <TabsTrigger 
                value="calibrate" 
                className="flex items-center gap-2 text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-blue-500">
                  <SparklesIcon className="h-4 w-4" />
                </div>
                Tone & Verbosity
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {/* Tone Selection */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Calibrate Tone</h3>
                  <p className="text-sm text-gray-500">Choose the tone that best fits your presentation</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {tones
                    .filter((tone) => tone.row === 1)
                    .map((tone) => (
                      <Button
                        key={tone.name}
                        type="button"
                        variant={selectedTone === tone.name ? "default" : "outline"}
                        className={`rounded-full px-4 py-2 transition-all duration-200 ${
                          selectedTone === tone.name
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                            : "bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleToneSelect(tone.name)}
                      >
                        {tone.name}
                      </Button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tones
                    .filter((tone) => tone.row === 2)
                    .map((tone) => (
                      <Button
                        key={tone.name}
                        type="button"
                        variant={selectedTone === tone.name ? "default" : "outline"}
                        className={`rounded-full px-4 py-2 transition-all duration-200 ${
                          selectedTone === tone.name
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                            : "bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleToneSelect(tone.name)}
                      >
                        {tone.name}
                      </Button>
                    ))}
                </div>

                {/* Custom Tone Input */}
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className={`rounded-full px-4 py-2 border-dashed border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all ${
                      showCustomTone ? "bg-blue-50 border-blue-200 text-blue-600" : ""
                    }`}
                    onClick={handleCustomToneClick}
                  >
                    + Custom tone
                  </Button>
                  {showCustomTone && (
                    <div className="mt-3">
                      <Input
                        {...register("customTone")}
                        placeholder="Enter custom tone"
                        className="w-full max-w-xs rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                      {errors.customTone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                          </svg>
                          {errors.customTone.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {errors.tone && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {errors.tone.message}
                </p>
              )}
            </div>

            <Separator className="my-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

            {/* Verbosity */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg shadow-purple-500/20">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Set Verbosity</h3>
                  <p className="text-sm text-gray-500">Adjust the level of detail in your slides</p>
                </div>
              </div>

              <div className="px-2">
                <Slider
                  value={[verbosity]}
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={async (value) => {
                    const level = value[0];
                    setValue("verbosity", level, { shouldValidate: true });

                    try {
                      const response = await axios.post(
                        "/api/set-calibrate-verbosity",
                        { verbosity: level, id },
                      );
                      if (response.data.success) {
                        toast.success("Verbosity level updated", {
                          description: `Set to ${verbosityLabels[level]}`,
                        });
                      }
                    } catch (error) {
                      console.error("Error saving verbosity", error);
                      toast.error("Failed to update verbosity level");
                    }
                  }}
                  className="my-6"
                />

                <div className="flex justify-between text-xs font-medium mt-4">
                  {verbosityLabels.map((label, index) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center transition-colors ${
                        index === verbosity 
                        ? "text-blue-600" 
                        : "text-gray-400"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mb-2 ${
                        index === verbosity 
                        ? "bg-blue-600" 
                        : "bg-gray-300"
                      }`} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {errors.verbosity && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {errors.verbosity.message}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                AI will apply these settings every time you generate new slides.
                You can fine-tune these further once the slides are generated.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-100 bg-white/70 backdrop-blur-lg">
          <Button
            onClick={handleSubmit(async (data) => {
              try {
                setIsGenerating(true);
                const response = await axios.post("/api/generate-slides", {
                  data,
                  id,
                });
                if (response.data.success) {
                  router.push(`/presentation/${response.data.id}/preview`);
                }
              } catch (err) {
                console.error("Submit error:", err);
                toast.error("Failed to generate slides");
              } finally {
                setIsGenerating(false);
              }
            })}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8 py-2.5 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="h-4 w-4" />
                Generate slides
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
