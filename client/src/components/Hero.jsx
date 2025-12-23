import React from 'react'
  
const Hero = () => {
  return (
    <main className="flex flex-1 items-center py-10">
      <div className="space-y-6 px-2 text-green-50 md:px-0 md:max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300">
          College Eco-Tech Club
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Green Pulse
        </h1>
        <h2 className="text-lg font-medium text-green-200 md:text-xl">
          Tech that actually cares for nature.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-green-100/90 md:text-base">
          Green Pulse blends hardware, software, and on-ground initiatives to turn
          campus sustainability problems into real, trackable projects.
        </p>

        <div className="flex gap-4 pt-2">
          <button
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-green-950 cursor-pointer"
            onClick={() =>
              document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            See upcoming events
          </button>
          <button
            className="rounded-md border border-green-400 px-4 py-2 text-sm font-medium text-green-100 cursor-pointer"
             onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Know more
          </button>
        </div>
      </div>
    </main>
  )
}

export default Hero
// import React, { useEffect, useRef } from 'react'

// const LiquidEffectAnimation = () => {
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     if (!canvasRef.current) return

//     const script = document.createElement("script")
//     script.type = "module"
//     script.textContent = `
//       import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
//       const canvas = document.getElementById('liquid-canvas');
//       if (canvas) {
//         const app = LiquidBackground(canvas, { 
//           alpha: true,
//           antialias: true 
//         });
        
//         // Use a white/light image for white ripples
//         app.loadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200');
        
//         // Maximum brightness for white ripples
//         app.liquidPlane.material.metalness = 1.0;
//         app.liquidPlane.material.roughness = 0.0;
//         app.liquidPlane.material.opacity = 0.5;
//         app.liquidPlane.material.transparent = true;
        
//         // Pure white emissive glow
//         if (app.liquidPlane.material.emissive) {
//           app.liquidPlane.material.emissive.setRGB(1, 1, 1);
//           app.liquidPlane.material.emissiveIntensity = 3;
//         }
        
//         // Strong displacement for visible ripples
//         app.liquidPlane.uniforms.displacementScale.value = 12;
        
//         app.setRain(false);
        
//         // Transparent background
//         if (app.renderer) {
//           app.renderer.setClearColor(0x000000, 0);
//           app.renderer.alpha = true;
//         }
        
//         window.__liquidApp = app;
//         console.log('White liquid ripples loaded');
//       }
//     `

//     document.body.appendChild(script)

//     return () => {
//       if (window.__liquidApp && window.__liquidApp.dispose) {
//         window.__liquidApp.dispose()
//       }
//       if (document.body.contains(script)) {
//         document.body.removeChild(script)
//       }
//     }
//   }, [])

//   return (
//     <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
//       <canvas 
//         ref={canvasRef} 
//         id="liquid-canvas" 
//         className="w-full h-full"
//         style={{ 
//           mixBlendMode: 'screen',
//           filter: 'brightness(1.5) saturate(0)',
//           opacity: 0.6
//         }}
//       />
//     </div>
//   )
// }

// const Hero = () => {
//   return (
//     <div className="relative flex flex-1 items-center py-10">
//       <LiquidEffectAnimation />
      
//       <div className="relative z-10 space-y-6 px-2 text-green-50 md:px-0 md:max-w-2xl">
//         <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300">
//           College Eco-Tech Club
//         </p>
//         <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
//           Green Pulse
//         </h1>
//         <h2 className="text-lg font-medium text-green-200 md:text-xl">
//           Tech that actually cares for nature.
//         </h2>
//         <p className="max-w-xl text-sm leading-relaxed text-green-100/90 md:text-base">
//           Green Pulse blends hardware, software, and on-ground initiatives to turn
//           campus sustainability problems into real, trackable projects.
//         </p>

//         <div className="flex gap-4 pt-2">
//           <button
//             className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-green-950 cursor-pointer hover:bg-green-400 transition-colors"
//             onClick={() =>
//               document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
//             }
//           >
//             See upcoming events
//           </button>
//           <button
//             className="rounded-md border border-green-400 px-4 py-2 text-sm font-medium text-green-100 cursor-pointer hover:bg-green-800/50 transition-colors"
//             onClick={() =>
//               document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
//             }
//           >
//             Know more
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero
