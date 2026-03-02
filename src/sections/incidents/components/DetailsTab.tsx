import { useState } from 'react'
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  X,
  MapPin,
  Car,
  FileCheck,
  Building,
} from 'lucide-react'
import type {
  Incident,
  Subscriber,
  Document,
  DocumentType,
} from '@/../product/sections/incidents/types'

interface DetailsTabProps {
  incident: Incident
  subscriber: Subscriber
  documents: Document[]
  onUploadDocument?: (file: File, type: DocumentType) => void
  onViewDocument?: (documentId: string) => void
  onDeleteDocument?: (documentId: string) => void
}

const TYPE_LABELS: Record<string, string> = {
  payAndClose: 'PPT',
  contest: 'Bulk',
}

const CHALLAN_TYPE_LABELS: Record<string, string> = {
  court: 'Court',
  online: 'Online',
}

const STATUS_LABELS: Record<string, string> = {
  pending_screening: 'Pending Screening',
  screening_in_progress: 'Screening',
  lawyer_working: 'Lawyer Working',
  court_hearing_scheduled: 'Court Scheduled',
  resolved: 'Resolved',
  unresolved: 'Unresolved',
  refund_initiated: 'Refund Initiated',
}

const DOCUMENT_TYPE_OPTIONS: { value: DocumentType; label: string }[] = [
  { value: 'challan', label: 'Challan' },
  { value: 'vehicle_document', label: 'Vehicle Document' },
  { value: 'court_document', label: 'Court Document' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'other', label: 'Other' },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const DOCUMENT_TYPE_ICONS: Record<DocumentType, React.ComponentType<{ className?: string }>> = {
  challan: FileText,
  vehicle_document: Car,
  court_document: Building,
  receipt: FileCheck,
  other: FileText,
}

export function DetailsTab({
  incident,
  subscriber,
  documents,
  onUploadDocument,
  onViewDocument,
  onDeleteDocument,
}: DetailsTabProps) {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<DocumentType>('challan')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile && onUploadDocument) {
      onUploadDocument(selectedFile, documentType)
      setSelectedFile(null)
      setDocumentType('challan')
      setShowUploadForm(false)
    }
  }

  const sortedDocuments = [...documents].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Challan Information */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Challan Information
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Incident ID
                </label>
                <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                  {incident.incidentId}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Challan Number
                </label>
                <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                  {incident.challanNumber}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Vehicle Number
                </label>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                    {incident.vehicle}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  State
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <p className="text-sm text-slate-900 dark:text-white">{incident.state}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Type
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {TYPE_LABELS[incident.type]}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Challan
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {CHALLAN_TYPE_LABELS[incident.challanType]}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Offence
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {incident.offence || 'Not screened yet'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Fine Amount
                </label>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(incident.amount)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Source
                </label>
                <p className="text-sm text-slate-900 dark:text-white">{incident.source}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Created At
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {formatDateTime(incident.createdAt)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Last Updated
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {formatDateTime(incident.lastUpdatedAt)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  TAT Deadline
                </label>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {formatDate(incident.tatDeadline)}
                </p>
              </div>
            </div>

            {incident.resolutionNotes && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Resolution Notes
                </label>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {incident.resolutionNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Subscriber Information */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Subscriber Details
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Subscriber Name
                </label>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {subscriber.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {subscriber.companyAlias}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Subscriber ID
                </label>
                <p className="text-sm font-mono text-slate-900 dark:text-white">
                  {subscriber.id}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Contact Person
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {subscriber.contactPerson}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Phone
                </label>
                <p className="text-sm text-slate-900 dark:text-white">{subscriber.phone}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Email
                </label>
                <p className="text-sm text-slate-900 dark:text-white">{subscriber.email}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Total Vehicles
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {subscriber.totalVehicles}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Documents</h2>
            <button
              onClick={() => setShowUploadForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Upload New Document
                </h3>
                <button
                  onClick={() => {
                    setShowUploadForm(false)
                    setSelectedFile(null)
                  }}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  >
                    {DOCUMENT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 dark:file:bg-cyan-900/20 dark:file:text-cyan-400 dark:hover:file:bg-cyan-900/30"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowUploadForm(false)
                      setSelectedFile(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Documents List */}
          {sortedDocuments.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-900 dark:text-white font-medium mb-1">
                No documents uploaded
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Upload challan receipts, court documents, or other files
              </p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload First Document
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedDocuments.map((doc) => {
                const Icon = DOCUMENT_TYPE_ICONS[doc.type]
                return (
                  <div
                    key={doc.id}
                    className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {DOCUMENT_TYPE_OPTIONS.find((t) => t.value === doc.type)?.label} •{' '}
                            {formatFileSize(doc.size)} • {formatDateTime(doc.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <button
                          onClick={() => onViewDocument?.(doc.id)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="View document"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onViewDocument?.(doc.id)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Download document"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteDocument?.(doc.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
