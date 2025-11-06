import React, { useEffect, useMemo, useState } from "react";
import type { Token, TokenBalance } from "../types/swap.type";

type Props = { tokens: Token[]; tokensBalance: TokenBalance[] };

const useSwapToken = ({ tokens, tokensBalance }: Props) => {
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

  const exceed =
    balance !== undefined &&
    fromAmount !== undefined &&
    balance < Number(fromAmount);

  const exchangeRate = useMemo(() => {
    if (from && to) {
      return from.price / to.price;
    }
    return 0;
  }, [from, to]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exceed) {
      setError("Amount exceeds balance!");
    } else if (!from || !to) {
      setError("Please select both tokens to proceed!");
    } else if (Number(fromAmount) === 0) {
      setError("Please input valid amount!");
    } else {
      setError(null);
    }
  };
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
      setFromAmount(String(Number(toAmount)));
      setIsLoading(false);
    }, 1000);
  };
  const handleMax = () => setFromAmount(String(balance));

  useEffect(() => {
    setToAmount(String(Number(fromAmount) * exchangeRate));
  }, [from, fromAmount, exchangeRate]);

  useEffect(() => {
    if (from && to && !exceed) {
      setError(null);
    }
  }, [from, to, exceed]);

  return {
    from,
    to,
    isLoading,
    error,
    fromAmount,
    toAmount,
    handleSubmit,
    handleSelectFromToken,
    handleSwap,
    handleSetFromAmount,
    handleMax,
    exchangeRate,
    handleSelectToToken,
    balance,
  };
};

export default useSwapToken;
