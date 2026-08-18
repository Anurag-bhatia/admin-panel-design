// =============================================================================
// Knowledge Base — Types
// =============================================================================

export type KnowledgeBaseCategory =
  | 'template'
  | 'faq'
  | 'guide'
  | 'checklist'
  | 'regulation'
  | 'judgement'
  | 'circular'

export type KnowledgeBaseStatus = 'published' | 'draft'

export interface KnowledgeBaseTemplate {
  fileName: string
  fileFormat: 'PDF' | 'DOCX' | 'XLSX'
  fileSize: string
  previewNote: string
}

export interface KnowledgeBaseFaqItem {
  question: string
  answer: string
}

export interface KnowledgeBaseGuideStep {
  title: string
  body: string
}

export interface KnowledgeBaseRegulation {
  citation: string
  jurisdiction: string
  bodyText: string
}

export interface KnowledgeBaseJudgement {
  caseTitle: string
  court: string
  decidedOn: string
  citation: string
  holding: string
  summary: string
}

export interface KnowledgeBaseCircular {
  issuedBy: string
  issuedOn: string
  circularNumber: string
  subject: string
  body: string
}

export type KnowledgeBaseContent =
  | { kind: 'template'; template: KnowledgeBaseTemplate }
  | { kind: 'faq'; items: KnowledgeBaseFaqItem[] }
  | { kind: 'guide'; steps: KnowledgeBaseGuideStep[] }
  | { kind: 'checklist'; items: string[] }
  | { kind: 'regulation'; regulation: KnowledgeBaseRegulation }
  | { kind: 'judgement'; judgement: KnowledgeBaseJudgement }
  | { kind: 'circular'; circular: KnowledgeBaseCircular }

export interface KnowledgeBaseEntry {
  id: string
  category: KnowledgeBaseCategory
  title: string
  description: string
  tags: string[]
  publishedOn: string
  updatedOn: string
  authorName: string
  status: KnowledgeBaseStatus
  content: KnowledgeBaseContent
}
