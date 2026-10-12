import { useState } from 'react'
import type {
  Blog,
  EventNews,
  Banner,
  Coupon,
  Programme,
  AuditLogEntry,
  CustomerCredit,
} from '@/../product/sections/cms/types'
import { BlogList } from './BlogList'
import { EventNewsList } from './EventNewsList'
import { BannerList } from './BannerList'
import { CouponList } from './CouponList'
import { WalletSection } from './WalletSection'
import { AddProgrammePage } from './AddProgrammePage'
import { AddBlogPage } from './AddBlogPage'
import { AddEventNewsPage } from './AddEventNewsPage'
import { AddBannerPage } from './AddBannerPage'
import { AddCouponPage } from './AddCouponPage'
import { CouponDetailPage } from './CouponDetailPage'

interface CMSDashboardProps {
  blogs: Blog[]
  eventsNews: EventNews[]
  banners: Banner[]
  coupons: Coupon[]
  programmes: Programme[]
  auditLog: AuditLogEntry[]
  customerCredits: CustomerCredit[]
  subRoute?: string
}

type Tab = 'blogs' | 'challanpay-org' | 'events-news' | 'banners' | 'coupon' | 'wallet'

const VALID_TABS: Tab[] = ['blogs', 'challanpay-org', 'events-news', 'banners', 'coupon', 'wallet']

function tabFromSubRoute(subRoute: string | undefined): Tab {
  if (subRoute && (VALID_TABS as string[]).includes(subRoute)) return subRoute as Tab
  return 'blogs'
}
type View =
  | 'list'
  | 'add-blog'
  | 'add-event-news'
  | 'add-banner'
  | 'edit-banner'
  | 'add-coupon'
  | 'edit-coupon'
  | 'view-coupon'
  | 'add-programme'
  | 'edit-programme'

