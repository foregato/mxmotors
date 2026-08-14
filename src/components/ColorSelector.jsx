// Seletor visual de cores — círculos clicáveis, com a cor selecionada
// destacada por um anel ao redor. Reutilizado no ProductCard (catálogo)
// e na página de detalhes do produto.
//
// Props:
//   cores            -> array de { nome, hex }
//   corSelecionada    -> nome da cor atualmente selecionada
//   onSelect         -> (nome) => void, chamado ao clicar em uma cor
//   size             -> 'sm' (card) | 'md' (página de produto)
export default function ColorSelector({ cores = [], corSelecionada, onSelect, size = 'sm' }) {
  if (!cores || cores.length < 2) return null

  const dimensoes = size === 'md'
    ? 'w-8 h-8 sm:w-9 sm:h-9'
    : 'w-6 h-6'

  return (
    <div className="flex items-center gap-2.5" role="group" aria-label="Selecionar cor">
      {cores.map((cor) => {
        const ativo = cor.nome === corSelecionada
        return (
          <button
            key={cor.nome}
            type="button"
            title={cor.nome}
            aria-label={cor.nome}
            aria-pressed={ativo}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSelect?.(cor.nome)
            }}
            className={`relative rounded-full shrink-0 transition-all duration-300 ease-premium
                        ${dimensoes}
                        ${ativo ? 'ring-2 ring-offset-2 ring-offset-card ring-accent scale-105' : 'ring-1 ring-white/20 hover:ring-white/50'}`}
            style={{ backgroundColor: cor.hex }}
          />
        )
      })}
    </div>
  )
}
