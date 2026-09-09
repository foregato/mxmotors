// Campos da tabela de especificações técnicas.
// Usado tanto na página de Produto quanto no Comparador,
// garantindo que as duas telas sempre mostrem os mesmos atributos.
const especificacoes = [
  { label: 'Marca', chave: 'marca' },
  { label: 'Modelo', chave: 'modelo' },
  { label: 'Ano', chave: 'ano' },
  { label: 'Motor', chave: 'motor' },
  { label: 'Cilindrada', chave: 'cilindrada' },
  { label: 'Tração', chave: 'tracao' },
  { label: 'Combustível', chave: 'combustivel' },
  { label: 'Cor', chave: 'cor' },
  { label: 'Quilometragem', chave: 'quilometragem' },
  { label: 'Estado', chave: 'estado' },
]

export default especificacoes

// Retorna o valor de exibição de uma especificação, tratando os casos
// especiais que dependem de mais de um campo do produto:
// - "cor": usa a cor selecionada pelo usuário (quando informada), em vez do
//   campo estático produto.cor.
// - "tracao": quando o produto possui o campo "eixoTracao" (ex.: tração 4x2
//   com eixo trativo traseiro), combina os dois em um único texto amigável
//   ("4x2 (Traseira)"), mantendo os campos separados nos dados para que os
//   filtros do catálogo continuem funcionando com valores padronizados.
export function getValorExibicao(produto, chave, corSelecionada) {
  if (chave === 'cor' && corSelecionada) return corSelecionada
  if (chave === 'tracao' && produto.eixoTracao) return `${produto.tracao} (${produto.eixoTracao})`
  return produto[chave]
}
