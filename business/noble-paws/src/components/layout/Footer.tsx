import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 100 100" className="text-cream">
                <circle cx="50" cy="50" r="48" fill="currentColor" stroke="#C9A050" strokeWidth="3" opacity="0.9"/>
                <g transform="translate(50,50)">
                  <ellipse cx="0" cy="12" rx="18" ry="16" fill="#2D5A27"/>
                  <ellipse cx="-18" cy="-8" rx="9" ry="11" fill="#2D5A27" transform="rotate(-20,-18,-8)"/>
                  <ellipse cx="0" cy="-18" rx="9" ry="11" fill="#2D5A27"/>
                  <ellipse cx="18" cy="-8" rx="9" ry="11" fill="#2D5A27" transform="rotate(20,18,-8)"/>
                  <path d="M-12,-20 L-10,-32 L-5,-25 L0,-35 L5,-25 L10,-32 L12,-20 Z" fill="#C9A050"/>
                </g>
              </svg>
              <h3 className="text-2xl font-serif text-white">Noble Paws</h3>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Where exceptional companions find their forever homes. 
              We breed with love, care, and the highest standards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/dogs" className="block text-sm text-cream/70 hover:text-gold transition-colors">
                Available Dogs
              </Link>
              <Link to="/breeds" className="block text-sm text-cream/70 hover:text-gold transition-colors">
                Our Breeds
              </Link>
              <Link to="/about" className="block text-sm text-cream/70 hover:text-gold transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-cream/70 hover:text-gold transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-cream/70">
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:info@noblepaws.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@noblepaws.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Beverly Hills, CA 90210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/20 text-center text-sm text-cream/50">
          <p className="flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Noble Paws. Made with <Heart className="w-3 h-3 text-gold" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}