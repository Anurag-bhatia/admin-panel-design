import { useState, useRef } from 'react'
import { X, Upload, Download, AlertCircle, CheckCircle, Truck, Loader2, RefreshCw } from 'lucide-react'

interface VehicleAnalysisModalProps {
  onClose: () => void
}

interface VehicleAnalysisRow {
  vehicleNumber: string
  vehicleType: string
  registrationState: string
  ownerName: string
  ageYears: number
  pendingChallans: number
  totalChallanAmount: number
  insuranceStatus: 'Active' | 'Expired' | 'Expiring Soon'
  fitnessStatus: 'Valid' | 'Expired' | 'Expiring Soon'
  recommendation: string
}

type ModalStage = 'upload' | 'analyzing' | 'results'

const SAMPLE_RESULTS: VehicleAnalysisRow[] = [
  { vehicleNumber: 'KA01AB1234', vehicleType: 'HCV', registrationState: 'Karnataka', ownerName: 'ABC Logistics', ageYears: 4, pendingChallans: 3, totalChallanAmount: 12500, insuranceStatus: 'Active', fitnessStatus: 'Valid', recommendation: 'High priority — settle challans' },
  { vehicleNumber: 'MH12CD5678', vehicleType: 'LCV', registrationState: 'Maharashtra', ownerName: 'ABC Logistics', ageYears: 6, pendingChallans: 7, totalChallanAmount: 34200, insuranceStatus: 'Expiring Soon', fitnessStatus: 'Valid', recommendation: 'Insurance renewal + challan bundle' },
  { vehicleNumber: 'TN09EF9012', vehicleType: 'HCV', registrationState: 'Tamil Nadu', ownerName: 'ABC Logistics', ageYears: 2, pendingChallans: 1, totalChallanAmount: 1500, insuranceStatus: 'Active', fitnessStatus: 'Valid', recommendation: 'Low risk — monitor' },
  { vehicleNumber: 'DL08GH3456', vehicleType: 'LCV', registrationState: 'Delhi', ownerName: 'ABC Logistics', ageYears: 8, pendingChallans: 12, totalChallanAmount: 58900, insuranceStatus: 'Expired', fitnessStatus: 'Expired', recommendation: 'Critical — full compliance overhaul' },
  { vehicleNumber: 'GJ05IJ7890', vehicleType: 'HCV', registrationState: 'Gujarat', ownerName: 'ABC Logistics', ageYears: 3, pendingChallans: 2, totalChallanAmount: 4800, insuranceStatus: 'Active', fitnessStatus: 'Expiring Soon', recommendation: 'Fitness renewal due soon' },
  { vehicleNumber: 'RJ14KL2345', vehicleType: 'MCV', registrationState: 'Rajasthan', ownerName: 'ABC Logistics', ageYears: 5, pendingChallans: 5, totalChallanAmount: 18700, insuranceStatus: 'Active', fitnessStatus: 'Valid', recommendation: 'Bundle challans for discount' },
  { vehicleNumber: 'UP32MN6789', vehicleType: 'HCV', registrationState: 'Uttar Pradesh', ownerName: 'ABC Logistics', ageYears: 7, pendingChallans: 9, totalChallanAmount: 41200, insuranceStatus: 'Expiring Soon', fitnessStatus: 'Valid', recommendation: 'High priority — insurance + challans' },
  { vehicleNumber: 'HR26OP0123', vehicleType: 'LCV', registrationState: 'Haryana', ownerName: 'ABC Logistics', ageYears: 1, pendingChallans: 0, totalChallanAmount: 0, insuranceStatus: 'Active', fitnessStatus: 'Valid', recommendation: 'Compliant — no action needed' },
]

