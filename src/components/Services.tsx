'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'データドリブン経営支援',
    description: 'データを「見える化」し、経営判断を勘や経験に頼らず科学的に。BIダッシュボード構築から、機械学習モデルによる売上・需要・顧客動向の予測までを一気通貫で支援します。単なるデータ分析・可視化にとどまらず、経営や現場の"ネクストアクション"につながる示唆を引き出し、効果創出に直結させます。',
    result: '数字に強い経営を実現し、成長の一手を導きます。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: ['BIダッシュボード', '機械学習モデル', '売上予測', '顧客動向分析']
  },
  {
    title: '経営・営業戦略支援',
    description: '限られた人員・資金を最大限に活かす経営計画の策定から、顧客ターゲティング、KPI設計、営業プロセス改善までを一気通貫で支援。戦略を立てて終わりではなく、現場に入り込み、ボトルネックを特定し、成果につながる実行まで伴走します。',
    result: '経営戦略と現場をつなぎ、着実に売上と利益を伸ばす改革を推進します。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    features: ['経営計画策定', '顧客ターゲティング', 'KPI設計', '営業プロセス改善']
  },
  {
    title: 'DX推進・業務効率化・自動化',
    description: '現場の業務を徹底的に棚卸しし、ムダを削ぎ落とします。RPAやAIを駆使して、単純業務のゼロ化を実現し、限られた人員でも利益を生み出す"強い経営体質"へ転換。机上のマニュアルづくりで終わることなく、現場に入り込み、一次情報から課題を発見。削減できた時間や工数を数字で見える化し、成果を実感できる形で定着させます。',
    result: '少人数でも成果を出し続ける、生産性の高い"攻めの組織"へ。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: ['業務棚卸し', 'RPA・AI活用', 'ムダ削減', '生産性向上']
  },
  {
    title: '新規事業立ち上げ支援',
    description: '市場・競合調査、ビジネスモデル構築、価値提案のコンセプト検証などの「事業機会の見極め」から、必要なシステムやツールの選定、日々の運用を支えるオペレーション設計、外部パートナーの選定や連携体制の構築までを一気通貫で伴走します。早い段階からKPIを設計し、検証→改善→再実行のPDCAサイクルを確立することで、実行力を備えた新規事業へ育てます。',
    result: '地域から持続的に新しい収益の柱を生み出す力に。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ['市場調査', 'ビジネスモデル構築', 'KPI設計', 'PDCAサイクル']
  }
]

export default function Services() {
  return (
    <section className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 pt-20">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              サービス
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            戦略から実装まで、一気通貫でサポート
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                    <p className="text-blue-800 font-semibold text-sm">
                      → {service.result}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-slate-600 mb-6 text-lg">
            あなたのビジネス課題に最適なソリューションをご提案します
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            サービス詳細を相談する
          </button>
        </motion.div>
      </div>
    </section>
  )
}