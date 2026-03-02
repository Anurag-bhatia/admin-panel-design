import data from '@/../product/sections/team/data.json'
import { EmployeeDetailView as EmployeeDetailViewComponent } from './components/EmployeeDetailView'

// Preview a specific employee's detail view (first active employee)
const defaultEmployee = (data.employees as any).find((e: any) => e.status === 'active') || data.employees[0]

export default function EmployeeDetailViewPreview() {
  return (
    <EmployeeDetailViewComponent
      employee={defaultEmployee as any}
      employees={data.employees as any}
      onBack={() => console.log('Back clicked')}
      onEdit={() => console.log('Edit clicked')}
      onManagePermissions={() => console.log('Manage permissions clicked')}
      onDeactivate={() => console.log('Deactivate clicked')}
    />
  )
}
