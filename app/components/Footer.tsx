import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-primary">Tile Installation</Link></li>
              <li><Link href="/services" className="hover:text-primary">Kitchen Remodeling</Link></li>
              <li><Link href="/services" className="hover:text-primary">Bathroom Renovation</Link></li>
              <li><Link href="/services" className="hover:text-primary">Decks & Fencing</Link></li>
              <li><Link href="/services" className="hover:text-primary">Patio Covers</Link></li>
            </ul>
          </div>

          {/* Column 3 - Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              <li>Eugene, OR</li>
              <li>Cottage Grove, OR</li>
              <li>Veneta, OR</li>
              <li>Coburg, OR</li>
              <li>Lane County</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:5415254133" className="hover:text-primary">
                  (541) 525-4133
                </a>
              </li>
              <li>
                <a href="mailto:info@hallemanconstructionllc.com" className="hover:text-primary">
                  info@hallemanconstructionllc.com
                </a>
              </li>
              <li className="mt-4">
                <div className="text-accent font-semibold">✓ Licensed, Bonded, Insured</div>
                <div className="text-sm text-gray-300">Oregon CCB License</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-600 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Halleman Construction LLC. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}