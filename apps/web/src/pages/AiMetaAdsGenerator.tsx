import React, { useState } from 'react'
import { 
  Megaphone, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen,
  Lightbulb
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, AuthModal } from '@seller-tools/ui'
import { useAITool } from '@seller-tools/ui'

const generateAdCopy = (industry: string, offer: string, tone: string, language: string) => {
  const basePrompts = {
    english: {
      primary: [
        `Unlock the power of ${industry} with our exclusive ${offer}!`, 
        `Revolutionize your ${industry} strategy. Get amazing ${offer} now!`, 
        `Experience unparalleled results in ${industry}. Discover our ${offer}.`
      ],
      headline: [
        `Boost Your ${industry}!`, 
        `Exclusive ${offer} Available!`, 
        `Master ${industry} Today!`
      ],
      description: [
        `Don't miss out on this limited-time opportunity to elevate your ${industry} game.`, 
        `Our ${offer} is designed for maximum impact and measurable growth.`
      ]
    },
    hindi: {
      primary: [
        `अपने ${industry} को मज़बूत करें हमारे ख़ास ${offer} के साथ!`, 
        `अपने ${industry} की रणनीति को बदलें। शानदार ${offer} अभी प्राप्त करें!`, 
        `${industry} में बेहतरीन परिणाम पाएँ। हमारे ${offer} को आज़माएँ।`
      ],
      headline: [
        `${industry} को बढ़ावा दें!`, 
        `ख़ास ${offer} उपलब्ध!`, 
        `आज ही ${industry} में महारत हासिल करें!`
      ],
      description: [
        `इस सीमित समय के अवसर को न चूकें और अपने ${industry} को नई ऊँचाई पर ले जाएँ।`, 
        `हमारा ${offer} अधिकतम प्रभाव और मापने योग्य वृद्धि के लिए डिज़ाइन किया गया है।`
      ]
    },
    hinglish: {
      primary: [
        `Apne ${industry} ko strong banayein with our exclusive ${offer}!`, 
        `Revolutionize your ${industry} strategy. Get amazing ${offer} now!`, 
        `Experience next-level results in ${industry}. Discover our ${offer}.`
      ],
      headline: [
        `Boost Your ${industry}!`, 
        `Exclusive ${offer} Available!`, 
        `Master ${industry} Today!`
      ],
      description: [
        `Don't miss out on this limited-time opportunity to elevate your ${industry} game.`, 
        `Our ${offer} is designed for maximum impact and measurable growth.`
      ]
    }
  }

  const selectedPrompts = (basePrompts as any)[language] || basePrompts.english

  const results = {
    primaryTexts: Array(5).fill(0).map((_, i) => `${selectedPrompts.primary[i % selectedPrompts.primary.length]} (Tone: ${tone})`),
    headlines: Array(5).fill(0).map((_, i) => `${selectedPrompts.headline[i % selectedPrompts.headline.length]}`),
    descriptions: Array(5).fill(0).map((_, i) => `${selectedPrompts.description[i % selectedPrompts.description.length]}`)
  }
  return results
}

