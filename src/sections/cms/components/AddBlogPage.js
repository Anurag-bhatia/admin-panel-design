import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Upload, Check } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
const categories = ['Motor Vehicle Act', 'E-Challan', 'Legal Rights', 'Traffic Safety', 'Road Safety', 'Legal Tech'];
const steps = [
    { id: 1, label: 'Details' },
    { id: 2, label: 'Content & Media' },
];
export function AddBlogPage({ onSubmit, onCancel }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        category: '',
        author: 'Team Lawyered',
        readMins: '',
        featuredOnChallanPay: false,
        altText: '',
        content: '',
    });
    const canProceed = form.name.trim() !== '' &&
        form.category !== '' &&
        form.author.trim() !== '' &&
        form.readMins !== '';
    const handleSubmit = () => {
        onSubmit?.({
            name: form.name,
            category: form.category,
            author: form.author,
            readMins: Number(form.readMins),
            featuredOnChallanPay: form.featuredOnChallanPay,
            altText: form.altText,
            content: form.content,
        });
    };
    return (_jsxs("div", { className: "min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5", children: _jsxs("div", { className: "flex items-center gap-4 max-w-4xl", children: [_jsx("button", { onClick: onCancel, className: "p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-white", children: "Add Blog" })] }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-8 py-8", children: [_jsx("div", { className: "flex items-start justify-center mb-10", children: steps.map((step, index) => (_jsxs("div", { className: "flex items-start", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("button", { onClick: () => {
                                                if (step.id < currentStep)
                                                    setCurrentStep(step.id);
                                                if (step.id === 2 && canProceed)
                                                    setCurrentStep(2);
                                            }, className: `w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step.id === currentStep
                                                ? 'bg-cyan-500 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40'
                                                : step.id < currentStep
                                                    ? 'bg-cyan-500 text-white'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`, children: step.id < currentStep ? _jsx(Check, { className: "w-4 h-4" }) : step.id }), _jsx("span", { className: `mt-2 text-xs font-medium ${step.id === currentStep
                                                ? 'text-cyan-600 dark:text-cyan-400'
                                                : step.id < currentStep
                                                    ? 'text-cyan-600 dark:text-cyan-400'
                                                    : 'text-slate-400 dark:text-slate-500'}`, children: step.label })] }), index < steps.length - 1 && (_jsx("div", { className: "flex items-center mt-5 mx-3", children: _jsx("div", { className: `w-32 h-0.5 ${step.id < currentStep
                                            ? 'bg-cyan-400'
                                            : 'bg-slate-200 dark:bg-slate-700'}` }) }))] }, step.id))) }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 lg:p-10", children: [currentStep === 1 && (_jsxs("div", { className: "space-y-7", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Blog Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), placeholder: "Enter blog title", className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Category ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.category, onChange: (e) => setForm({ ...form, category: e.target.value }), className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "Select category" }), categories.map((cat) => (_jsx("option", { value: cat, children: cat }, cat)))] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Author ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: form.author, onChange: (e) => setForm({ ...form, author: e.target.value }), placeholder: "Author name", className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Read Time (mins) ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", value: form.readMins, onChange: (e) => setForm({ ...form, readMins: e.target.value }), placeholder: "e.g. 7", min: "1", className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] }), _jsx("div", { className: "flex items-end pb-2", children: _jsxs("label", { className: "flex items-center gap-2.5 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: form.featuredOnChallanPay, onChange: (e) => setForm({ ...form, featuredOnChallanPay: e.target.checked }), className: "w-4 h-4 text-cyan-600 rounded border-slate-300 dark:border-slate-600 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Featured on Challan Pay" })] }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Blog Icon" }), _jsx("div", { className: "border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 text-center hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors cursor-pointer", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx(Upload, { className: "w-5 h-5 text-slate-400" }) }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 font-medium", children: "Click to upload or drag and drop" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: "PNG, JPG or WebP (max 2MB)" })] }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Alt Text" }), _jsx("input", { type: "text", value: form.altText, onChange: (e) => setForm({ ...form, altText: e.target.value }), placeholder: "Describe the image for accessibility", className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] })] })), currentStep === 2 && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Content" }), _jsx(RichTextEditor, { value: form.content, onChange: (html) => setForm({ ...form, content: html }), placeholder: "Write blog content here..." })] }))] }), _jsxs("div", { className: "flex items-center justify-between mt-6", children: [_jsx("button", { type: "button", onClick: () => {
                                    if (currentStep === 1)
                                        onCancel?.();
                                    else
                                        setCurrentStep(1);
                                }, className: "px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors", children: currentStep === 1 ? 'Cancel' : 'Back' }), currentStep === 1 ? (_jsx("button", { type: "button", onClick: () => setCurrentStep(2), disabled: !canProceed, className: "px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: "Next" })) : (_jsx("button", { type: "button", onClick: handleSubmit, className: "px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors", children: "Add Blog" }))] })] })] }));
}
