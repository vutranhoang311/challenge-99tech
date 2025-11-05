import SwapToken from "./components/featured/SwapToken";
import useToken from "./hooks/useToken";
import type { TokenBalance } from "./types/swap.type";

const mockUserBalance: TokenBalance[] = [
  { currency: "LUNA", balance: 10.532 },
  { currency: "BUSD", balance: 3000 },
  { currency: "ETH", balance: 10.532 },
  { currency: "USD", balance: 10000 },
  { currency: "bNEO", balance: 10000 },
];

function App() {
  const { tokens } = useToken();
  return (
    <>
      <SwapToken tokens={tokens} tokensBalance={mockUserBalance} />
    </>
  );
}

export default App;
