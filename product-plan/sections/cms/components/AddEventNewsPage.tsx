import { useState } from 'react'
import { ArrowLeft, Upload, Check } from 'lucide-react'
import type { EventNews } from '../types'
import { RichTextEditor } from './RichTextEditor'

interface AddEventNewsPageProps {
  onSubmit?: (data: Partial<EventNews>) => void
  onCancel?: () => void
}

const categories = ['News', 'Event']

const steps = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'Content & Media' },
]

export function AddEventNewsPage({ onSubmit, onCancel }: AddEventNewsPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    category: '',
    author: 'Team Lawyered',
    readMins: '',
    altText: '',
    content: '',
  })

  const canProceed =
    form.name.trim() !== '' &&
    form.category !== '' &&
    form.author.trim() !== '' &&
    form.readMins !== ''

  const handleSubmit = () => {
    onSubmit?.({
      name: form.name,
      category: form.category,
      author: form.author,
      readMins: Number(form.readMins),
      altText: form.altText,
      content: form.content,
      status: 'enabled',
    })
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5">
        <div className="flex items-center gap-4 max-w-4xl">
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Add Event and News</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Stepper */}
        <div className="flex items-start justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id)
                    if (step.id === 2 && canProceed) setCurrentStep(2)
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step.id === currentStep
                      ? 'bg-cyan-500 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40'
                      : step.id < currentStep
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                </button>
                <span
                  className={`mt-2 text-xs font-medium ${
                    step.id === currentStep
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : step.id < currentStep
                        ? 'text-cyan-600 dark:text-cyan-400'
                        : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex items-center mt-5 mx-3">
                  <div
                    className={`w-32 h-0.5 ${
                      step.id < currentStep
                        ? 'bg-cyan-400'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 lg:p-10">
          {currentStep === 1 && (
            <div className="space-y-7">
              {/* Title - full width */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter title"
                  className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Read Mins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Read Time (mins) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.readMins}
                    onChange={(e) => setForm({ ...form, readMins: e.target.value })}
                    placeholder="e.g. 2"
                    min="1"
                    className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Icon Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Icon Image
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 text-center hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      PNG, JPG or WebP (max 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={form.altText}
                  onChange={(e) => setForm({ ...form, altText: e.target.value })}
                  placeholder="Describe the image for accessibility"
                  className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Content
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
                placeholder="Write content here..."
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => {
              if (currentStep === 1) onCancel?.()
              else setCurrentStep(1)
            }}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          {currentStep === 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!canProceed}
              className="px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors"
            >
              Add Event / News
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
