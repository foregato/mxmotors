import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://quadrimotorsecia.com.br'

// Garante que og:image/twitter:image sempre recebam uma URL absoluta.
// Sem isso, imagens de produto (ex.: "/imagens/foto.jpg") quebram o preview
// ao compartilhar o link no WhatsApp, Instagram, etc.
const paraUrlAbsoluta = (caminho) => {
  if (!caminho) return `${SITE_URL}/fundos/fundoprincipal.jpg`
  return caminho.startsWith('http') ? caminho : `${SITE_URL}${caminho}`
}

export default function SEO({
  title,
  description,
  canonical,
  image = `${SITE_URL}/fundos/fundoprincipal.jpg`,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title.includes('Quadrimotors')
    ? title
    : `${title} | Quadrimotors & Cia`

  const imageUrl = paraUrlAbsoluta(image)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || 'https://quadrimotorsecia.com.br/'} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Quadrimotors & Cia" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}