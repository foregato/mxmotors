import { ShieldCheck, Headset, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import ButtonWhatsapp from '../components/ButtonWhatsapp'
import produtos from '../data/produtos.json'

// Diferenciais exibidos em cards na Home - edite textos/ícones aqui
const diferenciais = [
  { icon: ShieldCheck, titulo: 'Procedência garantida', texto: 'Todos os quadriciclos passam por vistoria completa antes da venda.' },
  { icon: Headset, titulo: 'Atendimento especializado', texto: 'Equipe pronta para te ajudar a escolher o modelo certo.' },
  { icon: Lock, titulo: 'Compra segura', texto: 'Documentação transparente e negociação sem burocracia.' },
]

// Schema em formato JSON-LD do negócio local (Passo 4)
const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Quadrimotors & Cia",
  "url": "https://quadrimotorsecia.com.br",
  "telephone": "+5519994075246",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Cairi, 213",
    "addressLocality": "Campinas",
    "addressRegion": "SP",
    "postalCode": "13056-210",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -22.9,
    "longitude": -47.0
  },
  "sameAs": [
    "https://www.instagram.com/quadrimotors/"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}

export default function Home() {
  // Mostra os 3 últimos quadriciclos cadastrados (últimos itens do JSON)
  const ultimos = [...produtos].slice(-3).reverse()

  return (
    <>
      {/* Otimização de SEO para a Página Inicial */}
      <SEO 
        title="Quadriciclos Novos e Usados em Campinas"
        description="Encontre os melhores quadriciclos novos e usados na Quadrimotors & Cia. Procedência garantida, atendimento especializado e compra segura em Campinas e região."
        canonical="https://quadrimotorsecia.com.br/"
      />

      {/* Injeção dos dados estruturados (Passo 4) via react-helmet-async */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaLocalBusiness)}
        </script>
      </Helmet>

      <Hero />

      {/* Seção "Por que escolher a Quadrimotors?" */}
      <section className="container-app mt-28 md:mt-36">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-3">Diferenciais</p>
          <h2 className="section-title">Por que escolher a Quadrimotors?</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {diferenciais.map(({ icon: Icon, titulo, texto }) => (
            <motion.div
              key={titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card p-9 text-center flex flex-col items-center gap-4"
            >
              <div className="bg-accent/10 p-4 rounded-2xl">
                <Icon size={30} className="text-accent" />
              </div>
              <h3 className="font-semibold text-lg">{titulo}</h3>
              <p className="text-secondary text-sm leading-relaxed">{texto}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Últimos quadriciclos cadastrados */}
      <section className="container-app mt-28 md:mt-36">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-3">Catálogo</p>
          <h2 className="section-title">Últimos cadastrados</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ultimos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      {/* CTA final para WhatsApp */}
      <section className="container-app mt-28 md:mt-36 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card text-center py-20 px-6 flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tightest2 max-w-lg leading-tight">
            Pronto para encontrar o seu quadriciclo?
          </h2>
          <p className="text-secondary max-w-md">
            Fale agora com nossa equipe pelo WhatsApp e tire todas as suas dúvidas.
          </p>
          <ButtonWhatsapp />
        </motion.div>
      </section>
    </>
  )
}