# Replace-by-Fee

**Category:** Technology

## Plain English

A feature that lets you increase the fee on a pending transaction if it's taking too long to confirm, by sending a new transaction with the same input but a higher fee. Often written as "RBF".

## Analogy

Imagine you're at a slow restaurant and the waiter hasn't taken your order. Instead of waiting, you can tell them: "Actually, I'll pay double if you take my order in the next five minutes." Replace-by-Fee works the same way, if your transaction is stuck in the mempool, you can bump the fee to get it confirmed faster.

## In Context

My transaction was unconfirmed for an hour, so I used RBF to increase the fee.

What this means: Your original transaction included a low fee. You created a new transaction that spends the same Bitcoin but sends it somewhere else (or back to yourself) with a much higher fee. The network will prioritise the new one because it pays more.

## Why It Matters

RBF gives you flexibility. In a busy period when fees spike unexpectedly, you don't have to wait hours for a slow transaction, you can bump it and get confirmed quickly. However, some merchants disable RBF support because they're concerned about payment reversals.

## Related Terms

- Transaction Fee
- Mempool
- Confirmation
- CPFP
---
