import { useState } from 'react'
import { X } from 'lucide-react'
import type { Lead } from '../types'

interface EditLeadModalProps {
  lead: Lead
  leadSources: string[]
  serviceTypes: string[]
  serviceSubTypes: Record<string, string[]>
  onSubmit: (id: string, leadData: Partial<Lead>) => void
  onClose: () => void
}

export function EditLeadModal({ lead, leadSources, serviceTypes, serviceSubTypes, onSubmit, onClose }: EditLeadModalProps) {
  const [formData, setFormData] = useState({
    source: lead.source,
    type: lead.type,
    subType: lead.subType,
    lotsFor: lead.lotsFor,
    numberOfTrucks: lead.numberOfTrucks,
    phoneNumber: lead.phoneNumber,
    country: lead.country,
    state: lead.state,
    city: lead.city,
    companyAlias: lead.companyAlias,
    companyName: lead.companyName,
    emailId: lead.emailId,
    contactPerson: lead.contactPerson,
    gstNumber: lead.gstNumber,
    area: lead.area,
    addressLane: lead.addressLane,
    pinCode: lead.pinCode,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const newErrors: Record<string, string> = {}
    if (!formData.source) newErrors.source = 'Source is required'
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.subType) newErrors.subType = 'Sub Type is required'
    if (!formData.lotsFor) newErrors.lotsFor = 'LOTS For is required'
    if (!formData.numberOfTrucks || formData.numberOfTrucks <= 0) newErrors.numberOfTrucks = 'Number of Trucks must be greater than 0'
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.companyAlias) newErrors.companyAlias = 'Company Alias is required'
    if (!formData.companyName) newErrors.companyName = 'Company Name is required'
    if (!formData.emailId) newErrors.emailId = 'Email ID is required'
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact Person is required'
    if (!formData.gstNumber) newErrors.gstNumber = 'GST Number is required'
    if (!formData.area) newErrors.area = 'Area is required'
    if (!formData.addressLane) newErrors.addressLane = 'Address Lane is required'
    if (!formData.pinCode) newErrors.pinCode = 'Pin Code is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(lead.id, formData)
  }

  const availableSubTypes = formData.type ? serviceSubTypes[formData.type] || [] : []

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">Edit Lead</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">{lead.companyAlias} • {lead.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* Lead Classification */}
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
                    className={`w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
                      errors.source ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
                  >
                    <option value="">Select Source</option>
                    {leadSources.map(source => (
                      <option key={source} value={source}>
                        {source}
                      </option>
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
                    className={`w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
                      errors.type ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
                  >
                    <option value="">Select Type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Sub Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subType}
                    onChange={e => setFormData({ ...formData, subType: e.target.value })}
                    disabled={!formData.type}
                    className={`w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
                      errors.subType ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
                  >
                    <option value="">Select Sub Type</option>
                    {availableSubTypes.map(subType => (
                      <option key={subType} value={subType}>
                        {subType}
                      </option>
                    ))}
                  </select>
                  {errors.subType && <p className="mt-1 text-xs text-red-500">{errors.subType}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    LOTS For <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lotsFor}
                    onChange={e => setFormData({ ...formData, lotsFor: e.target.value })}
                    placeholder="e.g., Commercial Vehicles"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.lotsFor ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.lotsFor && <p className="mt-1 text-xs text-red-500">{errors.lotsFor}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Number of Trucks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfTrucks || ''}
                    onChange={e => setFormData({ ...formData, numberOfTrucks: parseInt(e.target.value) || 0 })}
                    min="1"
                    placeholder="0"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.numberOfTrucks ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.numberOfTrucks && <p className="mt-1 text-xs text-red-500">{errors.numberOfTrucks}</p>}
                </div>
              </div>
            </div>

            {/* Company Information */}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.companyAlias ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.companyName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.gstNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.gstNumber && <p className="mt-1 text-xs text-red-500">{errors.gstNumber}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full name"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.contactPerson ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.phoneNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.emailId ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.emailId && <p className="mt-1 text-xs text-red-500">{errors.emailId}</p>}
                </div>
              </div>
            </div>

            {/* Location Information */}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.country ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.state ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.city ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.area ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.addressLane ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
                      errors.pinCode ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.pinCode && <p className="mt-1 text-xs text-red-500">{errors.pinCode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
