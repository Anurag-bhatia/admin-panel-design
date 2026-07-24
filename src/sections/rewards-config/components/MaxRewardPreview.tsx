import { TrendingUp } from 'lucide-react'

interface MaxRewardPreviewProps {
  marginPct: number | null
  lawyeredCvPct: number | null
  lawyeredNcvPct: number | null
}

function formatPct(value: number | null) {
  if (value === null || Number.isNaN(value)) return '—'
  return `${value}%`
}

export function MaxRewardPreview({
  marginPct,
  lawyeredCvPct,
  lawyeredNcvPct,
}: MaxRewardPreviewProps) {
  const maxCv =
    marginPct !== null && lawyeredCvPct !== null
      ? Math.max(0, marginPct - lawyeredCvPct)
      : null
  const maxNcv =
    marginPct !== null && lawyeredNcvPct !== null
      ? Math.max(0, marginPct - lawyeredNcvPct)
      : null

  return (
    <div className="rounded-xl border border-cyan-100 dark:border-cyan-900/40 bg-gradient-to-br from-cyan-50/70 to-white dark:from-cyan-950/20 dark:to-slate-900 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-cyan-100 dark:bg-cyan-900/40">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Max Reward Preview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PreviewCell
          label="Max CV Reward %"
          value={formatPct(maxCv)}
          accent="primary"
        />
        <PreviewCell
          label="Max NCV Reward %"
          value={formatPct(maxNcv)}
          accent="primary"
        />
      </div>
    </div>
  )
}

function PreviewCell({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: 'primary' | 'muted'
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        accent === 'primary'
          ? 'bg-white dark:bg-slate-900/60 border border-cyan-100 dark:border-cyan-900/40'
          : 'bg-transparent'
      }`}
    >
      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      {value && (
        <p
          className={`text-2xl font-semibold mt-1 ${
            accent === 'primary'
              ? 'text-cyan-700 dark:text-cyan-300'
              : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {value}
        </p>
      )}
    </div>
  )
}
