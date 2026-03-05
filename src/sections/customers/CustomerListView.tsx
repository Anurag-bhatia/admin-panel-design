import data from '@/../product/sections/customers/data.json'
import type { Customer } from '@/../product/sections/customers/types'
import { CustomerList } from './components/CustomerList'

export default function CustomerListView() {
  return (
    <CustomerList
      customers={data.customers as Customer[]}
      onSearch={(query) => console.log('Search visitors:', query)}
    />
  )
}
