import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import type { Blog } from '@/../product/sections/cms/types'

interface AddBlogModalProps {
  onSubmit?: (blogData: Partial<Blog>) => void
  onCancel?: () => void
}

const categories = ['Motor Vehicle Act', 'E-Challan', 'Legal Rights', 'Traffic Safety', 'Road Safety', 'Legal Tech']

export function AddBlogModal({ onSubmit, onCancel }: AddBlogModalProps) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    author: 'Team Lawyered',
    readMins: '',
    featuredOnChallanPay: false,
    altText: '',
    content: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({
      name: form.name,
      category: form.category,
      author: form.author,
      readMins: Number(form.readMins),
      featuredOnChallanPay: form.featuredOnChallanPay,
      altText: form.altText,
      content: form.content,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Add Blog</h2>
          <button
            onClick={onCancel}
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter blog title"
              required
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author name"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Read Mins & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Read Time (mins) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.readMins}
                onChange={(e) => setForm({ ...form, readMins: e.target.value })}
                placeholder="e.g. 7"
                min="1"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featuredOnChallanPay}
                  onChange={(e) => setForm({ ...form, featuredOnChallanPay: e.target.checked })}
                  className="w-4 h-4 text-cyan-600 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Featured on Challan Pay
                </span>
              </label>
            </div>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Blog Icon
            </label>
            <div className="flex items-center gap-3 px-3.5 py-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Click to upload or drag and drop an image
              </span>
            </div>
          </div>

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Alt Text
            </label>
            <input
              type="text"
              value={form.altText}
              onChange={(e) => setForm({ ...form, altText: e.target.value })}
              placeholder="Describe the image for accessibility"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write blog content here..."
              rows={5}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
