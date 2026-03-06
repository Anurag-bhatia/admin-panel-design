import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, Upload, FileText, Trash2 } from 'lucide-react'
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
  'Individual', 'Proprietorship', 'Partnership', 'Private Limited', 'LLP',
]

const permissionsList = ['Subscribers', 'Incidents', 'Vehicles', 'Challans', 'Drivers', 'Partners', 'Wallet', 'Team', 'Allow Offline Payment', 'View Challans', 'Locations & QRs']
const dashboardPermissionsList = ['Subscribers', 'Vehicles', 'Sales', 'Sales Current Month', 'Sales Today', 'Total Incidents', 'L1 Incidents', 'L2 Incidents', 'L3 Incidents', 'Win Incidents', 'Hold Incidents']
const banks = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'SBI', 'Yes Bank', 'Federal Bank']

export function AddPartnerChallanPay({ onSubmit, onCancel }: AddPartnerChallanPayProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    primaryContact: '',
    businessName: '',
    businessType: '',
    state: '',
    pincode: '',
    email: '',
    permissions: [] as string[],
    dashboardPermissions: [] as string[],
    accountHolder: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
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

  const [documents, setDocuments] = useState<{ id: string; category: string; fileName: string }[]>([])
  const [docCategory, setDocCategory] = useState('')

  const handleNext = () => { if (step < 4) setStep(step + 1) }
  const handlePrev = () => { if (step > 1) setStep(step - 1) }

  const isStep1Valid = formData.primaryContact && formData.businessType && formData.state && formData.pincode && formData.email
  const isStep2Valid = formData.permissions.length > 0 && formData.dashboardPermissions.length > 0
  const isStep3Valid = formData.bankAccountNumber && formData.bankName

  const handleSubmit = () => {
    onSubmit?.(formData)
  }

  const handleDocUpload = (file: File) => {
    setDocuments(prev => [...prev, { id: `doc-${Date.now()}`, category: docCategory, fileName: file.name }])
    setDocCategory('')
  }

  const handleRemoveDoc = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
  }

  const docCategories = ['PAN Card', 'Aadhaar Card', 'GST Certificate', 'Partnership Agreement', 'Bank Statement', 'Address Proof', 'Other']

  const inputCls = "w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  const selectCls = `${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Add ChallanPay Partner</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-start mb-8 relative">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center z-10" style={{ flex: '0 0 auto' }}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm mb-2 transition-colors ${
                  step >= s ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {s}
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center whitespace-nowrap">
                  {['Basic Info', 'Permissions', 'Bank', 'Documents'][s - 1]}
                </p>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-5" style={{ zIndex: 0 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-0.5 transition-colors ${step > s ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                  style={{ width: 'calc(33.333% - 20px)', marginLeft: s === 1 ? '20px' : '10px', marginRight: '10px' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Primary Contact Number</label>
                  <input type="tel" value={formData.primaryContact} onChange={(e) => handleChange('primaryContact', e.target.value)}
                    className={inputCls} placeholder="+919876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Business/Individual Name</label>
                  <input type="text" value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)}
                    className={inputCls} placeholder="Enter name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Business Type</label>
                <select value={formData.businessType} onChange={(e) => handleChange('businessType', e.target.value)} className={selectCls}>
                  <option value="">Select business type</option>
                  {businessTypes.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">State</label>
                  <select value={formData.state} onChange={(e) => handleChange('state', e.target.value)} className={selectCls}>
                    <option value="">Select state</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Pincode</label>
                  <input type="text" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={inputCls} placeholder="110001" maxLength={6} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                  className={inputCls} placeholder="partner@example.com" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-3">Permissions</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {permissionsList.map((permission) => (
                    <label key={permission} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                      <input type="checkbox" checked={formData.permissions.includes(permission)}
                        onChange={() => handleCheckboxChange('permissions', permission)}
                        className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
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
                      <input type="checkbox" checked={formData.dashboardPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange('dashboardPermissions', permission)}
                        className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-slate-900 dark:text-slate-50">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Holder</span>
                  <input type="text" value={formData.accountHolder} onChange={(e) => handleChange('accountHolder', e.target.value)}
                    className="text-sm text-right text-slate-900 dark:text-slate-50 bg-transparent border-none focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 w-1/2" placeholder="Enter name" />
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Number</span>
                  <input type="text" value={formData.bankAccountNumber}
                    onChange={(e) => handleChange('bankAccountNumber', e.target.value.replace(/\D/g, ''))}
                    className="text-sm text-right text-slate-900 dark:text-slate-50 bg-transparent border-none focus:outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500 w-1/2" placeholder="0123456789012345" />
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Bank Name</span>
                  <select value={formData.bankName} onChange={(e) => handleChange('bankName', e.target.value)}
                    className="text-sm text-right text-slate-900 dark:text-slate-50 bg-transparent border-none focus:outline-none cursor-pointer w-1/2 appearance-none">
                    <option value="">Select bank</option>
                    {banks.map((bank) => <option key={bank} value={bank}>{bank}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">IFSC Code</span>
                  <input type="text" value={formData.ifscCode} onChange={(e) => handleChange('ifscCode', e.target.value.toUpperCase())}
                    className="text-sm text-right text-slate-900 dark:text-slate-50 bg-transparent border-none focus:outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500 w-1/2" placeholder="HDFC0001234" />
                </div>
              </div>

              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
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

          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Upload Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Document Category</label>
                  <select value={docCategory} onChange={(e) => setDocCategory(e.target.value)} className={selectCls}>
                    <option value="">Select category</option>
                    {docCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">File</label>
                  <input type="file" id="challan-doc-upload" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleDocUpload(f); e.target.value = '' }}
                    disabled={!docCategory} />
                  <label htmlFor="challan-doc-upload"
                    className={`flex items-center gap-2 w-full px-3 py-2 border border-dashed rounded-lg text-sm transition-colors ${
                      docCategory
                        ? 'border-cyan-400 dark:border-cyan-600 text-cyan-600 dark:text-cyan-400 cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
                        : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }`}>
                    <Upload className="w-4 h-4" />
                    {docCategory ? 'Click to upload' : 'Select category first'}
                  </label>
                </div>
              </div>

              {/* Documents list / empty state */}
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 min-h-[180px]">
                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-6 text-center">
                    <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No documents added yet</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Select a category and upload a file above</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{doc.fileName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category}</p>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveDoc(doc.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <button onClick={handlePrev} disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <div className="text-sm text-slate-500 dark:text-slate-400">Step {step} of 4</div>
          {step < 4 ? (
            <button onClick={handleNext} disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : !isStep3Valid}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors">
              Create Partner
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
