import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Importação dos componentes fixos
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from './components/ScrollToTop'

// Importação das páginas via lazy loading: cada página só é baixada quando
// o usuário navega até ela, reduzindo o tamanho do pacote JS inicial e
// acelerando o primeiro carregamento (especialmente na Home).
const Home = lazy(() => import('./pages/Home'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Produto = lazy(() => import('./pages/Produto'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Contato = lazy(() => import('./pages/Contato'))
const Comparador = lazy(() => import('./pages/Comparador'))

export default function App() {
  return (
    /* 1. O HelmetProvider abraça TODO o aplicativo */
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-bgdark">
        {/* Rola para o topo a cada troca de rota (ex.: ProductCard -> /produto/:slug) */}
        <ScrollToTop />

        {/* 2. O Navbar fica fixo no topo de todas as páginas */}
        <Navbar />

        {/* 3. O <main> guarda o conteúdo que muda dependendo do link */}
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/produto" element={<Produto />} />
              {/* :slug também recebe o id numérico antigo (ex.: /produto/6) —
                  a página de Produto detecta e redireciona para o slug correto. */}
              <Route path="/produto/:slug" element={<Produto />} />
              <Route path="/comparar" element={<Comparador />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </Suspense>
        </main>

        {/* 4. O Footer fica fixo no rodapé de todas as páginas */}
        <Footer />
        <CookieBanner />
      </div>
    </HelmetProvider>
  )
}
