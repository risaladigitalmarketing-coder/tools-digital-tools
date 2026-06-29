declare module '@seller-tools/ui' {
  import * as React from 'react'
  // Core UI components (only the ones used in the app)
  export const AuthProvider: React.FC<{children: React.ReactNode}>
  export const AuthModal: React.FC<any>
  export const useAITool: (toolId: string) => any
  export const generateBusinessName: (base: string, category: string) => string[]
  export const calculateROI: (investment: number, revenue: number) => number
  export const calculateROAS: (adSpend: number, revenue: number) => number
  export const calculateCAC: (totalMarketingCost: number, newCustomers: number) => number
  export const calculateLTV: (averageOrderValue: number, purchaseFrequency: number, customerLifespan: number) => number
  export const calculateCTR: (clicks: number, impressions: number) => number
  export const calculateCPC: (totalCost: number, clicks: number) => number
  export const calculateCPM: (totalCost: number, impressions: number) => number
  export const calculateConversionRate: (conversions: number, clicks: number) => number
  // UI primitives used for tabs and layout
  export const Tabs: any
  export const TabsList: any
  export const TabsTrigger: any
  export const TabsContent: any
  // Other components can be added as needed
}
