import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  MessageSquare, 
  Search, 
  Calculator, 
  Megaphone, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react'

export default function Home() {
  const featuredTools = [
    {
      name: "PDF Toolkit",
      desc: "Merge, split, compress, and convert JPG to PDF/PDF to JPG fully in your browser with zero data leakage.",
      path: "/pdf-tools",
      icon: FileText,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "hover:border-red-200",
      shadowColor: "hover:shadow-red-50/50",
      features: ["Merge PDFs", "Split PDFs", "Compress PDF File", "JPG to PDF Conversion"],
      trafficLabel: "High Traffic",
      rank: "#1 Demand"
    },
    {
      name: "WhatsApp Link Generator",
      desc: "Create pre-filled wa.me links instantly with custom message support to boost clicks and customer outreach.",
      path: "/whatsapp-link-generator",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "hover:border-green-200",
      shadowColor: "hover:shadow-green-50/50",
      features: ["Custom Prefilled Message", "Click-to-Chat Generation", "Hinglish Support", "Instant Copy Link"],
      trafficLabel: "Viral Growth",
      rank: "Low Competition"
    },
    {
      name: "Business Name Generator",
      desc: "Generate professional, unique brand names for Cafes, Clothing, Restaurants, Tech Companies, and agencies instantly.",
      path: "/business-name-generator",
      icon: Search,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "hover:border-blue-200",
      shadowColor: "hover:shadow-blue-50/50",
      features: ["50+ Brand Options", "Niche Sub-categories", "Hindi & English Terms", "Brandability Analysis"],
      trafficLabel: "SEO Magnet",
      rank: "Thousands of Keywords"
    },
    {
      name: "Marketing Calculators Hub",
      desc: "Professional suite of calculators including ROI, ROAS, CTR, CPC, CPM, and Conversion Rate optimization tools.",
      path: "/marketing-calculators",
      icon: Calculator,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "hover:border-indigo-200",
      shadowColor: "hover:shadow-indigo-50/50",
      features: ["ROI/ROAS Matrix", "CTR & CPC Optimization", "CPM Calculations", "Lead Conversion Rate"],
      trafficLabel: "Premium RPM",
      rank: "Agencies Bookmark"
    },
    {
      name: "AI Meta Ads Text Generator",
      desc: "Harness AI to write high-converting primary text, headlines, and descriptions for Facebook & Instagram ads.",
      path: "/ai-meta-ads-generator",
      icon: Megaphone,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "hover:border-purple-200",
      shadowColor: "hover:shadow-purple-50/50",
      features: ["Tone Selection (Luxury, Pro...)", "Hinglish Ad Copy", "Emoji-rich Outputs", "20+ Variations Instantly"],
      trafficLabel: "AI Powered",
      rank: "Trending Search"
    }
  ]

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-4">
        <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-100 px-3 py-1 rounded-full text-green-700 text-xs font-semibold animate-bounce">
          <Sparkles size={14} />
          <span>Free Premium Web Tools Hub • No SignUp Required</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
          Supercharge Your Workflow with <br />
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Free Premium Web Tools</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
          Free browser-based tools for digital marketers, business owners, and creators. Generate ad copies, calculate marketing metrics, create WhatsApp links, build brand names, and modify PDF files—all 100% locally and privately.
        </p>

        {/* STATS BAR */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4 border-t border-gray-100">
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-green-600">100%</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Free & Secure</span>
          </div>
          <div className="text-center border-x border-gray-100">
            <span className="block text-2xl font-extrabold text-green-600">Local</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Browser Processing</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-green-600">No Limit</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daily Usage</span>
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-150 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Featured Web Tools</h2>
            <p className="text-sm text-gray-400">Our 5 most popular utility generators and calculators</p>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 sm:mt-0 text-xs text-gray-400 font-semibold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
            <TrendingUp size={14} className="text-green-500" />
            <span>Updated Weekly</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`block bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${tool.borderColor} ${tool.shadowColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${tool.bgColor}`}>
                    <tool.icon size={24} className={tool.color} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                      {tool.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-wider">
                        {tool.trafficLabel}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {tool.rank}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                {tool.desc}
              </p>

              <div className="border-t border-gray-100 mt-5 pt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {tool.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-gray-600">
                      <Zap size={10} className="text-green-500" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center text-xs font-bold text-green-600 group-hover:text-green-700 hover:underline">
                <span>Launch Tool</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US / SEO SUMMARY */}
      <section className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 flex items-center space-x-2">
          <ShieldCheck className="text-green-600" size={22} />
          <span>Safe, Private, and Secure Browser Tools</span>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          At <strong>Risala Digital Tools Hub</strong>, privacy is our top priority. All tools processing images, text, and data work entirely client-side using JavaScript inside your own browser window. We never upload your images, text, PDFs, or private values to any external server. You get lightning-fast local processing with zero security risks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-green-100">
          <div>
            <h4 className="font-extrabold text-sm text-gray-900 mb-1">Instant Generation</h4>
            <p className="text-xs text-gray-500">Zero loading states or delay. Get your links, names, and metrics immediately.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-gray-900 mb-1">Mobile Optimized</h4>
            <p className="text-xs text-gray-500">All tools are fully responsive and work seamlessly on mobile, tablet, and desktop.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-gray-900 mb-1">Top-Tier Performance</h4>
            <p className="text-xs text-gray-500">Ultra-lightweight code, no bloated frameworks, allowing extremely fast page load speeds.</p>
          </div>
        </div>
      </section>
    </div>
  )
}