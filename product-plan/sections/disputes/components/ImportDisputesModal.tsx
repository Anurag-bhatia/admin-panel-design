import { useState } from 'react'
import { X, Upload, FileSpreadsheet, AlertCircle, Download } from 'lucide-react'

interface ImportDisputesModalProps {
  onImport?: (file: File) => void
  onClose: () => void
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function ImportDisputesModal({ onImport, onClose }: ImportDisputesModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
      ]
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file)
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
      ]
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file)
      }
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      onImport?.(selectedFile)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Import Disputes
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Upload a file to create multiple disputes at once
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-amber-900 dark:text-amber-300 font-medium mb-2">
                  Before importing:
                </p>
                <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1 list-disc list-inside">
                  <li>Every dispute must be linked to a valid Incident ID, Subscriber, or Payment reference</li>
                  <li>Duplicate dispute IDs will be skipped</li>
                  <li>All imported disputes will be created with "Open" status</li>
                  <li>Review the preview before confirming the import</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Template Download */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Step 1: Download Import Template
            </label>
            <button
              onClick={() => console.log('Download import template')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Import Template
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Use the template to ensure all required fields are included
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Step 2: Upload Completed File
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
              }`}
            >
              <input
                type="file"
                id="import-file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>

                {selectedFile ? (
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatFileSize(selectedFile.size)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFile(null)
                      }}
                      className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline pointer-events-auto"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Drop your file here, or{' '}
                      <label
                        htmlFor="import-file"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer pointer-events-auto"
                      >
                        browse
                      </label>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Supports Excel (.xlsx, .xls) and CSV files
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Maximum file size: 10 MB
            </p>
          </div>

          {/* Required Fields */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Required fields:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              <div>• Linked Entity ID <span className="text-red-500">*</span></div>
              <div>• Linked Entity Type <span className="text-red-500">*</span></div>
              <div>• Dispute Type <span className="text-red-500">*</span></div>
              <div>• Raised By <span className="text-red-500">*</span></div>
              <div>• Priority <span className="text-red-500">*</span></div>
              <div>• Reason <span className="text-red-500">*</span></div>
              <div>• Description</div>
              <div>• Disputed Amount</div>
              <div>• SLA Days</div>
              <div>• Source</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!selectedFile}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            Import Disputes
          </button>
        </div>
      </div>
    </div>
  )
}
