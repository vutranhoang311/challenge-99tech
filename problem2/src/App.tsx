import SwapToken from "./components/featured/SwapToken";
import useBalance from "./hooks/useBalance";
import useToken from "./hooks/useToken";

function App() {
  const { tokens, isLoading: isTokensLoading } = useToken();
  const { balance, isLoading: isBalanceLoading } = useBalance();

  const isLoading = isTokensLoading || isBalanceLoading;

  return (
    <div className="relative mx-auto flex size-full max-w-xl items-center justify-center p-3 sm:p-4 md:p-6">
      <SwapToken tokens={tokens} tokensBalance={balance} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-neutral-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-neutral-300">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
