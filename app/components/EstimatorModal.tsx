'use client'
import { useEffect, useState } from 'react'
import { leadsApi } from '../lib/api'
import type { LeadCreateDto } from '../lib/types'

interface EstimatorModalProps {
  isOpen: boolean
  onClose: () => void
}

// Lane County Oregon rates (2025-2026)
const PROJECT_RATES: Record<string, { label: string; unit: string; lowRate: number; highRate: number; defaultSize: number; minSize: number; maxSize: number }> = {
  tile: {
    label: 'Tile Installation',
    unit: 'sq ft',
    lowRate: 10,
    highRate: 25,
    defaultSize: 200,
    minSize: 20,
    maxSize: 2000,
  },
  kitchen: {
    label: 'Kitchen Remodeling',
    unit: 'project',
    lowRate: 15000,
    highRate: 45000,
    defaultSize: 1,
    minSize: 1,
    maxSize: 1,
  },
  bathroom: {
    label: 'Bathroom Renovation',
    unit: 'project',
    lowRate: 9000,
    highRate: 25000,
    defaultSize: 1,
    minSize: 1,
    maxSize: 1,
  },
  deck: {
    label: 'Deck Construction',
    unit: 'sq ft',
    lowRate: 19,
    highRate: 45,
    defaultSize: 300,
    minSize: 50,
    maxSize: 1500,
  },
  fence: {
    label: 'Fence Installation',
    unit: 'linear ft',
    lowRate: 18,
    highRate: 50,
    defaultSize: 150,
    minSize: 20,
    maxSize: 1000,
  },
  patio: {
    label: 'Patio Cover',
    unit: 'sq ft',
    lowRate: 50,
    highRate: 150,
    defaultSize: 200,
    minSize: 50,
    maxSize: 800,
  },
}

type Step = 'project' | 'details' | 'estimate' | 'contact' | 'submitted'

