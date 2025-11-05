import { useEffect, useMemo, useState } from "react";
import type { Token, TokenBalance } from "../../types/swap.type";
import { InputAmountToken } from "../ui/InputAmountToken";
import { format } from "../../utils/utils";

type Props = {
  tokens: Token[];
  tokensBalance: TokenBalance[];
};

const SwapToken = ({ tokens, tokensBalance }: Props) => {
  const [from, setFrom] = useState<Token | null>(null);
  const [to, setTo] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const balance = useMemo(() => {
    return (
      tokensBalance.find((t) => t.currency === from?.currency)?.balance || 0
    );
  }, [tokensBalance, from]);

  const handleSubmit = () => {};
  const handleSelectFromToken = (token: string) => {
    const foundToken = tokens.find((t) => t.currency === token);
    setFrom(foundToken!);
  };
  const handleSelectToToken = (token: string) => {
    const foundToken = tokens.find((t) => t.currency === token);
    setTo(foundToken!);
  };
  const handleSetFromAmount = (v: string) => setFromAmount(v);
  const handleSwap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFrom(to);
      setTo(from);
      console.log(toAmount);
      setFromAmount(format(Number(toAmount), 4));
      setIsLoading(false);
    }, 1000);
  };
  const handleMax = () => setFromAmount(String(balance));

  const exchangeRate = useMemo(() => {
    if (from && to) {
      return from.price / to.price;
    }
    return 0;
  }, [from, to]);

  useEffect(() => {
    setToAmount(format(Number(fromAmount) * exchangeRate, 4));
  }, [from, fromAmount, exchangeRate]);

  return (
    <div className="mx-auto w-full max-w-xl p-3 sm:p-4 md:p-6">
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-base font-semibold sm:text-lg">Swap</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-5">
          <InputAmountToken
            label="From"
            token={from || undefined}
            balance={balance}
            amount={fromAmount}
            handleSetAmount={handleSetFromAmount}
            handleMax={handleMax}
            handleSelectToken={handleSelectFromToken}
            tokens={tokens.filter((t) => t.currency !== to?.currency)}
          />
          {/* Swap Button */}
          <div className="flex items-center justify-center py-1">
            <button
              disabled={isLoading}
              type="button"
              onClick={handleSwap}
              className={`group inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-3 py-2 transition-all hover:border-neutral-500 hover:bg-neutral-800/70 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              aria-label="Swap tokens"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform group-active:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 7h11M10 3l5 4-5 4" />
                <path d="M20 17H9m5 4-5-4 5-4" />
              </svg>
              <span className="text-sm">Swap</span>
            </button>
          </div>

          <InputAmountToken
            label="To"
            token={to || undefined}
            handleSetAmount={() => {}}
            handleMax={() => {}}
            amount={toAmount}
            handleSelectToken={handleSelectToToken}
            tokens={tokens.filter((t) => t.currency !== from?.currency)}
            disabled
          />

          {/* Submit */}
          <button
            type="submit"
            // disabled={disabled}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default SwapToken;
