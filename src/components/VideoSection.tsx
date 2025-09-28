'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface VideoSectionProps {
  title: string
  description: string
  videoSrc: string
  posterSrc?: string
  reverse?: boolean
}

export default function VideoSection({ 
  title, 
  description, 
  videoSrc, 
  posterSrc,
  reverse = false 
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ x: reverse ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`${reverse ? 'lg:col-start-2' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                詳細を見る
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                事例をダウンロード
              </button>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ x: reverse ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative ${reverse ? 'lg:col-start-1' : ''}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-auto"
                poster={posterSrc}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                onClick={togglePlay}
              >
                <motion.div
                  animate={{ scale: isPlaying ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-slate-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
