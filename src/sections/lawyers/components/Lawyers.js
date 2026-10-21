import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { LawyerTable } from './LawyerTable';
import { LawyerProfile } from './LawyerProfile';
import { LawyerForm } from './LawyerForm';
// Sample data for the new tabs
const sampleIncidents = [
    {
        id: '1',
        incidentId: 'IRN-12341',
        challanNo: 'MH012024789451',
        vehicleNo: 'MH01AB1234',
        violationType: 'Over Speeding',
        amount: 2500,
        status: 'Resolved',
        assignedDate: '2024-01-15',
        resolutionDate: '2024-01-22',
        subscriberName: 'BlueDart Logistics',
        subscriberId: 'LWD-1160521',
        challanType: 'court',
        createdAt: '2026-07-01T15:00:00Z',
        updatedAt: '2026-07-22T11:20:00Z',
    },
    {
        id: '2',
        incidentId: 'IRN-12342',
        challanNo: 'MH012024789452',
        vehicleNo: 'DL02CD5678',
        violationType: 'Red Light Violation',
        amount: 5000,
        status: 'In Progress',
        assignedDate: '2024-01-20',
        resolutionDate: null,
        subscriberName: 'Ramesh Sharma',
        subscriberId: 'LWD-1160522',
        challanType: 'online',
        createdAt: '2026-07-05T10:00:00Z',
        updatedAt: '2026-07-25T14:10:00Z',
    },
    {
        id: '3',
        incidentId: 'IRN-12343',
        challanNo: 'MH012024789453',
        vehicleNo: 'HR26EF9012',
        violationType: 'No Parking',
        amount: 1500,
        status: 'Assigned',
        assignedDate: '2024-01-25',
        resolutionDate: null,
        subscriberName: 'FreshFleet Pvt Ltd',
        subscriberId: 'LWD-1160523',
        challanType: 'court',
        createdAt: '2026-07-09T09:30:00Z',
        updatedAt: '2026-07-09T09:30:00Z',
    },
    {
        id: '4',
        incidentId: 'IRN-12344',
        challanNo: 'MH012024789454',
        vehicleNo: 'DL03GH3456',
        violationType: 'Driving Without Helmet',
        amount: 1000,
        status: 'Closed',
        assignedDate: '2024-01-10',
        resolutionDate: '2024-01-18',
        subscriberName: 'Priya Kapoor',
        subscriberId: 'LWD-1160524',
        challanType: 'online',
        createdAt: '2026-06-28T12:45:00Z',
        updatedAt: '2026-07-18T09:15:00Z',
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
const sampleTransactionsLedger = [
    {
        id: 'l1',
        incidentId: 'TXN-2024-0078',
        resolutionDate: '2024-01-28',
        commissionAmount: 1200,
        status: 'Settled',
    },
    {
        id: 'l2',
        incidentId: 'TXN-2024-0064',
        resolutionDate: '2024-01-14',
        commissionAmount: 450,
        status: 'Settled',
    },
    {
        id: 'l3',
        incidentId: 'TXN-2023-0952',
        resolutionDate: '2023-12-30',
        commissionAmount: 300,
        status: 'Settled',
    },
    {
        id: 'l4',
        incidentId: 'TXN-2023-0941',
        resolutionDate: '2023-12-18',
        commissionAmount: 900,
        status: 'Settled',
    },
    {
        id: 'l5',
        incidentId: 'TXN-2023-0929',
        resolutionDate: '2023-12-02',
        commissionAmount: 650,
        status: 'Settled',
    },
];
const sampleTeam = [
    {
        id: 't1',
        name: 'Rohan Verma',
        role: 'Associate Lawyer',
        email: 'rohan.verma@firm.in',
        mobile: '+91 98110 45623',
        assignedIncidents: 24,
        activeIncidents: 7,
        resolvedIncidents: 17,
        joinedDate: '2023-03-15',
        status: 'Active',
        isOwner: true,
        incidentIds: [
            'IRN-2024-0018', 'IRN-2024-0024', 'IRN-2024-0037', 'IRN-2024-0051',
            'IRN-2024-0062', 'IRN-2024-0078', 'IRN-2024-0089', 'IRN-2024-0104',
        ],
    },
    {
        id: 't2',
        name: 'Priya Sharma',
        role: 'Paralegal',
        email: 'priya.sharma@firm.in',
        mobile: '+91 98211 78345',
        assignedIncidents: 18,
        activeIncidents: 4,
        resolvedIncidents: 14,
        joinedDate: '2023-07-01',
        status: 'Active',
        incidentIds: [
            'IRN-2024-0021', 'IRN-2024-0033', 'IRN-2024-0045', 'IRN-2024-0067',
            'IRN-2024-0081', 'IRN-2024-0092',
        ],
    },
    {
        id: 't3',
        name: 'Arjun Mehta',
        role: 'Junior Lawyer',
        email: 'arjun.mehta@firm.in',
        mobile: '+91 99900 12467',
        assignedIncidents: 31,
        activeIncidents: 9,
        resolvedIncidents: 22,
        joinedDate: '2022-11-20',
        status: 'Active',
        incidentIds: [
            'IRN-2024-0012', 'IRN-2024-0029', 'IRN-2024-0041', 'IRN-2024-0053',
            'IRN-2024-0069', 'IRN-2024-0074', 'IRN-2024-0087', 'IRN-2024-0095',
            'IRN-2024-0111',
        ],
    },
    {
        id: 't4',
        name: 'Neha Kapoor',
        role: 'Legal Assistant',
        email: 'neha.kapoor@firm.in',
        mobile: '+91 97112 88790',
        assignedIncidents: 12,
        activeIncidents: 0,
        resolvedIncidents: 12,
        joinedDate: '2024-01-10',
        status: 'Inactive',
        incidentIds: [
            'IRN-2023-0198', 'IRN-2023-0212', 'IRN-2023-0234', 'IRN-2023-0256',
        ],
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
export function Lawyers({ lawyers: initialLawyers, heading = 'Experts', }) {
    const [lawyers, setLawyers] = useState(initialLawyers);
    const [currentView, setCurrentView] = useState('list');
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [profileStack, setProfileStack] = useState([]);
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
        if (profileStack.length > 0) {
            const previous = profileStack[profileStack.length - 1];
            setProfileStack((s) => s.slice(0, -1));
            setSelectedLawyer(previous);
            return;
        }
        setCurrentView('list');
        setSelectedLawyer(null);
    };
    const handleViewTeamMemberProfile = (member) => {
        if (!selectedLawyer)
            return;
        const [firstName, ...rest] = member.name.split(' ');
        const lastName = rest.join(' ') || '';
        const synthetic = {
            ...selectedLawyer,
            id: `${selectedLawyer.id}-tm-${member.id}`,
            lawyerId: `TM-${member.id.toUpperCase()}`,
            firstName,
            lastName,
            email: member.email,
            mobile: member.mobile,
            category: member.role,
            subCategory: selectedLawyer.category,
            activityState: member.status,
            company: null,
            createdAt: member.joinedDate,
            lastUpdatedAt: selectedLawyer.lastUpdatedAt,
        };
        setProfileStack((s) => [...s, selectedLawyer]);
        setSelectedLawyer(synthetic);
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
        return (_jsx(LawyerProfile, { lawyer: selectedLawyer, incidents: sampleIncidents, pendingInvoices: samplePendingInvoices, transactionsLedger: sampleTransactionsLedger, transactions: sampleTransactions, team: sampleTeam, onBack: handleBack, onEdit: () => setCurrentView('edit'), onDeactivate: () => {
                handleDeactivate(selectedLawyer.id);
                setSelectedLawyer({ ...selectedLawyer, activityState: 'Inactive' });
            }, onReactivate: () => {
                handleReactivate(selectedLawyer.id);
                setSelectedLawyer({ ...selectedLawyer, activityState: 'Active' });
            }, onViewIncident: (id) => console.log('View incident:', id), onViewTransaction: (id) => console.log('View transaction:', id), onViewTeamMember: (id) => console.log('View team member:', id), onViewTeamMemberProfile: handleViewTeamMemberProfile }, selectedLawyer.id));
    }
    if (currentView === 'add' || (currentView === 'edit' && selectedLawyer)) {
        return (_jsx(LawyerForm, { lawyer: selectedLawyer, onBack: handleBack, onSave: handleSave, isEdit: currentView === 'edit', isBusiness: heading === 'Business' }));
    }
    return (_jsx(LawyerTable, { lawyers: lawyers, onView: handleView, onEdit: handleEdit, onAdd: handleAdd, onDeactivate: handleDeactivate, onReactivate: handleReactivate, heading: heading }));
}
