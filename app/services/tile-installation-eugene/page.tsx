import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Tile Installation Eugene OR | Halleman Construction LLC',
  description: 'Expert tile installation services in Eugene, Oregon. Kitchen backsplashes, bathroom tile, floor tile, and custom tile work. Licensed contractor.',
}

export default function TileInstallationEugene() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tile Installation in Eugene, OR</h1>
            <p className="text-xl text-gray-200">Expert tile work for kitchens, bathrooms, floors, and more</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-secondary">Professional Tile Installation</h2>
              <p className="text-gray-700 mb-4">
                Halleman Construction offers professional tile installation services throughout Eugene and Lane County. We work with ceramic, porcelain, natural stone, and glass tile to bring your vision to life.
              </p>
              <ul className="space-y-2 mb-8 text-gray-600">
                <li>&#10003; Kitchen backsplashes</li>
                <li>&#10003; Bathroom floors and showers</li>
                <li>&#10003; Floor tile installation</li>
                <li>&#10003; Custom tile patterns</li>
                <li>&#10003; Natural stone and porcelain</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Tile Installation?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today for a free estimate on your tile installation project.
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
