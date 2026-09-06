import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  Search,
  Layers,
  Wrench,
  Check,
  ChevronDown,
  Download,
  Send,
  Paperclip,
  X,
} from 'lucide-react'
import type { Lead } from '@/../product/sections/sales-crm/types'

type QuotationType = 'subscription-addons' | 'pay-per-service'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  billingCycle: string
  description: string
}

type AddonCategory = 'caas' | 'rto' | 'laas' | 'api'

interface ChallanMeta {
  pendingAmount: number
  totalChallans: number
  courtChallans: number
  onlineChallans: number
}

interface Addon {
  id: string
  name: string
  price: number
  unit: string
  category: AddonCategory
  challanMeta?: ChallanMeta
}

const SAMPLE_CHALLAN_META: ChallanMeta = {
  pendingAmount: 125000,
  totalChallans: 87,
  courtChallans: 12,
  onlineChallans: 75,
}

const ADDON_CATEGORIES: { id: AddonCategory; label: string }[] = [
  { id: 'caas', label: 'CAAS' },
  { id: 'rto', label: 'RTO' },
  { id: 'laas', label: 'LAAS' },
  { id: 'api', label: 'API' },
]

export interface QuotationDraft {
  leadId: string
  type: QuotationType
  planId: string | null
  addonIds: string[]
  addonDiscounts: Record<string, number>
  addonQuantities: Record<string, number>
  addonPerHitPrices: Record<string, number>
  overallDiscount: number
  validTill: string
  terms: string
}

interface AddQuotationModalProps {
  leads: Lead[]
  onSave: (data: QuotationDraft, isDraft: boolean) => void
  onClose: () => void
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: 'plan-sarathi', name: 'Sarathi', price: 999, billingCycle: '/year', description: '' },
  { id: 'plan-udrive', name: 'Udrive', price: 999, billingCycle: '/year', description: '' },
  { id: 'plan-vcare', name: 'Vcare', price: 100000, billingCycle: '/year', description: '' },
  { id: 'plan-bsafe', name: 'Bsafe', price: 50000, billingCycle: '/year', description: '' },
]

const ADDONS: Addon[] = [
  // CaaS — Challan as a Service
  { id: 'caas-bulk', name: 'Bulk Challans', price: 0, unit: '', category: 'caas', challanMeta: SAMPLE_CHALLAN_META },
  { id: 'caas-ppt', name: 'Pay per Transaction Challans', price: 0, unit: '', category: 'caas', challanMeta: SAMPLE_CHALLAN_META },

  // RTO — Document & RTO Assistance
  { id: 'rto-rc-renewal', name: 'RC Renewal', price: 0, unit: '', category: 'rto' },
  { id: 'rto-rc-retrieval', name: 'RC Retrieval', price: 0, unit: '', category: 'rto' },
  { id: 'rto-license-renewal', name: 'License Renewal', price: 0, unit: '', category: 'rto' },
  { id: 'rto-license-retrieval', name: 'License Retrieval', price: 0, unit: '', category: 'rto' },
  { id: 'rto-fitness-renewal', name: 'Fitness Renewal', price: 0, unit: '', category: 'rto' },
  { id: 'rto-fitness-retrieval', name: 'Fitness Retrieval', price: 0, unit: '', category: 'rto' },
  { id: 'rto-ownership-transfer', name: 'Ownership Transfer', price: 0, unit: '', category: 'rto' },
  { id: 'rto-number-updating', name: 'Number Updating', price: 0, unit: '', category: 'rto' },

  // LaaS — Legal as a Service
  { id: 'laas-oncall', name: '24×7 On Call Legal Support', price: 0, unit: '', category: 'laas' },
  { id: 'laas-onsite', name: 'On-Site Lawyer Support', price: 0, unit: '', category: 'laas' },
  { id: 'laas-theft', name: 'Theft', price: 0, unit: '', category: 'laas' },
  { id: 'laas-detention', name: 'Detention', price: 0, unit: '', category: 'laas' },
  { id: 'laas-bail', name: 'Bail', price: 0, unit: '', category: 'laas' },
  { id: 'laas-accidents', name: 'Accidents', price: 0, unit: '', category: 'laas' },
  { id: 'laas-firs', name: 'FIRs', price: 0, unit: '', category: 'laas' },
  { id: 'laas-superdari', name: 'Superdari', price: 0, unit: '', category: 'laas' },
  { id: 'laas-impound', name: 'Vehicle Impounding', price: 0, unit: '', category: 'laas' },
  { id: 'laas-eway', name: 'E-Way Bill Issues', price: 0, unit: '', category: 'laas' },

  // API
  { id: 'api-challan', name: 'Challan API', price: 0, unit: '', category: 'api' },
  { id: 'api-dl', name: 'DL API', price: 0, unit: '', category: 'api' },
  { id: 'api-rc', name: 'RC API', price: 0, unit: '', category: 'api' },
]

