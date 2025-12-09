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
