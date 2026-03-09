import { useState } from 'react'
import { Plus, Search, ChevronDown } from 'lucide-react'
import type {
  SetupTab,
  SetupDashboardProps,
  ConfigStatus,
  Service,
  PriceCategory,
  Department,
  Designation,
  Master,
  MasterValue,
  GeographicValue,
} from '@/../product/sections/setup/types'
import { SetupSidebar } from './SetupSidebar'
import { SlideOverPanel } from './SlideOverPanel'
import { ServicesTable } from './ServicesTable'
import { PriceCategoriesTable } from './PriceCategoriesTable'
import { DepartmentsTable } from './DepartmentsTable'
import { DesignationsTable } from './DesignationsTable'
import { MastersTable } from './MastersTable'
import { GeographicTable } from './GeographicTable'
import { AuditLogTable } from './AuditLogTable'

const TAB_LABELS: Record<SetupTab, string> = {
  services: 'Services',
  priceCategories: 'Price Categories',
  departments: 'Departments',
  designations: 'Designations',
  masters: 'Masters',
  geographic: 'Geographic',
  auditLog: 'Audit Log',
}

const TAB_DESCRIPTIONS: Record<SetupTab, string> = {
  services: 'Manage platform services and product offerings',
  priceCategories: 'Configure pricing tiers and markup percentages',
  departments: 'Manage organizational departments',
  designations: 'Configure job titles and role mappings',
  masters: 'Manage dropdown categories and configurable values',
  geographic: 'Configure countries, states, and cities',
  auditLog: 'View all configuration changes',
}

type SlideOverState = {
  mode: 'add' | 'edit'
  tab: SetupTab
  itemId?: string
} | null

