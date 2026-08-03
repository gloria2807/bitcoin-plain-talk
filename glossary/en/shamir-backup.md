# Shamir Backup

**Category:** Security

## Plain English

A method of splitting a seed phrase into multiple separate pieces, called shares, where only a certain number of them, not all, are needed to reconstruct the original wallet.

## Analogy

Imagine a treasure map torn into five pieces, but designed so that any three of the five pieces together reveal the whole map, while two pieces alone reveal nothing useful. You could give pieces to trusted family members in different locations, and losing one or two pieces wouldn't lock you out, but a thief finding just one or two also couldn't access anything.

## In Context

*"I split my seed into a 3-of-5 Shamir backup and gave shares to people I trust."*

**What this means:** The person's seed phrase was mathematically split into five separate shares, any three of which can reconstruct the wallet. They distributed the shares to reduce the risk of losing everything if one location is destroyed or a single share is lost.

## Why It Matters

A single seed phrase written on one piece of paper is a single point of failure, lose it or have it damaged in a fire, and your funds are gone forever. Shamir backup reduces that risk by requiring a threshold of shares, protecting against both loss and theft of any one individual piece.

## Related Terms

- Seed Phrase
- Multisignature
- Cold Storage
- Passphrase

---
