
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Threads, href: '#', label: 'Threads' },
    { icon: Instagram, href: 'https://www.instagram.com/architect_victor_n?igsh=MXNteGFzM2NucWhtaQ==', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const footerLinks = {
    Services: ['Residential Design', 'Commercial Projects', 'Urban Planning', 'Consultation'],
    Company: ['About Us', 'Our Team', 'Careers', 'News'],
    Resources: ['Portfolio', 'Case Studies', 'Blog', 'Downloads'],
    Contact: ['Get Quote', 'Support', 'Locations', 'Partnerships']
  };

  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-white/10 text-white py-16 glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              VN<span className="text-white">DESIGNTECH</span>
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Creating innovative architectural solutions across Kenya that inspire and endure. 
              We design spaces that enhance lives and communities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 glass bg-gray-600 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 VN Design Tech. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
