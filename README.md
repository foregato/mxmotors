# Quadrimotors & Cia 🏍️

Catálogo digital de quadriciclos — site moderno, mobile-first, feito em React + Vite + Tailwind CSS.
Sem backend: todos os produtos vêm de um arquivo JSON local.

---

## 📁 Estrutura do projeto

```
quadrimotors/
├── index.html                 # HTML raiz (título, fonte Poppins, favicon)
├── tailwind.config.js         # Cores, fontes e tema do site
├── vite.config.js             # Configuração do Vite
├── src/
│   ├── main.jsx                # Ponto de entrada (monta o React + Router)
│   ├── App.jsx                  # Rotas do site
│   ├── index.css                # Estilos globais e classes reutilizáveis (.btn-primary, .card, etc)
│   ├── data/
│   │   └── produtos.json        # Base de dados dos quadriciclos (editar para add/remover produtos)
│   ├── assets/
│   │   └── logo.svg             # Logo da empresa (substituir pelo arquivo oficial)
│   ├── components/
│   │   ├── Navbar.jsx           # Menu fixo no topo
│   │   ├── Footer.jsx           # Rodapé
│   │   ├── Hero.jsx             # Banner principal da Home
│   │   ├── ProductCard.jsx      # Card de produto (Catálogo e Home)
│   │   ├── SearchBar.jsx        # Campo de busca do Catálogo
│   │   ├── Carousel.jsx         # Carrossel de fotos da página do Produto
│   │   └── ButtonWhatsapp.jsx   # Botão que abre conversa no WhatsApp
│   └── pages/
│       ├── Home.jsx             # Tela inicial
│       ├── Catalogo.jsx         # Lista de produtos com busca e filtros
│       ├── Produto.jsx          # Página de detalhes de um produto
│       ├── Sobre.jsx            # História, missão e valores
│       └── Contato.jsx          # WhatsApp, Instagram, telefone, endereço e mapa
```

---

## 🚀 Instalação

Pré-requisito: [Node.js](https://nodejs.org) versão 18 ou superior.

```bash
# 1. Entre na pasta do projeto
cd quadrimotors

# 2. Instale as dependências
npm install
```

## ▶️ Executar em desenvolvimento

```bash
npm run dev
```

Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173`).

---

## 🎨 Como trocar a logo

1. Substitua o arquivo `src/assets/logo.svg` pelo arquivo da sua empresa (pode ser `.svg` ou `.png`).
2. Se usar `.png`, ajuste o import em `src/components/Navbar.jsx` e `src/components/Footer.jsx`:
   ```js
   import logo from '../assets/logo.png'
   ```
3. Atualize também o favicon em `index.html` (linha `<link rel="icon" ...>`).

## 🎨 Como trocar as cores do tema

Todas as cores ficam centralizadas em **`tailwind.config.js`**:

```js
colors: {
  bgdark: '#111111',   // fundo principal
  card: '#1C1C1C',     // fundo dos cards
  accent: '#FF7A00',   // laranja - botões, ícones e destaques
  secondary: '#D9D9D9',// textos secundários
}
```

Basta trocar os valores hexadecimais — todo o site usa essas classes (`bg-bgdark`, `bg-card`, `text-accent`, `text-secondary`), então a mudança é automática em todas as páginas.

---

## 🏍️ Como adicionar, editar ou remover quadriciclos

Todos os produtos ficam em **`src/data/produtos.json`**. Cada item segue este modelo:

```json
{
  "id": 7,
  "nome": "Nome do modelo",
  "marca": "Marca",
  "modelo": "Modelo",
  "ano": 2024,
  "motor": "Descrição do motor",
  "cilindrada": "700cc",
  "tracao": "4x4",
  "combustivel": "Gasolina",
  "cor": "Preto",
  "quilometragem": "0 km",
  "estado": "Novo",
  "preco": "R$ 50.000",
  "descricao": "Texto descritivo completo do quadriciclo.",
  "imagens": ["url-ou-caminho-da-foto-1", "url-ou-caminho-da-foto-2"]
}
```

- **Adicionar**: copie o modelo acima, cole no final do array (antes do `]`) e use um `id` novo (não repetido).
- **Editar**: altere os campos do produto desejado diretamente no JSON.
- **Remover**: apague o bloco `{ ... }` inteiro do produto.

> A Home sempre exibe automaticamente os **3 últimos itens do array** como "últimos cadastrados" — para um produto aparecer lá, basta deixá-lo no fim do arquivo.

## 🖼️ Como substituir as imagens dos produtos

Duas opções:

1. **Imagens locais** (recomendado para produção):
   - Coloque os arquivos em `src/assets/imagens/` (crie a pasta se não existir).
   - No `produtos.json`, referencie assim: `"imagens": ["/src/assets/imagens/foto1.jpg"]`.
2. **Imagens externas**: use diretamente a URL da imagem (como já está no exemplo, com `picsum.photos` como placeholder).

O primeiro item do array `imagens` é usado como capa do card no Catálogo e na Home.

---

## 💬 Como alterar o número do WhatsApp

Edite a constante `WHATSAPP_NUMBER` em **`src/components/ButtonWhatsapp.jsx`**:

```js
export const WHATSAPP_NUMBER = '5511999999999' // DDI + DDD + número, sem espaços ou símbolos
```

Essa constante é usada por todos os botões de WhatsApp do site, incluindo o botão "Tenho Interesse" da página do produto (que já envia o nome do modelo automaticamente na mensagem).

---

## ✏️ Como editar textos e informações da empresa

| O que editar | Onde |
|---|---|
| Título e subtítulo do Hero | `src/components/Hero.jsx` |
| Cards "Por que escolher a Quadrimotors?" | `src/pages/Home.jsx` (array `diferenciais`) |
| História, missão e valores | `src/pages/Sobre.jsx` |
| Telefone, Instagram e endereço | `src/pages/Contato.jsx` e `src/components/Footer.jsx` |
| Endereço no mapa | `src/pages/Contato.jsx` (troque o texto após `q=` na URL do iframe) |

---

## ➕ Como adicionar novas páginas ou componentes

**Nova página:**
1. Crie o arquivo em `src/pages/NomeDaPagina.jsx`.
2. Registre a rota em `src/App.jsx`:
   ```jsx
   <Route path="/minha-pagina" element={<NomeDaPagina />} />
   ```
3. Adicione o link no menu em `src/components/Navbar.jsx` (array `links`).

**Novo componente:**
1. Crie o arquivo em `src/components/NomeDoComponente.jsx`.
2. Importe e use no local desejado (página ou outro componente).

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`. Para testar o resultado localmente antes de publicar:

```bash
npm run preview
```

A pasta `dist/` pode ser hospedada em qualquer serviço de arquivos estáticos (Vercel, Netlify, GitHub Pages, hospedagem própria, etc).

---

## 🛠️ Tecnologias usadas

- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [React Router](https://reactrouter.com) — navegação entre páginas
- [Tailwind CSS](https://tailwindcss.com) — estilização
- [Lucide React](https://lucide.dev) — ícones
- [Framer Motion](https://www.framer.com/motion) — animações suaves
