import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface ContactProps {
  initialSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: 'B2B Wholesale / Export',
    message: initialSubject ? `Inquiry regarding: ${initialSubject}` : '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const officialMapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Plot No. 3, Khasra No. 54/5, Salawas Road, Jodhpur, Rajasthan – 342001, India");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email address, and enquiry message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      try {
        const stored = JSON.parse(localStorage.getItem('sssa_enquiries') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('sssa_enquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage warning', err);
      }
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      enquiryType: 'B2B Wholesale / Export',
      message: '',
    });
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              Contact Us
            </span>
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
            Connect With Our Team
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#59534C] font-light leading-relaxed">
            Reach out to Shree Shiv Shakti Art for catalogue requests, bespoke manufacturing enquiries, and trade discussions.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#EAE0D2] shadow-sm">
          
          {/* Left Column: Official Contact & Factory Details */}
          <div className="lg:col-span-5 bg-[#382419] text-[#F7F3EC] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C4975C] uppercase">
                Company &amp; Works
              </span>
              <h3 className="text-2xl font-serif text-white mt-2 mb-6">
                Shree Shiv Shakti Art
              </h3>
              <p className="text-xs text-[#EAE0D2]/80 font-light leading-relaxed mb-8">
                Wooden Handicrafts Manufacturing and Export House specializing in hand-carved furniture and authentic traditional wooden art.
              </p>

              <div className="space-y-6 text-sm text-[#EAE0D2]">
                {/* Official Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-none bg-[#271911] border border-[#A77B42]/40 flex items-center justify-center shrink-0 text-[#C4975C]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#C4975C] font-semibold">Official Email</p>
                    <a
                      href="mailto:Info@shreeshivshaktiart.com"
                      className="font-mono text-xs text-white hover:text-[#C4975C] transition-colors mt-0.5 inline-block break-all"
                    >
                      Info@shreeshivshaktiart.com
                    </a>
                    <p className="text-[11px] text-[#EAE0D2]/60">Export &amp; Trade Inquiries</p>
                  </div>
                </div>

                {/* Business Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-none bg-[#271911] border border-[#A77B42]/40 flex items-center justify-center shrink-0 text-[#C4975C]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#C4975C] font-semibold">Business Phone &amp; WhatsApp</p>
                    <a
                      href="https://wa.me/919929291844"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-white hover:text-[#C4975C] transition-colors mt-0.5 inline-block"
                    >
                      +91 99292 91844
                    </a>
                    <p className="text-[11px] text-[#EAE0D2]/60">Direct WhatsApp &amp; Export Inquiries</p>
                  </div>
                </div>

                {/* Factory Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-none bg-[#271911] border border-[#A77B42]/40 flex items-center justify-center shrink-0 text-[#C4975C]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#C4975C] font-semibold">Factory / Workshop Address</p>
                    <a
                      href={officialMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white hover:text-[#C4975C] transition-colors mt-0.5 leading-relaxed block break-words"
                      title="Open Factory Location in Google Maps"
                    >
                      Plot No. 3, Khasra No. 54/5, Salawas Road, Jodhpur, Rajasthan – 342001, India.
                    </a>
                    <a
                      href={officialMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#C4975C] hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#A77B42]/30 text-xs text-[#EAE0D2]/70">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C4975C]" />
                Direct enquiry responses delivered to your email.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-8 sm:p-12">
            <h3 className="text-xl sm:text-2xl font-serif text-[#382419] mb-2">
              Send An Enquiry
            </h3>
            <p className="text-xs text-[#59534C] mb-8 font-light">
              Submit your request below for catalogue information, bespoke manufacturing, or trade quotations.
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-[#F7F3EC] border border-[#A77B42] text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-[#382419] text-[#C4975C] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#C4975C]" />
                </div>
                <h4 className="text-xl font-serif text-[#382419]">Thank You For Your Enquiry</h4>
                <p className="text-xs sm:text-sm text-[#59534C] max-w-md mx-auto leading-relaxed">
                  Your enquiry has been received. Our team will review your requirements and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 border-l-2 border-red-600 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone or WhatsApp"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company / Business Name"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                    Enquiry Type
                  </label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors"
                  >
                    <option value="B2B Wholesale / Export">B2B Wholesale / Export</option>
                    <option value="Custom Furniture Manufacturing">Custom Furniture Manufacturing</option>
                    <option value="Wooden Handicrafts & Art">Wooden Handicrafts &amp; Art</option>
                    <option value="Interior Project Requirements">Interior Project Requirements</option>
                    <option value="General Trade Query">General Trade Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#382419] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project, quantity, timber or finish preferences..."
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#EAE0D2] text-[#25221F] text-xs focus:outline-none focus:border-[#A77B42] transition-colors resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Integrated Google Maps Location Section */}
        <div className="mt-16 bg-white border border-[#EAE0D2] p-6 sm:p-8 shadow-sm">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#EAE0D2] gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="w-4 h-[1.5px] bg-[#A77B42]"></span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                  Factory &amp; Works Location
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#382419]">
                Find Our Location
              </h3>
            </div>

            <a
              href={officialMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] hover:text-white transition-colors duration-300 shadow-xs self-start sm:self-auto"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Responsive Map Embed */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-[#EAE0D2]/40 border border-[#EAE0D2] overflow-hidden">
            <iframe
              title="Shree Shiv Shakti Art Location Map"
              src={"https://maps.google.com/maps?q=" + encodeURIComponent("Plot No. 3, Khasra No. 54/5, Salawas Road, Jodhpur, Rajasthan 342001 India") + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}
              className="w-full h-full border-0 filter contrast-[1.02]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
