import React from 'react';
import Image from '../assets/images/group.jpg'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center text-teal-700 mb-4">About MediQueue Hospital</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
          Delivering compassionate, innovative, and accessible healthcare to every patient — your well-being is our mission.
        </p>

        {/* Image Section */}
        <div className="mb-12 flex justify-center">
          <img
            src={Image}
            alt="Hospital Building"
            className="rounded-3xl shadow-xl w-full md:w-3/4 object-cover max-h-[450px]"
          />
        </div>

        {/* Content Sections */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* Mission */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver quality healthcare with dignity, transparency, and efficiency. Our mission is to ensure that every patient receives personalized care backed by cutting-edge medical technology and a dedicated team of specialists.
            </p>
          </section>

          {/* Vision */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be recognized as one of the most trusted and patient-centered healthcare institutions in the country, setting new benchmarks in medical excellence and innovation.
            </p>
          </section>

          {/* Core Values */}
          <section className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Our Core Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Compassion:</strong> We treat each patient with empathy and care.</li>
              <li><strong>Integrity:</strong> Honesty and ethics are the foundation of our services.</li>
              <li><strong>Excellence:</strong> We continually strive for the highest standards of medical care.</li>
              <li><strong>Innovation:</strong> We embrace new technology to improve patient outcomes.</li>
              <li><strong>Respect:</strong> Every individual is treated with dignity and respect.</li>
            </ul>
          </section>

          {/* Facilities */}
          <section className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Our Facilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MediQueue Hospital offers a wide range of services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>24/7 Emergency & Trauma Care</li>
              <li>Outpatient and Inpatient Services</li>
              <li>Specialized Departments (Cardiology, Neurology, Pediatrics, etc.)</li>
              <li>Modern Diagnostic Labs and Radiology Units</li>
              <li>Pharmacy and Rehabilitation Services</li>
            </ul>
          </section>

          {/* Trust */}
          <section className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Trusted By Thousands</h2>
            <p className="text-gray-700 leading-relaxed">
              For over a decade, MediQueue Hospital has served thousands of patients across the region. Our commitment to ethical practices, patient safety, and community health continues to earn us the trust of individuals and families alike.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
