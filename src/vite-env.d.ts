/// <reference types="vite/client" />

interface ImportMeta {
  glob(
    pattern: string,
    options?: {
      eager?: boolean
      as?: string
      import?: string
    }
  ): Record<string, any>
}
