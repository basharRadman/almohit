'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {/* Dialog content */}
      <div className="relative z-50 mx-2 max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card shadow-2xl sm:mx-4">
        {/* Close button — always visible above content */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
        {/* Scrollable body */}
        <div className="px-4 pb-5 pt-0 sm:px-6 sm:pb-7">
          {children}
        </div>
      </div>
    </div>
  )
}
