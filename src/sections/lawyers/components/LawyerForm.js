import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Check, Plus, Trash2, Upload } from 'lucide-react';
const STEPS = [
    'Basic Information',
    'Address',
    'Qualifications & Experience',
    'KYC Documents',
    'Bank Details',
    'Expertise',
    'Company Details',
];
const CATEGORIES = [
    'Criminal Law',
    'Motor Vehicle Act',
    'Corporate Litigation',
    'Consumer Protection Law',
    'Intellectual Property',
    'Employment and Labour Laws',
    'Startup and Corporate Compliance',
    'Taxation',
    'ADR',
    'Family Law',
    'Insolvency and Bankruptcy Law',
    'Other',
];
const emptyAddress = {
    country: 'India',
    state: '',
    city: '',
    area: '',
    addressLine: '',
    pinCode: '',
};
const emptyQualification = {
    degree: '',
    university: '',
    yearOfCompletion: new Date().getFullYear(),
    percentage: null,
    certificateUrl: '',
};
const emptyExperience = {
    company: '',
    role: '',
    startDate: '',
    endDate: null,
    functionalArea: '',
};
export function LawyerForm({ lawyer, onBack, onSave, isEdit }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
    const [hasCompany, setHasCompany] = useState(!!lawyer?.company);
    // Form state
    const [formData, setFormData] = useState({
        firstName: lawyer?.firstName || '',
        lastName: lawyer?.lastName || '',
        email: lawyer?.email || '',
        mobile: lawyer?.mobile || '',
        gender: lawyer?.gender || 'Male',
        dateOfBirth: lawyer?.dateOfBirth || '',
        category: lawyer?.category || '',
        subCategory: lawyer?.subCategory || '',
        currentAddress: lawyer?.currentAddress || { ...emptyAddress },
        permanentAddress: lawyer?.permanentAddress || { ...emptyAddress },
        qualifications: lawyer?.qualifications || [{ ...emptyQualification }],
        experience: lawyer?.experience || [{ ...emptyExperience }],
        kycDocuments: lawyer?.kycDocuments || {
            aadhaar: { number: '', documentUrl: null, uploadedAt: null },
            pan: { number: '', documentUrl: null, uploadedAt: null },
            drivingLicence: { documentUrl: null, uploadedAt: null },
            cancelledCheque: { documentUrl: null, uploadedAt: null },
            barId: { number: '', documentUrl: null, uploadedAt: null },
            ballbCertificate: { documentUrl: null, uploadedAt: null },
        },
        bankDetails: lawyer?.bankDetails || {
            accountHolderName: '',
            accountNumber: '',
            bankName: '',
            ifscCode: '',
        },
        expertise: lawyer?.expertise || {
            yearsOfExperience: 0,
            preferredLanguages: [],
            preferredLocations: [],
            caseTypes: [],
        },
        company: lawyer?.company || null,
    });
    const [languageInput, setLanguageInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [caseTypeInput, setCaseTypeInput] = useState('');
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleSubmit = () => {
        const newLawyer = {
            id: lawyer?.id || `lwr-${Date.now()}`,
            lawyerId: lawyer?.lawyerId || `LWR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
            photo: lawyer?.photo || `https://i.pravatar.cc/150?u=${formData.email}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            category: formData.category,
            subCategory: formData.subCategory,
            currentAddress: formData.currentAddress,
            permanentAddress: sameAsCurrentAddress ? formData.currentAddress : formData.permanentAddress,
            qualifications: formData.qualifications,
            experience: formData.experience,
            kycDocuments: formData.kycDocuments,
            bankDetails: formData.bankDetails,
            expertise: formData.expertise,
            company: hasCompany ? formData.company : null,
            onboardingStatus: 'Complete',
            kycStatus: 'Pending',
            activityState: 'Active',
            source: lawyer?.source || 'Website',
            createdAt: lawyer?.createdAt || new Date().toISOString(),
            lastUpdatedAt: new Date().toISOString(),
        };
        onSave(newLawyer);
    };
    return (_jsxs("div", { className: "p-6 lg:p-8 max-w-[900px] mx-auto", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("button", { onClick: onBack, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) }), _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: isEdit ? 'Edit Lawyer' : 'Add New Lawyer' })] }), _jsxs("div", { className: "mb-8", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: STEPS.map((step, index) => (_jsxs("div", { className: `flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`, children: [_jsx("button", { onClick: () => setCurrentStep(index), className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${index < currentStep
                                        ? 'bg-cyan-600 text-white'
                                        : index === currentStep
                                            ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 dark:ring-cyan-900'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`, children: index < currentStep ? _jsx(Check, { className: "w-4 h-4" }) : index + 1 }), index < STEPS.length - 1 && (_jsx("div", { className: `flex-1 h-0.5 mx-2 ${index < currentStep
                                        ? 'bg-cyan-600'
                                        : 'bg-slate-200 dark:bg-slate-700'}` }))] }, step))) }), _jsx("p", { className: "text-center text-sm font-medium text-slate-900 dark:text-white", children: STEPS[currentStep] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-6", children: [currentStep === 0 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Category", required: true, children: _jsxs("select", { value: formData.category, onChange: (e) => updateField('category', e.target.value), className: "form-select", children: [_jsx("option", { value: "", children: "Select category" }), CATEGORIES.map((cat) => (_jsx("option", { value: cat, children: cat }, cat)))] }) }), _jsx(FormField, { label: "Sub-Category", children: _jsx("input", { type: "text", value: formData.subCategory, onChange: (e) => updateField('subCategory', e.target.value), placeholder: "e.g., Traffic Violations", className: "form-input" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "First Name", required: true, children: _jsx("input", { type: "text", value: formData.firstName, onChange: (e) => updateField('firstName', e.target.value), placeholder: "Enter first name", className: "form-input" }) }), _jsx(FormField, { label: "Last Name", required: true, children: _jsx("input", { type: "text", value: formData.lastName, onChange: (e) => updateField('lastName', e.target.value), placeholder: "Enter last name", className: "form-input" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Email", required: true, children: _jsx("input", { type: "email", value: formData.email, onChange: (e) => updateField('email', e.target.value), placeholder: "email@example.com", className: "form-input" }) }), _jsx(FormField, { label: "Mobile Number", required: true, children: _jsx("input", { type: "tel", value: formData.mobile, onChange: (e) => updateField('mobile', e.target.value), placeholder: "+91 98765 43210", className: "form-input" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Gender", children: _jsxs("select", { value: formData.gender, onChange: (e) => updateField('gender', e.target.value), className: "form-select", children: [_jsx("option", { value: "Male", children: "Male" }), _jsx("option", { value: "Female", children: "Female" }), _jsx("option", { value: "Other", children: "Other" })] }) }), _jsx(FormField, { label: "Date of Birth", children: _jsx("input", { type: "date", value: formData.dateOfBirth, onChange: (e) => updateField('dateOfBirth', e.target.value), className: "form-input" }) })] })] })), currentStep === 1 && (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Current Address" }), _jsx(AddressForm, { address: formData.currentAddress, onChange: (address) => updateField('currentAddress', address) }), _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-700 pt-6", children: [_jsxs("label", { className: "flex items-center gap-2 mb-4", children: [_jsx("input", { type: "checkbox", checked: sameAsCurrentAddress, onChange: (e) => setSameAsCurrentAddress(e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: "Permanent address same as current address" })] }), !sameAsCurrentAddress && (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-4", children: "Permanent Address" }), _jsx(AddressForm, { address: formData.permanentAddress, onChange: (address) => updateField('permanentAddress', address) })] }))] })] })), currentStep === 2 && (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Qualifications" }), _jsxs("button", { onClick: () => updateField('qualifications', [...formData.qualifications, { ...emptyQualification }]), className: "inline-flex items-center gap-1 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add Qualification"] })] }), _jsx("div", { className: "space-y-4", children: formData.qualifications.map((qual, index) => (_jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: ["Qualification ", index + 1] }), formData.qualifications.length > 1 && (_jsx("button", { onClick: () => updateField('qualifications', formData.qualifications.filter((_, i) => i !== index)), className: "p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded", children: _jsx(Trash2, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Degree", children: _jsx("input", { type: "text", value: qual.degree, onChange: (e) => {
                                                                    const updated = [...formData.qualifications];
                                                                    updated[index] = { ...qual, degree: e.target.value };
                                                                    updateField('qualifications', updated);
                                                                }, placeholder: "e.g., BALLB", className: "form-input" }) }), _jsx(FormField, { label: "University", children: _jsx("input", { type: "text", value: qual.university, onChange: (e) => {
                                                                    const updated = [...formData.qualifications];
                                                                    updated[index] = { ...qual, university: e.target.value };
                                                                    updateField('qualifications', updated);
                                                                }, placeholder: "University name", className: "form-input" }) }), _jsx(FormField, { label: "Year of Completion", children: _jsx("input", { type: "number", value: qual.yearOfCompletion, onChange: (e) => {
                                                                    const updated = [...formData.qualifications];
                                                                    updated[index] = { ...qual, yearOfCompletion: parseInt(e.target.value) };
                                                                    updateField('qualifications', updated);
                                                                }, className: "form-input" }) }), _jsx(FormField, { label: "Percentage", children: _jsx("input", { type: "number", value: qual.percentage || '', onChange: (e) => {
                                                                    const updated = [...formData.qualifications];
                                                                    updated[index] = {
                                                                        ...qual,
                                                                        percentage: e.target.value ? parseFloat(e.target.value) : null,
                                                                    };
                                                                    updateField('qualifications', updated);
                                                                }, placeholder: "Optional", className: "form-input" }) })] })] }, index))) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Experience" }), _jsxs("button", { onClick: () => updateField('experience', [...formData.experience, { ...emptyExperience }]), className: "inline-flex items-center gap-1 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add Experience"] })] }), _jsx("div", { className: "space-y-4", children: formData.experience.map((exp, index) => (_jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: ["Experience ", index + 1] }), formData.experience.length > 1 && (_jsx("button", { onClick: () => updateField('experience', formData.experience.filter((_, i) => i !== index)), className: "p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded", children: _jsx(Trash2, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Company", children: _jsx("input", { type: "text", value: exp.company, onChange: (e) => {
                                                                    const updated = [...formData.experience];
                                                                    updated[index] = { ...exp, company: e.target.value };
                                                                    updateField('experience', updated);
                                                                }, placeholder: "Company name", className: "form-input" }) }), _jsx(FormField, { label: "Role", children: _jsx("input", { type: "text", value: exp.role, onChange: (e) => {
                                                                    const updated = [...formData.experience];
                                                                    updated[index] = { ...exp, role: e.target.value };
                                                                    updateField('experience', updated);
                                                                }, placeholder: "Job title", className: "form-input" }) }), _jsx(FormField, { label: "Start Date", children: _jsx("input", { type: "date", value: exp.startDate, onChange: (e) => {
                                                                    const updated = [...formData.experience];
                                                                    updated[index] = { ...exp, startDate: e.target.value };
                                                                    updateField('experience', updated);
                                                                }, className: "form-input" }) }), _jsx(FormField, { label: "End Date", children: _jsx("input", { type: "date", value: exp.endDate || '', onChange: (e) => {
                                                                    const updated = [...formData.experience];
                                                                    updated[index] = { ...exp, endDate: e.target.value || null };
                                                                    updateField('experience', updated);
                                                                }, className: "form-input" }) }), _jsx("div", { className: "sm:col-span-2", children: _jsx(FormField, { label: "Functional Area", children: _jsx("input", { type: "text", value: exp.functionalArea, onChange: (e) => {
                                                                        const updated = [...formData.experience];
                                                                        updated[index] = { ...exp, functionalArea: e.target.value };
                                                                        updateField('experience', updated);
                                                                    }, placeholder: "e.g., Traffic Law & MVA", className: "form-input" }) }) })] })] }, index))) })] })] })), currentStep === 3 && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(DocumentUpload, { label: "Aadhaar Card", number: formData.kycDocuments.aadhaar.number, onNumberChange: (num) => updateField('kycDocuments', {
                                        ...formData.kycDocuments,
                                        aadhaar: { ...formData.kycDocuments.aadhaar, number: num },
                                    }), hasDocument: !!formData.kycDocuments.aadhaar.documentUrl, numberPlaceholder: "XXXX-XXXX-XXXX" }), _jsx(DocumentUpload, { label: "PAN Card", number: formData.kycDocuments.pan.number, onNumberChange: (num) => updateField('kycDocuments', {
                                        ...formData.kycDocuments,
                                        pan: { ...formData.kycDocuments.pan, number: num },
                                    }), hasDocument: !!formData.kycDocuments.pan.documentUrl, numberPlaceholder: "ABCDE1234F" }), _jsx(DocumentUpload, { label: "Driving Licence", hasDocument: !!formData.kycDocuments.drivingLicence.documentUrl }), _jsx(DocumentUpload, { label: "Cancelled Cheque", hasDocument: !!formData.kycDocuments.cancelledCheque.documentUrl }), _jsx(DocumentUpload, { label: "Bar ID", number: formData.kycDocuments.barId.number, onNumberChange: (num) => updateField('kycDocuments', {
                                        ...formData.kycDocuments,
                                        barId: { ...formData.kycDocuments.barId, number: num },
                                    }), hasDocument: !!formData.kycDocuments.barId.documentUrl, numberPlaceholder: "D/1234/2020" }), _jsx(DocumentUpload, { label: "BALLB Certificate", hasDocument: !!formData.kycDocuments.ballbCertificate.documentUrl })] }) })), currentStep === 4 && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Account Holder Name", required: true, children: _jsx("input", { type: "text", value: formData.bankDetails.accountHolderName, onChange: (e) => updateField('bankDetails', {
                                            ...formData.bankDetails,
                                            accountHolderName: e.target.value,
                                        }), placeholder: "As per bank records", className: "form-input" }) }), _jsx(FormField, { label: "Account Number", required: true, children: _jsx("input", { type: "text", value: formData.bankDetails.accountNumber, onChange: (e) => updateField('bankDetails', {
                                            ...formData.bankDetails,
                                            accountNumber: e.target.value,
                                        }), placeholder: "Account number", className: "form-input" }) }), _jsx(FormField, { label: "Bank Name", required: true, children: _jsx("input", { type: "text", value: formData.bankDetails.bankName, onChange: (e) => updateField('bankDetails', {
                                            ...formData.bankDetails,
                                            bankName: e.target.value,
                                        }), placeholder: "e.g., HDFC Bank", className: "form-input" }) }), _jsx(FormField, { label: "IFSC Code", required: true, children: _jsx("input", { type: "text", value: formData.bankDetails.ifscCode, onChange: (e) => updateField('bankDetails', {
                                            ...formData.bankDetails,
                                            ifscCode: e.target.value.toUpperCase(),
                                        }), placeholder: "e.g., HDFC0001234", className: "form-input" }) })] }) })), currentStep === 5 && (_jsxs("div", { className: "space-y-6", children: [_jsx(FormField, { label: "Years of Experience", required: true, children: _jsx("input", { type: "number", value: formData.expertise.yearsOfExperience, onChange: (e) => updateField('expertise', {
                                        ...formData.expertise,
                                        yearsOfExperience: parseInt(e.target.value) || 0,
                                    }), min: "0", className: "form-input max-w-[200px]" }) }), _jsx(TagInput, { label: "Preferred Languages", tags: formData.expertise.preferredLanguages, inputValue: languageInput, onInputChange: setLanguageInput, onAdd: () => {
                                    if (languageInput.trim()) {
                                        updateField('expertise', {
                                            ...formData.expertise,
                                            preferredLanguages: [...formData.expertise.preferredLanguages, languageInput.trim()],
                                        });
                                        setLanguageInput('');
                                    }
                                }, onRemove: (index) => updateField('expertise', {
                                    ...formData.expertise,
                                    preferredLanguages: formData.expertise.preferredLanguages.filter((_, i) => i !== index),
                                }), placeholder: "e.g., Hindi, English" }), _jsx(TagInput, { label: "Preferred Locations", tags: formData.expertise.preferredLocations, inputValue: locationInput, onInputChange: setLocationInput, onAdd: () => {
                                    if (locationInput.trim()) {
                                        updateField('expertise', {
                                            ...formData.expertise,
                                            preferredLocations: [...formData.expertise.preferredLocations, locationInput.trim()],
                                        });
                                        setLocationInput('');
                                    }
                                }, onRemove: (index) => updateField('expertise', {
                                    ...formData.expertise,
                                    preferredLocations: formData.expertise.preferredLocations.filter((_, i) => i !== index),
                                }), placeholder: "e.g., Delhi, Mumbai" }), _jsx(TagInput, { label: "Case Types", tags: formData.expertise.caseTypes, inputValue: caseTypeInput, onInputChange: setCaseTypeInput, onAdd: () => {
                                    if (caseTypeInput.trim()) {
                                        updateField('expertise', {
                                            ...formData.expertise,
                                            caseTypes: [...formData.expertise.caseTypes, caseTypeInput.trim()],
                                        });
                                        setCaseTypeInput('');
                                    }
                                }, onRemove: (index) => updateField('expertise', {
                                    ...formData.expertise,
                                    caseTypes: formData.expertise.caseTypes.filter((_, i) => i !== index),
                                }), placeholder: "e.g., Traffic Challans, MVA Claims" })] })), currentStep === 6 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("label", { className: "flex items-center gap-2 mb-4", children: [_jsx("input", { type: "checkbox", checked: hasCompany, onChange: (e) => setHasCompany(e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: "Lawyer operates through a company/firm" })] }), hasCompany && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Company Name", required: true, children: _jsx("input", { type: "text", value: formData.company?.name || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        name: e.target.value,
                                                    }), placeholder: "Company name", className: "form-input" }) }), _jsx(FormField, { label: "Company Email", children: _jsx("input", { type: "email", value: formData.company?.email || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        email: e.target.value,
                                                    }), placeholder: "company@example.com", className: "form-input" }) }), _jsx(FormField, { label: "Company Phone", children: _jsx("input", { type: "tel", value: formData.company?.phone || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        phone: e.target.value,
                                                    }), placeholder: "+91 22 2345 6789", className: "form-input" }) }), _jsx(FormField, { label: "Website", children: _jsx("input", { type: "url", value: formData.company?.website || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        website: e.target.value,
                                                    }), placeholder: "https://company.com", className: "form-input" }) }), _jsx(FormField, { label: "GST Number", children: _jsx("input", { type: "text", value: formData.company?.gstNumber || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        gstNumber: e.target.value.toUpperCase(),
                                                    }), placeholder: "22AAAAA0000A1Z5", className: "form-input" }) }), _jsx(FormField, { label: "PAN Number", children: _jsx("input", { type: "text", value: formData.company?.panNumber || '', onChange: (e) => updateField('company', {
                                                        ...formData.company,
                                                        panNumber: e.target.value.toUpperCase(),
                                                    }), placeholder: "AAAAA0000A", className: "form-input" }) })] }), _jsx(FormField, { label: "Company Address", children: _jsx("textarea", { value: formData.company?.address || '', onChange: (e) => updateField('company', {
                                                ...formData.company,
                                                address: e.target.value,
                                            }), rows: 2, placeholder: "Full company address", className: "form-input" }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: _jsx(FormField, { label: "Main Office Location", children: _jsx("input", { type: "text", value: formData.company?.mainOffice || '', onChange: (e) => updateField('company', {
                                                    ...formData.company,
                                                    mainOffice: e.target.value,
                                                }), placeholder: "e.g., Mumbai", className: "form-input" }) }) })] }))] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { onClick: currentStep === 0 ? onBack : handlePrev, className: "px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: currentStep === 0 ? 'Cancel' : 'Previous' }), currentStep === STEPS.length - 1 ? (_jsx("button", { onClick: handleSubmit, className: "px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors", children: isEdit ? 'Save Changes' : 'Add Lawyer' })) : (_jsx("button", { onClick: handleNext, className: "px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors", children: "Next" }))] }), _jsx("style", { children: `
        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          color: rgb(15 23 42);
          transition: all 0.15s;
        }
        .form-input:focus {
          outline: none;
          border-color: rgb(8 145 178);
          box-shadow: 0 0 0 3px rgb(8 145 178 / 0.1);
        }
        .form-input::placeholder {
          color: rgb(148 163 184);
        }
        .dark .form-input {
          background: rgb(30 41 59);
          border-color: rgb(51 65 85);
          color: white;
        }
        .dark .form-input:focus {
          border-color: rgb(6 182 212);
          box-shadow: 0 0 0 3px rgb(6 182 212 / 0.1);
        }
        .form-select {
          width: 100%;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          color: rgb(15 23 42);
          transition: all 0.15s;
          cursor: pointer;
        }
        .form-select:focus {
          outline: none;
          border-color: rgb(8 145 178);
          box-shadow: 0 0 0 3px rgb(8 145 178 / 0.1);
        }
        .dark .form-select {
          background: rgb(30 41 59);
          border-color: rgb(51 65 85);
          color: white;
        }
        .dark .form-select:focus {
          border-color: rgb(6 182 212);
          box-shadow: 0 0 0 3px rgb(6 182 212 / 0.1);
        }
      ` })] }));
}
function FormField({ label, required, children, }) {
    return (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: [label, required && _jsx("span", { className: "text-red-500 ml-0.5", children: "*" })] }), children] }));
}
function AddressForm({ address, onChange, }) {
    return (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(FormField, { label: "Address Line", required: true, children: _jsx("input", { type: "text", value: address.addressLine, onChange: (e) => onChange({ ...address, addressLine: e.target.value }), placeholder: "Street address", className: "form-input" }) }), _jsx(FormField, { label: "Area/Locality", children: _jsx("input", { type: "text", value: address.area, onChange: (e) => onChange({ ...address, area: e.target.value }), placeholder: "Area or locality", className: "form-input" }) }), _jsx(FormField, { label: "City", required: true, children: _jsx("input", { type: "text", value: address.city, onChange: (e) => onChange({ ...address, city: e.target.value }), placeholder: "City", className: "form-input" }) }), _jsx(FormField, { label: "State", required: true, children: _jsx("input", { type: "text", value: address.state, onChange: (e) => onChange({ ...address, state: e.target.value }), placeholder: "State", className: "form-input" }) }), _jsx(FormField, { label: "PIN Code", required: true, children: _jsx("input", { type: "text", value: address.pinCode, onChange: (e) => onChange({ ...address, pinCode: e.target.value }), placeholder: "PIN code", className: "form-input" }) }), _jsx(FormField, { label: "Country", children: _jsx("input", { type: "text", value: address.country, onChange: (e) => onChange({ ...address, country: e.target.value }), placeholder: "Country", className: "form-input" }) })] }));
}
function DocumentUpload({ label, number, onNumberChange, hasDocument, numberPlaceholder, }) {
    return (_jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-3", children: label }), number !== undefined && onNumberChange && (_jsx("div", { className: "mb-3", children: _jsx("input", { type: "text", value: number, onChange: (e) => onNumberChange(e.target.value), placeholder: numberPlaceholder, className: "form-input" }) })), _jsxs("button", { className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-colors", children: [_jsx(Upload, { className: "w-4 h-4" }), hasDocument ? 'Replace Document' : 'Upload Document'] })] }));
}
function TagInput({ label, tags, inputValue, onInputChange, onAdd, onRemove, placeholder, }) {
    return (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: label }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => onInputChange(e.target.value), onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onAdd();
                            }
                        }, placeholder: placeholder, className: "form-input flex-1" }), _jsx("button", { onClick: onAdd, className: "px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors", children: "Add" })] }), tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm rounded-full", children: [tag, _jsx("button", { onClick: () => onRemove(index), className: "p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-800 rounded-full", children: _jsx("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }, index))) }))] }));
}
