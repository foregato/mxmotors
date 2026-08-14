import { MessageCircle } from 'lucide-react'

// Número de WhatsApp da empresa (formato internacional, sem espaços ou símbolos)
// Para alterar o número, edite apenas esta constante.
export const WHATSAPP_NUMBER = '5519994075246'

/**
 * Monta o link do WhatsApp com uma mensagem pré-definida.
 * @param {string} mensagem - texto que aparecerá pronto na conversa
 */
export function linkWhatsapp(mensagem = 'Olá, gostaria de mais informações sobre os quadriciclos.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`
}

// Botão de call-to-action para WhatsApp, usado em várias páginas do site
export default function ButtonWhatsapp({ mensagem, texto = 'Falar com Vendedor', className = 'btn-primary' }) {
  return (
    <a
      href={linkWhatsapp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessageCircle size={20} />
      {texto}
    </a>
  )
}
