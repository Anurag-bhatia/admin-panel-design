import type { Customer } from '../types'
import { CustomerRow } from './CustomerRow'

interface CustomerTableProps {
  customers: Customer[]
  selectedCustomers: Set<string>
  onSelectAll: (checked: boolean) => void
  onSelectCustomer: (customerId: string, checked: boolean) => void
}

export function CustomerTable({
  customers,
  selectedCustomers,
  onSelectAll,
  onSelectCustomer,
}: CustomerTableProps) {
  const allSelected = customers.length > 0 && selectedCustomers.size === customers.length
  const someSelected = selectedCustomers.size > 0 && !allSelected

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
        <div className="flex-shrink-0 w-4">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={e => onSelectAll(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer"
          />
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Visitor Name
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden sm:block">
          Visitor ID
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden md:block">
          Vehicle
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden lg:block">
          Mobile Number
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden xl:block">
          Pending Challans
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden xl:block">
          Pending Amount
        </div>
      </div>

      {/* Table Rows */}
      {customers.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No visitors found</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Get started by adding your first visitor
          </p>
        </div>
      ) : (
        customers.map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            isSelected={selectedCustomers.has(customer.id)}
            onSelect={(checked) => onSelectCustomer(customer.id, checked)}
          />
        ))
      )}
    </div>
  )
}
