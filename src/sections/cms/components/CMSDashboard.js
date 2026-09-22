import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BlogList } from './BlogList';
import { EventNewsList } from './EventNewsList';
import { BannerList } from './BannerList';
import { CouponList } from './CouponList';
import { WalletSection } from './WalletSection';
import { AddProgrammePage } from './AddProgrammePage';
import { AddBlogPage } from './AddBlogPage';
import { AddEventNewsPage } from './AddEventNewsPage';
import { AddBannerPage } from './AddBannerPage';
import { AddCouponPage } from './AddCouponPage';
const sidebarItems = [
    { id: 'blogs', label: 'Blogs' },
    { id: 'events-news', label: 'Events & News' },
    { id: 'banners', label: 'Banners' },
    { id: 'coupon', label: 'Coupon' },
    { id: 'wallet', label: 'Wallet' },
];
export function CMSDashboard({ blogs, eventsNews, banners, coupons, programmes, auditLog, customerCredits, }) {
    const [activeTab, setActiveTab] = useState('blogs');
    const [view, setView] = useState('list');
    const [editingBannerId, setEditingBannerId] = useState(null);
    const [editingCouponId, setEditingCouponId] = useState(null);
    const [editingProgrammeId, setEditingProgrammeId] = useState(null);
    const editingBanner = banners.find((b) => b.id === editingBannerId);
    const editingCoupon = coupons.find((c) => c.id === editingCouponId);
    const editingProgramme = programmes.find((p) => p.id === editingProgrammeId);
    const existingCouponCodes = coupons.map((c) => c.code);
    const existingProgrammeCodes = programmes.map((p) => p.code);
    const existingProgrammeNames = programmes.map((p) => p.name);
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
    if (view === 'add-banner') {
        return (_jsx(AddBannerPage, { onSubmit: (data) => {
                console.log('Add banner:', data);
                setView('list');
            }, onCancel: () => setView('list') }));
    }
    if (view === 'edit-banner' && editingBanner) {
        return (_jsx(AddBannerPage, { initialBanner: editingBanner, onSubmit: (data) => {
                console.log('Edit banner:', data);
                setEditingBannerId(null);
                setView('list');
            }, onCancel: () => {
                setEditingBannerId(null);
                setView('list');
            } }));
    }
    if (view === 'add-coupon') {
        return (_jsx(AddCouponPage, { existingCodes: existingCouponCodes, onSubmit: (data) => {
                console.log('Add coupon:', data);
                setView('list');
            }, onCancel: () => setView('list') }));
    }
    if (view === 'add-programme') {
        return (_jsx(AddProgrammePage, { existingCodes: existingProgrammeCodes, existingNames: existingProgrammeNames, onSubmit: (data, action) => {
                console.log('Add programme:', action, data);
                setView('list');
            }, onCancel: () => setView('list') }));
    }
    if (view === 'edit-programme' && editingProgramme) {
        return (_jsx(AddProgrammePage, { initialProgramme: editingProgramme, existingCodes: existingProgrammeCodes, existingNames: existingProgrammeNames, onSubmit: (data, action) => {
                console.log('Edit programme:', action, data);
                setEditingProgrammeId(null);
                setView('list');
            }, onCancel: () => {
                setEditingProgrammeId(null);
                setView('list');
            } }));
    }
    if (view === 'edit-coupon' && editingCoupon) {
        return (_jsx(AddCouponPage, { initialCoupon: editingCoupon, existingCodes: existingCouponCodes, onSubmit: (data) => {
                console.log('Edit coupon:', data);
                setEditingCouponId(null);
                setView('list');
            }, onCancel: () => {
                setEditingCouponId(null);
                setView('list');
            } }));
    }
    return (_jsxs("div", { className: "flex min-h-[calc(100vh-64px)]", children: [_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52", children: _jsx("div", { className: "flex-1 py-4", children: _jsx("div", { className: "space-y-0.5 px-2", children: sidebarItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (_jsx("button", { onClick: () => setActiveTab(item.id), className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { children: item.label }) }, item.id));
                        }) }) }) }), _jsx("div", { className: "flex-1 p-6 lg:p-8 overflow-auto", children: _jsxs("div", { className: "max-w-7xl", children: [activeTab === 'blogs' && (_jsx(BlogList, { blogs: blogs, onAddBlog: () => setView('add-blog'), onToggleStatus: (id, status) => console.log('Toggle blog status:', id, status), onEdit: (id) => console.log('Edit blog:', id), onDelete: (id) => console.log('Delete blog:', id), onSearch: (query) => console.log('Search blogs:', query) })), activeTab === 'events-news' && (_jsx(EventNewsList, { eventsNews: eventsNews, onAddEventNews: () => setView('add-event-news'), onToggleStatus: (id, status) => console.log('Toggle status:', id, status), onEdit: (id) => console.log('Edit event/news:', id), onDelete: (id) => console.log('Delete event/news:', id), onSearch: (query) => console.log('Search events/news:', query) })), activeTab === 'banners' && (_jsx(BannerList, { banners: banners, onAddBanner: () => setView('add-banner'), onToggleStatus: (id, status) => console.log('Toggle banner status:', id, status), onEdit: (id) => {
                                setEditingBannerId(id);
                                setView('edit-banner');
                            }, onDelete: (id) => console.log('Delete banner:', id), onSearch: (query) => console.log('Search banners:', query) })), activeTab === 'coupon' && (_jsx(CouponList, { coupons: coupons, onCreate: () => setView('add-coupon'), onView: (id) => {
                                setEditingCouponId(id);
                                setView('edit-coupon');
                            }, onEdit: (id) => {
                                setEditingCouponId(id);
                                setView('edit-coupon');
                            }, onPause: (id) => console.log('Pause coupon:', id), onResume: (id) => console.log('Resume coupon:', id), onArchive: (id) => console.log('Archive coupon:', id), onClone: (id) => console.log('Clone coupon:', id), onSearch: (query) => console.log('Search coupons:', query) })), activeTab === 'wallet' && (_jsx(WalletSection, { programmes: programmes, auditLog: auditLog, customerCredits: customerCredits, onCreateProgramme: () => setView('add-programme'), onViewProgramme: (id) => {
                                setEditingProgrammeId(id);
                                setView('edit-programme');
                            }, onEditProgramme: (id) => {
                                setEditingProgrammeId(id);
                                setView('edit-programme');
                            } }))] }) })] }));
}
