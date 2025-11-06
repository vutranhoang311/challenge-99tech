import { useEffect, useState } from "react";
import { api } from "../apis/api";
import type { Token } from "../types/swap.type";

const useToken = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const result = await api.fetchTokens();
        setTokens(result.data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTokens();
  }, []);

  return { tokens, isLoading };
};

export default useToken;
