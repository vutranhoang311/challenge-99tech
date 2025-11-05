import { useEffect, useState } from "react";
import { api } from "../apis/api";
import type { Token } from "../types/swap.type";

const useToken = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const result = await api.fetchTokens();
        setTokens(result.data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };
    fetchTokens();
  }, []);

  return { tokens };
};

export default useToken;
