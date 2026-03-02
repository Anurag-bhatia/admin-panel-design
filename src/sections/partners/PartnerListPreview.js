import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/partners/data.json';
import { PartnersDashboard } from './components/PartnersDashboard';
export default function PartnerListPreview() {
    return (_jsx(PartnersDashboard, { partners: data.partners, onViewIncidents: (subscriberId) => console.log('View incidents for subscriber:', subscriberId) }));
}
