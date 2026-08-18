import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { PartnerList } from './PartnerList';
import { PartnerDetail } from './PartnerDetail';
import { AddPartner } from './AddPartner';
import { AddPartnerChallanPay } from './AddPartnerChallanPay';
import { EditPartner } from './EditPartner';
import { PartnersListHeader } from './PartnersListHeader';
import { AssignAgentModal } from '../../incidents/components/AssignAgentModal';
import { AddSubscriberModal } from '../../subscribers/components/AddSubscriberModal';
import subscriberData from '@/../product/sections/subscribers/data.json';
import incidentData from '@/../product/sections/incidents/data.json';
export function PartnersDashboard({ partners, onViewIncidents }) {
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(null);
    const [editingPartnerId, setEditingPartnerId] = useState(null);
    const [activePartnerType, setActivePartnerType] = useState('challanPay');
    const [showAddSubscriberModal, setShowAddSubscriberModal] = useState(false);
    const [bulkAssignPartnerIds, setBulkAssignPartnerIds] = useState(null);
    const [expandedStage, setExpandedStage] = useState(null);
    const [activeTeam, setActiveTeam] = useState('all');
    const selectedPartner = selectedPartnerId ? partners.find(p => p.id === selectedPartnerId) : null;
    const editingPartner = editingPartnerId ? partners.find(p => p.id === editingPartnerId) : null;
    const challanPayPartners = partners.filter(p => p.partnerType === 'challanPay');
    const teamFilteredPartners = activeTeam === 'all'
        ? challanPayPartners
        : challanPayPartners.filter(p => p.team === activeTeam);
    const challanPayCount = teamFilteredPartners.length;
    const lots247Count = partners.filter(p => p.partnerType === 'lots247').length;
    const filteredPartners = partners.filter(p => p.partnerType === activePartnerType);
    // Stage counts for ChallanPay summary cards (team-filtered)
    const stageRegistration = teamFilteredPartners.filter(p => p.stage === 'registration').length;
    const stageVerification = teamFilteredPartners.filter(p => p.stage === 'verification').length;
    const stageActivation = teamFilteredPartners.filter(p => p.stage === 'activation').length;
    const stageMobilisation = teamFilteredPartners.filter(p => p.stage === 'mobilisation').length;
    // Verification sub-metrics
    const getVerificationMetrics = () => {
        const verificationPartners = teamFilteredPartners.filter(p => p.stage === 'verification');
        return {
            emailVerified: verificationPartners.filter(p => p.emailVerified).length,
            profileVerified: verificationPartners.filter(p => p.profileCompletion != null && p.profileCompletion >= 100).length,
        };
    };
    // Activation sub-metrics
    const getActivationMetrics = () => {
        const activationPartners = teamFilteredPartners.filter(p => p.stage === 'activation');
        return {
            qrActivated: activationPartners.filter(p => p.activationActivity === 'qrActivated').length,
            qrUnlocked: activationPartners.filter(p => p.activationActivity === 'qrUnlocked').length,
            kitSend: activationPartners.filter(p => p.kitSent).length,
        };
    };
    // Mobilisation sub-metrics
    const getMobilisationMetrics = () => {
        const mobilisationPartners = teamFilteredPartners.filter(p => p.stage === 'mobilisation');
        const totalAmount = mobilisationPartners.reduce((sum, p) => sum + (p.earnings ?? 0), 0);
        const totalEarning = mobilisationPartners.reduce((sum, p) => sum + (p.totalCommission ?? 0) + (p.totalRspBenefit ?? 0), 0);
        const totalConvertedUsers = mobilisationPartners.reduce((sum, p) => sum + (p.linkedSubscribers?.length ?? 0), 0);
        return { totalAmount, totalEarning, totalConvertedUsers };
    };
    const formatCurrency = (n) => n >= 10000000
        ? `₹${(n / 10000000).toFixed(1)}Cr`
        : n >= 100000
            ? `₹${(n / 100000).toFixed(1)}L`
            : n >= 1000
                ? `₹${(n / 1000).toFixed(1)}k`
                : `₹${n}`;
    // If a partner is selected, show detail view
    if (selectedPartner) {
        return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx(PartnerDetail, { partner: selectedPartner, onBack: () => setSelectedPartnerId(null), onEditPartner: (id) => setEditingPartnerId(id), onViewIncidents: onViewIncidents, onUploadDocument: (id, file) => console.log('Upload document:', id, file), onDeleteDocument: (id, documentId) => console.log('Delete document:', documentId), onAddSubscriber: () => setShowAddSubscriberModal(true), onBulkImportSubscribers: () => console.log('Bulk import subscribers') }), editingPartner && editingPartner.partnerType === 'challanPay' && (_jsx(AddPartnerChallanPay, { partner: editingPartner, onSubmit: (data) => {
                        console.log('Update ChallanPay partner:', editingPartnerId, data);
                        setEditingPartnerId(null);
                    }, onCancel: () => setEditingPartnerId(null) })), editingPartner && editingPartner.partnerType === 'lots247' && (_jsx(EditPartner, { partner: editingPartner, onSubmit: (partnerData) => {
                        console.log('Update partner:', editingPartnerId, partnerData);
                        setEditingPartnerId(null);
                    }, onCancel: () => setEditingPartnerId(null) })), showAddSubscriberModal && (_jsx(AddSubscriberModal, { users: subscriberData.users, partners: subscriberData.partners, subscriberSources: subscriberData.subscriberSources, subscriberTypes: subscriberData.subscriberTypes, subscriberSubTypes: subscriberData.subscriberSubTypes, onSubmit: (data) => {
                        console.log('Add subscriber from partner:', selectedPartner.id, data);
                        setShowAddSubscriberModal(false);
                    }, onClose: () => setShowAddSubscriberModal(false) }))] }));
    }
    // Otherwise show list view
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8", children: [_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx(PartnersListHeader, { onCreateChallanPay: () => setShowAddModal('challanPay'), onCreateLots247: () => setShowAddModal('lots247'), onExport: () => console.log('Export partners') }), _jsx("div", { className: "mt-6", children: _jsx("div", { className: "inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1", children: ([
                                { key: 'challanPay', label: 'ChallanPay', count: challanPayCount },
                                { key: 'lots247', label: 'LOTS247', count: lots247Count },
                            ]).map((tab) => (_jsxs("button", { onClick: () => setActivePartnerType(tab.key), className: `px-5 py-2 rounded-lg text-sm font-medium transition-all ${activePartnerType === tab.key
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`, children: [tab.label, " (", tab.count, ")"] }, tab.key))) }) }), activePartnerType === 'challanPay' && (_jsxs("div", { className: "mt-6", children: [_jsx("div", { className: "flex items-center gap-2 mb-4", children: ([
                                    { key: 'all', label: 'All Teams' },
                                    { key: 'marketing', label: 'Marketing' },
                                    { key: 'sales', label: 'Sales' },
                                ]).map((tab) => (_jsx("button", { onClick: () => setActiveTeam(tab.key), className: `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTeam === tab.key
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300'}`, children: tab.label }, tab.key))) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-3", children: [
                                    { key: 'total', label: 'Total RoadSmart Partners', value: challanPayCount, accent: 'cyan' },
                                    { key: 'registration', label: 'Registration', value: stageRegistration, accent: 'amber' },
                                    { key: 'verification', label: 'Verification', value: stageVerification, accent: 'violet' },
                                    { key: 'activation', label: 'Activation', value: stageActivation, accent: 'blue' },
                                    { key: 'mobilisation', label: 'Mobilisation', value: stageMobilisation, accent: 'emerald' },
                                ].map((card) => {
                                    const isExpanded = expandedStage === card.key;
                                    const accentBorder = {
                                        cyan: 'border-l-cyan-500',
                                        amber: 'border-l-amber-500',
                                        blue: 'border-l-blue-500',
                                        violet: 'border-l-violet-500',
                                        emerald: 'border-l-emerald-500',
                                    };
                                    const accentBg = {
                                        cyan: 'bg-cyan-50 dark:bg-cyan-950/20',
                                        amber: 'bg-amber-50 dark:bg-amber-950/20',
                                        blue: 'bg-blue-50 dark:bg-blue-950/20',
                                        violet: 'bg-violet-50 dark:bg-violet-950/20',
                                        emerald: 'bg-emerald-50 dark:bg-emerald-950/20',
                                    };
                                    return (_jsx("div", { className: `relative rounded-xl p-4 border-l-[3px] transition-all cursor-default ${accentBorder[card.accent]} ${isExpanded
                                            ? `${accentBg[card.accent]} border border-slate-200/80 dark:border-slate-700/80 shadow-md`
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'}`, children: _jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2", children: card.label }), _jsx("p", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: card.value })] }), (card.key === 'verification' || card.key === 'activation' || card.key === 'mobilisation') && (_jsx("button", { onClick: () => setExpandedStage(isExpanded ? null : card.key), className: `mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg transition-all ${isExpanded
                                                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rotate-45'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'}`, children: _jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("line", { x1: "6", y1: "2", x2: "6", y2: "10" }), _jsx("line", { x1: "2", y1: "6", x2: "10", y2: "6" })] }) }))] }) }, card.key));
                                }) }), expandedStage && (expandedStage === 'verification' || expandedStage === 'activation' || expandedStage === 'mobilisation') && (() => {
                                const stageKeys = ['total', 'registration', 'verification', 'activation', 'mobilisation'];
                                const idx = stageKeys.indexOf(expandedStage);
                                const notchLeft = ((idx + 0.5) / 5) * 100;
                                const verificationMetrics = expandedStage === 'verification' ? getVerificationMetrics() : null;
                                const activationMetrics = expandedStage === 'activation' ? getActivationMetrics() : null;
                                const mobilisationMetrics = expandedStage === 'mobilisation' ? getMobilisationMetrics() : null;
                                const headerLabel = expandedStage === 'verification'
                                    ? 'Verification Status'
                                    : expandedStage === 'activation'
                                        ? 'Activation Status'
                                        : 'Mobilisation Performance';
                                return (_jsxs("div", { className: "relative mt-4", children: [_jsxs("div", { className: "absolute -top-2 z-10", style: { left: `${notchLeft}%`, transform: 'translateX(-50%)' }, children: [_jsx("div", { className: "w-0 h-0 absolute -top-px", style: {
                                                        borderLeft: '10px solid transparent',
                                                        borderRight: '10px solid transparent',
                                                        borderBottom: '10px solid var(--notch-border, #e2e8f0)',
                                                    } }), _jsx("div", { className: "w-0 h-0 relative", style: {
                                                        top: '1px',
                                                        borderLeft: '10px solid transparent',
                                                        borderRight: '10px solid transparent',
                                                        borderBottom: '10px solid var(--notch-fill, #ffffff)',
                                                    } })] }), _jsxs("div", { className: "rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4", style: {
                                                '--notch-border': 'var(--tw-border-opacity, 1)',
                                                '--notch-fill': 'var(--tw-bg-opacity, 1)',
                                            }, ref: (el) => {
                                                if (el) {
                                                    const styles = getComputedStyle(el);
                                                    el.style.setProperty('--notch-border', styles.borderColor);
                                                    el.style.setProperty('--notch-fill', styles.backgroundColor);
                                                }
                                            }, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3", children: headerLabel }), verificationMetrics && (_jsx("div", { className: "grid grid-cols-2 gap-2.5", children: ([
                                                        { label: 'Email Verified', value: verificationMetrics.emailVerified, dot: 'bg-violet-500' },
                                                        { label: 'Profile Verified', value: verificationMetrics.profileVerified, dot: 'bg-emerald-500' },
                                                    ]).map((sub) => (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg px-3.5 py-3 border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${sub.dot}` }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: sub.label })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: sub.value })] }, sub.label))) })), activationMetrics && (_jsx("div", { className: "grid grid-cols-3 gap-2.5", children: ([
                                                        { label: 'QR Activated', value: activationMetrics.qrActivated, dot: 'bg-blue-500' },
                                                        { label: 'QR Unlocked', value: activationMetrics.qrUnlocked, dot: 'bg-cyan-500' },
                                                        { label: 'Kit Send', value: activationMetrics.kitSend, dot: 'bg-emerald-500' },
                                                    ]).map((sub) => (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg px-3.5 py-3 border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${sub.dot}` }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: sub.label })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: sub.value })] }, sub.label))) })), mobilisationMetrics && (_jsx("div", { className: "grid grid-cols-3 gap-2.5", children: ([
                                                        { label: 'Total Amount', value: formatCurrency(mobilisationMetrics.totalAmount), dot: 'bg-emerald-500' },
                                                        { label: 'Total Earning', value: formatCurrency(mobilisationMetrics.totalEarning), dot: 'bg-amber-500' },
                                                        { label: 'Total Converted Users', value: mobilisationMetrics.totalConvertedUsers, dot: 'bg-blue-500' },
                                                    ]).map((sub) => (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg px-3.5 py-3 border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${sub.dot}` }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: sub.label })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: sub.value })] }, sub.label))) }))] })] }));
                            })()] })), _jsx("div", { className: "mt-6", children: _jsx(PartnerList, { partners: filteredPartners, partnerType: activePartnerType, onView: (id) => setSelectedPartnerId(id), onToggleStatus: (id, status) => console.log('Toggle status:', id, status), onBulkAssign: (ids) => setBulkAssignPartnerIds(ids) }) })] }), showAddModal === 'challanPay' && (_jsx(AddPartnerChallanPay, { onSubmit: (data) => {
                    console.log('Create ChallanPay partner:', data);
                    setShowAddModal(null);
                }, onCancel: () => setShowAddModal(null) })), showAddModal === 'lots247' && (_jsx(AddPartner, { onSubmit: (partnerData) => {
                    console.log('Create partner:', partnerData);
                    setShowAddModal(null);
                }, onCancel: () => setShowAddModal(null) })), bulkAssignPartnerIds && (_jsx(AssignAgentModal, { selectedCount: bulkAssignPartnerIds.length, users: incidentData.users, entityLabel: "partner", onAssign: (agentId, notes) => {
                    console.log('Assign agent:', agentId, 'to partners:', bulkAssignPartnerIds, 'notes:', notes);
                    setBulkAssignPartnerIds(null);
                }, onClose: () => setBulkAssignPartnerIds(null) }))] }));
}
