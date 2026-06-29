import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FileText, 
  MessageSquare, 
  Search, 
  Calculator, 
  Megaphone, 
  ChevronRight, 
  Menu, 
  X,
  Share2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
  PenTool,
  Mail,
  Terminal,
  Image,
  Code,
  Wrench
} from 'lucide-react'
import { AuthModal } from '@seller-tools/ui'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toolsList = [
    {
      name: "PDF Toolkit",
      path: "/pdf-tools",
      icon: FileText,
      color: "text-red-500",
      bgColor: "bg-red-50",
      tag: "Evergreen"
    },
    {
      name: "WhatsApp Link Generator",
      path: "/whatsapp-link-generator",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-50",
      tag: "High Traffic"
    },
    {
      name: "Business Name Generator",
      path: "/business-name-generator",
      icon: Search,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      tag: "SEO Friendly"
    },
    {
      name: "Marketing Calculators",
      path: "/marketing-calculators",
      icon: Calculator,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      tag: "High RPM"
    },
    {
      name: "AI Meta Ads Generator",
      path: "/ai-meta-ads-generator",
      icon: Megaphone,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      tag: "AI Tool"
    },
    {
      name: "AI Blog Generator",
      path: "/ai-blog-generator",
      icon: PenTool,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      tag: "AI Tool"
    },
    {
      name: "AI Email Toolkit",
      path: "/ai-email-toolkit",
      icon: Mail,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      tag: "AI Tool"
    },
    {
      name: "AI Prompt Generator",
      path: "/ai-prompt-generator",
      icon: Sparkles,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      tag: "AI Tool"
    },
    {
      name: "AI Image Tools",
      path: "/ai-image-tools",
      icon: Image,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      tag: "AI Tool"
    },
    {
      name: "JSON Tools",
      path: "/json-tools",
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      tag: "Dev Tool"
    },
    {
      name: "Code Formatter",
      path: "/code-formatter",
      icon: Terminal,
      color: "text-green-500",
      bgColor: "bg-green-50",
      tag: "Dev Tool"
    },
    {
      name: "Dev Toolkit",
      path: "/dev-toolkit",
      icon: Wrench,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      tag: "Dev Tool"
    }
  ]

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-green-100">
                  RD
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg tracking-tight text-gray-950 flex items-center gap-1.5">
                    Risala Digital
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Tools</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">risaladigitalmarketing.com</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {toolsList.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                    isActive(tool.path)
                      ? "bg-green-50 text-green-700 shadow-sm border border-green-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <tool.icon size={16} className={isActive(tool.path) ? "text-green-600" : "text-gray-400"} />
                  <span>{tool.name}</span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://risaladigitalmarketing.com" 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1 text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
              >
                <span>Visit Main Site</span>
                <ChevronRight size={14} />
              </a>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Risala Digital Tools Hub',
                      text: 'Free premium tools for SEO, Social Media, Marketing Calculators, WhatsApp Link Generation, and PDF Tools!',
                      url: window.location.href,
                    })
                  } else {
                    alert('Copied link: ' + window.location.href)
                  }
                }}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed top-0 bottom-0 left-0 w-72 bg-white shadow-xl flex flex-col p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-5 border-b border-gray-150">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-base">
                  RD
                </div>
                <span className="font-bold text-base text-gray-950">Risala Tools</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2 py-5 overflow-y-auto">
              {toolsList.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition ${
                    isActive(tool.path)
                      ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg ${tool.bgColor}`}>
                      <tool.icon size={16} className={tool.color} />
                    </div>
                    <span>{tool.name}</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">{tool.tag}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-150 pt-5">
              <a 
                href="https://risaladigitalmarketing.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-100 transition"
              >
                <span>Visit Main Site</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ADSENSE TOP BANNER */}
      <div className="w-full bg-gray-100 py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl h-[90px] bg-white border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-200 absolute top-1 right-1">Sponsored Ad</span>
            <div className="flex items-center space-x-3 text-gray-400 group-hover:text-green-500 transition duration-300">
              <Sparkles size={20} className="animate-pulse" />
              <div className="text-center">
                <span className="block text-xs font-bold text-gray-500">Google AdSense Responsive Ad Unit</span>
                <span className="text-[10px] block mt-0.5">High Impression Placement • Auto-fitting Layout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR FOR DESKTOP */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <h3 className="font-extrabold text-sm text-gray-950 uppercase tracking-wider mb-4 flex items-center space-x-2">
                <Award size={16} className="text-green-600" />
                <span>Our Premium Tools</span>
              </h3>
              <nav className="space-y-1.5">
                {toolsList.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive(tool.path)
                        ? "bg-green-50 text-green-700 shadow-sm border border-green-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-1.5 rounded-lg ${tool.bgColor}`}>
                        <tool.icon size={16} className={tool.color} />
                      </div>
                      <span>{tool.name}</span>
                    </div>
                    <ChevronRight size={14} className={isActive(tool.path) ? "text-green-600" : "text-gray-300"} />
                  </Link>
                ))}
              </nav>
            </div>

            {/* SIDEBAR AD UNIT */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-[300px] flex flex-col items-center justify-center relative overflow-hidden border-dashed border-gray-300 group">
              <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-200 absolute top-1 right-1">Google Ad</span>
              <div className="flex flex-col items-center text-center space-y-2 text-gray-400 group-hover:text-green-500 transition duration-300">
                <BookOpen size={24} />
                <div>
                  <span className="block text-xs font-bold text-gray-500">Sidebar Display Ad</span>
                  <span className="text-[10px] block mt-0.5">300x250 Medium Rectangle</span>
                  <span className="text-[9px] text-gray-300 block mt-1">Highly engaging for desktop layout</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                  RD
                </div>
                <span className="font-extrabold text-base tracking-tight text-gray-900">
                  Risala Digital <span className="text-green-600 font-normal text-xs px-2 py-0.5 rounded-full bg-green-50 border border-green-100">Tools</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 max-w-md">
                Free premium web utilities and marketing calculators brought to you by risaladigitalmarketing.com. Boost your workflow, increase CTR, generate higher ROI, and create beautiful text and formats in seconds.
              </p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-xs text-gray-400">
                  <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  No Sign Up Required
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  100% Free Forever
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <CheckCircle2 size={12} className="text-green-500 mr-1" />
                  GDPR & AdSense Compliant
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-gray-950 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
                <HelpCircle size={14} className="text-green-600" />
                <span>Our Top Tools</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                {toolsList.slice(0, 3).map((tool) => (
                  <li key={tool.path}>
                    <Link to={tool.path} className="text-gray-500 hover:text-green-600 transition flex items-center">
                      <ChevronRight size={12} className="mr-1 text-gray-300" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-gray-950 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
                <span>Legal & Links</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="https://risaladigitalmarketing.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-600 transition flex items-center">
                    <ChevronRight size={12} className="mr-1 text-gray-300" />
                    Visit Official Site
                  </a>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-500 hover:text-green-600 transition flex items-center">
                    <ChevronRight size={12} className="mr-1 text-gray-300" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-500 hover:text-green-600 transition flex items-center">
                    <ChevronRight size={12} className="mr-1 text-gray-300" />
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-150 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
            <p>© {new Date().getFullYear()} risaladigitalmarketing.com. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Designed & Optimized for Search Traffic & Maximum AdSense Revenue</p>
          </div>
        </div>
      </footer>

      {/* Global Auth Modal */}
      <AuthModal 
        isOpen={false} 
        onClose={() => {}} 
        onLogin={() => {}} 
        toolName="" 
        remainingUses={0} 
        isLoggedIn={false} 
      />
    </div>
  )
}