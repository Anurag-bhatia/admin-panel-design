import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { LawyerTable } from './LawyerTable';
import { LawyerProfile } from './LawyerProfile';
import { LawyerForm } from './LawyerForm';

// Sample data for the new tabs
const sampleIncidents = [
    {
        id: '1',
        incidentId: 'INC-2024-001',
        challanNo: 'DL-CH-2024-0892',
        vehicleNo: 'DL-01-AB-1234',
        violationType: 'Over Speeding',
        amount: 2500,
        status: 'Resolved',
        assignedDate: '2024-01-15',
        resolutionDate: '2024-01-22',
    },
    {
        id: '2',
        incidentId: 'INC-2024-002',
        challanNo: 'DL-CH-2024-1023',
        vehicleNo: 'DL-02-CD-5678',
        violationType: 'Red Light Violation',
        amount: 5000,
        status: 'In Progress',
        assignedDate: '2024-01-20',
        resolutionDate: null,
    },
    {
        id: '3',
        incidentId: 'INC-2024-003',
        challanNo: 'DL-CH-2024-1156',
        vehicleNo: 'HR-26-EF-9012',
        violationType: 'No Parking',
        amount: 1500,
        status: 'Assigned',
        assignedDate: '2024-01-25',
        resolutionDate: null,
    },
    {
        id: '4',
        incidentId: 'INC-2024-004',
        challanNo: 'DL-CH-2024-0756',
        vehicleNo: 'DL-03-GH-3456',
        violationType: 'Driving Without Helmet',
        amount: 1000,
        status: 'Closed',
        assignedDate: '2024-01-10',
        resolutionDate: '2024-01-18',
    },
];

const samplePendingInvoices = [
    {
        id: '1',
        incidentId: 'INC-2024-001',
        resolutionDate: '2024-01-22',
        commissionAmount: 500,
        status: 'Settled',
    },
    {
        id: '2',
        incidentId: 'INC-2024-004',
        resolutionDate: '2024-01-18',
        commissionAmount: 200,
        status: 'Not Settled',
    },
    {
        id: '3',
        incidentId: 'INC-2023-089',
        resolutionDate: '2024-01-05',
        commissionAmount: 750,
        status: 'Refund',
    },
];

const sampleTransactions = [
    {
        id: '1',
        transactionId: 'TXN-2024-0045',
        invoiceNo: 'INV-2024-0023',
        amount: 15000,
        paymentDate: '2024-01-10',
        paymentMethod: 'Bank Transfer',
        status: 'Paid',
    },
    {
        id: '2',
        transactionId: 'TXN-2024-0032',
        invoiceNo: 'INV-2024-0018',
        amount: 8500,
        paymentDate: '2024-01-05',
        paymentMethod: 'UPI',
        status: 'Paid',
    },
    {
        id: '3',
        transactionId: 'TXN-2023-0198',
        invoiceNo: 'INV-2023-0156',
        amount: 22000,
        paymentDate: '2023-12-28',
        paymentMethod: 'Bank Transfer',
        status: 'Paid',
    },
];

export function Lawyers({ lawyers: initialLawyers }) {
    const [lawyers, setLawyers] = useState(initialLawyers);
    const [currentView, setCurrentView] = useState('list');
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const handleView = (id) => {
        const lawyer = lawyers.find((l) => l.id === id);
        if (lawyer) {
            setSelectedLawyer(lawyer);
            setCurrentView('profile');
        }
    };
    const handleEdit = (id) => {
        const lawyer = lawyers.find((l) => l.id === id);
        if (lawyer) {
            setSelectedLawyer(lawyer);
            setCurrentView('edit');
        }
    };
    const handleAdd = () => {
        setSelectedLawyer(null);
        setCurrentView('add');
    };
    const handleDeactivate = (id) => {
        setLawyers((prev) => prev.map((l) => (l.id === id ? { ...l, activityState: 'Inactive' } : l)));
    };
    const handleReactivate = (id) => {
        setLawyers((prev) => prev.map((l) => (l.id === id ? { ...l, activityState: 'Active' } : l)));
    };
    const handleBack = () => {
        setCurrentView('list');
        setSelectedLawyer(null);
    };
    const handleSave = (lawyer) => {
        if (currentView === 'add') {
            setLawyers((prev) => [lawyer, ...prev]);
        }
        else {
            setLawyers((prev) => prev.map((l) => (l.id === lawyer.id ? lawyer : l)));
        }
        setCurrentView('list');
        setSelectedLawyer(null);
    };
    if (currentView === 'profile' && selectedLawyer) {
        return (_jsx(LawyerProfile, {
            lawyer: selectedLawyer,
            incidents: sampleIncidents,
            pendingInvoices: samplePendingInvoices,
            transactions: sampleTransactions,
            onBack: handleBack,
            onEdit: () => setCurrentView('edit'),
            onDeactivate: () => {
                handleDeactivate(selectedLawyer.id);
                setSelectedLawyer({ ...selectedLawyer, activityState: 'Inactive' });
            },
            onReactivate: () => {
                handleReactivate(selectedLawyer.id);
                setSelectedLawyer({ ...selectedLawyer, activityState: 'Active' });
            },
            onViewIncident: (id) => console.log('View incident:', id),
            onViewTransaction: (id) => console.log('View transaction:', id)
        }));
    }
    if (currentView === 'add' || (currentView === 'edit' && selectedLawyer)) {
        return (_jsx(LawyerForm, { lawyer: selectedLawyer, onBack: handleBack, onSave: handleSave, isEdit: currentView === 'edit' }));
    }
    return (_jsx(LawyerTable, { lawyers: lawyers, onView: handleView, onEdit: handleEdit, onAdd: handleAdd, onDeactivate: handleDeactivate, onReactivate: handleReactivate }));
}
