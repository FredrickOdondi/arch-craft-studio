
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
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
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4 gradient-text">
              VN<span className="text-white">DESIGNTECH</span>
            </h3>
            <p className="text-gray-200 mb-6 leading-relaxed text-lg">
              Creating innovative architectural solutions across Kenya that inspire and endure. 
              We design spaces that enhance lives and communities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
                >
                  <social.icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4 text-white text-lg">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-white transition-colors duration-300 hover:underline text-base"
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
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-base font-medium">
            © 2024 VN Design Tech. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-gray-200 hover:text-white text-base transition-colors duration-300 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-200 hover:text-white text-base transition-colors duration-300 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-gray-200 hover:text-white text-base transition-colors duration-300 hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
