import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import Carousel from '../components/Carousel'
import ColorSelector from '../components/ColorSelector'
import ButtonWhatsapp from '../components/ButtonWhatsapp'
import SimuladorCompra from '../components/SimuladorCompra'
import produtos from '../data/produtos.json'
import especificacoes from '../data/especificacoes'

// Entrada suave e escalonada para os blocos da página — reforça a leitura
// em camadas (imagem → título/preço → specs → descrição → CTA).
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Produto() {
  const { id } = useParams()
  const produto = produtos.find((p) => String(p.id) === id)
  const [searchParams, setSearchParams] = useSearchParams()

  const temCores = Array.isArray(produto?.cores) && produto.cores.length > 1

  // Cor selecionada: prioriza a que vier na URL (?cor=Vermelho), útil para
  // compartilhar o link já com a cor certa; cai para a primeira cor cadastrada.
  const corDaUrl = searchParams.get('cor')
  const corSelecionada = temCores
    ? produto.cores.find((c) => c.nome === corDaUrl)?.nome || produto.cores[0].nome
    : null

  const corAtual = temCores
    ? produto.cores.find((c) => c.nome === corSelecionada)
    : null

  const selecionarCor = (nome) => {
    const novosParams = new URLSearchParams(searchParams)
    novosParams.set('cor', nome)
    setSearchParams(novosParams, { replace: true })
  }

  // Caso o produto não seja encontrado pelo ID
  if (!produto) {
    return (
      <>
        <SEO 
          title="Produto não encontrado" 
          description="O quadriciclo procurado não foi encontrado em nosso catálogo."
        />
        <section className="container-app pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Quadriciclo não encontrado</h1>
          <Link to="/catalogo" className="btn-primary inline-flex">Voltar ao catálogo</Link>
        </section>
      </>
    )
  }

  const isVendido = produto.vendido === true || produto.vendido === "true"
  const imagensExibidas = corAtual?.imagens || produto.imagens

  // Trata o preço do produto para o formato numérico do Schema ("12990.00")
  const precoNumerico = typeof produto.preco === 'string'
    ? produto.preco.replace(/[^\d,. ]/g, '').replace(/\./g, '').replace(',', '.')
    : String(produto.preco || '0.00')

  // Schema de Produto (Passo 4 - JSON-LD)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": produto.nome,
    "description": produto.descricao || `${produto.nome} (${produto.estado})`,
    "image": imagensExibidas || [],
    "sku": String(produto.id),
    "brand": {
      "@type": "Brand",
      "name": produto.marca || "Quadrimotors"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": precoNumerico,
      "availability": isVendido 
        ? "https://schema.org/OutOfStock" 
        : "https://schema.org/InStock",
      "url": `https://quadrimotorsecia.com.br/produto/${produto.id}`,
      "seller": {
        "@type": "Organization",
        "name": "Quadrimotors & Cia"
      }
    }
  }

  return (
    <>
      {/* SEO Dinâmico: Preenche as tags do Google com os dados deste quadriciclo específico */}
      <SEO 
        title={produto.nome}
        description={`${produto.nome} (${produto.estado}) por ${produto.preco} na Quadrimotors & Cia em Campinas. ${produto.descricao ? produto.descricao.slice(0, 100) : ''}`}
        canonical={`https://quadrimotorsecia.com.br/produto/${produto.id}`}
        image={imagensExibidas && imagensExibidas.length > 0 ? imagensExibidas[0] : undefined}
        type="product"
      />

      {/* Injeção dos dados estruturados do produto (Passo 4 - JSON-LD) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <section className="container-app pt-32 pb-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Carousel key={corSelecionada || produto.id} imagens={imagensExibidas} />
        </motion.div>

        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}
          className="mt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tightest2">{produto.nome}</h1>
            
            <div className="flex items-center gap-3 mt-3">
              <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full
                ${produto.estado === 'Novo' ? 'bg-accent/15 text-accent' : 'bg-white/10 text-secondary'}`}>
                {produto.estado}
              </span>
              
              {isVendido && (
                <span className="inline-block text-sm font-bold px-5 py-1.5 bg-red-600 text-white rounded-full shadow-md">
                  VENDIDO
                </span>
              )}
            </div>

            {/* Seletor de cores da página de detalhes */}
            {temCores && (
              <div className="flex items-center gap-3 mt-5">
                <ColorSelector
                  cores={produto.cores}
                  corSelecionada={corSelecionada}
                  onSelect={selecionarCor}
                  size="md"
                />
                <span className="text-sm text-secondary">Cor: <span className="text-white font-medium">{corSelecionada}</span></span>
              </div>
            )}
          </div>
          <div>
            {produto.precoAntigo && (
              <p className="text-secondary/60 text-lg line-through">{produto.precoAntigo}</p>
            )}
            <p className="text-accent font-extrabold text-3xl md:text-4xl tracking-tight">{produto.preco}</p>
          </div>
        </motion.div>

        {/* Mensagem clara para produto vendido */}
        {isVendido && (
          <div className="mt-6 p-6 bg-red-600/10 border border-red-600/20 rounded-2xl">
            <p className="text-red-400 font-semibold text-lg">
              Este modelo já foi vendido.
            </p>
            <p className="text-secondary mt-1">
              Podemos trazer uma unidade igual ou similar sob encomenda. 
              Entre em contato para mais informações e prazo de entrega.
            </p>
          </div>
        )}

        {/* Tabela de especificações */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="card mt-10 p-7 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4"
        >
          {especificacoes.map(({ label, chave }) => (
            <div key={chave}>
              <p className="text-secondary text-xs uppercase tracking-[0.15em]">{label}</p>
              <p className="font-medium mt-1.5">
                {chave === 'cor' && temCores ? corSelecionada : produto[chave]}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Simulador de compra/preço */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
        >
          <SimuladorCompra preco={produto.preco} />
        </motion.div>

        {/* Descrição completa */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="mt-10 max-w-3xl"
        >
          <h2 className="text-xl font-semibold mb-3">Descrição</h2>
          <p className="text-secondary leading-relaxed">{produto.descricao}</p>
        </motion.div>

        {/* Botões de interesse e comparação */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <ButtonWhatsapp
            mensagem={`Olá, tenho interesse no ${produto.nome}${temCores ? ` na cor ${corSelecionada}` : ''} ${isVendido ? '(já foi vendido - quero solicitar uma unidade similar)' : ''}`}
            texto={isVendido ? "Solicitar Unidade Similar" : "Tenho Interesse"}
            className="btn-primary w-full sm:w-auto text-lg py-5 px-10"
          />
          <Link
            to={`/comparar?a=${produto.id}`}
            className="btn-outline w-full sm:w-auto text-lg py-5 px-10"
          >
            Comparar com outro modelo
          </Link>
        </div>
      </section>
    </>
  )
}