// // src/components/Navbar.jsx - FIXED Events navigation
// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { User, LogOut } from 'lucide-react'
// import Logo from '../assets/GP.png'

// const scrollToId = (id) => {
//   const el = document.getElementById(id)
//   if (el) el.scrollIntoView({ behavior: 'smooth' })
// }

// const links = [
//   { id: 'home', label: 'Home', isRoute: false },
//   { id: 'events', label: 'Events', path: '/events' },
//   { id: 'announcements', label: 'Announcements', path: '/announcements' },
//   { id: 'blogs', label: 'Blogs', path: '/blogs' },
//   { id: 'projects', label: 'Projects', path: '/projects' },
// ]

// const Navbar = () => {
//   const [open, setOpen] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     setIsLoggedIn(!!token)
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     setIsLoggedIn(false)
//     navigate('/')
//     window.location.reload()
//   }

//   // 👈 NEW: Smart link handler
//   const handleLinkClick = (link) => {
//     if (link.path) {
//       // Route-based navigation (Events)
//       navigate(link.path)
//     } else {
//       // Scroll-based navigation
//       scrollToId(link.id)
//     }
//     setOpen(false)
//   }

//   return (
//     <header className="w-full border-b border-green-900 bg-green-950/95 sticky top-0 z-50 backdrop-blur-sm">
//       <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
//         {/* Left: logo + name */}
//         <div className="flex items-center gap-3">
//           <img
//             src={Logo}
//             alt="Green Pulse logo"
//             className="h-11 w-11 rounded-full object-cover shadow-md shadow-green-900/50"
//           />
//           <span className="text-lg font-semibold tracking-wide text-green-50">
//             Green Pulse
//           </span>
//         </div>

//         {/* Desktop nav */}
//         <div className="hidden items-center gap-6 text-sm font-medium md:flex">
//           {links.map((link) => (
//             <button
//               key={link.id}
//               className="text-green-100 underline-offset-4 hover:text-green-300 hover:underline transition-all"
//               onClick={() => handleLinkClick(link)}
//             >
//               {link.label}
//             </button>
//           ))}
          
//           {/* Conditional Rendering: Login vs User Profile */}
//           {isLoggedIn ? (
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-green-100 bg-green-900/50 px-3 py-1.5 rounded-full border border-green-800">
//                 <User className="w-4 h-4" />
//                 <span className="text-xs">Logged in</span>
//               </div>
//               <button 
//                 onClick={handleLogout}
//                 className="text-green-300 hover:text-red-400 transition-colors"
//                 title="Logout"
//               >
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           ) : (
//             <Link 
//               to="/login"
//               className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-500 hover:shadow-green-500/20 transition-all duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile hamburger */}
//         <button
//           className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-green-700 text-green-100 md:hidden hover:bg-green-900/50"
//           onClick={() => setOpen((prev) => !prev)}
//           aria-label="Toggle menu"
//         >
//           <span className="space-y-1.5">
//             <span className={`block h-0.5 w-5 bg-green-100 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`block h-0.5 w-5 bg-green-100 transition-opacity ${open ? 'opacity-0' : ''}`}></span>
//             <span className={`block h-0.5 w-5 bg-green-100 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </span>
//         </button>
//       </nav>

//       {/* Mobile menu panel */}
//       {open && (
//         <div className="border-t border-green-900 bg-green-950 md:hidden animate-in slide-in-from-top-2">
//           <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
//             {links.map((link) => (
//               <button
//                 key={link.id}
//                 className="w-full rounded-md px-2 py-2 text-left text-sm text-green-100 hover:bg-green-900/50 transition-colors"
//                 onClick={() => handleLinkClick(link)}
//               >
//                 {link.label}
//               </button>
//             ))}
            
//             {/* Mobile Login/Logout Logic */}
//             {isLoggedIn ? (
//               <button 
//                 onClick={handleLogout}
//                 className="mt-2 block w-full rounded-md bg-red-900/50 border border-red-800 px-3 py-2 text-center text-sm font-semibold text-red-200 hover:bg-red-900"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link 
//                 to="/login"
//                 onClick={() => setOpen(false)}
//                 className="mt-2 block w-full rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-500"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }

// export default Navbar;
// src/components/Navbar.jsx
// CHANGE: Added 'Team Members' to links array (isRoute: true, path: '/team')
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import Logo from '../assets/GP.png'

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const links = [
  { id: 'home', label: 'Home', isRoute: false },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'announcements', label: 'Announcements', path: '/announcements' },
  { id: 'blogs', label: 'Blogs', path: '/blogs' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'team', label: 'Team Members', path: '/team' }, // 👈 NEW
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
    window.location.reload()
  }

  const handleLinkClick = (link) => {
    if (link.path) {
      navigate(link.path)
    } else {
      scrollToId(link.id)
    }
    setOpen(false)
  }

  return (
    <header className="w-full border-b border-green-900 bg-green-950/95 sticky top-0 z-50 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: logo + name */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Green Pulse logo"
            className="h-11 w-11 rounded-full object-cover shadow-md shadow-green-900/50"
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
              className="text-green-100 underline-offset-4 hover:text-green-300 hover:underline transition-all"
              onClick={() => handleLinkClick(link)}
            >
              {link.label}
            </button>
          ))}

          {/* Conditional Rendering: Login vs User Profile */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-100 bg-green-900/50 px-3 py-1.5 rounded-full border border-green-800">
                <User className="w-4 h-4" />
                <span className="text-xs">Logged in</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-green-300 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-500 hover:shadow-green-500/20 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-green-700 text-green-100 md:hidden hover:bg-green-900/50"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-green-100 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-green-100 transition-opacity ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-green-100 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-green-900 bg-green-950 md:hidden animate-in slide-in-from-top-2">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <button
                key={link.id}
                className="w-full rounded-md px-2 py-2 text-left text-sm text-green-100 hover:bg-green-900/50 transition-colors"
                onClick={() => handleLinkClick(link)}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Login/Logout Logic */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="mt-2 block w-full rounded-md bg-red-900/50 border border-red-800 px-3 py-2 text-center text-sm font-semibold text-red-200 hover:bg-red-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-2 block w-full rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar