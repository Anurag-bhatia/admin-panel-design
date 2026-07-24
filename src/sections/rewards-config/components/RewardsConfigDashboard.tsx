import { useMemo, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import type {
  RewardsConfigDashboardProps,
  ConfigDraft,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigTable } from './RewardsConfigTable'
import { ConfigurationForm } from './ConfigurationForm'
import { ConfirmationModal } from './ConfirmationModal'
import { ChangeHistoryModal } from './ChangeHistoryModal'

type View =
  | { kind: 'list' }
  | { kind: 'add' }
  | { kind: 'edit'; configId: string }

type PendingSubmit =
  | { kind: 'add'; draft: ConfigDraft }
  | { kind: 'edit'; configId: string; draft: ConfigDraft }
  | null

export function RewardsConfigDashboard({
  configs,
  changeLog,
  states,
  onAdd,
  onUpdate,
}: RewardsConfigDashboardProps) {
  const [view, setView] = useState<View>({ kind: 'list' })
  const [pendingSubmit, setPendingSubmit] = useState<PendingSubmit>(null)
  const [historyStateId, setHistoryStateId] = useState<string | null>(null)

  const existingStates = useMemo(
    () => configs.map((c) => c.state),
    [configs],
  )

  const editingConfig =
    view.kind === 'edit' ? configs.find((c) => c.id === view.configId) : undefined

  const historyConfig = historyStateId
    ? configs.find((c) => c.id === historyStateId)
    : null
  const historyEntries = historyConfig
    ? changeLog.filter((entry) => entry.configId === historyConfig.id)
    : []

  const handleAddClick = () => setView({ kind: 'add' })

  const handleEditClick = (id: string) => setView({ kind: 'edit', configId: id })

  const handleHistoryClick = (id: string) => setHistoryStateId(id)

  const handleConfirm = () => {
    if (!pendingSubmit) return
    if (pendingSubmit.kind === 'add') {
      onAdd?.(pendingSubmit.draft)
    } else {
      onUpdate?.(pendingSubmit.configId, pendingSubmit.draft)
    }
    setPendingSubmit(null)
    setView({ kind: 'list' })
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      {/* Module header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {view.kind !== 'list' && (
                <button
                  type="button"
                  onClick={() => setView({ kind: 'list' })}
                  aria-label="Back to configurations"
                  className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                {view.kind === 'list' && 'State-Level Reward Configurations'}
                {view.kind === 'add' && 'Add New Configuration'}
                {view.kind === 'edit' && 'Edit Configuration'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {view.kind === 'list' && (
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Configuration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        {view.kind === 'list' && (
          <RewardsConfigTable
            configs={configs}
            onEdit={handleEditClick}
            onHistory={handleHistoryClick}
            onAdd={handleAddClick}
          />
        )}
        {view.kind === 'add' && (
          <ConfigurationForm
            mode="add"
            states={states}
            existingStates={existingStates}
            onCancel={() => setView({ kind: 'list' })}
            onSubmit={(draft) => setPendingSubmit({ kind: 'add', draft })}
          />
        )}
        {view.kind === 'edit' && editingConfig && (
          <ConfigurationForm
            mode="edit"
            states={states}
            existingStates={existingStates}
            initialConfig={editingConfig}
            onCancel={() => setView({ kind: 'list' })}
            onSubmit={(draft) =>
              setPendingSubmit({
                kind: 'edit',
                configId: editingConfig.id,
                draft,
              })
            }
          />
        )}
      </div>

      {/* Modals */}
      {pendingSubmit && (
        <ConfirmationModal
          mode={pendingSubmit.kind}
          draft={pendingSubmit.draft}
          onCancel={() => setPendingSubmit(null)}
          onConfirm={handleConfirm}
        />
      )}
      {historyConfig && (
        <ChangeHistoryModal
          state={historyConfig.state}
          entries={historyEntries}
          onClose={() => setHistoryStateId(null)}
        />
      )}
    </div>
  )
}
