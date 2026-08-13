import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Search,
  Layers,
  Wrench,
  Check,
  Plus,
  Minus,
  Download,
  Send,
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

interface Addon {
  id: string
  name: string
  price: number
  unit: string
}

interface ServiceItem {
  id: string
  name: string
  price: number
  unit: string
}

export interface QuotationDraft {
  leadId: string
  type: QuotationType
  planId: string | null
  addonIds: string[]
  serviceId: string | null
  quantity: number
  overallDiscount: number
  validTill: string
  terms: string
  notes: string
}

interface AddQuotationModalProps {
  leads: Lead[]
  onSave: (data: QuotationDraft, isDraft: boolean) => void
  onClose: () => void
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: 'plan-basic', name: 'Basic Fleet', price: 5000, billingCycle: '/month', description: 'Up to 10 vehicles, standard support' },
  { id: 'plan-standard', name: 'Standard Fleet', price: 15000, billingCycle: '/month', description: 'Up to 50 vehicles, priority support' },
  { id: 'plan-premium', name: 'Premium Fleet', price: 35000, billingCycle: '/month', description: 'Up to 200 vehicles, dedicated success manager' },
  { id: 'plan-enterprise', name: 'Enterprise Fleet', price: 75000, billingCycle: '/month', description: 'Unlimited vehicles, custom SLAs' },
]

const ADDONS: Addon[] = [
  { id: 'addon-vehicles', name: 'Additional Vehicles', price: 500, unit: 'per vehicle / month' },
  { id: 'addon-priority', name: 'Priority Support', price: 2000, unit: '/month' },
  { id: 'addon-api', name: 'API Access', price: 5000, unit: '/month' },
  { id: 'addon-reports', name: 'Custom Reports', price: 3000, unit: '/month' },
  { id: 'addon-account-mgr', name: 'Dedicated Account Manager', price: 10000, unit: '/month' },
]

