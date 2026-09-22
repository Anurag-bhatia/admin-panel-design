import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import subscribersData from '@/../product/sections/subscribers/data.json';
import customersData from '@/../product/sections/customers/data.json';
import { SubscribersDashboard } from './components/SubscribersDashboard';
import { CustomerList } from '../customers/components/CustomerList';
import { CustomerDetail } from '../customers/components/CustomerDetail';
const TABS = [
    { key: 'customers', label: 'Customers' },
    { key: 'subscribers', label: 'Subscribers' },
];
export default function SubscribersDashboardPreview() {
    const [activeTab, setActiveTab] = useState('subscribers');
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const customers = customersData.customers;
    const customerVehiclesAll = customersData.vehicles;
    const customerIncidentsAll = customersData.incidents;
    const customerChallansAll = customersData.challans;
    const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) ?? null;
    return (_jsxs("div", { className: "flex h-full bg-slate-100 dark:bg-slate-950", children: [_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56", children: _jsx("div", { className: "flex-1 p-3", children: TABS.map((tab, index) => {
                        const isActive = activeTab === tab.key;
                        return (_jsxs("div", { children: [_jsx("button", { onClick: () => setActiveTab(tab.key), className: `w-full text-left rounded-lg px-4 py-3 text-base font-semibold transition-all ${isActive
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: tab.label }), index < TABS.length - 1 && (_jsx("div", { className: "mx-4 my-1 border-t border-slate-200 dark:border-slate-700" }))] }, tab.key));
                    }) }) }), _jsx("div", { className: "flex-1 min-w-0 overflow-auto", children: activeTab === 'customers' ? (selectedCustomer ? (_jsx(CustomerDetail, { customer: selectedCustomer, vehicles: customerVehiclesAll.filter((v) => v.customerId === selectedCustomer.id), incidents: customerIncidentsAll.filter((i) => selectedCustomer.incidentIds.includes(i.id)), challans: customerChallansAll.filter((c) => selectedCustomer.challanIds.includes(c.id)), onBack: () => setSelectedCustomerId(null), onViewIncident: (id) => console.log('View incident:', id), onViewChallan: (id) => console.log('View challan:', id) })) : (_jsx(CustomerList, { customers: customers, onSearch: (query) => console.log('Search customers:', query), onViewCustomer: (id) => setSelectedCustomerId(id) }))) : (_jsx(SubscribersDashboard, { subscribers: subscribersData.subscribers, subscriptions: subscribersData.subscriptions, users: subscribersData.users, partners: subscribersData.partners, subscriberSources: subscribersData.subscriberSources, subscriberTypes: subscribersData.subscriberTypes, subscriberSubTypes: subscribersData.subscriberSubTypes, planTypes: subscribersData.planTypes, priceCategories: subscribersData.priceCategories, utmSources: subscribersData.utmSources, vehicleTypes: subscribersData.vehicleTypes, userTypes: subscribersData.userTypes, documents: subscribersData.documents, vehicles: subscribersData.vehicles, drivers: subscribersData.drivers, followUps: subscribersData.followUps, onViewIncident: (incidentId) => console.log('View incident:', incidentId) })) })] }));
}