export default function AiMetaAdsGenerator() {
  const [industry, setIndustry] = useState('')
  const [offer, setOffer] = useState('')
  const [tone, setTone] = useState('Professional')
  const [language, setLanguage] = useState('english')
  const [generatedCopies, setGeneratedCopies] = useState<any>(null)
  const [copiedText, setCopiedText] = useState('')

  const {
    user,
    loading,
    generating,
    showAuthModal,
    setShowAuthModal,
    executeWithAuth,
    remainingUses,
    canUse,
    loginWithGoogle
  } = useAITool('meta-ads-generator')

  const industries = [
    "Digital Marketing", "E-commerce", "Real Estate", "Education", "Healthcare", 
    "Fitness", "Food & Beverage", "Fashion", "Technology", "Finance"
  ]
  const tones = ["Professional", "Funny", "Luxury", "Urgent", "Empathetic"]
  const languages = [
    { label: "English", value: "english" },
    { label: "हिंदी (Hindi)", value: "hindi" },
    { label: "Hinglish", value: "hinglish" }
  ]

  const handleGenerate = () => {
    if (!industry || !offer) return
    executeWithAuth(async () => {
      setGeneratedCopies(null)
      setTimeout(() => {
        setGeneratedCopies(generateAdCopy(industry, offer, tone, language))
      }, 1000)
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={loginWithGoogle}
        toolName="AI Meta Ads Generator"
        remainingUses={remainingUses}
        isLoggedIn={!!user}
      />

      <div className="border-b border-gray-150 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
            <Megaphone className="text-purple-500" size={28} />
            <span>AI Meta Ads Primary Text Generator</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Generate high-converting Facebook and Instagram ad copies, headlines, and descriptions with AI.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-green-700">
                {remainingUses === Infinity ? 'Unlimited' : `${remainingUses} uses left today`}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-amber-700">
                {canUse ? '1 free use remaining' : 'Sign in required'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Define Your Ad Parameters</span>
            </h2>

            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-bold text-gray-700">Industry/Niche</label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select Industry</option>
                {industries.map((ind, i) => (
                  <option key={i} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="offer" className="text-sm font-bold text-gray-700">Your Offer/Product</label>
              <input 
                id="offer"
                type="text" 
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 50% Off Digital Course, Free Consultation" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <p className="text-[11px] text-gray-400 font-medium">What are you promoting? Be specific.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tone" className="text-sm font-bold text-gray-700">Ad Copy Tone</label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
                >
                  {tones.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-bold text-gray-700">Output Language</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
                >
                  {languages.map((lang, i) => (
                    <option key={i} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!industry || !offer || loading || generating}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{generating ? 'Generating Copies...' : 'Generate Ad Copies (20+)'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-200 pb-3">
              <span>Generated Ad Copies</span>
            </h3>

            {generatedCopies ? (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 -mr-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-2">Primary Texts:</h4>
                  <div className="space-y-2">
                    {generatedCopies.primaryTexts.map((text: string, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-gray-150 rounded-xl px-4 py-3 shadow-sm">
                        <p className="text-sm text-gray-700 flex-1 pr-2">{text}</p>
                        <button 
                          onClick={() => copyToClipboard(text)}
                          className="p-2 bg-gray-50 hover:bg-purple-50 hover:text-purple-600 text-gray-500 rounded-lg transition"
                        >
                          {copiedText === text ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-2">Headlines:</h4>
                  <div className="space-y-2">
                    {generatedCopies.headlines.map((text: string, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-gray-150 rounded-xl px-4 py-3 shadow-sm">
                        <p className="text-sm text-gray-700 flex-1 pr-2">{text}</p>
                        <button 
                          onClick={() => copyToClipboard(text)}
                          className="p-2 bg-gray-50 hover:bg-purple-50 hover:text-purple-600 text-gray-500 rounded-lg transition"
                        >
                          {copiedText === text ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-2">Descriptions:</h4>
                  <div className="space-y-2">
                    {generatedCopies.descriptions.map((text: string, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-gray-150 rounded-xl px-4 py-3 shadow-sm">
                        <p className="text-sm text-gray-700 flex-1 pr-2">{text}</p>
                        <button 
                          onClick={() => copyToClipboard(text)}
                          className="p-2 bg-gray-50 hover:bg-purple-50 hover:text-purple-600 text-gray-500 rounded-lg transition"
                        >
                          {copiedText === text ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center space-y-3 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                <Lightbulb size={32} className="animate-pulse" />
                <div>
                  <span className="block text-xs font-bold text-gray-500">Awaiting Ad Details</span>
                  <span className="text-[10px] block mt-0.5">Fill in your industry, offer, and tone to generate copies.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="border-t border-gray-150 pt-10 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <BookOpen className="text-purple-600" size={20} />
          <span>Crafting Effective Meta Ad Copies</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-purple-500" />
              <span>Why use AI for Ad Copies?</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              AI ad generators help you quickly create multiple variations of ad copy, test different angles, and overcome writer's block. This saves time and improves campaign performance.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Megaphone size={16} className="text-purple-500" />
              <span>Elements of a High-Converting Ad</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              A compelling ad features a strong hook (primary text), clear value proposition (headline), and a persuasive call-to-action (description). Visuals also play a crucial role.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Lightbulb size={16} className="text-purple-500" />
              <span>Testing and Optimization</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Always A/B test different ad copies to see which performs best with your target audience. Continuously optimize based on metrics like CTR, conversions, and cost per result.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Copy size={16} className="text-purple-500" />
              <span>Hindi & Hinglish Ad Copies</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Reaching a wider audience in India often requires localizing your ad copies. Hinglish (Hindi + English) can be highly effective for connecting with a diverse urban Indian demographic.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}