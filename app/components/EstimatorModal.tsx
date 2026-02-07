'use client'
import { useEffect } from 'react'

interface EstimatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EstimatorModal({ isOpen, onClose }: EstimatorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4">Get Your Free Estimate</h2>
        <p className="text-gray-500">This is where the estimator tool will go. We&apos;ll build this next.</p>
      </div>
    </div>
  )
}
