import data from '@/../product/sections/payments/data.json'
import { PaymentsDashboard } from './components/PaymentsDashboard'
import type { Refund, LawyerFee } from '@/../product/sections/payments/types'

export default function PaymentsDashboardPreview() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <PaymentsDashboard
        refunds={data.refunds as Refund[]}
        lawyerFees={data.lawyerFees as LawyerFee[]}
        onApproveRefund={(id) => console.log('Approve refund:', id)}
        onProcessRefund={(id) => console.log('Process refund:', id)}
        onBulkApproveRefunds={(ids) => console.log('Bulk approve refunds:', ids)}
        onBulkProcessRefunds={(ids) => console.log('Bulk process refunds:', ids)}
        onExportRefunds={() => console.log('Export refunds')}
        onViewLawyerProfile={(lawyerId) => console.log('View lawyer profile:', lawyerId)}
        onExportLawyerFees={() => console.log('Export lawyer fees')}
      />
    </div>
  )
}
