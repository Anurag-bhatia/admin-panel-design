import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react';
const STEPS = [
    { id: 0, title: 'Classification', shortTitle: 'Classification' },
    { id: 1, title: 'Company', shortTitle: 'Company' },
    { id: 2, title: 'POC', shortTitle: 'POC' },
    { id: 3, title: 'Location', shortTitle: 'Location' },
];
export function AddLeadModal({ leadSources, serviceTypes, serviceSubTypes, onSubmit, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        source: '',
        type: '',
        subType: '',
        lotsFor: '',
        numberOfTrucks: 0,
        phoneNumber: '',
        country: 'India',
        state: '',
        city: '',
        companyAlias: '',
        companyName: '',
        emailId: '',
        contactPerson: '',
        gstNumber: '',
        area: '',
        addressLane: '',
        pinCode: '',
    });
    const [errors, setErrors] = useState({});
    const validateStep = (step) => {
        const newErrors = {};
        if (step === 0) {
            if (!formData.source)
                newErrors.source = 'Source is required';
            if (!formData.type)
                newErrors.type = 'Type is required';
            if (!formData.subType)
                newErrors.subType = 'Lead Type is required';
            if (!formData.lotsFor)
                newErrors.lotsFor = 'Service Type is required';
            if (!formData.numberOfTrucks || formData.numberOfTrucks <= 0)
                newErrors.numberOfTrucks = 'Number of Vehicles must be greater than 0';
        }
        else if (step === 1) {
            if (!formData.companyAlias)
                newErrors.companyAlias = 'Company Alias is required';
            if (!formData.companyName)
                newErrors.companyName = 'Company Name is required';
            if (!formData.gstNumber)
                newErrors.gstNumber = 'GST Number is required';
        }
        else if (step === 2) {
            if (!formData.contactPerson)
                newErrors.contactPerson = 'POC Name is required';
            if (!formData.phoneNumber)
                newErrors.phoneNumber = 'Phone Number is required';
            if (!formData.emailId)
                newErrors.emailId = 'Email ID is required';
        }
        else if (step === 3) {
            if (!formData.country)
                newErrors.country = 'Country is required';
            if (!formData.state)
                newErrors.state = 'State is required';
            if (!formData.city)
                newErrors.city = 'City is required';
            if (!formData.area)
                newErrors.area = 'Area is required';
            if (!formData.addressLane)
                newErrors.addressLane = 'Address Lane is required';
            if (!formData.pinCode)
                newErrors.pinCode = 'Pin Code is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };
    const handleBack = () => {
        setErrors({});
        setCurrentStep(prev => prev - 1);
    };
    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            onSubmit(formData);
        }
    };
    const goToStep = (step) => {
        if (step < currentStep) {
            setErrors({});
            setCurrentStep(step);
        }
    };
    const availableSubTypes = formData.type ? serviceSubTypes[formData.type] || [] : [];
    const selectClass = (hasError) => `w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`;
    const inputClass = (hasError) => `w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-3xl w-full my-8", children: [_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsx("h2", { className: "text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white", children: "Add New Lead" }), _jsx("button", { onClick: onClose, className: "p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-4 sm:px-6 pt-4 sm:pt-5 pb-2", children: [_jsx("div", { className: "flex items-center", children: STEPS.map((step, index) => (_jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [_jsxs("button", { type: "button", onClick: () => goToStep(step.id), className: `flex items-center gap-2 ${step.id < currentStep ? 'cursor-pointer' : 'cursor-default'}`, children: [_jsx("div", { className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${step.id < currentStep ? 'bg-cyan-600 text-white' : step.id === currentStep ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`, children: step.id < currentStep ? _jsx(Check, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) : step.id + 1 }), _jsx("span", { className: `hidden sm:block text-xs sm:text-sm font-medium whitespace-nowrap ${step.id <= currentStep ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`, children: step.title })] }), index < STEPS.length - 1 && (_jsx("div", { className: "flex-1 mx-2 sm:mx-3", children: _jsx("div", { className: `h-0.5 rounded-full transition-colors ${step.id < currentStep ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}` }) }))] }, step.id))) }), _jsxs("p", { className: "sm:hidden text-xs text-slate-500 dark:text-slate-400 mt-2", children: ["Step ", currentStep + 1, " of ", STEPS.length, ": ", STEPS[currentStep].title] })] }), _jsx("div", { className: "px-4 sm:px-6 py-4 sm:py-5", children: currentStep === 0 ? (_jsxs("div", { children: [_jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Lead Classification" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Source ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.source, onChange: e => setFormData({ ...formData, source: e.target.value }), className: selectClass(!!errors.source), children: [_jsx("option", { value: "", children: "Select Source" }), leadSources.map(source => (_jsx("option", { value: source, children: source }, source)))] }), errors.source && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.source })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.type, onChange: e => setFormData({ ...formData, type: e.target.value, subType: '' }), className: selectClass(!!errors.type), children: [_jsx("option", { value: "", children: "Select Type" }), serviceTypes.map(type => (_jsx("option", { value: type, children: type }, type)))] }), errors.type && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.type })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Lead Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.subType, onChange: e => setFormData({ ...formData, subType: e.target.value }), disabled: !formData.type, className: `${selectClass(!!errors.subType)} disabled:opacity-50 disabled:cursor-not-allowed`, children: [_jsx("option", { value: "", children: "Select Lead Type" }), availableSubTypes.map(subType => (_jsx("option", { value: subType, children: subType }, subType)))] }), errors.subType && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.subType })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Service Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.lotsFor, onChange: e => setFormData({ ...formData, lotsFor: e.target.value }), className: selectClass(!!errors.lotsFor), children: [_jsx("option", { value: "", children: "Select Service Type" }), _jsx("option", { value: "CAAS", children: "CAAS" }), _jsx("option", { value: "LAAS", children: "LAAS" }), _jsx("option", { value: "Wills", children: "Wills" }), _jsx("option", { value: "LOTS247", children: "LOTS247" })] }), errors.lotsFor && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.lotsFor })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Number of Vehicles ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", value: formData.numberOfTrucks || '', onChange: e => setFormData({ ...formData, numberOfTrucks: parseInt(e.target.value) || 0 }), min: "1", placeholder: "0", className: inputClass(!!errors.numberOfTrucks) }), errors.numberOfTrucks && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.numberOfTrucks })] })] })] })) : currentStep === 1 ? (_jsxs("div", { children: [_jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Company Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Company Alias ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.companyAlias, onChange: e => setFormData({ ...formData, companyAlias: e.target.value }), placeholder: "Short name", className: inputClass(!!errors.companyAlias) }), errors.companyAlias && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.companyAlias })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Company Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.companyName, onChange: e => setFormData({ ...formData, companyName: e.target.value }), placeholder: "Full legal name", className: inputClass(!!errors.companyName) }), errors.companyName && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.companyName })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["GST Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.gstNumber, onChange: e => setFormData({ ...formData, gstNumber: e.target.value }), placeholder: "27AABCF1234M1Z5", className: inputClass(!!errors.gstNumber) }), errors.gstNumber && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.gstNumber })] })] })] })) : currentStep === 2 ? (_jsxs("div", { children: [_jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "POC Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["POC Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.contactPerson, onChange: e => setFormData({ ...formData, contactPerson: e.target.value }), placeholder: "Full name", className: inputClass(!!errors.contactPerson) }), errors.contactPerson && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.contactPerson })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "tel", value: formData.phoneNumber, onChange: e => setFormData({ ...formData, phoneNumber: e.target.value }), placeholder: "+919876543210", className: inputClass(!!errors.phoneNumber) }), errors.phoneNumber && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.phoneNumber })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Email ID ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "email", value: formData.emailId, onChange: e => setFormData({ ...formData, emailId: e.target.value }), placeholder: "email@company.com", className: inputClass(!!errors.emailId) }), errors.emailId && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.emailId })] })] })] })) : (_jsxs("div", { children: [_jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Location Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Country ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.country, onChange: e => setFormData({ ...formData, country: e.target.value }), placeholder: "India", className: inputClass(!!errors.country) }), errors.country && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.country })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["State ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.state, onChange: e => setFormData({ ...formData, state: e.target.value }), placeholder: "Maharashtra", className: inputClass(!!errors.state) }), errors.state && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.state })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["City ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.city, onChange: e => setFormData({ ...formData, city: e.target.value }), placeholder: "Mumbai", className: inputClass(!!errors.city) }), errors.city && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.city })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Area ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.area, onChange: e => setFormData({ ...formData, area: e.target.value }), placeholder: "Andheri East", className: inputClass(!!errors.area) }), errors.area && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.area })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Address Lane ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.addressLane, onChange: e => setFormData({ ...formData, addressLane: e.target.value }), placeholder: "Plot No. 15, MIDC Industrial Area", className: inputClass(!!errors.addressLane) }), errors.addressLane && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.addressLane })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2", children: ["Pin Code ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.pinCode, onChange: e => setFormData({ ...formData, pinCode: e.target.value }), placeholder: "400069", className: inputClass(!!errors.pinCode) }), errors.pinCode && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.pinCode })] })] })] })) }), _jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", children: [_jsx("div", { children: currentStep > 0 ? (_jsxs("button", { type: "button", onClick: handleBack, className: "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(ChevronLeft, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }), "Back"] })) : (_jsx("button", { type: "button", onClick: onClose, className: "px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" })) }), _jsx("div", { children: currentStep < STEPS.length - 1 ? (_jsxs("button", { type: "button", onClick: handleNext, className: "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors", children: ["Next", _jsx(ChevronRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })] })) : (_jsx("button", { type: "button", onClick: handleSubmit, className: "px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors", children: "Add Lead" })) })] })] }) }));
}
