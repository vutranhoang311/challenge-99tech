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

  // should rename: example: validBalances
  // const sortedBalances = useMemo(() => {
  const validBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        // lhsPriority is undefined. should be balancePriority
        // if (lhsPriority > -99) {

        // if (balancePriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true
        //   }
        // }
        // return false
        // cleaner in single line.
        return balancePriority > -99 && balance.amount > 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        // if (leftPriority > rightPriority) {
        //   return -1
        // } else if (rightPriority > leftPriority) {
        //   return 1
        // }
        // miss one condition if rightPriority === leftPriority

        if (leftPriority !== rightPriority) {
          return rightPriority - leftPriority
        }
        // if same priority then compare the alphabet priority
        return lhs.currency.localeCompare(rhs.currency)
      })
    // no need prices. not use above
    // }, [balances, prices])
  }, [balances])

  // No use, remove formattedBalances
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   }
  // })

  const rows = validBalances.map(
    // wrong interface, should be WalletBalance
    // (balance: FormattedWalletBalance, index: number) => {
    (balance: WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          // using index as key can cause bugs
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
