import useSwapToken from "../../hooks/useSwapToken";
import type { Token, TokenBalance } from "../../types/swap.type";
import { format } from "../../utils/utils";
import { InputAmountToken } from "../ui/InputAmountToken";

type Props = {
  tokens: Token[];
  tokensBalance: TokenBalance[];
};

const SwapToken = ({ tokens, tokensBalance }: Props) => {
  const {
    error,
    from,
    to,
    fromAmount,
    toAmount,
    handleMax,
    handleSelectFromToken,
    handleSelectToToken,
    handleSetFromAmount,
    handleSubmit,
    handleSwap,
    exchangeRate,
    isLoading,
    balance,
  } = useSwapToken({ tokens, tokensBalance });

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg">
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

        {from && to && (
          <div className="border-red w-full space-y-2 rounded-xl border bg-neutral-800 px-3 py-2.5 text-base text-neutral-100">
            <p className="text-sm font-semibold">
              1 {from.currency} = {format(exchangeRate, 4)} {to.currency}
            </p>
            <p className="text-xs">
              Exchange rate: {format(from.price, 4)} / {format(to.price, 4)}
            </p>
          </div>
        )}

        {error && (
          <div className="w-full space-y-2 rounded-xl border border-red-200 bg-red-200 px-3 py-2.5 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

export default SwapToken;
