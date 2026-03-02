import data from '@/../product/sections/sales-crm/data.json'
import { LeadsDashboard } from './components/LeadsDashboard'

export default function LeadsDashboardPreview() {
  return (
    <LeadsDashboard
      leads={data.leads as any}
      timelineActivities={data.timelineActivities as any}
      documents={data.documents as any}
      users={data.users as any}
      leadSources={data.leadSources}
      serviceTypes={data.serviceTypes}
      serviceSubTypes={data.serviceSubTypes}
      activityTypes={data.activityTypes}
      documentCategories={data.documentCategories}
      onViewLead={id => console.log('View lead:', id)}
      onAddLead={leadData => console.log('Add lead:', leadData)}
      onBulkUpload={file => console.log('Bulk upload:', file.name)}
      onDownloadTemplate={() => console.log('Download template')}
      onEditLead={(id, leadData) => console.log('Edit lead:', id, leadData)}
      onAssignLead={(leadId, userId) => console.log('Assign lead:', leadId, 'to user:', userId)}
      onChangeStatus={(leadId, newStatus) => console.log('Change status:', leadId, 'to:', newStatus)}
      onAddFollowUp={(leadId, followUpData) => console.log('Add follow-up:', leadId, followUpData)}
      onUploadDocument={(leadId, file, category) => console.log('Upload document:', leadId, file.name, category)}
      onViewDocument={documentId => console.log('View document:', documentId)}
      onDeleteDocument={documentId => console.log('Delete document:', documentId)}
    />
  )
}
