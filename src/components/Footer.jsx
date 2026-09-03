import { Instagram, Phone, MapPin } from 'lucide-react'
import logo from '../assets/logopebsf.png'
import { POLITICA_PRIVACIDADE_PDF } from './CookieBanner'
import { DEVELOPER_NAME, DEVELOPER_URL } from '../config/developer'

// Rodapé exibido em todas as páginas - edite os dados de contato aqui
export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/[0.06] mt-28">
      <div className="container-app py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <img src={logo} alt="Quadrimotors & Cia" className="h-20 opacity-90" />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-secondary text-sm">
          <a href="https://www.instagram.com/quadrimotors/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition duration-300">
            <Instagram size={18} /> @quadrimotors
          </a>
          <a href="tel:+5519994075246" className="flex items-center gap-2 hover:text-accent transition duration-300">
            <Phone size={18} /> (19) 99407-5246
          </a>
          <span className="hidden sm:flex items-center gap-2">
            <MapPin size={18} /> Campinas, SP
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pb-8 border-t border-white/[0.04] pt-8">
        {/* Abre o PDF da Política de Privacidade em nova aba (coloque o arquivo em /public) */}
        <a
          href={POLITICA_PRIVACIDADE_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-secondary/80 hover:text-accent transition duration-300 underline underline-offset-2"
        >
          Política de Privacidade
        </a>
        <p className="text-center text-xs text-secondary/60">
          © {new Date().getFullYear()} Quadrimotors & Cia. Todos os direitos reservados.
        </p>

        {/* Crédito do desenvolvedor - deve permanecer em todas as páginas */}
        <p className="text-center text-xs text-secondary/40">
          Desenvolvido por{''}
          {DEVELOPER_URL ? (
            <a
              href={DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition duration-300 underline underline-offset-2"
            >
              {DEVELOPER_NAME}
            </a>
          ) : (
            DEVELOPER_NAME
          )}
        </p>
      </div>
    </footer>
  )
}
