import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import { converterPrecoParaNumero, formatarMoeda } from '../utils/preco'

// Limite máximo de parcelas permitido no simulador (regra de negócio: nunca 13x ou mais).
const MAX_PARCELAS = 12

// Taxa anual usada na simulação: 12,3% (proveniente de 1% ao mês).
// Fator = 100 - 12,3 = 87,7 → 0.877
const FATOR_JUROS = 0.877

// Calcula o total e a parcela com a regra simplificada:
// total do saldo = saldo / 0.877
// parcela = total / n
function calcularSimulacao(saldo, n) {
  if (saldo <= 0 || n <= 0) {
    return { valorParcela: 0, totalSaldo: 0 }
  }
  const totalSaldo = saldo / FATOR_JUROS
  const valorParcela = totalSaldo / n
  return { valorParcela, totalSaldo }
}

// Simulação estimada de compra/preço para a página do produto.
// Não representa uma condição real de financiamento - estimativa com taxa
// de 12,3% ao ano, limitada a no máximo 12x.
export default function SimuladorCompra({ preco }) {
  const precoNum = converterPrecoParaNumero(preco)

  const [entrada, setEntrada] = useState('')
  const [parcelas, setParcelas] = useState(MAX_PARCELAS)

  const entradaNum = useMemo(() => {
    const valor = parseFloat(String(entrada).replace(',', '.'))
    if (Number.isNaN(valor) || valor < 0) return 0
    return Math.min(valor, precoNum)
  }, [entrada, precoNum])

  const saldo = Math.max(precoNum - entradaNum, 0)
  const { valorParcela, totalSaldo } = calcularSimulacao(saldo, parcelas)
  const totalPago = totalSaldo + entradaNum

  return (
    <div className="card mt-10 p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-2.5 rounded-xl">
          <Calculator size={22} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Simule sua compra</h2>
          <p className="text-secondary text-sm">Simulação estimada, sem taxas ou condições reais de financiamento.</p>
        </div>
      </div>

      {/* Campos de entrada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="entrada" className="text-secondary text-xs uppercase tracking-[0.15em]">
            Valor de entrada (R$)
          </label>
          <input
            id="entrada"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="0,00"
            className="mt-2 w-full bg-card border border-white/[0.08] rounded-2xl py-4 px-4 text-white
                       placeholder:text-secondary/60 focus:outline-none focus:border-accent/60
                       focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
          />
        </div>

        <div>
          <label htmlFor="parcelas" className="text-secondary text-xs uppercase tracking-[0.15em]">
            Quantidade de parcelas
          </label>
          <select
            id="parcelas"
            value={parcelas}
            onChange={(e) => setParcelas(Number(e.target.value))}
            className="mt-2 w-full bg-card border border-white/[0.08] rounded-2xl py-4 px-4 text-white
                       focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all duration-300 ease-premium"
          >
            {Array.from({ length: MAX_PARCELAS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}x</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultado da simulação */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 mt-8 pt-6 border-t border-white/[0.08]">
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Preço do produto</p>
          <p className="font-medium mt-1.5">{formatarMoeda(precoNum)}</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Entrada</p>
          <p className="font-medium mt-1.5">{formatarMoeda(entradaNum)}</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Saldo financiado</p>
          <p className="font-medium mt-1.5">{formatarMoeda(saldo)}</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Quantidade de parcelas</p>
          <p className="font-medium mt-1.5">{parcelas}x</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Estimativa por parcela</p>
          <p className="font-bold text-accent mt-1.5">{formatarMoeda(valorParcela)}</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">Total estimado pago</p>
          <p className="font-bold text-accent mt-1.5">{formatarMoeda(totalPago)}</p>
        </div>
      </div>

      <p className="text-secondary/70 text-xs mt-6">
        *Simulação estimada com taxa de 12,3% ao ano (1% ao mês), parcelamento em até 12x.
        As condições reais de pagamento podem variar - consulte nossa equipe pelo WhatsApp para confirmar valores.
      </p>
    </div>
  )
}