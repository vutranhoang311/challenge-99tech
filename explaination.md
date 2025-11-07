# Refactor Explanation

## 1. Move `getPriority` outside the Component

**Before:** `getPriority` was defined inside the component.  
**After:** Moved outside of `WalletPage`.
**Reason:**  
Define it outside prevents re-creation of the function on every render, improving performance and readability.
Utility functions that do not depend on component state or props should live outside the React component

## 2. Rename `sortedBalances` → `validBalances`

**Before:** Variable name `sortedBalances` was used.  
**After:** Renamed to `validBalances`.
**Reason:**

## 3. Clean Up the Filter Logic

**Before:**

```ts
if (balancePriority > -99) {
  if (balance.amount <= 0) {
    return true
  }
}
return false
```

**After:**

```ts
return balancePriority > -99 && balance.amount > 0
```

**Reason:**
Fix to single-line condition for easier to read and understand.
Corrected the logic — previously it would have returned `true` for invalid amounts which is amount < 0.

## 4. Fix Sorting Logic

**Before:**

```ts
if (leftPriority > rightPriority) {
  return -1
} else if (rightPriority > leftPriority) {
  return 1
}
```

**After:**

```ts
if (leftPriority !== rightPriority) {
  return rightPriority - leftPriority
}
return lhs.currency.localeCompare(rhs.currency)
```

**Reason:**
Handles **equal priority** case properly. Fix comparison logic
Add **secondary sort** by `currency` name to ensure consistent ordering when priorities match.

## 5. Remove Unused Variables

**Removed:**

```ts
const formattedBalances = ...
```

**Reason:**  
Variable was never used in the rendering logic. Watse of memory leaks.

## 6. Correct Interface Usage

**Before:**  
The `rows` mapping used `FormattedWalletBalance`.  
**After:**  
Changed to `WalletBalance`.

**Reason:**  
The mapped balances come directly from `validBalances` (which use `WalletBalance`), not the formatted version.  
This prevents type mismatch errors and improves correctness.

## 7. Avoid Using `index` as React Key

**Before:**

```tsx
key = { index }
```

**After:**

```tsx
key={balance.currency}
```

**Reason:**  
Using array indices as React keys can cause rendering bugs (e.g., when list order changes).  
Using a **unique field like `currency`** ensures stable keys and predictable updates.

## 8. Remove Unnecessary `children` Destructuring

**Before:**

```ts
const { children, ...rest } = props
```

**After:**

```ts
const { ...rest } = props
```

**Reason:**  
The component does not use `children`, so destructuring it is redundant.

## 9. Simplify `useMemo` Dependencies

**Before:**

```ts
}, [balances, prices])
```

**After:**

```ts
}, [balances])
```

**Reason:**  
`prices` is not used inside the memoized function, so including it as a dependency would cause unnecessary recalculations.
