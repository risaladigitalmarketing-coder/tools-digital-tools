import React, { useState } from 'react'
import { Calculator, DollarSign, Percent, BarChart2, TrendingUp, Users, RefreshCw, BookOpen } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@seller-tools/ui'
import {
  calculateROI,
  calculateROAS,
  calculateCAC,
  calculateLTV,
  calculateCTR,
  calculateCPC,
  calculateCPM,
  calculateConversionRate,
} from '@seller-tools/ui'

const InputField = ({ label, value, onChange, placeholder, type = "number" }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    />
  </div>
)

const ResultDisplay = ({ label, value, unit = "" }: any) => (
  <div className="flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-3 shadow-sm shadow-indigo-50/10">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className="font-extrabold text-indigo-700 text-lg flex items-center gap-1">
      {value !== null && value !== undefined ? `${value.toFixed(2)}${unit}` : '-'}
    </span>
  </div>
)

const ROICalculator = () => {
  const [investment, setInvestment] = useState('')
  const [revenue, setRevenue] = useState('')
  const [roi, setRoi] = useState<number | null>(null)

  const handleCalculate = () => {
    const inv = parseFloat(investment)
    const rev = parseFloat(revenue)
    if (!isNaN(inv) && !isNaN(rev)) {
      setRoi(calculateROI(inv, rev))
    } else {
      setRoi(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Investment (INR)" value={investment} onChange={setInvestment} placeholder="e.g., 50000" />
      <InputField label="Total Revenue (INR)" value={revenue} onChange={setRevenue} placeholder="e.g., 75000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate ROI</span>
      </button>
      <ResultDisplay label="Return on Investment (ROI)" value={roi} unit="%" />
    </div>
  )
}

const ROASCalculator = () => {
  const [adSpend, setAdSpend] = useState('')
  const [revenue, setRevenue] = useState('')
  const [roas, setRoas] = useState<number | null>(null)

  const handleCalculate = () => {
    const spend = parseFloat(adSpend)
    const rev = parseFloat(revenue)
    if (!isNaN(spend) && !isNaN(rev)) {
      setRoas(calculateROAS(spend, rev))
    } else {
      setRoas(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Ad Spend (INR)" value={adSpend} onChange={setAdSpend} placeholder="e.g., 10000" />
      <InputField label="Revenue from Ads (INR)" value={revenue} onChange={setRevenue} placeholder="e.g., 30000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate ROAS</span>
      </button>
      <ResultDisplay label="Return on Ad Spend (ROAS)" value={roas} unit="x" />
    </div>
  )
}

const CACCalculator = () => {
  const [totalMarketingCost, setTotalMarketingCost] = useState('')
  const [newCustomers, setNewCustomers] = useState('')
  const [cac, setCac] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalMarketingCost)
    const customers = parseFloat(newCustomers)
    if (!isNaN(cost) && !isNaN(customers)) {
      setCac(calculateCAC(cost, customers))
    } else {
      setCac(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Marketing Cost (INR)" value={totalMarketingCost} onChange={setTotalMarketingCost} placeholder="e.g., 20000" />
      <InputField label="New Customers Acquired" value={newCustomers} onChange={setNewCustomers} placeholder="e.g., 100" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate CAC</span>
      </button>
      <ResultDisplay label="Customer Acquisition Cost (CAC)" value={cac} unit=" INR" />
    </div>
  )
}

const LTVCalculator = () => {
  const [averageOrderValue, setAverageOrderValue] = useState('')
  const [purchaseFrequency, setPurchaseFrequency] = useState('')
  const [customerLifespan, setCustomerLifespan] = useState('')
  const [ltv, setLtv] = useState<number | null>(null)

  const handleCalculate = () => {
    const aov = parseFloat(averageOrderValue)
    const freq = parseFloat(purchaseFrequency)
    const lifespan = parseFloat(customerLifespan)
    if (!isNaN(aov) && !isNaN(freq) && !isNaN(lifespan)) {
      setLtv(calculateLTV(aov, freq, lifespan))
    } else {
      setLtv(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Average Order Value (INR)" value={averageOrderValue} onChange={setAverageOrderValue} placeholder="e.g., 5000" />
      <InputField label="Average Purchase Frequency (per year)" value={purchaseFrequency} onChange={setPurchaseFrequency} placeholder="e.g., 4" />
      <InputField label="Average Customer Lifespan (years)" value={customerLifespan} onChange={setCustomerLifespan} placeholder="e.g., 3" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate LTV</span>
      </button>
      <ResultDisplay label="Customer Lifetime Value (LTV)" value={ltv} unit=" INR" />
    </div>
  )
}

const CTRCalculator = () => {
  const [clicks, setClicks] = useState('')
  const [impressions, setImpressions] = useState('')
  const [ctr, setCtr] = useState<number | null>(null)

  const handleCalculate = () => {
    const clk = parseFloat(clicks)
    const impr = parseFloat(impressions)
    if (!isNaN(clk) && !isNaN(impr)) {
      setCtr(calculateCTR(clk, impr))
    } else {
      setCtr(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Clicks" value={clicks} onChange={setClicks} placeholder="e.g., 500" />
      <InputField label="Total Impressions" value={impressions} onChange={setImpressions} placeholder="e.g., 10000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate CTR</span>
      </button>
      <ResultDisplay label="Click-Through Rate (CTR)" value={ctr} unit="%" />
    </div>
  )
}

const CPCCalculator = () => {
  const [totalCost, setTotalCost] = useState('')
  const [clicks, setClicks] = useState('')
  const [cpc, setCpc] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalCost)
    const clk = parseFloat(clicks)
    if (!isNaN(cost) && !isNaN(clk)) {
      setCpc(calculateCPC(cost, clk))
    } else {
      setCpc(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Cost (INR)" value={totalCost} onChange={setTotalCost} placeholder="e.g., 1000" />
      <InputField label="Total Clicks" value={clicks} onChange={setClicks} placeholder="e.g., 100" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate CPC</span>
      </button>
      <ResultDisplay label="Cost Per Click (CPC)" value={cpc} unit=" INR" />
    </div>
  )
}

const CPMCalculator = () => {
  const [totalCost, setTotalCost] = useState('')
  const [impressions, setImpressions] = useState('')
  const [cpm, setCpm] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalCost)
    const impr = parseFloat(impressions)
    if (!isNaN(cost) && !isNaN(impr)) {
      setCpm(calculateCPM(cost, impr))
    } else {
      setCpm(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Cost (INR)" value={totalCost} onChange={setTotalCost} placeholder="e.g., 5000" />
      <InputField label="Total Impressions" value={impressions} onChange={setImpressions} placeholder="e.g., 100000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate CPM</span>
      </button>
      <ResultDisplay label="Cost Per Mille (CPM)" value={cpm} unit=" INR" />
    </div>
  )
}

const ConversionRateCalculator = () => {
  const [conversions, setConversions] = useState('')
  const [clicks, setClicks] = useState('')
  const [conversionRate, setConversionRate] = useState<number | null>(null)

  const handleCalculate = () => {
    const conv = parseFloat(conversions)
    const clk = parseFloat(clicks)
    if (!isNaN(conv) && !isNaN(clk)) {
      setConversionRate(calculateConversionRate(conv, clk))
    } else {
      setConversionRate(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Conversions" value={conversions} onChange={setConversions} placeholder="e.g., 50" />
      <InputField label="Total Clicks/Visitors" value={clicks} onChange={setClicks} placeholder="e.g., 1000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator size={18} />
        <span>Calculate Conversion Rate</span>
      </button>
      <ResultDisplay label="Conversion Rate" value={conversionRate} unit="%" />
    </div>
  )
}

export default function MarketingCalculators() {
  const [activeTab, setActiveTab] = useState('roi')

  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Calculator className="text-indigo-500" size={28} />
          <span>Marketing Calculators Hub</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          A comprehensive suite of free marketing calculators for ROI, ROAS, CTR, CPC, CPM, and more. Optimize your campaigns and boost your digital marketing performance.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="lg:flex-1 space-y-6">
          <Tabs defaultValue="roi" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 h-auto p-1.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
              <TabsTrigger value="roi" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                ROI Calculator
              </TabsTrigger>
              <TabsTrigger value="roas" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                ROAS Calculator
              </TabsTrigger>
              <TabsTrigger value="cac" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                CAC Calculator
              </TabsTrigger>
              <TabsTrigger value="ltv" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                LTV Calculator
              </TabsTrigger>
              <TabsTrigger value="ctr" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                CTR Calculator
              </TabsTrigger>
              <TabsTrigger value="cpc" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                CPC Calculator
              </TabsTrigger>
              <TabsTrigger value="cpm" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                CPM Calculator
              </TabsTrigger>
              <TabsTrigger value="conversion" className="text-xs font-semibold px-3 py-2 rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-200 data-[state=active]:shadow-sm">
                Conversion Rate
              </TabsTrigger>
            </TabsList>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6">
              <TabsContent value="roi"><ROICalculator /></TabsContent>
              <TabsContent value="roas"><ROASCalculator /></TabsContent>
              <TabsContent value="cac"><CACCalculator /></TabsContent>
              <TabsContent value="ltv"><LTVCalculator /></TabsContent>
              <TabsContent value="ctr"><CTRCalculator /></TabsContent>
              <TabsContent value="cpc"><CPCCalculator /></TabsContent>
              <TabsContent value="cpm"><CPMCalculator /></TabsContent>
              <TabsContent value="conversion"><ConversionRateCalculator /></TabsContent>
            </div>
          </Tabs>
        </div>

        {/* ADSENSE SIDEBAR AD UNIT */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-[400px] flex flex-col items-center justify-center relative overflow-hidden border-dashed border-gray-300 group">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-200 absolute top-1 right-1">Google Ad</span>
            <div className="flex flex-col items-center text-center space-y-2 text-gray-400 group-hover:text-indigo-500 transition duration-300">
              <TrendingUp size={24} />
              <div>
                <span className="block text-xs font-bold text-gray-500">Vertical Display Ad</span>
                <span className="text-[10px] block mt-0.5">300x600 Large Skyscraper</span>
                <span className="text-[9px] text-gray-300 block mt-1">High impact, prime ad placement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQS / ARTICLES SECTION */}
      <section className="border-t border-gray-150 pt-10 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <BookOpen className="text-indigo-600" size={20} />
          <span>Understanding Marketing Metrics</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <DollarSign size={16} className="text-indigo-500" />
              <span>What is ROI?</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Return on Investment (ROI) measures the profitability of an investment relative to its cost. It's a key metric to evaluate the efficiency of your marketing campaigns.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Percent size={16} className="text-indigo-500" />
              <span>Why is ROAS important?</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Return on Ad Spend (ROAS) is crucial for understanding the revenue generated for every rupee spent on advertising. It helps optimize ad budgets for maximum impact.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <Users size={16} className="text-indigo-500" />
              <span>How to reduce CAC?</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Customer Acquisition Cost (CAC) can be reduced by optimizing targeting, improving ad creative, enhancing landing page experience, and leveraging organic channels. A lower CAC means higher profitability.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
              <BarChart2 size={16} className="text-indigo-500" />
              <span>Maximizing LTV</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Customer Lifetime Value (LTV) can be maximized through excellent customer service, loyalty programs, personalized marketing, and retention strategies. A higher LTV ensures long-term business growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}