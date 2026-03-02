import { Phone, Play, Clock, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface CallRecord {
  id: string
  direction: 'inbound' | 'outbound'
  callerName: string
  callerRole: string
  phoneNumber: string
  duration: string
  timestamp: string
  summary: string
  keyPoints: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  nextSteps?: string
}

const SAMPLE_CALLS: CallRecord[] = [
  {
    id: 'call-001',
    direction: 'outbound',
    callerName: 'Ramesh Sharma',
    callerRole: 'Subscriber Contact',
    phoneNumber: '+91 98765 43210',
    duration: '4:32',
    timestamp: '2024-01-20T11:30:00Z',
    summary: 'Called subscriber to inform about lawyer assignment and next steps. Subscriber acknowledged and confirmed availability for any document submission if required.',
    keyPoints: [
      'Lawyer Adv. Suresh Iyer assigned to the case',
      'Court hearing expected within 2-3 weeks',
      'Subscriber to keep RC and insurance documents ready',
      'No additional payment required at this stage'
    ],
    sentiment: 'positive',
    nextSteps: 'Wait for court date confirmation from lawyer'
  },
  {
    id: 'call-002',
    direction: 'inbound',
    callerName: 'Adv. Suresh Iyer',
    callerRole: 'Assigned Lawyer',
    phoneNumber: '+91 98112 34567',
    duration: '6:15',
    timestamp: '2024-01-19T15:00:00Z',
    summary: 'Lawyer called to discuss case details and confirm acceptance. Reviewed challan specifics and identified potential procedural issues that can be contested.',
    keyPoints: [
      'Challan issued without proper evidence documentation',
      'Speed measurement device calibration certificate missing',
      'Strong grounds for contesting the challan',
      'Lawyer will file representation within 5 working days'
    ],
    sentiment: 'positive',
    nextSteps: 'Lawyer to prepare and file court representation'
  },
  {
    id: 'call-003',
    direction: 'outbound',
    callerName: 'Ramesh Sharma',
    callerRole: 'Subscriber Contact',
    phoneNumber: '+91 98765 43210',
    duration: '3:45',
    timestamp: '2024-01-17T10:00:00Z',
    summary: 'Called to verify vehicle ownership and collect RC copy. Subscriber confirmed ownership and agreed to send documents via email.',
    keyPoints: [
      'Vehicle ownership confirmed for MH01AB1234',
      'RC copy to be sent via email',
      'Driver at time of violation was company employee',
      'Subscriber prefers contest over pay-and-close'
    ],
    sentiment: 'neutral',
    nextSteps: 'Wait for RC copy and proceed with screening'
  },
  {
    id: 'call-004',
    direction: 'outbound',
    callerName: 'Ramesh Sharma',
    callerRole: 'Subscriber Contact',
    phoneNumber: '+91 98765 43210',
    duration: '2:10',
    timestamp: '2024-01-15T14:30:00Z',
    summary: 'Initial call to inform subscriber about new challan received via API. Confirmed basic details and explained the process.',
    keyPoints: [
      'New challan MH012024789456 received',
      'Vehicle: MH01AB1234',
      'Fine amount: Rs. 2,500',
      'Subscriber aware of the incident'
    ],
    sentiment: 'neutral',
    nextSteps: 'Verify ownership and collect vehicle documents'
  }
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CallSummaryTab() {
  const [expandedCall, setExpandedCall] = useState<string | null>('call-001')

  const toggleExpand = (callId: string) => {
    setExpandedCall(expandedCall === callId ? null : callId)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Call Summary
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {SAMPLE_CALLS.length} calls recorded for this incident
          </p>
        </div>
      </div>

      {/* Call List */}
      <div className="space-y-4">
        {SAMPLE_CALLS.map((call) => {
          const isExpanded = expandedCall === call.id

          return (
            <div
              key={call.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Call Header */}
              <button
                onClick={() => toggleExpand(call.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    call.direction === 'inbound'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30'
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <Phone className={`h-4 w-4 ${
                      call.direction === 'inbound'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {call.callerName}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                        {call.callerRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(call.timestamp)}
                      </span>
                      <span>{formatTime(call.timestamp)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {call.duration}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        call.direction === 'inbound'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {call.direction === 'inbound' ? 'Incoming' : 'Outgoing'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.sentiment === 'positive'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : call.sentiment === 'negative'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {call.sentiment.charAt(0).toUpperCase() + call.sentiment.slice(1)}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="pt-4 space-y-4">
                    {/* Summary */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Summary
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {call.summary}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Key Points
                      </h4>
                      <ul className="space-y-1.5">
                        {call.keyPoints.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Steps */}
                    {call.nextSteps && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                          Next Steps
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          {call.nextSteps}
                        </p>
                      </div>
                    )}

                    {/* Play Recording Button */}
                    <div className="flex items-center gap-3 pt-2">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
                        <Play className="h-4 w-4" />
                        Play Recording
                      </button>
                      <span className="text-xs text-slate-400">
                        {call.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
