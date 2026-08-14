import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'

// Chave usada no localStorage para guardar a escolha do usuário sobre cookies.
// Valores possíveis: "all" (aceitou todos) | "necessary" (apenas necessários)
export const COOKIE_CONSENT_KEY = 'cookie-consent'

// Caminho do PDF da Política de Privacidade.
// Coloque o arquivo em /public com esse mesmo nome (ex: public/politica-de-privacidade.pdf)
// para que ele fique disponível em: https://seusite.com.br/politica-de-privacidade.pdf
export const POLITICA_PRIVACIDADE_PDF = '/politica-de-privacidade.pdf'

/**
 * Banner fixo de consentimento de cookies (LGPD).
 * Só é exibido enquanto o usuário ainda não tiver feito uma escolha.
 * A escolha fica salva no localStorage e o banner não aparece mais depois disso.
 */
export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false)

  // Ao montar o componente, verifica se já existe uma escolha salva
  useEffect(() => {
    const consentimento = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consentimento) {
      setVisivel(true)
    }
  }, [])

  // Salva a escolha do usuário e esconde o banner
  const escolher = (valor) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, valor)
    setVisivel(false)
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 w-full z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
        >
          <div
            className="container-app bg-card border border-white/10 rounded-2xl shadow-lg shadow-black/40
                       p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            {/* Ícone + texto explicativo */}
            <div className="flex items-start gap-3 flex-1">
              <span className="hidden sm:flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent">
                <Cookie size={20} />
              </span>
              <p className="text-sm text-secondary leading-relaxed">
                Usamos cookies para melhorar sua experiência de navegação e analisar o uso do site.
                Você pode aceitar todos os cookies ou apenas os necessários para o funcionamento do site.
                Saiba mais na nossa{' '}
                {/* Abre o PDF da Política de Privacidade em uma nova aba.
                    Para forçar o download em vez de abrir no navegador, adicione o atributo "download" abaixo. */}
                <a
                  href={POLITICA_PRIVACIDADE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:brightness-110"
                >
                  Política de Privacidade
                </a>
                .
              </p>
            </div>

            {/* Botões de ação - "Aceitar todos" em destaque, "Apenas necessários" discreto */}
            <div className="flex items-center gap-4 sm:gap-5 shrink-0 self-end sm:self-center">
              <button
                onClick={() => escolher('necessary')}
                className="text-xs text-secondary/70 underline underline-offset-2 hover:text-white
                           transition duration-300 whitespace-nowrap"
              >
                Apenas necessários
              </button>
              <button
                onClick={() => escolher('all')}
                className="btn-primary text-sm py-3.5 px-7 whitespace-nowrap"
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

