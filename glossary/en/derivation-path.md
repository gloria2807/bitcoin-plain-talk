# Derivation Path

**Category:** Technology

## Plain English

A specific address on a map that tells an HD wallet exactly which key to generate from the seed phrase, following a standardized numbering system.

## Analogy

Think of it like a set of directions to one specific book in a giant library organized by floor, shelf, and slot number. The library itself (the seed phrase) contains every possible book, but the derivation path tells the wallet exactly which one to pull out at any given moment.

## In Context

*"This wallet uses the derivation path m/84'/0'/0' for native SegWit addresses."*

**What this means:** The numbers describe a standardized route the wallet follows to generate a particular family of addresses. Using the correct derivation path matters when restoring a wallet in different software, since the wrong path can generate a completely different, empty-looking set of addresses.

## Why It Matters

If you restore a seed phrase into a different wallet app using the wrong derivation path, it can look like your funds have vanished, even though they're still safe under the correct path. Knowing this term helps avoid panic and know what to check when troubleshooting a wallet restore.

## Related Terms

- HD Wallet
- Seed Phrase
- Private Key
- Descriptor

---
