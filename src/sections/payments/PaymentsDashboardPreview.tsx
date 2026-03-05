import data from '@/../product/sections/payments/data.json'
import leadsData from '@/../product/sections/sales-crm/data.json'
import { PaymentsDashboard } from './components/PaymentsDashboard'
import type { Refund, LawyerFee, PartnerPayout } from '@/../product/sections/payments/types'
import type { Lead, User } from '@/../product/sections/sales-crm/types'

export default function PaymentsDashboardPreview() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <PaymentsDashboard
        refunds={data.refunds as Refund[]}
        lawyerFees={data.lawyerFees as LawyerFee[]}
        leads={leadsData.leads as Lead[]}
        users={leadsData.users as User[]}
        partnerPayouts={data.partnerPayouts as PartnerPayout[]}
        onApproveRefund={(id) => console.log('Approve refund:', id)}
        onProcessRefund={(id) => console.log('Process refund:', id)}
        onBulkApproveRefunds={(ids) => console.log('Bulk approve refunds:', ids)}
        onBulkProcessRefunds={(ids) => console.log('Bulk process refunds:', ids)}
        onExportRefunds={() => console.log('Export refunds')}
        onViewLawyerProfile={(lawyerId) => console.log('View lawyer profile:', lawyerId)}
        onExportLawyerFees={() => console.log('Export lawyer fees')}
        onViewLead={(id) => console.log('View lead:', id)}
        onAssignLead={(id) => console.log('Assign lead:', id)}
        onViewPartnerProfile={(partnerId) => console.log('View partner profile:', partnerId)}
        onExportPartnerPayouts={() => console.log('Export partner payouts')}
      />
    </div>
  )
}
