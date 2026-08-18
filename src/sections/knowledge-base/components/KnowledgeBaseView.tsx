import { useMemo, useState } from 'react'
import type {
  KnowledgeBaseEntry,
  KnowledgeBaseCategory,
} from '@/../product/sections/knowledge-base/types'
import { KnowledgeBaseDetailModal } from './KnowledgeBaseDetailModal'
import { AddKnowledgeDocumentPage } from './AddKnowledgeDocumentPage'

export interface KnowledgeBaseViewProps {
  entries: KnowledgeBaseEntry[]
  onCreate?: (entry: Omit<KnowledgeBaseEntry, 'id' | 'publishedOn' | 'updatedOn'>) => void
  onEdit?: (entry: KnowledgeBaseEntry) => void
  onDelete?: (entryId: string) => void
  onDownload?: (entry: KnowledgeBaseEntry) => void
}

type CategoryFilter = 'all' | KnowledgeBaseCategory

const CATEGORY_LABEL: Record<KnowledgeBaseCategory, string> = {
  template: 'Templates',
  faq: 'FAQs',
  guide: 'Guides',
  checklist: 'Checklists',
  regulation: 'Regulations',
  judgement: 'Judgements',
  circular: 'Circulars',
}

const CATEGORY_SINGULAR: Record<KnowledgeBaseCategory, string> = {
  template: 'Template',
  faq: 'FAQ',
  guide: 'Guide',
  checklist: 'Checklist',
  regulation: 'Regulation',
  judgement: 'Judgement',
  circular: 'Circular',
}

const CATEGORY_ORDER: KnowledgeBaseCategory[] = [
  'template',
  'faq',
  'guide',
  'checklist',
  'regulation',
  'judgement',
  'circular',
]

function CategoryIcon({
  category,
  className,
}: {
  category: KnowledgeBaseCategory
  className?: string
}) {
  const cls = className ?? 'w-4 h-4'
  switch (category) {
    case 'template':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'faq':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'guide':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    case 'checklist':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'regulation':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    case 'judgement':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    case 'circular':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
  }
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function KnowledgeBaseView({
  entries,
  onCreate,
  onEdit,
  onDelete,
  onDownload,
}: KnowledgeBaseViewProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
  const [showAddPage, setShowAddPage] = useState(false)

  // Counts per category (respect status filter but not the category tab itself)
  const counts = useMemo(() => {
    const scoped = entries.filter((e) =>
      statusFilter === 'all' ? true : e.status === statusFilter,
    )
    const result: Record<CategoryFilter, number> = {
      all: scoped.length,
      template: 0,
      faq: 0,
      guide: 0,
      checklist: 0,
      regulation: 0,
      judgement: 0,
      circular: 0,
    }
    for (const entry of scoped) result[entry.category] += 1
    return result
  }, [entries, statusFilter])

  const visibleEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return entries
      .filter((e) => (activeCategory === 'all' ? true : e.category === activeCategory))
      .filter((e) => (statusFilter === 'all' ? true : e.status === statusFilter))
      .filter((e) => {
        if (!query) return true
        return (
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      })
      .sort((a, b) => (a.updatedOn < b.updatedOn ? 1 : -1))
  }, [entries, activeCategory, statusFilter, searchQuery])

  const selectedEntry = entries.find((e) => e.id === selectedEntryId) ?? null

  if (showAddPage) {
    return (
      <AddKnowledgeDocumentPage
        onClose={() => setShowAddPage(false)}
        onCreate={(entry) => {
          onCreate?.(entry)
          setShowAddPage(false)
        }}
      />
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Knowledge Base
          </h1>

          <button
            onClick={() => setShowAddPage(true)}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2.5 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Entry
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal guides, templates, FAQs…"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || statusFilter !== 'all'
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Status filter row */}
        {showFilters && (
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </span>
            {(['all', 'published', 'draft'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
            }`}
          >
            All
            <span
              className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${
                activeCategory === 'all'
                  ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {counts.all}
            </span>
          </button>

          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
              }`}
            >
              <CategoryIcon category={cat} />
              {CATEGORY_LABEL[cat]}
              <span
                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${
                  activeCategory === cat
                    ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {counts[cat]}
              </span>
            </button>
          ))}
        </div>

        {/* Card Grid */}
        {visibleEntries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-16 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              No entries found
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {searchQuery
                ? 'Try a different search or clear filters.'
                : 'Add the first entry for this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleEntries.map((entry) => (
              <KnowledgeCard
                key={entry.id}
                entry={entry}
                onOpen={() => setSelectedEntryId(entry.id)}
                onDownload={onDownload}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <KnowledgeBaseDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntryId(null)}
          onEdit={onEdit}
          onDelete={(id) => {
            onDelete?.(id)
            setSelectedEntryId(null)
          }}
          onDownload={onDownload}
        />
      )}
    </div>
  )
}

function KnowledgeCard({
  entry,
  onOpen,
  onDownload,
}: {
  entry: KnowledgeBaseEntry
  onOpen: () => void
  onDownload?: (entry: KnowledgeBaseEntry) => void
}) {
  const isTemplate = entry.content.kind === 'template'
  const isChecklist = entry.content.kind === 'checklist'

  return (
    <button
      onClick={onOpen}
      className="text-left rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all group"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          <CategoryIcon category={entry.category} className="w-3.5 h-3.5" />
          {CATEGORY_LABEL[entry.category]}
        </span>
        {entry.status === 'draft' && (
          <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Draft
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
        {entry.title}
      </h3>

      {/* Type-specific preview */}
      {isChecklist && entry.content.kind === 'checklist' && (
        <ul className="space-y-1 mb-4">
          {entry.content.items.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
          {entry.content.items.length > 3 && (
            <li className="text-xs text-slate-400 dark:text-slate-500 pl-3">
              +{entry.content.items.length - 3} more
            </li>
          )}
        </ul>
      )}

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(entry.updatedOn)}
        </div>

        {isTemplate && entry.content.kind === 'template' && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onDownload?.(entry)
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 px-2.5 py-1 text-xs font-semibold cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download {entry.content.template.fileFormat}
          </div>
        )}
      </div>
    </button>
  )
}

export { CATEGORY_LABEL, CATEGORY_SINGULAR, CATEGORY_ORDER, CategoryIcon, formatDate }