export function VehicleAnalysisModal({ onClose }: VehicleAnalysisModalProps) {
  const [stage, setStage] = useState<ModalStage>('upload')
  const [vehicleCount, setVehicleCount] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [results, setResults] = useState<VehicleAnalysisRow[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parsedVehicleCount = Number.parseInt(vehicleCount, 10)
  const canAnalyze = !!file && parsedVehicleCount > 0

  const validateFile = (selected: File): string[] => {
    const errs: string[] = []
    const lower = selected.name.toLowerCase()
    if (!lower.endsWith('.csv') && !lower.endsWith('.xlsx') && !lower.endsWith('.xls')) {
      errs.push('Only CSV, XLS, and XLSX files are supported')
    }
    if (selected.size > 5 * 1024 * 1024) {
      errs.push('File size must be less than 5MB')
    }
    return errs
  }

  const handleFileChange = (selected: File | null) => {
    if (!selected) return
    const errs = validateFile(selected)
    if (errs.length > 0) {
      setFile(null)
      setErrors(errs)
    } else {
      setFile(selected)
      setErrors([])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) handleFileChange(dropped)
  }

  const handleAnalyze = () => {
    if (!canAnalyze) return
    setStage('analyzing')
    setTimeout(() => {
      setResults(SAMPLE_RESULTS)
      setStage('results')
    }, 1800)
  }

  const handleReset = () => {
    setFile(null)
    setVehicleCount('')
    setErrors([])
    setResults([])
    setStage('upload')
  }

  const handleDownload = () => {
    const headers = ['Vehicle Number', 'Vehicle Type', 'Registration State', 'Owner', 'Age (Years)', 'Pending Challans', 'Total Challan Amount (INR)', 'Insurance Status', 'Fitness Status', 'Recommendation']
    const rows = results.map(r => [
      r.vehicleNumber,
      r.vehicleType,
      r.registrationState,
      r.ownerName,
      r.ageYears,
      r.pendingChallans,
      r.totalChallanAmount,
      r.insuranceStatus,
      r.fitnessStatus,
      `"${r.recommendation.replace(/"/g, '""')}"`,
    ].join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vehicle-analysis-report.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totals = results.reduce(
    (acc, r) => ({
      challans: acc.challans + r.pendingChallans,
      amount: acc.amount + r.totalChallanAmount,
    }),
    { challans: 0, amount: 0 },
  )

  const insuranceBadge = (status: VehicleAnalysisRow['insuranceStatus']) => {
    const map = {
      Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      Expired: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      'Expiring Soon': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    }
    return map[status]
  }

  const fitnessBadge = (status: VehicleAnalysisRow['fitnessStatus']) => {
    const map = {
      Valid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      Expired: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      'Expiring Soon': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    }
    return map[status]
  }

  const maxWidthClass = stage === 'results' ? 'max-w-5xl' : 'max-w-lg'

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[100] p-4">
      <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full ${maxWidthClass} max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Vehicle Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {stage === 'upload' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="vehicle-count" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5">
                  Number of Vehicles
                </label>
                <input
                  id="vehicle-count"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={vehicleCount}
                  onChange={e => setVehicleCount(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 42"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5">
                  Upload Sheet
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    isDragging
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={e => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  {!file ? (
                    <>
                      <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Drag and drop, or click to select
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        CSV or Excel (.xlsx, .xls) • Max 5MB
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-cyan-700 dark:text-cyan-300">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  )}
                </div>
              </div>

              {errors.length > 0 && (
                <div className="space-y-2">
                  {errors.map((err, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-300">{err}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Expected columns: Vehicle Number, Vehicle Type, Registration State, Owner Name. Additional columns are ignored.
              </p>
            </div>
          )}

          {stage === 'analyzing' && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-cyan-600 dark:text-cyan-400 animate-spin mb-4" />
              <p className="text-base font-medium text-slate-900 dark:text-slate-100">Analyzing fleet…</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Checking challans, insurance, and fitness for each vehicle</p>
            </div>
          )}

          {stage === 'results' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SummaryCard label="Vehicles analyzed" value={`${results.length}`} />
                <SummaryCard label="Pending challans" value={`${totals.challans}`} />
                <SummaryCard label="Total challan value" value={`₹${totals.amount.toLocaleString('en-IN')}`} />
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">Vehicle #</th>
                        <th className="text-left px-4 py-3 font-medium">Type</th>
                        <th className="text-left px-4 py-3 font-medium">State</th>
                        <th className="text-right px-4 py-3 font-medium">Age (yrs)</th>
                        <th className="text-right px-4 py-3 font-medium">Challans</th>
                        <th className="text-right px-4 py-3 font-medium">Amount</th>
                        <th className="text-left px-4 py-3 font-medium">Insurance</th>
                        <th className="text-left px-4 py-3 font-medium">Fitness</th>
                        <th className="text-left px-4 py-3 font-medium">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {results.map(row => (
                        <tr key={row.vehicleNumber} className="text-slate-900 dark:text-slate-50">
                          <td className="px-4 py-3 font-medium">{row.vehicleNumber}</td>
                          <td className="px-4 py-3">{row.vehicleType}</td>
                          <td className="px-4 py-3">{row.registrationState}</td>
                          <td className="px-4 py-3 text-right">{row.ageYears}</td>
                          <td className="px-4 py-3 text-right">{row.pendingChallans}</td>
                          <td className="px-4 py-3 text-right">₹{row.totalChallanAmount.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${insuranceBadge(row.insuranceStatus)}`}>
                              {row.insuranceStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${fitnessBadge(row.fitnessStatus)}`}>
                              {row.fitnessStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.recommendation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/50">
          {stage === 'results' ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Analyze Another
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {stage === 'results' ? 'Close' : 'Cancel'}
            </button>

            {stage === 'upload' && (
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Run Analysis
              </button>
            )}

            {stage === 'results' && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mt-1">{value}</p>
    </div>
  )
}
