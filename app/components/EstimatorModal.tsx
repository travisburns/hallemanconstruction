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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Free Project Estimate</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
        </div>

        <div className="p-6">
          {/* Step 1: Pick project type */}
          {step === 'project' && (
            <div>
              <p className="text-gray-600 mb-6">What type of project are you planning?</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PROJECT_RATES).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => selectProject(key)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-secondary">{val.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">Estimates based on Lane County, Oregon rates.</p>
            </div>
          )}

          {/* Step 2: Project details */}
          {step === 'details' && rates && (
            <div>
              <h3 className="font-bold text-lg mb-4">{rates.label}</h3>

              {rates.unit !== 'project' && (
                <div className="mb-6">
                  <label className="block font-semibold mb-2">
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
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{rates.minSize} {rates.unit}</span>
                    <span className="font-bold text-secondary text-lg">{size} {rates.unit}</span>
                    <span>{rates.maxSize} {rates.unit}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block font-semibold mb-2">Project Tier</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['basic', 'mid', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setComplexity(level)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        complexity === level
                          ? 'border-primary bg-orange-50 text-primary font-bold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{level === 'mid' ? 'Standard' : level === 'basic' ? 'Basic' : 'Premium'}</div>
                      <div className="text-xs text-gray-500">
                        {level === 'basic' ? 'Budget-friendly' : level === 'mid' ? 'Most popular' : 'High-end finishes'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('project')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              <h3 className="font-bold text-lg mb-2">{rates.label} Estimate</h3>
              {rates.unit !== 'project' && (
                <p className="text-gray-500 mb-4">{size} {rates.unit} &middot; {complexity === 'mid' ? 'Standard' : complexity === 'basic' ? 'Basic' : 'Premium'} tier</p>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                <p className="text-gray-600 mb-1">Estimated Cost Range</p>
                <p className="text-3xl font-bold text-green-700">
                  ${estimateLow.toLocaleString()} &ndash; ${estimateHigh.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">Based on current Lane County, OR contractor rates</p>
              </div>

              <p className="text-gray-600 mb-4">
                Want an exact quote? Leave your info and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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

              <div className="mt-4 text-center">
                <a href="tel:5415254133" className="text-primary font-semibold hover:underline">
                  Or call us: (541) 525-4133
                </a>
              </div>
            </div>
          )}

          {/* Step 4: Contact info */}
          {step === 'contact' && (
            <div>
              <h3 className="font-bold text-lg mb-4">Get Your Exact Quote</h3>
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                <span className="font-semibold">{PROJECT_RATES[projectType]?.label}</span> &middot; ${estimateLow.toLocaleString()} &ndash; ${estimateHigh.toLocaleString()}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={contactInfo.fullName}
                    onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('estimate')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
            <div className="text-center py-6">
              <div className="text-5xl mb-4">&#10003;</div>
              <h3 className="font-bold text-xl mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-6">
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