export function SetupDashboard({
  activeTab: initialTab = 'services',
  services,
  priceCategories,
  departments,
  designations,
  masters,
  masterValues,
  geographicValues,
  auditEntries,
  onTabChange,
  onAddService,
  onEditService,
  onToggleService,
  onDeleteService,
  onAddPriceCategory,
  onEditPriceCategory,
  onTogglePriceCategory,
  onDeletePriceCategory,
  onAddDepartment,
  onEditDepartment,
  onToggleDepartment,
  onDeleteDepartment,
  onAddDesignation,
  onEditDesignation,
  onToggleDesignation,
  onDeleteDesignation,
  onAddMaster,
  onEditMaster,
  onToggleMaster,
  onDeleteMaster,
  onAddMasterValue,
  onToggleMasterValue,
  onAddGeographic,
  onEditGeographic,
  onToggleGeographic,
  onDeleteGeographic,
}: SetupDashboardProps) {
  const [activeTab, setActiveTab] = useState<SetupTab>(initialTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [slideOver, setSlideOver] = useState<SlideOverState>(null)

  const handleTabChange = (tab: SetupTab) => {
    setActiveTab(tab)
    setSearchQuery('')
    setStatusFilter('all')
    onTabChange?.(tab)
  }

  const handleAdd = () => {
    if (activeTab === 'auditLog') return
    setSlideOver({ mode: 'add', tab: activeTab })
  }

  const handleEdit = (itemId: string) => {
    setSlideOver({ mode: 'edit', tab: activeTab, itemId })
  }

  const closeSlideOver = () => setSlideOver(null)

  // Find selected item for the form
  const selectedItem = slideOver?.itemId
    ? (() => {
        switch (slideOver.tab) {
          case 'services':
            return services.find((s) => s.id === slideOver.itemId)
          case 'priceCategories':
            return priceCategories.find((pc) => pc.id === slideOver.itemId)
          case 'departments':
            return departments.find((d) => d.id === slideOver.itemId)
          case 'designations':
            return designations.find((d) => d.id === slideOver.itemId)
          case 'masters':
            return masters.find((m) => m.id === slideOver.itemId)
          case 'geographic':
            return geographicValues.find((g) => g.id === slideOver.itemId)
          default:
            return undefined
        }
      })()
    : undefined

  const isAudit = activeTab === 'auditLog'

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <SetupSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                {TAB_LABELS[activeTab]}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {TAB_DESCRIPTIONS[activeTab]}
              </p>
            </div>
            {!isAudit && (
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add {TAB_LABELS[activeTab].replace(/ies$/, 'y').replace(/s$/, '')}
              </button>
            )}
          </div>

          {/* Search + Status filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${TAB_LABELS[activeTab].toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
            {!isAudit && (
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                  className="appearance-none pl-3 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 bg-white dark:bg-slate-900 overflow-auto">
          {activeTab === 'services' && (
            <ServicesTable
              services={services}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEdit={handleEdit}
              onToggle={(id, status) => onToggleService?.(id, status)}
              onDelete={(id) => onDeleteService?.(id)}
            />
          )}
          {activeTab === 'priceCategories' && (
            <PriceCategoriesTable
              priceCategories={priceCategories}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEdit={handleEdit}
              onToggle={(id, status) => onTogglePriceCategory?.(id, status)}
              onDelete={(id) => onDeletePriceCategory?.(id)}
            />
          )}
          {activeTab === 'departments' && (
            <DepartmentsTable
              departments={departments}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEdit={handleEdit}
              onToggle={(id, status) => onToggleDepartment?.(id, status)}
              onDelete={(id) => onDeleteDepartment?.(id)}
            />
          )}
          {activeTab === 'designations' && (
            <DesignationsTable
              designations={designations}
              departments={departments}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEdit={handleEdit}
              onToggle={(id, status) => onToggleDesignation?.(id, status)}
              onDelete={(id) => onDeleteDesignation?.(id)}
            />
          )}
          {activeTab === 'masters' && (
            <MastersTable
              masters={masters}
              masterValues={masterValues}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEditMaster={handleEdit}
              onToggleMaster={(id, status) => onToggleMaster?.(id, status)}
              onDeleteMaster={(id) => onDeleteMaster?.(id)}
              onAddMasterValue={(masterId) => onAddMasterValue?.(masterId)}
              onToggleMasterValue={(masterId, valueId, status) =>
                onToggleMasterValue?.(masterId, valueId, status)
              }
            />
          )}
          {activeTab === 'geographic' && (
            <GeographicTable
              geographicValues={geographicValues}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onEdit={handleEdit}
              onToggle={(id, status) => onToggleGeographic?.(id, status)}
              onDelete={(id) => onDeleteGeographic?.(id)}
            />
          )}
          {activeTab === 'auditLog' && (
            <AuditLogTable auditEntries={auditEntries} searchQuery={searchQuery} />
          )}
        </div>
      </div>

      {/* Slide-Over Panel */}
      <SlideOverPanel
        open={slideOver !== null}
        title={
          slideOver
            ? `${slideOver.mode === 'add' ? 'Add' : 'Edit'} ${TAB_LABELS[slideOver.tab].replace(/ies$/, 'y').replace(/s$/, '')}`
            : ''
        }
        onClose={closeSlideOver}
      >
        {slideOver?.tab === 'services' && (
          <ServiceForm
            service={selectedItem as Service | undefined}
            mode={slideOver.mode}
          />
        )}
        {slideOver?.tab === 'priceCategories' && (
          <PriceCategoryForm
            priceCategory={selectedItem as PriceCategory | undefined}
            mode={slideOver.mode}
          />
        )}
        {slideOver?.tab === 'departments' && (
          <DepartmentForm
            department={selectedItem as Department | undefined}
            mode={slideOver.mode}
          />
        )}
        {slideOver?.tab === 'designations' && (
          <DesignationForm
            designation={selectedItem as Designation | undefined}
            departments={departments}
            mode={slideOver.mode}
          />
        )}
        {slideOver?.tab === 'masters' && (
          <MasterForm
            master={selectedItem as Master | undefined}
            values={slideOver.itemId ? (masterValues[slideOver.itemId] || []) : []}
            mode={slideOver.mode}
          />
        )}
        {slideOver?.tab === 'geographic' && (
          <GeographicForm
            geographic={selectedItem as GeographicValue | undefined}
            geographicValues={geographicValues}
            mode={slideOver.mode}
          />
        )}
      </SlideOverPanel>
    </div>
  )
}

// =============================================================================
// Form Components (inline — these render inside the slide-over)
// =============================================================================

