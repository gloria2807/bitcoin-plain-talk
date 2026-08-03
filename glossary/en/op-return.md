# OP_RETURN

**Category:** Technology

## Plain English

A special piece of Bitcoin script that lets someone attach a small amount of arbitrary data to a transaction, without creating a spendable output.

## Analogy

Think of it like the memo line on a paper check. It doesn't move any extra money and the bank doesn't have to do anything with it, but it lets you attach a short note to the transaction for reference, like "rent for March."

## In Context

*"That transaction used OP_RETURN to timestamp a document on the blockchain."*

**What this means:** Someone embedded a small piece of data, often a hash representing a document, into a Bitcoin transaction using OP_RETURN. Because the transaction is permanently recorded on the blockchain, it proves that specific data existed at that exact point in time.

## Why It Matters

OP_RETURN gives Bitcoin limited but useful data-storage capabilities without bloating the "unspent" set that nodes must track, since OP_RETURN outputs are explicitly unspendable. It's used for things like timestamping, notarization, and some token protocols built on top of Bitcoin.

## Related Terms

- Transaction
- Blockchain
- UTXO
- Dust

---
