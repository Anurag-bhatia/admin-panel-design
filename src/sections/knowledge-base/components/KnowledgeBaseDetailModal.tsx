import { useState } from 'react'
import type {
  KnowledgeBaseEntry,
} from '@/../product/sections/knowledge-base/types'
import {
  CATEGORY_LABEL,
  CategoryIcon,
  formatDate,
} from './KnowledgeBaseView'

interface KnowledgeBaseDetailModalProps {
  entry: KnowledgeBaseEntry
  onClose: () => void
  onEdit?: (entry: KnowledgeBaseEntry) => void
  onDelete?: (entryId: string) => void
  onDownload?: (entry: KnowledgeBaseEntry) => void
}

export function KnowledgeBaseDetailModal({
  entry,
  onClose,
  onEdit,
  onDelete,
  onDownload,
}: KnowledgeBaseDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <CategoryIcon category={entry.category} className="w-3.5 h-3.5" />
                {CATEGORY_LABEL[entry.category]}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  entry.status === 'published'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                }`}
              >
                {entry.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {entry.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {entry.authorName}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Updated {formatDate(entry.updatedOn)}
          </div>
          {entry.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap ml-auto">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
          {entry.description && (
            <div
              className="kb-description text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: entry.description }}
            />
          )}
          <EntryContentBody entry={entry} onDownload={onDownload} />
        </div>
        <style>{`
          .kb-description h1 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.25; }
          .kb-description h2 { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.3; }
          .kb-description h3 { font-size: 1.1rem; font-weight: 600; margin: 0.4rem 0; line-height: 1.35; }
          .kb-description p { margin: 0.35rem 0; }
          .kb-description ul { list-style: disc; padding-left: 1.5rem; margin: 0.4rem 0; }
          .kb-description ol { list-style: decimal; padding-left: 1.5rem; margin: 0.4rem 0; }
          .kb-description li { margin: 0.15rem 0; }
          .kb-description a { color: rgb(8 145 178); text-decoration: underline; }
        `}</style>

        {/* Actions Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          {confirmDelete ? (
            <>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Delete this entry? Users won’t see it in the app anymore.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onDelete?.(entry.id)}
                  className="px-3 py-1.5 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Entry
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
                Delete
              </button>
              <button
                onClick={() => onEdit?.(entry)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function EntryContentBody({
  entry,
  onDownload,
}: {
  entry: KnowledgeBaseEntry
  onDownload?: (entry: KnowledgeBaseEntry) => void
}) {
  const content = entry.content

  switch (content.kind) {
    case 'template': {
      const t = content.template
      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-14 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                  {t.fileFormat}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white truncate">
                  {t.fileName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.fileFormat} · {t.fileSize}
                </p>
              </div>
              <button
                onClick={() => onDownload?.(entry)}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Template
              </button>
            </div>
          </div>
        </div>
      )
    }

    case 'faq':
      return (
        <div className="space-y-3">
          {content.items.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
              open={i === 0}
            >
              <summary className="flex items-start justify-between gap-3 cursor-pointer px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 list-none">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 text-xs font-bold flex items-center justify-center">
                    Q
                  </span>
                  <span className="font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1 transition-transform group-open:rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 flex items-start gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center">
                  A
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      )

    case 'guide':
      return (
        <ol className="space-y-4">
          {content.steps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'checklist':
      return (
        <ul className="space-y-2">
          {content.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3"
            >
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'regulation': {
      const r = content.regulation
      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Citation
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {r.citation}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Jurisdiction
                </p>
                <p className="text-slate-700 dark:text-slate-200">
                  {r.jurisdiction}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {r.bodyText}
            </p>
          </div>
        </div>
      )
    }

    case 'judgement': {
      const j = content.judgement
      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-base font-bold text-slate-900 dark:text-white mb-3">
              {j.caseTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Court
                </p>
                <p className="text-slate-800 dark:text-slate-200">{j.court}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Decided On
                </p>
                <p className="text-slate-800 dark:text-slate-200">
                  {formatDate(j.decidedOn)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Citation
                </p>
                <p className="text-slate-800 dark:text-slate-200">{j.citation}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-400 mb-1">
              Holding
            </p>
            <p className="text-sm text-cyan-900 dark:text-cyan-200 font-medium leading-relaxed">
              {j.holding}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Summary
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {j.summary}
            </p>
          </div>
        </div>
      )
    }

    case 'circular': {
      const c = content.circular
      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Issued By
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {c.issuedBy}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Issued On
                </p>
                <p className="text-slate-800 dark:text-slate-200">
                  {formatDate(c.issuedOn)}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  Circular No.
                </p>
                <p className="font-mono text-slate-800 dark:text-slate-200">
                  {c.circularNumber}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Subject
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {c.subject}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {c.body}
            </p>
          </div>
        </div>
      )
    }
  }
}
