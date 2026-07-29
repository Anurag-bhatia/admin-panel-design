import type { Customer } from '@/../product/sections/customers/types'
import { CustomerRow } from './CustomerRow'

interface CustomerTableProps {
  customers: Customer[]
  onViewCustomer?: (customerId: string) => void
}

export function CustomerTable({
  customers,
  onViewCustomer,
}: CustomerTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Customer Name
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden sm:block">
          Customer ID
        </div>
        <div className="flex-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden md:block">
          Vehicles
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
          <p className="text-slate-500 dark:text-slate-400">No customers found</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Get started by adding your first customer
          </p>
        </div>
      ) : (
        customers.map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            onClick={() => onViewCustomer?.(customer.id)}
          />
        ))
      )}
    </div>
  )
}
