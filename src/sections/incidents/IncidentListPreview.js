import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/incidents/data.json';
import { IncidentList } from './components/IncidentList';
import { IncidentDetailView } from './IncidentDetailView';
import { AddChallanModal } from './components/AddChallanModal';
import { AddCaseModal } from './components/AddCaseModal';
import { AssignAgentModal } from './components/AssignAgentModal';
import { AssignLawyerModal } from './components/AssignLawyerModal';
import { MoveQueueModal } from './components/MoveQueueModal';
import { BulkUpdateModal } from './components/BulkUpdateModal';
import { ScreenResultsView } from './components/ScreenResultsView';
export default function IncidentListPreview() {
    // View state
    const [viewMode, setViewMode] = useState('list');
    const [selectedIncidentId, setSelectedIncidentId] = useState(null);
    // Modal state
    const [activeModal, setActiveModal] = useState(null);
    const [selectedIncidentIds, setSelectedIncidentIds] = useState([]);
    // Results state (for demo)
    const [screeningResults, setScreeningResults] = useState([]);
    // Get incident details for detail view
    const selectedIncident = data.incidents.find(i => i.id === selectedIncidentId);
    const subscriber = selectedIncident
        ? data.subscribers.find(s => s.id === selectedIncident.subscriberId)
        : null;
    const assignedAgent = selectedIncident?.assignedAgentId
        ? data.users.find(u => u.id === selectedIncident.assignedAgentId)
        : null;
    const assignedLawyer = selectedIncident?.assignedLawyerId
        ? data.lawyers.find(l => l.id === selectedIncident.assignedLawyerId)
        : null;
    const followUps = data.followUps.filter(f => f.incidentId === selectedIncidentId);
    const timelineActivities = data.timelineActivities.filter(t => t.incidentId === selectedIncidentId);
    const documents = data.documents.filter(d => d.incidentId === selectedIncidentId);
    // Handlers
    const handleViewIncident = (incidentId) => {
        setSelectedIncidentId(incidentId);
        setViewMode('detail');
    };
    const handleBack = () => {
        setViewMode('list');
        setSelectedIncidentId(null);
    };
    const handleAddChallan = () => {
        setActiveModal('addChallan');
    };
    const handleAddCase = () => {
        setActiveModal('addCase');
    };
    const handleScreen = (incidentIds) => {
        setSelectedIncidentIds(incidentIds);
        const selectedChallanNumbers = new Set(data.incidents
            .filter((i) => incidentIds.includes(i.id))
            .map((i) => i.challanNumber));
        const allResults = data.screeningResults;
        const scoped = allResults.filter((r) => selectedChallanNumbers.has(r.challanNumber));
        // Fall back to sampling by count when sample data doesn't cover the picked challan numbers
        const scopedResults = scoped.length > 0 ? scoped : allResults.slice(0, incidentIds.length);
        setScreeningResults(scopedResults);
        setViewMode('screenResults');
    };
    const handleAssignAgent = (incidentIds, agentId, notes) => {
        if (agentId) {
            console.log('Assigning agent:', agentId, 'to incidents:', incidentIds, 'notes:', notes);
            setActiveModal(null);
        }
        else {
            setSelectedIncidentIds(incidentIds);
            setActiveModal('assignAgent');
        }
    };
    const handleAssignLawyer = (incidentIds, lawyerId, notes) => {
        if (lawyerId) {
            console.log('Assigning lawyer:', lawyerId, 'to incidents:', incidentIds, 'notes:', notes);
            setActiveModal(null);
        }
        else {
            setSelectedIncidentIds(incidentIds);
            setActiveModal('assignLawyer');
        }
    };
    const handleMoveQueue = (incidentIds, queue) => {
        if (queue) {
            console.log('Moving incidents:', incidentIds, 'to queue:', queue);
            setActiveModal(null);
        }
        else {
            setSelectedIncidentIds(incidentIds);
            setActiveModal('moveQueue');
        }
    };
    const handleBulkUpdate = (incidentIds, file) => {
        if (file) {
            console.log('Bulk updating incidents:', incidentIds, 'with file:', file.name);
            setActiveModal(null);
        }
        else {
            setSelectedIncidentIds(incidentIds);
            setActiveModal('bulkUpdate');
        }
    };
    // Render screening results view
    if (viewMode === 'screenResults') {
        return (_jsx(ScreenResultsView, { results: screeningResults, onClose: handleBack, onConfirm: (selectedChallans) => {
                console.log('Confirming screening for challans:', selectedChallans);
                handleBack();
            } }));
    }
    // Render detail view
    if (viewMode === 'detail' && selectedIncident && subscriber) {
        return (_jsx(IncidentDetailView, { incident: selectedIncident, subscriber: subscriber, assignedAgent: assignedAgent, assignedLawyer: assignedLawyer, followUps: followUps, timelineActivities: timelineActivities, documents: documents, users: data.users, lawyers: data.lawyers, onBack: handleBack, onAddFollowUp: (incidentId, followUp) => {
                console.log('Add follow-up:', incidentId, followUp);
            }, onUploadDocument: (incidentId, file, type) => {
                console.log('Upload document:', incidentId, file.name, type);
            }, onViewDocument: (documentId) => console.log('View document:', documentId), onDeleteDocument: (documentId) => console.log('Delete document:', documentId), onAssignAgent: (incidentId, agentId) => {
                console.log('Assign agent:', agentId, 'to incident:', incidentId);
            }, onAssignLawyer: (incidentId, lawyerId) => {
                console.log('Assign lawyer:', lawyerId, 'to incident:', incidentId);
            }, onMoveQueue: (incidentId, queue) => {
                console.log('Move incident:', incidentId, 'to queue:', queue);
            }, onScreen: (incidentId) => handleScreen([incidentId]), onUpdate: (incidentId, updates) => {
                console.log('Update incident:', incidentId, updates);
            } }));
    }
    // Render list view with modals
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-[calc(100vh-64px)]", children: _jsx(IncidentList, { incidents: data.incidents, challanQueueCounts: data.challanQueueCounts, caseQueueCounts: data.caseQueueCounts, pagination: data.pagination, users: data.users, lawyers: data.lawyers, sources: data.sources, offenceTypes: data.offenceTypes, onViewIncident: handleViewIncident, onAddChallan: handleAddChallan, onAddCase: handleAddCase, onScreen: handleScreen, onAssignAgent: (ids, agentId) => handleAssignAgent(ids, agentId), onAssignLawyer: (ids, lawyerId) => handleAssignLawyer(ids, lawyerId), onMoveQueue: (ids, queue) => handleMoveQueue(ids, queue), onBulkUpdate: (ids, file) => handleBulkUpdate(ids, file), onExport: (ids) => console.log('Export incidents:', ids), onSearch: (query) => console.log('Search:', query), onFilter: (filters) => console.log('Filter:', filters), onQueueChange: (queue) => console.log('Queue changed:', queue), onPageChange: (page) => console.log('Page changed:', page) }) }), activeModal === 'addChallan' && (_jsx(AddChallanModal, { subscribers: data.subscribers, sources: data.sources, onSubmit: (challan) => {
                    console.log('Add challan:', challan);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), activeModal === 'addCase' && (_jsx(AddCaseModal, { subscribers: data.subscribers, sources: data.sources, onSubmit: (caseData) => {
                    console.log('Add case:', caseData);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), activeModal === 'assignAgent' && (_jsx(AssignAgentModal, { selectedCount: selectedIncidentIds.length, users: data.users, onAssign: (agentId, notes) => handleAssignAgent(selectedIncidentIds, agentId, notes), onClose: () => setActiveModal(null) })), activeModal === 'assignLawyer' && (_jsx(AssignLawyerModal, { selectedCount: selectedIncidentIds.length, lawyers: data.lawyers, onAssign: (lawyerId, notes) => handleAssignLawyer(selectedIncidentIds, lawyerId, notes), onClose: () => setActiveModal(null) })), activeModal === 'moveQueue' && (_jsx(MoveQueueModal, { selectedCount: selectedIncidentIds.length, onMove: (queue) => handleMoveQueue(selectedIncidentIds, queue), onClose: () => setActiveModal(null) })), activeModal === 'bulkUpdate' && (_jsx(BulkUpdateModal, { selectedCount: selectedIncidentIds.length, onUpload: (file) => handleBulkUpdate(selectedIncidentIds, file), onClose: () => setActiveModal(null) }))] }));
}
