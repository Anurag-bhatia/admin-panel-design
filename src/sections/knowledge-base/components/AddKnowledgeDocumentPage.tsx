import { useRef, useState } from 'react'
import type {
  KnowledgeBaseCategory,
  KnowledgeBaseContent,
  KnowledgeBaseEntry,
  KnowledgeBaseFaqItem,
  KnowledgeBaseGuideStep,
} from '@/../product/sections/knowledge-base/types'
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  CategoryIcon,
} from './KnowledgeBaseView'

type NewEntry = Omit<KnowledgeBaseEntry, 'id' | 'publishedOn' | 'updatedOn'>

interface AddKnowledgeDocumentPageProps {
  onClose: () => void
  onCreate: (entry: NewEntry) => void
}

export function AddKnowledgeDocumentPage({
  onClose,
  onCreate,
}: AddKnowledgeDocumentPageProps) {
  const [category, setCategory] = useState<KnowledgeBaseCategory>('template')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagsText, setTagsText] = useState('')

  // Type-specific state — one shape per kind, only the active one is used at submit
  const [templateFile, setTemplateFile] = useState<{
    fileName: string
    fileFormat: 'PDF' | 'DOCX' | 'XLSX'
    fileSize: string
    previewNote: string
  }>({
    fileName: '',
    fileFormat: 'PDF',
    fileSize: '',
    previewNote: '',
  })
  const [faqItems, setFaqItems] = useState<KnowledgeBaseFaqItem[]>([
    { question: '', answer: '' },
  ])
  const [guideSteps, setGuideSteps] = useState<KnowledgeBaseGuideStep[]>([
    { title: '', body: '' },
  ])
  const [checklistItems, setChecklistItems] = useState<string[]>([''])
  const [regulation, setRegulation] = useState({
    citation: '',
    jurisdiction: '',
    bodyText: '',
  })
  const [judgement, setJudgement] = useState({
    caseTitle: '',
    court: '',
    decidedOn: '',
    citation: '',
    holding: '',
    summary: '',
  })
  const [circular, setCircular] = useState({
    issuedBy: '',
    issuedOn: '',
    circularNumber: '',
    subject: '',
    body: '',
  })

  const descriptionText = description.replace(/<[^>]*>/g, '').trim()
  const canSubmit = title.trim() !== '' && descriptionText !== ''

  function buildContent(): KnowledgeBaseContent {
    switch (category) {
      case 'template':
        return { kind: 'template', template: templateFile }
      case 'faq':
        return {
          kind: 'faq',
          items: faqItems.filter((i) => i.question.trim() || i.answer.trim()),
        }
      case 'guide':
        return {
          kind: 'guide',
          steps: guideSteps.filter((s) => s.title.trim() || s.body.trim()),
        }
      case 'checklist':
        return {
          kind: 'checklist',
          items: checklistItems.map((i) => i.trim()).filter(Boolean),
        }
      case 'regulation':
        return { kind: 'regulation', regulation }
      case 'judgement':
        return { kind: 'judgement', judgement }
      case 'circular':
        return { kind: 'circular', circular }
    }
  }

  function handleSubmit() {
    if (!canSubmit) return
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    onCreate({
      category,
      title: title.trim(),
      description,
      tags,
      authorName: 'Admin User',
      status: 'published',
      content: buildContent(),
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            aria-label="Back to Knowledge Base"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Add new knowledge document
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="px-4 py-2 rounded-md text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            Publish Now
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-8 py-8 space-y-6">
          {/* Category picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORY_ORDER.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    category === cat
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <CategoryIcon category={cat} className="w-4 h-4" />
                  {CATEGORY_LABEL[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Accident Affidavit Template"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Short summary shown on the card…"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="Comma-separated, e.g. accident, insurance"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Type-specific content editor */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              {CATEGORY_LABEL[category]} content
            </p>

            {category === 'template' && (
              <div className="space-y-3">
                <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-6 text-center">
                  <svg className="mx-auto w-8 h-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Upload template file
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PDF, DOCX, or XLSX up to 10 MB
                  </p>
                  <button
                    onClick={() =>
                      setTemplateFile((t) => ({
                        ...t,
                        fileName: t.fileName || 'template-file.pdf',
                        fileSize: t.fileSize || '128 KB',
                      }))
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold px-3 py-1.5"
                  >
                    Choose File
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      File Name
                    </label>
                    <input
                      value={templateFile.fileName}
                      onChange={(e) =>
                        setTemplateFile({ ...templateFile, fileName: e.target.value })
                      }
                      placeholder="my-template.pdf"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Format
                    </label>
                    <select
                      value={templateFile.fileFormat}
                      onChange={(e) =>
                        setTemplateFile({
                          ...templateFile,
                          fileFormat: e.target.value as 'PDF' | 'DOCX' | 'XLSX',
                        })
                      }
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    >
                      <option>PDF</option>
                      <option>DOCX</option>
                      <option>XLSX</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Usage note (shown to users)
                  </label>
                  <textarea
                    value={templateFile.previewNote}
                    onChange={(e) =>
                      setTemplateFile({ ...templateFile, previewNote: e.target.value })
                    }
                    rows={2}
                    placeholder="e.g. Print on ₹100 stamp paper before notarising."
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {category === 'faq' && (
              <div className="space-y-3">
                {faqItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Q&A #{idx + 1}
                      </p>
                      {faqItems.length > 1 && (
                        <button
                          onClick={() =>
                            setFaqItems(faqItems.filter((_, i) => i !== idx))
                          }
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      value={item.question}
                      onChange={(e) => {
                        const next = [...faqItems]
                        next[idx] = { ...item, question: e.target.value }
                        setFaqItems(next)
                      }}
                      placeholder="Question"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-medium"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) => {
                        const next = [...faqItems]
                        next[idx] = { ...item, answer: e.target.value }
                        setFaqItems(next)
                      }}
                      rows={2}
                      placeholder="Answer"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    setFaqItems([...faqItems, { question: '', answer: '' }])
                  }
                  className="w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  + Add another Q&A
                </button>
              </div>
            )}

            {category === 'guide' && (
              <div className="space-y-3">
                {guideSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Step {idx + 1}
                      </p>
                      {guideSteps.length > 1 && (
                        <button
                          onClick={() =>
                            setGuideSteps(guideSteps.filter((_, i) => i !== idx))
                          }
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      value={step.title}
                      onChange={(e) => {
                        const next = [...guideSteps]
                        next[idx] = { ...step, title: e.target.value }
                        setGuideSteps(next)
                      }}
                      placeholder="Step title"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-medium"
                    />
                    <textarea
                      value={step.body}
                      onChange={(e) => {
                        const next = [...guideSteps]
                        next[idx] = { ...step, body: e.target.value }
                        setGuideSteps(next)
                      }}
                      rows={2}
                      placeholder="What the user does in this step"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    setGuideSteps([...guideSteps, { title: '', body: '' }])
                  }
                  className="w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  + Add another step
                </button>
              </div>
            )}

            {category === 'checklist' && (
              <div className="space-y-2">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-400">•</span>
                    <input
                      value={item}
                      onChange={(e) => {
                        const next = [...checklistItems]
                        next[idx] = e.target.value
                        setChecklistItems(next)
                      }}
                      placeholder={`Pointer ${idx + 1}`}
                      className="flex-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                    {checklistItems.length > 1 && (
                      <button
                        onClick={() =>
                          setChecklistItems(checklistItems.filter((_, i) => i !== idx))
                        }
                        className="text-slate-400 hover:text-red-600 p-1"
                        aria-label="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setChecklistItems([...checklistItems, ''])}
                  className="w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  + Add pointer
                </button>
              </div>
            )}

            {category === 'regulation' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Citation
                    </label>
                    <input
                      value={regulation.citation}
                      onChange={(e) =>
                        setRegulation({ ...regulation, citation: e.target.value })
                      }
                      placeholder="e.g. Motor Vehicles Act 2019, Section 194"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Jurisdiction
                    </label>
                    <input
                      value={regulation.jurisdiction}
                      onChange={(e) =>
                        setRegulation({ ...regulation, jurisdiction: e.target.value })
                      }
                      placeholder="e.g. India — all states"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Body text
                  </label>
                  <textarea
                    value={regulation.bodyText}
                    onChange={(e) =>
                      setRegulation({ ...regulation, bodyText: e.target.value })
                    }
                    rows={4}
                    placeholder="Full text of the provision or summary…"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {category === 'judgement' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Case title
                  </label>
                  <input
                    value={judgement.caseTitle}
                    onChange={(e) =>
                      setJudgement({ ...judgement, caseTitle: e.target.value })
                    }
                    placeholder="Party v. Party"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Court
                    </label>
                    <input
                      value={judgement.court}
                      onChange={(e) =>
                        setJudgement({ ...judgement, court: e.target.value })
                      }
                      placeholder="Supreme Court of India"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Decided on
                    </label>
                    <input
                      type="date"
                      value={judgement.decidedOn}
                      onChange={(e) =>
                        setJudgement({ ...judgement, decidedOn: e.target.value })
                      }
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Citation
                    </label>
                    <input
                      value={judgement.citation}
                      onChange={(e) =>
                        setJudgement({ ...judgement, citation: e.target.value })
                      }
                      placeholder="(2019) 4 SCC 415"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Holding
                  </label>
                  <textarea
                    value={judgement.holding}
                    onChange={(e) =>
                      setJudgement({ ...judgement, holding: e.target.value })
                    }
                    rows={2}
                    placeholder="Key holding of the court"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Summary
                  </label>
                  <textarea
                    value={judgement.summary}
                    onChange={(e) =>
                      setJudgement({ ...judgement, summary: e.target.value })
                    }
                    rows={3}
                    placeholder="Full facts and reasoning"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {category === 'circular' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Issued by
                    </label>
                    <input
                      value={circular.issuedBy}
                      onChange={(e) =>
                        setCircular({ ...circular, issuedBy: e.target.value })
                      }
                      placeholder="MoRTH / IRDAI / RBI"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Issued on
                    </label>
                    <input
                      type="date"
                      value={circular.issuedOn}
                      onChange={(e) =>
                        setCircular({ ...circular, issuedOn: e.target.value })
                      }
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Circular number
                  </label>
                  <input
                    value={circular.circularNumber}
                    onChange={(e) =>
                      setCircular({ ...circular, circularNumber: e.target.value })
                    }
                    placeholder="RT-25036/122/2020-MVL"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    value={circular.subject}
                    onChange={(e) =>
                      setCircular({ ...circular, subject: e.target.value })
                    }
                    placeholder="Subject line of the circular"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Body
                  </label>
                  <textarea
                    value={circular.body}
                    onChange={(e) =>
                      setCircular({ ...circular, body: e.target.value })
                    }
                    rows={4}
                    placeholder="Full body text of the circular"
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Rich Text Editor
// =============================================================================

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [, setTick] = useState(0)

  function exec(command: string, arg?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, arg)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
    setTick((n) => n + 1)
  }

  function handleInput() {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  function isActive(command: string): boolean {
    try {
      return document.queryCommandState(command)
    } catch {
      return false
    }
  }

  function currentBlock(): string {
    try {
      return (document.queryCommandValue('formatBlock') || 'p').toLowerCase().replace(/[<>]/g, '')
    } catch {
      return 'p'
    }
  }

  function handleLink() {
    const url = window.prompt('Enter URL')
    if (!url) return
    exec('createLink', url)
  }

  const block = currentBlock()

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <select
          value={block === 'h1' || block === 'h2' || block === 'h3' ? block : 'p'}
          onChange={(e) => exec('formatBlock', e.target.value)}
          className="h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-slate-700 dark:text-slate-300 mr-1 cursor-pointer"
          aria-label="Text style"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => exec('bold')}
          active={isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec('italic')}
          active={isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <span className="italic font-serif">I</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec('underline')}
          active={isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec('strikeThrough')}
          active={isActive('strikeThrough')}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => exec('insertUnorderedList')}
          active={isActive('insertUnorderedList')}
          title="Bulleted list"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec('insertOrderedList')}
          active={isActive('insertOrderedList')}
          title="Numbered list"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton onClick={() => exec('justifyLeft')} title="Align left">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h10M4 14h16M4 18h10" />
          </svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyCenter')} title="Align center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 10h10M4 14h16M7 18h10" />
          </svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyRight')} title="Align right">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 10h10M4 14h16M10 18h10" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton onClick={handleLink} title="Insert link">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('removeFormat')} title="Clear formatting">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M6 4v3m4-3v3m4-3v3m4-3v3M4 14l6 6M10 14l-6 6" />
          </svg>
        </ToolbarButton>

        <div className="flex-1" />

        <ToolbarButton onClick={() => exec('undo')} title="Undo">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a4 4 0 010 8H8m-5-8l4-4m-4 4l4 4" />
          </svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('redo')} title="Redo">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a4 4 0 100 8h5m5-8l-4-4m4 4l-4 4" />
          </svg>
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onKeyUp={() => setTick((n) => n + 1)}
        onMouseUp={() => setTick((n) => n + 1)}
        data-placeholder={placeholder}
        className="rte-content min-h-[240px] max-h-[520px] overflow-auto px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Editor styles */}
      <style>{`
        .rte-content:empty::before {
          content: attr(data-placeholder);
          color: rgb(148 163 184);
          pointer-events: none;
        }
        .rte-content h1 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.25; }
        .rte-content h2 { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.3; }
        .rte-content h3 { font-size: 1.1rem; font-weight: 600; margin: 0.4rem 0; line-height: 1.35; }
        .rte-content p { margin: 0.35rem 0; }
        .rte-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.4rem 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.4rem 0; }
        .rte-content li { margin: 0.15rem 0; }
        .rte-content a { color: rgb(8 145 178); text-decoration: underline; }
      `}</style>
    </div>
  )
}

function ToolbarButton({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm ${
        active
          ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
}
