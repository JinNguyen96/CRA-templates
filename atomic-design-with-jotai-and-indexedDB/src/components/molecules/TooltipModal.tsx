import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface TooltipModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function TooltipModal({ isOpen, onClose, title, content }: TooltipModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false)
    }
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:p-0">
      <div
        className={`fixed inset-0 transition-opacity duration-200 ease-in ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        className={`w-full bg-white rounded-t-lg overflow-hidden shadow-xl transform transition-transform duration-[200ms] ease-out fixed bottom-0 left-0 right-0 ${
          isAnimating && isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          maxHeight: '80vh',
          transitionDelay: isOpen ? '200ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Custom easing function for a smoother long animation
        }}
        onTransitionEnd={handleAnimationEnd}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-between items-center">
                {title}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <X size={24} />
                </button>
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

