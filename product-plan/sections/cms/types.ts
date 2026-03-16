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
