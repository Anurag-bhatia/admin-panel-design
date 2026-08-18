import data from '@/../product/sections/knowledge-base/data.json'
import type { KnowledgeBaseEntry } from '@/../product/sections/knowledge-base/types'
import { KnowledgeBaseView } from './components/KnowledgeBaseView'

export default function KnowledgeBasePreview() {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <KnowledgeBaseView
        entries={data.entries as KnowledgeBaseEntry[]}
        onCreate={(entry) => console.log('Create KB entry:', entry)}
        onEdit={(entry) => console.log('Edit KB entry:', entry.id)}
        onDelete={(id) => console.log('Delete KB entry:', id)}
        onDownload={(entry) => console.log('Download KB entry:', entry.id)}
      />
    </div>
  )
}
