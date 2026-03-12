import { useState } from 'react'
import type { Blog, EventNews } from '@/../product/sections/cms/types'
import { BlogList } from './BlogList'
import { EventNewsList } from './EventNewsList'
import { AddBlogPage } from './AddBlogPage'
import { AddEventNewsPage } from './AddEventNewsPage'

interface CMSDashboardProps {
  blogs: Blog[]
  eventsNews: EventNews[]
}

type Tab = 'blogs' | 'events-news'
type View = 'list' | 'add-blog' | 'add-event-news'

const sidebarItems: { id: Tab; label: string }[] = [
  { id: 'blogs', label: 'Blogs' },
  { id: 'events-news', label: 'Events & News' },
]

export function CMSDashboard({ blogs, eventsNews }: CMSDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('blogs')
  const [view, setView] = useState<View>('list')

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
        </div>
      </div>
    </div>
  )
}
