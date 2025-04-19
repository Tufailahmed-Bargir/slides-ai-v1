"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import {
  LayoutGrid,
  MonitorPlay,
  ChevronDown,
  Loader2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Loader from "@/app/Components/Loader"
import { useState, useEffect } from "react"

export default function PresentationDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isCreating, setIsCreating] = useState(false)
  const [presentations, setPresentations] = useState<
    Array<{
      id: string
      content_input: string | null
      generated_content: string | null
      createdAt: Date
    }>
  >([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPresentations = async () => {
      try {
        const response = await axios.get("/api/get-all")
        setPresentations(response.data.presentation)
      } catch (error) {
        console.error("Error fetching presentations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      fetchPresentations()
    }
  }, [session])

  if (status === "loading") {
    return <Loader />
  }
  if (!session?.user) {
    redirect("/login")
  }

  const handleClick = async () => {
    try {
      setIsCreating(true)
      const data = {
        name: "ahmed",
      }
      const res = await axios.post("/api/presentation", data)
      if (res.data.success) {
        router.push(`/presentation/${res.data.id}`)
      }
    } catch (error) {
      console.error("Error creating presentation:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Function to extract title from generated content if available 
  const extractTitle = (presentation) => {
    if (!presentation.content_input && !presentation.generated_content) {
      return "Untitled Presentation"
    }

    if (presentation.content_input) {
      return presentation.content_input.charAt(0).toUpperCase() + presentation.content_input.slice(1)
    }

    if (presentation.generated_content) {
      try {
        const content = JSON.parse(presentation.generated_content)
        if (content.slides && content.slides.length > 0 && content.slides[0].title) {
          return content.slides[0].title
        }
      } catch (e) {
        console.log('error found', e)
        // If parsing fails, return default
      }
    }

    return "Untitled Presentation"
  }

  // Function to extract slide count from generated content
  const extractSlideCount = (presentation) => {
    if (presentation.generated_content) {
      try {
        const content = JSON.parse(presentation.generated_content)
        if (content.slides) {
          return content.slides.length
        }
      } catch (e) {
        console.log('error found', e)
        // If parsing fails, return default
      }
    }
    return 0
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-[320px] border-r border-gray-200 bg-white shadow-sm flex flex-col">
        {/* User Profile */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 group hover:bg-gray-50 transition-colors cursor-pointer">
          <Avatar className="h-11 w-11 ring-2 ring-white shadow-md">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">{session?.user?.name || "User"}</span>
            <span className="text-gray-500 text-xs">Premium User</span>
          </div>
          <div className="ml-auto p-1 rounded-full group-hover:bg-gray-100 transition-colors">
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Create Button */}
        <div className="px-4 py-5">
          <Button
            onClick={handleClick}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-lg shadow-blue-500/10 flex items-center gap-2 justify-center py-6 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MonitorPlay className="w-5 h-5" />}
            {isCreating ? "Creating..." : "Create new presentation"}
          </Button>
        </div>

        {/* Navigation */}
        <div className="mt-2 px-3">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-blue-50 text-blue-700 rounded-lg border border-blue-100/50 shadow-sm">
            <LayoutGrid className="w-5 h-5" />
            <span className="font-medium">All presentations</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your presentations</h1>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : presentations.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-2xl p-24 flex flex-col items-center justify-center shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="bg-gray-50 p-4 rounded-full mb-6">
                <MonitorPlay className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-900 text-xl font-semibold mb-3">No presentations yet</p>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Create your first presentation and start crafting amazing slides with AI assistance.
              </p>
              <Link
                href="#"
                onClick={handleClick}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Create your first presentation →
              </Link>
            </div>
          ) : (
     

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {presentations.map((presentation) => {
        // Generate a random pastel color for cards without background images
        
        return (
          <Link
                  key={presentation.id}
                  href={`/presentation/${presentation.id}/preview`}
                  className="block group"
                >
                  <Card className="h-full overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                    <CardContent className="p-6">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {extractTitle(presentation)}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{formatDate(new Date(presentation.createdAt))}</span>
                            <span>•</span>
                            <span>{extractSlideCount(presentation)} slides</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-2 rounded-lg">
                          <MonitorPlay className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      
                      {/* Preview Section */}
                      <div className="mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl aspect-video relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0">
                          <Image 
                            src="/ppt.png"
                            alt="Presentation preview"
                            fill 
                            className="object-contain    duration-300 cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="space-y-2.5 w-full max-w-[80%]">
                            <div className="h-1.5 bg-gray-200/80 rounded-full w-full group-hover:bg-blue-200/60 transition-colors duration-300"></div>
                            <div className="h-1.5 bg-gray-200/80 rounded-full w-4/5 group-hover:bg-blue-200/60 transition-colors duration-300"></div>
                            <div className="h-1.5 bg-gray-200/80 rounded-full w-2/3 group-hover:bg-blue-200/60 transition-colors duration-300"></div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex justify-end">
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                          <span>View Presentation</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
        )
      })}
    </div>
          )}
        </div>
      </div>
    </div>
  )
}
