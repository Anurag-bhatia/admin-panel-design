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

interface CMSDashboardProps {
  blogs: Blog[]
  eventsNews: EventNews[]
  banners: Banner[]
  coupons: Coupon[]
  programmes: Programme[]
  auditLog: AuditLogEntry[]
  customerCredits: CustomerCredit[]
}

type Tab = 'blogs' | 'events-news' | 'banners' | 'coupon' | 'wallet'
type View =
  | 'list'
  | 'add-blog'
  | 'add-event-news'
  | 'add-banner'
  | 'edit-banner'
  | 'add-coupon'
  | 'edit-coupon'
  | 'add-programme'
  | 'edit-programme'

const sidebarItems: { id: Tab; label: string }[] = [
  { id: 'blogs', label: 'Blogs' },
  { id: 'events-news', label: 'Events & News' },
  { id: 'banners', label: 'Banners' },
  { id: 'coupon', label: 'Coupon' },
  { id: 'wallet', label: 'Wallet' },
]

export function CMSDashboard({
  blogs,
  eventsNews,
  banners,
  coupons,
  programmes,
  auditLog,
  customerCredits,
}: CMSDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('blogs')
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
    return (
      <AddBlogPage
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

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Left Sidebar */}
      <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52">
        <div className="flex-1 py-4">
          <div className="space-y-0.5 px-2">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
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
                setView('edit-coupon')
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
