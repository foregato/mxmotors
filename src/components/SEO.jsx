import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  canonical,
  image = 'https://quadrimotorsecia.com.br/fundos/fundoprincipal.png',
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title.includes('Quadrimotors')
    ? title
    : `${title} | Quadrimotors & Cia`

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
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Quadrimotors & Cia" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}