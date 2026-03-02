import { useState } from 'react'
import data from '@/../product/sections/incidents/data.json'
import { IncidentList } from './components/IncidentList'
import { IncidentDetailView } from './IncidentDetailView'
import { AddChallanModal } from './components/AddChallanModal'
import { AssignAgentModal } from './components/AssignAgentModal'
import { AssignLawyerModal } from './components/AssignLawyerModal'
import { MoveQueueModal } from './components/MoveQueueModal'
import { BulkUpdateModal } from './components/BulkUpdateModal'
import { ValidateResultsView } from './components/ValidateResultsView'
import { ScreenResultsView } from './components/ScreenResultsView'
import type {
  Incident,
  QueueCounts,
  Pagination,
  User,
  Lawyer,
  IncidentSource,
  IncidentQueue,
  Subscriber,
  FollowUp,
  TimelineActivity,
  Document,
  ValidationResult,
  ScreeningResult,
} from '@/../product/sections/incidents/types'

type ViewMode = 'list' | 'detail' | 'validateResults' | 'screenResults'

type ModalType = 'addChallan' | 'assignAgent' | 'assignLawyer' | 'moveQueue' | 'bulkUpdate' | null

export default function IncidentListPreview() {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null)

  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedIncidentIds, setSelectedIncidentIds] = useState<string[]>([])

  // Results state (for demo)
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [screeningResults, setScreeningResults] = useState<ScreeningResult[]>([])

  // Get incident details for detail view
  const selectedIncident = data.incidents.find(i => i.id === selectedIncidentId) as Incident | undefined
  const subscriber = selectedIncident
    ? data.subscribers.find(s => s.id === selectedIncident.subscriberId) as Subscriber
    : null
  const assignedAgent = selectedIncident?.assignedAgentId
    ? data.users.find(u => u.id === selectedIncident.assignedAgentId) as User | null
    : null
  const assignedLawyer = selectedIncident?.assignedLawyerId
    ? data.lawyers.find(l => l.id === selectedIncident.assignedLawyerId) as Lawyer | null
    : null
  const followUps = (data.followUps as FollowUp[]).filter(f => f.incidentId === selectedIncidentId)
  const timelineActivities = (data.timelineActivities as TimelineActivity[]).filter(t => t.incidentId === selectedIncidentId)
  const documents = (data.documents as Document[]).filter(d => d.incidentId === selectedIncidentId)

  // Handlers
  const handleViewIncident = (incidentId: string) => {
    setSelectedIncidentId(incidentId)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedIncidentId(null)
  }

  const handleAddChallan = () => {
    setActiveModal('addChallan')
  }

  const handleValidate = (incidentIds: string[]) => {
    setSelectedIncidentIds(incidentIds)
    // Use sample screening results from data.json for validation display
    setScreeningResults(data.screeningResults as ScreeningResult[])
    setViewMode('validateResults')
  }

  const handleScreen = (incidentIds: string[]) => {
    setSelectedIncidentIds(incidentIds)
    // Use sample screening results from data.json
    setScreeningResults(data.screeningResults as ScreeningResult[])
    setViewMode('screenResults')
  }

  const handleAssignAgent = (incidentIds: string[], agentId?: string) => {
    if (agentId) {
      console.log('Assigning agent:', agentId, 'to incidents:', incidentIds)
      setActiveModal(null)
    } else {
      setSelectedIncidentIds(incidentIds)
      setActiveModal('assignAgent')
    }
  }

  const handleAssignLawyer = (incidentIds: string[], lawyerId?: string) => {
    if (lawyerId) {
      console.log('Assigning lawyer:', lawyerId, 'to incidents:', incidentIds)
      setActiveModal(null)
    } else {
      setSelectedIncidentIds(incidentIds)
      setActiveModal('assignLawyer')
    }
  }

  const handleMoveQueue = (incidentIds: string[], queue?: IncidentQueue) => {
    if (queue) {
      console.log('Moving incidents:', incidentIds, 'to queue:', queue)
      setActiveModal(null)
    } else {
      setSelectedIncidentIds(incidentIds)
      setActiveModal('moveQueue')
    }
  }

  const handleBulkUpdate = (incidentIds: string[], file?: File) => {
    if (file) {
      console.log('Bulk updating incidents:', incidentIds, 'with file:', file.name)
      setActiveModal(null)
    } else {
      setSelectedIncidentIds(incidentIds)
      setActiveModal('bulkUpdate')
    }
  }

  // Render validation results view
  if (viewMode === 'validateResults') {
    return (
      <ValidateResultsView
        results={screeningResults}
        onClose={handleBack}
        onConfirm={(selectedChallans) => {
          console.log('Confirming validation for challans:', selectedChallans)
          handleBack()
        }}
      />
    )
  }

  // Render screening results view
  if (viewMode === 'screenResults') {
    return (
      <ScreenResultsView
        results={screeningResults}
        onClose={handleBack}
        onConfirm={(selectedChallans) => {
          console.log('Confirming screening for challans:', selectedChallans)
          handleBack()
        }}
      />
    )
  }

  // Render detail view
  if (viewMode === 'detail' && selectedIncident && subscriber) {
    return (
      <IncidentDetailView
        incident={selectedIncident}
        subscriber={subscriber}
        assignedAgent={assignedAgent}
        assignedLawyer={assignedLawyer}
        followUps={followUps}
        timelineActivities={timelineActivities}
        documents={documents}
        users={data.users as User[]}
        lawyers={data.lawyers as Lawyer[]}
        onBack={handleBack}
        onAddFollowUp={(incidentId, followUp) => {
          console.log('Add follow-up:', incidentId, followUp)
        }}
        onUploadDocument={(incidentId, file, type) => {
          console.log('Upload document:', incidentId, file.name, type)
        }}
        onViewDocument={(documentId) => console.log('View document:', documentId)}
        onDeleteDocument={(documentId) => console.log('Delete document:', documentId)}
        onAssignAgent={(incidentId, agentId) => {
          console.log('Assign agent:', agentId, 'to incident:', incidentId)
        }}
        onAssignLawyer={(incidentId, lawyerId) => {
          console.log('Assign lawyer:', lawyerId, 'to incident:', incidentId)
        }}
        onMoveQueue={(incidentId, queue) => {
          console.log('Move incident:', incidentId, 'to queue:', queue)
        }}
        onValidate={(incidentId) => handleValidate([incidentId])}
        onScreen={(incidentId) => handleScreen([incidentId])}
        onUpdate={(incidentId, updates) => {
          console.log('Update incident:', incidentId, updates)
        }}
      />
    )
  }

  // Render list view with modals
  return (
    <>
      <div className="h-[calc(100vh-64px)]">
        <IncidentList
          incidents={data.incidents as Incident[]}
          queueCounts={data.queueCounts as QueueCounts}
          activeQueue="newIncidents"
          pagination={data.pagination as Pagination}
          users={data.users as User[]}
          lawyers={data.lawyers as Lawyer[]}
          sources={data.sources as IncidentSource[]}
          offenceTypes={data.offenceTypes}
          onViewIncident={handleViewIncident}
          onAddChallan={handleAddChallan}
          onValidate={handleValidate}
          onScreen={handleScreen}
          onAssignAgent={(ids, agentId) => handleAssignAgent(ids, agentId)}
          onAssignLawyer={(ids, lawyerId) => handleAssignLawyer(ids, lawyerId)}
          onMoveQueue={(ids, queue) => handleMoveQueue(ids, queue)}
          onBulkUpdate={(ids, file) => handleBulkUpdate(ids, file)}
          onExport={(ids) => console.log('Export incidents:', ids)}
          onSearch={(query) => console.log('Search:', query)}
          onFilter={(filters) => console.log('Filter:', filters)}
          onQueueChange={(queue) => console.log('Queue changed:', queue)}
          onPageChange={(page) => console.log('Page changed:', page)}
        />
      </div>

      {/* Add Incident Modal */}
      {activeModal === 'addChallan' && (
        <AddChallanModal
          subscribers={data.subscribers as Subscriber[]}
          sources={data.sources as IncidentSource[]}
          onSubmit={(challan) => {
            console.log('Add challan:', challan)
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}

      {/* Assign Agent Modal */}
      {activeModal === 'assignAgent' && (
        <AssignAgentModal
          selectedCount={selectedIncidentIds.length}
          users={data.users as User[]}
          onAssign={(agentId) => handleAssignAgent(selectedIncidentIds, agentId)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Assign Lawyer Modal */}
      {activeModal === 'assignLawyer' && (
        <AssignLawyerModal
          selectedCount={selectedIncidentIds.length}
          lawyers={data.lawyers as Lawyer[]}
          onAssign={(lawyerId) => handleAssignLawyer(selectedIncidentIds, lawyerId)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Move Queue Modal */}
      {activeModal === 'moveQueue' && (
        <MoveQueueModal
          selectedCount={selectedIncidentIds.length}
          onMove={(queue) => handleMoveQueue(selectedIncidentIds, queue)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Bulk Update Modal */}
      {activeModal === 'bulkUpdate' && (
        <BulkUpdateModal
          selectedCount={selectedIncidentIds.length}
          onUpload={(file) => handleBulkUpdate(selectedIncidentIds, file)}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}
