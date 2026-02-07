import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Kitchen Remodeling Eugene OR | Halleman Construction LLC',
  description: 'Professional kitchen remodeling services in Eugene, Oregon. Custom cabinets, countertops, tile backsplashes, and complete kitchen renovations. Licensed contractor.',
}

export default function KitchenRemodelingEugene() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitchen Remodeling in Eugene, OR</h1>
            <p className="text-xl text-gray-200">Complete kitchen renovations tailored to your style and budget</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-secondary">Professional Kitchen Remodeling</h2>
              <p className="text-gray-700 mb-4">
                Halleman Construction provides expert kitchen remodeling services throughout Eugene and Lane County. Whether you need a minor update or a complete kitchen renovation, our team delivers quality craftsmanship you can trust.
              </p>
              <ul className="space-y-2 mb-8 text-gray-600">
                <li>&#10003; Custom cabinet installation</li>
                <li>&#10003; Countertop installation</li>
                <li>&#10003; Tile backsplashes</li>
                <li>&#10003; Complete kitchen renovations</li>
                <li>&#10003; Flooring and lighting upgrades</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Remodel Your Kitchen?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today for a free estimate on your kitchen remodeling project.
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
