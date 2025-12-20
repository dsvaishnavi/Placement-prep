import { useState, useEffect } from 'react'
import { Rocket, Sparkles } from 'lucide-react'

const LoadingSpinner = ({ theme }) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'dark'
            ? 'bg-black/50 backdrop-blur-sm'
            : 'bg-white/50 backdrop-blur-sm'
            }`}>
            <div className={`relative p-8 rounded-2xl backdrop-blur-xl border ${theme === 'dark'
                ? 'bg-gray-900/90 border-white/10'
                : 'bg-white/90 border-gray-200/50'
                }`}>
                <div className="flex flex-col items-center space-y-4">
                    {/* Animated Rocket */}
                    <div className="relative">
                        <div className={`p-4 rounded-full ${theme === 'dark'
                            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20'
                            : 'bg-gradient-to-br from-blue-100 to-green-100'
                            }`}>
                            <Rocket className="w-8 h-8 text-blue-500 animate-bounce" />
                        </div>
                        {/* Sparkles */}
                        <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-green-400 animate-pulse" />
                        <Sparkles className="absolute -bottom-2 -left-2 w-3 h-3 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>

                    {/* Loading Text */}
                    <div className="text-center">
                        <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Loading...
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            Preparing your experience
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse" style={{
                            width: '60%',
                            animation: 'loading 1.5s ease-in-out infinite'
                        }} />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
      `}</style>
        </div>
    )
}

export default LoadingSpinner