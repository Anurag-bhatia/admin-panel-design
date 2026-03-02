import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/partners/data.json';
import { PartnerDetail } from './components/PartnerDetail';
export default function PartnerDetailPreview() {
    // Use the first partner as the preview
    const partner = data.partners[0];
    return (_jsx(PartnerDetail, { partner: partner, onBack: () => console.log('Go back to partner list'), onEditPartner: (id) => console.log('Edit partner:', id), onViewIncidents: (subscriberId) => console.log('View incidents for subscriber:', subscriberId), onUploadDocument: (id, file) => console.log('Upload document for partner:', id, file), onDeleteDocument: (id, documentId) => console.log('Delete document:', documentId) }));
}
