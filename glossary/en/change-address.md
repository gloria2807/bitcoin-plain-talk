# Change Address

**Category:** Transactions

## Plain English

The address that receives the "leftover" bitcoin from a transaction when you spend from a UTXO that's larger than the amount you actually meant to send.

## Analogy

Imagine paying for a $3 coffee with a $20 bill. You don't hand over the whole $20 and lose the rest, you get $17 back in change. Bitcoin works the same way: if your UTXO holds 1 bitcoin and you only want to send 0.1, the remaining 0.9 gets sent back to you at a change address.

## In Context

*"My wallet automatically sent the leftover funds to a new change address."*

**What this means:** After spending part of a UTXO, the wallet automatically created a new address to receive the remaining, unspent portion, rather than losing it or leaving it stuck at the original address.

## Why It Matters

Bitcoin transactions can only spend a whole UTXO at a time, there's no way to spend "part" of one directly, which is why change addresses exist. Reusing the same address for change (instead of a fresh one) is a common privacy mistake that can link transactions together.

## Related Terms

- UTXO
- Address Reuse
- Transaction
- HD Wallet

---
