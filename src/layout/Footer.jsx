import { Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-teal-50 to-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-teal-700 font-bold text-xl">MediQueue</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              Simplifying healthcare appointments with our intuitive platform. Book, manage, and track appointments—effortlessly.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-teal-600 transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Services", "Doctors"].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-teal-600 transition duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-base">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@mediqueue.com
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} /> Mon-Fri 9AM–6PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2024 MediQueue. All rights reserved. | 
          <a href="#" className="ml-2 hover:text-teal-600 transition">Privacy Policy</a> | 
          <a href="#" className="ml-2 hover:text-teal-600 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
