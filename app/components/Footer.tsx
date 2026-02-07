import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Halleman Construction LLC</h3>
            <p className="text-white/80">Eugene&apos;s trusted remodeling contractor</p>
            <p className="text-white/70 mt-4 text-sm">Licensed • Bonded • Insured<br />Oregon CCB #[number]</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/tile-installation-eugene" className="text-white/80 hover:text-primary">Tile Installation</Link></li>
              <li><Link href="/services/kitchen-remodeling-eugene" className="text-white/80 hover:text-primary">Kitchen Remodeling</Link></li>
              <li><Link href="/services/bathroom-renovation-eugene" className="text-white/80 hover:text-primary">Bathroom Renovation</Link></li>
              <li><Link href="/services/deck-builder-eugene" className="text-white/80 hover:text-primary">Decks &amp; Fencing</Link></li>
              <li><Link href="/services/patio-cover-eugene" className="text-white/80 hover:text-primary">Patio Covers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              <li><span className="text-white/80">Eugene, OR</span></li>
              <li><span className="text-white/80">Cottage Grove, OR</span></li>
              <li><span className="text-white/80">Veneta, OR</span></li>
              <li><span className="text-white/80">Coburg, OR</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p>
              <a href="tel:5415254133" className="text-white/80 hover:text-primary">(541) 525-4133</a>
            </p>
            <p className="mt-2">
              <a href="mailto:info@hallemanconstructionllc.com" className="text-white/80 hover:text-primary">info@hallemanconstructionllc.com</a>
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="px-4 py-2 bg-white/10 rounded hover:bg-primary hover:text-white transition-colors text-white/80">Facebook</a>
              <a href="#" className="px-4 py-2 bg-white/10 rounded hover:bg-primary hover:text-white transition-colors text-white/80">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">&copy; {new Date().getFullYear()} Halleman Construction LLC. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="text-white/80 hover:text-primary text-sm">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white/80 hover:text-primary text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
