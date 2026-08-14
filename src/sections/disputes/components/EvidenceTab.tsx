import { useState, useRef } from 'react'
import {
  FileText,
  Upload,
  Download,
  Eye,
  X,
  FileCheck,
  Image,
  File,
} from 'lucide-react'
import type { Evidence } from '@/../product/sections/disputes/types'

type DisputeDocumentType = 'evidence' | 'correspondence' | 'receipt' | 'screenshot' | 'other'

interface EvidenceTabProps {
  evidence: Evidence[]
  onUploadEvidence?: (file: File, type: DisputeDocumentType) => void
  onViewDocument?: (documentId: string) => void
  onDeleteDocument?: (documentId: string) => void
}

const DOCUMENT_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  evidence: FileText,
  correspondence: FileText,
  receipt: FileCheck,
  screenshot: Image,
  other: File,
  pdf: FileText,
  image: Image,
}

function getDocIcon(type: string): React.ComponentType<{ className?: string }> {
  const lower = type.toLowerCase()
  for (const [key, icon] of Object.entries(DOCUMENT_TYPE_ICONS)) {
    if (lower.includes(key)) return icon
  }
  return FileText
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatFileSize(size: string | number): string {
  if (typeof size === 'string') return size
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
  return (size / (1024 * 1024)).toFixed(1) + ' MB'
}

export function EvidenceTab({ evidence, onUploadEvidence, onViewDocument }: EvidenceTabProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentName, setDocumentName] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleUpload = () => {
    if (selectedFile && onUploadEvidence) {
      onUploadEvidence(selectedFile, 'other')
      closeModal()
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedFile(null)
    setDocumentName('')
    setDocumentType('')
    setIsDragging(false)
  }

  const sortedEvidence = [...evidence].sort(
    (a, b) => new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime()
  )

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Documents</h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </button>
        </div>

        {/* Documents List */}
        {sortedEvidence.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-900 dark:text-white font-medium mb-1">
              No documents uploaded
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Upload evidence, receipts, correspondence, or other files
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload First Document
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvidence.map((item) => {
              const Icon = getDocIcon(item.type)
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {item.fileName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatFileSize(item.fileSize)} • {formatDateTime(item.uploadedOn)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <button
                        onClick={() => onViewDocument?.(item.id)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="View document"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onViewDocument?.(item.id)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Download document"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Upload Document
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 -mr-1.5 -mt-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Document Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Document Name
                  </label>
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="e.g. Aadhaar Card – Front & Back"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                {/* Document Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-900 dark:text-white"
                  >
                    <option value="">Select document type</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Company">Company</option>
                    <option value="Driver">Driver</option>
                  </select>
                </div>

                {/* File Drop Zone */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    File
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/10'
                        : selectedFile
                        ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />

                    {selectedFile ? (
                      <div>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {formatFileSize(selectedFile.size)}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedFile(null)
                          }}
                          className="mt-2 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                          <Upload className="h-5 w-5 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Drop file here or{' '}
                          <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                            browse
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
