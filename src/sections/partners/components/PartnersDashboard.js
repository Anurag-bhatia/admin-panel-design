import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { PartnerList } from './PartnerList';
import { PartnerDetail } from './PartnerDetail';
import { AddPartner } from './AddPartner';
import { EditPartner } from './EditPartner';
import { PartnersListHeader } from './PartnersListHeader';
export function PartnersDashboard({ partners, onViewIncidents }) {
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPartnerId, setEditingPartnerId] = useState(null);
    const selectedPartner = selectedPartnerId ? partners.find(p => p.id === selectedPartnerId) : null;
    const editingPartner = editingPartnerId ? partners.find(p => p.id === editingPartnerId) : null;
    // If a partner is selected, show detail view
    if (selectedPartner) {
        return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx(PartnerDetail, { partner: selectedPartner, onBack: () => setSelectedPartnerId(null), onEditPartner: (id) => setEditingPartnerId(id), onViewIncidents: onViewIncidents, onUploadDocument: (id, file) => console.log('Upload document:', id, file), onDeleteDocument: (id, documentId) => console.log('Delete document:', documentId) }), editingPartner && (_jsx(EditPartner, { partner: editingPartner, onSubmit: (partnerData) => {
                        console.log('Update partner:', editingPartnerId, partnerData);
                        setEditingPartnerId(null);
                    }, onCancel: () => setEditingPartnerId(null) }))] }));
    }
    // Otherwise show list view
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8", children: [_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx(PartnersListHeader, { onCreatePartner: () => setShowAddModal(true) }), _jsx("div", { className: "mt-6", children: _jsx(PartnerList, { partners: partners, onView: (id) => setSelectedPartnerId(id), onToggleStatus: (id, status) => console.log('Toggle status:', id, status) }) })] }), showAddModal && (_jsx(AddPartner, { onSubmit: (partnerData) => {
                    console.log('Create partner:', partnerData);
                    setShowAddModal(false);
                }, onCancel: () => setShowAddModal(false) }))] }));
}
