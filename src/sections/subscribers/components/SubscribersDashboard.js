import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { SubscriberList } from './SubscriberList';
import { SubscriberDetail } from './SubscriberDetail';
export function SubscribersDashboard({ subscribers, subscriptions, users, partners, subscriberSources, subscriberTypes, subscriberSubTypes, planTypes, priceCategories, documents = [], vehicles = [], drivers = [], followUps = [], onViewIncident }) {
    const [selectedSubscriberId, setSelectedSubscriberId] = useState(null);
    const selectedSubscriber = selectedSubscriberId ? subscribers.find(s => s.id === selectedSubscriberId) : null;
    const selectedSubscription = selectedSubscriber ? subscriptions.find(sub => sub.subscriberId === selectedSubscriber.id) : null;
    const assignedUser = selectedSubscriber ? users.find(u => u.id === selectedSubscriber.assignedOwner) : null;
    const subscriberDocuments = selectedSubscriber ? documents.filter((doc) => doc.subscriberId === selectedSubscriber.id) : [];
    const subscriberVehicles = selectedSubscriber ? vehicles.filter((veh) => veh.subscriberId === selectedSubscriber.id) : [];
    const subscriberDrivers = selectedSubscriber ? drivers.filter((drv) => drv.subscriberId === selectedSubscriber.id) : [];
    const subscriberFollowUps = selectedSubscriber ? followUps.filter((fup) => fup.subscriberId === selectedSubscriber.id) : [];
    // Sample incidents data (would come from incidents section in real app)
    const incidents = selectedSubscriber ? [
        {
            id: 'IRN-124501',
            vehicleNumber: 'MH02AB1234',
            status: 'Resolved',
            date: '2024-01-20T10:30:00Z'
        },
        {
            id: 'IRN-124502',
            vehicleNumber: 'MH02CD5678',
            status: 'In Progress',
            date: '2024-01-25T14:15:00Z'
        }
    ] : [];
    // If a subscriber is selected, show detail view
    if (selectedSubscriber) {
        return (_jsx(SubscriberDetail, { subscriber: selectedSubscriber, subscription: selectedSubscription || null, assignedUser: assignedUser || null, incidents: incidents, documents: subscriberDocuments, vehicles: subscriberVehicles, onBack: () => setSelectedSubscriberId(null), onEdit: (id) => console.log('Edit subscriber:', id), onUploadDocument: (subscriberId, file) => console.log('Upload document:', subscriberId, file.name), onDeleteDocument: (subscriberId, docId) => console.log('Delete document:', subscriberId, docId), onViewIncident: onViewIncident }));
    }
    // Otherwise show list view
    return (_jsx(SubscriberList, { subscribers: subscribers, subscriptions: subscriptions, users: users, partners: partners, subscriberSources: subscriberSources, subscriberTypes: subscriberTypes, subscriberSubTypes: subscriberSubTypes, planTypes: planTypes, priceCategories: priceCategories, onViewDetails: (id) => setSelectedSubscriberId(id), onEdit: (id) => console.log('Edit subscriber:', id), onAddSubscriber: () => console.log('Add subscriber'), onBulkUpload: () => console.log('Bulk upload'), onSearch: (query) => console.log('Search:', query), onFilter: (filters) => console.log('Filter:', filters) }));
}