const PPT_TYPE_OPTIONS = ['Express', 'Regular']

const DEFAULT_TERMS = `1. This quotation is valid for the period mentioned above.
2. Payment terms: 50% advance, balance on delivery.
3. GST @ 18% is applicable on the final amount.
4. Prices are subject to change without prior notice.`

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

const defaultValidTill = () => {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}

export function AddQuotationModal({ leads, onSave, onClose }: AddQuotationModalProps) {
  const [customerSearch, setCustomerSearch] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeAddonCategories, setActiveAddonCategories] = useState<AddonCategory[]>(['caas'])
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false)
  const serviceTypeRef = useRef<HTMLDivElement>(null)
  const [pptQuotation, setPptQuotation] = useState<{ onlineCount: string; onlineDiscount: string; courtCount: string; courtDiscount: string; state: string }>({
    onlineCount: '',
    onlineDiscount: '',
    courtCount: '',
    courtDiscount: '',
    state: '',
  })
  const [sendModal, setSendModal] = useState<{ open: boolean; email: string; cc: string; subject: string; message: string; attachments: File[]; sent: boolean }>({
    open: false,
    email: '',
    cc: '',
    subject: '',
    message: '',
    attachments: [],
    sent: false,
  })
  const attachmentInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<QuotationDraft>({
    leadId: '',
    type: 'subscription-addons',
    planId: null,
    addonIds: [],
    addonDiscounts: {},
    addonQuantities: {},
    addonPerHitPrices: {},
    overallDiscount: 0,
    validTill: defaultValidTill(),
    terms: DEFAULT_TERMS,
  })

  useEffect(() => {
    if (!serviceTypeOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceTypeRef.current && !serviceTypeRef.current.contains(e.target as Node)) {
        setServiceTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [serviceTypeOpen])

  const toggleAddonCategory = (cat: AddonCategory) => {
    setActiveAddonCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    )
  }

  const selectedLead = useMemo(() => leads.find(l => l.id === formData.leadId) || null, [leads, formData.leadId])
  const selectedPlan = useMemo(() => SUBSCRIPTION_PLANS.find(p => p.id === formData.planId) || null, [formData.planId])
  const selectedAddons = useMemo(() => ADDONS.filter(a => formData.addonIds.includes(a.id)), [formData.addonIds])

  const basePrice = useMemo(() => {
    if (formData.type === 'pay-per-service') return 0
    return selectedPlan ? selectedPlan.price : 0
  }, [formData.type, selectedPlan])

  const addonsPrice = useMemo(() => {
    return selectedAddons.reduce((sum, a) => {
      const discountPct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0))
      const isBulkChallan = a.id === 'caas-bulk'
      if (isBulkChallan) {
        const base = a.challanMeta?.pendingAmount ?? 0
        return sum + Math.round(base * (1 - discountPct / 100))
      }
      const qty = Math.max(1, formData.addonQuantities[a.id] || 1)
      const unitPrice = a.category === 'api'
        ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
        : a.price
      return sum + Math.round(unitPrice * qty * (1 - discountPct / 100))
    }, 0)
  }, [selectedAddons, formData.addonDiscounts, formData.addonQuantities, formData.addonPerHitPrices])

  const subtotal = basePrice + addonsPrice
  const discountPercent = Math.min(100, Math.max(0, formData.overallDiscount))
  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const finalAmount = Math.max(0, subtotal - discountAmount)

  const filteredLeads = useMemo(() => {
    const term = customerSearch.trim().toLowerCase()
    if (!term) return leads
    return leads.filter(l =>
      l.companyName.toLowerCase().includes(term) ||
      l.companyAlias.toLowerCase().includes(term) ||
      l.contactPerson.toLowerCase().includes(term) ||
      l.emailId.toLowerCase().includes(term) ||
      l.phoneNumber.includes(term),
    )
  }, [leads, customerSearch])

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!formData.leadId) next.leadId = 'Please select a customer'
    if (formData.type === 'pay-per-service') {
      if (formData.addonIds.length === 0) next.addonIds = 'Please select at least one service'
    } else {
      if (!formData.planId) next.planId = 'Please select a plan'
    }
    if (!formData.validTill) next.validTill = 'Please pick a valid-till date'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSave = (isDraft: boolean) => {
    if (!validate()) return
    onSave(formData, isDraft)
  }

  const handleSendToCustomer = () => {
    if (!validate()) return
    const customerName = selectedLead?.companyAlias || selectedLead?.companyName || 'Customer'
    setSendModal({
      open: true,
      email: selectedLead?.emailId || '',
      cc: '',
      subject: `Quotation from LOTS247 for ${customerName}`,
      message: `Hi ${selectedLead?.contactPerson || 'there'},\n\nPlease find attached the quotation for your review. Feel free to reach out if you have any questions.\n\nBest regards,\nLOTS247 Team`,
      attachments: [],
      sent: false,
    })
  }

  const handleAddAttachments = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setSendModal(prev => ({ ...prev, attachments: [...prev.attachments, ...Array.from(files)] }))
  }

  const handleRemoveAttachment = (index: number) => {
    setSendModal(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }))
  }

  const handleConfirmSend = () => {
    setSendModal(prev => ({ ...prev, sent: true }))
    onSave(formData, false)
  }

  const handleDownloadPdf = () => {
    if (typeof window === 'undefined') return
    const win = window.open('', '_blank', 'width=900,height=1200')
    if (!win) return

    const lines: { title: string; subtitle?: string; amount: string }[] = []
    if (formData.type !== 'pay-per-service' && selectedPlan) {
      lines.push({ title: selectedPlan.name, subtitle: selectedPlan.description, amount: formatCurrency(selectedPlan.price) })
    }
    for (const a of selectedAddons) {
      const pct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0))
      if (a.id === 'caas-bulk' && a.challanMeta) {
        const amount = Math.round(a.challanMeta.pendingAmount * (1 - pct / 100))
        lines.push({
          title: a.name,
          subtitle: [`Pending ${formatCurrency(a.challanMeta.pendingAmount)}`, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '),
          amount: formatCurrency(amount),
        })
        continue
      }
      const qty = Math.max(1, formData.addonQuantities[a.id] || 1)
      const unitPrice = a.category === 'api'
        ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
        : a.price
      const amount = Math.round(unitPrice * qty * (1 - pct / 100))
      const qtyLabel = a.category === 'api' ? 'credits' : ''
      const qtyPart = qty > 1 ? `× ${qty}${qtyLabel ? ` ${qtyLabel}` : ''}` : (qtyLabel ? `${qty} ${qtyLabel}` : '')
      const perHitPart = a.category === 'api' && unitPrice > 0 ? `${formatCurrency(unitPrice)}/hit` : ''
      lines.push({
        title: a.name,
        subtitle: [a.unit, perHitPart, qtyPart, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '),
        amount: formatCurrency(amount),
      })
    }

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Quotation - ${escape(selectedLead?.companyAlias || selectedLead?.companyName || '')}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #fff; }
  h1 { margin: 0 0 4px; font-size: 22px; }
  h2 { margin: 24px 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
  .row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  .muted { color: #64748b; font-size: 12px; }
  .card { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-top: 8px; }
  .line { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .line:last-child { border-bottom: none; }
  .line .title { font-weight: 500; font-size: 14px; }
  .line .subtitle { font-size: 12px; color: #64748b; margin-top: 2px; }
  .line .amount { font-weight: 500; font-size: 14px; white-space: nowrap; }
  .total { background: #ecfeff; color: #155e75; }
  .total .title { font-weight: 600; }
  .total .amount { font-weight: 700; font-size: 16px; }
  .discount { color: #047857; }
  pre { font-family: inherit; white-space: pre-wrap; font-size: 12px; color: #334155; margin: 8px 0 0; }
  .issuer { display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
  .issuer .logo { width: 112px; height: 64px; background: #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 12px; box-sizing: border-box; }
  .issuer .logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .issuer .info { font-size: 11px; line-height: 1.5; color: #334155; }
  .issuer .info .name { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 2px; }
  .issuer .info .gst { font-weight: 600; color: #0f172a; margin-top: 4px; }
  @media print { body { padding: 24px; } }
</style></head>
<body>
  <div class="issuer">
    <div class="logo">
      <img src="${window.location.origin}/lawyered-logo.webp" alt="Lawyered" />
    </div>
    <div class="info">
      <div class="name">Sproutech Solutions Private Limited</div>
      <div>Company ID : U74900DL2015PTC285360</div>
      <div>IA Accel, LG-007-02, Lower Ground Floor, MGF Metropolis Mall, MG Road, Gurugram,</div>
      <div>Gurugram, Haryana - 122002, India</div>
      <div>Phone No: 7838105852, 7003670389 | Email: accounts@lawyered.in</div>
      <div class="gst">GST No : 06AAWCS2817C1Z9</div>
    </div>
  </div>

  <div class="row">
    <div>
      <div class="muted" style="text-transform: uppercase; letter-spacing: 0.05em;">Quotation for</div>
      <h1>${escape(selectedLead?.companyAlias || selectedLead?.companyName || '')}</h1>
      <div class="muted">${escape([selectedLead?.contactPerson, selectedLead?.emailId, selectedLead?.phoneNumber].filter(Boolean).join(' · '))}</div>
    </div>
    <div style="text-align: right;">
      <div class="muted" style="text-transform: uppercase; letter-spacing: 0.05em;">Valid Till</div>
      <div style="font-weight: 600; font-size: 14px;">${escape(formData.validTill)}</div>
    </div>
  </div>

  <div class="card">
    ${lines.map(l => `
      <div class="line">
        <div>
          <div class="title">${escape(l.title)}</div>
          ${l.subtitle ? `<div class="subtitle">${escape(l.subtitle)}</div>` : ''}
        </div>
        <div class="amount">${escape(l.amount)}</div>
      </div>`).join('')}
    <div class="line"><div class="title" style="font-weight:400; color:#475569;">Subtotal</div><div class="amount">${escape(formatCurrency(subtotal))}</div></div>
    ${discountAmount > 0 ? `<div class="line discount"><div class="title" style="font-weight:400;">Discount (${discountPercent}%)</div><div class="amount">− ${escape(formatCurrency(discountAmount))}</div></div>` : ''}
    <div class="line total"><div class="title">Final Amount</div><div class="amount">${escape(formatCurrency(finalAmount))}</div></div>
  </div>

  <h2>Terms & Conditions</h2>
  <pre>${escape(formData.terms)}</pre>
</body></html>`

    win.document.open()
    win.document.write(html)
    win.document.close()
    setTimeout(() => {
      win.focus()
      win.print()
    }, 200)
  }

  const toggleAddon = (id: string) => {
    setFormData(prev => ({
      ...prev,
      addonIds: prev.addonIds.includes(id) ? prev.addonIds.filter(x => x !== id) : [...prev.addonIds, id],
    }))
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${
      hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
    } rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`

  const typeCards: { id: QuotationType; title: string; icon: ReactNode }[] = [
    { id: 'subscription-addons', title: 'Sub + Add-ons', icon: <Layers className="w-4 h-4" /> },
    { id: 'pay-per-service', title: 'Pay-per-Service', icon: <Wrench className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 dark:text-white truncate">Add Quotation</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <button
            type="button"
            onClick={handleSendToCustomer}
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send to Customer</span>
          </button>
        </div>
      </div>

      {/* Split body */}
      <div className="flex-1 flex flex-col lg:flex-row lg:items-start">
        {/* Form (left) */}
        <div className="w-full lg:w-1/2 xl:w-[55%]">
          <div className="p-4 sm:p-6 lg:p-8 space-y-3">
            {/* Customer */}
            <FormSection title="Customer / Lead" error={errors.leadId}>
              {selectedLead ? (
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20">
                  <div className="min-w-0 pr-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{selectedLead.companyAlias || selectedLead.companyName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {selectedLead.contactPerson} · {selectedLead.phoneNumber} · {selectedLead.city}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, leadId: '' })
                      setCustomerSearch('')
                    }}
                    className="text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:underline shrink-0"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={e => setCustomerSearch(e.target.value)}
                      placeholder="Search by company, contact, email, or phone"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  {customerSearch.trim() && (
                    <div className="mt-2 border border-slate-200 dark:border-slate-800 rounded-lg divide-y divide-slate-200 dark:divide-slate-800 max-h-64 overflow-y-auto">
                      {filteredLeads.length === 0 ? (
                        <p className="p-3 text-xs text-slate-500 dark:text-slate-400 text-center">No customers match your search.</p>
                      ) : (
                        filteredLeads.map(lead => (
                          <button
                            key={lead.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, leadId: lead.id })
                              setCustomerSearch('')
                            }}
                            className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <div className="min-w-0 pr-3">
                              <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white truncate">{lead.companyAlias || lead.companyName}</p>
                              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                                {lead.contactPerson} · {lead.phoneNumber} · {lead.city}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </FormSection>

            {/* Quotation Type */}
            <FormSection title="Quotation Type">
              <div className="grid grid-cols-3 gap-2">
                {typeCards.map(card => {
                  const selected = formData.type === card.id
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          type: card.id,
                          planId: card.id === 'pay-per-service' ? null : formData.planId,
                        })
                      }
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border text-xs font-medium transition-colors ${
                        selected
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {card.icon}
                      <span className="text-center leading-tight">{card.title}</span>
                    </button>
                  )
                })}
              </div>
            </FormSection>

            {/* Plans / Services */}
            {formData.type === 'subscription-addons' && (
              <FormSection title="Subscription Plan" error={errors.planId}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUBSCRIPTION_PLANS.map(plan => {
                    const selected = formData.planId === plan.id
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, planId: plan.id })}
                        className={`text-left p-4 rounded-lg border transition-colors ${
                          selected
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 ring-1 ring-cyan-500'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{plan.name}</p>
                          <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                            {formatCurrency(plan.price)}
                            <span className="text-[10px] font-normal text-slate-500">{plan.billingCycle}</span>
                          </p>
                        </div>
                        {plan.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{plan.description}</p>
                        )}
                      </button>
                    )
                  })}
                </div>
              </FormSection>
            )}

            <FormSection title="Discount">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={formData.overallDiscount || ''}
                  onChange={e => setFormData({ ...formData, overallDiscount: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                  placeholder="0"
                  className={inputClass(false)}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Percentage (%)</span>
              </div>
            </FormSection>

            <FormSection title={formData.type === 'pay-per-service' ? 'Services' : 'Add-ons'} error={errors.addonIds}>
                <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Service Type
                  </label>
                  <div className="relative" ref={serviceTypeRef}>
                    <button
                      type="button"
                      onClick={() => setServiceTypeOpen(o => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={serviceTypeOpen}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <span className={`truncate text-left ${activeAddonCategories.length === 0 ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-50'}`}>
                        {activeAddonCategories.length === 0
                          ? 'Select service types'
                          : ADDON_CATEGORIES.filter(c => activeAddonCategories.includes(c.id)).map(c => {
                              const count = ADDONS.filter(a => a.category === c.id && formData.addonIds.includes(a.id)).length
                              return count > 0 ? `${c.label} (${count})` : c.label
                            }).join(', ')}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${serviceTypeOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {serviceTypeOpen && (
                      <div
                        role="listbox"
                        aria-multiselectable="true"
                        className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden"
                      >
                        {ADDON_CATEGORIES.map(cat => {
                          const selected = activeAddonCategories.includes(cat.id)
                          const count = ADDONS.filter(a => a.category === cat.id && formData.addonIds.includes(a.id)).length
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onClick={() => toggleAddonCategory(cat.id)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300 dark:border-slate-600'}`}>
                                {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-slate-900 dark:text-white flex-1">{cat.label}</span>
                              {count > 0 && (
                                <span className="text-xs text-slate-500 dark:text-slate-400">({count})</span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {ADDONS.filter(a => activeAddonCategories.includes(a.category)).map(addon => {
                    const selected = formData.addonIds.includes(addon.id)
                    const discountValue = formData.addonDiscounts[addon.id] ?? 0
                    const quantityValue = formData.addonQuantities[addon.id] ?? 1
                    const perHitValue = formData.addonPerHitPrices[addon.id] ?? 0
                    const isApi = addon.category === 'api'
                    const isChallanService = !!addon.challanMeta
                    const isPpt = addon.id === 'caas-ppt'
                    const qtyLabel = isApi ? 'credits' : 'qty'
                    return (
                      <div
                        key={addon.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleAddon(addon.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleAddon(addon.id)
                          }
                        }}
                        className={`w-full px-3 py-3 rounded-lg border text-left transition-colors cursor-pointer ${
                          selected
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300 dark:border-slate-600'}`}>
                              {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{addon.name}</p>
                              {addon.unit && (
                                <p className="text-xs text-slate-500 dark:text-slate-400">{addon.unit}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {!isApi && !isChallanService && (
                              <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{formatCurrency(addon.price)}</p>
                            )}
                            {addon.id === 'caas-bulk' && addon.challanMeta && (
                              <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 tabular-nums">
                                {formatCurrency(Math.round(addon.challanMeta.pendingAmount * (1 - (discountValue || 0) / 100)))}
                              </p>
                            )}
                            {isApi && (
                              <label
                                className="flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 w-36"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">₹</span>
                                <input
                                  type="number"
                                  min={0}
                                  step="0.01"
                                  value={perHitValue || ''}
                                  placeholder="0"
                                  onChange={(e) => {
                                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                                    const price = Math.max(0, isNaN(raw) ? 0 : raw)
                                    setFormData(prev => ({
                                      ...prev,
                                      addonPerHitPrices: { ...prev.addonPerHitPrices, [addon.id]: price },
                                    }))
                                  }}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  aria-label={`Per hit price for ${addon.name}`}
                                  className="w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <span className="px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap">per hit</span>
                              </label>
                            )}
                            {!isChallanService && (
                              <label
                                className={`flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 ${isApi ? 'w-32' : 'w-24'}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="number"
                                  min={1}
                                  value={quantityValue}
                                  placeholder="1"
                                  onChange={(e) => {
                                    const raw = e.target.value === '' ? 1 : Number(e.target.value)
                                    const qty = Math.max(1, isNaN(raw) ? 1 : Math.floor(raw))
                                    setFormData(prev => ({
                                      ...prev,
                                      addonQuantities: { ...prev.addonQuantities, [addon.id]: qty },
                                    }))
                                  }}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  aria-label={`${qtyLabel} for ${addon.name}`}
                                  className="w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <span className="px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap">{qtyLabel}</span>
                              </label>
                            )}
                            {!isPpt && (
                            <div className="flex items-center gap-2">
                              {isChallanService && (
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Deal Percentage</span>
                              )}
                              <label
                                className="flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 w-24"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={discountValue || ''}
                                  placeholder="0"
                                  onChange={(e) => {
                                    const raw = e.target.value === '' ? 0 : Number(e.target.value)
                                    const pct = Math.min(100, Math.max(0, isNaN(raw) ? 0 : raw))
                                    setFormData(prev => ({
                                      ...prev,
                                      addonDiscounts: { ...prev.addonDiscounts, [addon.id]: pct },
                                    }))
                                  }}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  aria-label={`Discount for ${addon.name}`}
                                  className="w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <span className="px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap">% off</span>
                              </label>
                            </div>
                            )}
                          </div>
                        </div>
                        {addon.challanMeta && (
                          <div className="mt-3 pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 px-3 py-2">
                              <p className="text-xs text-slate-500 dark:text-slate-400">Total Pending Challan Amount</p>
                              <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(addon.challanMeta.pendingAmount)}</p>
                            </div>
                            <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 px-3 py-2">
                              <p className="text-xs text-slate-500 dark:text-slate-400">Number of Challans</p>
                              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                                Online <span className="font-semibold text-slate-900 dark:text-white">{addon.challanMeta.onlineChallans}</span>
                                <span className="mx-1.5 text-slate-400 dark:text-slate-500">·</span>
                                Court <span className="font-semibold text-slate-900 dark:text-white">{addon.challanMeta.courtChallans}</span>
                              </p>
                            </div>
                          </div>
                        )}
                        {isPpt && (
                          <div className="mt-4 pl-7" onClick={(e) => e.stopPropagation()}>
                            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Quotation</p>
                              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3">
                                  <div>
                                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Number of Online Challans</label>
                                    <input
                                      type="number"
                                      min={0}
                                      value={pptQuotation.onlineCount}
                                      onChange={(e) => setPptQuotation(prev => ({ ...prev, onlineCount: e.target.value.replace(/[^0-9]/g, '') }))}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      placeholder="0"
                                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Discount (%)</label>
                                    <input
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={pptQuotation.onlineDiscount}
                                      onChange={(e) => {
                                        const raw = e.target.value.replace(/[^0-9]/g, '')
                                        const clamped = raw === '' ? '' : String(Math.min(100, Math.max(0, Number(raw))))
                                        setPptQuotation(prev => ({ ...prev, onlineDiscount: clamped }))
                                      }}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      placeholder="0"
                                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                                  <div>
                                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Number of Court Challans</label>
                                    <input
                                      type="number"
                                      min={0}
                                      value={pptQuotation.courtCount}
                                      onChange={(e) => setPptQuotation(prev => ({ ...prev, courtCount: e.target.value.replace(/[^0-9]/g, '') }))}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      placeholder="0"
                                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Discount (%)</label>
                                    <input
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={pptQuotation.courtDiscount}
                                      onChange={(e) => {
                                        const raw = e.target.value.replace(/[^0-9]/g, '')
                                        const clamped = raw === '' ? '' : String(Math.min(100, Math.max(0, Number(raw))))
                                        setPptQuotation(prev => ({ ...prev, courtDiscount: clamped }))
                                      }}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      placeholder="0"
                                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                  </div>
                                </div>
                                <div className="pt-3">
                                  <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Select Type</label>
                                  <select
                                    value={pptQuotation.state}
                                    onChange={(e) => setPptQuotation(prev => ({ ...prev, state: e.target.value }))}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                                  >
                                    <option value="">Select type</option>
                                    {PPT_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </FormSection>

            {/* Terms & Validity */}
            <FormSection title="Terms & Validity">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Valid Till <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.validTill}
                    onChange={e => setFormData({ ...formData, validTill: e.target.value })}
                    className={inputClass(!!errors.validTill)}
                  />
                  {errors.validTill && <p className="mt-1 text-xs text-red-500">{errors.validTill}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Terms & Conditions</label>
                  <textarea
                    rows={5}
                    value={formData.terms}
                    onChange={e => setFormData({ ...formData, terms: e.target.value })}
                    className={inputClass(false) + ' resize-y'}
                  />
                </div>
              </div>
            </FormSection>
          </div>
        </div>

        {/* Preview (right) */}
        <div className="flex-1 lg:w-1/2 xl:w-[45%] bg-slate-100 dark:bg-slate-950/60">
          <div className="lg:sticky lg:top-0 p-4 sm:p-6 lg:p-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
              {/* Issuer header */}
              <IssuerHeader />

              {/* Paper header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedLead?.companyAlias || selectedLead?.companyName || 'Customer Name'}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Valid Till</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formData.validTill ? new Date(formData.validTill).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                  </p>
                </div>
              </div>

              {/* Bill-to */}
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Bill to</p>
                {selectedLead ? (
                  <>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{selectedLead.companyAlias || selectedLead.companyName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedLead.contactPerson}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedLead.emailId} · {selectedLead.phoneNumber}</p>
                    {selectedLead.city && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{selectedLead.city}{selectedLead.state ? `, ${selectedLead.state}` : ''}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-400 italic">Select a customer to see billing details</p>
                )}
              </div>

              {/* Line items */}
              <div>
                <div className="px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {formData.type !== 'pay-per-service' && selectedPlan && (
                    <PreviewLine title={selectedPlan.name} subtitle={selectedPlan.description} amount={formatCurrency(selectedPlan.price)} />
                  )}
                  {selectedAddons.map(a => {
                    const pct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0))
                    if (a.id === 'caas-bulk' && a.challanMeta) {
                      const amount = Math.round(a.challanMeta.pendingAmount * (1 - pct / 100))
                      return (
                        <PreviewLine
                          key={a.id}
                          title={a.name}
                          subtitle={[`Pending ${formatCurrency(a.challanMeta.pendingAmount)}`, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · ')}
                          amount={formatCurrency(amount)}
                        />
                      )
                    }
                    const qty = Math.max(1, formData.addonQuantities[a.id] || 1)
                    const unitPrice = a.category === 'api'
                      ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
                      : a.price
                    const amount = Math.round(unitPrice * qty * (1 - pct / 100))
                    const qtyLabel = a.category === 'api' ? 'credits' : ''
                    const qtyPart = qty > 1 ? `× ${qty}${qtyLabel ? ` ${qtyLabel}` : ''}` : (qtyLabel ? `${qty} ${qtyLabel}` : '')
                    const perHitPart = a.category === 'api' && unitPrice > 0 ? `${formatCurrency(unitPrice)}/hit` : ''
                    return (
                      <PreviewLine
                        key={a.id}
                        title={a.name}
                        subtitle={[a.unit, perHitPart, qtyPart, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · ')}
                        amount={formatCurrency(amount)}
                      />
                    )
                  })}
                  {basePrice === 0 && addonsPrice === 0 && (
                    <div className="px-6 py-8 text-center text-xs text-slate-400 italic">Select a plan or service to see line items.</div>
                  )}
                </div>

                {/* Totals */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                    <span className="text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm text-emerald-700 dark:text-emerald-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span>− {formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-cyan-50 dark:bg-cyan-900/20 border-t border-cyan-100 dark:border-cyan-900/50 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">Total Due</span>
                  <span className="text-xl font-bold text-cyan-900 dark:text-cyan-100 tabular-nums">{formatCurrency(finalAmount)}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Terms & Conditions</p>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans">{formData.terms || '—'}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sendModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/70 px-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {sendModal.sent ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Quotation Sent</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  We've emailed the quotation to <span className="font-medium text-slate-700 dark:text-slate-300">{sendModal.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Send Quotation</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Review the details before sending.</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">To</label>
                    <input
                      type="email"
                      value={sendModal.email}
                      onChange={e => setSendModal(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="customer@example.com"
                      className={inputClass(false)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">CC</label>
                    <input
                      type="text"
                      value={sendModal.cc}
                      onChange={e => setSendModal(prev => ({ ...prev, cc: e.target.value }))}
                      placeholder="comma-separated emails"
                      className={inputClass(false)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Subject</label>
                    <input
                      type="text"
                      value={sendModal.subject}
                      onChange={e => setSendModal(prev => ({ ...prev, subject: e.target.value }))}
                      className={inputClass(false)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Message</label>
                    <textarea
                      rows={10}
                      value={sendModal.message}
                      onChange={e => setSendModal(prev => ({ ...prev, message: e.target.value }))}
                      className={inputClass(false) + ' resize-y min-h-[220px]'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Attachments</label>
                    <input
                      ref={attachmentInputRef}
                      type="file"
                      multiple
                      onChange={e => {
                        handleAddAttachments(e.target.files)
                        if (attachmentInputRef.current) attachmentInputRef.current.value = ''
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => attachmentInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      Add attachment
                    </button>
                    {sendModal.attachments.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {sendModal.attachments.map((f, i) => (
                          <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="flex items-center gap-1.5 min-w-0 text-xs text-slate-700 dark:text-slate-300">
                              <Paperclip className="w-3 h-3 shrink-0" />
                              <span className="truncate">{f.name}</span>
                              <span className="text-slate-400 dark:text-slate-500 shrink-0">({(f.size / 1024).toFixed(1)} KB)</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(i)}
                              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                              aria-label={`Remove ${f.name}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-900/40">
                  <button
                    type="button"
                    onClick={() => setSendModal(prev => ({ ...prev, open: false }))}
                    className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSend}
                    disabled={!sendModal.email.trim()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function FormSection({ title, hint, error, children }: { title: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">{title}</h3>
        {hint && <span className="text-[10px] uppercase tracking-wider text-slate-400">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function PreviewLine({ title, subtitle, amount }: { title: string; subtitle?: string; amount: string }) {
  return (
    <div className="px-6 py-3 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <p className="text-sm font-medium text-slate-900 dark:text-white shrink-0 tabular-nums">{amount}</p>
    </div>
  )
}

export function IssuerHeader() {
  return (
    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4">
      <div className="w-28 h-16 bg-black rounded flex items-center justify-center shrink-0 px-3">
        <img src="/lawyered-logo.webp" alt="Lawyered" className="max-w-full max-h-full object-contain" />
      </div>
      <div className="min-w-0 flex-1 text-[11px] leading-snug text-slate-700 dark:text-slate-300">
        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Sproutech Solutions Private Limited</p>
        <p>Company ID : U74900DL2015PTC285360</p>
        <p>IA Accel, LG-007-02, Lower Ground Floor, MGF Metropolis Mall, MG Road, Gurugram,</p>
        <p>Gurugram, Haryana - 122002, India</p>
        <p>Phone No: 7838105852, 7003670389 | Email: accounts@lawyered.in</p>
        <p className="font-semibold text-slate-900 dark:text-white mt-1">GST No : 06AAWCS2817C1Z9</p>
      </div>
    </div>
  )
}
