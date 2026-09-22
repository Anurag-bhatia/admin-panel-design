import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { CATEGORY_LABEL, CATEGORY_ORDER, CategoryIcon, } from './KnowledgeBaseView';
export function AddKnowledgeDocumentPage({ onClose, onCreate, }) {
    const [category, setCategory] = useState('template');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tagsText, setTagsText] = useState('');
    // Type-specific state — one shape per kind, only the active one is used at submit
    const [templateFile, setTemplateFile] = useState({
        fileName: '',
        fileFormat: 'PDF',
        fileSize: '',
        previewNote: '',
    });
    const [faqItems, setFaqItems] = useState([
        { question: '', answer: '' },
    ]);
    const [guideSteps, setGuideSteps] = useState([
        { title: '', body: '' },
    ]);
    const [checklistItems, setChecklistItems] = useState(['']);
    const [regulation, setRegulation] = useState({
        citation: '',
        jurisdiction: '',
        bodyText: '',
    });
    const [judgement, setJudgement] = useState({
        caseTitle: '',
        court: '',
        decidedOn: '',
        citation: '',
        holding: '',
        summary: '',
    });
    const [circular, setCircular] = useState({
        issuedBy: '',
        issuedOn: '',
        circularNumber: '',
        subject: '',
        body: '',
    });
    const descriptionText = description.replace(/<[^>]*>/g, '').trim();
    const canSubmit = title.trim() !== '' && descriptionText !== '';
    function buildContent() {
        switch (category) {
            case 'template':
                return { kind: 'template', template: templateFile };
            case 'faq':
                return {
                    kind: 'faq',
                    items: faqItems.filter((i) => i.question.trim() || i.answer.trim()),
                };
            case 'guide':
                return {
                    kind: 'guide',
                    steps: guideSteps.filter((s) => s.title.trim() || s.body.trim()),
                };
            case 'checklist':
                return {
                    kind: 'checklist',
                    items: checklistItems.map((i) => i.trim()).filter(Boolean),
                };
            case 'regulation':
                return { kind: 'regulation', regulation };
            case 'judgement':
                return { kind: 'judgement', judgement };
            case 'circular':
                return { kind: 'circular', circular };
        }
    }
    function handleSubmit() {
        if (!canSubmit)
            return;
        const tags = tagsText
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
        onCreate({
            category,
            title: title.trim(),
            description,
            tags,
            authorName: 'Admin User',
            status: 'published',
            content: buildContent(),
        });
    }
    return (_jsxs("div", { className: "flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400", "aria-label": "Back to Knowledge Base", children: _jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) }) }), _jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-white", children: "Add new knowledge document" })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !canSubmit, className: "px-4 py-2 rounded-md text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed", children: "Publish Now" })] })] }), _jsx("div", { className: "flex-1 overflow-auto", children: _jsxs("div", { className: "mx-auto max-w-3xl px-8 py-8 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2", children: "Category" }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: CATEGORY_ORDER.map((cat) => (_jsxs("button", { onClick: () => setCategory(cat), className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${category === cat
                                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'}`, children: [_jsx(CategoryIcon, { category: cat, className: "w-4 h-4" }), CATEGORY_LABEL[cat]] }, cat))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2", children: ["Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Accident Affidavit Template", className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2", children: ["Description ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(RichTextEditor, { value: description, onChange: setDescription, placeholder: "Short summary shown on the card\u2026" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2", children: "Tags" }), _jsx("input", { type: "text", value: tagsText, onChange: (e) => setTagsText(e.target.value), placeholder: "Comma-separated, e.g. accident, insurance", className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" })] }), _jsxs("div", { className: "rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-4", children: [_jsxs("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", children: [CATEGORY_LABEL[category], " content"] }), category === 'template' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-6 text-center", children: [_jsx("svg", { className: "mx-auto w-8 h-8 text-slate-400 mb-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }), _jsx("p", { className: "text-sm font-medium text-slate-700 dark:text-slate-200", children: "Upload template file" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "PDF, DOCX, or XLSX up to 10 MB" }), _jsx("button", { onClick: () => setTemplateFile((t) => ({
                                                        ...t,
                                                        fileName: t.fileName || 'template-file.pdf',
                                                        fileSize: t.fileSize || '128 KB',
                                                    })), className: "mt-3 inline-flex items-center gap-1.5 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold px-3 py-1.5", children: "Choose File" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { className: "col-span-2", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "File Name" }), _jsx("input", { value: templateFile.fileName, onChange: (e) => setTemplateFile({ ...templateFile, fileName: e.target.value }), placeholder: "my-template.pdf", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Format" }), _jsxs("select", { value: templateFile.fileFormat, onChange: (e) => setTemplateFile({
                                                                ...templateFile,
                                                                fileFormat: e.target.value,
                                                            }), className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white", children: [_jsx("option", { children: "PDF" }), _jsx("option", { children: "DOCX" }), _jsx("option", { children: "XLSX" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Usage note (shown to users)" }), _jsx("textarea", { value: templateFile.previewNote, onChange: (e) => setTemplateFile({ ...templateFile, previewNote: e.target.value }), rows: 2, placeholder: "e.g. Print on \u20B9100 stamp paper before notarising.", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] })), category === 'faq' && (_jsxs("div", { className: "space-y-3", children: [faqItems.map((item, idx) => (_jsxs("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-xs font-semibold text-slate-600 dark:text-slate-400", children: ["Q&A #", idx + 1] }), faqItems.length > 1 && (_jsx("button", { onClick: () => setFaqItems(faqItems.filter((_, i) => i !== idx)), className: "text-xs text-red-600 hover:underline", children: "Remove" }))] }), _jsx("input", { value: item.question, onChange: (e) => {
                                                        const next = [...faqItems];
                                                        next[idx] = { ...item, question: e.target.value };
                                                        setFaqItems(next);
                                                    }, placeholder: "Question", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-medium" }), _jsx("textarea", { value: item.answer, onChange: (e) => {
                                                        const next = [...faqItems];
                                                        next[idx] = { ...item, answer: e.target.value };
                                                        setFaqItems(next);
                                                    }, rows: 2, placeholder: "Answer", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }, idx))), _jsx("button", { onClick: () => setFaqItems([...faqItems, { question: '', answer: '' }]), className: "w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800", children: "+ Add another Q&A" })] })), category === 'guide' && (_jsxs("div", { className: "space-y-3", children: [guideSteps.map((step, idx) => (_jsxs("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-xs font-semibold text-slate-600 dark:text-slate-400", children: ["Step ", idx + 1] }), guideSteps.length > 1 && (_jsx("button", { onClick: () => setGuideSteps(guideSteps.filter((_, i) => i !== idx)), className: "text-xs text-red-600 hover:underline", children: "Remove" }))] }), _jsx("input", { value: step.title, onChange: (e) => {
                                                        const next = [...guideSteps];
                                                        next[idx] = { ...step, title: e.target.value };
                                                        setGuideSteps(next);
                                                    }, placeholder: "Step title", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-medium" }), _jsx("textarea", { value: step.body, onChange: (e) => {
                                                        const next = [...guideSteps];
                                                        next[idx] = { ...step, body: e.target.value };
                                                        setGuideSteps(next);
                                                    }, rows: 2, placeholder: "What the user does in this step", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }, idx))), _jsx("button", { onClick: () => setGuideSteps([...guideSteps, { title: '', body: '' }]), className: "w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800", children: "+ Add another step" })] })), category === 'checklist' && (_jsxs("div", { className: "space-y-2", children: [checklistItems.map((item, idx) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-slate-400", children: "\u2022" }), _jsx("input", { value: item, onChange: (e) => {
                                                        const next = [...checklistItems];
                                                        next[idx] = e.target.value;
                                                        setChecklistItems(next);
                                                    }, placeholder: `Pointer ${idx + 1}`, className: "flex-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" }), checklistItems.length > 1 && (_jsx("button", { onClick: () => setChecklistItems(checklistItems.filter((_, i) => i !== idx)), className: "text-slate-400 hover:text-red-600 p-1", "aria-label": "Remove", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) }))] }, idx))), _jsx("button", { onClick: () => setChecklistItems([...checklistItems, '']), className: "w-full rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800", children: "+ Add pointer" })] })), category === 'regulation' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Citation" }), _jsx("input", { value: regulation.citation, onChange: (e) => setRegulation({ ...regulation, citation: e.target.value }), placeholder: "e.g. Motor Vehicles Act 2019, Section 194", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Jurisdiction" }), _jsx("input", { value: regulation.jurisdiction, onChange: (e) => setRegulation({ ...regulation, jurisdiction: e.target.value }), placeholder: "e.g. India \u2014 all states", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Body text" }), _jsx("textarea", { value: regulation.bodyText, onChange: (e) => setRegulation({ ...regulation, bodyText: e.target.value }), rows: 4, placeholder: "Full text of the provision or summary\u2026", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] })), category === 'judgement' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Case title" }), _jsx("input", { value: judgement.caseTitle, onChange: (e) => setJudgement({ ...judgement, caseTitle: e.target.value }), placeholder: "Party v. Party", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Court" }), _jsx("input", { value: judgement.court, onChange: (e) => setJudgement({ ...judgement, court: e.target.value }), placeholder: "Supreme Court of India", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Decided on" }), _jsx("input", { type: "date", value: judgement.decidedOn, onChange: (e) => setJudgement({ ...judgement, decidedOn: e.target.value }), className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Citation" }), _jsx("input", { value: judgement.citation, onChange: (e) => setJudgement({ ...judgement, citation: e.target.value }), placeholder: "(2019) 4 SCC 415", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Holding" }), _jsx("textarea", { value: judgement.holding, onChange: (e) => setJudgement({ ...judgement, holding: e.target.value }), rows: 2, placeholder: "Key holding of the court", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Summary" }), _jsx("textarea", { value: judgement.summary, onChange: (e) => setJudgement({ ...judgement, summary: e.target.value }), rows: 3, placeholder: "Full facts and reasoning", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] })), category === 'circular' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Issued by" }), _jsx("input", { value: circular.issuedBy, onChange: (e) => setCircular({ ...circular, issuedBy: e.target.value }), placeholder: "MoRTH / IRDAI / RBI", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Issued on" }), _jsx("input", { type: "date", value: circular.issuedOn, onChange: (e) => setCircular({ ...circular, issuedOn: e.target.value }), className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Circular number" }), _jsx("input", { value: circular.circularNumber, onChange: (e) => setCircular({ ...circular, circularNumber: e.target.value }), placeholder: "RT-25036/122/2020-MVL", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white font-mono" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Subject" }), _jsx("input", { value: circular.subject, onChange: (e) => setCircular({ ...circular, subject: e.target.value }), placeholder: "Subject line of the circular", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "Body" }), _jsx("textarea", { value: circular.body, onChange: (e) => setCircular({ ...circular, body: e.target.value }), rows: 4, placeholder: "Full body text of the circular", className: "w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white" })] })] }))] })] }) })] }));
}
function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);
    const [, setTick] = useState(0);
    function exec(command, arg) {
        editorRef.current?.focus();
        document.execCommand(command, false, arg);
        if (editorRef.current)
            onChange(editorRef.current.innerHTML);
        setTick((n) => n + 1);
    }
    function handleInput() {
        if (editorRef.current)
            onChange(editorRef.current.innerHTML);
    }
    function isActive(command) {
        try {
            return document.queryCommandState(command);
        }
        catch {
            return false;
        }
    }
    function currentBlock() {
        try {
            return (document.queryCommandValue('formatBlock') || 'p').toLowerCase().replace(/[<>]/g, '');
        }
        catch {
            return 'p';
        }
    }
    function handleLink() {
        const url = window.prompt('Enter URL');
        if (!url)
            return;
        exec('createLink', url);
    }
    const block = currentBlock();
    return (_jsxs("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50", children: [_jsxs("select", { value: block === 'h1' || block === 'h2' || block === 'h3' ? block : 'p', onChange: (e) => exec('formatBlock', e.target.value), className: "h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-slate-700 dark:text-slate-300 mr-1 cursor-pointer", "aria-label": "Text style", children: [_jsx("option", { value: "p", children: "Paragraph" }), _jsx("option", { value: "h1", children: "Heading 1" }), _jsx("option", { value: "h2", children: "Heading 2" }), _jsx("option", { value: "h3", children: "Heading 3" })] }), _jsx(ToolbarDivider, {}), _jsx(ToolbarButton, { onClick: () => exec('bold'), active: isActive('bold'), title: "Bold (Ctrl+B)", children: _jsx("span", { className: "font-bold", children: "B" }) }), _jsx(ToolbarButton, { onClick: () => exec('italic'), active: isActive('italic'), title: "Italic (Ctrl+I)", children: _jsx("span", { className: "italic font-serif", children: "I" }) }), _jsx(ToolbarButton, { onClick: () => exec('underline'), active: isActive('underline'), title: "Underline (Ctrl+U)", children: _jsx("span", { className: "underline", children: "U" }) }), _jsx(ToolbarButton, { onClick: () => exec('strikeThrough'), active: isActive('strikeThrough'), title: "Strikethrough", children: _jsx("span", { className: "line-through", children: "S" }) }), _jsx(ToolbarDivider, {}), _jsx(ToolbarButton, { onClick: () => exec('insertUnorderedList'), active: isActive('insertUnorderedList'), title: "Bulleted list", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12" }) }) }), _jsx(ToolbarButton, { onClick: () => exec('insertOrderedList'), active: isActive('insertOrderedList'), title: "Numbered list", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" }) }) }), _jsx(ToolbarDivider, {}), _jsx(ToolbarButton, { onClick: () => exec('justifyLeft'), title: "Align left", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 10h10M4 14h16M4 18h10" }) }) }), _jsx(ToolbarButton, { onClick: () => exec('justifyCenter'), title: "Align center", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M7 10h10M4 14h16M7 18h10" }) }) }), _jsx(ToolbarButton, { onClick: () => exec('justifyRight'), title: "Align right", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M10 10h10M4 14h16M10 18h10" }) }) }), _jsx(ToolbarDivider, {}), _jsx(ToolbarButton, { onClick: handleLink, title: "Insert link", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }) }) }), _jsx(ToolbarButton, { onClick: () => exec('removeFormat'), title: "Clear formatting", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M6 4v3m4-3v3m4-3v3m4-3v3M4 14l6 6M10 14l-6 6" }) }) }), _jsx("div", { className: "flex-1" }), _jsx(ToolbarButton, { onClick: () => exec('undo'), title: "Undo", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 10h10a4 4 0 010 8H8m-5-8l4-4m-4 4l4 4" }) }) }), _jsx(ToolbarButton, { onClick: () => exec('redo'), title: "Redo", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 10H11a4 4 0 100 8h5m5-8l-4-4m4 4l-4 4" }) }) })] }), _jsx("div", { ref: editorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: handleInput, onBlur: handleInput, onKeyUp: () => setTick((n) => n + 1), onMouseUp: () => setTick((n) => n + 1), "data-placeholder": placeholder, className: "rte-content min-h-[240px] max-h-[520px] overflow-auto px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none", dangerouslySetInnerHTML: { __html: value } }), _jsx("style", { children: `
        .rte-content:empty::before {
          content: attr(data-placeholder);
          color: rgb(148 163 184);
          pointer-events: none;
        }
        .rte-content h1 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.25; }
        .rte-content h2 { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0; line-height: 1.3; }
        .rte-content h3 { font-size: 1.1rem; font-weight: 600; margin: 0.4rem 0; line-height: 1.35; }
        .rte-content p { margin: 0.35rem 0; }
        .rte-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.4rem 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.4rem 0; }
        .rte-content li { margin: 0.15rem 0; }
        .rte-content a { color: rgb(8 145 178); text-decoration: underline; }
      ` })] }));
}
function ToolbarButton({ children, onClick, active, title, }) {
    return (_jsx("button", { type: "button", onMouseDown: (e) => e.preventDefault(), onClick: onClick, title: title, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm ${active
            ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`, children: children }));
}
function ToolbarDivider() {
    return _jsx("div", { className: "w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" });
}
