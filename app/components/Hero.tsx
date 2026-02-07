'use client'

interface HeroProps {
  onOpenEstimator?: () => void
}

export default function Hero({ onOpenEstimator }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] text-white py-24 text-center" id="home">
      <div className="container">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Eugene&apos;s Trusted Remodeling Contractor
        </h2>
        <p className="text-xl md:text-2xl text-primary font-semibold mb-8">
          Licensed. Bonded. Insured.
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-[800px] mx-auto">
          Transform your home with expert craftsmanship. From kitchens and bathrooms to custom decks and tile work,
          we bring over 15 years of experience to every project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onOpenEstimator}
            className="btn-primary text-lg px-8 py-4 hover:-translate-y-0.5 transition-transform"
          >
            Get Your Free Estimate
          </button>
          <a href="tel:5415254133" className="border-2 border-white text-white px-8 py-4 rounded text-lg font-semibold text-center hover:bg-white hover:text-secondary transition-colors">
            Call (541) 525-4133
          </a>
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Licensed &amp; Insured</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>15+ Years Experience</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Family Owned</span>
          </div>
        </div>
      </div>
    </section>
  )
}
