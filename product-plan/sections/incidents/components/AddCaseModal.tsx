import { useState } from 'react'
import { X, Search } from 'lucide-react'
import type { Subscriber, IncidentType, CaseCategory, IncidentSource } from '../types'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
]

const CASE_TYPE_OPTIONS: { value: CaseCategory; label: string }[] = [
  { value: 'iaStart', label: 'IA Start' },
  { value: 'wills24', label: 'Wills 24' },
  { value: 'legalNotice', label: 'Legal Notice' },
  { value: 'others', label: 'Others' },
  { value: 'litigation', label: 'Litigation' },
  { value: 'laas', label: 'LAAS' },
  { value: 'accident', label: 'Accident' },
  { value: 'liveChallan', label: 'Live Challan' },
  { value: 'oldChallan', label: 'Old Challan' },
  { value: 'ndps', label: 'NDPS' },
  { value: 'employmentLabour', label: 'Employment and Labour Case' },
]

interface AddCaseModalProps {
  subscribers: Subscriber[]
  sources: IncidentSource[]
  onSubmit?: (caseData: {
    workType: 'case'
    subscriberId: string
    subscriberName: string
    vehicle: string
    mobileNumber?: string
    type: IncidentType
    caseCategory: CaseCategory
    authorityInvolved?: string
    state: string
    pincode?: string
    address?: string
    reporterName?: string
    incidentStory?: string
    source: IncidentSource
    challanNumber: string
    challanType: 'court'
    amount: number
    offence: string | null
    assignedAgentId: string | null
    assignedLawyerId: string | null
  }) => void
  onCancel?: () => void
}

export function AddCaseModal({ subscribers, sources, onSubmit, onCancel }: AddCaseModalProps) {
  const [subscriberId, setSubscriberId] = useState('')
  const [subscriberSearch, setSubscriberSearch] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [type, setType] = useState<IncidentType>('onSpot')
  const [caseCategory, setCaseCategory] = useState<CaseCategory | ''>('')
  const [authorityInvolved, setAuthorityInvolved] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [incidentStory, setIncidentStory] = useState('')
  const [source, setSource] = useState<IncidentSource>('Manual')

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.name.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
    sub.id.toLowerCase().includes(subscriberSearch.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!subscriberId || !vehicle || !caseCategory || !state) {
      return
    }

    onSubmit?.({
      workType: 'case',
      subscriberId,
      subscriberName: subscribers.find((s) => s.id === subscriberId)?.name || '',
      vehicle,
      mobileNumber: mobileNumber || undefined,
      type,
      caseCategory: caseCategory as CaseCategory,
      authorityInvolved: authorityInvolved || undefined,
      state,
      pincode: pincode || undefined,
      address: address || undefined,
      reporterName: reporterName || undefined,
      incidentStory: incidentStory || undefined,
      source,
      challanNumber: '',
      challanType: 'court',
      amount: 0,
      offence: null,
      assignedAgentId: null,
      assignedLawyerId: null,
    })
  }

  const selectedSubscriber = subscribers.find((s) => s.id === subscriberId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Add New Case
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subscriber */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Subscriber <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  placeholder="Search by subscriber name or ID"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                />
              </div>

              {subscriberSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
                  {filteredSubscribers.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                      No subscribers found
                    </div>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setSubscriberId(sub.id)
                          setSubscriberSearch(sub.name)
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {sub.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {sub.id} &bull; {sub.contactPerson}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {selectedSubscriber && (
              <div className="mt-2 p-3 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                <div className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                  {selectedSubscriber.name}
                </div>
                <div className="text-xs text-cyan-700 dark:text-cyan-400 mt-1">
                  {selectedSubscriber.companyAlias} &bull; {selectedSubscriber.contactPerson}
                </div>
              </div>
            )}
          </div>

          {/* Vehicle Number and Mobile Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value.toUpperCase())}
                placeholder="DL01AB1234"
                className="w-full px-4 py-2.5 text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Type, Case Type, Authority Involved */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as IncidentType)}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                required
              >
                <option value="onSpot">On Spot</option>
                <option value="onCall">On Call</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Case Type <span className="text-red-500">*</span>
              </label>
              <select
                value={caseCategory}
                onChange={(e) => setCaseCategory(e.target.value as CaseCategory)}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                required
              >
                <option value="">Select Case Type</option>
                {CASE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Authority Involved
              </label>
              <input
                type="text"
                value={authorityInvolved}
                onChange={(e) => setAuthorityInvolved(e.target.value)}
                placeholder="e.g. Traffic Police, RTO"
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* State and Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                required
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="400001"
                maxLength={6}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Location of the incident"
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Reporter Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Reporter Name
            </label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="Name of the person reporting"
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Incident Story */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Incident Story
            </label>
            <textarea
              value={incidentStory}
              onChange={(e) => setIncidentStory(e.target.value)}
              placeholder="Describe what happened..."
              rows={4}
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!subscriberId || !vehicle || !caseCategory || !state}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Add Case
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
