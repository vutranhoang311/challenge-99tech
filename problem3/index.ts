interface WalletBalance {
  currency: string
  amount: number

  // missing
  blockchain: string
}
interface FormattedWalletBalance {
  currency: string
  amount: number
  formatted: string
}

interface Props extends BoxProps {}

// getPriority should be outside of component
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  // no use children
  // const { children, ...rest } = props
  const { ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        // lhsPriority is undefined. should be balancePriority
        // if (lhsPriority > -99) {
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true
          }
        }
        return false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }

        // missing condition rightPriority === leftPriority
        return 0
      })
    // no need prices. not use above
    // }, [balances, prices])
  }, [balances])

  // No use
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   }
  // })

  const rows = sortedBalances.map(
    // Wrong interface, should be WalletBalance
    // (balance: FormattedWalletBalance, index: number) => {
    (balance: WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          // anti-pattern in react, easy cause error like after sort.
          // key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
