export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-teal-700 font-semibold text-lg">MediQueue</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Simplifying healthcare appointments with our advanced booking system. Connect with healthcare providers
              effortlessly and manage your health journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Doctors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>support@mediqueue.com</li>
              <li>Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 MediQueue. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
