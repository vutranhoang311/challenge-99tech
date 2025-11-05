import type { Token } from "../../types/swap.type";
import { fmt } from "../../utils/utils";
import FallBackIconToken from "./FallBackIconToken";

type Props = {
  token?: Token;
  balance?: number;
  disabled?: boolean;
  amount: string;
  handleSetAmount: (value: string) => void;
  handleMax: () => void;
  handleSetFromSym: (value: string) => void;
  tokens: Token[];
};

export const InputAmountToken = ({
  token,
  balance,
  disabled = false,
  handleSetAmount,
  handleMax,
  tokens,
  amount,
  handleSetFromSym,
}: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm text-neutral-300">From</label>
        <div className="text-xs text-neutral-400">
          Balance:{" "}
          <button
            type="button"
            className="underline hover:cursor-pointer hover:text-neutral-200"
            onClick={handleMax}
          >
            {fmt(balance ?? 0)}
          </button>{" "}
          {token && token.currency}
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2">
        <div className="relative w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2">
          <select
            value={token?.currency || ""}
            onChange={(e) => handleSetFromSym(e.target.value)}
            className="absolute top-0 left-0 z-10 size-full text-black opacity-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            name="from"
            disabled={disabled}
          >
            {tokens.map((t) => (
              <option key={t.icon} value={t.currency}>
                {t.currency}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            {token ? (
              <>
                {token.icon ? (
                  <img
                    src={token.icon}
                    alt={token.currency}
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <FallBackIconToken />
                )}

                <span className="text-base font-medium sm:text-lg">
                  {token?.currency}
                </span>
              </>
            ) : (
              <div className="">Select</div>
            )}
          </div>
        </div>
        <div className="relative min-w-0">
          <input
            disabled={disabled}
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
  );
};
