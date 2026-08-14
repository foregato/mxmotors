import { Instagram, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import ButtonWhatsapp from '../components/ButtonWhatsapp'

// Dados de contato da empresa - edite aqui (telefone, instagram e endereço)
const contatos = [
  { icon: Phone, titulo: 'Telefone', valor: '(19) 99407-5246', href: 'tel:+5519994075246' },
  { icon: Instagram, titulo: 'Instagram', valor: '@quadrimotors', href: 'https://www.instagram.com/quadrimotors/' },
  { icon: MapPin, titulo: 'Endereço', valor: 'Rua Cairi, 213 - Vila Aeroporto - Campinas, SP', href: null },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Contato() {
  return (
    <>
      {/* Configuração de SEO da página Contato */}
      <SEO 
        title="Contato e Localização"
        description="Entre em contato com a Quadrimotors & Cia em Campinas, SP. Atendimento por WhatsApp, telefone ou visite nossa loja na Rua Cairi, 213."
        canonical="https://quadrimotorsecia.com.br/contato"
      />

      <section className="container-app pt-32 pb-32">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tightest2">Contato</h1>
          <p className="text-secondary mt-3 text-lg">Fale com a gente pelo canal que preferir.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {contatos.map(({ icon: Icon, titulo, valor, href }, i) => (
            <motion.div
              key={titulo}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp} transition={{ delay: i * 0.08 }}
              className="card p-7 flex items-center gap-4"
            >
              <div className="bg-accent/10 p-3.5 rounded-xl shrink-0">
                <Icon size={22} className="text-accent" />
              </div>
              <div>
                <p className="text-secondary text-sm">{titulo}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent transition duration-300">
                    {valor}
                  </a>
                ) : (
                  <p className="font-medium">{valor}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <ButtonWhatsapp texto="Chamar no WhatsApp" />
        </div>

        {/* Mapa Google - troque o endereço na query do "q=" abaixo */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="mt-14 rounded-2xl overflow-hidden aspect-video border border-white/[0.06]"
        >
          <iframe
            title="Localização Quadrimotors & Cia"
            className="w-full h-full border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=Rua+Cairi,+213,+Vila+Aeroporto,+Campinas,+SP&output=embed"
          />
        </motion.div>
      </section>
    </>
  )
}
