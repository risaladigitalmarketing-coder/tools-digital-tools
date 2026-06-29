import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Check, 
  RefreshCw, 
  Share2,
  Sparkles,
  Search,
  BookOpen,
  Send
} from 'lucide-react'
// Local implementation of generateWhatsAppLink (fallback if library import fails)
const generateWhatsAppLink = (phone: string, message?: string): string => {
  const cleanPhone = phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${cleanPhone}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export default function WhatsAppLinkGenerator() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [countryCode, setCountryCode] = useState('91') // Default to India
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showQr, setShowQr] = useState(false)

  // Popular pre-filled templates to make the tool extremely engaging & user-friendly
  const templates = [
    { label: "Business Inquiry", text: "Hello, I am interested in your digital marketing services. Please share details." },
    { label: "Book Appointment", text: "Hi! I would like to book a consulting appointment for my brand." },
    { label: "Support Ticket", text: "Hello Team, I am facing an issue and need technical support." },
    { label: "Product Order", text: "Hi, I want to order this product. Please share availability." }
  ]

  useEffect(() => {
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '')
      const fullPhone = `${countryCode}${cleanPhone}`
      const baseUrl = `https://wa.me/${fullPhone}`
      const link = message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
      setGeneratedLink(link)
      
      // Generate QR Code URL using a free reliable open QR API
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`)
    } else {
      setGeneratedLink('')
      setQrCodeUrl('')
    }
  }, [phone, message, countryCode])

  const copyToClipboard = () => {
    if (!generatedLink) return
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (!generatedLink) return
    if (navigator.share) {
      navigator.share({
        title: 'WhatsApp Click to Chat Link',
        text: 'Send me a message on WhatsApp:',
        url: generatedLink,
      })
    } else {
      copyToClipboard()
      alert('Link copied to clipboard for sharing!')
    }
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <MessageSquare className="text-green-500" size={28} />
          <span>WhatsApp Link Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create free WhatsApp click-to-chat links (wa.me) with pre-filled messages instantly. Boost leads and customer engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Enter Phone Number & Message</span>
            </h2>

            {/* Country Code & Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Enter WhatsApp Number</label>
              <div className="flex rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
                <span className="inline-flex items-center px-4 bg-gray-50 border-r border-gray-200 text-sm font-semibold text-gray-500">
                  +
                </span>
                <input 
                  type="text" 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="91" 
                  className="w-16 px-3 py-2 text-sm font-semibold text-center border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/10"
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210 (without country code)" 
                  className="flex-1 px-4 py-3 text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/10"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Be sure to write numbers only without symbols, spaces, or leading zeros.</p>
            </div>

            {/* Pre-filled Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Custom Welcome Message (Optional)</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I want to inquire about..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <p className="text-[11px] text-gray-400 font-medium">When users click your link, this text will automatically appear in their typing bar.</p>
            </div>

            {/* Popular Templates */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500">Quick-Fill Templates:</span>
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(tpl.text)}
                    className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 border border-transparent font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    {tpl.label}
                  </button>
                ))}
                {message && (
                  <button
                    onClick={() => setMessage('')}
                    className="text-xs text-red-500 hover:bg-red-50 hover:border-red-200 border border-transparent font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Clear Message
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL (5 columns) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-200 pb-3">
              <span>Your Generated WhatsApp Link</span>
            </h3>

            {phone ? (
              <div className="space-y-6">
                {/* Result Input Display */}
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink}
                    className="w-full pr-12 pl-4 py-3 border border-green-200 bg-white rounded-xl text-xs font-bold text-green-700 shadow-sm shadow-green-50/50"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1.5 p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Main CTR Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center space-x-2 bg-white border border-green-200 hover:bg-green-50 text-green-700 font-bold py-3 px-4 rounded-xl shadow-sm transition"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-100 transition"
                  >
                    <Send size={18} />
                    <span>Open in Chat</span>
                  </a>
                </div>

                {/* QR Code toggle */}
                <div className="border-t border-gray-200 pt-5 space-y-4">
                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="w-full flex items-center justify-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-green-600 transition"
                  >
                    <QrCode size={16} />
                    <span>{showQr ? 'Hide QR Code' : 'Generate & Download QR Code'}</span>
                  </button>

                  {showQr && qrCodeUrl && (
                    <div className="flex flex-col items-center space-y-3 bg-white p-4 border border-gray-150 rounded-xl shadow-sm animate-in">
                      <img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-40 h-40" />
                      <a 
                        href={qrCodeUrl} 
                        download="whatsapp-qr.png" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-green-600 hover:underline font-bold flex items-center space-x-1"
                      >
                        <ExternalLink size={12} />
                        <span>Download PNG</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-gray-600 transition"
                  >
                    <Share2 size={14} />
                    <span>Share link with others</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center space-y-3 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                <MessageSquare size={32} className="animate-pulse" />
                <div>
                  <span className="block text-xs font-bold text-gray-500">Awaiting Phone Number</span>
                  <span className="text-[10px] block mt-0.5">Please fill in your country code and WhatsApp number above.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO FAQS / ARTICLES SECTION (Helps organic rank massively!) */}
      <section className="border-t border-gray-150 pt-10 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <BookOpen className="text-green-600" size={20} />
          <span>Frequently Asked Questions (FAQ)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900">What is a WhatsApp Link?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              A WhatsApp Link (wa.me) is a click-to-chat URL that allows people to message you on WhatsApp with a single click. Users do not need to save your contact details on their phone to start a conversation, creating a seamless lead-generation process.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900">Is this tool free and secure?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Yes, 100%! All links are generated entirely in your local browser. No phone numbers or custom messages are sent to our servers. Your information is perfectly private and secure.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900">How to add a welcome message?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Simply type your custom message inside the "Custom Welcome Message" box. Our generator automatically converts spaces, emojis, and punctuation into safe URL encoding so it opens perfectly inside the WhatsApp application.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900">Can I share the generated link on Instagram or Facebook?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Absolutely! These wa.me links are ideal for your Instagram bio, Facebook page description, YouTube video notes, email newsletter footer, or digital marketing campaigns to drive direct customer interaction.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}