const SERVICES: ServiceItem[] = [
  { id: 'svc-screening', name: 'Challan Screening', price: 100, unit: 'per incident' },
  { id: 'svc-consult', name: 'Case Consultation', price: 2500, unit: 'per case' },
  { id: 'svc-lawyer', name: 'Lawyer Assignment', price: 5000, unit: 'per case' },
  { id: 'svc-filing', name: 'Document Filing', price: 500, unit: 'per document' },
  { id: 'svc-court', name: 'Court Representation', price: 15000, unit: 'per appearance' },
]

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
  const [sendModal, setSendModal] = useState<{ open: boolean; email: string; subject: string; message: string; sent: boolean }>({
    open: false,
    email: '',
    subject: '',
    message: '',
    sent: false,
  })

  const [formData, setFormData] = useState<QuotationDraft>({
    leadId: '',
    type: 'subscription-addons',
    planId: null,
    addonIds: [],
    serviceId: null,
    quantity: 1,
    overallDiscount: 0,
    validTill: defaultValidTill(),
    terms: DEFAULT_TERMS,
    notes: '',
  })

  const selectedLead = useMemo(() => leads.find(l => l.id === formData.leadId) || null, [leads, formData.leadId])
  const selectedPlan = useMemo(() => SUBSCRIPTION_PLANS.find(p => p.id === formData.planId) || null, [formData.planId])
  const selectedAddons = useMemo(() => ADDONS.filter(a => formData.addonIds.includes(a.id)), [formData.addonIds])
  const selectedService = useMemo(() => SERVICES.find(s => s.id === formData.serviceId) || null, [formData.serviceId])

  const basePrice = useMemo(() => {
    if (formData.type === 'pay-per-service') {
      return selectedService ? selectedService.price * Math.max(1, formData.quantity) : 0
    }
    return selectedPlan ? selectedPlan.price : 0
  }, [formData.type, formData.quantity, selectedPlan, selectedService])

  const addonsPrice = useMemo(() => {
    if (formData.type !== 'subscription-addons') return 0
    return selectedAddons.reduce((sum, a) => sum + a.price, 0)
  }, [formData.type, selectedAddons])

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
      if (!formData.serviceId) next.serviceId = 'Please select a service'
      if (!formData.quantity || formData.quantity <= 0) next.quantity = 'Quantity must be greater than 0'
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
      subject: `Quotation from LOTS247 for ${customerName}`,
      message: `Hi ${selectedLead?.contactPerson || 'there'},\n\nPlease find attached the quotation for your review. Feel free to reach out if you have any questions.\n\nBest regards,\nLOTS247 Team`,
      sent: false,
    })
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
    if (formData.type === 'subscription-addons') {
      for (const a of selectedAddons) {
        lines.push({ title: a.name, subtitle: a.unit, amount: formatCurrency(a.price) })
      }
    }
    if (formData.type === 'pay-per-service' && selectedService) {
      lines.push({
        title: selectedService.name,
        subtitle: `${selectedService.unit} × ${formData.quantity}`,
        amount: formatCurrency(selectedService.price * formData.quantity),
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

  const typeCards: { id: QuotationType; title: string; icon: JSX.Element }[] = [
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
                          addonIds: card.id === 'subscription-addons' ? formData.addonIds : [],
                          serviceId: card.id === 'pay-per-service' ? formData.serviceId : null,
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
                        className={`text-left p-5 rounded-lg border transition-colors min-h-[120px] flex flex-col justify-between ${
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
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{plan.description}</p>
                      </button>
                    )
                  })}
                </div>
              </FormSection>
            )}

            {formData.type === 'subscription-addons' && (
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
            )}

            {formData.type === 'subscription-addons' && (
              <FormSection title="Add-ons" hint="Choose one or more">
                <div className="space-y-2">
                  {ADDONS.map(addon => {
                    const selected = formData.addonIds.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors ${
                          selected
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300 dark:border-slate-600'}`}>
                            {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{addon.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{addon.unit}</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 shrink-0">{formatCurrency(addon.price)}</p>
                      </button>
                    )
                  })}
                </div>
              </FormSection>
            )}

            {formData.type === 'pay-per-service' && (
              <>
                <FormSection title="Service" error={errors.serviceId}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES.map(svc => {
                      const selected = formData.serviceId === svc.id
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceId: svc.id })}
                          className={`text-left p-3 rounded-lg border transition-colors ${
                            selected
                              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 ring-1 ring-cyan-500'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{svc.name}</p>
                            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{formatCurrency(svc.price)}</p>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{svc.unit}</p>
                        </button>
                      )
                    })}
                  </div>
                </FormSection>

                <FormSection title="Quantity / Credits / Incidents" error={errors.quantity}>
                  <div className="flex items-center gap-2 max-w-[240px]">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      className={inputClass(!!errors.quantity) + ' text-center'}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </FormSection>

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
              </>
            )}

            {/* Terms & Validity */}
            <FormSection title="Terms & Validity">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Internal Notes</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Not shown to customer"
                    className={inputClass(false)}
                  />
                </div>
                <div className="sm:col-span-2">
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
                  {formData.type === 'subscription-addons' && selectedAddons.map(a => (
                    <PreviewLine key={a.id} title={a.name} subtitle={a.unit} amount={formatCurrency(a.price)} />
                  ))}
                  {formData.type === 'pay-per-service' && selectedService && (
                    <PreviewLine
                      title={selectedService.name}
                      subtitle={`${selectedService.unit} × ${formData.quantity}`}
                      amount={formatCurrency(selectedService.price * formData.quantity)}
                    />
                  )}
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

              {formData.notes && (
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-amber-50 dark:bg-amber-900/10">
                  <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">Internal Notes (not shown to customer)</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{formData.notes}</p>
                </div>
              )}
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
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    The quotation PDF will be attached automatically.
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
