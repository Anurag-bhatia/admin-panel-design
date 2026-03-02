import data from '@/../product/sections/incidents/data.json'
import { ScreenResultsView } from './components/ScreenResultsView'
import type { ScreeningResult } from '@/../product/sections/incidents/types'

export default function ScreenResultsPreview() {
  return (
    <ScreenResultsView
      results={data.screeningResults as ScreeningResult[]}
      onClose={() => console.log('Close clicked')}
      onConfirm={(selectedChallans) => {
        console.log('Confirmed with challans:', selectedChallans)
      }}
    />
  )
}
