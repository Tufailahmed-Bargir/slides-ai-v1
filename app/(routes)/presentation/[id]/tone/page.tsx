 
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Info, X } from "lucide-react";

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

export default function ToneCalibration({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    console.log('id is', id);
  const [showCustomTone, setShowCustomTone] = useState(false);
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
     const  data={
        tone,id
      }
      const response = await axios.post("/api/set-calibrate-tone", data);
      console.log("Tone response:", response.data);
      if(response.data.success){
        toast.success('tone set success!')
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
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="calibrate" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2 text-gray-500">
              <div className="flex items-center justify-center w-5 h-5 rounded-sm bg-gray-100 text-gray-500">
                <span className="text-xs">↩</span>
              </div>
              Enter your Content
            </TabsTrigger>
            <TabsTrigger value="calibrate" className="text-blue-500">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </span>
                Calibrate Tone & Verbosity
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <button className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-8">
          {/* Tone Selection */}
          <div>
            <h3 className="text-gray-700 font-medium mb-4">Calibrate Tone</h3>
            <div className="flex flex-wrap gap-2">
              {tones
                .filter((tone) => tone.row === 1)
                .map((tone) => (
                  <Button
                    key={tone.name}
                    type="button"
                    variant={selectedTone === tone.name ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 ${
                      selectedTone === tone.name
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleToneSelect(tone.name)}
                  >
                    {tone.name}
                  </Button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tones
                .filter((tone) => tone.row === 2)
                .map((tone) => (
                  <Button
                    key={tone.name}
                    type="button"
                    variant={selectedTone === tone.name ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 ${
                      selectedTone === tone.name
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleToneSelect(tone.name)}
                  >
                    {tone.name}
                  </Button>
                ))}
            </div>

            {/* Custom Tone Input */}
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full px-4 py-2 border-dashed border-gray-300 text-gray-700"
                onClick={handleCustomToneClick}
              >
                Custom tone
              </Button>
              {showCustomTone && (
                <div className="mt-2">
                  <Input
                    {...register("customTone")}
                    placeholder="Enter custom tone"
                    className="w-full max-w-xs"
                  />
                  {errors.customTone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customTone.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {errors.tone && (
              <p className="text-red-500 text-sm mt-2">{errors.tone.message}</p>
            )}
          </div>

          <Separator className="my-6" />

          {/* Verbosity */}
          <div>
            <h3 className="text-gray-700 font-medium mb-6">Set Verbosity</h3>
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
                    const response = await axios.post("/api/set-calibrate-verbosity", {verbosity: level,id});
                    console.log("Verbosity saved:", response.data);
                    if(response.data.success){
                      toast.success('verbosity set success!')
                     
                    }
                  } catch (error) {
                    console.error("Error saving verbosity", error);
                  }
                }}
                className="my-6"
              />

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {verbosityLabels.map((label, index) => (
                  <div
                    key={label}
                    className={`${index === verbosity ? "text-blue-500 font-medium" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {errors.verbosity && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.verbosity.message}
                </p>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 mt-12 text-gray-500 text-sm">
            <Info size={16} className="mt-1 flex-shrink-0" />
            <p>
              AI will apply these settings every time you generate new slides.
              You can fine tune these further once the slide is generated.
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-gray-500 text-sm mb-2">Preview</div>
          <div className="space-y-4">
            <h1 className="text-xl font-medium text-gray-800">
              # Large Language Models (LLMs)
            </h1>
            <div className="space-y-2 text-gray-700">
              <p>* AI systems trained on vast text datasets</p>
              <p>* Tasks: translation, summarization, content generation</p>
              <p>* Built on transformer architecture</p>
              <p>* Examples: GPT, BERT, LLaMA</p>
              <p>* Important considerations: ethics, bias, etc.</p>
            </div>
            <div className="flex items-start gap-2 mt-8 text-gray-500 text-sm">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>This is dummy text for setting tone and verbosity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button variant="outline" className="text-blue-500">
          Back
        </Button>
        <Button
          onClick={handleSubmit(async (data) => {
            try {
              const response = await axios.post("/api/generate-slides", {data, id});
              console.log("Final Submit:", response.data);
              if(response.data.success){
                router.push(`/presentation/${response.data.id}/preview`)
              }
            } catch (err) {
              console.error("Submit error:", err);
              toast.error("Failed to save settings.");
            }
          })}
        >
          Generate slides
        </Button>
      </div>
    </div>
  );
}
