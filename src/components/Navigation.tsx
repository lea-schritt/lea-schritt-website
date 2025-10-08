'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface NavigationProps {
  currentSection: number
  totalSections: number
  onSectionChange: (index: number) => void
}

const sectionNames = ['Home', 'Services', 'Cases', 'About', 'Contact']

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-2 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onSectionChange(0)}
              className="transition-all duration-200 hover:opacity-80"
              title="Homeに戻る"
            >
              <Image 
                src="/images/leaschritt.png" 
                alt="Lea Schritt Logo" 
                width={80} 
                height={24}
                className="object-contain"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sectionNames.map((name, index) => (
              <button
                key={index}
                onClick={() => onSectionChange(index)}
                className={`text-sm font-medium transition-all duration-200 hover:text-blue-600 ${
                  index === currentSection
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => onSectionChange(4)} // Contact section
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              無料相談を予約
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
          >
            <svg 
              className="w-6 h-6 text-slate-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-white/20 md:hidden"
        >
          <div className="px-6 py-4 space-y-4">
            {sectionNames.map((name, index) => (
              <button
                key={index}
                onClick={() => {
                  onSectionChange(index)
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left text-base font-medium transition-colors ${
                  index === currentSection
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {name}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  onSectionChange(4)
                  setIsMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                無料相談を予約
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}