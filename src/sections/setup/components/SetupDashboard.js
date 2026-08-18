import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import { SetupSidebar } from './SetupSidebar';
import { SlideOverPanel } from './SlideOverPanel';
import { ServicesTable } from './ServicesTable';
import { PriceCategoriesTable } from './PriceCategoriesTable';
import { DepartmentsTable } from './DepartmentsTable';
import { DesignationsTable } from './DesignationsTable';
import { MastersTable } from './MastersTable';
import { GeographicTable } from './GeographicTable';
import { AuditLogTable } from './AuditLogTable';
const TAB_LABELS = {
    services: 'Services',
    priceCategories: 'Price Categories',
    departments: 'Departments',
    designations: 'Designations',
    masters: 'Masters',
    geographic: 'Geographic',
    auditLog: 'Audit Log',
};
const TAB_DESCRIPTIONS = {
    services: 'Manage platform services and product offerings',
    priceCategories: 'Configure pricing tiers and markup percentages',
    departments: 'Manage organizational departments',
    designations: 'Configure job titles and role mappings',
    masters: 'Manage dropdown categories and configurable values',
    geographic: 'Configure countries, states, and cities',
    auditLog: 'View all configuration changes',
};
export function SetupDashboard({ activeTab: initialTab = 'services', services, priceCategories, departments, designations, masters, masterValues, geographicValues, auditEntries, onTabChange, onAddService, onEditService, onToggleService, onDeleteService, onAddPriceCategory, onEditPriceCategory, onTogglePriceCategory, onDeletePriceCategory, onAddDepartment, onEditDepartment, onToggleDepartment, onDeleteDepartment, onAddDesignation, onEditDesignation, onToggleDesignation, onDeleteDesignation, onAddMaster, onEditMaster, onToggleMaster, onDeleteMaster, onAddMasterValue, onToggleMasterValue, onAddGeographic, onEditGeographic, onToggleGeographic, onDeleteGeographic, }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [slideOver, setSlideOver] = useState(null);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchQuery('');
        setStatusFilter('all');
        onTabChange?.(tab);
    };
    const handleAdd = () => {
        if (activeTab === 'auditLog')
            return;
        setSlideOver({ mode: 'add', tab: activeTab });
    };
    const handleEdit = (itemId) => {
        setSlideOver({ mode: 'edit', tab: activeTab, itemId });
    };
    const closeSlideOver = () => setSlideOver(null);
    // Find selected item for the form
    const selectedItem = slideOver?.itemId
        ? (() => {
            switch (slideOver.tab) {
                case 'services':
                    return services.find((s) => s.id === slideOver.itemId);
                case 'priceCategories':
                    return priceCategories.find((pc) => pc.id === slideOver.itemId);
                case 'departments':
                    return departments.find((d) => d.id === slideOver.itemId);
                case 'designations':
                    return designations.find((d) => d.id === slideOver.itemId);
                case 'masters':
                    return masters.find((m) => m.id === slideOver.itemId);
                case 'geographic':
                    return geographicValues.find((g) => g.id === slideOver.itemId);
                default:
                    return undefined;
            }
        })()
        : undefined;
    const isAudit = activeTab === 'auditLog';
    return (_jsxs("div", { className: "flex h-full bg-slate-100 dark:bg-slate-950", children: [_jsx(SetupSidebar, { activeTab: activeTab, onTabChange: handleTabChange }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: TAB_LABELS[activeTab] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: TAB_DESCRIPTIONS[activeTab] })] }), !isAudit && (_jsxs("button", { onClick: handleAdd, className: "inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add ", TAB_LABELS[activeTab].replace(/ies$/, 'y').replace(/s$/, '')] }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: `Search ${TAB_LABELS[activeTab].toLowerCase()}...`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), !isAudit && (_jsxs("div", { className: "relative", children: [_jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "appearance-none pl-3 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] }), _jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" })] }))] })] }), _jsxs("div", { className: "flex-1 bg-white dark:bg-slate-900 overflow-auto", children: [activeTab === 'services' && (_jsx(ServicesTable, { services: services, searchQuery: searchQuery, statusFilter: statusFilter, onEdit: handleEdit, onToggle: (id, status) => onToggleService?.(id, status), onDelete: (id) => onDeleteService?.(id) })), activeTab === 'priceCategories' && (_jsx(PriceCategoriesTable, { priceCategories: priceCategories, searchQuery: searchQuery, statusFilter: statusFilter, onEdit: handleEdit, onToggle: (id, status) => onTogglePriceCategory?.(id, status), onDelete: (id) => onDeletePriceCategory?.(id) })), activeTab === 'departments' && (_jsx(DepartmentsTable, { departments: departments, searchQuery: searchQuery, statusFilter: statusFilter, onEdit: handleEdit, onToggle: (id, status) => onToggleDepartment?.(id, status), onDelete: (id) => onDeleteDepartment?.(id) })), activeTab === 'designations' && (_jsx(DesignationsTable, { designations: designations, departments: departments, searchQuery: searchQuery, statusFilter: statusFilter, onEdit: handleEdit, onToggle: (id, status) => onToggleDesignation?.(id, status), onDelete: (id) => onDeleteDesignation?.(id) })), activeTab === 'masters' && (_jsx(MastersTable, { masters: masters, masterValues: masterValues, searchQuery: searchQuery, statusFilter: statusFilter, onEditMaster: handleEdit, onToggleMaster: (id, status) => onToggleMaster?.(id, status), onDeleteMaster: (id) => onDeleteMaster?.(id), onAddMasterValue: (masterId) => onAddMasterValue?.(masterId), onToggleMasterValue: (masterId, valueId, status) => onToggleMasterValue?.(masterId, valueId, status) })), activeTab === 'geographic' && (_jsx(GeographicTable, { geographicValues: geographicValues, searchQuery: searchQuery, statusFilter: statusFilter, onEdit: handleEdit, onToggle: (id, status) => onToggleGeographic?.(id, status), onDelete: (id) => onDeleteGeographic?.(id) })), activeTab === 'auditLog' && (_jsx(AuditLogTable, { auditEntries: auditEntries, searchQuery: searchQuery }))] })] }), _jsxs(SlideOverPanel, { open: slideOver !== null, title: slideOver
                    ? `${slideOver.mode === 'add' ? 'Add' : 'Edit'} ${TAB_LABELS[slideOver.tab].replace(/ies$/, 'y').replace(/s$/, '')}`
                    : '', onClose: closeSlideOver, children: [slideOver?.tab === 'services' && (_jsx(ServiceForm, { service: selectedItem, mode: slideOver.mode })), slideOver?.tab === 'priceCategories' && (_jsx(PriceCategoryForm, { priceCategory: selectedItem, mode: slideOver.mode })), slideOver?.tab === 'departments' && (_jsx(DepartmentForm, { department: selectedItem, mode: slideOver.mode })), slideOver?.tab === 'designations' && (_jsx(DesignationForm, { designation: selectedItem, departments: departments, mode: slideOver.mode })), slideOver?.tab === 'masters' && (_jsx(MasterForm, { master: selectedItem, values: slideOver.itemId ? (masterValues[slideOver.itemId] || []) : [], mode: slideOver.mode })), slideOver?.tab === 'geographic' && (_jsx(GeographicForm, { geographic: selectedItem, geographicValues: geographicValues, mode: slideOver.mode }))] })] }));
}
// =============================================================================
// Form Components (inline — these render inside the slide-over)
// =============================================================================
function FormField({ label, children, hint }) {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: label }), children, hint && _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1", children: hint })] }));
}
function TextInput({ defaultValue, placeholder }) {
    return (_jsx("input", { type: "text", defaultValue: defaultValue, placeholder: placeholder, className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" }));
}
function TextArea({ defaultValue, placeholder, rows = 3 }) {
    return (_jsx("textarea", { defaultValue: defaultValue, placeholder: placeholder, rows: rows, className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none" }));
}
function SelectInput({ defaultValue, options }) {
    return (_jsx("select", { defaultValue: defaultValue, className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500", children: options.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) }));
}
function NumberInput({ defaultValue, placeholder, suffix }) {
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "number", defaultValue: defaultValue, placeholder: placeholder, className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" }), suffix && (_jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400", children: suffix }))] }));
}
function StatusToggle({ defaultValue = 'active' }) {
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${defaultValue === 'active'
                    ? 'bg-cyan-500'
                    : 'bg-slate-300 dark:bg-slate-600'}`, children: _jsx("div", { className: `absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${defaultValue === 'active' ? 'left-5' : 'left-0.5'}` }) }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: defaultValue === 'active' ? 'Active' : 'Inactive' })] }));
}
// --- Service Form ---
function ServiceForm({ service, mode }) {
    return (_jsxs("div", { className: "space-y-0", children: [_jsx(FormField, { label: "Service Name", children: _jsx(TextInput, { defaultValue: service?.name, placeholder: "e.g., Court Challan" }) }), _jsx(FormField, { label: "Type", children: _jsx(SelectInput, { defaultValue: service?.type || 'Against Vehicle', options: [
                        { value: 'Against Vehicle', label: 'Against Vehicle' },
                        { value: 'Topup Service', label: 'Topup Service' },
                    ] }) }), _jsx(FormField, { label: "Vehicle Category", children: _jsx(SelectInput, { defaultValue: service?.category || 'Private Vehicles', options: [
                        { value: 'Private Vehicles', label: 'Private Vehicles' },
                        { value: 'Commercial Vehicle', label: 'Commercial Vehicle' },
                    ] }) }), _jsx(FormField, { label: "Slug", hint: "URL-friendly identifier, auto-generated from name", children: _jsx(TextInput, { defaultValue: service?.slug, placeholder: "court-challan" }) }), _jsx(FormField, { label: "Credits", children: _jsx(NumberInput, { defaultValue: service?.credits ?? 1, placeholder: "1" }) }), _jsx(FormField, { label: "Description", children: _jsx(TextArea, { defaultValue: service?.description, placeholder: "Brief description of this service..." }) }), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: service?.status }) })] }));
}
// --- Price Category Form ---
function PriceCategoryForm({ priceCategory, mode }) {
    const isProtected = priceCategory?.isProtected;
    return (_jsxs("div", { className: "space-y-0", children: [isProtected && (_jsx("div", { className: "mb-4 px-3 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800", children: _jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400 font-medium", children: "This is a protected category. Core pricing values cannot be modified." }) })), _jsx(FormField, { label: "Category Name", children: _jsx(TextInput, { defaultValue: priceCategory?.name, placeholder: "e.g., Class G - RTO + 18% (GST)" }) }), _jsx(FormField, { label: "Markup Percentage", hint: "Percentage added to the base price", children: _jsx(NumberInput, { defaultValue: priceCategory?.increaseBy ?? 0, placeholder: "18", suffix: "%" }) }), _jsx(FormField, { label: "Description", children: _jsx(TextArea, { defaultValue: priceCategory?.description, placeholder: "Description of this pricing tier..." }) }), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: priceCategory?.status }) })] }));
}
// --- Department Form ---
function DepartmentForm({ department, mode }) {
    return (_jsxs("div", { className: "space-y-0", children: [_jsx(FormField, { label: "Department Name", children: _jsx(TextInput, { defaultValue: department?.name, placeholder: "e.g., Business Operations" }) }), _jsx(FormField, { label: "Head Count", children: _jsx(NumberInput, { defaultValue: department?.headCount ?? 0, placeholder: "0" }) }), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: department?.status }) })] }));
}
// --- Designation Form ---
function DesignationForm({ designation, departments, mode, }) {
    const activeDepts = departments.filter((d) => d.status === 'active');
    return (_jsxs("div", { className: "space-y-0", children: [_jsx(FormField, { label: "Title", children: _jsx(TextInput, { defaultValue: designation?.title, placeholder: "e.g., Data Analyst" }) }), _jsx(FormField, { label: "Department", children: _jsx(SelectInput, { defaultValue: designation?.departmentId || activeDepts[0]?.id, options: activeDepts.map((d) => ({ value: d.id, label: d.name })) }) }), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: designation?.status }) })] }));
}
// --- Master Form ---
function MasterForm({ master, values, mode }) {
    const [newValue, setNewValue] = useState('');
    const allModules = [
        'Incidents', 'Leads', 'Subscribers', 'Customers', 'Lawyers',
        'Partners', 'Payments', 'Disputes', 'Support', 'Reports', 'Team',
    ];
    const selected = new Set(master?.usageModules || []);
    const sortedValues = [...values].sort((a, b) => a.sortOrder - b.sortOrder);
    return (_jsxs("div", { className: "space-y-0", children: [_jsx(FormField, { label: "Master Name", children: _jsx(TextInput, { defaultValue: master?.name, placeholder: "e.g., Lead Sources" }) }), _jsx(FormField, { label: "Description", children: _jsx(TextArea, { defaultValue: master?.description, placeholder: "What this category is used for..." }) }), _jsx(FormField, { label: "Usage Modules", children: _jsx("div", { className: "grid grid-cols-2 gap-2", children: allModules.map((mod) => (_jsxs("label", { className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors", children: [_jsx("input", { type: "checkbox", defaultChecked: selected.has(mod), className: "h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500" }), _jsx("span", { className: "text-xs text-slate-700 dark:text-slate-300", children: mod })] }, mod))) }) }), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: master?.status }) }), mode === 'edit' && (_jsxs("div", { className: "mt-2 pt-4 border-t border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300", children: "Values" }), _jsxs("span", { className: "text-xs text-slate-400 dark:text-slate-500", children: [sortedValues.length, " ", sortedValues.length === 1 ? 'value' : 'values'] })] }), sortedValues.length > 0 && (_jsx("div", { className: "space-y-1 mb-3", children: sortedValues.map((val) => (_jsxs("div", { className: "flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800", children: [_jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: val.value }), _jsx("span", { className: `px-1.5 py-0.5 text-[10px] font-medium rounded-full ${val.status === 'active'
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-500'}`, children: val.status })] }, val.id))) })), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: newValue, onChange: (e) => setNewValue(e.target.value), placeholder: "New value...", className: "flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" }), _jsx("button", { onClick: () => setNewValue(''), className: "px-3 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors", children: "Add" })] })] }))] }));
}
// --- Geographic Form ---
function GeographicForm({ geographic, geographicValues, mode, }) {
    const level = geographic?.level || 'state';
    const countries = geographicValues.filter((g) => g.level === 'country');
    const states = geographicValues.filter((g) => g.level === 'state');
    return (_jsxs("div", { className: "space-y-0", children: [_jsx(FormField, { label: "Name", children: _jsx(TextInput, { defaultValue: geographic?.name, placeholder: "e.g., Maharashtra" }) }), _jsx(FormField, { label: "Code", hint: "Short identifier (e.g., MH, MUM, IN)", children: _jsx(TextInput, { defaultValue: geographic?.code, placeholder: "MH" }) }), _jsx(FormField, { label: "Level", children: _jsx(SelectInput, { defaultValue: level, options: [
                        { value: 'country', label: 'Country' },
                        { value: 'state', label: 'State' },
                        { value: 'city', label: 'City' },
                    ] }) }), level === 'state' && (_jsx(FormField, { label: "Parent Country", children: _jsx(SelectInput, { defaultValue: geographic?.parentId || countries[0]?.id, options: countries.map((c) => ({ value: c.id, label: c.name })) }) })), level === 'city' && (_jsx(FormField, { label: "Parent State", children: _jsx(SelectInput, { defaultValue: geographic?.parentId || states[0]?.id, options: states.map((s) => ({ value: s.id, label: s.name })) }) })), _jsx(FormField, { label: "Status", children: _jsx(StatusToggle, { defaultValue: geographic?.status }) })] }));
}
