import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Importação dos componentes fixos
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'

// Importação das páginas
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Produto from './pages/Produto'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Comparador from './pages/Comparador'

export default function App() {
  return (
    /* 1. O HelmetProvider abraça TODO o aplicativo */
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-bgdark">
        {/* 2. O Navbar fica fixo no topo de todas as páginas */}
        <Navbar />

        {/* 3. O <main> guarda o conteúdo que muda dependendo do link */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/comparar" element={<Comparador />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        {/* 4. O Footer fica fixo no rodapé de todas as páginas */}
        <Footer />
        <CookieBanner />
      </div>
    </HelmetProvider>
  )
}