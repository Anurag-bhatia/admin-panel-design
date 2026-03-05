import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/payments/data.json';
import { PaymentsDashboard } from './components/PaymentsDashboard';
export default function PaymentsDashboardPreview() {
    return (_jsx("div", { className: "h-[calc(100vh-64px)]", children: _jsx(PaymentsDashboard, { refunds: data.refunds, lawyerFees: data.lawyerFees, onApproveRefund: (id) => console.log('Approve refund:', id), onProcessRefund: (id) => console.log('Process refund:', id), onBulkApproveRefunds: (ids) => console.log('Bulk approve refunds:', ids), onBulkProcessRefunds: (ids) => console.log('Bulk process refunds:', ids), onExportRefunds: () => console.log('Export refunds'), onViewLawyerProfile: (lawyerId) => console.log('View lawyer profile:', lawyerId), onExportLawyerFees: () => console.log('Export lawyer fees') }) }));
}
