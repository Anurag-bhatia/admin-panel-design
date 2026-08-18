import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/rewards-config/data.json';
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard';
export default function RewardsConfigPreview() {
    return (_jsx("div", { className: "h-[calc(100vh-64px)] overflow-auto", children: _jsx(RewardsConfigDashboard, { configs: data.configs, changeLog: data.changeLog, states: data.states, currentUser: data.currentUser, onAdd: (draft) => console.log('Add configuration:', draft), onUpdate: (id, draft) => console.log('Update configuration:', id, draft) }) }));
}
