import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/incidents/data.json';
import { ScreenResultsView } from './components/ScreenResultsView';
export default function ScreenResultsPreview() {
    return (_jsx(ScreenResultsView, { results: data.screeningResults, onClose: () => console.log('Close clicked'), onConfirm: (selectedChallans) => {
            console.log('Confirmed with challans:', selectedChallans);
        } }));
}
