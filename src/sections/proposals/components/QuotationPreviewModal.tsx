import { X, Download, Pencil } from 'lucide-react'
import type { Proposal } from '@/../product/sections/proposals/types'
import { IssuerHeader } from '../../sales-crm/components/AddQuotationModal'

interface QuotationPreviewModalProps {
  proposal: Proposal
  onClose: () => void
  onModify?: () => void
  onDownload?: () => void
}

function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function QuotationPreviewModal({
  proposal,
  onClose,
  onModify,
  onDownload,
}: QuotationPreviewModalProps) {
  const quotationId = 'QTN-' + proposal.displayId.replace(/^REQ-/, '')
  const subtotal = proposal.amount
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Quotation Preview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {quotationId} &middot; Issued {formatDate(proposal.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onModify && (
              <button
                onClick={onModify}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Modify
              </button>
            )}
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
            <IssuerHeader />
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quotation for</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mt-1">
                    {proposal.customer.company}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {proposal.customer.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">From</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mt-1">
                    LOTS247
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Valid till {formatDate(proposal.updatedAt)}
                  </p>
                </div>
              </div>

              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="text-left text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2 font-medium">Item</th>
                    <th className="py-2 font-medium text-right">Qty</th>
                    <th className="py-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-50">
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3">{proposal.type} service ({proposal.description})</td>
                    <td className="py-3 text-right">{proposal.quantity}</td>
                    <td className="py-3 text-right">{formatINR(subtotal)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Discount (0%)</span>
                  <span>-₹0</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (18%)</span>
                  <span>{formatINR(gst)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-slate-50">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
