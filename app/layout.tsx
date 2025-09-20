// app/admin/layout.tsx
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  )
}