export function CMSDashboard({
  blogs,
  eventsNews,
  banners,
  coupons,
  programmes,
  auditLog,
  customerCredits,
  subRoute,
}: CMSDashboardProps) {
  const activeTab = tabFromSubRoute(subRoute)
  const [view, setView] = useState<View>('list')
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null)
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null)
  const [editingProgrammeId, setEditingProgrammeId] = useState<string | null>(null)

  const editingBanner = banners.find((b) => b.id === editingBannerId)
  const editingCoupon = coupons.find((c) => c.id === editingCouponId)
  const editingProgramme = programmes.find((p) => p.id === editingProgrammeId)
  const existingCouponCodes = coupons.map((c) => c.code)
  const existingProgrammeCodes = programmes.map((p) => p.code)
  const existingProgrammeNames = programmes.map((p) => p.name)

  if (view === 'add-blog') {
    const isNews = activeTab === 'challanpay-org'
    return (
      <AddBlogPage
        heading={isNews ? 'Add News' : 'Add Blog'}
        submitLabel={isNews ? 'Add News' : 'Add Blog'}
        onSubmit={(data) => {
          console.log('Add blog:', data)
          setView('list')
        }}
        onCancel={() => setView('list')}
      />
    )
  }

  if (view === 'add-event-news') {
    return (
      <AddEventNewsPage
        onSubmit={(data) => {
          console.log('Add event/news:', data)
          setView('list')
        }}
        onCancel={() => setView('list')}
      />
    )
  }

  if (view === 'add-banner') {
    return (
      <AddBannerPage
        onSubmit={(data) => {
          console.log('Add banner:', data)
          setView('list')
        }}
        onCancel={() => setView('list')}
      />
    )
  }

  if (view === 'edit-banner' && editingBanner) {
    return (
      <AddBannerPage
        initialBanner={editingBanner}
        onSubmit={(data) => {
          console.log('Edit banner:', data)
          setEditingBannerId(null)
          setView('list')
        }}
        onCancel={() => {
          setEditingBannerId(null)
          setView('list')
        }}
      />
    )
  }

  if (view === 'add-coupon') {
    return (
      <AddCouponPage
        existingCodes={existingCouponCodes}
        onSubmit={(data) => {
          console.log('Add coupon:', data)
          setView('list')
        }}
        onCancel={() => setView('list')}
      />
    )
  }

  if (view === 'add-programme') {
    return (
      <AddProgrammePage
        existingCodes={existingProgrammeCodes}
        existingNames={existingProgrammeNames}
        onSubmit={(data, action) => {
          console.log('Add programme:', action, data)
          setView('list')
        }}
        onCancel={() => setView('list')}
      />
    )
  }

  if (view === 'edit-programme' && editingProgramme) {
    return (
      <AddProgrammePage
        initialProgramme={editingProgramme}
        existingCodes={existingProgrammeCodes}
        existingNames={existingProgrammeNames}
        onSubmit={(data, action) => {
          console.log('Edit programme:', action, data)
          setEditingProgrammeId(null)
          setView('list')
        }}
        onCancel={() => {
          setEditingProgrammeId(null)
          setView('list')
        }}
      />
    )
  }

  if (view === 'edit-coupon' && editingCoupon) {
    return (
      <AddCouponPage
        initialCoupon={editingCoupon}
        existingCodes={existingCouponCodes}
        onSubmit={(data) => {
          console.log('Edit coupon:', data)
          setEditingCouponId(null)
          setView('list')
        }}
        onCancel={() => {
          setEditingCouponId(null)
          setView('list')
        }}
      />
    )
  }

  if (view === 'view-coupon' && editingCoupon) {
    return (
      <CouponDetailPage
        coupon={editingCoupon}
        onBack={() => {
          setEditingCouponId(null)
          setView('list')
        }}
        onEdit={() => setView('edit-coupon')}
      />
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950">
      <div className="p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl">
          {activeTab === 'blogs' && (
            <BlogList
              blogs={blogs}
              onAddBlog={() => setView('add-blog')}
              onToggleStatus={(id, status) => console.log('Toggle blog status:', id, status)}
              onEdit={(id) => console.log('Edit blog:', id)}
              onDelete={(id) => console.log('Delete blog:', id)}
              onSearch={(query) => console.log('Search blogs:', query)}
            />
          )}

          {activeTab === 'challanpay-org' && (
            <BlogList
              blogs={blogs}
              heading="ChallanPay.org - News Page"
              addLabel="Add News"
              searchPlaceholder="Search news..."
              onAddBlog={() => setView('add-blog')}
              onToggleStatus={(id, status) => console.log('Toggle blog status:', id, status)}
              onEdit={(id) => console.log('Edit blog:', id)}
              onDelete={(id) => console.log('Delete blog:', id)}
              onSearch={(query) => console.log('Search blogs:', query)}
            />
          )}

          {activeTab === 'events-news' && (
            <EventNewsList
              eventsNews={eventsNews}
              onAddEventNews={() => setView('add-event-news')}
              onToggleStatus={(id, status) => console.log('Toggle status:', id, status)}
              onEdit={(id) => console.log('Edit event/news:', id)}
              onDelete={(id) => console.log('Delete event/news:', id)}
              onSearch={(query) => console.log('Search events/news:', query)}
            />
          )}

          {activeTab === 'banners' && (
            <BannerList
              banners={banners}
              onAddBanner={() => setView('add-banner')}
              onToggleStatus={(id, status) => console.log('Toggle banner status:', id, status)}
              onEdit={(id) => {
                setEditingBannerId(id)
                setView('edit-banner')
              }}
              onDelete={(id) => console.log('Delete banner:', id)}
              onSearch={(query) => console.log('Search banners:', query)}
            />
          )}

          {activeTab === 'coupon' && (
            <CouponList
              coupons={coupons}
              onCreate={() => setView('add-coupon')}
              onView={(id) => {
                setEditingCouponId(id)
                const coupon = coupons.find((c) => c.id === id)
                setView(coupon?.status === 'draft' ? 'edit-coupon' : 'view-coupon')
              }}
              onEdit={(id) => {
                setEditingCouponId(id)
                setView('edit-coupon')
              }}
              onPause={(id) => console.log('Pause coupon:', id)}
              onResume={(id) => console.log('Resume coupon:', id)}
              onArchive={(id) => console.log('Archive coupon:', id)}
              onClone={(id) => console.log('Clone coupon:', id)}
              onSearch={(query) => console.log('Search coupons:', query)}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletSection
              programmes={programmes}
              auditLog={auditLog}
              customerCredits={customerCredits}
              onCreateProgramme={() => setView('add-programme')}
              onViewProgramme={(id) => {
                setEditingProgrammeId(id)
                setView('edit-programme')
              }}
              onEditProgramme={(id) => {
                setEditingProgrammeId(id)
                setView('edit-programme')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
