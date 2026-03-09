import data from '@/../product/sections/setup/data.json'
import type {
  Service,
  PriceCategory,
  Department,
  Designation,
  Master,
  MasterValue,
  GeographicValue,
  AuditEntry,
} from '@/../product/sections/setup/types'
import { SetupDashboard } from './components/SetupDashboard'

export default function SetupDashboardPreview() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <SetupDashboard
        activeTab="services"
        services={data.services as Service[]}
        priceCategories={data.priceCategories as PriceCategory[]}
        departments={data.departments as Department[]}
        designations={data.designations as Designation[]}
        masters={data.masters as Master[]}
        masterValues={data.masterValues as Record<string, MasterValue[]>}
        geographicValues={data.geographicValues as GeographicValue[]}
        auditEntries={data.auditEntries as AuditEntry[]}
        onTabChange={(tab) => console.log('Tab changed:', tab)}
        onAddService={() => console.log('Add service')}
        onEditService={(id) => console.log('Edit service:', id)}
        onToggleService={(id, status) => console.log('Toggle service:', id, status)}
        onDeleteService={(id) => console.log('Delete service:', id)}
        onAddPriceCategory={() => console.log('Add price category')}
        onEditPriceCategory={(id) => console.log('Edit price category:', id)}
        onTogglePriceCategory={(id, status) => console.log('Toggle price category:', id, status)}
        onDeletePriceCategory={(id) => console.log('Delete price category:', id)}
        onAddDepartment={() => console.log('Add department')}
        onEditDepartment={(id) => console.log('Edit department:', id)}
        onToggleDepartment={(id, status) => console.log('Toggle department:', id, status)}
        onDeleteDepartment={(id) => console.log('Delete department:', id)}
        onAddDesignation={() => console.log('Add designation')}
        onEditDesignation={(id) => console.log('Edit designation:', id)}
        onToggleDesignation={(id, status) => console.log('Toggle designation:', id, status)}
        onDeleteDesignation={(id) => console.log('Delete designation:', id)}
        onAddMaster={() => console.log('Add master')}
        onEditMaster={(id) => console.log('Edit master:', id)}
        onToggleMaster={(id, status) => console.log('Toggle master:', id, status)}
        onDeleteMaster={(id) => console.log('Delete master:', id)}
        onAddMasterValue={(masterId) => console.log('Add master value:', masterId)}
        onToggleMasterValue={(masterId, valueId, status) =>
          console.log('Toggle master value:', masterId, valueId, status)
        }
        onAddGeographic={() => console.log('Add geographic')}
        onEditGeographic={(id) => console.log('Edit geographic:', id)}
        onToggleGeographic={(id, status) => console.log('Toggle geographic:', id, status)}
        onDeleteGeographic={(id) => console.log('Delete geographic:', id)}
      />
    </div>
  )
}
