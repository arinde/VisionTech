

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'; // For icons

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null); // string | null

  const handleChange = (e) => { // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> in TS
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // e: React.FormEvent<HTMLFormElement> in TS
    e.preventDefault();
    setSubmissionStatus('idle'); // Reset status on new submission attempt
    setErrorMessage(null);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setSubmissionStatus('error');
      return;
    }

    // Simple email format validation (can be more robust)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setSubmissionStatus('error');
      return;
    }

    // Simulate API call
    console.log("Attempting to submit form:", formData);
    try {
      // In a real application, you would send this data to your backend API
      // Example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to send message.');
      // }

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an error sending your message. Please try again later.");
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-36 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-700 text-base">
              We'd love to hear from you! Whether you have a question about our products, need assistance, or just want to say hello, feel free to reach out.
            </p>

            <div className="flex items-start space-x-4">
              <MapPin size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Our Address</p>
                <p className="text-gray-700">Otigba street computer village Ikeja</p>
                <p className="text-gray-700">Ikeja, Lagos State 78901</p>
                <p className="text-gray-700">Nigeria</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-700">+234 816 850 0993</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-700">arindevictor@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Working Hours</p>
                <p className="text-gray-700">Mon - Fri: 9:00 AM - 5:00 PM GMT</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>

              {submissionStatus === 'success' && (
                <div className="text-green-600 font-semibold text-center py-2 px-4 bg-green-100 rounded-md">
                  Thank you! Your message has been sent.
                </div>
              )}
              {submissionStatus === 'error' && errorMessage && (
                <div className="text-red-600 font-semibold text-center py-2 px-4 bg-red-100 rounded-md">
                  Error: {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm
                           text-lg font-medium text-white bg-blue-600 hover:bg-blue-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
