import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/lawyers/data.json';
import { Lawyers } from './components/Lawyers';
export default function LawyersPreview({ subRoute } = {}) {
    const activeGroup = subRoute === 'individuals' ? 'individuals' : 'business';
    const label = activeGroup === 'business' ? 'Business' : 'Individuals';
    const allLawyers = data.lawyers;
    const scopedLawyers = activeGroup === 'business'
        ? allLawyers.filter((l) => l.company !== null)
        : allLawyers.filter((l) => l.company === null);
    return _jsx(Lawyers, { lawyers: scopedLawyers, heading: label }, activeGroup);
}
