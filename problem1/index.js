const sum_to_n_loop = (n) => {
  let result = 0

  if (!Number.isInteger(n) || n < 1) {
    return result
  }

  for (let i = 1; i <= n; i++) {
    result += i
  }

  return result
}

const sum_to_n_formula = (n) => {
  if (!Number.isInteger(n) || n < 1) {
    return 0
  }
  return (n * (n + 1)) / 2
}

const sum_to_n_recursion = (n) => {
  if (n <= 0 || !Number.isInteger(n)) {
    return 0
  }
  return n + sum_to_n_recursion(n - 1)
}

const n = 6

console.log(`sum_to_n_loop ${n}: ${sum_to_n_loop(n)}`)
console.log(`sum_to_n_formula with ${n}: ${sum_to_n_formula(n)}`)
console.log(`sum_to_n_recursion with ${n}: ${sum_to_n_recursion(n)}`)
