// =============================================================================
// Data Types
// =============================================================================

export interface SettledChallan {
  id: string
  vehicleNo: string
  subscriber: string
  subscriberEmail: string
  subscriberPhone: string
  challanNo: string
  offenceName: string
  state: string
  amount: number
  settledDate: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettledChallansProps {
  /** The list of settled challans to display */
  settledChallans: SettledChallan[]
  /** Called when user searches the table */
  onSearch?: (query: string) => void
  /** Called when user applies filters */
  onFilter?: (filters: SettledChallansFilters) => void
  /** Called when user exports the filtered data */
  onExport?: () => void
  /** Called when user changes the page */
  onPageChange?: (page: number) => void
}

// =============================================================================
// Filter Types
// =============================================================================

export interface SettledChallansFilters {
  dateFrom?: string
  dateTo?: string
  subscriber?: string
  state?: string
  amountMin?: number
  amountMax?: number
}
