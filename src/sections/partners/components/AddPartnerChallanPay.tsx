import { useState } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import type { AddPartnerChallanPayProps } from '@/../product/sections/partners/types'

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
]

const businessTypes = [
  'Sole Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited',
]

const permissionsList = ['Subscribers', 'Incidents', 'Vehicles', 'Challans', 'Drivers', 'Partners', 'Wallet', 'Team', 'Allow Offline Payment', 'View Challans', 'Locations & QRs']
const dashboardPermissionsList = ['Subscribers', 'Vehicles', 'Sales', 'Sales Current Month', 'Sales Today', 'Total Incidents', 'L1 Incidents', 'L2 Incidents', 'L3 Incidents', 'Win Incidents', 'Hold Incidents']
const banks = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'SBI', 'Yes Bank', 'Federal Bank']

export function AddPartnerChallanPay({ onSubmit, onCancel }: AddPartnerChallanPayProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 — Basic Info
    primaryContact: '',
    entityType: '' as 'business' | 'individual' | '',
    businessType: '',
    state: '',
    pincode: '',
    email: '',
    // Step 2 — Permissions
    permissions: [] as string[],
    dashboardPermissions: [] as string[],
    // Step 3 — Bank
    bankName: '',
    bankAccountNumber: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: 'permissions' | 'dashboardPermissions', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }))
  }

  const handleNext = () => { if (step < 3) setStep(step + 1) }
  const handlePrev = () => { if (step > 1) setStep(step - 1) }

  const isStep1Valid = formData.primaryContact && formData.entityType && formData.businessType && formData.state && formData.pincode && formData.email
  const isStep2Valid = formData.permissions.length > 0 && formData.dashboardPermissions.length > 0
  const isStep3Valid = formData.bankAccountNumber && formData.bankName

  const handleSubmit = () => {
    if (isStep3Valid) onSubmit?.(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Add ChallanPay Partner</h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-start mb-8 relative">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center z-10" style={{ flex: '0 0 auto' }}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm mb-2 transition-colors ${
                  step >= s
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {s}
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center whitespace-nowrap">
                  {['Basic Info', 'Permissions', 'Bank'][s - 1]}
                </p>
              </div>
            ))}
            {/* Connecting lines */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-5" style={{ zIndex: 0 }}>
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-0.5 transition-colors ${
                    step > s ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  style={{ width: 'calc(50% - 20px)', marginLeft: s === 1 ? '20px' : '10px', marginRight: '10px' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Primary Contact Number</label>
                <input
                  type="tel"
                  value={formData.primaryContact}
                  onChange={(e) => handleChange('primaryContact', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="+919876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Type</label>
                <div className="flex gap-4">
                  {(['business', 'individual'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="entityType"
                        checked={formData.entityType === type}
                        onChange={() => handleChange('entityType', type)}
                        className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 dark:border-slate-600"
                      />
                      <span className="text-sm text-slate-900 dark:text-slate-50 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select state</option>
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="110001"
                    maxLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="partner@example.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Permissions */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Permissions</h3>

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-3">Permissions</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {permissionsList.map((permission) => (
                    <label key={permission} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handleCheckboxChange('permissions', permission)}
                        className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-slate-900 dark:text-slate-50">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-3">Dashboard Permissions</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {dashboardPermissionsList.map((permission) => (
                    <label key={permission} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dashboardPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange('dashboardPermissions', permission)}
                        className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-slate-900 dark:text-slate-50">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Bank Account */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Bank Account</h3>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Bank Name</label>
                <select
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Bank Account Number</label>
                <input
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleChange('bankAccountNumber', e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  placeholder="0123456789012345"
                />
              </div>

              <div className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <p className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-2">Partner Permissions</p>
                <ul className="text-sm text-cyan-800 dark:text-cyan-200 space-y-1">
                  <li>&#10003; Add and manage subscribers</li>
                  <li>&#10003; View their linked subscribers</li>
                  <li>&#10003; View incidents (read-only)</li>
                  <li>&#10003; Access dashboard with metrics</li>
                  <li>&#10007; No internal operations access</li>
                  <li>&#10007; No financial controls</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            Step {step} of 3
          </div>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStep3Valid}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Create Partner
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
