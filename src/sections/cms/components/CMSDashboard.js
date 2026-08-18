import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BlogList } from './BlogList';
import { EventNewsList } from './EventNewsList';
import { AddBlogPage } from './AddBlogPage';
import { AddEventNewsPage } from './AddEventNewsPage';
const sidebarItems = [
    { id: 'blogs', label: 'Blogs' },
    { id: 'events-news', label: 'Events & News' },
];
export function CMSDashboard({ blogs, eventsNews }) {
    const [activeTab, setActiveTab] = useState('blogs');
    const [view, setView] = useState('list');
    if (view === 'add-blog') {
        return (_jsx(AddBlogPage, { onSubmit: (data) => {
                console.log('Add blog:', data);
                setView('list');
            }, onCancel: () => setView('list') }));
    }
    if (view === 'add-event-news') {
        return (_jsx(AddEventNewsPage, { onSubmit: (data) => {
                console.log('Add event/news:', data);
                setView('list');
            }, onCancel: () => setView('list') }));
    }
    return (_jsxs("div", { className: "flex min-h-[calc(100vh-64px)]", children: [_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52", children: _jsx("div", { className: "flex-1 py-4", children: _jsx("div", { className: "space-y-0.5 px-2", children: sidebarItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (_jsx("button", { onClick: () => setActiveTab(item.id), className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { children: item.label }) }, item.id));
                        }) }) }) }), _jsx("div", { className: "flex-1 p-6 lg:p-8 overflow-auto", children: _jsxs("div", { className: "max-w-7xl", children: [activeTab === 'blogs' && (_jsx(BlogList, { blogs: blogs, onAddBlog: () => setView('add-blog'), onToggleStatus: (id, status) => console.log('Toggle blog status:', id, status), onEdit: (id) => console.log('Edit blog:', id), onDelete: (id) => console.log('Delete blog:', id), onSearch: (query) => console.log('Search blogs:', query) })), activeTab === 'events-news' && (_jsx(EventNewsList, { eventsNews: eventsNews, onAddEventNews: () => setView('add-event-news'), onToggleStatus: (id, status) => console.log('Toggle status:', id, status), onEdit: (id) => console.log('Edit event/news:', id), onDelete: (id) => console.log('Delete event/news:', id), onSearch: (query) => console.log('Search events/news:', query) }))] }) })] }));
}
