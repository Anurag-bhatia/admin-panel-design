import { useState } from 'react'
import { X } from 'lucide-react'
import type { Subscriber, User, Partner } from '../types'

interface AddSubscriberModalProps {
  users: User[]
  partners: Partner[]
  subscriberSources: string[]
  subscriberTypes: string[]
  subscriberSubTypes: Record<string, string[]>
  onSubmit: (data: Omit<Subscriber, 'id' | 'createdDate' | 'lastUpdated' | 'lastLogin' | 'subscriptionId' | 'status'>) => void
  onClose: () => void
}

export function AddSubscriberModal({
  users,
  partners,
  subscriberSources,
  subscriberTypes,
  subscriberSubTypes,
  onSubmit,
  onClose
}: AddSubscriberModalProps) {
  const [formData, setFormData] = useState({
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
    if (!formData.subscriberName) newErrors.subscriberName = 'Subscriber Name is required'
    if (!formData.emailId) newErrors.emailId = 'Email ID is required'
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact Person is required'
    if (!formData.gstNumber) newErrors.gstNumber = 'GST Number is required'
    if (!formData.area) newErrors.area = 'Area is required'
    if (!formData.addressLane) newErrors.addressLane = 'Address Lane is required'
    if (!formData.pinCode) newErrors.pinCode = 'Pin Code is required'
    if (!formData.assignedOwner) newErrors.assignedOwner = 'Assigned Owner is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const availableSubTypes = formData.type ? subscriberSubTypes[formData.type] || [] : []

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* Classification */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Subscriber Classification</h3>
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
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    <option value="">Select Source</option>
                    {subscriberSources.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  {errors.source && <p className="text-xs text-red-500 mt-1">{errors.source}</p>}
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
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    <option value="">Select Type</option>
                    {subscriberTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
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
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select Sub Type</option>
                    {availableSubTypes.map((subType) => (
                      <option key={subType} value={subType}>{subType}</option>
                    ))}
                  </select>
                  {errors.subType && <p className="text-xs text-red-500 mt-1">{errors.subType}</p>}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.lotsFor ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.lotsFor && <p className="text-xs text-red-500 mt-1">{errors.lotsFor}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Number of Trucks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfTrucks || ''}
                    onChange={e => setFormData({ ...formData, numberOfTrucks: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.numberOfTrucks ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.numberOfTrucks && <p className="text-xs text-red-500 mt-1">{errors.numberOfTrucks}</p>}
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
                    placeholder="e.g., Fastlane Logistics"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.companyAlias ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.companyAlias && <p className="text-xs text-red-500 mt-1">{errors.companyAlias}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Subscriber Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subscriberName}
                    onChange={e => setFormData({ ...formData, subscriberName: e.target.value })}
                    placeholder="e.g., Fastlane Logistics Pvt. Ltd."
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.subscriberName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.subscriberName && <p className="text-xs text-red-500 mt-1">{errors.subscriberName}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    GST Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="e.g., 27AABCF1234M1Z5"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.gstNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber}</p>}
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
                    placeholder="e.g., Rajesh Kumar"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.contactPerson ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={e => setFormData({ ...formData, emailId: e.target.value })}
                    placeholder="operations@company.com"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.emailId ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.emailId && <p className="text-xs text-red-500 mt-1">{errors.emailId}</p>}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.country ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g., Maharashtra"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.state ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Mumbai"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.city ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g., Andheri East"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.area ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Address Lane <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLane}
                    onChange={e => setFormData({ ...formData, addressLane: e.target.value })}
                    placeholder="Plot No., Building Name"
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.addressLane ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.addressLane && <p className="text-xs text-red-500 mt-1">{errors.addressLane}</p>}
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
                    className={`w-full px-3 py-2 bg-white dark:bg-slate-950 border ${
                      errors.pinCode ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.pinCode && <p className="text-xs text-red-500 mt-1">{errors.pinCode}</p>}
                </div>
              </div>
            </div>

            {/* Assignment & Additional */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Assignment & Additional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Assigned Owner <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.assignedOwner}
                    onChange={e => setFormData({ ...formData, assignedOwner: e.target.value })}
                    className={`w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${
                      errors.assignedOwner ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    <option value="">Select Owner</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.fullName}</option>
                    ))}
                  </select>
                  {errors.assignedOwner && <p className="text-xs text-red-500 mt-1">{errors.assignedOwner}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
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

                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Driving License Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.drivingLicenseNumber || ''}
                    onChange={e => setFormData({ ...formData, drivingLicenseNumber: e.target.value || null })}
                    placeholder="MH01-20230012345"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Add Subscriber
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
