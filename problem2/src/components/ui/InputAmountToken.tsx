import { memo } from "react";
import type { Token } from "../../types/swap.type";
import { format } from "../../utils/utils";
import FallBackIconToken from "./FallBackIconToken";

type Props = {
  label: string;
  token?: Token;
  balance?: number;
  disabled?: boolean;
  amount?: string;
  handleSetAmount: (value: string) => void;
  handleMax: () => void;
  handleSelectToken: (value: string) => void;
  tokens?: Token[];
};

export const InputAmountToken = memo(
  ({
    token,
    balance,
    disabled = false,
    handleSetAmount,
    handleMax,
    tokens,
    amount,
    handleSelectToken,
    label,
  }: Props) => {
    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (/^\d*\.?\d*$/.test(value)) {
        handleSetAmount(value);
      }
    };
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-sm text-neutral-300">{label}</label>
          <div className="text-xs text-neutral-400">
            {balance && (
              <>
                Balance:{" "}
                <button
                  type="button"
                  className="underline hover:cursor-pointer hover:text-neutral-200"
                  onClick={handleMax}
                >
                  {format(balance)}
                </button>{" "}
                {token && token.currency}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2">
          <div className="relative flex w-full min-w-0 items-center rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2">
            <select
              value={token?.currency || ""}
              onChange={(e) => handleSelectToken(e.target.value)}
              className="absolute top-0 left-0 z-10 size-full text-black opacity-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="from"
            >
              <option value="" disabled hidden>
                Select token...
              </option>
              {tokens?.map((t) => (
                <option key={t.currency} value={t.currency}>
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
                "Select"
              )}
            </div>
          </div>
          <div className="relative min-w-0">
            <input
              disabled={disabled}
              inputMode="numeric"
              min="0"
              pattern="^\d*(?:\.\d*)?$"
              placeholder="0.00"
              value={amount}
              onChange={handleChangeAmount}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-right text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:px-4 sm:text-lg"
            />
            {balance !== undefined &&
              amount !== undefined &&
              balance < Number(amount) && (
                <p className="absolute right-1 -bottom-5 text-xs text-red-400">
                  Amount exceeds balance
                </p>
              )}
          </div>
        </div>
      </div>
    );
  },
);
