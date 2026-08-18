import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/lawyers/data.json';
import { Lawyers } from './components/Lawyers';
export default function LawyersPreview() {
    return _jsx(Lawyers, { lawyers: data.lawyers });
}
