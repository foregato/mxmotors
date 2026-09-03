import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import ButtonWhatsapp from './ButtonWhatsapp'

// Variants de entrada escalonada — título, subtítulo e botões aparecem em sequência,
// reforçando a hierarquia visual sem depender de mais de uma animação por elemento.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// Seção de abertura da Home - foto em tela cheia + overlay + título + CTAs.
// Navbar fica transparente sobre esta seção (ver Navbar.jsx).
export default function Hero() {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax leve: a imagem se move um pouco mais devagar que o scroll.
  // Desativado automaticamente se o usuário preferir menos movimento.
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '18%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full flex items-end overflow-hidden">
      {/* Foto de fundo do quadriciclo */}
      <motion.img
        src="/fundos/fundoprincipal.jpg"
        alt="Quadriciclo em trilha de aventura"
        fetchpriority="high"
        decoding="async"
        style={{ y }}
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
      {/* Overlay escuro para dar contraste ao texto, intensifica levemente ao rolar */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-bgdark via-bgdark/50 to-bgdark/10"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative container-app pb-20 md:pb-28"
      >
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] tracking-tightest2 max-w-3xl"
        >
          Encontre o quadriciclo ideal para qualquer aventura.
        </motion.h1>
        <motion.p variants={item} className="text-secondary text-lg md:text-xl mt-6 max-w-xl font-light">
          Modelos novos e seminovos, com procedência garantida e atendimento especializado.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/catalogo" className="btn-primary">
            Ver Catálogo <ArrowRight size={20} />
          </Link>
          <ButtonWhatsapp className="btn-outline" />
        </motion.div>
      </motion.div>

      {/* Indicador discreto de scroll — reforça a navegação fluida */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 text-secondary/70 text-xs uppercase tracking-[0.2em]"
      >
        Role
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  )
}
