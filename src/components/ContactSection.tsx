
import React, { useState } from 'react';
import { Phone, Mail, Map, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+254 798248779',
      details: '+254 792222180',
      link: 'tel:+254798248779'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'vndesigntech@gmail.com',
      link: 'mailto:vndesigntech@gmail.com'
    },
    {
      icon: Map,
      title: 'Office',
      details: 'Dafaco plaza, Ngong, Vet',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Let's Create Something
            <span className="block text-gray-600"> Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your architectural vision to life in Kenya? Get in touch with our team 
            to discuss your project and explore the possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl depth-card">
            <h3 className="text-3xl font-bold text-black mb-10">Get in Touch</h3>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center shadow-lg">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-1">{info.title}</h4>
                    <a 
                      href={info.link}
                      className="text-gray-600 hover:text-black transition-colors duration-300 text-lg"
                    >
                      {info.details}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-10">
              <div className="w-full h-64 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <Map className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Our Office</p>
                  <p className="text-sm opacity-75">Dafaco plaza, Ngong, Vet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl depth-card">
            <h3 className="text-3xl font-bold text-black mb-8">Start Your Project</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-black mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-black mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-lg font-semibold text-black mb-3">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential Home</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="renovation">Home Renovation</option>
                  <option value="consultation">Design Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-black mb-3">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white px-8 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <span>Send Message</span>
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
