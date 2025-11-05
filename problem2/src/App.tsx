import SwapToken from "./components/featured/SwapToken";
import useToken from "./hooks/useToken";

const mockUserBalance: {
  icon: string;
  balance: number;
}[] = [
  { icon: "BUSD", balance: 3000 },
  { icon: "USDT", balance: 10000 },
  { icon: "BUSD", balance: 3000 },
  { icon: "ETH", balance: 10.532 },
];

function App() {
  const { tokens } = useToken();
console.log(tokens)
  return (
    <>
      <SwapToken tokens={tokens} balance={mockUserBalance} />
    </>
  );
}

export default App;
