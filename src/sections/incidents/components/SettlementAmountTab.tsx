import { IndianRupee } from 'lucide-react'

interface SettlementAmountTabProps {
  amount: number
}

function formatINR(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`
}

export function SettlementAmountTab({ amount }: SettlementAmountTabProps) {
  const challanAmount = amount
  const governmentFee = Math.round(amount * 0.1)
  const professionalFees = 500
  const miscFees = 150
  const total = challanAmount + governmentFee + professionalFees + miscFees

  const rows: { label: string; value: number; hint?: string }[] = [
    { label: 'Challan Amount', value: challanAmount, hint: 'Fine amount as per challan' },
    { label: 'Government Fee', value: governmentFee, hint: 'Court / statutory charges' },
    { label: 'Professional Fees', value: professionalFees, hint: 'Lawyer / agent fee' },
    { label: 'Misc Fees', value: miscFees, hint: 'Other charges' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Settlement Amount
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Breakdown of the settlement charges for this incident
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {row.label}
                </p>
                {row.hint && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {row.hint}
                  </p>
                )}
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatINR(row.value)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Total Settlement
            </p>
          </div>
          <span className="text-base font-bold text-cyan-700 dark:text-cyan-300 tabular-nums">
            {formatINR(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
