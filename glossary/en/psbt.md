# PSBT

**Category:** Technology

## Plain English

Short for "Partially Signed Bitcoin Transaction," a standard format that lets a transaction be built, passed around, and signed by multiple parties or devices before it's broadcast to the network.

## Analogy

Think of it like a contract that needs signatures from several people before it's valid. The document travels from person to person, each adding their signature, and only becomes official once everyone required has signed. A PSBT lets a transaction travel between an offline hardware wallet and an online computer, collecting signatures, without ever exposing private keys to the internet.

## In Context

*"Export this as a PSBT and sign it on your hardware wallet."*

**What this means:** The unsigned transaction data is saved in the PSBT format, moved to a hardware wallet (often via a USB cable or QR code), signed there in an offline environment, and then brought back to be broadcast.

## Why It Matters

PSBT made multisignature setups and hardware wallet signing far more standardized and interoperable across different wallet software. It's especially important for keeping private keys air-gapped from internet-connected devices.

## Related Terms

- Multisignature
- Hardware Wallet
- Digital Signature
- Air-Gapped Wallet

---
