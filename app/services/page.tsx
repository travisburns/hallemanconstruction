import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Construction Services Eugene OR | Halleman Construction LLC',
  description: 'Complete construction and remodeling services in Eugene, Oregon. Tile installation, kitchen remodeling, bathroom renovation, decks, fencing, patio covers. Licensed contractor.',
}

export default function Services() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-200">Professional construction and remodeling throughout Eugene and Lane County</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Tile Installation */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Tile Installation</h2>
                <p className="text-gray-700 mb-4">
                  Expert tile installation for kitchens, bathrooms, floors, and backsplashes. We work with ceramic, porcelain, natural stone, and glass tile.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Kitchen backsplashes</li>
                  <li>✓ Bathroom floors and showers</li>
                  <li>✓ Floor tile installation</li>
                  <li>✓ Custom tile patterns</li>
                </ul>
                <Link href="/services/tile-installation-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>

              {/* Kitchen Remodeling */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Kitchen Remodeling</h2>
                <p className="text-gray-700 mb-4">
                  Complete kitchen renovations including cabinets, countertops, tile work, and custom designs tailored to your needs.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Custom cabinet installation</li>
                  <li>✓ Countertop installation</li>
                  <li>✓ Tile backsplashes</li>
                  <li>✓ Complete kitchen renovations</li>
                </ul>
                <Link href="/services/kitchen-remodeling-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>

              {/* Bathroom Renovation */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Bathroom Renovation</h2>
                <p className="text-gray-700 mb-4">
                  Transform your bathroom with professional remodeling. From small updates to complete renovations.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Shower and tub installation</li>
                  <li>✓ Tile work and flooring</li>
                  <li>✓ Vanity installation</li>
                  <li>✓ Complete bathroom remodels</li>
                </ul>
                <Link href="/services/bathroom-renovation-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>

              {/* Deck Construction */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Deck Construction</h2>
                <p className="text-gray-700 mb-4">
                  Custom deck building with quality materials and expert craftsmanship. Extend your outdoor living space.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Custom deck designs</li>
                  <li>✓ Cedar and composite decking</li>
                  <li>✓ Deck repairs and refinishing</li>
                  <li>✓ Railings and stairs</li>
                </ul>
                <Link href="/services/deck-builder-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>

              {/* Fence Installation */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Fence Installation</h2>
                <p className="text-gray-700 mb-4">
                  Privacy fences, picket fences, vinyl fencing. Quality materials and professional installation.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Privacy fences</li>
                  <li>✓ Picket fences</li>
                  <li>✓ Vinyl fencing</li>
                  <li>✓ Fence repairs</li>
                </ul>
                <Link href="/services/fence-installation-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>

              {/* Patio Covers */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Patio Covers</h2>
                <p className="text-gray-700 mb-4">
                  Custom patio cover installation to protect and enhance your outdoor living areas.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li>✓ Custom patio cover designs</li>
                  <li>✓ Wood and aluminum options</li>
                  <li>✓ Weather protection</li>
                  <li>✓ Outdoor living enhancement</li>
                </ul>
                <Link href="/services/patio-cover-eugene" className="text-primary font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today for a free estimate on your construction or remodeling project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get Free Estimate
              </Link>
              <a href="tel:5415254133" className="btn-secondary">
                Call (541) 525-4133
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}