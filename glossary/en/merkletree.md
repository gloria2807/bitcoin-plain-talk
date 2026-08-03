# Merkle Tree

**Category:** Technology

## Plain English

A mathematical structure that bundles all the transactions in a block into a single fingerprint, making it easy to verify that nothing has been tampered with.

## Analogy

Imagine you have 100 receipts from a market trip. Instead of checking each receipt one by one, you group them in pairs, create a summary for each pair, then summarise those summaries, until you have one final number that represents all 100 receipts. If anyone changes even one receipt, the final number changes completely. A Merkle Tree does exactly this for Bitcoin transactions, it turns thousands of transactions into one short fingerprint called the Merkle Root.

## In Context

The Merkle Root is stored in every block header.

Each block contains a single hash that is a fingerprint of every transaction in that block. If even one transaction were altered, the Merkle Root would change and the entire block would be rejected by the network. This is how Bitcoin guarantees that transaction records cannot be secretly modified.

## Why It Matters

Merkle Trees make Bitcoin efficient and tamper-proof at the same time. A lightweight wallet on your phone doesn't need to download every transaction, it just checks the Merkle Root to confirm a transaction is real. It's the reason you can verify a payment without downloading the entire blockchain.

## Related Terms

 - Block
 - Blockchain
 - Cryptographic Hash
 - Confirmation

---
