'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const skills = [
  {
    category: '経営・戦略',
    items: ['事業計画', 'KPI設計', 'チェンジマネジメント', '業務設計', '営業戦略', 'EC', 'BPR（業務設計）']
  },
  {
    category: 'データ分析',
    items: ['SQL', 'Python', 'R', 'Statistics', 'BI']
  }
]

const experience = [
  {
    period: '現在',
    company: 'Lea Schritt',
    role: '代表・コンサルタント',
    description: '戦略/経営・データサイエンティスト・AI/ITコンサルタントの三刀流で企業の成果創出を支援'
  },
  {
    period: '',
    company: 'Pragmateches',
    role: 'コンサルタント',
    description: '戦略/AIコンサルティング・データサイエンティスト'
  },
  {
    period: '',
    company: 'Accenture',
    role: 'コンサルタント',
    description: '戦略・経営/オペレーション/AI・ITコンサルティング・データサイエンティスト'
  },
  {
    period: '',
    company: 'アサヒビール株式会社',
    role: 'セールス',
    description: '法人営業'
  }
]

export default function About() {
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null)

  return (
    <section className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32 min-h-full">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About
            </span>
          </h2>
        </motion.div>

        {/* Company Overview Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 min-h-[600px]"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">会社概要</h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
              
              {/* 基本情報 */}
              <div className="space-y-4 mb-8">
                <div>
                  <span className="font-semibold text-slate-700">社名:</span>
                  <span className="ml-2 text-slate-600">株式会社 Lea Schritt（レア シュリット）</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">本社所在地:</span>
                  <span className="ml-2 text-slate-600">〒850-0057 長崎県長崎市大黒町10番10号 KoKoRoビル 6180号室</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">設立年月:</span>
                  <span className="ml-2 text-slate-600">2025年9月</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">代表取締役社長:</span>
                  <span className="ml-2 text-slate-600">栗山 領河</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">対応エリア:</span>
                  <span className="ml-2 text-slate-600">長崎を拠点に、九州全域をサポートしています。※その他のエリアもご相談ください。</span>
                </div>
              </div>

              {/* 事業内容 */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-800 mb-4">事業内容</h4>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-semibold text-slate-700 mb-2">1. 経営コンサルティング・AI活用支援</h5>
                    <p className="text-slate-600 text-sm">
                      経営コンサルティング業務およびデータ分析・人工知能(AI)を活用した経営支援・業務改善に関する企画、立案及び実施
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-semibold text-slate-700 mb-2">2. デジタルトランスフォーメーション(DX)推進</h5>
                    <p className="text-slate-600 text-sm">
                      デジタルトランスフォーメーション(DX)推進に関するシステムの企画、開発、販売、情報サービスの提供及び運用支援
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-semibold text-slate-700 mb-2">3. ソフトウェア開発・保守</h5>
                    <p className="text-slate-600 text-sm">
                      各種ソフトウェアの企画、開発、制作、販売及び保守に関する業務
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-semibold text-slate-700 mb-2">4. 人材育成・教育研修</h5>
                    <p className="text-slate-600 text-sm">
                      人材育成、教育、研修、セミナー及びコンテンツの企画、制作、運営並びにこれらに関するコンサルティング業務
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-semibold text-slate-700 mb-2">5. ライフスタイル改善・食育推進</h5>
                    <p className="text-slate-600 text-sm">
                      健康及び食生活を含むライフスタイル改善並びに食育の推進に関する商品の企画、開発、販売及び関連する教育、研修及びコンサルティング業務
                    </p>
                  </div>
                </div>
              </div>

              {/* 社名の由来 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-4">Lea Schritt 由来</h4>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Newテクノロジーを活用し、クライアントと共に歩みながら企業の成長は勿論、そこで働く方々の喜びの実現に貢献するという想いを込めて命名
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lea の意味 */}
                  <div className="bg-white/60 rounded-xl p-4">
                    <h5 className="text-xl font-bold text-slate-800 mb-3">Lea</h5>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-slate-600 text-sm">"喜び・楽しみ・幸福"</span>
                        <span className="text-xs text-slate-500 ml-2">(ハワイ語)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-slate-600 text-sm">"草原・牧草地"≒新領域・挑戦</span>
                        <span className="text-xs text-slate-500 ml-2">(英語)</span>
                      </div>
                    </div>
                  </div>

                  {/* Schritt の意味 */}
                  <div className="bg-white/60 rounded-xl p-4">
                    <h5 className="text-xl font-bold text-slate-800 mb-3">Schritt</h5>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-slate-600 text-sm">"歩み・ステップ・進展"</span>
                        <span className="text-xs text-slate-500 ml-2">(ドイツ語)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ミッション */}
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <h5 className="text-lg font-bold text-blue-800 mb-2">喜び実現への歩み</h5>
                  <p className="text-slate-700 leading-relaxed">
                    新たな風を吹き込み、共に歩みながら 企業の成長と挑戦する人の喜びを実現する
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consultants Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">コンサルタント</h3>
          
          {/* Consultant List */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              {/* 栗山領河 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedConsultant(selectedConsultant === 'kuriyama' ? null : 'kuriyama')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    栗山
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">栗山 領河</h4>
                  <p className="text-sm text-slate-600">代表・コンサルタント</p>
                  <div className="mt-3">
                    <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      戦略/データ/AI・ITの三刀流
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 2人目のコンサルタント */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg opacity-60 cursor-pointer hover:opacity-80 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    ?
                  </div>
                  <h4 className="text-lg font-bold text-slate-500 mb-2">Coming Soon</h4>
                </div>
              </motion.div>
            </div>

            {/* Selected Consultant Details */}
            {selectedConsultant === 'kuriyama' && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Profile Card */}
                  <div className="space-y-8">
                    {/* Profile Card */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">栗山 領河</h3>
                        <p className="text-slate-600 mb-2">Ryoga Kuriyama</p>
                        <p className="text-lg font-semibold text-purple-600 mb-4">代表・コンサルタント</p>
                        <div className="mb-6">
                          <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                            戦略/データ/AI・ITの三刀流
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          <p>アサヒビール・Accenture・Pragmatechesでの</p>
                          <p>経験を活かし、企業の成果創出を支援しています。</p>
                        </div>
                      </div>
                    </div>

                    {/* Experience Card */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">経歴</h3>
                      <div className="space-y-3">
                        {experience.map((exp, index) => (
                          <div key={index} className="border-l-4 border-purple-200 pl-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-purple-600">{exp.period}</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 text-sm">{exp.company}</h4>
                            {exp.role && <p className="text-slate-600 text-xs">{exp.role}</p>}
                            {exp.company === 'Accenture' ? (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">戦略・経営</span>
                                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">オペレーション</span>
                                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">AI・IT</span>
                                <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">データサイエンティスト</span>
                              </div>
                            ) : exp.company === 'Pragmateches' ? (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">戦略・経営</span>
                                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">AI・IT</span>
                                <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">データサイエンティスト</span>
                              </div>
                            ) : exp.company === 'アサヒビール株式会社' ? (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">法人営業</span>
                              </div>
                            ) : (
                              <p className="text-slate-600 text-xs mt-1">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Card */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">専門領域</h3>
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div key={index}>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm">{skill.category}</h4>
                            <div className="flex flex-wrap gap-2">
                              {skill.items.map((item, itemIndex) => (
                                <span
                                  key={itemIndex}
                                  className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Photo & Service Policy */}
                  <div className="space-y-8">
                    {/* Photo Space */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-300">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                            栗山
                          </div>
                          <p className="text-lg text-purple-600 font-medium">写真を追加予定</p>
                          <p className="text-sm text-purple-500 mt-2">プロフィール写真</p>
                        </div>
                      </div>
                    </div>

                    {/* Comment Card */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
                      <h3 className="text-xl font-bold mb-6">コメント</h3>
                      <div className="space-y-4 text-sm leading-relaxed">
                        <p>
                          私たちは データを武器に、経営・戦略・IT/AIの総合力で支援する伴走型コンサルティングです。
                        </p>
                        <p>
                          経営課題を整理するだけでなく、実際の改善・成果が出るまで一緒に取り組みます。
                        </p>
                        <p>
                          長崎・九州を中心とした企業の未来をともに築きます。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 mb-20"
        >
          <p className="text-slate-600 mb-6 text-lg max-w-3xl mx-auto">
            お気軽にお問合せください
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            相談する
          </button>
        </motion.div>
      </div>
    </section>
  )
}