import { useRef, useState, useCallback } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Unlink,
  Undo,
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Palette,
  Highlighter,
  RemoveFormatting,
} from 'lucide-react'

interface RichTextEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
}

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1',
]

const HIGHLIGHT_COLORS = [
  '#fef08a', '#bbf7d0', '#bfdbfe', '#e9d5ff', '#fecdd3',
  '#fed7aa', '#ccfbf1', '#ddd6fe', '#fce7f3', '#cffafe',
]

type DropdownType = 'textColor' | 'highlightColor' | 'heading' | null

export function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null)

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val)
    editorRef.current?.focus()
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handleInput = useCallback(() => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const toggleDropdown = (type: DropdownType) => {
    setActiveDropdown(activeDropdown === type ? null : type)
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      exec('createLink', url)
    }
  }

  const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  )

  const Divider = () => (
    <div className="w-px h-5 bg-slate-200 dark:bg-slate-600 mx-0.5" />
  )

  return (
    <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-slate-50 dark:bg-slate-750 border-b border-slate-200 dark:border-slate-600">
        {/* Undo / Redo */}
        <ToolbarButton onClick={() => exec('undo')} title="Undo">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('redo')} title="Redo">
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Heading dropdown */}
        <div className="relative">
          <ToolbarButton
            onClick={() => toggleDropdown('heading')}
            active={activeDropdown === 'heading'}
            title="Heading"
          >
            <Type className="w-4 h-4" />
          </ToolbarButton>
          {activeDropdown === 'heading' && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-20 py-1 min-w-[140px]">
              <button
                type="button"
                onClick={() => { exec('formatBlock', '<p>'); setActiveDropdown(null) }}
                className="w-full px-3 py-1.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Type className="w-3.5 h-3.5" /> Normal
              </button>
              <button
                type="button"
                onClick={() => { exec('formatBlock', '<h1>'); setActiveDropdown(null) }}
                className="w-full px-3 py-1.5 text-left text-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Heading1 className="w-3.5 h-3.5" /> Heading 1
              </button>
              <button
                type="button"
                onClick={() => { exec('formatBlock', '<h2>'); setActiveDropdown(null) }}
                className="w-full px-3 py-1.5 text-left text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Heading2 className="w-3.5 h-3.5" /> Heading 2
              </button>
              <button
                type="button"
                onClick={() => { exec('formatBlock', '<h3>'); setActiveDropdown(null) }}
                className="w-full px-3 py-1.5 text-left text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Heading3 className="w-3.5 h-3.5" /> Heading 3
              </button>
            </div>
          )}
        </div>

        <Divider />

        {/* Text formatting */}
        <ToolbarButton onClick={() => exec('bold')} title="Bold">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('italic')} title="Italic">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('underline')} title="Underline">
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('strikeThrough')} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Text color */}
        <div className="relative">
          <ToolbarButton
            onClick={() => toggleDropdown('textColor')}
            active={activeDropdown === 'textColor'}
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </ToolbarButton>
          {activeDropdown === 'textColor' && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-20 p-2">
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">Text Color</p>
              <div className="grid grid-cols-5 gap-1">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => { exec('foreColor', color); setActiveDropdown(null) }}
                    className="w-6 h-6 rounded border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Highlight color */}
        <div className="relative">
          <ToolbarButton
            onClick={() => toggleDropdown('highlightColor')}
            active={activeDropdown === 'highlightColor'}
            title="Highlight Color"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
          {activeDropdown === 'highlightColor' && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-20 p-2">
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">Highlight</p>
              <div className="grid grid-cols-5 gap-1">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => { exec('hiliteColor', color); setActiveDropdown(null) }}
                    className="w-6 h-6 rounded border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* Alignment */}
        <ToolbarButton onClick={() => exec('justifyLeft')} title="Align Left">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyCenter')} title="Align Center">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyRight')} title="Align Right">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet List">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered List">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Block elements */}
        <ToolbarButton onClick={() => exec('formatBlock', '<blockquote>')} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', '<pre>')} title="Code Block">
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('insertHorizontalRule')} title="Horizontal Rule">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('unlink')} title="Remove Link">
          <Unlink className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Clear formatting */}
        <ToolbarButton onClick={() => exec('removeFormat')} title="Clear Formatting">
          <RemoveFormatting className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onClick={() => setActiveDropdown(null)}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={value ? { __html: value } : undefined}
        className="min-h-[500px] max-h-[700px] overflow-y-auto px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-slate-400 [&:empty]:before:dark:text-slate-500 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_blockquote]:my-2 [&_pre]:bg-slate-100 [&_pre]:dark:bg-slate-700 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_a]:text-cyan-600 [&_a]:underline [&_hr]:my-3 [&_hr]:border-slate-200 [&_hr]:dark:border-slate-600 [&_p]:mb-1"
      />
    </div>
  )
}
