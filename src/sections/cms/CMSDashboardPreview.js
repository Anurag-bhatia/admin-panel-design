import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/cms/data.json';
import { CMSDashboard } from './components/CMSDashboard';
export default function CMSDashboardPreview({ subRoute }) {
    return (_jsx(CMSDashboard, { subRoute: subRoute, blogs: data.blogs, eventsNews: data.eventsNews, banners: data.banners, coupons: data.coupons, programmes: data.programmes, auditLog: data.auditLog, customerCredits: data.customerCredits }));
}
