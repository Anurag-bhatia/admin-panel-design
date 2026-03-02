import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Pencil, UserX, UserCheck, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, Building2, CreditCard, Globe, Download, AlertTriangle, Receipt, Wallet, Plus, } from 'lucide-react';
export function LawyerProfile({ lawyer, incidents = [], pendingInvoices = [], transactions = [], onBack, onEdit, onDeactivate, onReactivate, onViewIncident, onViewTransaction, onRaiseInvoice, }) {
    const [activeTab, setActiveTab] = useState('details');
    const isActive = lawyer.activityState === 'Active';
    const fullName = `${lawyer.firstName} ${lawyer.lastName}`;
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };
    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };
    const getTabIcon = (tab) => {
        const icons = {
            details: _jsx(Briefcase, { className: "w-4 h-4" }),
            incidents: _jsx(AlertTriangle, { className: "w-4 h-4" }),
            invoicing: _jsx(Receipt, { className: "w-4 h-4" }),
            transactions: _jsx(Wallet, { className: "w-4 h-4" }),
        };
        return icons[tab];
    };
    const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.commissionAmount, 0);
    return (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [
        // Header
        _jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
            _jsx("button", { onClick: onBack, className: "flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) }),
            _jsx("div", { className: "flex-1", children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: "Lawyer Profile" }) }),
            _jsxs("div", { className: "flex items-center gap-2", children: [
                isActive ? (_jsxs("button", { onClick: onDeactivate, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", children: [_jsx(UserX, { className: "w-4 h-4" }), "Deactivate"] })) : (_jsxs("button", { onClick: onReactivate, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors", children: [_jsx(UserCheck, { className: "w-4 h-4" }), "Reactivate"] })),
                _jsxs("button", { onClick: onEdit, className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors", children: [_jsx(Pencil, { className: "w-4 h-4" }), "Edit"] })
            ] })
        ] }),
        // Profile Header Card
        _jsx("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
            _jsx("img", { src: lawyer.photo, alt: fullName, className: "w-24 h-24 rounded-full object-cover bg-slate-100 dark:bg-slate-700" }),
            _jsxs("div", { className: "flex-1", children: [
                _jsxs("div", { className: "flex flex-wrap items-start gap-3 mb-3", children: [
                    _jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: fullName }),
                    _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`, children: lawyer.activityState })
                ] }),
                _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 font-mono mb-4", children: lawyer.lawyerId }),
                _jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [
                    _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Mail, { className: "w-4 h-4" }), lawyer.email] }),
                    _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Phone, { className: "w-4 h-4" }), lawyer.mobile] })
                ] })
            ] }),
            _jsxs("div", { className: "flex flex-col gap-2", children: [
                _jsxs("div", { className: "flex items-center gap-2", children: [
                    _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Onboarding:" }),
                    _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${lawyer.onboardingStatus === 'Complete' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`, children: lawyer.onboardingStatus })
                ] }),
                _jsxs("div", { className: "flex items-center gap-2", children: [
                    _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "KYC:" }),
                    _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${lawyer.kycStatus === 'Verified' ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400' : lawyer.kycStatus === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`, children: lawyer.kycStatus })
                ] })
            ] })
        ] }) }),
        // Tabs
        _jsx("div", { className: "mb-6 -mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto", children: _jsx("div", { className: "flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full", children: ['details', 'incidents', 'invoicing', 'transactions'].map((tab) => (
            _jsxs("button", { onClick: () => setActiveTab(tab), className: `inline-flex items-center gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: [getTabIcon(tab), tab.charAt(0).toUpperCase() + tab.slice(1)] }, tab)
        )) }) }),
        // Tab Content
        _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6", children: [
            // Details Tab
            activeTab === 'details' && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
                _jsxs(Section, { title: "Basic Information", icon: _jsx(Briefcase, { className: "w-4 h-4" }), children: [
                    _jsx(InfoRow, { label: "Category", value: lawyer.category }),
                    _jsx(InfoRow, { label: "Sub-Category", value: lawyer.subCategory }),
                    _jsx(InfoRow, { label: "Gender", value: lawyer.gender }),
                    _jsx(InfoRow, { label: "Date of Birth", value: formatDate(lawyer.dateOfBirth) }),
                    _jsx(InfoRow, { label: "Source", value: lawyer.source })
                ] }),
                _jsxs(Section, { title: "Expertise & Preferences", icon: _jsx(Globe, { className: "w-4 h-4" }), children: [
                    _jsx(InfoRow, { label: "Years of Experience", value: `${lawyer.expertise.yearsOfExperience} years` }),
                    _jsx(InfoRow, { label: "Languages", value: lawyer.expertise.preferredLanguages.join(', ') }),
                    _jsx(InfoRow, { label: "Locations", value: lawyer.expertise.preferredLocations.join(', ') }),
                    _jsxs("div", { className: "py-3 border-b border-slate-100 dark:border-slate-700 last:border-0", children: [
                        _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-2", children: "Case Types" }),
                        _jsx("div", { className: "flex flex-wrap gap-1.5", children: lawyer.expertise.caseTypes.map((type) => (_jsx("span", { className: "px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded", children: type }, type))) })
                    ] })
                ] }),
                _jsx(Section, { title: "Current Address", icon: _jsx(MapPin, { className: "w-4 h-4" }), children: _jsxs("div", { className: "py-3", children: [
                    _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: lawyer.currentAddress.addressLine }),
                    _jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: [lawyer.currentAddress.area, ", ", lawyer.currentAddress.city] }),
                    _jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: [lawyer.currentAddress.state, ", ", lawyer.currentAddress.country, " - ", lawyer.currentAddress.pinCode] })
                ] }) }),
                _jsxs(Section, { title: "Bank Details", icon: _jsx(CreditCard, { className: "w-4 h-4" }), children: [
                    _jsx(InfoRow, { label: "Account Holder", value: lawyer.bankDetails.accountHolderName }),
                    _jsx(InfoRow, { label: "Account Number", value: lawyer.bankDetails.accountNumber }),
                    _jsx(InfoRow, { label: "Bank Name", value: lawyer.bankDetails.bankName }),
                    _jsx(InfoRow, { label: "IFSC Code", value: lawyer.bankDetails.ifscCode })
                ] }),
                _jsx(Section, { title: "Qualifications", icon: _jsx(GraduationCap, { className: "w-4 h-4" }), children: lawyer.qualifications.map((qual, index) => (
                    _jsxs("div", { className: "py-3 border-b border-slate-100 dark:border-slate-700 last:border-0", children: [
                        _jsx("p", { className: "font-medium text-slate-900 dark:text-white", children: qual.degree }),
                        _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: qual.university }),
                        _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-500", children: [qual.yearOfCompletion, qual.percentage && ` • ${qual.percentage}%`] })
                    ] }, index)
                )) }),
                _jsx(Section, { title: "Experience", icon: _jsx(Calendar, { className: "w-4 h-4" }), children: lawyer.experience.map((exp, index) => (
                    _jsxs("div", { className: "py-3 border-b border-slate-100 dark:border-slate-700 last:border-0", children: [
                        _jsx("p", { className: "font-medium text-slate-900 dark:text-white", children: exp.role }),
                        _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: exp.company }),
                        _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-500", children: [formatDate(exp.startDate), " - ", exp.endDate ? formatDate(exp.endDate) : 'Present'] }),
                        _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1", children: exp.functionalArea })
                    ] }, index)
                )) }),
                _jsx(Section, { title: "KYC Documents", icon: _jsx(FileText, { className: "w-4 h-4" }), fullWidth: true, children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [
                    _jsx(DocumentCard, { label: "Aadhaar", number: lawyer.kycDocuments.aadhaar.number, hasDocument: !!lawyer.kycDocuments.aadhaar.documentUrl }),
                    _jsx(DocumentCard, { label: "PAN", number: lawyer.kycDocuments.pan.number, hasDocument: !!lawyer.kycDocuments.pan.documentUrl }),
                    _jsx(DocumentCard, { label: "Driving Licence", hasDocument: !!lawyer.kycDocuments.drivingLicence.documentUrl }),
                    _jsx(DocumentCard, { label: "Cancelled Cheque", hasDocument: !!lawyer.kycDocuments.cancelledCheque.documentUrl }),
                    _jsx(DocumentCard, { label: "Bar ID", number: lawyer.kycDocuments.barId.number, hasDocument: !!lawyer.kycDocuments.barId.documentUrl }),
                    _jsx(DocumentCard, { label: "BALLB Certificate", hasDocument: !!lawyer.kycDocuments.ballbCertificate.documentUrl })
                ] }) }),
                lawyer.company && (_jsxs(Section, { title: "Company Details", icon: _jsx(Building2, { className: "w-4 h-4" }), fullWidth: true, children: [
                    _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8", children: [
                        _jsx(InfoRow, { label: "Company Name", value: lawyer.company.name }),
                        _jsx(InfoRow, { label: "Email", value: lawyer.company.email }),
                        _jsx(InfoRow, { label: "Phone", value: lawyer.company.phone }),
                        _jsx(InfoRow, { label: "Website", value: lawyer.company.website }),
                        _jsx(InfoRow, { label: "GST Number", value: lawyer.company.gstNumber }),
                        _jsx(InfoRow, { label: "PAN Number", value: lawyer.company.panNumber }),
                        _jsx(InfoRow, { label: "Main Office", value: lawyer.company.mainOffice }),
                        _jsx(InfoRow, { label: "Branch Offices", value: lawyer.company.branchOffices.join(', ') || 'None' })
                    ] }),
                    _jsxs("div", { className: "pt-3 border-t border-slate-100 dark:border-slate-700 mt-3", children: [
                        _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: "Address" }),
                        _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: lawyer.company.address })
                    ] })
                ] }))
            ] })),
            // Incidents Tab
            activeTab === 'incidents' && (_jsxs("div", { children: [
                _jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4", children: ["Assigned Incidents (", incidents.length, ")"] }),
                incidents.length === 0 ? (
                    _jsxs("div", { className: "text-center py-12", children: [
                        _jsx(AlertTriangle, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" }),
                        _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "No incidents assigned to this lawyer yet" })
                    ] })
                ) : (
                    _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [
                        _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800", children: [
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Incident ID" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Challan No" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Vehicle No" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Violation Type" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Amount" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Status" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Assigned Date" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Resolution Date" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Actions" })
                        ] }) }),
                        _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: incidents.map((incident) => (
                            _jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                                _jsx("td", { className: "px-4 py-3 font-medium text-slate-900 dark:text-slate-50", children: incident.incidentId }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: incident.challanNo }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: incident.vehicleNo }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: incident.violationType }),
                                _jsx("td", { className: "px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50", children: formatCurrency(incident.amount) }),
                                _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-block px-2.5 py-1 rounded text-xs font-medium ${incident.status === 'Resolved' || incident.status === 'Closed' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : incident.status === 'In Progress' ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`, children: incident.status }) }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: formatDate(incident.assignedDate) }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: incident.resolutionDate ? formatDate(incident.resolutionDate) : '-' }),
                                _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: () => onViewIncident?.(incident.incidentId), className: "text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline", children: "View Details" }) })
                            ] }, incident.id)
                        )) })
                    ] }) })
                )
            ] })),
            // Invoicing Tab
            activeTab === 'invoicing' && (_jsxs("div", { children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                    _jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: ["Pending to Invoice (", pendingInvoices.length, ")"] }),
                    _jsxs("button", { onClick: onRaiseInvoice, className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4" }), "Raise Invoice"] })
                ] }),
                _jsxs("div", { className: "mb-6 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800", children: [
                    _jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400 font-medium mb-1", children: "Total Pending Amount" }),
                    _jsx("p", { className: "text-2xl font-semibold text-amber-900 dark:text-amber-50", children: formatCurrency(totalPendingAmount) })
                ] }),
                pendingInvoices.length === 0 ? (
                    _jsxs("div", { className: "text-center py-12", children: [
                        _jsx(Receipt, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" }),
                        _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "No payments pending to invoice" })
                    ] })
                ) : (
                    _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [
                        _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800", children: [
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Incident ID" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Resolution Date" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Total Fees" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Status" })
                        ] }) }),
                        _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: pendingInvoices.map((invoice) => (
                            _jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                                _jsx("td", { className: "px-4 py-3 font-medium text-slate-900 dark:text-slate-50", children: invoice.incidentId }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: formatDate(invoice.resolutionDate) }),
                                _jsx("td", { className: "px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50", children: formatCurrency(invoice.commissionAmount) }),
                                _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-block px-2.5 py-1 rounded text-xs font-medium ${invoice.status === 'Settled' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : invoice.status === 'Refund' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`, children: invoice.status }) })
                            ] }, invoice.id)
                        )) })
                    ] }) })
                )
            ] })),
            // Transactions Tab
            activeTab === 'transactions' && (_jsxs("div", { children: [
                _jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6", children: ["Payment History (", transactions.length, ")"] }),
                transactions.length === 0 ? (
                    _jsxs("div", { className: "text-center py-12", children: [
                        _jsx(Wallet, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" }),
                        _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "No payment transactions yet" })
                    ] })
                ) : (
                    _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [
                        _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800", children: [
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Transaction ID" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Invoice No" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Amount" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Payment Date" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Payment Method" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Status" }),
                            _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Actions" })
                        ] }) }),
                        _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: transactions.map((transaction) => (
                            _jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                                _jsx("td", { className: "px-4 py-3 font-medium text-slate-900 dark:text-slate-50", children: transaction.transactionId }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: transaction.invoiceNo }),
                                _jsx("td", { className: "px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400", children: formatCurrency(transaction.amount) }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: formatDate(transaction.paymentDate) }),
                                _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: transaction.paymentMethod }),
                                _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-block px-2.5 py-1 rounded text-xs font-medium ${transaction.status === 'Paid' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : transaction.status === 'Processing' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`, children: transaction.status }) }),
                                _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: () => onViewTransaction?.(transaction.transactionId), className: "text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline", children: "View" }) })
                            ] }, transaction.id)
                        )) })
                    ] }) })
                )
            ] }))
        ] })
    ] }) }));
}
function Section({ title, icon, children, fullWidth, }) {
    return (_jsxs("div", { className: `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg ${fullWidth ? 'lg:col-span-2' : ''}`, children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-700", children: [_jsx("span", { className: "text-slate-400 dark:text-slate-500", children: icon }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title })] }), _jsx("div", { className: "px-4 py-2", children: children })] }));
}
function InfoRow({ label, value }) {
    return (_jsxs("div", { className: "py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-start gap-4", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 flex-shrink-0", children: label }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white text-right", children: value })] }));
}
function DocumentCard({ label, number, hasDocument, }) {
    return (_jsx("div", { className: `p-3 rounded-lg border ${hasDocument ? 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: label }), number && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5", children: number }))] }), hasDocument ? (_jsx("button", { className: "p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors", children: _jsx(Download, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })) : (_jsx("span", { className: "text-xs text-red-600 dark:text-red-400", children: "Missing" }))] }) }));
}
