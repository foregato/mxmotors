import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import produtos from '../data/produtos.json'
import { converterPrecoParaNumero } from '../utils/preco'

// Extrai valores únicos de um campo do array de produtos (remove nulos/undefineds)
const valoresUnicos = (campo) => 
  [...new Set(produtos.map((p) => p[campo]).filter(Boolean))].sort()

export default function Catalogo() {
  const [busca, setBusca] = useState('')
  const [cilindrada, setCilindrada] = useState('')
  const [estado, setEstado] = useState('')
  const [faixaPreco, setFaixaPreco] = useState('')
  const [marca, setMarca] = useState('')
  const [tracao, setTracao] = useState('')
  const [combustivel, setCombustivel] = useState('')
  const [ano, setAno] = useState('')

  // Filtra os produtos com base na busca + todos os filtros
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      // 1. Busca por nome
      const nomeCombina = p.nome.toLowerCase().includes(busca.toLowerCase())

      // 2. Filtros por atributos exatos (só entram na comparação quando selecionados)
      const cilindradaCombina = cilindrada ? p.cilindrada === cilindrada : true
      const estadoCombina = estado ? p.estado === estado : true
      const marcaCombina = marca ? p.marca === marca : true
      const tracaoCombina = tracao ? p.tracao === tracao : true
      const combustivelCombina = combustivel ? p.combustivel === combustivel : true
      const anoCombina = ano ? String(p.ano) === ano : true

      // 3. Filtro por Faixa de Preço
      let precoCombina = true
      const precoNum = converterPrecoParaNumero(p.preco)

      if (faixaPreco === 'ate-10k') {
        precoCombina = precoNum <= 10000
      } else if (faixaPreco === '10k-20k') {
        precoCombina = precoNum > 10000 && precoNum <= 20000
      } else if (faixaPreco === 'acima-20k') {
        precoCombina = precoNum > 20000
      }

      return nomeCombina && cilindradaCombina && estadoCombina && precoCombina
        && marcaCombina && tracaoCombina && combustivelCombina && anoCombina
    })
  }, [busca, cilindrada, estado, faixaPreco, marca, tracao, combustivel, ano])

  return (
    <>
      {/* Configuração de SEO da página Catálogo */}
      <SEO 
        title="Catálogo de Quadriciclos"
        description="Explore o catálogo completo de quadriciclos novos e usados na Quadrimotors & Cia em Campinas. Filtre por marca, valor, cilindrada e estado de conservação."
        canonical="https://quadrimotorsecia.com.br/catalogo"
      />

      <section className="container-app pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tightest2">Catálogo</h1>
          <p className="text-secondary mt-3 text-lg">Confira todos os quadriciclos disponíveis.</p>
        </motion.div>

        {/* Busca */}
        <SearchBar value={busca} onChange={setBusca} />

        {/* Grid de Filtros - só exibe filtros cujos atributos existem nos produtos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {/* Filtro de Marca */}
          <Select label="Marca" value={marca} onChange={setMarca} opcoes={valoresUnicos('marca')} />

          {/* Filtro de Cilindrada */}
          <Select label="Cilindrada" value={cilindrada} onChange={setCilindrada} opcoes={valoresUnicos('cilindrada')} />

          {/* Filtro de Condição (Estado: Novo / Usado) */}
          <Select label="Condição" value={estado} onChange={setEstado} opcoes={valoresUnicos('estado')} />

          {/* Filtro de Ano */}
          <Select label="Ano" value={ano} onChange={setAno} opcoes={valoresUnicos('ano').map(String)} />

          {/* Filtro de Tração */}
          <Select label="Tração" value={tracao} onChange={setTracao} opcoes={valoresUnicos('tracao')} />

          {/* Filtro de Combustível */}
          <Select label="Combustível" value={combustivel} onChange={setCombustivel} opcoes={valoresUnicos('combustivel')} />

          {/* Filtro de Faixa de Preço (faixas fixas, não vêm do catálogo) */}
          <select
            value={faixaPreco}
            onChange={(e) => setFaixaPreco(e.target.value)}
            className="bg-card border border-white/[0.08] rounded-2xl py-4 px-4 text-white
                       focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
          >
            <option value="">Faixa de Preço (todas)</option>
            <option value="ate-10k">Até R$ 10.000</option>
            <option value="10k-20k">De R$ 10.000 a R$ 20.000</option>
            <option value="acima-20k">Acima de R$ 20.000</option>
          </select>
        </div>

        {/* Grade de produtos */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-12">
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="text-secondary text-center mt-16">
            Nenhum quadriciclo encontrado com esses filtros.
          </p>
        )}
      </section>
    </>
  )
}

// Select reutilizável para os filtros dinâmicos
function Select({ label, value, onChange, opcoes }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-card border border-white/[0.08] rounded-2xl py-4 px-4 text-white
                 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
    >
      <option value="">{label} (todos)</option>
      {opcoes.map((op) => (
        <option key={op} value={op}>{op}</option>
      ))}
    </select>
  )
}
