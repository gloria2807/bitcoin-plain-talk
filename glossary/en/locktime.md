# Locktime

**Category:** Transactions

## Plain English

A setting on a Bitcoin transaction that prevents it from being added to the blockchain until a specified future block height or time is reached.

## Analogy

Think of it like a postdated check that a bank won't cash until a specific date arrives, no matter how eager you are to deposit it sooner. Locktime works the same way for a Bitcoin transaction: it exists, but the network won't confirm it until the specified point in the future.

## In Context

*"That transaction has a locktime, it won't confirm until next month."*

**What this means:** The transaction has been created and signed, but it includes a rule that tells the network not to accept it until a certain future block or date, so it will simply sit unconfirmed until that condition is met.

## Why It Matters

Locktime enables useful features like time-delayed payments and is a building block for more advanced setups like the Lightning Network, where transactions sometimes need to be held back until specific conditions are met.

## Related Terms

- Timelock
- Transaction
- Lightning Network
- Replace By Fee

---
