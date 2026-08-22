import { useState, useRef } from 'react'
import { X, Upload, Download, AlertCircle, CheckCircle, Loader2, RefreshCw, Wallet, MapPin, IndianRupee } from 'lucide-react'

interface VehicleAnalysisModalProps {
  onClose: () => void
}

type ModalStage = 'upload' | 'analyzing' | 'results'

interface StatusRow { label: string; vehicles: number; challans: number; amount: number }
interface StateRow { state: string; vehicles: number; challans: number; amount: number }
interface AmountRow { range: string; vehicles: number; challans: number; amount: number }

const OVERALL_STATUS: StatusRow[] = [
  { label: 'Pending', vehicles: 6, challans: 317, amount: 512100 },
  { label: 'Disposed', vehicles: 5, challans: 10, amount: 7500 },
]

const STATE_PENDING_ONLINE: StateRow[] = [
  { state: 'Delhi', vehicles: 6, challans: 55, amount: 105000 },
  { state: 'Rajasthan', vehicles: 3, challans: 12, amount: 20200 },
  { state: 'Uttarakhand', vehicles: 2, challans: 4, amount: 10000 },
  { state: 'Uttar Pradesh', vehicles: 1, challans: 1, amount: 2000 },
]

const STATE_PENDING_COURT: StateRow[] = [
  { state: 'Delhi', vehicles: 5, challans: 15, amount: 85000 },
  { state: 'Haryana', vehicles: 4, challans: 9, amount: 33000 },
  { state: 'Maharashtra', vehicles: 3, challans: 7, amount: 42000 },
  { state: 'Karnataka', vehicles: 2, challans: 4, amount: 18000 },
]

const AMOUNT_PENDING_ONLINE: AmountRow[] = [
  { range: '0 – 999', vehicles: 2, challans: 6, amount: 1700 },
  { range: '1000 – 1999', vehicles: 3, challans: 7, amount: 7500 },
  { range: '2000 – 2999', vehicles: 6, challans: 53, amount: 106000 },
  { range: '3000 – 3999', vehicles: 1, challans: 5, amount: 15000 },
  { range: '7000 – 7999', vehicles: 1, challans: 1, amount: 7000 },
]

const AMOUNT_PENDING_COURT: AmountRow[] = [
  { range: '0 – 999', vehicles: 4, challans: 14, amount: 6600 },
  { range: '1000 – 1999', vehicles: 5, challans: 10, amount: 12000 },
  { range: '2000 – 2999', vehicles: 5, challans: 12, amount: 24000 },
  { range: '5000 – 5999', vehicles: 3, challans: 3, amount: 15000 },
  { range: '6000 – 6999', vehicles: 1, challans: 1, amount: 6000 },
  { range: '10000 – 10999', vehicles: 1, challans: 1, amount: 10000 },
  { range: '20000 – 29999', vehicles: 3, challans: 3, amount: 60000 },
]

const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

const sumRow = <T extends { vehicles: number; challans: number; amount: number }>(rows: T[]) =>
  rows.reduce(
    (acc, r) => ({ vehicles: Math.max(acc.vehicles, r.vehicles), challans: acc.challans + r.challans, amount: acc.amount + r.amount }),
    { vehicles: 0, challans: 0, amount: 0 },
  )

export function VehicleAnalysisModal({ onClose }: VehicleAnalysisModalProps) {
  const [stage, setStage] = useState<ModalStage>('upload')
  const [vehicleCount, setVehicleCount] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
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
    setTimeout(() => setStage('results'), 1800)
  }

  const handleReset = () => {
    setFile(null)
    setVehicleCount('')
    setErrors([])
    setStage('upload')
  }

  const handleDownload = () => {
    const lines: string[] = []
    const push = (parts: (string | number)[]) => lines.push(parts.map(p => (typeof p === 'string' && p.includes(',') ? `"${p}"` : String(p))).join(','))

    push(['Overall Challan Status'])
    push(['Challan Status', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'])
    OVERALL_STATUS.forEach(r => push([r.label, r.vehicles, r.challans, r.amount]))
    const overallTotal = sumRow(OVERALL_STATUS)
    push(['Grand Total', overallTotal.vehicles, overallTotal.challans, overallTotal.amount])
    push([])

    push(['State Wise Challan - Pending Online'])
    push(['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'])
    STATE_PENDING_ONLINE.forEach(r => push([r.state, r.vehicles, r.challans, r.amount]))
    const stateOnlineTotal = sumRow(STATE_PENDING_ONLINE)
    push(['Grand Total', stateOnlineTotal.vehicles, stateOnlineTotal.challans, stateOnlineTotal.amount])
    push([])

    push(['State Wise Challan - Pending in Court'])
    push(['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'])
    STATE_PENDING_COURT.forEach(r => push([r.state, r.vehicles, r.challans, r.amount]))
    const stateCourtTotal = sumRow(STATE_PENDING_COURT)
    push(['Grand Total', stateCourtTotal.vehicles, stateCourtTotal.challans, stateCourtTotal.amount])
    push([])

    push(['Amount Range - Pending Online'])
    push(['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'])
    AMOUNT_PENDING_ONLINE.forEach(r => push([r.range, r.vehicles, r.challans, r.amount]))
    const amountOnlineTotal = sumRow(AMOUNT_PENDING_ONLINE)
    push(['Grand Total', amountOnlineTotal.vehicles, amountOnlineTotal.challans, amountOnlineTotal.amount])
    push([])

    push(['Amount Range - Pending in Court'])
    push(['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'])
    AMOUNT_PENDING_COURT.forEach(r => push([r.range, r.vehicles, r.challans, r.amount]))
    const amountCourtTotal = sumRow(AMOUNT_PENDING_COURT)
    push(['Grand Total', amountCourtTotal.vehicles, amountCourtTotal.challans, amountCourtTotal.amount])

    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vehicle-analysis-report.csv'
    a.click()
    window.URL.revokeObjectURL(url)
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
            <div className="space-y-8">
              {/* Overall Challan Status */}
              <section>
                <SectionHeading icon={<Wallet className="w-4 h-4" />} title="Overall Challan Status" />
                <ReportTable
                  columns={['Challan Status', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']}
                  rows={OVERALL_STATUS.map(r => [r.label, r.vehicles, r.challans, formatINR(r.amount)])}
                  grandTotal={(() => {
                    const t = sumRow(OVERALL_STATUS)
                    return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)]
                  })()}
                />
              </section>

              {/* State Wise Challan */}
              <section>
                <SectionHeading icon={<MapPin className="w-4 h-4" />} title="State Wise Challan" />
                <div className="space-y-4">
                  <SubReport
                    label="PENDING ONLINE"
                    columns={['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']}
                    rows={STATE_PENDING_ONLINE.map(r => [r.state, r.vehicles, r.challans, formatINR(r.amount)])}
                    grandTotal={(() => {
                      const t = sumRow(STATE_PENDING_ONLINE)
                      return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)]
                    })()}
                  />
                  <SubReport
                    label="PENDING IN COURT"
                    columns={['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']}
                    rows={STATE_PENDING_COURT.map(r => [r.state, r.vehicles, r.challans, formatINR(r.amount)])}
                    grandTotal={(() => {
                      const t = sumRow(STATE_PENDING_COURT)
                      return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)]
                    })()}
                  />
                </div>
              </section>

              {/* Amount Range */}
              <section>
                <SectionHeading icon={<IndianRupee className="w-4 h-4" />} title="Amount Range" />
                <div className="space-y-4">
                  <SubReport
                    label="PENDING ONLINE"
                    columns={['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']}
                    rows={AMOUNT_PENDING_ONLINE.map(r => [r.range, r.vehicles, r.challans, formatINR(r.amount)])}
                    grandTotal={(() => {
                      const t = sumRow(AMOUNT_PENDING_ONLINE)
                      return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)]
                    })()}
                  />
                  <SubReport
                    label="PENDING IN COURT"
                    columns={['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']}
                    rows={AMOUNT_PENDING_COURT.map(r => [r.range, r.vehicles, r.challans, formatINR(r.amount)])}
                    grandTotal={(() => {
                      const t = sumRow(AMOUNT_PENDING_COURT)
                      return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)]
                    })()}
                  />
                </div>
              </section>
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

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-emerald-700 dark:text-emerald-400">{title}</h3>
    </div>
  )
}

type Cell = string | number
type Row = Cell[]

function ReportTable({ columns, rows, grandTotal }: { columns: string[]; rows: Row[]; grandTotal: Row }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
              {columns.map((c, i) => (
                <th key={c} className={`px-4 py-3 font-medium ${i === 0 ? 'text-left' : i === columns.length - 1 ? 'text-right' : 'text-center'}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {rows.map((row, ri) => (
              <tr key={ri} className="text-slate-900 dark:text-slate-50">
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'text-left' : ci === row.length - 1 ? 'text-right' : 'text-center'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-50 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-50">
              {grandTotal.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'text-left' : ci === grandTotal.length - 1 ? 'text-right' : 'text-center'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SubReport({ label, columns, rows, grandTotal }: { label: string; columns: string[]; rows: Row[]; grandTotal: Row }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="bg-emerald-50/70 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900/50 py-2 text-center">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">{label}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400">
              {columns.map((c, i) => (
                <th key={c} className={`px-4 py-3 font-medium ${i === 0 ? 'text-left' : i === columns.length - 1 ? 'text-right' : 'text-center'}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {rows.map((row, ri) => (
              <tr key={ri} className="text-slate-900 dark:text-slate-50">
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'text-left' : ci === row.length - 1 ? 'text-right' : 'text-center'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-50 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-50">
              {grandTotal.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'text-left' : ci === grandTotal.length - 1 ? 'text-right' : 'text-center'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
