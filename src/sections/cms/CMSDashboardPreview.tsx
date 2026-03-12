import data from '@/../product/sections/cms/data.json'
import { CMSDashboard } from './components/CMSDashboard'

export default function CMSDashboardPreview() {
  return <CMSDashboard blogs={data.blogs as any} eventsNews={data.eventsNews as any} />
}
