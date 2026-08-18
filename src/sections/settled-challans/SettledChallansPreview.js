import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/settled-challans/data.json';
import { SettledChallansDashboard } from './components/SettledChallansDashboard';
export default function SettledChallansPreview() {
    return (_jsx(SettledChallansDashboard, { settledChallans: data.settledChallans, onSearch: (query) => console.log('Search:', query), onFilter: (filters) => console.log('Filter:', filters), onExport: () => console.log('Export triggered'), onPageChange: (page) => console.log('Page:', page) }));
}
