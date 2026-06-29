import React from 'react'
import { ShieldCheck, FileText, User, Lock, Mail, Truck, Globe, Heart } from 'lucide-react'

export default function PrivacyPolicy() {
  const lastUpdated = 'June 29, 2026'

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center justify-center gap-2">
          <ShieldCheck className="text-green-600" size={28} />
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
          <p>We collect minimal data to provide our free tools:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Anonymous usage statistics (tool used, timestamp)</li>
            <li>No personal identifiers unless you voluntarily sign in</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Data</h2>
          <p>Data is used solely to improve tool performance and user experience. We never sell or share data with third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Local Processing</h2>
          <p>All tools process data entirely in your browser. Your files, text, and inputs never leave your device.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies & Storage</h2>
          <p>We use localStorage to remember your usage count for free daily limits. No tracking cookies are set.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Third‑Party Services</h2>
          <p>We may embed Google AdSense and Google Fonts. These services have their own privacy policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">6. Your Rights</h2>
          <p>You can clear localStorage at any time to reset usage counters. No personal data is stored to request deletion.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">7. Changes to This Policy</h2>
          <p>Updates will be posted here with a new "Last updated" date. Continued use constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">8. Contact</h2>
          <p>Questions? Email <a href="mailto:privacy@risaladigitalmarketing.com" className="text-green-600 hover:underline">privacy@risaladigitalmarketing.com</a></p>
        </section>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
        <ShieldCheck className="text-green-600 mx-auto mb-2" size={24} />
        <p className="text-sm text-gray-600">Your privacy is our priority. All tools run 100% client‑side.</p>
      </div>
    </div>
  )
}