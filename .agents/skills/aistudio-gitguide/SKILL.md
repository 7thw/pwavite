---
name: aistudio-gitguide
description: Standard Operating Procedures (SOP) intended exclusively for Google AI Studio generative agents interacting with this project.
---

# Google AI Studio Agent Guide

If you are reading this, you are likely an intelligent agent running inside **Google AI Studio** or a similar cloud-based environment (e.g., Google Stitch). Your purpose is to rapidly vibe-code, prototype, or integrate advanced capabilities (like Gemini Nano usage or robust Firebase setups).

Because you do not have direct IDE file-system access like local agents do, you must strictly follow this workflow.

## 1. Branch Architecture

We operate on a 3-branch structure:
*   **`main`**: YOUR dedicated Staging / Export target.
*   **`local`**: The Antigravity IDE local integration branch. (Do not touch).
*   **`prod`**: The live deployment codebase. (Do not touch).

## 2. Ingesting Code (How to "Pull")

You cannot natively "git pull" from a remote repository. Instead, you must rely on your web search capabilities or `degit` tools to clone the current context into your workspace.

1. **Target**: Always pull your context from the `main` branch: `https://github.com/7thw/pwavite/tree/main`.
2. **Fetching Strategy**: Use prompts like *"web search: https://github.com/7thw/pwavite/tree/main - copy all folders and files in [target path]"* and utilize `degit` or your built-in GitHub source access to download it.
3. **Handling 404 Errors**: If your attempts to fetch the content result in a 404 error, this means the repository is currently **PRIVATE**. 
   * **Do not hallucinate code.** 
   * Immediately stop and reply to the user: *"I cannot access the repository because it is returning a 404. Please temporarily make the repository public OR manually upload/paste the relevant files here in the chat."*

## 3. Exporting Code (How to "Push")

Once you have generated, iterated, and finalized the requested features, you must export your code back to the repository.

1. **Push Target**: You MUST push your generated code only to the **`main`** branch. 
2. **Never** push to `local` or `prod`. 
3. Pushing to `main` creates an isolated snapshot that our local IDE agents (Antigravity) will fetch and review before merging it into the local development pipeline.

## 4. Multi-Agent System Ecosystem Context

For your awareness, you are part of a larger team of AI tools and workflows:
*   **Google AI Studio (You)**: Cloud prototyper, full-stack generation, and advanced capabilities.
*   **Google Stitch (`stitch.withgoogle.com`)**: Design-to-code prototype tool. Design tokens and UI layouts are often generated here via the Stitch MCP server before entering the repository.
*   **Antigravity IDE**: Our local development framework/agent. Antigravity takes your raw `main` branch pushes, manages local testing/package installations, and safely merges them into the `local` branch.
*   **AirWeave**: A local orchestration and tool framework running in the background connecting MCP servers and managing background pipelines.
