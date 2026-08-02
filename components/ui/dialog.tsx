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
      <div className="relative z-50 mx-4 max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card shadow-2xl sm:mx-0">
        {/* Close button — always visible above content */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
        {/* Scrollable body — no extra padding on top so the hero image fills edge-to-edge */}
        <div className="px-5 pb-6 pt-0 sm:px-7 sm:pb-7">
          {children}
        </div>
      </div>
    </div>
  )
}
