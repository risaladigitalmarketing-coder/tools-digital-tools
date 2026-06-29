import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen,
  List,
  HelpCircle,
  Search,
  Loader2,
  PenTool
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, AuthModal } from '@seller-tools/ui'
import { useAITool } from '@seller-tools/ui'

const blogTemplates = {
  'how-to': {
    title: 'How-to Guide',
    outline: ['Introduction', 'Prerequisites', 'Step 1', 'Step 2', 'Step 3', 'Tips & Tricks', 'Conclusion'],
    style: 'Instructional, clear steps'
  },
  'listicle': {
    title: 'Listicle (Top X)',
    outline: ['Hook Introduction', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Bonus Tip', 'Conclusion'],
    style: 'Scannable, engaging'
  },
  'case-study': {
    title: 'Case Study',
    outline: ['Challenge', 'Solution', 'Implementation', 'Results', 'Key Takeaways', 'Conclusion'],
    style: 'Data-driven, storytelling'
  },
  'comparison': {
    title: 'Comparison/Vs Post',
    outline: ['Introduction', 'Quick Summary Table', 'Option A Deep Dive', 'Option B Deep Dive', 'Head-to-Head', 'Verdict'],
    style: 'Objective, analytical'
  },
  'faq': {
    title: 'FAQ Article',
    outline: ['Introduction', 'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Summary'],
    style: 'Direct answers, SEO-focused'
  }
}

const tones = ['Professional', 'Conversational', 'Authoritative', 'Friendly', 'Technical', 'Persuasive']

export default function AIBlogGenerator() {
  const [topic, setTopic] = useState('')
  const [template, setTemplate] = useState('how-to')
  const [tone, setTone] = useState('Professional')
  const [language, setLanguage] = useState('english')
  const [wordCount, setWordCount] = useState('1500')
  const [includeSEO, setIncludeSEO] = useState(true)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [copiedText, setCopiedText] = useState('')
  const [activeTab, setActiveTab] = useState('full-article')

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
  } = useAITool('blog-generator')

  const languages = [
    { label: 'English', value: 'english' },
    { label: 'हिंदी (Hindi)', value: 'hindi' },
    { label: 'Hinglish', value: 'hinglish' }
  ]

  const generateContent = async () => {
    if (!topic) return
    setGeneratedContent(null)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const t = blogTemplates[template as keyof typeof blogTemplates]
    const outline = t.outline.map((section, i) => 
      `## ${section}\n\n[Generated ${tone.toLowerCase()} content about "${topic}" for this section. This would be ${Math.round(parseInt(wordCount) / t.outline.length)} words covering key points, examples, and actionable advice.]`
    ).join('\n\n')
    
    const seoData = includeSEO ? {
      title: `${topic} - Complete Guide | Risala Digital`,
      metaDescription: `Learn everything about ${topic} in this comprehensive guide. Expert tips, step-by-step instructions, and best practices.`,
      keywords: [topic.toLowerCase(), `${topic.toLowerCase()} guide`, `${topic.toLowerCase()} tips`, `best ${topic.toLowerCase()}`],
      slug: topic.toLowerCase().replace(/\s+/g, '-')
    } : null

    setGeneratedContent({
      fullArticle: `# ${topic}: The Ultimate Guide\n\n${outline}`,
      outline: t.outline.map((s, i) => `${i+1}. ${s}`).join('\n'),
      faq: [
        { q: `What is ${topic}?`, a: `[Answer about ${topic}]` },
        { q: `How to get started with ${topic}?`, a: `[Step-by-step answer]` },
        { q: `Best practices for ${topic}`, a: `[Best practices list]` },
        { q: `Common mistakes to avoid`, a: `[Mistakes list]` },
      ].map(f => `**Q: ${f.q}**\n\nA: ${f.a}`).join('\n\n'),
      seo: seoData
    })
  }

  const handleGenerate = () => {
    if (!topic) return
    executeWithAuth(async () => {
      await generateContent()
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
        toolName="AI Blog Generator"
        remainingUses={remainingUses}
        isLoggedIn={!!user}
      />

      <div className="border-b border-gray-150 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
            <PenTool className="text-pink-500" size={28} />
            <span>AI Blog Generator</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Generate complete SEO-optimized blog posts, outlines, and FAQs with AI. Choose templates, tone, and language.
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
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider">Article Configuration</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Blog Topic / Keyword</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Digital Marketing Strategies for Small Business" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Article Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 bg-white"
                >
                  {Object.entries(blogTemplates).map(([key, val]) => (
                    <option key={key} value={key}>{val.title} - {val.style}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Writing Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 bg-white"
                >
                  {tones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700000 focus:outline-none focus:ring-2 focus:ring-pink-500/20 bg-white"
                >
                  {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Target Word Count</label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 bg-white"
                >
                  <option value="800">800 words</option>
                  <option value="1500">1,500 words</option>
                  <option value="2500">2,500 words</option>
                  <option value="4000">4,000+ words</option>
                </select>
              </div>
              
              <div className="space-y-2 flex items-end">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSEO}
                    onChange={(e) => setIncludeSEO(e.target.checked)}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-bold text-gray-700">Include SEO Package</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic || loading || generating}
              className="w-full flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-pink-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{generating ? 'Generating Content...' : 'Generate Blog Content'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider">Generated Content</h3>
              {generatedContent && (
                <button
                  onClick={() => copyToClipboard(
                    activeTab === 'full-article' ? generatedContent.fullArticle :
                    activeTab === 'outline' ? generatedContent.outline :
                    activeTab === 'faq' ? generatedContent.faq :
                    JSON.stringify(generatedContent.seo, null, 2)
                  )}
                  className={`p-2 rounded-lg transition ${copiedText ? 'bg-green-100 text-green-600' : 'bg-white text-gray-500 hover:bg-pink-50 hover:text-pink-600'}`}
                >
                  {copiedText ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
            </div>

            {generatedContent ? (
              <div className="space-y-4">
                <Tabs defaultValue="full-article" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-gray-100 rounded-lg">
                    <TabsTrigger value="full-article" className="text-xs font-semibold py-2 rounded data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm">Full Article</TabsTrigger>
                    <TabsTrigger value="outline" className="text-xs font-semibold py-2 rounded data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm">Outline</TabsTrigger>
                    <TabsTrigger value="faq" className="text-xs font-semibold py-2 rounded data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm">FAQ Section</TabsTrigger>
                    <TabsTrigger value="seo" className="text-xs font-semibold py-2 rounded data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm">SEO Package</TabsTrigger>
                  </TabsList>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto font-mono text-sm text-gray-700 whitespace-pre-wrap">
                    <TabsContent value="full-article">{generatedContent.fullArticle}</TabsContent>
                    <TabsContent value="outline">{generatedContent.outline}</TabsContent>
                    <TabsContent value="faq">{generatedContent.faq}</TabsContent>
                    <TabsContent value="seo">{generatedContent.seo ? JSON.stringify(generatedContent.seo, null, 2) : 'SEO not included'}</TabsContent>
                  </div>
                </Tabs>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                <FileText size={32} className="animate-pulse" />
                <div>
                  <span className="block text-xs font-bold text-gray-500">Awaiting Topic</span>
                  <span className="text-[10px] block mt-0.5">Enter a topic and configure settings to generate content.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="border-t border-gray-150 pt-10 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <BookOpen className="text-pink-600" size={20} />
          <span>AI Blog Writing Tips</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5"><Sparkles size={16} className="text-pink-500" />Pick the Right Template</h4>
            <p className="text-xs text-gray-500">How-to guides rank for "how to" queries. Listicles get more shares. Case studies build authority. Match template to search intent.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5"><Search size={16} className="text-pink-500" />SEO Package is Essential</h4>
            <p className="text-xs text-gray-500">Always enable SEO package for meta title, description, keywords, and clean URL slug. These are critical for organic traffic.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5"><List size={16} className="text-pink-500" />Add Personal Experience</h4>
            <p className="text-xs text-gray-500">Google's E-E-A-T values personal experience. Edit AI output to add your stories, data, and unique insights.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5"><HelpCircle size={16} className="text-pink-500" />FAQ Sections Win Snippets</h4>
            <p className="text-xs text-gray-500">The FAQ generator creates schema-ready Q&A pairs. These often win "People Also Ask" and featured snippet positions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}