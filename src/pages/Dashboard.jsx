import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  Users,
} from 'lucide-react';
import Image from '../assets/images/doctor1.png';

export default function Dashboard() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3500);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-100 relative overflow-hidden">

      {/* Floating Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse z-0" />

      {/* Hero Section */}
      <section className="pt-20 px-4 relative z-10">
        <div className="w-full flex flex-col md:flex-row items-center gap-12 px-4 md:px-12">

          {/* Image on the Left */}
          <div className="w-full md:w-3/5 order-1 md:order-1">
            <img
              src={Image}
              alt="Doctor"
              className="w-full h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text on the Right */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                Simplify Healthcare Visits
              </span>
              <br />
              with MediQueue
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-md">
              MediQueue is a smart queue and appointment management app designed to connect
              patients with healthcare providers more efficiently. Experience seamless scheduling and live queue tracking.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300">
                Get Started
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[{
                icon: MapPin,
                title: "Visit the Website",
                desc: "Start by going to our MediQueue website to access the clinic services.",
              },
              {
                icon: CalendarCheck,
                title: "Select Details",
                desc: "Choose the location, date, time, and healthcare provider for your appointment.",
              },
              {
                icon: Clock,
                title: "Check Queue Status",
                desc: "Track your spot in the queue live from our virtual system.",
              },
              {
                icon: CheckCircle,
                title: "Attend the Appointment",
                desc: "Visit the healthcare facility at your scheduled time.",
              }].map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition-all duration-300"
              >
                <step.icon className="mx-auto text-purple-600 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gradient-to-tr from-slate-50 via-white to-purple-100 py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                Why Choose MediQueue?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare management with our innovative features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group relative bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
