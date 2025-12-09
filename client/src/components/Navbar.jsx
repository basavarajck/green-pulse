import React, { useState } from 'react'
import Logo from '../assets/GP.png'

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const links = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Events' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'projects', label: 'Projects' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleClick = (id) => {
    scrollToId(id)
    setOpen(false)
  }

  return (
    <header className="w-full border-b border-green-900 bg-green-950/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: logo + name */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Green Pulse logo"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="text-lg font-semibold tracking-wide text-green-50">
            Green Pulse
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              className="text-green-100 underline-offset-4 hover:text-green-300 hover:underline"
              onClick={() => handleClick(link.id)}
            >
              {link.label}
            </button>
          ))}
          <button className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white">
            Login
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-green-700 text-green-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {/* simple hamburger icon */}
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-green-100"></span>
            <span className="block h-0.5 w-5 bg-green-100"></span>
            <span className="block h-0.5 w-5 bg-green-100"></span>
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-green-900 bg-green-950 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <button
                key={link.id}
                className="w-full rounded-md px-2 py-2 text-left text-sm text-green-100 hover:bg-green-900"
                onClick={() => handleClick(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button className="mt-2 w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
