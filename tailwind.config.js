/** Configuração do Tailwind CSS
 * Todas as cores da identidade visual da Quadrimotors ficam centralizadas aqui.
 * Para alterar o tema, basta editar os valores hexadecimais abaixo.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bgdark: '#111111',      // fundo principal
        card: '#1C1C1C',        // fundo dos cards
        accent: '#FF7A00',      // laranja - botões, ícones, destaques
        secondary: '#D9D9D9',   // textos secundários
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      // Curva de easing "premium" (usada em produtos como Linear/Vercel/Stripe) —
      // aceleração suave e chegada macia, evita a sensação mecânica do ease padrão do CSS.
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      letterSpacing: {
        tightest2: '-0.04em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
