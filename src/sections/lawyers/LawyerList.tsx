import data from '@/../product/sections/lawyers/data.json'
import { Lawyers } from './components/Lawyers'

export default function LawyersPreview() {
  return <Lawyers lawyers={data.lawyers as any} />
}
