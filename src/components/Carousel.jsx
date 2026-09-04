import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

// Carrossel de fotos da página do Produto.
// - Imagem principal com setas de navegação e tira de miniaturas.
// - Suporte a teclado (setas esquerda/direita) e swipe por toque.
// - Ao clicar na imagem, abre um visualizador em tela cheia com
//   pinch-to-zoom (toque) e zoom por duplo clique/scroll (desktop).
export default function Carousel({ imagens = [], nomeProduto = 'Produto' }) {
  const [indice, setIndice] = useState(0)
  const [lightboxAberto, setLightboxAberto] = useState(false)
  const touchStartX = useRef(null)

  const lista = Array.isArray(imagens) && imagens.length > 0
    ? imagens
    : ['/fundos/fundoprincipal.jpg']

  // Garante que o índice nunca fique fora dos limites ao trocar de produto/cor
  useEffect(() => {
    setIndice(0)
  }, [lista.length, lista[0]])

  const irPara = (i) => setIndice((i + lista.length) % lista.length)
  const anterior = () => irPara(indice - 1)
  const proxima = () => irPara(indice + 1)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      delta > 0 ? anterior() : proxima()
    }
    touchStartX.current = null
  }

  // Navegação por teclado quando o lightbox está aberto
  useEffect(() => {
    if (!lightboxAberto) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proxima()
      if (e.key === 'Escape') setLightboxAberto(false)
    }
    window.addEventListener('keydown', onKeyDown)
    // Trava o scroll da página enquanto o lightbox está aberto
    const overflowOriginal = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowOriginal
    }
  }, [lightboxAberto, indice, lista.length])

  return (
    <div>
      {/* Imagem principal */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-card group"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => setLightboxAberto(true)}
          className="block w-full h-full cursor-zoom-in"
          aria-label="Ampliar imagem"
        >
          <img
            src={lista[indice]}
            alt={`${nomeProduto} - foto ${indice + 1} de ${lista.length}`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </button>

        {/* Ícone indicando que a imagem pode ser ampliada */}
        <div className="absolute bottom-4 right-4 bg-bgdark/70 text-white p-2 rounded-full pointer-events-none
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={18} />
        </div>

        {lista.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-bgdark/60 hover:bg-bgdark/80 text-white
                         p-2 rounded-full transition-all duration-300 ease-premium"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-bgdark/60 hover:bg-bgdark/80 text-white
                         p-2 rounded-full transition-all duration-300 ease-premium"
            >
              <ChevronRight size={22} />
            </button>

            {/* Contador de fotos */}
            <div className="absolute bottom-4 left-4 bg-bgdark/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {indice + 1} / {lista.length}
            </div>
          </>
        )}
      </div>

      {/* Tira de miniaturas */}
      {lista.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {lista.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === indice}
              className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ease-premium
                          ${i === indice ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img
                src={img}
                alt={`${nomeProduto} - miniatura ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {/* Visualizador em tela cheia */}
      {lightboxAberto && (
        <Lightbox
          imagens={lista}
          indice={indice}
          nomeProduto={nomeProduto}
          onFechar={() => setLightboxAberto(false)}
          onAnterior={anterior}
          onProxima={proxima}
        />
      )}
    </div>
  )
}

// Visualizador em tela cheia com zoom (duplo clique/scroll no desktop,
// pinça com dois dedos no toque) e arraste para navegar quando ampliado.
function Lightbox({ imagens, indice, nomeProduto, onFechar, onAnterior, onProxima }) {
  const [escala, setEscala] = useState(1)
  const pinchDistRef = useRef(null)

  // Volta ao zoom normal sempre que a foto muda
  useEffect(() => setEscala(1), [indice])

  const alternarZoom = () => setEscala((e) => (e > 1 ? 1 : 2))

  const onWheel = (e) => {
    e.preventDefault()
    setEscala((e2) => Math.min(3, Math.max(1, e2 + (e.deltaY < 0 ? 0.25 : -0.25))))
  }

  const distancia = (touches) => {
    const [a, b] = touches
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
  }

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchDistRef.current = distancia(e.touches)
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      const novaDist = distancia(e.touches)
      const delta = (novaDist - pinchDistRef.current) / 200
      setEscala((e2) => Math.min(3, Math.max(1, e2 + delta)))
      pinchDistRef.current = novaDist
    }
  }
  const onTouchEnd = (e) => {
    if (e.touches.length < 2) pinchDistRef.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-bgdark/95 flex items-center justify-center"
      style={{ touchAction: 'none' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onFechar}
        aria-label="Fechar"
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        <X size={24} />
      </button>

      {imagens.length > 1 && (
        <>
          <button
            type="button"
            onClick={onAnterior}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={onProxima}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <img
        src={imagens[indice]}
        alt={`${nomeProduto} - foto ${indice + 1} de ${imagens.length}, ampliada`}
        onClick={alternarZoom}
        onWheel={onWheel}
        className="max-w-[92vw] max-h-[86vh] object-contain cursor-zoom-in select-none transition-transform duration-300 ease-premium"
        style={{ transform: `scale(${escala})`, cursor: escala > 1 ? 'zoom-out' : 'zoom-in' }}
        draggable={false}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {indice + 1} / {imagens.length}
      </div>
    </div>
  )
}
