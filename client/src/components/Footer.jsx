import React from 'react'
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full border-t border-green-900 pt-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-400">Green Pulse</h3>
        </div>

        <div className="flex items-center gap-4 text-xl text-neutral-200">
          <a href="https://www.instagram.com/greenpulse_sjce/" aria-label="Instagram" className="hover:text-green-400">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-green-400">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-green-400">
            <FaGithub />
          </a>
          <a href="mailto:club@example.com" aria-label="Email" className="hover:text-green-400">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
