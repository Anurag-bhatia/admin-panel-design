import data from '@/../product/sections/incidents/data.json'
import { IncidentDetailView } from './IncidentDetailView'
import type {
  Incident,
  Subscriber,
  User,
  Lawyer,
  FollowUp,
  TimelineActivity,
  Document,
} from '@/../product/sections/incidents/types'

export default function IncidentDetailPreview() {
  // Use the first incident as the preview
  const incident = data.incidents[0] as Incident
  const subscriber = data.subscribers.find(
    (s: any) => s.id === incident.subscriberId
  ) as Subscriber
  const assignedAgent = data.users.find(
    (u: any) => u.id === incident.assignedAgentId
  ) as User | null
  const assignedLawyer = data.lawyers.find(
    (l: any) => l.id === incident.assignedLawyerId
  ) as Lawyer | null

  const followUps = (data.followUps as FollowUp[]).filter(
    (f: FollowUp) => f.incidentId === incident.id
  )
  const timelineActivities = (data.timelineActivities as TimelineActivity[]).filter(
    (t: TimelineActivity) => t.incidentId === incident.id
  )
  const documents = (data.documents as Document[]).filter(
    (d: Document) => d.incidentId === incident.id
  )

  return (
    <IncidentDetailView
      incident={incident}
      subscriber={subscriber}
      assignedAgent={assignedAgent || null}
      assignedLawyer={assignedLawyer || null}
      followUps={followUps}
      timelineActivities={timelineActivities}
      documents={documents}
      users={data.users as User[]}
      lawyers={data.lawyers as Lawyer[]}
      onBack={() => console.log('Navigate back to incidents list')}
      onAddFollowUp={(incidentId, followUp) =>
        console.log('Add follow-up to incident:', incidentId, followUp)
      }
      onUploadDocument={(incidentId, file, type) =>
        console.log('Upload document to incident:', incidentId, file.name, type)
      }
      onViewDocument={(documentId) => console.log('View document:', documentId)}
      onDeleteDocument={(documentId) => console.log('Delete document:', documentId)}
      onAssignAgent={(incidentId, agentId) =>
        console.log('Assign agent to incident:', incidentId, agentId)
      }
      onAssignLawyer={(incidentId, lawyerId) =>
        console.log('Assign lawyer to incident:', incidentId, lawyerId)
      }
      onMoveQueue={(incidentId, queue) =>
        console.log('Move incident to queue:', incidentId, queue)
      }
      onValidate={(incidentId) => console.log('Validate incident:', incidentId)}
      onScreen={(incidentId) => console.log('Screen incident:', incidentId)}
      onUpdate={(incidentId, updates) =>
        console.log('Update incident:', incidentId, updates)
      }
    />
  )
}
