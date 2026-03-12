import { useState } from 'react'
import data from '@/../product/sections/partners/data.json'
import subscriberData from '@/../product/sections/subscribers/data.json'
import { PartnerDetail } from './components/PartnerDetail'
import { AddSubscriberModal } from '../subscribers/components/AddSubscriberModal'

export default function PartnerDetailPreview() {
  const partner = data.partners[0]
  const [showAddSubscriberModal, setShowAddSubscriberModal] = useState(false)

  return (
    <>
      <PartnerDetail
        partner={partner as any}
        onBack={() => console.log('Go back to partner list')}
        onEditPartner={(id) => console.log('Edit partner:', id)}
        onViewIncidents={(subscriberId) => console.log('View incidents for subscriber:', subscriberId)}
        onUploadDocument={(id, file) => console.log('Upload document for partner:', id, file)}
        onDeleteDocument={(id, documentId) => console.log('Delete document:', documentId)}
        onAddSubscriber={() => setShowAddSubscriberModal(true)}
        onBulkImportSubscribers={() => console.log('Bulk import subscribers')}
        onAddFollowUp={(partnerId, followUp) => console.log('Add follow-up for partner:', partnerId, followUp)}
      />
      {showAddSubscriberModal && (
        <AddSubscriberModal
          users={subscriberData.users as any}
          partners={subscriberData.partners}
          subscriberSources={subscriberData.subscriberSources}
          subscriberTypes={subscriberData.subscriberTypes}
          subscriberSubTypes={subscriberData.subscriberSubTypes}
          onSubmit={(data) => {
            console.log('Add subscriber from partner:', partner.id, data)
            setShowAddSubscriberModal(false)
          }}
          onClose={() => setShowAddSubscriberModal(false)}
        />
      )}
    </>
  )
}
