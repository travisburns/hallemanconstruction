'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import EstimatorModal from './EstimatorModal'

export default function HomeContent() {
  const [estimatorOpen, setEstimatorOpen] = useState(false)

  return (
    <>
      <Header onOpenEstimator={() => setEstimatorOpen(true)} />
      <main>
        <Hero onOpenEstimator={() => setEstimatorOpen(true)} />

        {/* Services */}
        <section className="py-32 bg-gray-50" id="services">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Our Services</h2>
              <p className="text-xl text-gray-500">Expert residential remodeling for homes throughout Lane County</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="service-card">
                <div className="service-icon">🔧</div>
                <h3>Tile Design &amp; Installation</h3>
                <p>Beautiful bathroom floors and walk-in showers. Tile is our specialty and favorite way to transform your space.</p>
                <Link href="/services/tile-installation-eugene" className="service-link">Learn More →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon">🏠</div>
                <h3>Kitchen Remodeling</h3>
                <p>Complete kitchen transformations from cabinets to countertops. Create the heart of your home.</p>
                <Link href="/services/kitchen-remodeling-eugene" className="service-link">Learn More →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon">🚿</div>
                <h3>Bathroom Renovation</h3>
                <p>Modern bathroom updates that add value and comfort to your Eugene home.</p>
                <Link href="/services/bathroom-renovation-eugene" className="service-link">Learn More →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon">🌲</div>
                <h3>Decks &amp; Fencing</h3>
                <p>Custom-built outdoor spaces perfect for Oregon living. Durable, stylish, and built to last.</p>
                <Link href="/services/deck-builder-eugene" className="service-link">Learn More →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon">☂️</div>
                <h3>Patio Covers</h3>
                <p>Extend your outdoor season with quality patio covers designed for Lane County weather.</p>
                <Link href="/services/patio-cover-eugene" className="service-link">Learn More →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon">🛠️</div>
                <h3>General Remodeling</h3>
                <p>Complete home renovations and additions. Whatever your project, we&apos;ve got you covered.</p>
                <Link href="/services" className="service-link">Learn More →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32" id="about">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-12">Why Choose Halleman Construction?</h2>
                <div className="feature">
                  <h3>ServiceMaster Professional Background</h3>
                  <p>Josh Halleman brings professional training and expertise from ServiceMaster, ensuring top-quality workmanship on every project.</p>
                </div>
                <div className="feature">
                  <h3>Local Eugene Family Business</h3>
                  <p>We&apos;re a family of four living right here in Eugene. We understand Lane County homes and building requirements.</p>
                </div>
                <div className="feature">
                  <h3>Licensed, Bonded &amp; Insured</h3>
                  <p>Full Oregon licensing and insurance protection for your peace of mind.</p>
                </div>
                <div className="feature">
                  <h3>15+ Years of Experience</h3>
                  <p>From small updates to complete remodels, we&apos;ve transformed hundreds of homes across Lane County.</p>
                </div>
              </div>
              <div>
                <div className="image-placeholder">
                  [Family Photo / Josh on Jobsite]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-32 bg-gray-50" id="gallery">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Our Work</h2>
              <p className="text-xl text-gray-500">See the quality and craftsmanship we bring to every project</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { title: 'Kitchen Remodel', location: 'Eugene, OR' },
                { title: 'Bathroom Renovation', location: 'Cottage Grove, OR' },
                { title: 'Custom Deck', location: 'Veneta, OR' },
                { title: 'Tile Installation', location: 'Coburg, OR' },
              ].map((item, i) => (
                <div key={i} className="gallery-item">
                  <div className="gallery-image-placeholder">
                    [Project Photo {i + 1}]
                  </div>
                  <div className="gallery-info">
                    <h4>{item.title}</h4>
                    <p>{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/gallery" className="btn-secondary" style={{ color: '#2c3e50', borderColor: '#2c3e50' }}>
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Serving Lane County</h2>
              <p className="text-xl text-gray-500">Professional remodeling services throughout the Eugene area</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Eugene', desc: 'Complete home remodeling services in Eugene and surrounding neighborhoods' },
                { name: 'Cottage Grove', desc: 'Kitchen, bathroom, and deck services for Cottage Grove residents' },
                { name: 'Veneta', desc: 'Trusted contractor for Veneta homeowners' },
                { name: 'Coburg', desc: 'Quality remodeling in Coburg and the surrounding area' },
              ].map((area, i) => (
                <div key={i} className="area-card">
                  <h3>{area.name}</h3>
                  <p>{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-gradient-to-br from-primary to-primary-dark text-white text-center" id="contact">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-12 max-w-[700px] mx-auto">
              Get a free, no-obligation estimate today. We&apos;ll discuss your vision and provide a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setEstimatorOpen(true)} className="btn-primary text-lg px-8 py-4">
                Get Free Estimate
              </button>
              <a href="tel:5415254133" className="bg-white text-primary px-8 py-4 rounded text-xl font-bold hover:bg-gray-100 text-center">
                (541) 525-4133
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EstimatorModal isOpen={estimatorOpen} onClose={() => setEstimatorOpen(false)} />
    </>
  )
}
