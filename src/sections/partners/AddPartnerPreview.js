import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { AddPartner } from './components/AddPartner';
export default function AddPartnerPreview() {
    const [isOpen, setIsOpen] = useState(true);
    return isOpen ? (_jsx(AddPartner, { onSubmit: (partnerData) => {
            console.log('Partner submitted:', partnerData);
            setIsOpen(false);
        }, onCancel: () => {
            console.log('Add partner cancelled');
            setIsOpen(false);
        } })) : (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center", children: _jsx("button", { onClick: () => setIsOpen(true), className: "px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium", children: "Open Add Partner" }) }));
}