export default function EstimatorModal({ isOpen, onClose }: EstimatorModalProps) {
  const [step, setStep] = useState<Step>('project')
  const [projectType, setProjectType] = useState('')
  const [size, setSize] = useState(0)
  const [complexity, setComplexity] = useState<'basic' | 'mid' | 'high'>('mid')
  const [estimateLow, setEstimateLow] = useState(0)
  const [estimateHigh, setEstimateHigh] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  })

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

  const reset = () => {
    setStep('project')
    setProjectType('')
    setSize(0)
    setComplexity('mid')
    setEstimateLow(0)
    setEstimateHigh(0)
    setContactInfo({ fullName: '', email: '', phone: '' })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const selectProject = (type: string) => {
    setProjectType(type)
    const rates = PROJECT_RATES[type]
    setSize(rates.defaultSize)
    setStep('details')
  }

  const calculateEstimate = () => {
    const rates = PROJECT_RATES[projectType]
    if (!rates) return

    const complexityMultiplier = complexity === 'basic' ? 0.8 : complexity === 'high' ? 1.3 : 1.0

    if (rates.unit === 'project') {
      setEstimateLow(Math.round(rates.lowRate * complexityMultiplier))
      setEstimateHigh(Math.round(rates.highRate * complexityMultiplier))
    } else {
      setEstimateLow(Math.round(size * rates.lowRate * complexityMultiplier))
      setEstimateHigh(Math.round(size * rates.highRate * complexityMultiplier))
    }

    setStep('estimate')
  }

  const handleSubmitLead = async () => {
    setIsSubmitting(true)
    try {
      const leadData: LeadCreateDto = {
        fullName: contactInfo.fullName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        preferredContactMethod: 'either',
        projectType: projectType,
        location: '',
        budgetRange: `$${estimateLow.toLocaleString()} - $${estimateHigh.toLocaleString()}`,
        timeline: '',
        projectDescription: `Estimated via online tool: ${PROJECT_RATES[projectType].label}${PROJECT_RATES[projectType].unit !== 'project' ? ` - ${size} ${PROJECT_RATES[projectType].unit}` : ''} (${complexity} tier)`,
        pageSource: '/estimator',
        estimatedCostLow: estimateLow,
        estimatedCostHigh: estimateHigh,
      }
      await leadsApi.create(leadData)
      setStep('submitted')
    } catch {
      alert('Something went wrong. Please try again or call us at (541) 525-4133.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const rates = PROJECT_RATES[projectType]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className="bg-white shadow-xl w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: '640px', margin: '16px' }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center border-b border-gray-200"
          style={{ padding: '28px 40px' }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Free Project Estimate</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            style={{ marginRight: '-8px' }}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 40px 40px 40px' }}>
          {/* Step 1: Pick project type */}
          {step === 'project' && (
            <div>
              <p className="text-gray-600" style={{ marginBottom: '24px' }}>
                What type of project are you planning?
              </p>
              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                {Object.entries(PROJECT_RATES).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => selectProject(key)}
                    className="border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors text-left"
                    style={{ padding: '20px 24px' }}
                  >
                    <span className="font-semibold text-gray-800">{val.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400" style={{ marginTop: '20px' }}>
                Estimates based on Lane County, Oregon rates.
              </p>
            </div>
          )}

          {/* Step 2: Project details */}
          {step === 'details' && rates && (
            <div>
              <h3 className="font-bold text-lg" style={{ marginBottom: '24px' }}>{rates.label}</h3>

              {rates.unit !== 'project' && (
                <div style={{ marginBottom: '32px' }}>
                  <label className="block font-semibold" style={{ marginBottom: '12px' }}>
                    Project Size ({rates.unit})
                  </label>
                  <input
                    type="range"
                    min={rates.minSize}
                    max={rates.maxSize}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500" style={{ marginTop: '8px' }}>
                    <span>{rates.minSize} {rates.unit}</span>
                    <span className="font-bold text-gray-800 text-lg">{size} {rates.unit}</span>
                    <span>{rates.maxSize} {rates.unit}</span>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '32px' }}>
                <label className="block font-semibold" style={{ marginBottom: '12px' }}>Project Tier</label>
                <div className="grid grid-cols-3" style={{ gap: '16px' }}>
                  {(['basic', 'mid', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setComplexity(level)}
                      className={`border-2 text-center transition-colors ${
                        complexity === level
                          ? 'border-orange-500 bg-orange-50 font-bold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ padding: '16px 12px' }}
                    >
                      <div className="font-semibold capitalize">{level === 'mid' ? 'Standard' : level === 'basic' ? 'Basic' : 'Premium'}</div>
                      <div className="text-xs text-gray-500" style={{ marginTop: '4px' }}>
                        {level === 'basic' ? 'Budget-friendly' : level === 'mid' ? 'Most popular' : 'High-end finishes'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex" style={{ gap: '16px' }}>
                <button
                  onClick={() => setStep('project')}
                  className="border border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ padding: '14px 28px' }}
                >
                  Back
                </button>
                <button
                  onClick={calculateEstimate}
                  className="flex-1 btn-primary"
                >
                  Get Estimate
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Show estimate */}
          {step === 'estimate' && rates && (
            <div>
              <h3 className="font-bold text-lg" style={{ marginBottom: '12px' }}>{rates.label} Estimate</h3>
              {rates.unit !== 'project' && (
                <p className="text-gray-500" style={{ marginBottom: '24px' }}>
                  {size} {rates.unit} &middot; {complexity === 'mid' ? 'Standard' : complexity === 'basic' ? 'Basic' : 'Premium'} tier
                </p>
              )}

              <div
                className="bg-green-50 border border-green-200 text-center"
                style={{ padding: '32px 24px', marginBottom: '28px' }}
              >
                <p className="text-gray-600" style={{ marginBottom: '8px' }}>Estimated Cost Range</p>
                <p className="text-3xl font-bold text-green-700">
                  ${estimateLow.toLocaleString()} &ndash; ${estimateHigh.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500" style={{ marginTop: '12px' }}>
                  Based on current Lane County, OR contractor rates
                </p>
              </div>

              <p className="text-gray-600" style={{ marginBottom: '24px' }}>
                Want an exact quote? Leave your info and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="flex" style={{ gap: '16px' }}>
                <button
                  onClick={() => setStep('details')}
                  className="border border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ padding: '14px 28px' }}
                >
                  Adjust
                </button>
                <button
                  onClick={() => setStep('contact')}
                  className="flex-1 btn-primary"
                >
                  Get Exact Quote
                </button>
              </div>

              <div className="text-center" style={{ marginTop: '20px' }}>
                <a href="tel:5415254133" className="text-orange-600 font-semibold hover:underline">
                  Or call us: (541) 525-4133
                </a>
              </div>
            </div>
          )}

          {/* Step 4: Contact info */}
          {step === 'contact' && (
            <div>
              <h3 className="font-bold text-lg" style={{ marginBottom: '20px' }}>Get Your Exact Quote</h3>
              <div
                className="bg-gray-50 text-sm"
                style={{ padding: '16px 20px', marginBottom: '24px' }}
              >
                <span className="font-semibold">{PROJECT_RATES[projectType]?.label}</span> &middot; ${estimateLow.toLocaleString()} &ndash; ${estimateHigh.toLocaleString()}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="block font-semibold" style={{ marginBottom: '8px' }}>Full Name *</label>
                  <input
                    type="text"
                    value={contactInfo.fullName}
                    onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                    required
                    className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    style={{ padding: '12px 16px' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold" style={{ marginBottom: '8px' }}>Email *</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    required
                    className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    style={{ padding: '12px 16px' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold" style={{ marginBottom: '8px' }}>Phone *</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    required
                    className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    style={{ padding: '12px 16px' }}
                  />
                </div>
              </div>

              <div className="flex" style={{ gap: '16px', marginTop: '28px' }}>
                <button
                  onClick={() => setStep('estimate')}
                  className="border border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ padding: '14px 28px' }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitLead}
                  disabled={isSubmitting || !contactInfo.fullName || !contactInfo.email || !contactInfo.phone}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 'submitted' && (
            <div className="text-center" style={{ padding: '32px 0' }}>
              <div className="text-5xl" style={{ marginBottom: '20px' }}>&#10003;</div>
              <h3 className="font-bold text-xl" style={{ marginBottom: '12px' }}>Request Submitted!</h3>
              <p className="text-gray-600" style={{ marginBottom: '28px' }}>
                We&apos;ll review your project details and get back to you within 24 hours with an exact quote.
              </p>
              <button onClick={handleClose} className="btn-primary">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
