import data from '@/../product/sections/customers/data.json'
import type { Customer } from '@/../product/sections/customers/types'
import { CustomerList } from './components/CustomerList'

export default function CustomerListView() {
  return (
    <CustomerList
      customers={data.customers as Customer[]}
      onSearch={(query) => console.log('Search visitors:', query)}
      onAddCustomer={() => console.log('Add new visitor')}
      onBulkUpload={() => console.log('Bulk upload visitors')}
      onExport={(ids) => console.log('Export visitors:', ids)}
      onBulkStatusUpdate={(ids, status) => console.log('Update status:', ids, status)}
      onBulkTag={(ids, tags) => console.log('Tag visitors:', ids, tags)}
    />
  )
}
