import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/team/data.json';
import { EmployeeDetailView as EmployeeDetailViewComponent } from './components/EmployeeDetailView';
// Preview a specific employee's detail view (first active employee)
const defaultEmployee = data.employees.find((e) => e.status === 'active') || data.employees[0];
export default function EmployeeDetailViewPreview() {
    return (_jsx(EmployeeDetailViewComponent, { employee: defaultEmployee, employees: data.employees, onBack: () => console.log('Back clicked'), onEdit: () => console.log('Edit clicked'), onManagePermissions: () => console.log('Manage permissions clicked'), onDeactivate: () => console.log('Deactivate clicked') }));
}
