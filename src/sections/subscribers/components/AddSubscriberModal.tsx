import { useState } from 'react'
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react'
import type { Subscriber, User, Partner } from '@/../product/sections/subscribers/types'

interface AddSubscriberModalProps {
  users: User[]
  partners: Partner[]
  subscriberSources: string[]
  subscriberTypes: string[]
  subscriberSubTypes: Record<string, string[]>
  onSubmit: (data: Omit<Subscriber, 'id' | 'createdDate' | 'lastUpdated' | 'lastLogin' | 'subscriptionId' | 'status'>) => void
  onClose: () => void
}

const STEPS = [
  { id: 'classification', label: 'Classification' },
  { id: 'contact', label: 'POC' },
  { id: 'location', label: 'Location' },
  { id: 'assignment', label: 'Assignment' },
]

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
    hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
  } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`

const selectClass = (hasError: boolean) =>
  `w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
    hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
  } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`

const labelClass = 'block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2'

export function AddSubscriberModal({
  users,
  partners,
  subscriberSources,
  subscriberTypes,
  subscriberSubTypes,
  onSubmit,
  onClose
}: AddSubscriberModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompany, setIsCompany] = useState(false)
  const [formData, setFormData] = useState({
    source: '',
    type: '',
    subType: '',
    serviceType: '',
    numberOfVehicles: 0,
    phoneNumber: '',
    country: 'India',
    state: '',
    city: '',
    companyAlias: '',
    subscriberName: '',
    emailId: '',
    contactPerson: '',
    gstNumber: '',
    area: '',
    addressLane: '',
    pinCode: '',
    assignedOwner: '',
    partnerId: null as string | null,
    drivingLicenseNumber: null as string | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const REQUIRED_FIELDS: Record<string, string> = {
    source: 'Source is required',
    type: 'Type is required',
    subType: 'Sub Type is required',
    serviceType: 'Service Type is required',
    numberOfVehicles: 'Number of Vehicles must be greater than 0',
    phoneNumber: 'Phone Number is required',
    country: 'Country is required',
    state: 'State is required',
    city: 'City is required',
    companyAlias: 'Company Alias is required',
    subscriberName: 'Subscriber Name is required',
    emailId: 'Email ID is required',
    contactPerson: 'Contact Person is required',
    gstNumber: 'GST Number is required',
    area: 'Area is required',
    addressLane: 'Address Lane is required',
    pinCode: 'Pin Code is required',
    assignedOwner: 'Assigned Owner is required',
  }

  const getStepFields = (stepId: string): string[] => {
    switch (stepId) {
      case 'classification': {
        const base = ['subscriberName', 'source', 'type', 'subType', 'serviceType', 'numberOfVehicles']
        return isCompany ? [...base, 'companyAlias', 'gstNumber'] : base
      }
      case 'contact':
        return ['contactPerson', 'phoneNumber', 'emailId']
      case 'location':
        return ['country', 'state', 'city', 'area', 'addressLane', 'pinCode']
      case 'assignment':
        return ['assignedOwner']
      default:
        return []
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const stepId = STEPS[stepIndex].id
    const fields = getStepFields(stepId)
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      const value = (formData as any)[field]
      if (field === 'numberOfVehicles') {
        if (!value || value <= 0) newErrors[field] = REQUIRED_FIELDS[field]
      } else if (REQUIRED_FIELDS[field] && !value) {
        newErrors[field] = REQUIRED_FIELDS[field]
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
    }
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setErrors({})
      setCurrentStep(index)
    }
  }

  const availableSubTypes = formData.type ? subscriberSubTypes[formData.type] || [] : []
  const isLastStep = currentStep === STEPS.length - 1

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">Add New Subscriber</h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-4 sm:px-6 pt-5 pb-2">
          <div className="flex items-center">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  className={`flex items-center gap-2 ${index < currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${
                      index < currentStep
                        ? 'bg-cyan-600 text-white'
                        : index === currentStep
                        ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {index < currentStep ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : index + 1}
                  </div>
                  <span
                    className={`hidden sm:block text-xs sm:text-sm font-medium whitespace-nowrap ${
                      index <= currentStep
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      index < currentStep ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto max-h-[calc(100vh-320px)]">
          {/* Step 1: Classification */}
          {currentStep === 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Subscriber Classification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Subscriber Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subscriberName}
                    onChange={e => setFormData({ ...formData, subscriberName: e.target.value })}
                    placeholder="e.g., Fastlane Logistics Pvt. Ltd."
                    className={inputClass(!!errors.subscriberName)}
                  />
                  {errors.subscriberName && <p className="text-xs text-red-500 mt-1">{errors.subscriberName}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Source <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                    className={selectClass(!!errors.source)}
                  >
                    <option value="">Select Source</option>
                    {subscriberSources.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  {errors.source && <p className="text-xs text-red-500 mt-1">{errors.source}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value, subType: '' })}
                    className={selectClass(!!errors.type)}
                  >
                    <option value="">Select Type</option>
                    {subscriberTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Sub Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subType}
                    onChange={e => setFormData({ ...formData, subType: e.target.value })}
                    disabled={!formData.type}
                    className={`${selectClass(!!errors.subType)} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select Sub Type</option>
                    {availableSubTypes.map((subType) => (
                      <option key={subType} value={subType}>{subType}</option>
                    ))}
                  </select>
                  {errors.subType && <p className="text-xs text-red-500 mt-1">{errors.subType}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className={selectClass(!!errors.serviceType)}
                  >
                    <option value="">Select Service Type</option>
                    <option value="CaaS">CaaS</option>
                    <option value="LaaS">LaaS</option>
                    <option value="Wills">Wills</option>
                    <option value="LOTS247">LOTS247</option>
                  </select>
                  {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Number of Vehicles <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfVehicles || ''}
                    onChange={e => setFormData({ ...formData, numberOfVehicles: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className={inputClass(!!errors.numberOfVehicles)}
                  />
                  {errors.numberOfVehicles && <p className="text-xs text-red-500 mt-1">{errors.numberOfVehicles}</p>}
                </div>
              </div>

              {/* Company Checkbox */}
              <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isCompany
                        ? 'bg-cyan-600 border-cyan-600'
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500'
                    }`}
                    onClick={() => setIsCompany(!isCompany)}
                  >
                    {isCompany && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => setIsCompany(!isCompany)}
                  >
                    Subscriber is operating as a company
                  </span>
                </label>
              </div>

              {/* Company Fields (conditional) */}
              {isCompany && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Company Alias <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyAlias}
                      onChange={e => setFormData({ ...formData, companyAlias: e.target.value })}
                      placeholder="e.g., Fastlane Logistics"
                      className={inputClass(!!errors.companyAlias)}
                    />
                    {errors.companyAlias && <p className="text-xs text-red-500 mt-1">{errors.companyAlias}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>
                      GST Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.gstNumber}
                      onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                      placeholder="e.g., 27AABCF1234M1Z5"
                      className={inputClass(!!errors.gstNumber)}
                    />
                    {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">POC Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g., Rajesh Kumar"
                    className={inputClass(!!errors.contactPerson)}
                  />
                  {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+918306712275"
                    className={inputClass(!!errors.phoneNumber)}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={e => setFormData({ ...formData, emailId: e.target.value })}
                    placeholder="operations@company.com"
                    className={inputClass(!!errors.emailId)}
                  />
                  {errors.emailId && <p className="text-xs text-red-500 mt-1">{errors.emailId}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location Information */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className={inputClass(!!errors.country)}
                  />
                  {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g., Maharashtra"
                    className={inputClass(!!errors.state)}
                  />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Mumbai"
                    className={inputClass(!!errors.city)}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g., Andheri East"
                    className={inputClass(!!errors.area)}
                  />
                  {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Address Lane <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLane}
                    onChange={e => setFormData({ ...formData, addressLane: e.target.value })}
                    placeholder="Plot No., Building Name"
                    className={inputClass(!!errors.addressLane)}
                  />
                  {errors.addressLane && <p className="text-xs text-red-500 mt-1">{errors.addressLane}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="400069"
                    className={inputClass(!!errors.pinCode)}
                  />
                  {errors.pinCode && <p className="text-xs text-red-500 mt-1">{errors.pinCode}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Assignment & Additional */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Assignment & Additional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    SPOC <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.assignedOwner}
                    onChange={e => setFormData({ ...formData, assignedOwner: e.target.value })}
                    className={selectClass(!!errors.assignedOwner)}
                  >
                    <option value="">Select SPOC</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.fullName}</option>
                    ))}
                  </select>
                  {errors.assignedOwner && <p className="text-xs text-red-500 mt-1">{errors.assignedOwner}</p>}
                </div>

                <div>
                  <label className={labelClass}>
                    Partner (Optional)
                  </label>
                  <select
                    value={formData.partnerId || ''}
                    onChange={e => setFormData({ ...formData, partnerId: e.target.value || null })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">None</option>
                    {partners.map((partner) => (
                      <option key={partner.id} value={partner.id}>{partner.name}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Add Subscriber
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
