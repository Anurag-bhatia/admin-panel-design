import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ArrowLeft, Lock, Pencil } from 'lucide-react';
const statusLabels = {
    draft: 'Draft',
    active: 'Active',
    paused: 'Paused',
    expired: 'Expired',
    archived: 'Archived',
};
const statusBadgeClass = {
    draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
};
function formatDateTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
}
function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
}
function formatCurrency(n) {
    return `₹${n.toLocaleString('en-IN')}`;
}
function buildAuditLog(coupon) {
    const entries = [];
    const created = new Date(coupon.createdAt);
    entries.push({
        id: 'a-create',
        action: 'Created',
        adminUser: coupon.createdBy,
        timestamp: coupon.createdAt,
        details: `Coupon ${coupon.code} created (${coupon.type === 'percentage' ? `Percent ${coupon.value}%` : `Flat ₹${coupon.value}`}, ${coupon.product}, ${coupon.platforms.join(', ')})`,
    });
    if (coupon.updatedAt && coupon.updatedAt !== coupon.createdAt) {
        const edited = new Date(coupon.updatedAt);
        entries.push({
            id: 'a-edit',
            action: 'Edited',
            adminUser: coupon.createdBy,
            timestamp: coupon.updatedAt,
            details: edited.getTime() - created.getTime() < 24 * 60 * 60 * 1000
                ? 'Increased total usage limit — while still in Draft'
                : 'Updated eligibility rules',
        });
    }
    if (coupon.status === 'paused') {
        entries.push({
            id: 'a-pause',
            action: 'Paused',
            adminUser: 'Rahul M.',
            timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Paused pending review of a misuse report',
        });
    }
    if (coupon.status === 'active' && coupon.usageCount > 0) {
        entries.push({
            id: 'a-pause',
            action: 'Paused',
            adminUser: 'Rahul M.',
            timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Paused pending review of a misuse report',
        });
        entries.push({
            id: 'a-resume',
            action: 'Resumed',
            adminUser: 'Rahul M.',
            timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
            details: 'Resumed after review — no changes made',
        });
    }
    if (coupon.status === 'archived') {
        entries.push({
            id: 'a-archive',
            action: 'Archived',
            adminUser: 'Priya S.',
            timestamp: new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Archived after end of campaign',
        });
    }
    if (coupon.status === 'expired') {
        entries.push({
            id: 'a-expire',
            action: 'Expired',
            adminUser: 'System',
            timestamp: coupon.endAt,
            details: 'Coupon expired automatically at end date',
        });
    }
    return entries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}
