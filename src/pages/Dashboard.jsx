import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  Users,
  Star,
} from 'lucide-react';
import Image from '../assets/images/doctor1.png';

export default function Dashboard() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment scheduling that adapts to your needs',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about wait times and appointments',
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient data management and history tracking',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-100">
      {/* Hero Section */}
      <section className="pt-12 px-4">
        <div className="mb-10 md:w-full space-y-4 text-center md:text-left md:pl-16">
          <h1 className="text-3xl md:text-4xl font-pacifico text-teal-600 leading-snug">
            Simplify Healthcare Visits
            <br />
            with MediQueue
          </h1>
        </div>

        {/* Right Side Image */}
        <div className="relative flex justify-center md:justify-end">
          <img src={Image} className="rounded-2xl w-full max-w-2xl" />
          <div
            className="absolute text-teal-600 rounded-xl shadow-lg p-4 text-medium max-w-xs top-20 left-20 md:left-20"
            style={{ backgroundColor: '#F4F0F0' }}
          >
            MediQueue is a smart queue and appointment management app
            designed to connect patients with healthcare providers more efficiently.
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center p-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <MapPin className="mx-auto text-teal-500 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Visit the Website</h3>
          <p className="text-sm text-gray-600">
            Start by going to our MediQueue website to access the clinic services.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <CalendarCheck className="mx-auto text-teal-500 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select Details</h3>
          <p className="text-sm text-gray-600">
            Choose the location, date, time, and healthcare provider for your appointment.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <Clock className="mx-auto text-teal-500 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Check Queue Status</h3>
          <p className="text-sm text-gray-600">
            Track your spot in the queue live from our virtual system.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <CheckCircle className="mx-auto text-teal-500 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Attend the Appointment</h3>
          <p className="text-sm text-gray-600">
            Visit the healthcare facility at your scheduled time.
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose MediQueue?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of healthcare management with our innovative features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${
                activeFeature === index ? 'ring-2 ring-teal-500 scale-105' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
