import { useState } from 'react'
import data from '@/../product/sections/proposals/data.json'
import type { Proposal, ProposalItem } from '@/../product/sections/proposals/types'
import { ProposalList } from './components/ProposalList'
import { ProposalDetailView } from './components/ProposalDetailView'

export default function ProposalListPreview() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const proposals = data.proposals as unknown as Proposal[]
  const selectedProposal = proposals.find((p) => p.id === selectedId)
  const selectedItems = selectedId
    ? ((data.proposalItems as Record<string, ProposalItem[]>)[selectedId] ?? [])
    : []

  const handleView = (id: string) => {
    setSelectedId(id)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedId(null)
  }

  if (viewMode === 'detail' && selectedProposal) {
    return (
      <ProposalDetailView
        proposal={selectedProposal}
        items={selectedItems as any}
        activities={data.activities as any}
        comments={data.comments as any}
        teamMembers={data.teamMembers as any}
        onBack={handleBack}
        onPickUp={(id) => console.log('Pick up:', id)}
        onAssign={(id, tmId) => console.log('Assign:', id, 'to', tmId)}
        onReassign={(id, tmId) => console.log('Reassign:', id, 'to', tmId)}
        onSendQuote={(id, amount, breakdown, note) =>
          console.log('Send quote:', id, amount, breakdown, note)
        }
        onReviseQuote={(id, amount, breakdown, note) =>
          console.log('Revise quote:', id, amount, breakdown, note)
        }
        onWithdraw={(id) => console.log('Withdraw:', id)}
        onReject={(id, reason, note) => console.log('Reject:', id, reason, note)}
        onReopen={(id) => console.log('Reopen:', id)}
        onConvertToIncident={(id, incidentId, status, agentId, notes) =>
          console.log('Convert:', id, incidentId, status, agentId, notes)
        }
        onUpdateServiceStatus={(id, status) =>
          console.log('Update service status:', id, status)
        }
        onViewIncident={(incidentId) => console.log('View incident:', incidentId)}
        onSendComment={(proposalId, message) =>
          console.log('Send comment:', proposalId, message)
        }
      />
    )
  }

  return (
    <ProposalList
      proposals={proposals}
      proposalItems={data.proposalItems as any}
      activities={data.activities as any}
      comments={data.comments as any}
      teamMembers={data.teamMembers as any}
      dashboardStats={data.dashboardStats as any}
      onPickUp={(id) => console.log('Pick up:', id)}
      onAssign={(id, tmId) => console.log('Assign:', id, 'to', tmId)}
      onReassign={(id, tmId) => console.log('Reassign:', id, 'to', tmId)}
      onSendQuote={(id, amount, breakdown, note) =>
        console.log('Send quote:', id, amount, breakdown, note)
      }
      onReviseQuote={(id, amount, breakdown, note) =>
        console.log('Revise quote:', id, amount, breakdown, note)
      }
      onWithdraw={(id) => console.log('Withdraw:', id)}
      onReject={(id, reason, note) => console.log('Reject:', id, reason, note)}
      onReopen={(id) => console.log('Reopen:', id)}
      onConvertToIncident={(id, incidentId, status, agentId, notes) =>
        console.log('Convert:', id, incidentId, status, agentId, notes)
      }
      onUpdateServiceStatus={(id, status) =>
        console.log('Update service status:', id, status)
      }
      onView={handleView}
      onViewIncident={(incidentId) => console.log('View incident:', incidentId)}
      onSendComment={(proposalId, message) =>
        console.log('Send comment:', proposalId, message)
      }
      onBulkAssign={(ids, tmId) => console.log('Bulk assign:', ids, tmId)}
      onBulkUpdateStatus={(ids, status) =>
        console.log('Bulk update status:', ids, status)
      }
    />
  )
}
