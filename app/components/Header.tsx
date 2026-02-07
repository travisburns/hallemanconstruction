'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-[1000]">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-secondary">
            Halleman Construction <span className="text-primary font-normal text-base">LLC</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-secondary hover:text-primary font-medium">Home</Link>
            <Link href="/services" className="text-secondary hover:text-primary font-medium">Services</Link>
            <Link href="/gallery" className="text-secondary hover:text-primary font-medium">Gallery</Link>
            <Link href="/about" className="text-secondary hover:text-primary font-medium">About</Link>
            <Link href="/contact" className="text-secondary hover:text-primary font-medium">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:5415254133" className="text-primary font-bold text-lg hover:text-primary-dark">
              (541) 525-4133
            </a>
            <Link href="/contact" className="btn-primary">
              Get Free Estimate
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-[5px]"
          >
            <span className="w-[25px] h-[3px] bg-secondary block"></span>
            <span className="w-[25px] h-[3px] bg-secondary block"></span>
            <span className="w-[25px] h-[3px] bg-secondary block"></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-secondary hover:text-primary font-medium">Home</Link>
              <Link href="/services" className="text-secondary hover:text-primary font-medium">Services</Link>
              <Link href="/gallery" className="text-secondary hover:text-primary font-medium">Gallery</Link>
              <Link href="/about" className="text-secondary hover:text-primary font-medium">About</Link>
              <Link href="/contact" className="text-secondary hover:text-primary font-medium">Contact</Link>
              <a href="tel:5415254133" className="text-primary font-bold">(541) 525-4133</a>
              <Link href="/contact" className="btn-primary inline-block text-center">Get Free Estimate</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
