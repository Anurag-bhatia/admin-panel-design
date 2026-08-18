import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/customers/data.json';
import { CustomerList } from './components/CustomerList';
export default function CustomerListView() {
    return (_jsx(CustomerList, { customers: data.customers, onSearch: (query) => console.log('Search visitors:', query) }));
}
