import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, canonical }) {
  // Define o título que aparece na aba do navegador
  const fullTitle = `${title} | Quadrimotors & Cia`

  return (
    <Helmet>
      {/* Título da página */}
      <title>{fullTitle}</title>

      {/* Descrição que aparece no resultado da busca do Google */}
      <meta name="description" content={description} />

      {/* Link canônico (indica a URL oficial para o Google não achar que é conteúdo duplicado) */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Garante que acentos e caracteres em português funcionem corretamente */}
      <meta charSet="utf-8" />
    </Helmet>
  )
}