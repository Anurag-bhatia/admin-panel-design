import { useState } from 'react'
import { Plus, GripVertical, Edit2, Trash2, Check, X, Users, Scale } from 'lucide-react'

type TemplateAudience = 'ops' | 'lawyerChip'

interface Template {
  id: string
  audience: TemplateAudience
  text: string
  active: boolean
}

const INITIAL_TEMPLATES: Template[] = [
  {
    id: 'ops-1',
    audience: 'ops',
    text: 'Please share the vehicle RC copy at your earliest.',
    active: true,
  },
  {
    id: 'ops-2',
    audience: 'ops',
    text: 'The court hearing is scheduled for the next week. Please prepare the challan copy.',
    active: true,
  },
  {
    id: 'ops-3',
    audience: 'ops',
    text: 'Could you confirm the current status with the RTO?',
    active: true,
  },
  {
    id: 'ops-4',
    audience: 'ops',
    text: 'Payment receipt received. Please proceed to close.',
    active: false,
  },
  { id: 'law-1', audience: 'lawyerChip', text: 'Need documents', active: true },
  { id: 'law-2', audience: 'lawyerChip', text: 'Incident details unclear', active: true },
  { id: 'law-3', audience: 'lawyerChip', text: 'Need a screenshot', active: true },
  { id: 'law-4', audience: 'lawyerChip', text: 'Hearing deferred', active: true },
]

export function ChatTemplatesPanel() {
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES)
  const [adding, setAdding] = useState<TemplateAudience | null>(null)
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState('')

  const opsTemplates = templates.filter((t) => t.audience === 'ops')
  const chipTemplates = templates.filter((t) => t.audience === 'lawyerChip')

  const handleAdd = (audience: TemplateAudience) => {
    const text = draft.trim()
    if (!text) return
    setTemplates((prev) => [
      ...prev,
      {
        id: `${audience === 'ops' ? 'ops' : 'law'}-${Date.now()}`,
        audience,
        text,
        active: true,
      },
    ])
    setDraft('')
    setAdding(null)
  }

  const handleSaveEdit = (id: string) => {
    const text = editDraft.trim()
    if (!text) return
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)))
    setEditingId(null)
    setEditDraft('')
  }

  const handleToggle = (id: string) =>
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)))

  const handleDelete = (id: string) => setTemplates((prev) => prev.filter((t) => t.id !== id))

  const move = (id: string, direction: -1 | 1) => {
    setTemplates((prev) => {
      const idx = prev.findIndex((t) => t.id === id)
      if (idx < 0) return prev
      const target = prev[idx]
      const siblings = prev.filter((t) => t.audience === target.audience)
      const localIdx = siblings.findIndex((t) => t.id === id)
      const newLocalIdx = localIdx + direction
      if (newLocalIdx < 0 || newLocalIdx >= siblings.length) return prev
      const reordered = [...siblings]
      ;[reordered[localIdx], reordered[newLocalIdx]] = [reordered[newLocalIdx], reordered[localIdx]]
      const otherAudience = prev.filter((t) => t.audience !== target.audience)
      return [...otherAudience, ...reordered].sort((a, b) => {
        if (a.audience !== b.audience) return a.audience === 'ops' ? -1 : 1
        return 0
      })
    })
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ops templates */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Ops reply templates
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Insert into the composer, edit before sending.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setAdding('ops')
                setDraft('')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>

          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {opsTemplates.map((t) => (
              <li key={t.id} className="group px-5 py-3 flex items-start gap-3">
                <button
                  onClick={() => move(t.id, -1)}
                  className="mt-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-grab"
                  title="Reorder"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <div className="flex-1 min-w-0">
                  {editingId === t.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editDraft}
                        onChange={(e) => setEditDraft(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(t.id)}
                        autoFocus
                        className="flex-1 px-2 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={() => handleSaveEdit(t.id)}
                        className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`text-sm ${
                        t.active
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-500 line-through'
                      }`}
                    >
                      {t.text}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggle(t.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      t.active
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(t.id)
                      setEditDraft(t.text)
                    }}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                    title="Edit"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}

            {adding === 'ops' && (
              <li className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={draft}
                    autoFocus
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd('ops')}
                    placeholder="Enter a reply template…"
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleAdd('ops')}
                    disabled={!draft.trim()}
                    className="px-3 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setAdding(null)}
                    className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            )}
          </ul>
        </section>

        {/* Lawyer chips */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Lawyer quick-reply chips
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Shown in the empty-state of the Chats tab in the lawyer app.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setAdding('lawyerChip')
                setDraft('')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap gap-2 min-h-[48px]">
              {chipTemplates.map((t) => (
                <div
                  key={t.id}
                  className={`group inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-full text-xs font-medium border ${
                    t.active
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 line-through'
                  }`}
                >
                  {editingId === t.id ? (
                    <>
                      <input
                        type="text"
                        value={editDraft}
                        autoFocus
                        onChange={(e) => setEditDraft(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(t.id)}
                        className="w-32 px-1.5 py-0.5 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={() => handleSaveEdit(t.id)}
                        className="p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{t.text}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleToggle(t.id)}
                          className="p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded"
                          title={t.active ? 'Deactivate' : 'Activate'}
                        >
                          <Check className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(t.id)
                            setEditDraft(t.text)
                          }}
                          className="p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded"
                          title="Edit"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {adding === 'lawyerChip' && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={draft}
                  autoFocus
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd('lawyerChip')}
                  placeholder="Short chip label, e.g. Need challan copy"
                  className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleAdd('lawyerChip')}
                  disabled={!draft.trim()}
                  className="px-3 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
                <button
                  onClick={() => setAdding(null)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
