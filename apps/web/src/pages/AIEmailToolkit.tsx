import React, { useState } from 'react'
import { Mail, Copy, Check, RefreshCw, Sparkles, Send, AtSign, MessageSquare } from 'lucide-react'

const emailTemplates = [
  {
    category: 'Cold Outreach',
    templates: [
      { subject: 'Quick question about {{company}}\'s growth', body: 'Hi {{firstName}},\n\nI noticed {{company}} has been expanding rapidly in the {{industry}} space. I work with similar companies to help them reduce costs and improve efficiency.\n\nWould you be open to a quick 5-minute chat next week?\n\nBest,\n{{yourName}}' },
      { subject: 'Idea for {{company}}', body: 'Hi {{firstName}},\n\nI came across {{company}} and had a quick idea that could potentially 2x your conversion rate. Would you be open to sharing your email so I can send a brief breakdown?\n\nCheers,\n{{yourName}}' }
    ]
  },
  {
    category: 'Follow-Up',
    templates: [
      { subject: 'Following up on our conversation', body: 'Hi {{firstName}},\n\nJust wanted to follow up on my previous email about {{topic}}. I understand you\'re busy, but I think a 5-minute call could really help.\n\nWhen works best for you?\n\nBest,\n{{yourName}}' },
      { subject: 'Should I close your file?', body: 'Hi {{firstName}},\n\nI haven\'t heard back, so I\'m guessing timing isn\'t ideal. Should I close your file or would next week be a better time to reconnect?\n\nThanks,\n{{yourName}}' }
    ]
  },
  {
    category: 'Sales Pitch',
    templates: [
      { subject: 'How {{similarCompany}} increased sales by 47%', body: 'Hi {{firstName}},\n\nWe recently helped {{similarCompany}} achieve a 47% increase in sales within 90 days using our proven framework.\n\nI\'d love to share the exact strategy in a quick 10-minute call. Worth exploring?\n\nBest,\n{{yourName}}' }
    ]
  },
  {
    category: 'Welcome Email',
    templates: [
      { subject: 'Welcome to the {{productName}} family! 🎉', body: 'Hi {{firstName}},\n\nWelcome aboard! We\'re thrilled to have you.\n\nHere are 3 things to get started:\n1. Complete your profile\n2. Try our top feature\n3. Join our community\n\nQuestions? Just reply to this email.\n\nCheers,\nThe {{productName}} team' }
    ]
  }
]

export default function AIEmailToolkit() {
  const [selectedCategory, setSelectedCategory] = useState(emailTemplates[0].category)
  const [copiedIndex, setCopiedIndex] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [customBody, setCustomBody] = useState('')
  const [tone, setTone] = useState('Professional')

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Title */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Mail className="text-cyan-500" size={28} />
          <span>AI Email Toolkit</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Professional email templates and AI-powered copy generation for outreach, sales, and follow-ups.</p>
      </div>

      {/* Tone Selector */}
      <div className="flex flex-wrap gap-2">
        {['Professional', 'Friendly', 'Casual', 'Persuasive', 'Formal'].map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              tone === t ? 'bg-cyan-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categories & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Categories</h3>
          {emailTemplates.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${
                selectedCategory === cat.category
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 bg-white hover:border-cyan-200'
              }`}
            >
              <span className="font-bold text-sm text-gray-900">{cat.category}</span>
              <span className="ml-2 text-xs text-cyan-600 font-bold">({cat.templates.length})</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 space-y-6">
          {emailTemplates
            .find((c) => c.category === selectedCategory)
            ?.templates.map((template, i) => {
              const id = `${selectedCategory}-${i}`
              return (
                <div key={id} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        <AtSign size={14} /> Subject Line
                      </div>
                      <div className="font-bold text-gray-900 mt-1">{template.subject}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(template.subject, `${id}-subject`)}
                      className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition"
                    >
                      {copiedIndex === `${id}-subject` ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      <MessageSquare size={14} /> Body
                    </div>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans mt-2 leading-relaxed">{template.body}</pre>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleCopy(template.body, id)}
                      className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-3 py-2 rounded-lg transition"
                    >
                      {copiedIndex === id ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedIndex === id ? 'Copied!' : 'Copy Body'}</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg transition">
                      <Send size={14} />
                      <span>Send Test</span>
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Custom Email Builder */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-cyan-500" size={20} />
          Quick Custom Email Builder
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            placeholder="Subject line..."
            className="w-full px-4 py-3 border border-cyan-200 rounded-xl text-sm font-semibold bg-white"
          />
          <textarea
            value={customBody}
            onChange={(e) => setCustomBody(e.target.value)}
            placeholder="Write or paste email body here... Use {{firstName}}, {{company}} as variables."
            rows={4}
            className="w-full px-4 py-3 border border-cyan-200 rounded-xl text-sm bg-white"
          />
          <button
            onClick={() => handleCopy(`Subject: ${customSubject}\n\n${customBody}`, 'custom')}
            disabled={!customSubject && !customBody}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {copiedIndex === 'custom' ? <Check size={18} /> : <Copy size={18} />}
            <span>{copiedIndex === 'custom' ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>
      </section>
    </div>
  )
}
