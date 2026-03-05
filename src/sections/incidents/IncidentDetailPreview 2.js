import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/incidents/data.json';
import { IncidentDetailView } from './IncidentDetailView';
export default function IncidentDetailPreview() {
    // Use the first incident as the preview
    const incident = data.incidents[0];
    const subscriber = data.subscribers.find((s) => s.id === incident.subscriberId);
    const assignedAgent = data.users.find((u) => u.id === incident.assignedAgentId);
    const assignedLawyer = data.lawyers.find((l) => l.id === incident.assignedLawyerId);
    const followUps = data.followUps.filter((f) => f.incidentId === incident.id);
    const timelineActivities = data.timelineActivities.filter((t) => t.incidentId === incident.id);
    const documents = data.documents.filter((d) => d.incidentId === incident.id);
    return (_jsx(IncidentDetailView, { incident: incident, subscriber: subscriber, assignedAgent: assignedAgent || null, assignedLawyer: assignedLawyer || null, followUps: followUps, timelineActivities: timelineActivities, documents: documents, users: data.users, lawyers: data.lawyers, onBack: () => console.log('Navigate back to incidents list'), onAddFollowUp: (incidentId, followUp) => console.log('Add follow-up to incident:', incidentId, followUp), onUploadDocument: (incidentId, file, type) => console.log('Upload document to incident:', incidentId, file.name, type), onViewDocument: (documentId) => console.log('View document:', documentId), onDeleteDocument: (documentId) => console.log('Delete document:', documentId), onAssignAgent: (incidentId, agentId) => console.log('Assign agent to incident:', incidentId, agentId), onAssignLawyer: (incidentId, lawyerId) => console.log('Assign lawyer to incident:', incidentId, lawyerId), onMoveQueue: (incidentId, queue) => console.log('Move incident to queue:', incidentId, queue), onValidate: (incidentId) => console.log('Validate incident:', incidentId), onScreen: (incidentId) => console.log('Screen incident:', incidentId), onUpdate: (incidentId, updates) => console.log('Update incident:', incidentId, updates) }));
}
