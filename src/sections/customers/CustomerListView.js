import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/customers/data.json';
import { CustomerList } from './components/CustomerList';
export default function CustomerListView() {
    return (_jsx(CustomerList, { customers: data.customers, onSearch: (query) => console.log('Search visitors:', query), onAddCustomer: () => console.log('Add new visitor'), onBulkUpload: () => console.log('Bulk upload visitors'), onExport: (ids) => console.log('Export visitors:', ids), onBulkStatusUpdate: (ids, status) => console.log('Update status:', ids, status), onBulkTag: (ids, tags) => console.log('Tag visitors:', ids, tags) }));
}
