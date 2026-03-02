import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react';

const STEPS = [
    { id: 'classification', label: 'Classification' },
    { id: 'contact', label: 'POC' },
    { id: 'location', label: 'Location' },
    { id: 'assignment', label: 'Assignment' },
];

const REQUIRED_FIELDS = {
    source: 'Source is required',
    type: 'Type is required',
    subType: 'Sub Type is required',
    serviceType: 'Service Type is required',
    numberOfVehicles: 'Number of Vehicles must be greater than 0',
    phoneNumber: 'Phone Number is required',
    country: 'Country is required',
    state: 'State is required',
    city: 'City is required',
    companyAlias: 'Company Alias is required',
    subscriberName: 'Subscriber Name is required',
    emailId: 'Email ID is required',
    contactPerson: 'Contact Person is required',
    gstNumber: 'GST Number is required',
    area: 'Area is required',
    addressLane: 'Address Lane is required',
    pinCode: 'Pin Code is required',
    assignedOwner: 'Assigned Owner is required',
};

const inputClass = (hasError) => `w-full px-3 py-2 bg-white dark:bg-slate-950 border ${hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`;

const selectClass = (hasError) => `w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border ${hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`;

const labelClass = 'block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2';

export function AddSubscriberModal({ users, partners, subscriberSources, subscriberTypes, subscriberSubTypes, onSubmit, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompany, setIsCompany] = useState(false);
    const [formData, setFormData] = useState({
        source: '',
        type: '',
        subType: '',
        serviceType: '',
        numberOfVehicles: 0,
        phoneNumber: '',
        country: 'India',
        state: '',
        city: '',
        companyAlias: '',
        subscriberName: '',
        emailId: '',
        contactPerson: '',
        gstNumber: '',
        area: '',
        addressLane: '',
        pinCode: '',
        assignedOwner: '',
        partnerId: null,
        drivingLicenseNumber: null,
    });
    const [errors, setErrors] = useState({});

    const getStepFields = (stepId) => {
        switch (stepId) {
            case 'classification': {
                const base = ['subscriberName', 'source', 'type', 'subType', 'serviceType', 'numberOfVehicles'];
                return isCompany ? [...base, 'companyAlias', 'gstNumber'] : base;
            }
            case 'contact':
                return ['contactPerson', 'phoneNumber', 'emailId'];
            case 'location':
                return ['country', 'state', 'city', 'area', 'addressLane', 'pinCode'];
            case 'assignment':
                return ['assignedOwner'];
            default:
                return [];
        }
    };

    const validateStep = (stepIndex) => {
        const stepId = STEPS[stepIndex].id;
        const fields = getStepFields(stepId);
        const newErrors = {};
        fields.forEach((field) => {
            const value = formData[field];
            if (field === 'numberOfVehicles') {
                if (!value || value <= 0) newErrors[field] = REQUIRED_FIELDS[field];
            } else if (REQUIRED_FIELDS[field] && !value) {
                newErrors[field] = REQUIRED_FIELDS[field];
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
        }
    };

    const handleBack = () => {
        setErrors({});
        setCurrentStep((s) => Math.max(s - 1, 0));
    };

    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            onSubmit(formData);
        }
    };

    const handleStepClick = (index) => {
        if (index < currentStep) {
            setErrors({});
            setCurrentStep(index);
        }
    };

    const availableSubTypes = formData.type ? subscriberSubTypes[formData.type] || [] : [];
    const isLastStep = currentStep === STEPS.length - 1;

    return _jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-4xl w-full my-8", children: [
        // Header
        _jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800", children: [
            _jsx("h2", { className: "text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white", children: "Add New Subscriber" }),
            _jsx("button", { onClick: onClose, className: "p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-500" }) })
        ] }),

        // Stepper
        _jsx("div", { className: "px-4 sm:px-6 pt-5 pb-2", children: _jsx("div", { className: "flex items-center", children: STEPS.map((step, index) => _jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [
            _jsxs("button", { type: "button", onClick: () => handleStepClick(index), className: `flex items-center gap-2 ${index < currentStep ? 'cursor-pointer' : 'cursor-default'}`, children: [
                _jsx("div", { className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${index < currentStep ? 'bg-cyan-600 text-white' : index === currentStep ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 dark:ring-cyan-900/40' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`, children: index < currentStep ? _jsx(Check, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) : index + 1 }),
                _jsx("span", { className: `hidden sm:block text-xs sm:text-sm font-medium whitespace-nowrap ${index <= currentStep ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`, children: step.label })
            ] }),
            index < STEPS.length - 1 && _jsx("div", { className: `flex-1 h-px mx-3 ${index < currentStep ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}` })
        ] }, step.id)) }) }),

        // Step Content
        _jsx("div", { className: "px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto max-h-[calc(100vh-320px)]", children:
            // Step 1: Classification
            currentStep === 0 ? _jsxs("div", { children: [
                _jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Subscriber Classification" }),
                _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Subscriber Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.subscriberName, onChange: e => setFormData({ ...formData, subscriberName: e.target.value }), placeholder: "e.g., Fastlane Logistics Pvt. Ltd.", className: inputClass(!!errors.subscriberName) }), errors.subscriberName && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.subscriberName })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Source ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.source, onChange: e => setFormData({ ...formData, source: e.target.value }), className: selectClass(!!errors.source), children: [_jsx("option", { value: "", children: "Select Source" }), subscriberSources.map((source) => _jsx("option", { value: source, children: source }, source))] }), errors.source && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.source })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.type, onChange: e => setFormData({ ...formData, type: e.target.value, subType: '' }), className: selectClass(!!errors.type), children: [_jsx("option", { value: "", children: "Select Type" }), subscriberTypes.map((type) => _jsx("option", { value: type, children: type }, type))] }), errors.type && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.type })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Sub Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.subType, onChange: e => setFormData({ ...formData, subType: e.target.value }), disabled: !formData.type, className: `${selectClass(!!errors.subType)} disabled:opacity-50 disabled:cursor-not-allowed`, children: [_jsx("option", { value: "", children: "Select Sub Type" }), availableSubTypes.map((subType) => _jsx("option", { value: subType, children: subType }, subType))] }), errors.subType && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.subType })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Service Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.serviceType, onChange: e => setFormData({ ...formData, serviceType: e.target.value }), className: selectClass(!!errors.serviceType), children: [_jsx("option", { value: "", children: "Select Service Type" }), _jsx("option", { value: "CaaS", children: "CaaS" }), _jsx("option", { value: "LaaS", children: "LaaS" }), _jsx("option", { value: "Wills", children: "Wills" }), _jsx("option", { value: "LOTS247", children: "LOTS247" })] }), errors.serviceType && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.serviceType })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Number of Vehicles ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", min: "1", value: formData.numberOfVehicles || '', onChange: e => setFormData({ ...formData, numberOfVehicles: parseInt(e.target.value) || 0 }), placeholder: "0", className: inputClass(!!errors.numberOfVehicles) }), errors.numberOfVehicles && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.numberOfVehicles })] })
                ] }),

                // Company checkbox
                _jsx("div", { className: "mt-5 pt-5 border-t border-slate-200 dark:border-slate-700", children:
                    _jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
                        _jsx("div", { onClick: () => setIsCompany(!isCompany), className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isCompany ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500'}`, children: isCompany && _jsx(Check, { className: "w-3.5 h-3.5 text-white" }) }),
                        _jsx("span", { onClick: () => setIsCompany(!isCompany), className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Subscriber is operating as a company" })
                    ] })
                }),

                // Company fields (conditional)
                isCompany && _jsxs("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Company Alias ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.companyAlias, onChange: e => setFormData({ ...formData, companyAlias: e.target.value }), placeholder: "e.g., Fastlane Logistics", className: inputClass(!!errors.companyAlias) }), errors.companyAlias && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.companyAlias })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["GST Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.gstNumber, onChange: e => setFormData({ ...formData, gstNumber: e.target.value }), placeholder: "e.g., 27AABCF1234M1Z5", className: inputClass(!!errors.gstNumber) }), errors.gstNumber && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.gstNumber })] })
                ] })
            ] }) :

            // Step 2: Contact Information
            currentStep === 1 ? _jsxs("div", { children: [
                _jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "POC Information" }),
                _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Contact Person ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.contactPerson, onChange: e => setFormData({ ...formData, contactPerson: e.target.value }), placeholder: "e.g., Rajesh Kumar", className: inputClass(!!errors.contactPerson) }), errors.contactPerson && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.contactPerson })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "tel", value: formData.phoneNumber, onChange: e => setFormData({ ...formData, phoneNumber: e.target.value }), placeholder: "+918306712275", className: inputClass(!!errors.phoneNumber) }), errors.phoneNumber && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.phoneNumber })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Email ID ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "email", value: formData.emailId, onChange: e => setFormData({ ...formData, emailId: e.target.value }), placeholder: "operations@company.com", className: inputClass(!!errors.emailId) }), errors.emailId && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.emailId })] })
                ] })
            ] }) :

            // Step 3: Location Information
            currentStep === 2 ? _jsxs("div", { children: [
                _jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Location Information" }),
                _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Country ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.country, onChange: e => setFormData({ ...formData, country: e.target.value }), className: inputClass(!!errors.country) }), errors.country && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.country })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["State ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.state, onChange: e => setFormData({ ...formData, state: e.target.value }), placeholder: "e.g., Maharashtra", className: inputClass(!!errors.state) }), errors.state && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.state })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["City ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.city, onChange: e => setFormData({ ...formData, city: e.target.value }), placeholder: "e.g., Mumbai", className: inputClass(!!errors.city) }), errors.city && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.city })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Area ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.area, onChange: e => setFormData({ ...formData, area: e.target.value }), placeholder: "e.g., Andheri East", className: inputClass(!!errors.area) }), errors.area && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.area })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Address Lane ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.addressLane, onChange: e => setFormData({ ...formData, addressLane: e.target.value }), placeholder: "Plot No., Building Name", className: inputClass(!!errors.addressLane) }), errors.addressLane && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.addressLane })] }),
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["Pin Code ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: formData.pinCode, onChange: e => setFormData({ ...formData, pinCode: e.target.value }), placeholder: "400069", className: inputClass(!!errors.pinCode) }), errors.pinCode && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.pinCode })] })
                ] })
            ] }) :

            // Step 4: Assignment & Additional
            currentStep === 3 ? _jsxs("div", { children: [
                _jsx("h3", { className: "text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4", children: "Assignment & Additional" }),
                _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    _jsxs("div", { children: [_jsxs("label", { className: labelClass, children: ["SPOC ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: formData.assignedOwner, onChange: e => setFormData({ ...formData, assignedOwner: e.target.value }), className: selectClass(!!errors.assignedOwner), children: [_jsx("option", { value: "", children: "Select SPOC" }), users.map((user) => _jsx("option", { value: user.id, children: user.fullName }, user.id))] }), errors.assignedOwner && _jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.assignedOwner })] }),
                    _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Partner (Optional)" }), _jsxs("select", { value: formData.partnerId || '', onChange: e => setFormData({ ...formData, partnerId: e.target.value || null }), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "None" }), partners.map((partner) => _jsx("option", { value: partner.id, children: partner.name }, partner.id))] })] }),
                ] })
            ] }) : null
        }),

        // Footer
        _jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800", children: [
            _jsx("div", { children: currentStep > 0 && _jsxs("button", { type: "button", onClick: handleBack, className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), "Back"] }) }),
            _jsxs("div", { className: "flex items-center gap-3", children: [
                _jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }),
                isLastStep
                    ? _jsx("button", { type: "button", onClick: handleSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors", children: "Add Subscriber" })
                    : _jsxs("button", { type: "button", onClick: handleNext, className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors", children: ["Next", _jsx(ChevronRight, { className: "w-4 h-4" })] })
            ] })
        ] })
    ] }) });
}
