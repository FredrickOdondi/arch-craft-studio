import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContactSubmissions } from '../hooks/useContactSubmissions';
import { toast } from 'sonner';

const SupabaseContactSection = () => {
  const { submitContactForm } = useContactSubmissions();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    project_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await submitContactForm(formData);
      
      if (error) {
        toast.error('Failed to send message. Please try again.');
      } else {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          project_type: '',
          message: ''
        });
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/6336335e-8404-42ce-bc92-8e7a52514670.png')] bg-cover bg-center opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to bring your architectural vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="depth-card glass bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500">
              <div className="flex items-start space-x-4">
                <div className="glass bg-white/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Visit Our Office</h3>
                  <p className="text-gray-300">
                    123 Design Street<br />
                    Nairobi, Kenya 00100
                  </p>
                </div>
              </div>
            </div>

            <div className="depth-card glass bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500">
              <div className="flex items-start space-x-4">
                <div className="glass bg-white/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                  <p className="text-gray-300">+254 700 123 456</p>
                </div>
              </div>
            </div>

            <div className="depth-card glass bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500">
              <div className="flex items-start space-x-4">
                <div className="glass bg-white/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-gray-300">hello@vndesigntech.com</p>
                </div>
              </div>
            </div>

            <div className="depth-card glass bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500">
              <div className="flex items-start space-x-4">
                <div className="glass bg-white/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Office Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="depth-card glass bg-white/5 border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-xl"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-xl"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-xl"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Project Type</label>
                <select 
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-white/40 focus:outline-none backdrop-blur-xl"
                  required
                >
                  <option value="" className="bg-gray-900">Select a project type</option>
                  <option value="residential" className="bg-gray-900">Residential</option>
                  <option value="commercial" className="bg-gray-900">Commercial</option>
                  <option value="villa" className="bg-gray-900">Modern Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-xl resize-none"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass bg-white/20 border border-white/30 py-3 rounded-lg text-white hover:bg-white/30 transition-all duration-300 font-medium backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupabaseContactSection;