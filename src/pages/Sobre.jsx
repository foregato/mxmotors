import { Compass, Target, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

// Textos institucionais - edite os parágrafos e a lista de valores aqui
const valores = [
  { icon: Compass, texto: 'Só entregamos máquinas em que nós mesmos confiaríamos para colocar nossa família na trilha.' },
  { icon: Target, texto: 'Compromisso com a transparência em cada negociação.' },
  { icon: Heart, texto: 'Respeito e cuidado no relacionamento com cada cliente.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Sobre() {
  return (
    <>
      {/* Otimização de SEO para a página Sobre */}
      <SEO 
        title="Sobre Nós"
        description="Conheça a história da Quadrimotors & Cia, nossa missão e valores. Referência em quadriciclos novos e seminovos em Campinas e região."
        canonical="https://quadrimotorsecia.com.br/sobre"
      />

      <section className="container-app pt-32 pb-24">
        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src="/fundos/fundoprincipal.png"
          alt="Fachada da Quadrimotors & Cia"
          className="w-full aspect-video object-cover rounded-2xl border border-white/[0.06]"
        />

        <motion.div
          initial="hidden" animate="show" variants={fadeUp}
          className="mt-12 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tightest2 mb-5">Nossa história</h1>
          <p className="text-secondary leading-relaxed text-lg font-light">
            A Quadrimotors & Cia nasceu de uma paixão de pai para filho pelo mundo dos quadriciclos. O que começou lá atrás, como um pequeno ponto de venda, cresceu e se transformou em uma grande referência no mercado de novos e seminovos, sempre batendo na tecla da qualidade e da confiança.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            className="card p-9"
          >
            <h2 className="text-xl font-semibold mb-3">Missão</h2>
            <p className="text-secondary leading-relaxed">
              Conectar gerações e pessoas à liberdade e à emoção do off-road, oferecendo quadriciclos de alta qualidade com o atendimento próximo, confiável e parceiro que só uma empresa que nasceu de uma paixão de família pode proporcionar.
            </p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: 0.1 }}
            className="card p-9"
          >
            <h2 className="text-xl font-semibold mb-4">Valores</h2>
            <ul className="flex flex-col gap-4 mt-2">
              {valores.map(({ icon: Icon, texto }, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary leading-relaxed">
                  <Icon size={20} className="text-accent shrink-0 mt-0.5" />
                  {texto}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  )
}
