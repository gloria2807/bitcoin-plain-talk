# Digital Signature

**Category:** Technology

## Plain English

A piece of cryptographic proof that shows a transaction was authorized by the owner of a private key, without revealing the key itself.

## Analogy

Imagine a wax seal pressed onto a letter with a unique family stamp. Anyone can look at the seal and confirm it came from that family's stamp, but they can't recreate the stamp just by looking at the seal. A digital signature works similarly: it proves you own the private key without ever exposing it.

## In Context

*"The transaction includes a digital signature proving you own the funds."*

**What this means:** Before your Bitcoin transaction is accepted, your wallet uses your private key to generate a unique signature for that specific transaction. The network checks the signature against your public key to confirm it's genuine, without your private key ever being shared.

## Why It Matters

Digital signatures are what make Bitcoin transactions secure and tamper-proof. Nobody can spend your bitcoin without your private key, and nobody can alter a signed transaction without invalidating the signature, which is instantly detectable by the network.

## Related Terms

- Private Key
- Public Key
- Transaction
- Cryptographic Hash

---
