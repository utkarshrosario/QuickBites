const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-white mt-auto py-12 lg:py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-8 lg:mb-12">
          {/* Brand Section */}
          <div style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold text-accent mb-4 relative">
              QuickBites
              <div className="absolute -bottom-1 left-0 w-10 h-1 bg-primary rounded-full"></div>
            </h3>
            <p className="text-gray-300 leading-relaxed">Delicious food delivered fast to your door</p>
          </div>
          {/* Quick Links */}
          <div style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/restaurants" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">🏪 Restaurants</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent"></div>
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">ℹ️ About Us</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent"></div>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">📞 Contact</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent"></div>
                </a>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/help" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">🆘 Help Center</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1"></div>
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">📋 Terms of Service</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1"></div>
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">🔒 Privacy Policy</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1"></div>
                </a>
              </li>
              <li>
                <a href="/refund" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block relative">
                  <span className="relative">↩️ Refund Policy</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-lg">
          <p>&copy; 2025 QuickBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer