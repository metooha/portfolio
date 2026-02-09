import wmNewImage from "figma:asset/aaa7dd8ee1fac7cf707385537cb8b691c2a4157e.png";
import wmDigitalToolkitImage from "figma:asset/52720d4b6bf71a6830f1d82e5bd9396931a232ba.png";
import wmEmailBlocksImage from "figma:asset/cedc111e4230635551cf44d4c3fbf8276d9cb93b.png";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/portfolio-data";
import wmImage from "figma:asset/2321de1e813012771fd59f9875bafee26793cdba.png";
import aiIllustration from "figma:asset/bf5771133342b8de9c2234960f7c5a720d64c50e.png";
import coffeeIllustration from "figma:asset/733a7871df6fcaf7034192ea656e0879f5c27768.png";
import sparklesIllustration from "figma:asset/abceb447c7b4723a4186029f5f69bb90179b0e6a.png";
import pencilIllustration from "figma:asset/a11b8f2d4e3a31105c0a88c92c8abee704d829b5.png";
import peaceIllustration from "figma:asset/afce2a00dc589e65b89908eeb96feb128961ff73.png";
import colorSwatchIllustration from "figma:asset/66fffb1db7cc8a8b4d18368a523c4d55f2aa5019.png";
import smileyIllustration from "figma:asset/c4148cce376a0d6238affeede96c2415696c2383.png";
import pixelEmojiIllustration from "figma:asset/ef7f42724cb7196ae5428abc2d8d64ad71405f94.png";
import Xense from "@/imports/Xense";
import Academy from "@/imports/Academy";
import { useState, useEffect } from "react";

const alienIllustration = "https://images.unsplash.com/photo-1768726455596-6b55886a5862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHJvYm90JTIwYWxpZW58ZW58MXx8fHwxNzY4ODYwODczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const sparklesCursor = "https://images.unsplash.com/photo-1576499162440-5e55a43278e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFya2xlcyUyMHN0YXIlMjBpY29ufGVufDF8fHx8MTc2ODg2NTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Accessible color combinations for pills (WCAG AA compliant)
const accessibleColors = [
  { bg: '#7C3AED', text: '#FFFFFF' }, // Purple
  { bg: '#2563EB', text: '#FFFFFF' }, // Blue
  { bg: '#059669', text: '#FFFFFF' }, // Green
  { bg: '#DB2777', text: '#FFFFFF' }, // Pink
  { bg: '#EA580C', text: '#FFFFFF' }, // Orange
  { bg: '#4F46E5', text: '#FFFFFF' }, // Indigo
  { bg: '#0D9488', text: '#FFFFFF' }, // Teal
  { bg: '#DC2626', text: '#FFFFFF' }, // Red
];

const getRandomColor = () => accessibleColors[Math.floor(Math.random() * accessibleColors.length)];

