import { useState } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import type { AddPartnerChallanPayProps, Partner } from '@/../product/sections/partners/types'

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

const painPoints = [
  'Lack of awareness about challans',
  'Time-consuming court visits',
  'High challan penalty amounts',
  'No digital payment options',
  'Difficulty tracking multiple vehicles',
  'Language barriers in legal process',
  'Other',
]

const banks = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'SBI', 'Yes Bank', 'Federal Bank']

export function AddPartnerChallanPay({ onSubmit, onCancel, partner }: AddPartnerChallanPayProps & { partner?: Partner }) {
  const isEditMode = !!partner
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Business Details
    businessType: partner?.subscriberTypesAllowed?.[0] || '',
    yearsInOperation: (partner as any)?.yearsInOperation || '',
    outletAddress: partner?.address || '',
    area: partner?.city || '',
    locality: '',
    state: partner?.state || '',
    pincode: partner?.pinCode || '',
    dailyVehicleFootfall: (partner as any)?.dailyVehicleFootfall || '',
    hasDedicatedCounter: ((partner as any)?.hasDedicatedCounter || '') as '' | 'yes' | 'no',
    dealsWithVehicleDocuments: ((partner as any)?.dealsWithVehicleDocuments || '') as '' | 'yes' | 'no',
    // Step 2: Contact & Identity
    email: partner?.email || '',
    ownerFullName: partner ? `${partner.firstName} ${partner.lastName}` : '',
    primaryContact: partner?.mobile || '',
    alternateContact: partner?.phone || '',
    preferredLanguage: ((partner as any)?.preferredLanguage || '') as '' | 'hindi' | 'english',
    bestTimeForCall: ((partner as any)?.bestTimeForCall || '') as '' | 'morning' | 'afternoon' | 'evening',
    // Step 3: Qualification Signals
    expectedMonthlyIncome: (partner as any)?.expectedMonthlyIncome || '',
    customersAskedAboutChallans: ((partner as any)?.customersAskedAboutChallans || '') as '' | 'yes' | 'no',
    biggestCustomerPainPoint: (partner as any)?.biggestCustomerPainPoint || '',
    awarenessOfChallanPay: ((partner as any)?.awarenessOfChallanPay || '') as '' | 'yes' | 'no',
    questionsOrComments: (partner as any)?.questionsOrComments || '',
    // Step 4: Bank Details
    accountHolder: partner ? (partner.companyName || `${partner.firstName} ${partner.lastName}`) : '',
    bankAccountNumber: partner?.bankAccountNumber || '',
    bankName: partner?.bankName || '',
    ifscCode: (partner as any)?.ifscCode || '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => { if (step < 4) setStep(step + 1) }
  const handlePrev = () => { if (step > 1) setStep(step - 1) }

  const isStep1Valid = formData.businessType && formData.outletAddress && formData.state && formData.pincode
  const isStep2Valid = formData.email && formData.ownerFullName && formData.primaryContact
  const isStep3Valid = formData.expectedMonthlyIncome
  const isStep4Valid = formData.bankAccountNumber && formData.bankName

  const handleSubmit = () => {
    onSubmit?.(formData as any)
  }

  const inputCls = "w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
  const selectCls = `${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`
  const labelCls = "block text-sm font-medium text-slate-900 dark:text-slate-50 mb-1.5"

  const YesNoToggle = ({ value, onChange }: { value: '' | 'yes' | 'no'; onChange: (v: 'yes' | 'no') => void }) => (
    <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button type="button" onClick={() => onChange('yes')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${value === 'yes' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
        Yes
      </button>
      <button type="button" onClick={() => onChange('no')}
        className={`px-4 py-2 text-sm font-medium transition-colors border-l border-slate-200 dark:border-slate-700 ${value === 'no' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
        No
      </button>
    </div>
  )

  const stepLabels = ['Business Details', 'Contact & Identity', 'Qualification', 'Bank Details']

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{isEditMode ? 'Edit ChallanPay Partner' : 'Add ChallanPay Partner'}</h2>
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
                  {stepLabels[s - 1]}
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
          {/* Step 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Business Type</label>
                <select value={formData.businessType} onChange={(e) => handleChange('businessType', e.target.value)} className={selectCls}>
                  <option value="">Select business type</option>
                  {businessTypes.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Years in Operation</label>
                <input type="text" value={formData.yearsInOperation} onChange={(e) => handleChange('yearsInOperation', e.target.value.replace(/\D/g, ''))}
                  className={inputCls} placeholder="e.g. 5" />
              </div>

              <div>
                <label className={labelCls}>Outlet or Shop Address</label>
                <input type="text" value={formData.outletAddress} onChange={(e) => handleChange('outletAddress', e.target.value)}
                  className={inputCls} placeholder="Full shop/outlet address" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Area / Locality</label>
                  <input type="text" value={formData.area} onChange={(e) => handleChange('area', e.target.value)}
                    className={inputCls} placeholder="Area" />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <select value={formData.state} onChange={(e) => handleChange('state', e.target.value)} className={selectCls}>
                    <option value="">Select state</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Pincode</label>
                  <input type="text" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={inputCls} placeholder="110001" maxLength={6} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Daily Vehicle Footfall Estimate</label>
                <input type="text" value={formData.dailyVehicleFootfall} onChange={(e) => handleChange('dailyVehicleFootfall', e.target.value.replace(/\D/g, ''))}
                  className={inputCls} placeholder="e.g. 50" />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-50">Dedicated counter or display space?</label>
                <YesNoToggle value={formData.hasDedicatedCounter} onChange={(v) => handleChange('hasDedicatedCounter', v)} />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-50">Business deals with vehicle documents?</label>
                <YesNoToggle value={formData.dealsWithVehicleDocuments} onChange={(v) => handleChange('dealsWithVehicleDocuments', v)} />
              </div>
            </div>
          )}

          {/* Step 2: Contact & Identity */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                  className={inputCls} placeholder="partner@example.com" />
              </div>

              <div>
                <label className={labelCls}>Owner Full Name</label>
                <input type="text" value={formData.ownerFullName} onChange={(e) => handleChange('ownerFullName', e.target.value)}
                  className={inputCls} placeholder="Full name of the owner" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Primary Contact</label>
                  <input type="tel" value={formData.primaryContact} onChange={(e) => handleChange('primaryContact', e.target.value)}
                    className={inputCls} placeholder="+919876543210" />
                </div>
                <div>
                  <label className={labelCls}>Alternate Contact <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input type="tel" value={formData.alternateContact} onChange={(e) => handleChange('alternateContact', e.target.value)}
                    className={inputCls} placeholder="+919876543211" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Preferred Language</label>
                  <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden w-full">
                    <button type="button" onClick={() => handleChange('preferredLanguage', 'hindi')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${formData.preferredLanguage === 'hindi' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      Hindi
                    </button>
                    <button type="button" onClick={() => handleChange('preferredLanguage', 'english')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors border-l border-slate-200 dark:border-slate-700 ${formData.preferredLanguage === 'english' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      English
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Best Time for a Call</label>
                  <select value={formData.bestTimeForCall} onChange={(e) => handleChange('bestTimeForCall', e.target.value)} className={selectCls}>
                    <option value="">Select time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Qualification Signals */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Expected Monthly Income Goal</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">&#8377;</span>
                  <input type="text" value={formData.expectedMonthlyIncome}
                    onChange={(e) => handleChange('expectedMonthlyIncome', e.target.value.replace(/\D/g, ''))}
                    className={`${inputCls} pl-7`} placeholder="e.g. 25000" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-50">Have customers asked about challans?</label>
                <YesNoToggle value={formData.customersAskedAboutChallans} onChange={(v) => handleChange('customersAskedAboutChallans', v)} />
              </div>

              <div>
                <label className={labelCls}>Biggest Customer Pain Point</label>
                <select value={formData.biggestCustomerPainPoint} onChange={(e) => handleChange('biggestCustomerPainPoint', e.target.value)} className={selectCls}>
                  <option value="">Select pain point</option>
                  {painPoints.map((pp) => <option key={pp} value={pp}>{pp}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-50">Awareness of ChallanPay before this?</label>
                <YesNoToggle value={formData.awarenessOfChallanPay} onChange={(v) => handleChange('awarenessOfChallanPay', v)} />
              </div>

              <div>
                <label className={labelCls}>Any Questions or Comments <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea value={formData.questionsOrComments} onChange={(e) => handleChange('questionsOrComments', e.target.value)}
                  className={`${inputCls} resize-none`} rows={3} placeholder="Any additional notes..." />
              </div>
            </div>
          )}

          {/* Step 4: Bank Details */}
          {step === 4 && (
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <button onClick={handlePrev} disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <div className="text-sm text-slate-500 dark:text-slate-400">Step {step} of 4</div>
          {step < 4 ? (
            <button onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : !isStep3Valid}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!isStep4Valid}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors">
              {isEditMode ? 'Save Changes' : 'Create Partner'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
