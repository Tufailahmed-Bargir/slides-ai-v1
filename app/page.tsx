"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Presentation,
  Sparkles,
  Zap,
  Palette,
  Users,
  Box,
  Shield,
  Play,
  ArrowUpRight,
  Menu,
  X,
  MousePointer,
  Clock,
  Lightbulb,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation - Glass morphism effect with better positioning */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl animate-pulse opacity-75"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl"></div>
                <Presentation className="relative z-10 text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Slides-AI
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition-all font-medium relative group"
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-all font-medium relative group">
                  Demo
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-600 transition-all font-medium relative group"
                >
                  Testimonials
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600 transition-all font-medium relative group"
                >
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Link href={'/login'}>
                <Button
                  variant="outline"
                  className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
                  >
                  Log in
                </Button>
                  </Link>
                  <Link href={'/login'}>
                <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20 border-0">
                  Get Started <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>

            <button
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-all py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-gray-600 hover:text-blue-600 transition-all py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-all py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-all py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-2 flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-center rounded-full">
                  Log in
                </Button>
                <Button className="w-full justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Enhanced with 3D elements and better animations */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 hover:bg-blue-200 transition-colors">
                Revolutionizing Presentations
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Create stunning
                <div className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent px-2">
                    presentations
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-70 z-0"></div>
                </div>
                <br />
                with AI magic
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your ideas into professional presentations in seconds. Our AI understands your content and
                creates visually stunning slides that captivate your audience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/login'}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl">
                  Try for Free <ArrowRight className="ml-2" size={20} />
                </Button>
                </Link>
                
                <Link href={'#demo'}>
                <Button
                  variant="outline"
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-full text-lg transition-all duration-300 flex items-center gap-2"
                  >
                  <Play className="w-5 h-5 fill-blue-600 text-blue-600" /> Watch Demo
                </Button>
                  </Link>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image
                         
                        src={`/user1.png`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-medium">
                    Trusted by <span className="font-bold text-blue-600">10,000+</span> professionals
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.02] group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Slides-AI+Dashboard"
                  alt="Slides-AI Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating UI elements for visual interest */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">AI Assistant Active</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">Smart Templates</span>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 z-20 p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      10K+
                    </div>
                    <div className="text-sm text-gray-500">Active users</div>
                  </div>
                </div>
              </div>

              {/* Time saved card */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 z-20 p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      3hrs
                    </div>
                    <div className="text-sm text-gray-500">Time saved/deck</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted by logos */}
          <div className="mt-20 border-t border-gray-100 pt-10">
            <p className="text-center text-sm font-medium text-gray-500 mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {["Microsoft", "Google", "Amazon", "Airbnb", "Spotify", "Uber"].map((company) => (
                <div key={company} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <div className="text-xl font-bold">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with interactive tabs and better visuals */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 hover:bg-blue-200 transition-colors">
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Everything you need to create amazing presentations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Slides-AI can help you create professional presentations in minutes, not hours.
            </p>
          </div>

          {/* Feature tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["all", "design", "ai", "collaboration", "export"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className={`rounded-full ${activeTab === tab ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-blue-600" size={24} />,
                title: "AI-Powered Content",
                description:
                  "Generate complete presentations with just a few prompts. Our AI understands context and creates coherent content.",
                category: "ai",
              },
              {
                icon: <Palette className="text-cyan-600" size={24} />,
                title: "Beautiful Templates",
                description:
                  "Choose from hundreds of professionally designed templates that match your brand and goals.",
                category: "design",
              },
              {
                icon: <Zap className="text-amber-600" size={24} />,
                title: "Instant Generation",
                description: "Create complete presentations in seconds. Save hours of work with our lightning-fast AI.",
                category: "ai",
              },
              {
                icon: <Users className="text-blue-600" size={24} />,
                title: "Team Collaboration",
                description: "Work together seamlessly with real-time collaboration and commenting features.",
                category: "collaboration",
              },
              {
                icon: <Box className="text-cyan-600" size={24} />,
                title: "Export Anywhere",
                description: "Export to PowerPoint, Google Slides, or PDF with perfect formatting preserved.",
                category: "export",
              },
              {
                icon: <Shield className="text-amber-600" size={24} />,
                title: "Enterprise Security",
                description: "Your data is protected with enterprise-grade security and encryption.",
                category: "collaboration",
              },
              {
                icon: <Lightbulb className="text-blue-600" size={24} />,
                title: "Smart Suggestions",
                description: "Get intelligent content and design suggestions as you create your presentation.",
                category: "ai",
              },
              {
                icon: <MousePointer className="text-cyan-600" size={24} />,
                title: "Drag & Drop Editor",
                description: "Intuitive interface that makes editing and customizing your slides effortless.",
                category: "design",
              },
              {
                icon: <Award className="text-amber-600" size={24} />,
                title: "Premium Visuals",
                description: "Access to millions of stock photos, icons, and illustrations to enhance your slides.",
                category: "design",
              },
            ]
              .filter((feature) => activeTab === "all" || feature.category === activeTab)
              .map((feature, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-cyan-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with better visuals and animations */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0tMiAwSDJ2MmgzMnYtMnptMCAydjI4aDJ2LTI4aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDR2MmgyOFYtMnptMCAydjI2aDJ2LTI2aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDZ2MmgyNFYtMnptMCAydjI0aDJ2LTI0aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDh2MmgyMHYtMnptMCAydjIyaDJ2LTIyaC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDEwdjJoMTZ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "10M+",
                label: "Slides Generated",
                icon: <Presentation className="w-6 h-6 text-white/80" />,
              },
              {
                number: "98%",
                label: "Customer Satisfaction",
                icon: <Star className="w-6 h-6 text-white/80" />,
              },
              {
                number: "24/7",
                label: "Support Available",
                icon: <Users className="w-6 h-6 text-white/80" />,
              },
              {
                number: "50x",
                label: "Faster Than Manual",
                icon: <Zap className="w-6 h-6 text-white/80" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-white p-8 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col items-center text-center"
              >
                <div className="bg-white/20 rounded-full p-3 mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Enhanced with better visuals and interactive elements */}
      <section id="demo" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 hover:bg-blue-200 transition-colors">
              See It In Action
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Watch Slides-AI in action
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how easily you can create professional presentations in minutes, not hours.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-90 z-10 flex items-center justify-center">
                <Button className="rounded-full bg-white text-blue-700 hover:bg-white/90 hover:scale-105 transition-all duration-300 px-6 py-6 shadow-xl group">
                  <Play className="w-6 h-6 fill-blue-600 text-blue-600 mr-2" />
                  <span className="text-lg font-medium">Watch Demo</span>
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=600&width=1200&text=Slides-AI+Demo+Video"
                alt="Slides-AI Demo"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter Your Topic",
                  description: "Simply type your presentation topic or upload an outline document.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  step: "2",
                  title: "AI Generation",
                  description: "Our AI creates a complete presentation with perfect formatting and content.",
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  step: "3",
                  title: "Download & Present",
                  description: "Edit if needed, then export and deliver a stunning presentation.",
                  color: "from-pink-500 to-pink-600",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full"></div>
                  <div
                    className={`absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r ${item.color} rounded-full transform origin-left transition-all duration-1000 ease-out`}
                    style={{ width: `${(index + 1) * 33.33}%` }}
                  ></div>

                  <div className="pt-8 text-center">
                    <div
                      className={`bg-gradient-to-r ${item.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg`}
                    >
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with better cards and slider effect */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 hover:bg-blue-200 transition-colors">
              Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              What our customers say
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who are saving time and creating better presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "Slides-AI has completely transformed how I create presentations. What used to take hours now takes minutes, and the quality is better than what I could create manually.",
                name: "Sarah M.",
                role: "Marketing Director",
                avatar: "SM",
                color: "bg-blue-100 text-blue-600",
              },
              {
                quote:
                  "As a professor, I need to create presentations regularly. Slides-AI not only saves me time but also helps me create more engaging content for my students.",
                name: "John D.",
                role: "University Professor",
                avatar: "JD",
                color: "bg-cyan-100 text-cyan-600",
              },
              {
                quote:
                  "Our team has increased productivity by 40% since starting to use Slides-AI. The collaborative features are excellent for our remote team members.",
                name: "Alex T.",
                role: "Project Manager",
                avatar: "AT",
                color: "bg-pink-100 text-pink-600",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={20} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="font-bold">{testimonial.avatar}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional testimonials in a scrolling row */}
          <div className="mt-12 relative overflow-hidden">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

            <div className="flex gap-4 py-4 overflow-x-auto scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border border-gray-200 shadow-sm flex-shrink-0 w-80">
                  <CardContent className="p-4">
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} fill="currentColor" size={16} />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">
                    &quot;Slides-AI has been a game-changer for our team presentations. The quality is outstanding!&quot;
                    </p>
                    <div className="flex items-center mt-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">U{i}</span>
                      </div>
                      <div className="ml-2">
                        <h4 className="font-bold text-sm">User {i}</h4>
                        <p className="text-gray-600 text-xs">Happy Customer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced with better cards and features */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 hover:bg-blue-200 transition-colors">
              Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Choose your perfect plan
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible plans designed to meet your needs. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for trying out Slides-AI.</p>
                <ul className="space-y-3 mb-8">
                  {["3 presentations/month", "Basic templates", "Export to PDF", "Community support"].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2 flex-shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 rounded-xl shadow-xl relative transform scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">For professionals who need more power.</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited presentations",
                    "All templates",
                    "Export to PPT, PDF, Google Slides",
                    "Advanced AI features",
                    "Priority support",
                    "Custom branding",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2 flex-shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Team Plan */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Team</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">For teams who create presentations together.</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Pro",
                    "Up to 5 team members",
                    "Collaborative editing",
                    "Team templates",
                    "Advanced analytics",
                    "Dedicated support",
                    "Admin controls",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2 flex-shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full bg-gray-800 hover:bg-gray-900 text-white">Get Started</Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ accordion would go here */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Have questions about our pricing?{" "}
              <Link href="#" className="text-blue-600 font-medium hover:underline">
                View our FAQ
              </Link>{" "}
              or{" "}
              <Link href="#" className="text-blue-600 font-medium hover:underline">
                contact our sales team
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with better gradient and animations */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0tMiAwSDJ2MmgzMnYtMnptMCAydjI4aDJ2LTI4aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDR2MmgyOFYtMnptMCAydjI2aDJ2LTI2aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDZ2MmgyNFYtMnptMCAydjI0aDJ2LTI0aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDh2MmgyMHYtMnptMCAydjIyaDJ2LTIyaC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDEwdjJoMTZ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="px-3 py-1 text-sm bg-white/20 text-white rounded-full mb-4 backdrop-blur-sm">
              Get Started Today
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your presentations?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals who are saving time and creating stunning presentations with Slides-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-white/90 px-8 py-6 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Get Started for Free <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg transition-all duration-300"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="text-white/70">No credit card required. Start creating in minutes.</p>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with better spacing and gradients */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl"></div>
                  <Presentation className="relative z-10 text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white">Slides-AI</span>
              </div>
              <p className="mb-6 text-gray-400 max-w-md">
                Slides-AI is revolutionizing how professionals create presentations with AI-powered tools that save time
                and improve quality.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    {/* Icon would go here */}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg mb-6">Product</h3>
              <ul className="space-y-4">
                {["Features", "Templates", "Pricing", "Updates", "Coming Soon"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                {["Blog", "Tutorials", "Examples", "FAQ", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                {["About", "Contact", "Careers", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Slides-AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