const sampleCustomers = [
    { name: 'Rahul S.', phone: '98xxxx210' },
    { name: 'Priya K.', phone: '90xxxx884' },
    { name: 'Amit V.', phone: '88xxxx017' },
    { name: 'Neha M.', phone: '99xxxx345' },
    { name: 'Vikram R.', phone: '87xxxx621' },
    { name: 'Sonia J.', phone: '91xxxx902' },
    { name: 'Kunal D.', phone: '96xxxx158' },
    { name: 'Anjali T.', phone: '93xxxx472' },
];
function buildRedemptions(coupon) {
    const created = new Date(coupon.createdAt).getTime();
    const count = Math.min(coupon.usageCount, 20);
    const entries = [];
    for (let i = 0; i < count; i++) {
        const amount = 1500 + ((i * 733) % 4500);
        const discount = coupon.type === 'flat'
            ? Math.min(coupon.value, amount)
            : Math.round(amount * (coupon.value / 100));
        const isReleased = i > 0 && i % 6 === 0;
        const customer = sampleCustomers[i % sampleCustomers.length];
        entries.push({
            id: `r-${i}`,
            user: customer.name,
            phoneMasked: customer.phone,
            orderId: isReleased ? null : `#OR${String(10234 + i * 3)}`,
            discount,
            status: isReleased ? 'Released' : 'Confirmed',
            redeemedAt: new Date(created + (i + 1) * 45 * 60 * 1000).toISOString(),
        });
    }
    return entries;
}
function computeRedemptionStats(coupon, entries) {
    const redeemed = entries.length;
    const totalDiscount = entries.reduce((sum, r) => sum + r.discount, 0);
    const confirmed = entries.filter((r) => r.status === 'Confirmed').length;
    const confirmRate = redeemed === 0 ? 0 : Math.round((confirmed / redeemed) * 100);
    const usageLimit = coupon.totalUsageLimit == null ? `${redeemed} / ∞` : `${redeemed} / ${coupon.totalUsageLimit}`;
    return { redeemed, totalDiscount, confirmRate, usageLimit };
}
export function CouponDetailPage({ coupon, onBack, onEdit }) {
    const [activeTab, setActiveTab] = useState('redemptions');
    const audit = useMemo(() => buildAuditLog(coupon), [coupon]);
    const redemptions = useMemo(() => buildRedemptions(coupon), [coupon]);
    const stats = useMemo(() => computeRedemptionStats(coupon, redemptions), [coupon, redemptions]);
    const isEditLocked = coupon.status === 'active' || coupon.status === 'expired' || coupon.status === 'archived';
    return (_jsxs("div", { className: "p-6 lg:p-8 max-w-6xl mx-auto", children: [
            _jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                    _jsx("button", { onClick: onBack, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) }),
                    _jsxs("div", { className: "flex-1 flex items-center gap-3", children: [
                            _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: coupon.code }),
                            _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusBadgeClass[coupon.status]}`, children: statusLabels[coupon.status] })
                        ] }),
                    _jsx("button", { onClick: onEdit, disabled: isEditLocked, className: `inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${isEditLocked
                            ? 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: isEditLocked ? _jsxs(_Fragment, { children: [_jsx(Lock, { className: "w-3.5 h-3.5" }), "Edit (locked)"] }) : _jsxs(_Fragment, { children: [_jsx(Pencil, { className: "w-3.5 h-3.5" }), "Edit"] }) })
                ] }),
            _jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 mb-6", children: _jsx("div", { className: "flex gap-6", children: ['redemptions', 'audit'].map((tab) => _jsx("button", { onClick: () => setActiveTab(tab), className: `pb-3 -mb-px text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                            ? 'border-cyan-600 text-cyan-700 dark:text-cyan-400'
                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`, children: tab === 'redemptions' ? 'Redemptions' : 'Audit log' }, tab)) }) }),
            activeTab === 'redemptions' && _jsxs("div", { className: "space-y-6", children: [
                    _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
                            _jsx(StatCard, { label: "Redeemed", value: String(stats.redeemed) }),
                            _jsx(StatCard, { label: "Discount given", value: formatCurrency(stats.totalDiscount) }),
                            _jsx(StatCard, { label: "Confirm rate", value: `${stats.confirmRate}%` }),
                            _jsx(StatCard, { label: "Usage limit", value: stats.usageLimit })
                        ] }),
                    _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: redemptions.length === 0
                            ? _jsx("div", { className: "p-12 text-center", children: _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No redemptions yet for this coupon." }) })
                            : _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [
                                        _jsx("thead", { className: "bg-slate-50 dark:bg-slate-800/50", children: _jsxs("tr", { children: [
                                                    _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "User" }),
                                                    _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Order ID" }),
                                                    _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Discount" }),
                                                    _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Status" }),
                                                    _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Timestamp" })
                                                ] }) }),
                                        _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: redemptions.map((r) => _jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                                                    _jsxs("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: [r.user, ' ', _jsxs("span", { className: "text-slate-400 dark:text-slate-500", children: ["· ", r.phoneMasked] })] }),
                                                    _jsx("td", { className: "px-4 py-3 text-sm font-mono text-slate-600 dark:text-slate-400", children: r.orderId ?? '—' }),
                                                    _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: formatCurrency(r.discount) }),
                                                    _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${r.status === 'Confirmed'
                                                                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: r.status }) }),
                                                    _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300", children: formatDate(r.redeemedAt) })
                                                ] }, r.id)) })
                                    ] }) }) })
                ] }),
            activeTab === 'audit' && _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [
                            _jsx("thead", { className: "bg-slate-50 dark:bg-slate-800/50", children: _jsxs("tr", { children: [
                                        _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Action" }),
                                        _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Admin user" }),
                                        _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Timestamp" }),
                                        _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase", children: "Details" })
                                    ] }) }),
                            _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: audit.map((entry) => _jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                                        _jsx("td", { className: "px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: entry.action }),
                                        _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: entry.adminUser }),
                                        _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-400", children: formatDateTime(entry.timestamp) }),
                                        _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: entry.details })
                                    ] }, entry.id)) })
                        ] }) }) })
        ] }));
}
function StatCard({ label, value }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4", children: [
            _jsx("p", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: value }),
            _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: label })
        ] }));
}
