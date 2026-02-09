import { useState } from "react";
import { Instagram, Mail, Linkedin } from "lucide-react";
import coffeeIllustration from "figma:asset/733a7871df6fcaf7034192ea656e0879f5c27768.png";
import adplistMentoringCard from "figma:asset/63aea3b2da685ce0ef7648fe601ae56278215c72.png";
import adplistLogo from "figma:asset/5d3134de39e2cf7445d5e9cecaff1acd831f6e84.png";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open user's email client with pre-filled data
    window.location.href = `mailto:amytuha@pm.me?subject=${subject}&body=${body}`;
    
    // Clear form
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="w-full h-full py-12 px-4 md:px-[68px]">
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-bold text-indigo-600">Contact me.</h1>
              <img src={coffeeIllustration} alt="Coffee" className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-800">I'm in the Bay Area, send me a message if you'd like to chat.</p>
              
              <a 
                href="https://drive.google.com/file/d/1Ey7f4JafSZUQ2PZdavkqzrZTLgSGfO2M/view?usp=sharing" 
                className="text-indigo-600 underline hover:text-indigo-800 block"
              >
                Download my resume
              </a>
              
              
              {/* ADPlist Mentoring Card */}
              <a 
                href="https://adplist.org/mentors/amy-ha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-6"
              >
                <img 
                  src={adplistMentoringCard} 
                  alt="Join my community on ADPlist" 
                  className="w-full rounded-lg hover:opacity-90 transition-opacity"
                />
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-indigo-600"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:amytuha@pm.me"
                className="text-gray-800 hover:text-indigo-600"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/haamy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-indigo-600"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://adplist.org/mentors/amy-ha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <img src={adplistLogo} alt="ADPlist" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder=""
                    />
                    <p className="text-xs text-gray-500 mt-1">First Name (required)</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder=""
                    />
                    <p className="text-xs text-gray-500 mt-1">Last Name (required)</p>
                  </div>
                </div>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email (required)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder=""
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message (required)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder=""
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="px-6 py-3 bg-[#4F39F6] text-white rounded-full hover:bg-[#3d2bc4] transition-colors font-semibold"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}