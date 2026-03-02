import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/partners/data.json';
import { EditPartner } from './components/EditPartner';
export default function EditPartnerPreview() {
    const [isOpen, setIsOpen] = useState(true);
    // Use the first partner as the preview
    const partner = data.partners[0];
    return isOpen ? (_jsx(EditPartner, { partner: partner, onSubmit: (partnerData) => {
            console.log('Partner updated:', partnerData);
            setIsOpen(false);
        }, onCancel: () => {
            console.log('Edit cancelled');
            setIsOpen(false);
        } })) : (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center", children: _jsx("button", { onClick: () => setIsOpen(true), className: "px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium", children: "Open Edit Partner" }) }));
}
