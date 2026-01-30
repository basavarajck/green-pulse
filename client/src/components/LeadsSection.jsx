import React from 'react'
import president from "../assets/leads photos/pawan.jpg"
import generalSecretary from "../assets/leads photos/admin.jpg"
import vicePresident from "../assets/leads photos/vp.jpg"
import techLead from "../assets/leads photos/Tech lead.jpg"
import tresurer from "../assets/leads photos/admin1.jpg"
import eventsLead from "../assets/leads photos/events lead.jpg"
import designLead from "../assets/leads photos/design lead.webp"
const leads = [
  {
    name: 'Pawan Revankar',
    role: 'Founder and Chairperson',
    photo: president,
  },
  {
    name: 'Vaibhav N S',
    role: 'Vice President',
    photo: vicePresident,
  },
  {
    name: 'Aniruddha S',
    role: 'General Secretary',
    photo: generalSecretary,
  },
  {
    name: 'Prateek N Vasista',
    role: 'Tresurer',
    photo: tresurer,
  },
  {
    name: 'Manya V',
    role: 'Events Lead',
    photo: eventsLead,
  },
  {
    name: 'H Vinayak Kamath',
    role: 'Technical Lead',
    photo: techLead,
  },
  {
    name: 'Pranav G N',
    role: 'Design Lead',
    photo: designLead,
  },
]

const LeadsSection = () => {
  return (
    <div className="w-full text-neutral-100">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold text-white">Club leads</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          Leads who keep the projects running, events organised, and
          collaborations smooth.
        </p>
      </div>

      {/* 3 per row on large screens */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {leads.map((lead, index) => (
          <article
            key={`${lead.name}-${index}`}
            className="flex flex-col overflow-hidden rounded-2xl border border-green-800 bg-neutral-950"
          >
            {/* Top: image */}
            <div className="h-56 w-full bg-neutral-800">
              <img
                src={lead.photo}
                alt={lead.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Bottom: text */}
            <div className="flex flex-1 flex-col px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                {lead.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-green-300">
                {lead.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default LeadsSection
