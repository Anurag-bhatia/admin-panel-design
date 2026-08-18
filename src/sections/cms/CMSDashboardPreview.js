import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/cms/data.json';
import { CMSDashboard } from './components/CMSDashboard';
export default function CMSDashboardPreview() {
    return _jsx(CMSDashboard, { blogs: data.blogs, eventsNews: data.eventsNews });
}
