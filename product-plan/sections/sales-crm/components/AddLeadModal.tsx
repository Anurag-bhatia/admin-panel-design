import { useState } from 'react'
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react'
import type { LeadFormData } from '../types'

interface AddLeadModalProps {
  leadSources: string[]
  serviceTypes: string[]
  serviceSubTypes: Record<string, string[]>
  onSubmit: (leadData: LeadFormData) => void
  onClose: () => void
}

const STEPS = [
  { id: 0, title: 'Classification', shortTitle: 'Classification' },
  { id: 1, title: 'Company', shortTitle: 'Company' },
  { id: 2, title: 'POC', shortTitle: 'POC' },
  { id: 3, title: 'Location', shortTitle: 'Location' },
]

export function AddLeadModal({ leadSources, serviceTypes, serviceSubTypes, onSubmit, onClose }: AddLeadModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<LeadFormData>({
    source: '',
    type: '',
    subType: '',
    lotsFor: '',
    numberOfTrucks: 0,
    phoneNumber: '',
    country: 'India',
    state: '',
    city: '',
    companyAlias: '',
    companyName: '',
    emailId: '',
    contactPerson: '',
    gstNumber: '',
    area: '',
    addressLane: '',
    pinCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.source) newErrors.source = 'Source is required'
      if (!formData.type) newErrors.type = 'Type is required'
      if (!formData.subType) newErrors.subType = 'Lead Type is required'
      if (!formData.lotsFor) newErrors.lotsFor = 'Service Type is required'
      if (!formData.numberOfTrucks || formData.numberOfTrucks <= 0) newErrors.numberOfTrucks = 'Number of Vehicles must be greater than 0'
    } else if (step === 1) {
      if (!formData.companyAlias) newErrors.companyAlias = 'Company Alias is required'
      if (!formData.companyName) newErrors.companyName = 'Company Name is required'
      if (!formData.gstNumber) newErrors.gstNumber = 'GST Number is required'
    } else if (step === 2) {
      if (!formData.contactPerson) newErrors.contactPerson = 'POC Name is required'
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required'
      if (!formData.emailId) newErrors.emailId = 'Email ID is required'
    } else if (step === 3) {
      if (!formData.country) newErrors.country = 'Country is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.area) newErrors.area = 'Area is required'
      if (!formData.addressLane) newErrors.addressLane = 'Address Lane is required'
      if (!formData.pinCode) newErrors.pinCode = 'Pin Code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setErrors({})
      setCurrentStep(step)
    }
  }

  const availableSubTypes = formData.type ? serviceSubTypes[formData.type] || [] : []

  const selectClass = (hasError: boolean) =>
    `w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
      hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
      hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">Add New Lead</h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </button>
        </div>

        {/* Stepper Header */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
          <div className="flex items-center">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className={`flex items-center gap-2 ${step.id < currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${
                      step.id < currentStep
                        ? 'bg-cyan-600 text-white'
                        : step.id === currentStep
                        ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.id < currentStep ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : step.id + 1}
                  </div>
                  <span
                    className={`hidden sm:block text-xs sm:text-sm font-medium whitespace-nowrap ${
                      step.id <= currentStep
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-3">
                    <div
                      className={`h-0.5 rounded-full transition-colors ${
                        step.id < currentStep ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="sm:hidden text-xs text-slate-500 dark:text-slate-400 mt-2">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </p>
        </div>

        {/* Step Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          {currentStep === 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Lead Classification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Source <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                    className={selectClass(!!errors.source)}
                  >
                    <option value="">Select Source</option>
                    {leadSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  {errors.source && <p className="mt-1 text-xs text-red-500">{errors.source}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value, subType: '' })}
                    className={selectClass(!!errors.type)}
                  >
                    <option value="">Select Type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Lead Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subType}
                    onChange={e => setFormData({ ...formData, subType: e.target.value })}
                    disabled={!formData.type}
                    className={`${selectClass(!!errors.subType)} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select Lead Type</option>
                    {availableSubTypes.map(subType => (
                      <option key={subType} value={subType}>{subType}</option>
                    ))}
                  </select>
                  {errors.subType && <p className="mt-1 text-xs text-red-500">{errors.subType}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.lotsFor}
                    onChange={e => setFormData({ ...formData, lotsFor: e.target.value })}
                    className={selectClass(!!errors.lotsFor)}
                  >
                    <option value="">Select Service Type</option>
                    <option value="CAAS">CAAS</option>
                    <option value="LAAS">LAAS</option>
                    <option value="Wills">Wills</option>
                    <option value="LOTS247">LOTS247</option>
                  </select>
                  {errors.lotsFor && <p className="mt-1 text-xs text-red-500">{errors.lotsFor}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Number of Vehicles <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfTrucks || ''}
                    onChange={e => setFormData({ ...formData, numberOfTrucks: parseInt(e.target.value) || 0 })}
                    min="1"
                    placeholder="0"
                    className={inputClass(!!errors.numberOfTrucks)}
                  />
                  {errors.numberOfTrucks && <p className="mt-1 text-xs text-red-500">{errors.numberOfTrucks}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Company Alias <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyAlias}
                    onChange={e => setFormData({ ...formData, companyAlias: e.target.value })}
                    placeholder="Short name"
                    className={inputClass(!!errors.companyAlias)}
                  />
                  {errors.companyAlias && <p className="mt-1 text-xs text-red-500">{errors.companyAlias}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Full legal name"
                    className={inputClass(!!errors.companyName)}
                  />
                  {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    GST Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="27AABCF1234M1Z5"
                    className={inputClass(!!errors.gstNumber)}
                  />
                  {errors.gstNumber && <p className="mt-1 text-xs text-red-500">{errors.gstNumber}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">POC Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    POC Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full name"
                    className={inputClass(!!errors.contactPerson)}
                  />
                  {errors.contactPerson && <p className="mt-1 text-xs text-red-500">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+919876543210"
                    className={inputClass(!!errors.phoneNumber)}
                  />
                  {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={e => setFormData({ ...formData, emailId: e.target.value })}
                    placeholder="email@company.com"
                    className={inputClass(!!errors.emailId)}
                  />
                  {errors.emailId && <p className="mt-1 text-xs text-red-500">{errors.emailId}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="India"
                    className={inputClass(!!errors.country)}
                  />
                  {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Maharashtra"
                    className={inputClass(!!errors.state)}
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                    className={inputClass(!!errors.city)}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Andheri East"
                    className={inputClass(!!errors.area)}
                  />
                  {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Address Lane <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLane}
                    onChange={e => setFormData({ ...formData, addressLane: e.target.value })}
                    placeholder="Plot No. 15, MIDC Industrial Area"
                    className={inputClass(!!errors.addressLane)}
                  />
                  {errors.addressLane && <p className="mt-1 text-xs text-red-500">{errors.addressLane}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="400069"
                    className={inputClass(!!errors.pinCode)}
                  />
                  {errors.pinCode && <p className="mt-1 text-xs text-red-500">{errors.pinCode}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div>
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
          <div>
            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Add Lead
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
