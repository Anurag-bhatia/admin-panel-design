import { Car, CheckCircle2 } from 'lucide-react'
import type { Customer } from '@/../product/sections/customers/types'

interface CustomerRowProps {
  customer: Customer
  onClick?: () => void
}

export function CustomerRow({ customer, onClick }: CustomerRowProps) {
  // Mock data for paid challans - in real app, this would come from the customer object
  const paidChallans = customer.totalIncidents || 0
  const paidChallanAmount = (customer.totalIncidents || 0) * 1500 // Mock calculation

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
    >
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

      {/* Paid Challans */}
      <div className="flex-1 hidden xl:flex items-center gap-2">
        {paidChallans > 0 ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{paidChallans}</span>
          </>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">0</span>
        )}
      </div>

      {/* Paid Challan Amount */}
      <div className="flex-1 hidden xl:block">
        {paidChallanAmount > 0 ? (
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(paidChallanAmount)}
          </span>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">₹0</span>
        )}
      </div>
    </div>
  )
}
