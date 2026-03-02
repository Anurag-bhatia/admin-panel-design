import { useState, useRef } from 'react'
import { X, Upload, Download, AlertCircle, CheckCircle } from 'lucide-react'

interface BulkUploadModalProps {
  onUpload: (file: File) => void
  onDownloadTemplate: () => void
  onClose: () => void
}

interface UploadState {
  file: File | null
  isDragging: boolean
  isUploading: boolean
  uploadComplete: boolean
  errors: string[]
}

const TEMPLATE_HEADERS = [
  'Source',
  'Type',
  'Sub Type',
  'LOTS For',
  'Number of Trucks',
  'Phone Number',
  'Country',
  'State',
  'City',
  'Company Alias',
  'Name',
  'Email ID',
  'Contact Person',
  'GST Number',
  'Area',
  'Address Lane',
  'Pin Code'
]

const SAMPLE_DATA = [
  ['Website', 'B2B', 'Fleet', 'GST Challan', '50', '+919876543210', 'India', 'Karnataka', 'Bangalore', 'ABC Logistics', 'ABC Logistics Pvt Ltd', 'contact@abclogistics.com', 'Rajesh Kumar', '29ABCDE1234F1Z5', 'Koramangala', '123 Main Street', '560095'],
  ['Referral', 'B2B', 'Individual', 'RTO Challan', '25', '+919876543211', 'India', 'Maharashtra', 'Mumbai', 'XYZ Transport', 'XYZ Transport Services', 'info@xyztransport.com', 'Priya Shah', '27XYZAB5678G2Y4', 'Andheri', '456 Park Road', '400053'],
  ['Cold Call', 'B2C', 'Individual', 'Traffic Challan', '10', '+919876543212', 'India', 'Tamil Nadu', 'Chennai', 'Quick Movers', 'Quick Movers & Packers', 'quickmovers@gmail.com', 'Suresh Reddy', '33QUICK9012H3X6', 'T Nagar', '789 Anna Salai', '600017']
]

export function BulkUploadModal({ onUpload, onDownloadTemplate, onClose }: BulkUploadModalProps) {
  const [state, setState] = useState<UploadState>({
    file: null,
    isDragging: false,
    isUploading: false,
    uploadComplete: false,
    errors: []
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateCSVTemplate = () => {
    const headers = TEMPLATE_HEADERS.join(',')
    const rows = SAMPLE_DATA.map(row => row.join(','))
    const csv = [headers, ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads_bulk_upload_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)

    // Also call the prop function
    onDownloadTemplate()
  }

  const validateFile = (file: File): string[] => {
    const errors: string[] = []

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      errors.push('❌ Only CSV, XLS, and XLSX files are supported')
    }

    if (file.size > 5 * 1024 * 1024) {
      errors.push('❌ File size must be less than 5MB')
    }

    return errors
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return

    const errors = validateFile(file)

    if (errors.length > 0) {
      setState(prev => ({
        ...prev,
        file: null,
        errors
      }))
    } else {
      setState(prev => ({
        ...prev,
        file,
        errors: [],
        uploadComplete: false
      }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setState(prev => ({ ...prev, isDragging: true }))
  }

  const handleDragLeave = () => {
    setState(prev => ({ ...prev, isDragging: false }))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setState(prev => ({ ...prev, isDragging: false }))

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleSubmit = () => {
    if (!state.file) return

    setState(prev => ({ ...prev, isUploading: true }))

    // Simulate upload delay
    setTimeout(() => {
      setState(prev => ({ ...prev, isUploading: false, uploadComplete: true }))
      onUpload(state.file!)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Bulk Upload Leads</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Upload multiple leads at once using CSV or Excel format
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Download Template */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-bold">
                1
              </span>
              Download Template
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Start with our pre-formatted template to ensure all required fields are included correctly.
            </p>
            <button
              onClick={generateCSVTemplate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>

          {/* Step 2: Upload File */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-bold">
                2
              </span>
              Upload Your File
            </h3>

            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                state.isDragging
                  ? 'border-cyan-500 dark:border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                  : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={e => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
              />

              {!state.file && !state.uploadComplete && (
                <>
                  <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                  <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Drag and drop your file, or click to select
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    CSV or Excel (.xlsx, .xls) format • Max 5MB • Up to 1000 records per upload
                  </p>
                </>
              )}

              {state.file && !state.uploadComplete && (
                <div className="flex items-center justify-center gap-2 text-cyan-700 dark:text-cyan-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{state.file.name}</span>
                </div>
              )}
            </div>

            {/* Error Messages */}
            {state.errors.length > 0 && (
              <div className="mt-4 space-y-2">
                {state.errors.map((error, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                ))}
              </div>
            )}

            {/* File Info */}
            {state.file && !state.uploadComplete && state.errors.length === 0 && (
              <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <p className="text-sm text-cyan-900 dark:text-cyan-100">
                  <span className="font-semibold">✓ File ready:</span> {state.file.name} ({(state.file.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}
          </div>

          {/* Step 3: Review & Confirm */}
          {state.file && !state.uploadComplete && state.errors.length === 0 && (
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-bold">
                  3
                </span>
                Review & Confirm
              </h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  The system will validate your file and show any errors before processing. Required fields: Source, Type, Sub Type, LOTS For, Number of Trucks, Phone Number, Country, State, City, Company Alias, Name, Email ID, Contact Person, GST Number.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={state.isUploading}
                  className="w-full px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {state.isUploading ? 'Uploading...' : 'Upload & Process'}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {state.uploadComplete && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Upload Successful!</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                Your leads are being processed. You'll see them in the list shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex gap-3 justify-end bg-slate-50 dark:bg-slate-700/50">
          {!state.uploadComplete && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          )}
          {state.uploadComplete && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
