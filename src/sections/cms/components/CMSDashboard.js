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
import { CouponDetailPage } from './CouponDetailPage';
const VALID_TABS = ['blogs', 'challanpay-org', 'events-news', 'banners', 'coupon', 'wallet'];
function tabFromSubRoute(subRoute) {
    if (subRoute && VALID_TABS.includes(subRoute))
        return subRoute;
    return 'blogs';
}
export function CMSDashboard({ blogs, eventsNews, banners, coupons, programmes, auditLog, customerCredits, subRoute, }) {
    const activeTab = tabFromSubRoute(subRoute);
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
        const isNews = activeTab === 'challanpay-org';
        return (_jsx(AddBlogPage, { heading: isNews ? 'Add News' : 'Add Blog', submitLabel: isNews ? 'Add News' : 'Add Blog', onSubmit: (data) => {
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
    if (view === 'view-coupon' && editingCoupon) {
        return (_jsx(CouponDetailPage, { coupon: editingCoupon, onBack: () => {
                setEditingCouponId(null);
                setView('list');
            }, onEdit: () => setView('edit-coupon') }));
    }
    return (_jsx("div", { className: "min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950", children: _jsx("div", { className: "p-6 lg:p-8 overflow-auto", children: _jsxs("div", { className: "max-w-7xl", children: [activeTab === 'blogs' && (_jsx(BlogList, { blogs: blogs, onAddBlog: () => setView('add-blog'), onToggleStatus: (id, status) => console.log('Toggle blog status:', id, status), onEdit: (id) => console.log('Edit blog:', id), onDelete: (id) => console.log('Delete blog:', id), onSearch: (query) => console.log('Search blogs:', query) })), activeTab === 'challanpay-org' && (_jsx(BlogList, { blogs: blogs, heading: "ChallanPay.org - News Page", addLabel: "Add News", searchPlaceholder: "Search news...", onAddBlog: () => setView('add-blog'), onToggleStatus: (id, status) => console.log('Toggle blog status:', id, status), onEdit: (id) => console.log('Edit blog:', id), onDelete: (id) => console.log('Delete blog:', id), onSearch: (query) => console.log('Search blogs:', query) })), activeTab === 'events-news' && (_jsx(EventNewsList, { eventsNews: eventsNews, onAddEventNews: () => setView('add-event-news'), onToggleStatus: (id, status) => console.log('Toggle status:', id, status), onEdit: (id) => console.log('Edit event/news:', id), onDelete: (id) => console.log('Delete event/news:', id), onSearch: (query) => console.log('Search events/news:', query) })), activeTab === 'banners' && (_jsx(BannerList, { banners: banners, onAddBanner: () => setView('add-banner'), onToggleStatus: (id, status) => console.log('Toggle banner status:', id, status), onEdit: (id) => {
                            setEditingBannerId(id);
                            setView('edit-banner');
                        }, onDelete: (id) => console.log('Delete banner:', id), onSearch: (query) => console.log('Search banners:', query) })), activeTab === 'coupon' && (_jsx(CouponList, { coupons: coupons, onCreate: () => setView('add-coupon'), onView: (id) => {
                            setEditingCouponId(id);
                            const coupon = coupons.find((c) => c.id === id);
                            setView(coupon?.status === 'draft' ? 'edit-coupon' : 'view-coupon');
                        }, onEdit: (id) => {
                            setEditingCouponId(id);
                            setView('edit-coupon');
                        }, onPause: (id) => console.log('Pause coupon:', id), onResume: (id) => console.log('Resume coupon:', id), onArchive: (id) => console.log('Archive coupon:', id), onClone: (id) => console.log('Clone coupon:', id), onSearch: (query) => console.log('Search coupons:', query) })), activeTab === 'wallet' && (_jsx(WalletSection, { programmes: programmes, customerCredits: customerCredits, onCreateProgramme: () => setView('add-programme'), onViewProgramme: (id) => {
                            setEditingProgrammeId(id);
                            setView('edit-programme');
                        }, onEditProgramme: (id) => {
                            setEditingProgrammeId(id);
                            setView('edit-programme');
                        } }))] }) }) }));
}
