import data from '@/../product/sections/lawyers/data.json'
import type { Lawyer } from '@/../product/sections/lawyers/types'
import { Lawyers } from './components/Lawyers'

type ExpertsGroup = 'business' | 'individuals'

interface LawyersPreviewProps {
  subRoute?: string
}

export default function LawyersPreview({ subRoute }: LawyersPreviewProps) {
  const activeGroup: ExpertsGroup =
    subRoute === 'individuals' ? 'individuals' : 'business'
  const label = activeGroup === 'business' ? 'Business' : 'Individuals'

  const allLawyers = data.lawyers as Lawyer[]
  const scopedLawyers =
    activeGroup === 'business'
      ? allLawyers.filter((l) => l.company !== null)
      : allLawyers.filter((l) => l.company === null)

  return <Lawyers key={activeGroup} lawyers={scopedLawyers} heading={label} />
}