function FormField({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{hint}</p>}
    </div>
  )
}

function TextInput({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
    />
  )
}

function TextArea({ defaultValue, placeholder, rows = 3 }: { defaultValue?: string; placeholder?: string; rows?: number }) {
  return (
    <textarea
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
    />
  )
}

function SelectInput({ defaultValue, options }: { defaultValue?: string; options: { value: string; label: string }[] }) {
  return (
    <select
      defaultValue={defaultValue}
      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function NumberInput({ defaultValue, placeholder, suffix }: { defaultValue?: number; placeholder?: string; suffix?: string }) {
  return (
    <div className="relative">
      <input
        type="number"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          {suffix}
        </span>
      )}
    </div>
  )
}

function StatusToggle({ defaultValue = 'active' }: { defaultValue?: ConfigStatus }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${
          defaultValue === 'active'
            ? 'bg-cyan-500'
            : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <div
          className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
            defaultValue === 'active' ? 'left-5' : 'left-0.5'
          }`}
        />
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {defaultValue === 'active' ? 'Active' : 'Inactive'}
      </span>
    </div>
  )
}

// --- Service Form ---
function ServiceForm({ service, mode }: { service?: Service; mode: 'add' | 'edit' }) {
  return (
    <div className="space-y-0">
      <FormField label="Service Name">
        <TextInput defaultValue={service?.name} placeholder="e.g., Court Challan" />
      </FormField>
      <FormField label="Type">
        <SelectInput
          defaultValue={service?.type || 'Against Vehicle'}
          options={[
            { value: 'Against Vehicle', label: 'Against Vehicle' },
            { value: 'Topup Service', label: 'Topup Service' },
          ]}
        />
      </FormField>
      <FormField label="Vehicle Category">
        <SelectInput
          defaultValue={service?.category || 'Private Vehicles'}
          options={[
            { value: 'Private Vehicles', label: 'Private Vehicles' },
            { value: 'Commercial Vehicle', label: 'Commercial Vehicle' },
          ]}
        />
      </FormField>
      <FormField label="Slug" hint="URL-friendly identifier, auto-generated from name">
        <TextInput defaultValue={service?.slug} placeholder="court-challan" />
      </FormField>
      <FormField label="Credits">
        <NumberInput defaultValue={service?.credits ?? 1} placeholder="1" />
      </FormField>
      <FormField label="Description">
        <TextArea defaultValue={service?.description} placeholder="Brief description of this service..." />
      </FormField>
      <FormField label="Status">
        <StatusToggle defaultValue={service?.status} />
      </FormField>
    </div>
  )
}

// --- Price Category Form ---
function PriceCategoryForm({ priceCategory, mode }: { priceCategory?: PriceCategory; mode: 'add' | 'edit' }) {
  const isProtected = priceCategory?.isProtected
  return (
    <div className="space-y-0">
      {isProtected && (
        <div className="mb-4 px-3 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
            This is a protected category. Core pricing values cannot be modified.
          </p>
        </div>
      )}
      <FormField label="Category Name">
        <TextInput defaultValue={priceCategory?.name} placeholder="e.g., Class G - RTO + 18% (GST)" />
      </FormField>
      <FormField label="Markup Percentage" hint="Percentage added to the base price">
        <NumberInput defaultValue={priceCategory?.increaseBy ?? 0} placeholder="18" suffix="%" />
      </FormField>
      <FormField label="Description">
        <TextArea defaultValue={priceCategory?.description} placeholder="Description of this pricing tier..." />
      </FormField>
      <FormField label="Status">
        <StatusToggle defaultValue={priceCategory?.status} />
      </FormField>
    </div>
  )
}

// --- Department Form ---
function DepartmentForm({ department, mode }: { department?: Department; mode: 'add' | 'edit' }) {
  return (
    <div className="space-y-0">
      <FormField label="Department Name">
        <TextInput defaultValue={department?.name} placeholder="e.g., Business Operations" />
      </FormField>
      <FormField label="Head Count">
        <NumberInput defaultValue={department?.headCount ?? 0} placeholder="0" />
      </FormField>
      <FormField label="Status">
        <StatusToggle defaultValue={department?.status} />
      </FormField>
    </div>
  )
}

// --- Designation Form ---
function DesignationForm({
  designation,
  departments,
  mode,
}: {
  designation?: Designation
  departments: Department[]
  mode: 'add' | 'edit'
}) {
  const activeDepts = departments.filter((d) => d.status === 'active')
  return (
    <div className="space-y-0">
      <FormField label="Title">
        <TextInput defaultValue={designation?.title} placeholder="e.g., Data Analyst" />
      </FormField>
      <FormField label="Department">
        <SelectInput
          defaultValue={designation?.departmentId || activeDepts[0]?.id}
          options={activeDepts.map((d) => ({ value: d.id, label: d.name }))}
        />
      </FormField>
      <FormField label="Status">
        <StatusToggle defaultValue={designation?.status} />
      </FormField>
    </div>
  )
}

// --- Master Form ---
function MasterForm({ master, values, mode }: { master?: Master; values: MasterValue[]; mode: 'add' | 'edit' }) {
  const [newValue, setNewValue] = useState('')
  const allModules = [
    'Incidents', 'Leads', 'Subscribers', 'Customers', 'Lawyers',
    'Partners', 'Payments', 'Disputes', 'Support', 'Reports', 'Team',
  ]
  const selected = new Set(master?.usageModules || [])
  const sortedValues = [...values].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="space-y-0">
      <FormField label="Master Name">
        <TextInput defaultValue={master?.name} placeholder="e.g., Lead Sources" />
      </FormField>
      <FormField label="Description">
        <TextArea defaultValue={master?.description} placeholder="What this category is used for..." />
      </FormField>
      <FormField label="Usage Modules">
        <div className="grid grid-cols-2 gap-2">
          {allModules.map((mod) => (
            <label
              key={mod}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                defaultChecked={selected.has(mod as any)}
                className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">{mod}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Status">
        <StatusToggle defaultValue={master?.status} />
      </FormField>

      {/* Values section */}
      {mode === 'edit' && (
        <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Values
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {sortedValues.length} {sortedValues.length === 1 ? 'value' : 'values'}
            </span>
          </div>

          {sortedValues.length > 0 && (
            <div className="space-y-1 mb-3">
              {sortedValues.map((val) => (
                <div
                  key={val.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">{val.value}</span>
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                      val.status === 'active'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-500'
                    }`}
                  >
                    {val.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="New value..."
              className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
            <button
              onClick={() => setNewValue('')}
              className="px-3 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Geographic Form ---
function GeographicForm({
  geographic,
  geographicValues,
  mode,
}: {
  geographic?: GeographicValue
  geographicValues: GeographicValue[]
  mode: 'add' | 'edit'
}) {
  const level = geographic?.level || 'state'
  const countries = geographicValues.filter((g) => g.level === 'country')
  const states = geographicValues.filter((g) => g.level === 'state')

  return (
    <div className="space-y-0">
      <FormField label="Name">
        <TextInput defaultValue={geographic?.name} placeholder="e.g., Maharashtra" />
      </FormField>
      <FormField label="Code" hint="Short identifier (e.g., MH, MUM, IN)">
        <TextInput defaultValue={geographic?.code} placeholder="MH" />
      </FormField>
      <FormField label="Level">
        <SelectInput
          defaultValue={level}
          options={[
            { value: 'country', label: 'Country' },
            { value: 'state', label: 'State' },
            { value: 'city', label: 'City' },
          ]}
        />
      </FormField>
      {level === 'state' && (
        <FormField label="Parent Country">
          <SelectInput
            defaultValue={geographic?.parentId || countries[0]?.id}
            options={countries.map((c) => ({ value: c.id, label: c.name }))}
          />
        </FormField>
      )}
      {level === 'city' && (
        <FormField label="Parent State">
          <SelectInput
            defaultValue={geographic?.parentId || states[0]?.id}
            options={states.map((s) => ({ value: s.id, label: s.name }))}
          />
        </FormField>
      )}
      <FormField label="Status">
        <StatusToggle defaultValue={geographic?.status} />
      </FormField>
    </div>
  )
}
