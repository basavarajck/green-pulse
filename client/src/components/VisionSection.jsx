// // VisionSection.jsx - WITH NAVIGATION
// import React from 'react'
// import { Leaf, Microscope, ArrowRight } from 'lucide-react'
// import { Link } from 'react-router-dom'

// const items = [
//   {
//     title: 'Vision',
//     text: 'To foster a culture of environmental consciousness, sustainability, and innovation among students and faculty, contributing to a greener and more responsible future.',
//   },
//   {
//     title: 'Mission',
//     text: 'To serve as a platform for environmental awareness, hands-on sustainability projects, and collaborative research that positively impacts campus and beyond.',
//   }
// ]

// const researchDomains = [
//   { id: 'carbon-footprint', name: 'Carbon Footprint' },
//   { id: 'renewable-energy', name: 'Renewable Energy' },
//   { id: 'soil-conservation', name: 'Soil Conservation' },
//   { id: 'biodiversity', name: 'Biodiversity & Ecosystem' },
//   { id: 'waste-management', name: 'Waste Management' },
//   { id: 'water-pollution', name: 'Water Pollution' },
//   { id: 'air-pollution', name: 'Air Pollution' },
//   { id: 'urban-heat', name: 'Urban Heat Island Effect' }
// ]

// const VisionSection = () => {
//   return (
//     <div className="w-full">
//       {/* Vision & Mission Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
//         {items.map((item, idx) => (
//           <article
//             key={idx}
//             className="group relative rounded-2xl p-6 sm:p-8 lg:p-10 border border-green-300/50 bg-gradient-to-br from-green-950/80 to-neutral-900/90 backdrop-blur-xl shadow-2xl shadow-green-900/30 hover:shadow-green-500/40 hover:border-green-400/70 hover:-translate-y-2 transition-all duration-500"
//           >
//             <div className="mb-4 sm:mb-6 flex items-center gap-3">
//               <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4 shadow-xl shadow-green-500/50 flex items-center justify-center">
//                 <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-100 tracking-tight bg-gradient-to-r from-green-300 via-green-100 to-emerald-100 bg-clip-text">
//                 {item.title}
//               </h3>
//             </div>
//             <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-200 lg:leading-8">
//               {item.text}
//             </p>
//           </article>
//         ))}
//       </div>

//       {/* Research Domains */}
//       <div className="rounded-2xl p-6 sm:p-8 lg:p-12 border border-green-300/50 bg-gradient-to-br from-green-950/80 to-neutral-900/90 backdrop-blur-xl shadow-2xl shadow-green-900/30 hover:shadow-green-500/40 transition-all duration-300">
//         <div className="mb-6 sm:mb-8 flex items-center gap-4">
//           <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-4 sm:p-5 shadow-xl shadow-emerald-500/50 flex items-center justify-center">
//             <Microscope className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
//           </div>
//           <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-100 bg-gradient-to-r from-emerald-200 via-green-100 to-green-200 bg-clip-text tracking-tight">
//             Research Domains
//           </h3>
//         </div>
        
//         {/* 👇 UPDATED: Clickable domain buttons with navigation */}
//         <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6">
//           <div className="flex gap-2 sm:gap-3 px-4 sm:px-6 flex-nowrap">
//             {researchDomains.map((domain, idx) => (
//               <Link
//                 key={idx}
//                 to={`/research?domain=${domain.id}`}
//                 className="group/domain px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm border border-green-400/50 shadow-lg hover:shadow-xl hover:scale-[1.05] hover:border-green-500/70 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-sm sm:text-base font-semibold text-white drop-shadow-lg flex items-center gap-2"
//               >
//                 {domain.name}
//                 <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/domain:opacity-100 group-hover/domain:translate-x-0 transition-all duration-300" />
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Mobile scroll hint */}
//         <p className="mt-4 text-xs text-gray-300 text-center sm:hidden font-medium">
//           👈 Swipe to explore all domains
//         </p>
//       </div>
//     </div>
//   )
// }

// export default VisionSection
// VisionSection.jsx
import React from 'react'
import { Leaf, Microscope, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  { id: 'carbon-footprint', name: 'Carbon Footprint' },
  { id: 'renewable-energy', name: 'Renewable Energy' },
  { id: 'soil-conservation', name: 'Soil Conservation' },
  { id: 'biodiversity', name: 'Biodiversity & Ecosystem' },
  { id: 'waste-management', name: 'Waste Management' },
  { id: 'water-pollution', name: 'Water Pollution' },
  { id: 'air-pollution', name: 'Air Pollution' },
  { id: 'urban-heat', name: 'Urban Heat Island Effect' },
]

const VisionSection = () => {
  return (
    <div className="w-full bg-white px-4 py-12 sm:py-16">

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {items.map((item, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                {item.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-500">
              {item.text}
            </p>
          </article>
        ))}
      </div>

      {/* Research Domains */}
      <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-9 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
            <Microscope className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            Research Domains
          </h3>
        </div>

        <div className="overflow-x-auto pb-2 -mx-4 sm:-mx-6">
          <div className="flex gap-2 px-4 sm:px-6 flex-nowrap">
            {researchDomains.map((domain, idx) => (
              <Link
                key={idx}
                to={`/research?domain=${domain.id}`}
                className="group/domain flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 hover:border-green-300 hover:text-green-800 transition-colors duration-200"
              >
                {domain.name}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/domain:opacity-100 group-hover/domain:translate-x-0 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-400 text-center sm:hidden">
          Swipe to explore all domains →
        </p>
      </div>

    </div>
  )
}

export default VisionSection