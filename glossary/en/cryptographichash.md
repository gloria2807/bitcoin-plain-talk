# Cryptographic Hash

**Category:** Technology

## Plain English

A mathematical function that takes any input - a word, a sentence, an entire block of transactions - and turns it into a fixed-length string of letters and numbers. If you change even one character in the input, the output changes completely.

## Analogy

Imagine a machine that takes any document you feed it, a single word or an entire book, and prints out a unique 10-digit code. If you change even one full stop in the document, the code is completely different. But you can never work backwards from the code to figure out what the original document said. Bitcoin uses a version of this called SHA-256, and it's what holds the entire blockchain together.

## In Context

Each block contains the hash of the previous block.

Every block in the Bitcoin blockchain is linked to the one before it through its hash - a unique fingerprint. If anyone tried to alter an old transaction, its hash would change, breaking the link to every block that came after it. The entire chain would instantly be recognised as invalid.

## Why It Matters

Cryptographic hashes are what make Bitcoin tamper-proof. You can't change the past without redoing all the work from that point to today and the entire honest network would reject it. It's the invisible security layer behind everything Bitcoin does, from verifying transactions to securing wallets.

## Related Terms

 - Proof of Work
 - Block
 - Merkle Tree
 - Mining
---
