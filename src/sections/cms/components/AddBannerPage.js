import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { ArrowLeft, Upload, X, Monitor, Smartphone } from 'lucide-react';
const websites = [
    {
        id: 'lawyered',
        label: 'Lawyered',
        description: 'lawyered.in',
        webSize: { width: 1920, height: 600 },
        mobileSize: { width: 750, height: 1000 },
    },
    {
        id: 'challanpay',
        label: 'ChallanPay',
        description: 'challanpay.in',
        webSize: { width: 1600, height: 500 },
        mobileSize: { width: 720, height: 900 },
    },
    {
        id: 'lots247',
        label: 'LOTS247',
        description: 'lots247.com',
        webSize: { width: 1440, height: 480 },
        mobileSize: { width: 640, height: 800 },
    },
];
const DEFAULT_WEB_SIZE = { width: 1920, height: 600 };
const DEFAULT_MOBILE_SIZE = { width: 750, height: 1000 };
export function AddBannerPage({ onSubmit, onCancel, initialBanner }) {
    const isEdit = Boolean(initialBanner);
    const [name, setName] = useState(initialBanner?.name ?? '');
    const [website, setWebsite] = useState(initialBanner?.website ?? '');
    const [webImage, setWebImage] = useState(initialBanner
        ? { file: null, previewUrl: initialBanner.webImage, name: fileNameFromUrl(initialBanner.webImage) }
        : null);
    const [mobileImage, setMobileImage] = useState(initialBanner
        ? { file: null, previewUrl: initialBanner.mobileImage, name: fileNameFromUrl(initialBanner.mobileImage) }
        : null);
    const [makeLive, setMakeLive] = useState(initialBanner ? initialBanner.status === 'enabled' : true);
    const webInputRef = useRef(null);
    const mobileInputRef = useRef(null);
    const canSubmit = name.trim() !== '' && website !== '' && webImage !== null && mobileImage !== null;
    const activeWebsite = websites.find((w) => w.id === website);
    const webSize = activeWebsite?.webSize ?? DEFAULT_WEB_SIZE;
    const mobileSize = activeWebsite?.mobileSize ?? DEFAULT_MOBILE_SIZE;
    const handleFileSelect = (e, setter) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        if (file.type !== 'image/png') {
            alert('Please upload a PNG file only.');
            e.target.value = '';
            return;
        }
        setter({ file, previewUrl: URL.createObjectURL(file), name: file.name });
    };
    const handleSubmit = () => {
        if (!canSubmit)
            return;
        onSubmit?.({
            ...(initialBanner ? { id: initialBanner.id } : {}),
            name,
            website: website,
            webImage: webImage.previewUrl,
            mobileImage: mobileImage.previewUrl,
            status: makeLive ? 'enabled' : 'disabled',
        });
    };
    return (_jsxs("div", { className: "min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5", children: _jsxs("div", { className: "flex items-center gap-4 max-w-4xl", children: [_jsx("button", { onClick: onCancel, className: "p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-white", children: isEdit ? 'Edit Banner' : 'Add Banner' })] }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-8 py-8", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 lg:p-10 space-y-8", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Banner Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Monsoon Safety Drive", className: "w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3", children: ["Website ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: websites.map((w) => {
                                            const isActive = website === w.id;
                                            return (_jsxs("button", { type: "button", onClick: () => setWebsite(w.id), className: `text-left p-4 rounded-xl border-2 transition-all ${isActive
                                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [_jsx("div", { className: `text-sm font-semibold ${isActive
                                                            ? 'text-cyan-700 dark:text-cyan-300'
                                                            : 'text-slate-700 dark:text-slate-200'}`, children: w.label }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: w.description })] }, w.id));
                                        }) })] }), _jsx(UploadField, { icon: _jsx(Monitor, { className: "w-4 h-4" }), label: "Web Banner Image", required: true, hint: activeWebsite
                                    ? `PNG only · Recommended size for ${activeWebsite.label}: ${webSize.width} × ${webSize.height} px`
                                    : `PNG only · Select a website to see the recommended size`, aspectClass: "aspect-[16/5]", uploaded: webImage, inputRef: webInputRef, onChange: (e) => handleFileSelect(e, setWebImage), onClear: () => {
                                    if (webImage)
                                        URL.revokeObjectURL(webImage.previewUrl);
                                    setWebImage(null);
                                    if (webInputRef.current)
                                        webInputRef.current.value = '';
                                } }), _jsx(UploadField, { icon: _jsx(Smartphone, { className: "w-4 h-4" }), label: "Mobile Banner Image", required: true, hint: activeWebsite
                                    ? `PNG only · Recommended size for ${activeWebsite.label}: ${mobileSize.width} × ${mobileSize.height} px`
                                    : `PNG only · Select a website to see the recommended size`, aspectClass: "aspect-[3/4] max-w-[220px]", uploaded: mobileImage, inputRef: mobileInputRef, onChange: (e) => handleFileSelect(e, setMobileImage), onClear: () => {
                                    if (mobileImage)
                                        URL.revokeObjectURL(mobileImage.previewUrl);
                                    setMobileImage(null);
                                    if (mobileInputRef.current)
                                        mobileInputRef.current.value = '';
                                } }), _jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-200", children: "Make live immediately" }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Banner will be visible on the selected website right after saving." })] }), _jsx("button", { type: "button", onClick: () => setMakeLive((v) => !v), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${makeLive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 rounded-full bg-white transition-transform ${makeLive ? 'translate-x-6' : 'translate-x-1'}` }) })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-6", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, disabled: !canSubmit, className: "px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: isEdit ? 'Save Changes' : makeLive ? 'Save & Make Live' : 'Save Banner' })] })] })] }));
}
function fileNameFromUrl(url) {
    try {
        const clean = url.split('?')[0].split('#')[0];
        return clean.substring(clean.lastIndexOf('/') + 1) || 'image.png';
    }
    catch {
        return 'image.png';
    }
}
function UploadField({ icon, label, required, hint, aspectClass, uploaded, inputRef, onChange, onClear, }) {
    return (_jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: icon }), label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] }), uploaded ? (_jsxs("div", { className: `relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 ${aspectClass}`, children: [_jsx("img", { src: uploaded.previewUrl, alt: "Banner preview", className: "w-full h-full object-cover" }), _jsx("button", { type: "button", onClick: onClear, className: "absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 shadow-sm", children: _jsx(X, { className: "w-3.5 h-3.5" }) }), _jsx("div", { className: "absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/60 text-[10px] text-white font-medium truncate max-w-[90%]", children: uploaded.name })] })) : (_jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: `w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors ${aspectClass}`, children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx(Upload, { className: "w-4 h-4 text-slate-400" }) }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 font-medium", children: "Click to upload" })] })), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2", children: hint }), _jsx("input", { ref: inputRef, type: "file", accept: "image/png", onChange: onChange, className: "hidden" })] }));
}
