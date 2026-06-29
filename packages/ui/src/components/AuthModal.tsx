import React from 'react'
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '../components/button'
import { Card, CardContent } from '../components/card'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
  toolName: string
  remainingUses: number
  isLoggedIn: boolean
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  toolName,
  remainingUses,
  isLoggedIn 
}: AuthModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Sign in to continue</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition">
            <X size={20} />
          </button>
        </div>

        <Card className="m-4 border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-6 px-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <User size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{toolName}</p>
                <p className="text-sm text-gray-500">
                  {isLoggedIn 
                    ? `You've used your ${5 - remainingUses} of 5 daily free generations.`
                    : `You've used your 1 free generation. Sign in for 5 daily generations.`}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2 text-green-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 size={16} />
                <span>Free: 5 generations/day per tool</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Lock size={16} />
                <span>Your data stays private</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Mail size={16} />
                <span>One-click Google sign-in</span>
              </div>
            </div>

            <Button 
              onClick={onLogin}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53939-.2-2.06H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-xs text-gray-400 mt-3">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </CardContent>
        </Card>

        <div className="px-4 pb-4 text-center">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}