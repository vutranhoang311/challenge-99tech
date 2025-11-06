import { useEffect, useState } from "react";
import { api } from "../apis/api";
import type { TokenBalance } from "../types/swap.type";

const useBalance = () => {
  const [balance, setBalance] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const result = await api.fetchBalance();
        setBalance(result.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return { balance, isLoading };
};

export default useBalance;
