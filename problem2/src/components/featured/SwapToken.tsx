import React, { useMemo, useState } from "react";
import { clampNumber, fmt } from "../../utils/utils";
import type { Token } from "../../types/swap.type";
import useToken from "../../hooks/useToken";

type Props = {
  tokens: Token[];
  initialFrom?: string;
  initialTo?: string;
  balance: {
    icon: string;
    balance: number;
  }[];
};

const SwapToken = ({ initialFrom, initialTo, tokens, balance }: Props) => {
  const [fromSym, setFromSym] = useState<string>(initialFrom || "");
  const [toSym, setToSym] = useState<string>(initialTo || "");
  const [amount, setAmount] = useState<string>("");

  const fromToken = useMemo(
    () => tokens.find((t) => t.currency === fromSym)!,
    [tokens, fromSym],
  );

  const toToken = useMemo(
    () => tokens.find((t) => t.currency === toSym)!,
    [tokens, toSym],
  );
  console.log(fromToken);
  const handleSubmit = () => {};
  const handleSetFromSym = (v: string) => setFromSym(v);
  const handleSetToSym = (v: string) => setToSym(v);
  const handleSetAmount = (v: string) => setAmount(clampNumber(v));
  const handleSwap = () => {
    setFromSym(toSym);
    setToSym(fromSym);
  };
  const handleMax = () => setAmount(String(fromToken?.balance ?? 0));
  return (
    <div className="mx-auto w-full max-w-xl p-3 sm:p-4 md:p-6">
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-base font-semibold sm:text-lg">Swap</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-5">
          {/* From Row */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-sm text-neutral-300">From</label>
              <div className="text-xs text-neutral-400">
                Balance:{" "}
                <button
                  type="button"
                  className="underline hover:text-neutral-200"
                  onClick={handleMax}
                >
                  {fmt(fromToken?.balance ?? 0)}
                </button>{" "}
                {fromSym}
              </div>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2">
              <div className="relative w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2">
                <select
                  value={fromSym}
                  onChange={(e) => handleSetFromSym(e.target.value)}
                  className="absolute top-0 left-0 z-10 size-full text-black opacity-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {tokens.map((t) => (
                    <option key={t.icon} value={t.currency}>
                      {t.currency}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <img
                    src={fromToken?.icon}
                    alt="From token icon"
                    className="h-7 w-7 rounded-full"
                  />
                  <span className="text-base font-medium sm:text-lg">
                    {fromToken?.currency}
                  </span>
                </div>
              </div>
              <div className="relative min-w-0">
                <input
                  inputMode="decimal"
                  pattern="^\d*(?:\.\d*)?$"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleSetAmount(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-right text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:px-4 sm:text-lg"
                />
                {/* {exceedsBalance && ( */}
                <p className="absolute right-1 -bottom-5 text-xs text-red-400">
                  Amount exceeds balance
                </p>
                {/* )} */}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center py-1">
            <button
              type="button"
              onClick={handleSwap}
              className="group inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-3 py-2 transition-all hover:border-neutral-500 hover:bg-neutral-800/70"
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

          {/* To Row */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-sm text-neutral-300">To</label>
              <div className="text-xs text-neutral-400">
                Balance: {fmt(toToken?.balance ?? 0)} {toToken?.icon}
              </div>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-[auto,1fr]">
              <select
                value={toSym}
                onChange={(e) => handleSetToSym(e.target.value)}
                className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {tokens.map((t) => (
                  <option key={t.icon} value={t.icon}>
                    {t.icon} — {t.currency}
                  </option>
                ))}
              </select>

              <div className="flex min-w-0 items-center justify-end rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-right text-sm text-neutral-300 sm:px-4">
                <div className="truncate">
                  <div className="text-xs text-neutral-400">You receive</div>
                  <div className="text-base font-medium">
                    {/* ≈ {fmt(receiveAmount)} {toSym} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate & Warnings */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="text-neutral-400">
              {/* {derived.hasRate ? (
                <>
                  1 {fromSym} = {fmt(rate)} {toSym}
                </>
              ) : ( */}
              <span className="text-red-400">No rate available</span>
              {/* )} */}
            </div>
            {/* {sameToken && ( */}
            <div className="text-xs text-amber-400">
              Select two different tokens
            </div>
            {/* )} */}
          </div>

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
