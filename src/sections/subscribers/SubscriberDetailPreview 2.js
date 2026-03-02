import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/subscribers/data.json';
import { SubscriberDetail } from './components/SubscriberDetail';
export default function SubscriberDetailPreview() {
    const subscriber = data.subscribers[0];
    const subscription = data.subscriptions.find((sub) => sub.subscriberId === subscriber.id);
    const assignedUser = data.users.find((user) => user.id === subscriber.assignedOwner);
    // Sample incidents data (would come from incidents section in real app)
    const incidents = [
        {
            id: 'INC-2024-001',
            vehicleNumber: 'MH-02-AB-1234',
            status: 'Resolved',
            date: '2024-01-20T10:30:00Z'
        },
        {
            id: 'INC-2024-002',
            vehicleNumber: 'MH-02-CD-5678',
            status: 'In Progress',
            date: '2024-01-25T14:15:00Z'
        }
    ];
    // Sample challans data
    const challans = [
        {
            id: 'CH-2024-001',
            vehicleNumber: 'MH-02-AB-1234',
            violation: 'Over Speeding',
            amount: 2000,
            status: 'resolved',
            date: '2024-01-15T09:30:00Z'
        },
        {
            id: 'CH-2024-002',
            vehicleNumber: 'MH-02-CD-5678',
            violation: 'Red Light Violation',
            amount: 1500,
            status: 'pending',
            date: '2024-01-28T16:45:00Z'
        },
        {
            id: 'CH-2024-003',
            vehicleNumber: 'MH-02-EF-9012',
            violation: 'No Helmet',
            amount: 500,
            status: 'resolved',
            date: '2024-02-02T11:20:00Z'
        }
    ];
    // Sample wallet transactions data
    const walletTransactions = [
        {
            id: 'TXN-001',
            date: '2024-01-10T10:00:00Z',
            type: 'credit',
            description: 'Subscription Payment - Monthly Plan',
            amount: 15000,
            status: 'completed'
        },
        {
            id: 'TXN-002',
            date: '2024-01-15T14:30:00Z',
            type: 'debit',
            description: 'Challan Payment - CH-2024-001',
            amount: 2000,
            status: 'completed'
        },
        {
            id: 'TXN-003',
            date: '2024-01-20T09:15:00Z',
            type: 'credit',
            description: 'Refund for Cancelled Service',
            amount: 500,
            status: 'completed'
        },
        {
            id: 'TXN-004',
            date: '2024-02-05T16:00:00Z',
            type: 'debit',
            description: 'Commission Payment',
            amount: 1200,
            status: 'pending'
        }
    ];
    // Sample team members
    const teamMembers = data.users.slice(0, 3).map((user) => user);
    // Sample documents data
    const documents = data.documents.filter((doc) => doc.subscriberId === subscriber.id);
    const vehicles = [
        { id: 'VEH-001', subscriberId: 'LWD-1160523', vehicleNumber: 'MH-02-AB-1234', vehicleType: 'truck', make: 'Tata', model: 'Prima', registrationDate: '2022-03-15', status: 'active' },
        { id: 'VEH-002', subscriberId: 'LWD-1160523', vehicleNumber: 'MH-02-CD-5678', vehicleType: 'truck', make: 'Ashok Leyland', model: 'Captain', registrationDate: '2021-08-20', status: 'active' }
    ];
    return (_jsx(SubscriberDetail, { subscriber: subscriber, subscription: subscription, assignedUser: assignedUser, incidents: incidents, challans: challans, documents: documents, vehicles: vehicles, walletTransactions: walletTransactions, teamMembers: teamMembers, onBack: () => console.log('Back to list'), onEdit: (id) => console.log('Edit subscriber:', id), onUploadDocument: (subscriberId, file) => console.log('Upload document:', subscriberId, file.name), onDeleteDocument: (subscriberId, docId) => console.log('Delete document:', subscriberId, docId), onViewIncident: (incidentId) => console.log('View incident:', incidentId), onViewChallan: (challanId) => console.log('View challan:', challanId), onViewTransaction: (transactionId) => console.log('View transaction:', transactionId), onAssignTeamMember: () => console.log('Assign team member'), onRemoveTeamMember: (userId) => console.log('Remove team member:', userId) }));
}
