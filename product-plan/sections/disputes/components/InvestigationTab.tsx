import { useState, useRef } from 'react'
import { Plus, X, MessageSquare, Paperclip, FileText, Trash2 } from 'lucide-react'
import type { InvestigationNote } from '../types'

interface InvestigationTabProps {
  notes: InvestigationNote[]
  onAddNote?: (content: string, attachments?: File[]) => void
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function InvestigationTab({ notes, onAddNote }: InvestigationTabProps) {
  const [showForm, setShowForm] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!noteContent.trim()) return

    onAddNote?.(noteContent.trim(), attachments.length > 0 ? attachments : undefined)
    setNoteContent('')
    setAttachments([])
    setShowForm(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)])
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notes
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Note
          </button>
        </div>

        {/* Add Note Form */}
        {showForm && (
          <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-slate-900 dark:text-white">
                Add Note
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Note <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Document your findings, reasoning, or decision..."
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              {/* Attachments */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                >
                  <Paperclip className="h-4 w-4" />
                  Add Attachment
                </button>

                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-slate-400 shrink-0">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notes List */}
        {sortedNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-900 dark:text-white font-medium mb-1">
              No notes yet
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Start documenting your findings and reasoning
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNotes.map((note, index) => (
              <div key={note.id} className="relative pl-8 pb-6 last:pb-0">
                {index < sortedNotes.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                )}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
                        {note.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {note.author}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(note.timestamp)} at {formatTime(note.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {note.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
