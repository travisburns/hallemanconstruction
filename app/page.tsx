import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Services */}
        <section className="py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Our Services</h2>
              <p className="text-xl text-gray-500">Expert residential remodeling for homes throughout Lane County</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-4">Tile Design &amp; Installation</h3>
                <p className="text-gray-500 mb-4">Beautiful bathroom floors and walk-in showers. Tile is our specialty and favorite way to transform your space.</p>
                <Link href="/services/tile-installation-eugene" className="text-primary font-semibold">Learn More →</Link>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold mb-4">Kitchen Remodeling</h3>
                <p className="text-gray-500 mb-4">Complete kitchen transformations from cabinets to countertops. Create the heart of your home.</p>
                <Link href="/services/kitchen-remodeling-eugene" className="text-primary font-semibold">Learn More →</Link>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">🚿</div>
                <h3 className="text-2xl font-bold mb-4">Bathroom Renovation</h3>
                <p className="text-gray-500 mb-4">Modern bathroom updates that add value and comfort to your Eugene home.</p>
                <Link href="/services/bathroom-renovation-eugene" className="text-primary font-semibold">Learn More →</Link>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">🌲</div>
                <h3 className="text-2xl font-bold mb-4">Decks &amp; Fencing</h3>
                <p className="text-gray-500 mb-4">Custom-built outdoor spaces perfect for Oregon living. Durable, stylish, and built to last.</p>
                <Link href="/services/deck-builder-eugene" className="text-primary font-semibold">Learn More →</Link>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">☂️</div>
                <h3 className="text-2xl font-bold mb-4">Patio Covers</h3>
                <p className="text-gray-500 mb-4">Extend your outdoor season with quality patio covers designed for Lane County weather.</p>
                <Link href="/services/patio-cover-eugene" className="text-primary font-semibold">Learn More →</Link>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-2xl font-bold mb-4">General Remodeling</h3>
                <p className="text-gray-500 mb-4">Complete home renovations and additions. Whatever your project, we&apos;ve got you covered.</p>
                <Link href="/services" className="text-primary font-semibold">Learn More →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - 2 column layout matching HTML */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-12">Why Choose Halleman Construction?</h2>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">ServiceMaster Professional Background</h3>
                  <p className="text-gray-500">Josh Halleman brings professional training and expertise from ServiceMaster, ensuring top-quality workmanship on every project.</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Local Eugene Family Business</h3>
                  <p className="text-gray-500">We&apos;re a family of four living right here in Eugene. We understand Lane County homes and building requirements.</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Licensed, Bonded &amp; Insured</h3>
                  <p className="text-gray-500">Full Oregon licensing and insurance protection for your peace of mind.</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">15+ Years of Experience</h3>
                  <p className="text-gray-500">From small updates to complete remodels, we&apos;ve transformed hundreds of homes across Lane County.</p>
                </div>
              </div>
              <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                [Family Photo / Josh on Jobsite]
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-gray-50">
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
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
                  <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center text-gray-500">
                    [Project Photo {i + 1}]
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/gallery" className="border-2 border-secondary text-secondary px-8 py-4 rounded font-semibold hover:bg-secondary hover:text-white transition-colors inline-block">
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-24">
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
                <div key={i} className="bg-gray-100 p-8 rounded-xl text-center hover:bg-primary hover:text-white transition-colors group">
                  <h3 className="text-2xl font-bold mb-4">{area.name}</h3>
                  <p className="text-gray-500 group-hover:text-white">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white text-center">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-12 max-w-[700px] mx-auto">
              Get a free, no-obligation estimate today. We&apos;ll discuss your vision and provide a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 text-center">
                Get Free Estimate
              </Link>
              <a href="tel:5415254133" className="bg-white text-primary px-8 py-4 rounded text-xl font-bold hover:bg-gray-100 text-center">
                (541) 525-4133
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
