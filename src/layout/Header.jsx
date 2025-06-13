"use client"

import { User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-teal-700 font-semibold text-xl">MediQueue</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
              About Us
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
              Doctors
            </a>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-teal-600">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
