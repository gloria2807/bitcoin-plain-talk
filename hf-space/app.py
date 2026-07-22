"""
Bitcoin Plain Talk — Swahili fine-tune demo.

Loads the Qwen3 base model once, then compares generation with the LoRA
adapter disabled (base model) vs enabled (fine-tuned) for the same prompt.
"""

import contextlib
import os

import gradio as gr
import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

BASE_MODEL = os.environ.get("BASE_MODEL", "Qwen/Qwen3-1.7B-Instruct")
ADAPTER_REPO = os.environ.get("ADAPTER_REPO", "<your-org>/bitcoin-plain-talk-qwen3-1.7b-sw-lora")
MAX_NEW_TOKENS = 220

tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)
base_model = AutoModelForCausalLM.from_pretrained(BASE_MODEL, torch_dtype=torch.float32)
model = PeftModel.from_pretrained(base_model, ADAPTER_REPO)
model.eval()


def _generate(question: str, use_adapter: bool) -> str:
    messages = [{"role": "user", "content": question}]
    input_ids = tokenizer.apply_chat_template(
        messages, tokenize=True, add_generation_prompt=True, return_tensors="pt"
    )
    adapter_ctx = contextlib.nullcontext() if use_adapter else model.disable_adapter()
    with torch.no_grad(), adapter_ctx:
        output_ids = model.generate(
            input_ids,
            max_new_tokens=MAX_NEW_TOKENS,
            temperature=0.7,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id,
        )
    return tokenizer.decode(output_ids[0][input_ids.shape[1]:], skip_special_tokens=True).strip()


def compare(question: str):
    question = (question or "").strip()
    if not question:
        return "", ""
    return _generate(question, use_adapter=False), _generate(question, use_adapter=True)


demo = gr.Interface(
    fn=compare,
    inputs=gr.Textbox(
        label="Swali kuhusu Bitcoin (Kiswahili)",
        placeholder="Eleza UTXO kwa maneno rahisi.",
    ),
    outputs=[
        gr.Textbox(label="Qwen3 ya msingi (bila mafunzo)"),
        gr.Textbox(label="Bitcoin Plain Talk (baada ya kufunzwa)"),
    ],
    title="Bitcoin Plain Talk — Swahili fine-tune demo",
    description=(
        "Linganisha jibu la mfano wa Qwen3 wa kawaida na mfano ulio funzwa "
        "kwenye data ya Bitcoin Plain Talk kwa Kiswahili."
    ),
)

if __name__ == "__main__":
    demo.launch()
