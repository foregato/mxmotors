import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Rola a página para o topo sempre que a rota (pathname) muda — ex.: ao clicar
// em um ProductCard e navegar para /produto/:slug. Não interfere na query
// string (?cor=...) nem no botão Voltar do navegador, pois apenas reage à
// mudança de pathname e não altera o histórico.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
