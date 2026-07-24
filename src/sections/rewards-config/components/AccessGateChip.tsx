import { ShieldCheck } from 'lucide-react'
import type { AllowlistedUser } from '@/../product/sections/rewards-config/types'

export function AccessGateChip({ user }: { user: AllowlistedUser }) {
  return (
    <div className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20">
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/15">
        <ShieldCheck className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
      </div>
      <div className="flex items-center gap-1.5 text-[12px]">
        <span className="font-medium text-emerald-800 dark:text-emerald-300">
          {user.name}
        </span>
        <span className="text-emerald-600/60 dark:text-emerald-500/60">·</span>
        <span className="text-emerald-700 dark:text-emerald-400">{user.role}</span>
        <span className="text-emerald-600/60 dark:text-emerald-500/60">·</span>
        <span className="text-emerald-700/80 dark:text-emerald-400/80">Full access</span>
      </div>
    </div>
  )
}
