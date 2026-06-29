import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + 'Cr'
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + 'L'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${cleanPhone}`
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }
  return baseUrl
}

export function generateBusinessName(base: string, category: string): string[] {
  const prefixes = ['Shri', 'Shree', 'Maa', 'Baba', 'Guru', 'Jai', 'Shri', 'Om', 'Divine', 'Royal', 'Premium', 'Elite', 'Prime', 'Supreme', 'Grand', 'Mega', 'Ultra', 'Pro', 'Expert', 'Master', 'Guru']
  const suffixes = ['Enterprises', 'Solutions', 'Services', 'Trading', 'Corporation', 'Group', 'Industries', 'Ventures', 'Hub', 'Point', 'Zone', 'Center', 'Mart', 'Bazaar', 'Store', 'Shop', 'Gallery', 'Studio', 'Lab', 'Works', 'Crafts', 'Creations', 'Innovations', 'Technologies', 'Systems', 'Network', 'Connect', 'Link', 'Bridge', 'Path', 'Way', 'Route', 'Line', 'Express', 'Speed', 'Fast', 'Quick', 'Smart', 'Digital', 'Modern', 'Future', 'Next', 'New', 'Best', 'Top', 'Prime', 'Choice', 'Select', 'Pick', 'Choice']
  
  const baseWords = base.split(' ').filter(w => w.length > 2)
  const results: string[] = []
  
  baseWords.forEach(word => {
    prefixes.forEach(pre => {
      results.push(`${pre} ${word}`)
      results.push(`${word} ${pre}`)
    })
    suffixes.forEach(suf => {
      results.push(`${word} ${suf}`)
      results.push(`${suf} ${word}`)
    })
  })
  
  if (category) {
    const catWords = category.split(' ').filter(w => w.length > 2)
    catWords.forEach(word => {
      prefixes.forEach(pre => {
        results.push(`${pre} ${word}`)
        results.push(`${word} ${pre}`)
      })
      suffixes.forEach(suf => {
        results.push(`${word} ${suf}`)
        results.push(`${suf} ${word}`)
      })
    })
  }
  
  return [...new Set(results)].slice(0, 50)
}

export function calculateROI(investment: number, revenue: number): number {
  if (investment === 0) return 0
  return ((revenue - investment) / investment) * 100
}

export function calculateROAS(adSpend: number, revenue: number): number {
  if (adSpend === 0) return 0
  return revenue / adSpend
}

export function calculateCAC(totalMarketingCost: number, newCustomers: number): number {
  if (newCustomers === 0) return 0
  return totalMarketingCost / newCustomers
}

export function calculateLTV(averageOrderValue: number, purchaseFrequency: number, customerLifespan: number): number {
  return averageOrderValue * purchaseFrequency * customerLifespan
}

export function calculateCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0
  return (clicks / impressions) * 100
}

export function calculateCPC(totalCost: number, clicks: number): number {
  if (clicks === 0) return 0
  return totalCost / clicks
}

export function calculateCPM(totalCost: number, impressions: number): number {
  if (impressions === 0) return 0
  return (totalCost / impressions) * 1000
}

export function calculateConversionRate(conversions: number, clicks: number): number {
  if (clicks === 0) return 0
  return (conversions / clicks) * 100
}