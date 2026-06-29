import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Copy, 
  RefreshCw, 
  Check, 
  Sparkles, 
  Lightbulb, 
  Tag, 
  Target,
  BookOpen
} from 'lucide-react'
import { generateBusinessName } from '@seller-tools/ui'

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [copiedName, setCopiedName] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = [
    { label: "Cafe & Restaurant", value: "Cafe" },
    { label: "Clothing & Fashion", value: "Clothing Brand" },
    { label: "Jewellery & Accessories", value: "Jewellery Shop" },
    { label: "Travel & Tourism", value: "Travel Agency" },
    { label: "Tech & Software", value: "Tech Company" },
    { label: "Digital Marketing", value: "Digital Marketing Agency" },
    { label: "Beauty & Salon", value: "Beauty Salon" },
    { label: "Fitness & Gym", value: "Fitness Studio" },
  ]

  const handleGenerateNames = () => {
    if (!keyword) return
    setLoading(true)
    // Simulate API call or heavy computation
    setTimeout(() => {
      const names = generateBusinessName(keyword, category)
      setGeneratedNames(names)
      setLoading(false)
    }, 500)
  }

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopiedName(name)
    setTimeout(() => setCopiedName(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Search className="text-blue-500" size={28} />
          <span>Business Name Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Generate creative, unique, and SEO-friendly business names for any industry instantly. Perfect for startups and rebranding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Describe Your Business</span>
            </h2>

            {/* Keyword Input */}
            <div className="space-y-2">
              <label htmlFor="keyword" className="text-sm font-bold text-gray-700">Primary Keyword (e.g., "Digital", "Cafe")</label>
              <input 
                id="keyword"
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Digital, Cafe, Fashion, Green" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-[11px] text-gray-400 font-medium">Enter 1-2 words that best describe your business idea or core offering.</p>
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-bold text-gray-700">Business Category (Optional)</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-gray-400 font-medium">Helps generate more targeted and relevant names for your niche.</p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateNames}
              disabled={!keyword || loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              <span>{loading ? 'Generating Names...' : 'Generate Business Names'}</span>
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL (5 columns) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-200 pb-3">
              <span>Generated Names ({generatedNames.length})</span>
            </h3>

            {generatedNames.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 -mr-2">
                {generatedNames.map((name, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between bg-white border border-gray-150 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <span className="font-bold text-gray-800 text-sm">{name}</span>
                    <button 
                      onClick={() => copyToClipboard(name)}
                      className="p-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 rounded-lg transition"
                    >
                      {copiedName === name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center space-y-3 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                <Lightbulb size={32} className="animate-pulse" />
                <div>
                  <span className="block text-xs font-bold text-gray-500">Awaiting Your Ideas</span>
                  <span className="text-[10px] block mt-0.5">Enter a keyword and category to generate business names.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO FAQs / ARTICLES SECTION */}
      <section className="border-t border-gray-150 pt-10 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <BookOpen className="text-blue-600" size={20} />
          <span>Tips for Choosing a Business Name</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Tag size={16} className="text-blue-500" />
              <span>Keep it Short & Catchy</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Memorable names are easier to recall and share. Aim for names that are simple to pronounce and spell. This enhances brand recognition and word-of-mouth marketing.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Target size={16} className="text-blue-500" />
              <span>Relevant to Your Niche</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              A name that hints at your business category (e.g., "Green Leaf Cafe") can attract the right audience. It also helps with SEO as it naturally includes relevant keywords.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-blue-500" />
              <span>Check for Availability</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Before finalizing, ensure the name is available for domain registration, social media handles, and trademark. A unique name is crucial for brand identity and legal protection.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Lightbulb size={16} className="text-blue-500" />
              <span>Consider Your Target Audience</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your business name should resonate with your ideal customers. Think about their demographics, preferences, and cultural context when brainstorming names.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}