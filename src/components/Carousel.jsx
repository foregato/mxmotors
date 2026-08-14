import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Carousel({ imagens = [] }) {
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const proxima = () => setIndex((i) => (i + 1) % imagens.length)
  const anterior = () => setIndex((i) => (i - 1 + imagens.length) % imagens.length)

  const openModal = (i) => {
    setModalIndex(i)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const modalNext = () => setModalIndex((i) => (i + 1) % imagens.length)
  const modalPrev = () => setModalIndex((i) => (i - 1 + imagens.length) % imagens.length)

  if (!imagens.length) return null

  return (
    <>
      {/* Carrossel principal */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-card border border-white/[0.06] cursor-zoom-in"
           onClick={() => openModal(index)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imagens[index]}
            src={imagens[index]}
            alt={`Foto ${index + 1}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {imagens.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); anterior(); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-bgdark/60 backdrop-blur-md hover:bg-accent text-white p-2.5 rounded-full transition-all duration-300">
              <ChevronLeft size={22} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); proxima(); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-bgdark/60 backdrop-blur-md hover:bg-accent text-white p-2.5 rounded-full transition-all duration-300">
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {imagens.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-accent w-6' : 'bg-white/40 w-1.5'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeModal}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-white z-50">
              <X size={40} />
            </button>

            <div className="relative w-full max-w-5xl px-4" onClick={e => e.stopPropagation()}>
              <motion.img
                key={imagens[modalIndex]}
                src={imagens[modalIndex]}
                alt="Imagem ampliada"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-h-[90vh] w-auto mx-auto object-contain rounded-xl"
              />

              {imagens.length > 1 && (
                <>
                  <button onClick={modalPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-accent text-white p-3 rounded-full">
                    <ChevronLeft size={28} />
                  </button>
                  <button onClick={modalNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-accent text-white p-3 rounded-full">
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
