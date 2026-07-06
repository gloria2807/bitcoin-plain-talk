# Routing

**Category:** Technology

## Plain English

The process on the Lightning Network of finding the best path for a payment to travel through multiple channels from sender to receiver.

## Analogy

Imagine a network of paths connecting villages. You want to send a message to someone in a distant village. There's no direct path, but you can send the message through intermediary villages: A → B → C → D. Routing automatically figures out the fastest path. Lightning routing works the same way, it finds the shortest chain of channels that connects you to the person you want to pay.

## In Context

The Lightning Network routed my payment through three channels to reach the recipient.

What this means: You didn't have a direct channel open with the person you were paying, so the network automatically found a path through other channels. Your payment went through intermediary nodes, each of whom facilitated the transfer in exchange for a small fee.

## Why It Matters

Routing is what makes Lightning truly scalable. You don't need to open a channel with everyone you want to pay, just with a few well-connected nodes. Routing finds the path. This is similar to how the internet works: your data doesn't go directly from you to the website, it's routed through multiple servers.

## Related Terms

- Lightning Network
- Channel
- Payment Channel
- Bitcoin
---