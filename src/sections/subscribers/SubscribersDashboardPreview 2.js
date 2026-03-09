import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/subscribers/data.json';
import { SubscribersDashboard } from './components/SubscribersDashboard';
export default function SubscribersDashboardPreview() {
    return (_jsx(SubscribersDashboard, { subscribers: data.subscribers, subscriptions: data.subscriptions, users: data.users, partners: data.partners, subscriberSources: data.subscriberSources, subscriberTypes: data.subscriberTypes, subscriberSubTypes: data.subscriberSubTypes, planTypes: data.planTypes, priceCategories: data.priceCategories, documents: data.documents, vehicles: data.vehicles, drivers: data.drivers, followUps: data.followUps, onViewIncident: (incidentId) => console.log('View incident:', incidentId) }));
}
