import { Search } from 'lucide-react'

// Campo de busca controlado - o estado fica na página Catálogo (componente pai)
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/70" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nome do modelo..."
        className="w-full bg-card border border-white/[0.08] rounded-2xl py-4 pl-14 pr-5
                   text-white placeholder:text-secondary/60 focus:outline-none focus:border-accent/60
                   focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
      />
    </div>
  )
}
