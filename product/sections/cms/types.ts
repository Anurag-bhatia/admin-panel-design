// =============================================================================
// Data Types
// =============================================================================

export interface Blog {
  id: string
  srNo: number
  name: string
  category: string
  author: string
  readMins: number
  featuredOnChallanPay: boolean
  icon: string
  altText: string
  status: 'enabled' | 'disabled'
  content?: string
  createdAt: string
  updatedAt: string
}

export interface EventNews {
  id: string
  srNo: number
  name: string
  category: string
  author: string
  readMins: number
  icon: string
  altText?: string
  status: 'enabled' | 'disabled'
  content?: string
  createdAt: string
  updatedAt: string
}

export type BannerWebsite = 'lawyered' | 'challanpay' | 'lots247'

export interface Banner {
  id: string
  srNo: number
  name: string
  website: BannerWebsite
  webImage: string
  mobileImage: string
  status: 'enabled' | 'disabled'
  createdAt: string
  updatedAt: string
}

// =============================================================================
// Coupon
// =============================================================================

export type CouponStatus = 'draft' | 'active' | 'paused' | 'expired' | 'archived'
export type CouponType = 'flat' | 'percentage'
export type CouponPlatform = 'challanpay' | 'lots247'
export type CouponProduct = 'all' | 'challan' | 'subscription'
export type CouponChallanType = 'online' | 'regularCourt' | 'xpressCourt'

export interface Coupon {
  id: string
  code: string
  description?: string
  note?: string
  type: CouponType
  value: number
  maxDiscountCap?: number
  startAt: string
  endAt: string
  minOrderValue?: number
  platforms: CouponPlatform[]
  product: CouponProduct
  challanTypes: CouponChallanType[]
  states: string[]
  applicableOnPartner: boolean
  partnerIds: string[]
  totalUsageLimit?: number
  perUserUsageLimit?: number
  stackable: boolean
  status: CouponStatus
  usageCount: number
  advancedRules?: AdvancedRules
  createdBy: string
  createdAt: string
  updatedAt: string
}

// =============================================================================
// Advanced Rules
// =============================================================================

export type RuleCategory =
  | 'customerHistory'
  | 'customerIdentity'
  | 'vehicle'
  | 'challan'
  | 'cartAndAmount'
  | 'timeWindow'
  | 'couponWalletCombo'
  | 'couponToWalletConversion'

export interface Rule {
  id: string
  category: RuleCategory
  attribute: string
  operator: string
  value: string | number | string[]
}

export interface RuleGroup {
  id: string
  isExclusion: boolean
  rules: Rule[]
}

export interface AdvancedRules {
  groups: RuleGroup[]
}

// =============================================================================
// Wallet Programme
// =============================================================================

export type ProgrammeStatus =
  | 'draft'
  | 'scheduled'
  | 'active'
  | 'paused'
  | 'exhausted'
  | 'expired'
  | 'archived'

export type ProgrammeType =
  | 'firstTimeCheck'
  | 'postPaymentReward'
  | 'influencer'
  | 'corporate'
  | 'specificCustomers'

export type ProgrammeAudience = 'all' | 'newOnly'
export type ProgrammePauseState = 'none' | 'issuing' | 'redemption' | 'both'
export type RewardBasis = 'fixedCoins' | 'percentOfCash'
export type PerCartCapType = 'percent' | 'fixed'
export type LotUseOrder = 'earliestExpiryFirst' | 'other'
export type ProgrammeChargeComponent =
  | 'convenience'
  | 'lawyerFee'
  | 'subscription'
  | 'other'

export interface ProgrammeCustomerText {
  displayName: string
  description: string
  issuedMessage: string
  usedMessage: string
  expiringMessage: string
}

export interface Programme {
  id: string
  name: string
  code: string
  type: ProgrammeType
  status: ProgrammeStatus
  pauseState: ProgrammePauseState
  internalDescription?: string
  audience: ProgrammeAudience
  minimumCashPaid?: number
  campaignCode?: string
  mobileNumbers?: string[]
  limitPerCustomer: number
  coinsPerCustomer: number
  rewardBasis?: RewardBasis
  percentOfCash?: number
  startAt: string
  endAt: string
  creditValidityDays?: number
  creditValidityDate?: string
  perCartCapType: PerCartCapType
  perCartCapValue: number
  partialUse: boolean
  chargeComponents: ProgrammeChargeComponent[]
  lotUseOrder: LotUseOrder
  budgetCoins: number
  alertLevelPercent?: number
  hardStopCoins: number
  coinsIssued: number
  coinsUsed: number
  coinsExpired: number
  customerText: ProgrammeCustomerText
  createdBy: string
  createdAt: string
  updatedAt: string
  version: number
}

