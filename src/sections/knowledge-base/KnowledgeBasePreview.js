import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/knowledge-base/data.json';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
export default function KnowledgeBasePreview() {
    return (_jsx("div", { className: "flex h-[calc(100vh-64px)]", children: _jsx(KnowledgeBaseView, { entries: data.entries, onCreate: (entry) => console.log('Create KB entry:', entry), onEdit: (entry) => console.log('Edit KB entry:', entry.id), onDelete: (id) => console.log('Delete KB entry:', id), onDownload: (entry) => console.log('Download KB entry:', entry.id) }) }));
}
