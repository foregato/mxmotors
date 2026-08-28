import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, GitCompare } from 'lucide-react'
import ColorSelector from './ColorSelector'

// Card vertical de um quadriciclo - usado no Catálogo, Home e Comparador
export default function ProductCard({ produto }) {
  const isVendido = produto.vendido === true || produto.vendido === "true"
  const temCores = Array.isArray(produto.cores) && produto.cores.length > 1

  // Cor selecionada no card (não navega para outra página - só troca a imagem
  // exibida). Começa sempre pela primeira cor cadastrada no produto.
  const [corSelecionada, setCorSelecionada] = useState(produto.cores?.[0]?.nome)

  const corAtual = temCores
    ? produto.cores.find((c) => c.nome === corSelecionada) || produto.cores[0]
    : null

  const imagemAtual = corAtual?.imagens?.[0] || produto.imagens[0]

  // Link de detalhes carrega a cor escolhida no card via query string,
  // para a página de produto abrir já na cor certa.
  const linkDetalhes = temCores
    ? `/produto/${produto.slug}?cor=${encodeURIComponent(corAtual.nome)}`
    : `/produto/${produto.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card group overflow-hidden flex flex-col relative"
    >
      {/* Badge de VENDIDO - prioridade máxima */}
      {isVendido ? (
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full shadow-md z-20">
          VENDIDO
        </div>
      ) : (produto.badge || produto.parcelaPromo) && (
        /* Badges empilhados: badge original (Oportunidade, etc) + info de parcelamento promocional */
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
          {produto.badge && (
            <span className="bg-accent text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full shadow-md">
              {produto.badge}
            </span>
          )}
          {produto.parcelaPromo && (
            <span className="bg-bgdark/90 text-accent border border-accent/40 text-xs font-bold tracking-wide px-4 py-1.5 rounded-full shadow-md">
              {produto.parcelaPromo}
            </span>
          )}
        </div>
      )}

      {/* Imagem como protagonista — leve zoom no hover, sem deslocar o layout */}
      <Link to={linkDetalhes} className="block overflow-hidden">
        <img
          src={imagemAtual}
          alt={temCores ? `${produto.nome} - ${corAtual.nome}` : produto.nome}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          className={`w-full aspect-[4/3] object-cover transition-transform duration-700 ease-premium
            group-hover:scale-[1.05] ${isVendido ? 'opacity-75' : ''}`}
        />
      </Link>

      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-lg leading-snug tracking-tight">{produto.nome}</h3>

        <div className="flex items-center gap-3 text-sm text-secondary/90">
          <span>{produto.ano}</span>
          <span className="w-1 h-1 rounded-full bg-secondary/40" />
          <span>{produto.cilindrada}</span>
        </div>

        {/* Seletor de cores — troca a imagem exibida no card sem sair da página */}
        {temCores && (
          <div className="flex items-center gap-2 mt-1">
            <ColorSelector
              cores={produto.cores}
              corSelecionada={corAtual.nome}
              onSelect={setCorSelecionada}
              size="sm"
            />
            <span className="text-xs text-secondary/70">{corAtual.nome}</span>
          </div>
        )}

        {produto.precoAntigo && (
          <p className="text-secondary/60 text-sm line-through mt-2">{produto.precoAntigo}</p>
        )}
        <p className={`text-accent font-bold text-2xl tracking-tight ${produto.precoAntigo ? 'mt-0.5' : 'mt-2'}`}>{produto.preco}</p>

        <Link
          to={linkDetalhes}
          className="mt-4 inline-flex items-center justify-between gap-2 w-full text-sm font-semibold
                     border-t border-white/[0.08] pt-4 text-white/90 group-hover:text-accent transition duration-300"
        >
          Ver detalhes
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          to={`/comparar?a=${produto.id}`}
          className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold
                     text-secondary hover:text-accent transition duration-300"
        >
          <GitCompare size={15} />
          Comparar este modelo
        </Link>

        {isVendido && (
          <p className="text-red-400 text-xs text-center mt-1">
            Produto vendido • Sob encomenda
          </p>
        )}
      </div>
    </motion.div>
  )
}
