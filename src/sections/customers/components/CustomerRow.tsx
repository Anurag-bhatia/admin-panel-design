import { Car, AlertCircle } from 'lucide-react'
import type { Customer } from '@/../product/sections/customers/types'

interface CustomerRowProps {
  customer: Customer
  isSelected: boolean
  onSelect: (checked: boolean) => void
}

export function CustomerRow({ customer, isSelected, onSelect }: CustomerRowProps) {
  // Mock data for pending challans - in real app, this would come from the customer object
  const pendingChallans = customer.totalIncidents || 0
  const pendingChallanAmount = (customer.totalIncidents || 0) * 1500 // Mock calculation

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-700 ${
        isSelected ? 'bg-cyan-50 dark:bg-cyan-900/20' : 'bg-white dark:bg-slate-800'
      }`}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 w-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={e => onSelect(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer"
        />
      </div>

      {/* Visitor Name */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">{customer.name}</p>
      </div>

      {/* Visitor ID */}
      <div className="flex-1 min-w-0 hidden sm:block">
        <p className="text-sm text-slate-600 dark:text-slate-400 truncate font-medium">
          {customer.customerId}
        </p>
      </div>

      {/* Vehicles */}
      <div className="flex-1 hidden md:flex items-center gap-2">
        <Car className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{customer.totalVehicles}</span>
      </div>

      {/* Mobile Number */}
      <div className="flex-1 hidden lg:block">
        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{customer.mobile}</p>
      </div>

      {/* Pending Challans */}
      <div className="flex-1 hidden xl:flex items-center gap-2">
        {pendingChallans > 0 ? (
          <>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{pendingChallans}</span>
          </>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">0</span>
        )}
      </div>

      {/* Pending Challan Amount */}
      <div className="flex-1 hidden xl:block">
        {pendingChallanAmount > 0 ? (
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            {formatCurrency(pendingChallanAmount)}
          </span>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">₹0</span>
        )}
      </div>
    </div>
  )
}
