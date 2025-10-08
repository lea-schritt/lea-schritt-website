'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

const sections = [
  { id: 'hero', component: Hero },
  { id: 'services', component: Services },
  { id: 'cases', component: CaseStudies },
  { id: 'about', component: About },
  { id: 'contact', component: Contact },
]

// Contactセクションのインデックスを取得
const contactSectionIndex = sections.findIndex(section => section.id === 'contact')
// Casesセクションのインデックスを取得
const casesSectionIndex = sections.findIndex(section => section.id === 'cases')

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentSection(index)
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }

  const goNext = () => {
    console.log('goNext called, currentSection:', currentSection, 'sections.length:', sections.length)
    if (currentSection < sections.length - 1) {
      console.log('Moving to next section:', currentSection + 1)
      goToSection(currentSection + 1)
    } else {
      console.log('Already at last section')
    }
  }

  const goPrev = () => {
    console.log('goPrev called, currentSection:', currentSection)
    if (currentSection > 0) {
      console.log('Moving to previous section:', currentSection - 1)
      goToSection(currentSection - 1)
    } else {
      console.log('Already at first section')
    }
  }

  // デスクトップのみスワイプを有効化
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlers = useSwipeable({
    onSwipedLeft: isMobile ? undefined : goNext,
    onSwipedRight: isMobile ? undefined : goPrev,
    preventScrollOnSwipe: false,
    trackMouse: !isMobile,
    delta: 50,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 入力フィールド内でのキーイベントは無視
      const target = event.target as HTMLElement
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.contentEditable === 'true'
      )) {
        return
      }

      console.log('Key pressed:', event.key, 'Current section:', currentSection)
      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault()
        console.log('Going to next section')
        goNext()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        console.log('Going to previous section')
        goPrev()
      } else if (event.key >= '1' && event.key <= '5') {
        event.preventDefault()
        console.log('Going to section:', parseInt(event.key) - 1)
        goToSection(parseInt(event.key) - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isTransitioning])

  const CurrentComponent = sections[currentSection].component

  // Contactセクションへのナビゲーション関数
  const navigateToContact = () => {
    goToSection(contactSectionIndex)
  }

  // Casesセクションへのナビゲーション関数
  const navigateToCases = () => {
    goToSection(casesSectionIndex)
  }

  return (
    <>
      {/* モバイル: 縦スクロール表示 */}
      <div className="md:hidden w-full overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <Hero onNavigateToContact={navigateToContact} onNavigateToCases={navigateToCases} />
        <Services />
        <CaseStudies />
        <About />
        <Contact />
      </div>

      {/* デスクトップ: セクション切り替え表示 */}
      <div
        {...handlers}
        className="hidden md:block h-screen w-full overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 relative"
      >
        <Navigation
          currentSection={currentSection}
          totalSections={sections.length}
          onSectionChange={goToSection}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
            className="min-h-full w-full overflow-y-auto"
          >
            {currentSection === 0 ? (
              <Hero onNavigateToContact={navigateToContact} onNavigateToCases={navigateToCases} />
            ) : (
              <CurrentComponent />
            )}
          </motion.div>
        </AnimatePresence>

      {/* Desktop Navigation Arrows - 常時表示 */}
      <div className="hidden md:flex absolute inset-x-0 top-4 justify-center z-30">
        <button
          onClick={goPrev}
          disabled={currentSection === 0 || isTransitioning}
          title="前のセクションに移動"
          className="p-3 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-sm border border-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7-7-7 7" />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex absolute inset-x-0 bottom-20 justify-center z-30">
        <button
          onClick={goNext}
          disabled={currentSection === sections.length - 1 || isTransitioning}
          title="次のセクションに移動"
          className="p-3 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-sm border border-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" />
          </svg>
        </button>
      </div>

        {/* Progress indicator - 常時表示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSection(index)}
              title={`セクション ${index + 1} に移動`}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                index === currentSection
                  ? 'bg-blue-600 w-8 shadow-blue-500/50'
                  : 'bg-white/60 hover:bg-white/80 border border-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
