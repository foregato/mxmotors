// Utilitários de preço reutilizados em várias partes do site
// (Catálogo, Simulador de Compra) - fonte única desta lógica.

// Converte "R$ 15.900,00" -> 15900 (number)
export function converterPrecoParaNumero(precoString) {
  if (!precoString) return 0
  const numero = parseFloat(
    String(precoString)
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  )
  return Number.isNaN(numero) ? 0 : numero
}

// Converte um número -> "R$ 1.234,56"
export function formatarMoeda(valor) {
  const numero = Number(valor) || 0
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
