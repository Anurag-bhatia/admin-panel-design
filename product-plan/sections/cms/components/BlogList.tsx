import { useState } from 'react'
import { Plus, Search, Image, Pencil, Trash2 } from 'lucide-react'
import type { Blog } from '../types'

interface BlogListProps {
  blogs: Blog[]
  onAddBlog?: () => void
  onToggleStatus?: (id: string, newStatus: 'enabled' | 'disabled') => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onSearch?: (query: string) => void
}

export function BlogList({ blogs, onAddBlog, onToggleStatus, onEdit, onDelete, onSearch }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const filtered = blogs.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog</h1>
        </div>
        <button
          onClick={onAddBlog}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
              onSearch?.(e.target.value)
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-20">
                  Sr No.
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-40">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-40">
                  Author
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-28">
                  Read Mins
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-20">
                  Icon
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-28">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-36">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {paginated.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {blog.srNo}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {blog.name}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {blog.category}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {blog.author}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {blog.readMins} Mins
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                      <Image className="w-5 h-5 text-slate-400" />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm">
                    <span
                      className={
                        blog.status === 'enabled'
                          ? 'text-green-600 dark:text-green-400 font-medium'
                          : 'text-slate-400 dark:text-slate-500 font-medium'
                      }
                    >
                      {blog.status === 'enabled' ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {/* Toggle */}
                      <button
                        onClick={() =>
                          onToggleStatus?.(
                            blog.id,
                            blog.status === 'enabled' ? 'disabled' : 'enabled'
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          blog.status === 'enabled'
                            ? 'bg-green-500'
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            blog.status === 'enabled' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                        <span className="absolute left-1 text-[9px] font-bold text-white">
                          {blog.status === 'enabled' ? 'ON' : ''}
                        </span>
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => onEdit?.(blog.id)}
                        className="p-1.5 rounded-md bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => onDelete?.(blog.id)}
                        className="p-1.5 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {(currentPage - 1) * perPage + 1}–
              {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2.5 py-1.5 text-sm rounded ${
                    page === currentPage
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
