import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

// Distância euclidiana entre os dois dedos de um gesto de pinça
const getTouchDistance = (touches) => {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

export default function Carousel({ imagens = [] }) {
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  // Zoom/pan da imagem dentro do visualizador em tela cheia (isolado da página)
  const [zoomScale, setZoomScale] = useState(1)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const pinchStartDist = useRef(null)
  const pinchStartScale = useRef(1)
  const panStart = useRef(null)
  const panStartPos = useRef({ x: 0, y: 0 })

  const resetZoom = () => {
    setZoomScale(1)
    setZoomPos({ x: 0, y: 0 })
  }

  const proxima = () => setIndex((i) => (i + 1) % imagens.length)
  const anterior = () => setIndex((i) => (i - 1 + imagens.length) % imagens.length)

  const openModal = (i) => {
    resetZoom()
    setModalIndex(i)
    setIsOpen(true)
  }

  const closeModal = () => {
    resetZoom()
    setIsOpen(false)
  }

  // Handlers de toque isolados ao visualizador — não afetam a página normal
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchStartDist.current = getTouchDistance(e.touches)
      pinchStartScale.current = zoomScale
    } else if (e.touches.length === 1 && zoomScale > 1) {
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      panStartPos.current = zoomPos
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      e.preventDefault()
      const newDist = getTouchDistance(e.touches)
      const nextScale = Math.min(
        Math.max((newDist / pinchStartDist.current) * pinchStartScale.current, 1),
        4
      )
      setZoomScale(nextScale)
    } else if (e.touches.length === 1 && panStart.current && zoomScale > 1) {
      e.preventDefault()
      const dx = e.touches[0].clientX - panStart.current.x
      const dy = e.touches[0].clientY - panStart.current.y
      setZoomPos({ x: panStartPos.current.x + dx, y: panStartPos.current.y + dy })
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) pinchStartDist.current = null
    if (e.touches.length === 0) {
      panStart.current = null
      if (zoomScale <= 1) resetZoom()
    }
  }

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            style={{ touchAction: 'none' }}
            onClick={closeModal}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-white z-50">
              <X size={40} />
            </button>

            <div
              className="relative w-full max-w-5xl px-4 overflow-hidden"
              style={{ touchAction: 'none' }}
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
                style={{
                  transform: `translate(${zoomPos.x}px, ${zoomPos.y}px) scale(${zoomScale})`,
                  transition: pinchStartDist.current || panStart.current ? 'none' : 'transform 0.2s ease-out',
                  touchAction: 'none',
                }}
                className="max-h-[90vh] w-auto mx-auto object-contain rounded-xl select-none"
              />

              {imagens.length > 1 && zoomScale === 1 && (
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
