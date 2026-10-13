import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Paperclip,
  Send,
  Phone,
  Lock,
  Check,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  Download,
  Save,
  CornerUpLeft,
  X,
  RotateCcw,
  AlertCircle,
} from 'lucide-react'
import type { Lawyer, User } from '@/../product/sections/incidents/types'

type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed'

type ChatAttachment = {
  id: string
  kind: 'image' | 'document'
  name: string
  sizeLabel: string
  thumbnailUrl?: string
  savedToDocuments?: boolean
}

type ChatMessage = {
  id: string
  sender: 'lawyer' | 'ops' | 'system'
  senderName?: string
  body?: string
  attachments?: ChatAttachment[]
  createdAt: string
  status?: MessageStatus
  replyTo?: { id: string; sender: 'lawyer' | 'ops'; preview: string }
}

interface ChatsTabProps {
  incidentId: string
  lawyer: Lawyer | null
  owner: User | null
  users: User[]
  canReopen?: boolean
  isReadOnly?: boolean
  currentUserName?: string
  onCall?: (phone: string) => void
  onAssignToMe?: () => void
  onAssign?: (userId: string) => void
  onReopen?: () => void
  onSaveAttachmentToDocuments?: (messageId: string, attachmentId: string) => void
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDateDivider(iso: string): string {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today.getTime() - 86400000)
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function buildSampleMessages(lawyerName: string, opsName: string): ChatMessage[] {
  const now = Date.now()
  const minute = 60 * 1000
  return [
    {
      id: 'm-sys-1',
      sender: 'system',
      body: `Chat started with ${lawyerName}`,
      createdAt: new Date(now - 180 * minute).toISOString(),
    },
    {
      id: 'm-1',
      sender: 'lawyer',
      senderName: lawyerName,
      body: 'Hi team, I need the challan copy for this incident. The one in the file is not legible.',
      createdAt: new Date(now - 165 * minute).toISOString(),
    },
    {
      id: 'm-2',
      sender: 'ops',
      senderName: opsName,
      body: 'Sure, sharing the clean copy and the RC in a minute.',
      createdAt: new Date(now - 160 * minute).toISOString(),
      status: 'read',
    },
    {
      id: 'm-3',
      sender: 'ops',
      senderName: opsName,
      attachments: [
        {
          id: 'att-1',
          kind: 'document',
          name: 'challan-HR26-copy.pdf',
          sizeLabel: '1.2 MB',
        },
        {
          id: 'att-2',
          kind: 'document',
          name: 'rc-HR26-2024.pdf',
          sizeLabel: '640 KB',
        },
      ],
      createdAt: new Date(now - 158 * minute).toISOString(),
      status: 'read',
    },
    {
      id: 'm-4',
      sender: 'lawyer',
      senderName: lawyerName,
      body: 'Received. The challan date on the RTO portal shows a different fine amount — attaching a screenshot.',
      createdAt: new Date(now - 120 * minute).toISOString(),
    },
    {
      id: 'm-5',
      sender: 'lawyer',
      senderName: lawyerName,
      attachments: [
        {
          id: 'att-3',
          kind: 'image',
          name: 'rto-portal-screenshot.jpg',
          sizeLabel: '820 KB',
          thumbnailUrl: '',
        },
      ],
      createdAt: new Date(now - 118 * minute).toISOString(),
    },
    {
      id: 'm-6',
      sender: 'ops',
      senderName: opsName,
      body: 'Thanks, we have escalated with the RTO. The physical court hearing is scheduled for 15 Oct.',
      createdAt: new Date(now - 45 * minute).toISOString(),
      status: 'read',
      replyTo: {
        id: 'm-4',
        sender: 'lawyer',
        preview: 'Received. The challan date on the RTO portal shows a different fine amount…',
      },
    },
    {
      id: 'm-7',
      sender: 'lawyer',
      senderName: lawyerName,
      body: 'Noted. Will keep you posted after the hearing.',
      createdAt: new Date(now - 12 * minute).toISOString(),
    },
  ]
}

export function ChatsTab({
  incidentId: _incidentId,
  lawyer,
  isReadOnly = false,
  canReopen = false,
  currentUserName = 'Priya Sharma',
  onCall,
  onReopen,
  onSaveAttachmentToDocuments,
}: ChatsTabProps) {
  const lawyerName = lawyer?.name.replace('Adv. ', '') ?? 'Unassigned Lawyer'
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    buildSampleMessages(lawyerName, currentUserName),
  )
  const [draft, setDraft] = useState('')
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [isLawyerTyping, setIsLawyerTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const groups = useMemo(() => {
    const map = new Map<string, ChatMessage[]>()
    for (const m of messages) {
      const key = new Date(m.createdAt).toDateString()
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    return Array.from(map.entries()).map(([key, items]) => ({
      key,
      label: formatDateDivider(items[0].createdAt),
      items,
    }))
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages.length])

  useEffect(() => {
    const t = setTimeout(() => setIsLawyerTyping(true), 1800)
    const u = setTimeout(() => setIsLawyerTyping(false), 4600)
    return () => {
      clearTimeout(t)
      clearTimeout(u)
    }
  }, [])

  const handleSend = () => {
    if (isReadOnly) return
    const trimmed = draft.trim()
    if (!trimmed) return
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'ops',
      senderName: currentUserName,
      body: trimmed,
      createdAt: new Date().toISOString(),
      status: 'sent',
      replyTo: replyTarget && (replyTarget.sender === 'lawyer' || replyTarget.sender === 'ops')
        ? {
            id: replyTarget.id,
            sender: replyTarget.sender,
            preview: (replyTarget.body ?? replyTarget.attachments?.[0]?.name ?? '').slice(0, 80),
          }
        : undefined,
    }
    setMessages((prev) => [...prev, newMessage])
    setDraft('')
    setReplyTarget(null)
  }

  const handleSaveAttachment = (messageId: string, attachmentId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? {
              ...m,
              attachments: m.attachments?.map((a) =>
                a.id === attachmentId ? { ...a, savedToDocuments: true } : a,
              ),
            }
          : m,
      ),
    )
    onSaveAttachmentToDocuments?.(messageId, attachmentId)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isReadOnly) setIsDraggingFile(true)
  }

  const onDragLeave = () => setIsDraggingFile(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(false)
    if (isReadOnly) return
    const files = Array.from(e.dataTransfer.files)
    if (!files.length) return
    const atts: ChatAttachment[] = files.map((f, i) => ({
      id: `drop-${Date.now()}-${i}`,
      kind: f.type.startsWith('image/') ? 'image' : 'document',
      name: f.name,
      sizeLabel: `${Math.max(1, Math.round(f.size / 1024))} KB`,
    }))
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: 'ops',
        senderName: currentUserName,
        attachments: atts,
        createdAt: new Date().toISOString(),
        status: 'sent',
      },
    ])
  }

  return (
    <div
      className="relative flex flex-col h-[640px]"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-sm font-semibold text-cyan-700 dark:text-cyan-300 flex-shrink-0">
            {lawyerName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {lawyerName}
              </p>
              {lawyer && (
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {lawyer.id}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {lawyer?.phone ?? 'No contact on file'}
              {lawyer?.state && <> · {lawyer.state}</>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {lawyer?.phone && (
            <button
              onClick={() => onCall?.(lawyer.phone)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </button>
          )}

        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50 dark:bg-slate-950"
      >
        {groups.map((group) => (
          <div key={group.key} className="space-y-3">
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {group.label}
              </span>
            </div>
            {group.items.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onReply={() => setReplyTarget(m)}
                onSaveAttachment={(attachmentId) => handleSaveAttachment(m.id, attachmentId)}
              />
            ))}
          </div>
        ))}

        {isLawyerTyping && !isReadOnly && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-1">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:300ms]" />
            </div>
            <span>{lawyerName.split(' ')[0]} is typing…</span>
          </div>
        )}
      </div>

      {/* Composer / read-only banner */}
      {isReadOnly ? (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/10 px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
              <Lock className="h-4 w-4" />
              This incident is closed. Chat is read-only.
            </div>
            {canReopen && (
              <button
                onClick={() => onReopen?.()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-lg border border-amber-300 dark:border-amber-800 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reopen chat
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {replyTarget && (
            <div className="flex items-start justify-between gap-3 px-5 pt-3">
              <div className="flex-1 border-l-2 border-cyan-500 bg-slate-50 dark:bg-slate-800 rounded-r-md px-3 py-1.5 min-w-0">
                <p className="text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
                  Replying to {replyTarget.sender === 'lawyer' ? lawyerName : replyTarget.senderName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  {replyTarget.body ?? replyTarget.attachments?.[0]?.name}
                </p>
              </div>
              <button
                onClick={() => setReplyTarget(null)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          )}

          <div className="px-5 py-3">
            <div className="flex items-end gap-2">
              {/* Attachment */}
              <button
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              {/* Text field */}
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Type a message or paste a screenshot…"
                  rows={1}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none max-h-32 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                />
              </div>

              {/* Send */}
              <button
                onClick={handleSend}
                disabled={!draft.trim()}
                className={`p-2.5 rounded-lg transition-colors ${
                  draft.trim()
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Messages can't be deleted, unsent, or edited once sent.
            </p>
          </div>
        </div>
      )}

      {/* Drag-drop overlay */}
      {isDraggingFile && (
        <div className="absolute inset-0 z-30 bg-cyan-500/10 border-2 border-dashed border-cyan-500 rounded-xl flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Paperclip className="h-8 w-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
              Drop files to share with {lawyerName.split(' ')[0]}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface MessageBubbleProps {
  message: ChatMessage
  onReply: () => void
  onSaveAttachment: (attachmentId: string) => void
}

function MessageBubble({ message, onReply, onSaveAttachment }: MessageBubbleProps) {
  if (message.sender === 'system') {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {message.body}
        </span>
      </div>
    )
  }

  const isOps = message.sender === 'ops'

  return (
    <div className={`group flex ${isOps ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[75%] ${isOps ? 'flex-row-reverse' : ''}`}>
        {!isOps && (
          <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-semibold text-slate-700 dark:text-slate-200 flex-shrink-0 mb-5">
            {message.senderName?.charAt(0)}
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          {isOps && message.senderName && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 self-end px-1">
              {message.senderName}
            </span>
          )}
          {!isOps && message.senderName && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 px-1">
              {message.senderName}
            </span>
          )}

          <div
            className={`relative rounded-2xl px-3.5 py-2 ${
              isOps
                ? 'bg-cyan-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {message.replyTo && (
              <div
                className={`mb-1.5 rounded-md border-l-2 pl-2 pr-1.5 py-1 text-[11px] ${
                  isOps
                    ? 'border-cyan-200 bg-cyan-700/30 text-cyan-50'
                    : 'border-cyan-500 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                <p className="font-medium">
                  {message.replyTo.sender === 'ops' ? 'Support' : 'Lawyer'}
                </p>
                <p className="truncate">{message.replyTo.preview}</p>
              </div>
            )}

            {message.body && (
              <p
                className={`text-sm whitespace-pre-wrap break-words ${
                  isOps ? 'text-white' : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {message.body}
              </p>
            )}

            {message.attachments && message.attachments.length > 0 && (
              <div className={`${message.body ? 'mt-2' : ''} space-y-1.5`}>
                {message.attachments.map((a) => (
                  <AttachmentBubble
                    key={a.id}
                    attachment={a}
                    isOps={isOps}
                    onSave={() => onSaveAttachment(a.id)}
                  />
                ))}
              </div>
            )}

            <div
              className={`flex items-center gap-1 mt-1 text-[10px] ${
                isOps ? 'text-cyan-100' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span>{formatTime(message.createdAt)}</span>
              {isOps && message.status && <StatusTicks status={message.status} />}
            </div>

            <button
              onClick={onReply}
              className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white dark:bg-slate-900 shadow border border-slate-200 dark:border-slate-700 ${
                isOps ? '-left-7' : '-right-7'
              }`}
              title="Reply"
            >
              <CornerUpLeft className="h-3 w-3 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AttachmentBubble({
  attachment,
  isOps,
  onSave,
}: {
  attachment: ChatAttachment
  isOps: boolean
  onSave: () => void
}) {
  const neutral = !isOps
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
        neutral
          ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
          : 'bg-cyan-700/40 border border-cyan-400/40'
      }`}
    >
      <div
        className={`h-8 w-8 rounded flex items-center justify-center flex-shrink-0 ${
          attachment.kind === 'image'
            ? neutral
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
              : 'bg-white/15 text-white'
            : neutral
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : 'bg-white/15 text-white'
        }`}
      >
        {attachment.kind === 'image' ? (
          <ImageIcon className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`text-xs font-medium truncate ${
            neutral ? 'text-slate-800 dark:text-slate-100' : 'text-white'
          }`}
        >
          {attachment.name}
        </p>
        <p
          className={`text-[11px] ${
            neutral ? 'text-slate-500 dark:text-slate-400' : 'text-cyan-100'
          }`}
        >
          {attachment.sizeLabel}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onSave}
          disabled={attachment.savedToDocuments}
          className={`inline-flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-medium transition-colors ${
            attachment.savedToDocuments
              ? neutral
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-emerald-200'
              : neutral
              ? 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
              : 'text-white hover:bg-white/20'
          }`}
          title={attachment.savedToDocuments ? 'Saved to incident documents' : 'Save to incident documents'}
        >
          <Save className="h-3 w-3" />
          {attachment.savedToDocuments ? 'Saved' : 'Save'}
        </button>
        <button
          className={`p-1 rounded transition-colors ${
            neutral
              ? 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-white hover:bg-white/20'
          }`}
          title="Download"
        >
          <Download className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function StatusTicks({ status }: { status: MessageStatus }) {
  if (status === 'sending') return <span className="opacity-80">·</span>
  if (status === 'failed')
    return <span className="text-red-200 font-medium">Failed</span>
  if (status === 'sent') return <Check className="h-3 w-3" />
  if (status === 'delivered') return <CheckCheck className="h-3 w-3" />
  if (status === 'read') return <CheckCheck className="h-3 w-3 text-sky-200" />
  return null
}
