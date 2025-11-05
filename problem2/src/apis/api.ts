import type { ApiResponse, Token } from "../types/swap.type";

const TOKEN_API_URL = "https://interview.switcheo.com/prices.json";
const TOKEN_IMAGE_API_URL =
  "/github-api/repos/Switcheo/token-icons/contents/tokens";

export const api = {
  async fetchTokens(): Promise<ApiResponse<Token[]>> {
    try {
      const [tokensResponse, imageTokensResponse] = await Promise.all([
        fetch(TOKEN_API_URL),
        fetch(TOKEN_IMAGE_API_URL, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }),
      ]);
      const tokens: Token[] = await tokensResponse.json();
      const imageTokens: Record<string, string>[] =
        await imageTokensResponse.json();
      const imageMap = imageTokens.reduce(
        (map: Record<string, string>, item) => {
          const icon = item.name.replace(".svg", "").toUpperCase();
          map[icon] = item.download_url;
          return map;
        },
        {},
      );
      const tokensMerged: Token[] = tokens.map((token) => ({
        ...token,
        icon: imageMap[token.currency] || "",
      }));

      const uniqueTokens = Array.from(
        tokensMerged
          .reduce((map, cur) => {
            const existing = map.get(cur.currency);
            if (!existing || new Date(cur.date) > new Date(existing.date)) {
              map.set(cur.currency, cur);
            }
            return map;
          }, new Map<string, (typeof tokens)[number]>())
          .values(),
      );

      return {
        data: uniqueTokens,
        success: true,
      };
    } catch (error) {
      console.log("Fetch token errored:", error);
      return {
        data: [],
        success: false,
        error: "Fetch tokens failed",
      };
    }
  },

  async swap(
    from: string,
    to: string,
    amount: number,
  ): Promise<ApiResponse<string>> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Swap successful: ${amount} ${from} to ${to}`);
    return {
      data: "Swap successful!",
      success: true,
    };
  },
};
