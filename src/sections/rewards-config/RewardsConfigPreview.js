import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/rewards-config/data.json';
import cmsData from '@/../product/sections/cms/data.json';
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard';
import { SalesConfigDashboard } from './components/SalesConfigDashboard';
import { CMSDashboard } from '../cms/components/CMSDashboard';
function resolveTab(subRoute) {
    if (subRoute === 'web' || subRoute === 'coupon' || subRoute === 'wallet')
        return subRoute;
    return 'sales';
}
export default function RewardsConfigPreview({ subRoute }) {
    const activeTab = resolveTab(subRoute);
    if (activeTab === 'coupon' || activeTab === 'wallet') {
        return (_jsx(CMSDashboard, { subRoute: activeTab, blogs: cmsData.blogs, eventsNews: cmsData.eventsNews, banners: cmsData.banners, coupons: cmsData.coupons, programmes: cmsData.programmes, auditLog: cmsData.auditLog, customerCredits: cmsData.customerCredits }));
    }
    return (_jsx("div", { className: "h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 overflow-auto", children: activeTab === 'sales' ? (_jsx(SalesConfigDashboard, {})) : (_jsx(RewardsConfigDashboard, { configs: data.configs, changeLog: data.changeLog, states: data.states, currentUser: data.currentUser, onAdd: (draft) => console.log('Add configuration:', draft), onUpdate: (id, draft) => console.log('Update configuration:', id, draft) })) }));
}
