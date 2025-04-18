'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutGrid, MonitorPlay, ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/app/Components/Loader";
export default function PresentationDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if(status ==='loading'){
    return <Loader/>
  }
  if (!session?.user) {
    redirect('/login')
  }

  
  const handleClick = async () => {
    const data = {
      name: 'ahmed'  // Fixed typo from 'namd' to 'name'
    }
     const res = await axios.post('/api/presentation',data)
     console.log('response from /prese... rote');
     console.log(res.data);
     if(res.data.success){

       router.push(`/presentation/${res.data.id}`)
     }
     
     
  }
  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-[320px] border-r border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-4 flex items-center gap-2">
          <Avatar className="h-10 w-10 bg-sky-100 text-sky-500">
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <span className="text-gray-700 font-normal">tufail ahmed</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
        </div>

        {/* Create Button */}
        <div className="px-4 py-2">
         
            <Button onClick={handleClick} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2 justify-center">
              <MonitorPlay className="w-5 h-5" />
              Create new presentation
            </Button>
           
        </div>

        {/* Navigation */}
        <div className="mt-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-sky-50 text-sky-600">
            <LayoutGrid className="w-5 h-5" />
            <span>All presentations</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-6">
          <h1 className="text-lg font-medium text-gray-700 mb-4">
            Your presentations
          </h1>

          {/* Empty State */}
          <div className="bg-gray-200/50 rounded-lg p-24 flex flex-col items-center justify-center">
            <p className="text-gray-700 text-lg font-medium mb-2">
              No presentations yet
            </p>
            <Link href={'#'} className="text-blue-500 hover:underline">
              Create your first presentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
