# PayJoin

**Category:** Privacy

## Plain English

A payment technique where both the sender and receiver contribute funds to the same transaction, breaking a common assumption that chain analysis tools rely on to guess ownership of transaction inputs.

## Analogy

Normally, if you watch a transaction, you can safely assume that whoever's money went in belongs to just one person, the sender. PayJoin is like two separate people combining their money into a single joint payment at a checkout counter, so anyone watching can no longer be sure which person's funds actually paid for what.

## In Context

*"That merchant's checkout supports PayJoin, so payments to them are harder to trace."*

**What this means:** When paying that merchant, the transaction is structured so both the buyer's and the merchant's coins appear together as inputs, muddying an outside observer's ability to cleanly separate "sender" money from "receiver" money.

## Why It Matters

Many chain analysis techniques rely on the assumption that all inputs to a transaction belong to the sender. PayJoin quietly breaks that assumption on an ordinary-looking transaction, without needing dramatic-looking coin mixing, making surveillance less reliable at scale.

## Related Terms

- Coinjoin
- Chain Analysis
- Privacy
- UTXO

---
