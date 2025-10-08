'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface HeroProps {
  onNavigateToContact?: () => void
  onNavigateToCases?: () => void
}

export default function Hero({ onNavigateToContact, onNavigateToCases }: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log('Video loaded successfully')
        setIsVideoLoaded(true)
      }
      
      const handleError = (e) => {
        console.error('Video failed to load:', e)
        setIsVideoLoaded(false)
      }
      
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)
      video.addEventListener('canplay', handleLoadedData)
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('canplay', handleLoadedData)
      }
    }
  }, [])

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-5"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // デバッグ用のスタイルを削除
        onError={(e) => console.log('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onLoadedData={() => console.log('Video loaded data')}
        onPlay={() => console.log('Video started playing')}
        onPause={() => console.log('Video paused')}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #b0dfa1 100%)'}}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 z-10" />
      
      {/* Debug info - 本番では削除 */}
      {/* <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-sm z-30">
        動画状態: {isVideoLoaded ? '読み込み完了' : '読み込み中...'}
      </div> */}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}
        >
            <span className="text-white">
              <span 
                className="font-bold text-white relative" 
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  WebkitTextStroke: '1px #3b82f6',
                  filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))'
                }}
              >
                Data
              </span> drives Productivity,
              <br />
              <span 
                className="font-bold text-white relative" 
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  WebkitTextStroke: '1px #84cc16',
                  filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))'
                }}
              >
                Health
              </span> builds Resilience
            </span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{color: '#fbbf24', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(251, 191, 36, 0.3)'}}>
            企業と人の未来を、共に歩む伴走者
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
        >
          <span className="font-semibold text-white">データを武器に戦略策定から実行まで</span>を一気通貫で支援
          <br />
          <span className="font-semibold text-white">実効果が出るまで</span>伴奏します！
        </motion.p>

            {/* Performance Badges */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-2xl">
                <div className="text-sm font-semibold mb-2 text-slate-700">データドリブンな営業組織の構築</div>
                <div className="text-2xl font-bold mb-2 text-slate-800">+40億円/年</div>
                <div className="text-sm text-slate-600">（大手設備建材メーカー様）</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-2xl">
                <div className="text-sm font-semibold mb-2 text-slate-700">大手ECプラットフォームでの<br />運用業務自動化</div>
                <div className="text-2xl font-bold mb-2 text-slate-800">▲3,000時間/年</div>
                <div className="text-sm text-slate-600">（メガベンチャー様）</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-2xl">
                <div className="text-sm font-semibold mb-2 text-slate-700">ECサイト離反顧客特定モデルの構築</div>
                <div className="text-2xl font-bold mb-2 text-slate-800">4倍</div>
                <div className="text-sm text-slate-600">（大手製造業商社様）</div>
              </div>
            </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={onNavigateToContact}
            title="無料相談を予約する - Contactセクションに移動"
            className="text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 min-w-[200px] hover:opacity-90 border-2 border-white/20 cursor-pointer" 
            style={{background: 'linear-gradient(to right, #01607B, #4682B4)', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
          >
            無料相談を予約する
          </button>
          <button
            onClick={onNavigateToCases}
            title="事例を見る - Casesセクションに移動"
            className="bg-white/90 text-slate-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border-2 border-white/50 min-w-[200px] cursor-pointer"
          >
            事例を見る
          </button>
        </motion.div>

      </div>
    </section>
  )
}