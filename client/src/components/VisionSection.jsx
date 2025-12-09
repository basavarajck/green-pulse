import React from 'react'

const items = [
  {
    title: 'Vision',
    text: 'To foster a culture of environmental consciousness, sustainability, and innovation among students and faculty, contributing to a greener and more responsible future.',
  },
  {
    title: 'Mission',
    text: 'To serve as a central hub for students who are passionate about environmental stewardship, enabling them to initiate and participate in projects, workshops, awareness drives, and collaborations that benefit both nature and society.',
  },
  {
    title: 'Objectives',
    text: 'Spread Awareness in Simple ways, use what we learn to help the planet and make our campus a little greener.',
  },
]

const VisionSection = () => {
  return (
    <div className="w-full">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Why Green Pulse exists
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          This club is for people who like building things and care about where
          they live. Everything we do is grounded in campus problems, not just
          slides and talks.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
            {items.map((item) => (
                <article
                key={item.title}
                className="flex min-h-[220px] flex-col rounded-2xl border border-green-200 bg-green-50 px-6 py-6 shadow-sm"
                >
                <h3 className="text-lg font-semibold text-green-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-green-900/90">
                    {item.text}
                </p>
                </article>
            ))}
      </div>

    </div>
  )
}

export default VisionSection
