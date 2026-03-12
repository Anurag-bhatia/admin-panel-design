import data from '@/../product/sections/settled-challans/data.json'
import { SettledChallansDashboard } from './components/SettledChallansDashboard'

export default function SettledChallansPreview() {
  return (
    <SettledChallansDashboard
      settledChallans={data.settledChallans}
      onSearch={(query) => console.log('Search:', query)}
      onFilter={(filters) => console.log('Filter:', filters)}
      onExport={() => console.log('Export triggered')}
      onPageChange={(page) => console.log('Page:', page)}
    />
  )
}
