---
title: Bitcoin Plain Talk Swahili Demo
emoji: 🟠
colorFrom: orange
colorTo: yellow
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
license: apache-2.0
---

# Bitcoin Plain Talk — Swahili fine-tune demo

Side-by-side comparison of the plain Qwen3 base model vs. the same model with
the Bitcoin Plain Talk Swahili LoRA adapter applied — both loaded once, so
the comparison is a real before/after of the fine-tune, not two separate
models.

## Stack

- Base model: `Qwen/Qwen3-1.7B-Instruct` (Apache 2.0)
- Adapter: trained via `notebooks/finetune-qwen3-swahili.ipynb` in the main
  repo, using Unsloth (Apache 2.0) on a free Colab T4
- Serving: Gradio + `transformers` + `peft` (all Apache 2.0), on this Space's
  free CPU tier

## Deploying

This directory is not yet pushed to a live Space. To publish it:

```bash
huggingface-cli login
huggingface-cli repo create bitcoin-plain-talk-sw-demo --type space --space_sdk gradio
huggingface-cli upload <your-org>/bitcoin-plain-talk-sw-demo hf-space/ .
```

Then set the `ADAPTER_REPO` variable in `app.py` (or as a Space secret/env
var) to wherever the trained adapter was pushed in the fine-tuning notebook.

Free CPU-tier inference is slow (expect ~10-40s per side, longer on first
request while the Space wakes up and loads both the base weights and the
adapter) — acceptable for a stakeholder demo, not for production traffic.
