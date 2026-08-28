import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftRight, X, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import ButtonWhatsapp from '../components/ButtonWhatsapp'
import produtos from '../data/produtos.json'
import especificacoes from '../data/especificacoes'
import { getImagemComparador } from '../data/comparadorImagens'

// Campos extras (fora da tabela de especificações padrão) que também
// entram na comparação, na ordem em que devem aparecer.
const camposExtras = [{ label: 'Preço', chave: 'preco' }]

export default function Comparador() {
  const [searchParams, setSearchParams] = useSearchParams()

  const idA = searchParams.get('a')
  const idB = searchParams.get('b')

  const produtoA = useMemo(() => produtos.find((p) => String(p.id) === idA) || null, [idA])
  const produtoB = useMemo(() => produtos.find((p) => String(p.id) === idB) || null, [idB])

  const selecionarSlot = (slot, produtoId) => {
    const novosParams = new URLSearchParams(searchParams)
    if (produtoId) {
      novosParams.set(slot, produtoId)
    } else {
      novosParams.delete(slot)
    }
    setSearchParams(novosParams)
  }

  const trocarModelo = (slot) => selecionarSlot(slot, null)

  return (
    <>
      <SEO
        title="Compare os modelos"
        description="Compare dois quadriciclos do catálogo Quadrimotors & Cia lado a lado: fotos, preço e especificações completas."
        canonical="https://quadrimotorsecia.com.br/comparar"
      />

      <section className="container-app pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tightest2">Compare os modelos</h1>
          <p className="text-secondary mt-3 text-lg">Escolha 2 quadriciclos do catálogo para ver as diferenças lado a lado.</p>
        </motion.div>

        {/* Passo 1: seleção de modelos (quando falta escolher A e/ou B) */}
        {(!produtoA || !produtoB) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SeletorSlot
              titulo="Modelo 1"
              produtoSelecionado={produtoA}
              excluirId={produtoB?.id}
              onSelecionar={(id) => selecionarSlot('a', id)}
            />
            <SeletorSlot
              titulo="Modelo 2"
              produtoSelecionado={produtoB}
              excluirId={produtoA?.id}
              onSelecionar={(id) => selecionarSlot('b', id)}
            />
          </div>
        )}

        {/* Passo 2: comparação completa */}
        {produtoA && produtoB && (
          <ComparacaoCompleta
            produtoA={produtoA}
            produtoB={produtoB}
            onTrocarA={() => trocarModelo('a')}
            onTrocarB={() => trocarModelo('b')}
          />
        )}

        <div className="mt-12">
          <Link to="/catalogo" className="btn-outline inline-flex">
            <ArrowLeft size={18} />
            Voltar ao catálogo
          </Link>
        </div>
      </section>
    </>
  )
}

// Card de seleção de um dos dois modelos a comparar
function SeletorSlot({ titulo, produtoSelecionado, excluirId, onSelecionar }) {
  const opcoes = produtos.filter((p) => p.id !== excluirId)

  if (produtoSelecionado) {
    return (
      <div className="card p-6 flex items-center gap-4">
        <img
          src={getImagemComparador(produtoSelecionado)}
          alt={produtoSelecionado.nome}
          className="w-24 h-24 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">{titulo}</p>
          <p className="font-semibold truncate">{produtoSelecionado.nome}</p>
          <p className="text-accent font-bold mt-1">{produtoSelecionado.preco}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelecionar(null)}
          aria-label="Remover seleção"
          className="p-2 text-secondary hover:text-accent transition duration-300"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <p className="text-secondary text-xs uppercase tracking-[0.15em] mb-3">{titulo}</p>
      <select
        defaultValue=""
        onChange={(e) => e.target.value && onSelecionar(e.target.value)}
        className="w-full bg-card border border-white/[0.08] rounded-2xl py-4 px-4 text-white
                   focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
      >
        <option value="">Selecione um quadriciclo...</option>
        {opcoes.map((p) => (
          <option key={p.id} value={p.id}>{p.nome} — {p.preco}</option>
        ))}
      </select>
    </div>
  )
}

// Comparação lado a lado, com destaque para diferenças
function ComparacaoCompleta({ produtoA, produtoB, onTrocarA, onTrocarB }) {
  const linhas = [...especificacoes, ...camposExtras]

  const whatsappMensagem = `Olá, estou comparando o ${produtoA.nome} com o ${produtoB.nome} e gostaria de mais informações.`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cabeçalho com foto, nome e preço dos dois produtos */}
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <CabecalhoProduto produto={produtoA} onTrocar={onTrocarA} />
        <CabecalhoProduto produto={produtoB} onTrocar={onTrocarB} />
      </div>

      {/* Tabela de comparação - com scroll horizontal em telas menores */}
      <div className="card mt-8 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <tbody>
            {linhas.map(({ label, chave }, i) => {
              const valorA = produtoA[chave] ?? '—'
              const valorB = produtoB[chave] ?? '—'
              const diferente = String(valorA) !== String(valorB)

              return (
                <tr key={chave} className={i !== linhas.length - 1 ? 'border-b border-white/[0.06]' : ''}>
                  <td className="py-4 px-5 text-secondary text-xs uppercase tracking-[0.1em] w-1/4 whitespace-nowrap">
                    {label}
                  </td>
                  <td className={`py-4 px-5 font-medium ${diferente ? 'text-accent bg-accent/5' : ''}`}>
                    {valorA}
                  </td>
                  <td className={`py-4 px-5 font-medium ${diferente ? 'text-accent bg-accent/5' : ''}`}>
                    {valorB}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-secondary/70 text-xs mt-3">
        Campos em destaque indicam diferenças entre os dois modelos.
      </p>

      {/* CTA final para WhatsApp */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <ButtonWhatsapp
          mensagem={whatsappMensagem}
          texto="Falar sobre esses modelos"
          className="btn-primary w-full sm:w-auto text-lg py-5 px-10"
        />
      </div>
    </motion.div>
  )
}

function CabecalhoProduto({ produto, onTrocar }) {
  const isVendido = produto.vendido === true || produto.vendido === 'true'

  return (
    <div className="card p-4 md:p-6 flex flex-col items-center text-center relative">
      {isVendido && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-md">
          VENDIDO
        </div>
      )}
      <img
        src={getImagemComparador(produto)}
        alt={produto.nome}
        className="w-full aspect-[4/3] object-cover rounded-xl"
      />
      <Link to={`/produto/${produto.slug}`} className="font-semibold mt-4 hover:text-accent transition duration-300 line-clamp-2">
        {produto.nome}
      </Link>
      <p className="text-accent font-bold text-lg md:text-xl mt-1">{produto.preco}</p>

      <button
        type="button"
        onClick={onTrocar}
        className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-accent transition duration-300"
      >
        <ArrowLeftRight size={14} />
        Trocar modelo
      </button>
    </div>
  )
}
