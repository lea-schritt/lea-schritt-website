'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FormData {
  name: string
  company: string
  position: string
  email: string
  consultationType: string
  message: string
  contactMethod: string
  background: string
  startTiming: string
  budget: string
  companySize: string
  preferredDate1: string
  preferredDate2: string
}

interface FormErrors {
  name?: string
  company?: string
  email?: string
  consultationType?: string
  message?: string
  background?: string
}

const consultationTypes = [
  'DX支援（AI・IT）',
  'データ利活用',
  '業務効率化',
  '営業戦略',
  'その他'
]

const contactMethods = [
  'メール',
  'オンライン会議',
  '電話',
  '対面（九州圏内）'
]

const startTimingOptions = [
  'できるだけ早く',
  '3か月以内',
  '半年以内',
  '未定'
]

const budgetOptions = [
  '30万円未満',
  '30〜50万円',
  '50〜100万円',
  '100〜200万円',
  '200〜300万円',
  '300万円以上'
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    position: '',
    email: '',
    consultationType: '',
    message: '',
    contactMethod: 'メール',
    background: '',
    startTiming: '',
    budget: '',
    companySize: '',
    preferredDate1: '',
    preferredDate2: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '氏名は必須項目です'
    }

    if (!formData.company.trim()) {
      newErrors.company = '会社名は必須項目です'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須項目です'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    if (!formData.consultationType) {
      newErrors.consultationType = 'ご相談内容を選択してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = '詳細なご相談内容を入力してください'
    }

    if (!formData.background.trim()) {
      newErrors.background = 'ご相談の背景・課題感を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          position: formData.position,
          email: formData.email,
          consultationType: formData.consultationType,
          contactMethod: formData.contactMethod,
          details: formData.message,
          background: formData.background,
          startTiming: formData.startTiming,
          budget: formData.budget,
          companySize: formData.companySize,
          preferredDate1: formData.preferredDate1,
          preferredDate2: formData.preferredDate2,
        }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        // フォームリセット
        setFormData({
          name: '',
          company: '',
          position: '',
          email: '',
          consultationType: '',
          message: '',
          contactMethod: 'メール',
          background: '',
          startTiming: '',
          budget: '',
          companySize: '',
          preferredDate1: '',
          preferredDate2: ''
        })
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            お問い合わせありがとうございます
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            3営業日以内にご連絡いたします。
            <br />
            初回は30分の無料相談で、課題の整理から始めさせていただきます。
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: '',
                company: '',
                position: '',
                email: '',
                consultationType: '',
                message: '',
                contactMethod: 'メール',
                background: '',
                startTiming: '',
                budget: '',
                companySize: '',
                preferredDate1: '',
                preferredDate2: ''
              })
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            新しいお問い合わせ
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="h-screen bg-gradient-to-br from-pink-50 to-rose-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 w-full pt-20">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-2">
            まずは課題の言語化から。30分の無料相談
          </p>
          <p className="text-slate-500">
            目的・現状・制約（人/期間/予算）をうかがい、初回は打ち手の方向性まで提示します。
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl"
        >
          <form 
            onSubmit={handleSubmit} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target !== e.currentTarget.querySelector('button[type="submit"]')) {
                e.preventDefault()
              }
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  氏名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-200 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="山田太郎"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                  会社名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.company
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-200 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="株式会社○○"
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-slate-700 mb-2">
                  役職
                </label>
                <input
                  type="text"
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="部長"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-200 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="example@company.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ご相談内容 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {consultationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('consultationType', type)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      formData.consultationType === type
                        ? 'bg-pink-500 text-white border-pink-500 shadow-lg'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.consultationType && <p className="mt-1 text-sm text-red-600">{errors.consultationType}</p>}
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                希望連絡方法
              </label>
              <div className="flex flex-wrap gap-3">
                {contactMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleChange('contactMethod', method)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${
                      formData.contactMethod === method
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <label htmlFor="background" className="block text-sm font-semibold text-slate-700 mb-2">
                ご相談の背景・課題感 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="background"
                rows={4}
                value={formData.background}
                onChange={(e) => handleChange('background', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                  errors.background
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-200 focus:ring-pink-500 focus:border-pink-500'
                }`}
                placeholder="現在のお困りごとや課題について簡単にご記入ください"
              />
              {errors.background && <p className="mt-1 text-sm text-red-600">{errors.background}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Timing */}
              <div>
                <label htmlFor="startTiming" className="block text-sm font-semibold text-slate-700 mb-2">
                  ご希望の開始時期
                </label>
                <select
                  id="startTiming"
                  value={formData.startTiming}
                  onChange={(e) => handleChange('startTiming', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                >
                  <option value="">選択してください</option>
                  {startTimingOptions.map((timing) => (
                    <option key={timing} value={timing}>
                      {timing}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-2">
                  ご予算感
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                >
                  <option value="">選択してください</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="companySize" className="block text-sm font-semibold text-slate-700 mb-2">
                従業員数 / 売上規模
              </label>
              <input
                type="text"
                id="companySize"
                value={formData.companySize}
                onChange={(e) => handleChange('companySize', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                placeholder="例：従業員数50名、売上10億円"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Date 1 */}
              <div>
                <label htmlFor="preferredDate1" className="block text-sm font-semibold text-slate-700 mb-2">
                  希望日程（第1希望）
                </label>
                <input
                  type="text"
                  id="preferredDate1"
                  value={formData.preferredDate1}
                  onChange={(e) => handleChange('preferredDate1', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="例：12月15日 14:00-15:00"
                />
              </div>

              {/* Preferred Date 2 */}
              <div>
                <label htmlFor="preferredDate2" className="block text-sm font-semibold text-slate-700 mb-2">
                  希望日程（第2希望）
                </label>
                <input
                  type="text"
                  id="preferredDate2"
                  value={formData.preferredDate2}
                  onChange={(e) => handleChange('preferredDate2', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="例：12月16日 10:00-11:00"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                詳細なご相談内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                  errors.message
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-200 focus:ring-pink-500 focus:border-pink-500'
                }`}
                placeholder="現在の課題や目標、期待する成果などをお聞かせください..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>送信中...</span>
                  </div>
                ) : (
                  '無料相談を申し込む'
                )}
              </button>
              <p className="text-sm text-slate-500 mt-4">
                送信いただいた情報は、プライバシーポリシーに従って適切に管理いたします。
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}