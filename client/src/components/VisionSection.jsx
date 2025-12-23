// VisionSection.jsx - With Research Domains
import React from 'react'
import { Leaf, Microscope } from 'lucide-react'

const items = [
  {
    title: 'Vision',
    text: 'To foster a culture of environmental consciousness, sustainability, and innovation among students and faculty, contributing to a greener and more responsible future.',
  },
  {
    title: 'Mission',
    text: 'To serve as a platform for environmental awareness, hands-on sustainability projects, and collaborative research that positively impacts campus and beyond.',
  }
]

const researchDomains = [
  'Carbon Footprint',
  'Renewable Energy',
  'Soil Conservation',
  'Biodiversity & Ecosystem',
  'Waste Management',
  'Water Pollution',
  'Air Pollution',
  'Urban Heat Island Effect'
]

const VisionSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Vision & Mission Cards */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="group relative rounded-2xl border border-green-200 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-green-600 p-3 shadow-lg shadow-green-600/30">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">{item.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-gray-700">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* Research Domains Section */}
        <div className="rounded-2xl border border-green-200 bg-white/80 backdrop-blur-sm p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-green-600 p-3 shadow-lg shadow-green-600/30">
              <Microscope className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-900">Research Domains</h3>
          </div>
          
          {/* Scrollable horizontal list */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 min-w-max">
              {researchDomains.map((domain, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm whitespace-nowrap shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:scale-105 transition-all duration-300"
                >
                  {domain}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile scroll hint */}
          <p className="mt-3 text-xs text-gray-500 text-center md:hidden">
            ← Swipe to see all domains →
          </p>
        </div>

      </div>

      {/* Add scrollbar hiding CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default VisionSection
