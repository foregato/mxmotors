import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/fundopretologobranca.png'

const links = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/comparar', label: 'Comparar' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-premium
        ${scrolled
          ? 'bg-bgdark/70 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'}`}
    >
      <nav className={`container-app flex items-center justify-between transition-all duration-500 ease-premium
        ${scrolled ? 'h-16' : 'h-20 md:h-24'}`}>
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <img
            src={logo}
            alt="Quadrimotors & Cia"
            className={`transition-all duration-500 ease-premium ${scrolled ? 'h-11' : 'h-14 md:h-16'}`}
          />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition duration-300 ${
                    isActive ? 'text-accent' : 'text-white/90 hover:text-accent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botão hambúrguer */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menu mobile - Vidro Líquido */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden flex flex-col gap-1 px-5 pb-6 pt-1
                       bg-black/40 backdrop-blur-2xl
                       border-b border-white/10
                       shadow-[0_8px_32px_rgba(0,0,0,0.45)]
                       overflow-hidden"
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3.5 px-4 rounded-xl text-[17px] font-medium transition-all duration-300
                     ${isActive
                       ? 'text-accent bg-white/10'
                       : 'text-white/90 hover:bg-white/8 hover:text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}