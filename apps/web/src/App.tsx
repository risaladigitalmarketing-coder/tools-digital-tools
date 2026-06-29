import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WhatsAppLinkGenerator from './pages/WhatsAppLinkGenerator'
import BusinessNameGenerator from './pages/BusinessNameGenerator'
import MarketingCalculators from './pages/MarketingCalculators'
import AiMetaAdsGenerator from './pages/AiMetaAdsGenerator'
import PDFToolkit from './pages/PDFToolkit'
import AIBlogGenerator from './pages/AIBlogGenerator'
import AIEmailToolkit from './pages/AIEmailToolkit'
import AIPromptGenerator from './pages/AIPromptGenerator'
import AIImageTools from './pages/AIImageTools'
import JSONTools from './pages/JSONTools'
import CodeFormatter from './pages/CodeFormatter'
import DevToolkit from './pages/DevToolkit'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf-tools" element={<PDFToolkit />} />
          <Route path="/whatsapp-link-generator" element={<WhatsAppLinkGenerator />} />
          <Route path="/business-name-generator" element={<BusinessNameGenerator />} />
          <Route path="/marketing-calculators" element={<MarketingCalculators />} />
          <Route path="/ai-meta-ads-generator" element={<AiMetaAdsGenerator />} />
          <Route path="/ai-blog-generator" element={<AIBlogGenerator />} />
          <Route path="/ai-email-toolkit" element={<AIEmailToolkit />} />
          <Route path="/ai-prompt-generator" element={<AIPromptGenerator />} />
          <Route path="/ai-image-tools" element={<AIImageTools />} />
          <Route path="/json-tools" element={<JSONTools />} />
          <Route path="/code-formatter" element={<CodeFormatter />} />
          <Route path="/dev-toolkit" element={<DevToolkit />} />
          {/* Basic Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
