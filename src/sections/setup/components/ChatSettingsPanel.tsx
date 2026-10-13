import { useState } from 'react'
import { Clock, FileText, AlertTriangle, Calendar, Save } from 'lucide-react'

const ALL_FILE_TYPES = [
  { key: 'pdf', label: 'PDF' },
  { key: 'doc', label: 'DOC / DOCX' },
  { key: 'xls', label: 'XLS / XLSX' },
  { key: 'jpg', label: 'JPG / PNG' },
]

const WEEKDAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

export function ChatSettingsPanel() {
  const [readOnlyDays, setReadOnlyDays] = useState(7)
  const [escalationMinutes, setEscalationMinutes] = useState(30)
  const [maxFileSize, setMaxFileSize] = useState(10)
  const [allowedTypes, setAllowedTypes] = useState<string[]>(['pdf', 'doc', 'xls', 'jpg'])
  const [workingHoursStart, setWorkingHoursStart] = useState('09:00')
  const [workingHoursEnd, setWorkingHoursEnd] = useState('19:00')
  const [workingDays, setWorkingDays] = useState<string[]>(['mon', 'tue', 'wed', 'thu', 'fri', 'sat'])
  const [outOfHoursMessage, setOutOfHoursMessage] = useState(
    'Thanks for reaching out. Our team will respond on the next working day. Working hours: Mon–Sat, 9 AM – 7 PM.',
  )

  const toggle = (list: string[], setter: (v: string[]) => void, key: string) => {
    setter(list.includes(key) ? list.filter((x) => x !== key) : [...list, key])
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl space-y-6">
        <SettingCard
          icon={<Clock className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />}
          title="Read-only period after closure"
          description="How long the chat stays visible (read-only) after the incident is marked Completed or Not Completed."
        >
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={readOnlyDays}
              onChange={(e) => setReadOnlyDays(parseInt(e.target.value) || 0)}
              min={0}
              className="w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">days</span>
          </div>
        </SettingCard>

        <SettingCard
          icon={<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          title="Escalation time"
          description="If a lawyer message is unanswered beyond this duration, the owner's supervisor is alerted."
        >
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={escalationMinutes}
              onChange={(e) => setEscalationMinutes(parseInt(e.target.value) || 0)}
              min={5}
              className="w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">minutes (within working hours)</span>
          </div>
        </SettingCard>

        <SettingCard
          icon={<FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Attachment limits"
          description="Maximum file size and the file types users can share through chat."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Max file size
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={maxFileSize}
                  onChange={(e) => setMaxFileSize(parseInt(e.target.value) || 0)}
                  min={1}
                  max={100}
                  className="w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">MB per file</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                Allowed file types
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_FILE_TYPES.map((t) => {
                  const active = allowedTypes.includes(t.key)
                  return (
                    <button
                      key={t.key}
                      onClick={() => toggle(allowedTypes, setAllowedTypes, t.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        active
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          title="Working hours"
          description="Escalation timers and the SLA for first response are calculated against these hours."
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={workingHoursStart}
                onChange={(e) => setWorkingHoursStart(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">to</span>
              <input
                type="time"
                value={workingHoursEnd}
                onChange={(e) => setWorkingHoursEnd(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-sm text-slate-500 dark:text-slate-400">IST</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                Working days
              </label>
              <div className="flex gap-2 flex-wrap">
                {WEEKDAYS.map((d) => {
                  const active = workingDays.includes(d.key)
                  return (
                    <button
                      key={d.key}
                      onClick={() => toggle(workingDays, setWorkingDays, d.key)}
                      className={`h-9 w-10 rounded-lg text-xs font-semibold border transition-colors ${
                        active
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Out-of-hours auto-reply to lawyers
              </label>
              <textarea
                value={outOfHoursMessage}
                onChange={(e) => setOutOfHoursMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>
          </div>
        </SettingCard>

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Discard changes
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
            <Save className="h-4 w-4" />
            Save settings
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="pl-13 ml-13">{children}</div>
    </div>
  )
}
