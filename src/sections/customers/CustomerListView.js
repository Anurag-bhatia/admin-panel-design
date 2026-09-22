import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/customers/data.json';
import { CustomerList } from './components/CustomerList';
import { CustomerDetail } from './components/CustomerDetail';
export default function CustomerListView() {
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const customers = data.customers;
    const vehicles = data.vehicles;
    const incidents = data.incidents;
    const challans = data.challans;
    const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) ?? null;
    if (selectedCustomer) {
        const customerVehicles = vehicles.filter((v) => v.customerId === selectedCustomer.id);
        const customerIncidents = incidents.filter((i) => selectedCustomer.incidentIds.includes(i.id));
        const customerChallans = challans.filter((c) => selectedCustomer.challanIds.includes(c.id));
        return (_jsx(CustomerDetail, { customer: selectedCustomer, vehicles: customerVehicles, incidents: customerIncidents, challans: customerChallans, onBack: () => setSelectedCustomerId(null), onViewIncident: (id) => console.log('View incident:', id), onViewChallan: (id) => console.log('View challan:', id) }));
    }
    return (_jsx(CustomerList, { customers: customers, onSearch: (query) => console.log('Search customers:', query), onViewCustomer: (id) => setSelectedCustomerId(id) }));
}