// =============================================================================
// Audit Log
// =============================================================================

export type AuditAction =
  | 'created'
  | 'edited'
  | 'activated'
  | 'scheduled'
  | 'issuingPaused'
  | 'issuingResumed'
  | 'redemptionPaused'
  | 'redemptionResumed'
  | 'archived'
  | 'cloned'
  | 'uploadProcessed'
  | 'exported'

export interface AuditLogEntry {
  id: string
  action: AuditAction
  actorName: string
  timestamp: string
  programmeId?: string
  programmeCode?: string
  details: string
}

// =============================================================================
// Customer Credit
// =============================================================================

export type CreditLotSource =
  | 'firstTimeCheck'
  | 'postPaymentReward'
  | 'influencer'
  | 'corporate'
  | 'specificCustomers'
  | 'couponConversion'

export interface CreditLot {
  id: string
  programmeId?: string
  programmeCode?: string
  programmeName?: string
  source: CreditLotSource
  coinsIssued: number
  coinsAvailable: number
  coinsReserved: number
  issuedOn: string
  expiresOn: string
}

export type CreditHistoryEntryType =
  | 'issue'
  | 'reservation'
  | 'use'
  | 'release'
  | 'expiry'
  | 'reversal'

export interface CreditHistoryEntry {
  id: string
  entryType: CreditHistoryEntryType
  coins: number
  runningBalance: number
  orderId?: string
  causedBy: string
  timestamp: string
}

export interface CustomerCredit {
  mobileNumber: string
  vehicleNumbers: string[]
  customerName?: string
  totalAvailable: number
  totalReserved: number
  lots: CreditLot[]
  history: CreditHistoryEntry[]
}

// =============================================================================
// Wallet Permissions (8.10 — action-based, not role-based)
// =============================================================================

export type WalletPermission =
  | 'createProgramme'
  | 'editDraftProgramme'
  | 'activateOrSchedule'
  | 'pauseResumeIssuing'
  | 'pauseResumeRedemption'
  | 'archiveProgramme'
  | 'cloneProgramme'
  | 'viewCustomerCredit'
  | 'viewReports'
  | 'viewAuditLog'
  | 'exportData'

export type WalletPermissions = Record<WalletPermission, boolean>

export const walletPermissionLabels: Record<WalletPermission, string> = {
  createProgramme: 'Create programme',
  editDraftProgramme: 'Edit draft programme',
  activateOrSchedule: 'Activate or schedule programme',
  pauseResumeIssuing: 'Pause or resume issuing',
  pauseResumeRedemption: 'Pause or resume redemption',
  archiveProgramme: 'Archive programme',
  cloneProgramme: 'Clone programme',
  viewCustomerCredit: 'View customer credit and history',
  viewReports: 'View reports',
  viewAuditLog: 'View audit log',
  exportData: 'Export data',
}

export const defaultWalletPermissions: WalletPermissions = {
  createProgramme: true,
  editDraftProgramme: true,
  activateOrSchedule: true,
  pauseResumeIssuing: true,
  pauseResumeRedemption: true,
  archiveProgramme: true,
  cloneProgramme: true,
  viewCustomerCredit: true,
  viewReports: true,
  viewAuditLog: true,
  exportData: true,
}

// =============================================================================
// Component Props
// =============================================================================

export interface CMSDashboardProps {
  blogs: Blog[]
  eventsNews: EventNews[]
  onAddBlog?: () => void
  onAddEventNews?: () => void
  onToggleEventNewsStatus?: (id: string, newStatus: 'enabled' | 'disabled') => void
  onEditEventNews?: (id: string) => void
  onDeleteEventNews?: (id: string) => void
  onSearchBlogs?: (query: string) => void
  onSearchEventsNews?: (query: string) => void
}

export interface BlogListProps {
  blogs: Blog[]
  onAddBlog?: () => void
  onToggleStatus?: (id: string, newStatus: 'enabled' | 'disabled') => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onSearch?: (query: string) => void
}

export interface EventNewsListProps {
  eventsNews: EventNews[]
  onAddEventNews?: () => void
  onToggleStatus?: (id: string, newStatus: 'enabled' | 'disabled') => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onSearch?: (query: string) => void
}

export interface AddBlogModalProps {
  onSubmit?: (blogData: Partial<Blog>) => void
  onCancel?: () => void
}

export interface AddEventNewsModalProps {
  onSubmit?: (eventNewsData: Partial<EventNews>) => void
  onCancel?: () => void
}
