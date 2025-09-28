'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const caseStudies = [
  {
    id: 1,
    category: '大手設備・建材メーカー',
    title: '営業改革 × BI',
    challenge: 'PL課題の可視化と営業プロセス改善',
    solution: 'PL課題を仮説検証→KPI/業務設計→チェンジマネジメント',
    results: [
      { metric: '事業利益', value: '+200億円', period: '5年構想' },
      { metric: '削減FTE', value: '60FTE', period: '構想' }
    ],
    technologies: ['Power BI', 'SQL Server', 'Excel VBA', 'チェンジマネジメント'],
    status: '匿名',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    category: 'メガベンチャー',
    title: '新規事業開発 × データ活用',
    challenge: '急成長に伴う業務効率化とスケーラビリティ確保',
    solution: '事業計画・自動化・KPI設計による少数精鋭体制構築',
    results: [
      { metric: '工数削減', value: '3,000h', period: '年間' },
      { metric: '売上運営', value: '15億円', period: '少人数で' }
    ],
    technologies: ['Python', 'Tableau', 'Power Automate', 'KPI設計'],
    status: '匿名',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    category: 'B2B EC',
    title: '離反/貸倒検知 × BI 内製化',
    challenge: '顧客離反と貸倒リスクの早期検知',
    solution: '機械学習による離反検知モデル構築と優先度付け最適化',
    results: [
      { metric: '離反検知率', value: '20%向上', period: '' },
      { metric: '営業効率', value: '4倍', period: '改善' }
    ],
    technologies: ['Python', 'R', 'Machine Learning', 'BI内製化'],
    status: '匿名',
    gradient: 'from-emerald-500 to-teal-500'
  }
]

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0)

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 pt-32"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              導入事例
            </span>
          </h2>
          <p className="text-sm text-slate-600">
            実績に基づく成果をご紹介
          </p>
        </motion.div>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            {/* Case Study Navigation */}
            <div className="flex justify-center mb-2">
              <div className="flex space-x-4 bg-white/50 backdrop-blur-sm rounded-full p-2 border border-white/30">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCase(index)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === selectedCase
                        ? 'bg-white shadow-lg text-indigo-600'
                        : 'text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    Case {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Study Content */}
            <motion.div
              key={selectedCase}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className={`bg-gradient-to-r ${caseStudies[selectedCase].gradient} rounded-3xl p-8 text-white shadow-2xl`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                        {caseStudies[selectedCase].category}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                        {caseStudies[selectedCase].status}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">
                      {caseStudies[selectedCase].title}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 opacity-90">課題</h4>
                        <p className="opacity-80 leading-relaxed">
                          {caseStudies[selectedCase].challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-2 opacity-90">施策</h4>
                        <p className="opacity-80 leading-relaxed">
                          {caseStudies[selectedCase].solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 opacity-90">成果</h4>
                      <div className="space-y-3">
                        {caseStudies[selectedCase].results.map((result, index) => (
                          <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-2xl font-bold">
                              {result.value}
                            </div>
                            <div className="text-sm opacity-80">
                              {result.metric} {result.period && `（${result.period}）`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 opacity-90">使用技術</h4>
                      <div className="flex flex-wrap gap-2">
                        {caseStudies[selectedCase].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-2 pb-16"
            >
              <p className="text-slate-600 mb-4 text-lg">
                あなたの業界・課題に応じた事例をお聞かせします
              </p>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                詳細事例を相談する
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}