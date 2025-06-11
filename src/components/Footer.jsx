// src/components/Footer.tsx
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail } from 'lucide-react'; // Make sure lucide-react is installed
import Visa from "../assets/Visa.png"
import Mastercard from "../assets/Mastercard.png"
import Paypal from "../assets/Paypal.png"
import Stripe from "../assets/Stripe.png"
import { Link } from 'react-router';
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info / Logo */}
        <div className="col-span-1">
          <a href="/" className="flex items-center space-x-2 mb-4 text-white hover:text-gray-100 transition-colors duration-300">
            {/* Replace with your logo component or image */}
            <span className="text-2xl font-bold">Vision Technologies</span>
          </a>
          <p className="text-sm leading-relaxed">
            Your premier destination for quality products. Shop with confidence and discover our curated collections.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Youtube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/about" className="hover:text-white transition-colors duration-300 text-sm">About Us</a></li>
            <li><a href="/shop" className="hover:text-white transition-colors duration-300 text-sm">Shop All</a></li>
            <Link to="/blog"><li className="hover:text-white transition-colors duration-300 text-sm"> Blog</li></Link>
            <Link to="/contact"><li className="hover:text-white transition-colors duration-300 text-sm">Contact Us</li></Link>
            <li><a href="/sitemap" className="hover:text-white transition-colors duration-300 text-sm">Sitemap</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-3">
            <li><a href="/faq" className="hover:text-white transition-colors duration-300 text-sm">FAQs</a></li>
            <li><a href="/shipping" className="hover:text-white transition-colors duration-300 text-sm">Shipping Information</a></li>
            <li><a href="/returns" className="hover:text-white transition-colors duration-300 text-sm">Returns & Refunds</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors duration-300 text-sm">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter & Payment Methods */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
          <div className="flex flex-col gap-y-3 space-x-2">
            {/* Replaced shadcn/ui Input with native input + Tailwind classes */}
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-3 py-2 border border-gray-700 rounded-md shadow-sm
                         bg-gray-800 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Email for newsletter"
            />
            {/* Replaced shadcn/ui Button with native button + Tailwind classes */}
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md
                         font-medium text-white bg-blue-600 hover:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              <Mail size={18} className="mr-2" /> Subscribe
            </button>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-4">We Accept</h3>
          <div className="flex flex-wrap gap-3">
            {/* Replace these with actual payment icons from your assets or an icon library */}
            <img src={Visa} alt="Visa" className="h-6" />
            <img src={Mastercard} alt="Mastercard" className="h-6" />
            <img src={Paypal} alt="PayPal" className="h-6" />
            <img src={Stripe} alt="Stripe" className="h-6" />
            {/* Add more as needed */}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Vision Tech. All rights reserved.</p>
        <p>Designed and Developed with ❤️</p>
      </div>
    </footer>
  );
}