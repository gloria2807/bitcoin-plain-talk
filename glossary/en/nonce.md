# Nonce

**Category:** Mining

## Plain English

A random number that miners change over and over while trying to find a valid hash for a new block, the "number used once" in each mining attempt.

## Analogy

Imagine trying to guess a combination lock by changing just one dial at a time, checking after each turn to see if it opens. The nonce is that one number miners keep adjusting, testing millions or billions of times per second, until they stumble on a combination that produces a hash meeting the network's difficulty target.

## In Context

*"Miners tried billions of nonce values before finding one that worked."*

**What this means:** The mining hardware ran the block's data through the SHA-256 function over and over, changing the nonce each time, until it finally found a value that produced a hash low enough to satisfy the current difficulty requirement.

## Why It Matters

The nonce is at the heart of proof of work. Because there's no shortcut to guessing the right nonce other than brute-force trial and error, finding a valid one proves real computational effort was spent, which is what secures the network against tampering.

## Related Terms

- Proof of Work
- SHA-256
- Difficulty
- Mining

---
