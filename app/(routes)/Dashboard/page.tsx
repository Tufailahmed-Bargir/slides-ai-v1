"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutGrid, MonitorPlay, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/app/Components/Loader";
import { useState } from "react";

export default function PresentationDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isCreating, setIsCreating] = useState(false);

  if (status === "loading") {
    return <Loader />;
  }
  if (!session?.user) {
    redirect("/login");
  }

  const handleClick = async () => {
    try {
      setIsCreating(true);
      const data = {
        name: "ahmed",
      };
      const res = await axios.post("/api/presentation", data);
      if (res.data.success) {
        router.push(`/presentation/${res.data.id}`);
      }
    } catch (error) {
      console.error("Error creating presentation:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-[320px] border-r border-gray-200 bg-white shadow-sm flex flex-col">
        {/* User Profile */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 group hover:bg-gray-50 transition-colors cursor-pointer">
          <Avatar className="h-11 w-11 ring-2 ring-white shadow-md">
            <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">{session?.user?.name || 'User'}</span>
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
            {isCreating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <MonitorPlay className="w-5 h-5" />
            )}
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
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Your presentations
          </h1>

          {/* Empty State */}
          <div className="bg-white rounded-2xl p-24 flex flex-col items-center justify-center shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="bg-gray-50 p-4 rounded-full mb-6">
              <MonitorPlay className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-900 text-xl font-semibold mb-3">
              No presentations yet
            </p>
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
        </div>
      </div>
    </div>
  );
}
