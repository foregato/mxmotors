// Fotos ESPECÍFICAS para o Comparador, associadas pelo ID do produto
// (o mesmo ID usado em src/data/produtos.json).
//
// Por que este arquivo existe: as fotos do comparador podem ser diferentes
// das fotos principais do catálogo (produto.imagens). Em vez de duplicar os
// dados do produto, guardamos aqui APENAS a referência da imagem alternativa,
// indexada por ID.
//
// Onde colocar os arquivos de imagem:
//   public/imagens/comparador/
//
// Como usar:
//   1. Coloque o arquivo em public/imagens/comparador/ (ex.: comparador-1.jpg)
//   2. Adicione uma linha abaixo relacionando o ID do produto ao caminho da imagem
//
// Exemplo:
//   1: '/imagens/comparador/comparador-1.jpg',
//   5: '/imagens/comparador/comparador-5.png',
//
// Produtos sem entrada aqui continuam funcionando normalmente: o Comparador
// usa automaticamente a primeira foto do catálogo (produto.imagens[0]) como
// alternativa (fallback).
const comparadorImagens = {
  // Adicione aqui as fotos específicas do comparador, por ID do produto.
}

export default comparadorImagens

// Retorna a foto do comparador para um produto (ou a foto principal do
// catálogo como fallback, caso não exista uma foto específica cadastrada).
export function getImagemComparador(produto) {
  if (!produto) return null
  return comparadorImagens[produto.id] || produto.imagens?.[0] || null
}