export function Home() {
  return (
    <div className="min-h-screen pt-[0px] pb-[100px] pr-[0px] pl-[0px]">
      {/* Hero Header */}
      <div className="py-8 mx-[0px] my-[40px] mt-[40px] mr-[0px] mb-[4px] ml-[0px] pt-[0px] pr-[0px] pb-[32px] pl-[0px]">
        <p className="flex flex-wrap items-center gap-3 text-[90px] leading-[1.1] w-full">
          <span className="text-black text-[80px]">Hello, there.</span>
          <img src={sparklesIllustration} alt="" className="w-10 h-10 inline-block hidden md:inline-block" />
          <span className="text-black text-[80px]">I'm Amy, a</span>
          <span className="text-indigo-600 font-bold text-[80px]">Principal Product Designer,</span>
          <img src={pencilIllustration} alt="" className="w-12 h-12 inline-block hidden md:inline-block" />
          <span className="text-black text-[80px]">who builds scalable products, with a focus on branding, usability, and workflow integrations.</span>
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-[28px] mx-[0px] my-[32px] font-normal">with my skills in:</h2>
        <div className="flex flex-wrap justify-start items-center gap-2 w-full">
          {/* Skill pills - uniform size and straight alignment */}
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Enterprise Design Systems</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>UX & UI</span>
          
          <img src={coffeeIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Systems</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Platforms</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Branding</span>
          
          <img src={peaceIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Architecture</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Automation</span>
          
          <img src={pixelEmojiIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Infrastructure</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Governance</span>
          
          <img src={colorSwatchIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Tokenization</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Strategy</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Prototyping</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Scalability</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Workflow Integration</span>
        </div>
      </div>

      {/* Let's Chat Section */}
      <div className="mb-16">
        <div className="flex items-center justify-center gap-6 pt-[100px] pr-[0px] pb-[0px] pl-[0px] px-[0px] py-[100px]">
          <p className="text-2xl text-gray-700 font-normal">Wanna work together? Let's Chat</p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-[#4F39F6] text-white rounded-full hover:bg-[#3d2bc4] transition-colors font-semibold">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Work Section */}
      <div className="mb-8">
        <h1 className="text-[48px] font-bold text-[rgb(79,57,246)]">My featured work</h1>
      </div>

      {/* Case Studies Section */}
      <div className="space-y-16">
        {/* Case Studies 01 & 02 - Side by Side Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case Study 01 - WM.com Rebrand */}
          {(() => {
            const color1 = getRandomColor();
            const color2 = getRandomColor();
            const color3 = getRandomColor();
            const color4 = getRandomColor();
            return (
          <Link to="/case-study/1" className="block">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-[16/9] group">
                <img
                  src={wmNewImage}
                  alt="WM.com Rebrand"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="bg-[rgb(241,241,241)] p-8 w-full h-full flex flex-col justify-between">
                <p className="text-xs uppercase tracking-wider mb-2 text-gray-600">CASE STUDY 01</p>
                <h2 className="text-3xl font-bold mb-2">
                  WM.com Rebrand: <span className="font-normal">Re-branding WM.com</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  with a new design system and 40+ AEM componentsto support <span className="font-bold">migration of 1000+ localized pages, ecommerce site, marketing, and educational resources </span> in the US, France, and Mexico markets.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color1.bg, color: color1.text }}>WEB</span>
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color2.bg, color: color2.text }}>Mobile App</span>
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color3.bg, color: color3.text }}>Design System</span>
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color4.bg, color: color4.text }}>Branding</span>
                </div>
              </div>
            </div>
          </Link>
          )})()}

          {/* Case Study 02 - WM Digital Toolkit */}
          {(() => {
            const color1 = getRandomColor();
            const color2 = getRandomColor();
            const color3 = getRandomColor();
            return (
          <Link to="/case-study/2" className="block">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-[16/9] group">
                <img
                  src={wmEmailBlocksImage}
                  alt="WM Digital Toolkit - Email Blocks"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="bg-[#F1F1F2] p-8">
                <p className="text-xs uppercase tracking-wider mb-2 text-gray-600">CASE STUDY 02</p>
                <h2 className="text-3xl font-bold mb-2">
                  WM Digital Toolkit: <span className="font-normal">Redesigned Waste Management emails </span>
                </h2>
                <p className="text-gray-700 mb-4">
                  With the new branding guidelines, <span className="font-bold">we created a modular system of components</span> to increase engagement, traffic to wm.com, and defined usage of more concise copy to reduce bounce rates.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color1.bg, color: color1.text }}>Email Tool Kit</span>
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color2.bg, color: color2.text }}>Branding</span>
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color3.bg, color: color3.text }}>Modular Coded Templates</span>
                </div>
              </div>
            </div>
          </Link>
          )})()}
        </div>

        {/* Case Study 03 - Xense Biotech */}
        {(() => {
          const color1 = getRandomColor();
          const color2 = getRandomColor();
          const color3 = getRandomColor();
          return (
            <Link to="/case-study/3" className="block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-[16/9] group">
                  <div className="w-full h-full">
                    <Xense />
                  </div>
                  <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="bg-[#F1F1F2] p-8">
                  <p className="text-xs uppercase tracking-wider mb-2 text-gray-600">CASE STUDY 03</p>
                  <h2 className="text-3xl font-bold mb-2">Xense Biotech</h2>
                  <p className="text-gray-700 mb-4">
                    Xense's main technological platform, uTomoTM x-ray imaging, reduces the time it takes to diagnose, intervene, and recover from illness. The non-toroid tomographic imaging system from Xense allows for low-radiation quick diagnostic imaging in an all-in-one architecture with no performance restrictions.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color1.bg, color: color1.text }}>Desktop</span>
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color2.bg, color: color2.text }}>Biotech</span>
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color3.bg, color: color3.text }}>UI Kit</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })()}

        {/* Case Study 04 - Academy Sports + Outdoors Branding */}
        {(() => {
          const color1 = getRandomColor();
          const color2 = getRandomColor();
          const color3 = getRandomColor();
          const color4 = getRandomColor();
          return (
            <Link to="/case-study/4" className="block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-[16/9] group">
                  <div className="w-full h-full">
                    <Academy />
                  </div>
                  <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="bg-[#F1F1F2] p-8">
                  <p className="text-xs uppercase tracking-wider mb-2 text-gray-600">CASE STUDY 04</p>
                  <h2 className="text-3xl font-bold mb-2">Academy Sports + Outdoors Branding</h2>
                  <p className="text-gray-700 mb-4">
                    Direct Mail catalogs are delivered every quarter at Academy Sports + Outdoors. The main categories are for sports such as golf, baseball/softball, football, athletics, fishing, and hunting. I created these catalogs from conception to print production.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color1.bg, color: color1.text }}>Branding</span>
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color2.bg, color: color2.text }}>Print</span>
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color3.bg, color: color3.text }}>Digital</span>
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: color4.bg, color: color4.text }}>Campaigns</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })()}
      </div>

      {/* Purple wavy decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-24"
        >
          <path
            d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"
            fill="#6366f1"
          />
        </svg>
      </div>
    </div>
  );
}