import { useMemo, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import type {
  RewardsConfigDashboardProps,
  ConfigDraft,
  ConfigStatus,
  Product,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigTable } from './RewardsConfigTable'
import { ConfigurationForm } from './ConfigurationForm'
import { ConfirmationModal } from './ConfirmationModal'
import { ChangeHistoryModal } from './ChangeHistoryModal'

const PRODUCT_TABS: { key: Product; label: string }[] = [
  { key: 'challanPay', label: 'ChallanPay' },
  { key: 'lots247', label: 'LOTS247' },
]

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
  embedded = false,
  lockedProduct,
  titleOverride,
}: RewardsConfigDashboardProps) {
  const [view, setView] = useState<View>({ kind: 'list' })
  const [activeProduct, setActiveProduct] = useState<Product>(
    lockedProduct ?? 'challanPay',
  )
  const [pendingSubmit, setPendingSubmit] = useState<PendingSubmit>(null)
  const [historyStateId, setHistoryStateId] = useState<string | null>(null)

  const effectiveProduct = lockedProduct ?? activeProduct

  const productCounts = useMemo(
    () => ({
      challanPay: configs.filter((c) => c.product === 'challanPay').length,
      lots247: configs.filter((c) => c.product === 'lots247').length,
    }),
    [configs],
  )

  const productConfigs = useMemo(
    () => configs.filter((c) => c.product === effectiveProduct),
    [configs, effectiveProduct],
  )

  const existingStates = useMemo(
    () => productConfigs.map((c) => c.state),
    [productConfigs],
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

  const handleConfirm = (status: ConfigStatus) => {
    if (!pendingSubmit) return
    const draftWithStatus = { ...pendingSubmit.draft, status }
    if (pendingSubmit.kind === 'add') {
      onAdd?.(draftWithStatus)
    } else {
      onUpdate?.(pendingSubmit.configId, draftWithStatus)
    }
    setPendingSubmit(null)
    setView({ kind: 'list' })
  }

  const listTitle = titleOverride ?? 'State-Level Reward Configurations'

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      {/* Module header */}
      <div>
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
              {(!embedded || view.kind !== 'list') && (
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {view.kind === 'list' && listTitle}
                  {view.kind === 'add' && 'Add Reward Configuration'}
                  {view.kind === 'edit' &&
                    `Update Configuration — ${editingConfig?.state ?? ''}`}
                </h1>
              )}
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

      {/* Product tabs (visible on list view; hidden when a product is locked) */}
      {view.kind === 'list' && !lockedProduct && (
        <div className="max-w-[1440px] mx-auto px-6 pt-6">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            {PRODUCT_TABS.map((tab) => {
              const isActive = effectiveProduct === tab.key
              const count = productCounts[tab.key]
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveProduct(tab.key)}
                  className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label} ({count})
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="px-6 py-6">
        {view.kind === 'list' && (
          <RewardsConfigTable
            configs={productConfigs}
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
            defaultProduct={effectiveProduct}
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
