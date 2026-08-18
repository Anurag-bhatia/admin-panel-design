import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/payments/data.json';
import leadsData from '@/../product/sections/sales-crm/data.json';
import lawyersData from '@/../product/sections/lawyers/data.json';
import partnersData from '@/../product/sections/partners/data.json';
import { PaymentsDashboard } from './components/PaymentsDashboard';
export default function PaymentsDashboardPreview() {
    return (_jsx("div", { className: "h-[calc(100vh-64px)]", children: _jsx(PaymentsDashboard, { refunds: data.refunds, lawyerFees: data.lawyerFees, leads: leadsData.leads, users: leadsData.users, partnerPayouts: data.partnerPayouts, lawyers: lawyersData.lawyers, partners: partnersData.partners, onApproveRefund: (id) => console.log('Approve refund:', id), onProcessRefund: (id) => console.log('Process refund:', id), onBulkApproveRefunds: (ids) => console.log('Bulk approve refunds:', ids), onBulkProcessRefunds: (ids) => console.log('Bulk process refunds:', ids), onExportRefunds: () => console.log('Export refunds'), onViewLawyerProfile: (lawyerId) => console.log('View lawyer profile:', lawyerId), onBulkMarkLawyerFeesPaid: (keys) => console.log('Bulk mark lawyer fees paid:', keys), onExportLawyerFees: () => console.log('Export lawyer fees'), onViewLead: (id) => console.log('View lead:', id), onAssignLead: (id) => console.log('Assign lead:', id), onBulkMarkLeadsConverted: (ids) => console.log('Bulk mark leads converted:', ids), onBulkMarkPartnerPayoutsPaid: (keys) => console.log('Bulk mark partner payouts paid:', keys), onViewPartnerProfile: (partnerId) => console.log('View partner profile:', partnerId), onExportPartnerPayouts: () => console.log('Export partner payouts') }) }));
}
