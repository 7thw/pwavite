---
name: gitguide
description: Standard Operating Procedures (SOP) intended for Local IDE Agents (Antigravity) mapping the workflow between Antigravity, Google Stitch, Google AI Studio, and AirWeave.
---

# Antigravity Developer Guide

You are operating within the local Antigravity IDE environment. You are the orchestrator of the multi-agent pipeline, bridging design prototypes (Stitch) and generative components (AI Studio) down to a stable, deployable state.

## 1. Branch Architecture

We enforce a strict 3-branch architecture to coordinate safe code transitions:

*   **`prod`**: The source of truth and active live deployment branch. Code here must be flawlessly verified.
*   **`local`**: YOUR primary working environment. All manual editing, testing (`pnpm dev`), and conflict resolution happens here. Code from generative tools (like AI Studio) is merged into this branch.
*   **`main`**: The **Generative Staging Target**. Because tools like Google AI Studio default to pushing here, `main` does NOT represent production. It acts as a messy 'drop-zone' for cloud agents to dump their snapshots.

## 2. Multi-Agent Integration Roles

### A. Google AI Studio
*   **Role:** Cloud-based code generator and prototyper.
*   **Behavior (Export-Only):** AI Studio cannot securely pull from private remote branches natively. It instead fetches from public URLs using `degit` and pushes back as an isolated snapshot exclusively to the `main` branch.
*   **Your Action:** When AI Studio completes a feature, you must review its output:
    1. `git fetch origin`
    2. Ensure you are on `local`.
    3. `git merge origin/main`
    4. Resolve structural conflicts, test locally, and prevent any of AI Studio's hallucinatory deletions from clobbering existing functionality.

### B. Google Stitch (Design-to-Code)
*   **Role:** Rapid prototyping and design token generation.
*   **Your Action:** When transitioning designs to code, utilize the Google Stitch MCP Server (if enabled). You can prompt directly against the Stitch projects using the IDE to construct the exact components designed by the user, skipping manual Figma imports. 

### C. AirWeave
*   **Role:** Local orchestration platform.
*   **Your Action:** AirWeave runs in parallel connecting your MCP servers and background tasks. Rely on AirWeave configuration files for advanced MCP networking outside of basic IDE prompts.

## 3. Workflow Procedure Checklist

When initiating a new feature cycle or pulling down AI Studio code:

1. **Verify State:** Ensure you are on the `local` branch. Do not code directly on `prod`.
   ```bash
   git checkout local
   ```
2. **Pull Agent Generatives:** Pull whatever AI Studio has dropped into `main`.
   ```bash
   git merge origin/main
   ```
3. **Refine & Build:** Utilize IDE tools. Run tests, start `pnpm dev`, iterate on code, connect to Stitch MCP for UI fidelity.
4. **Deploy:** Once the integration is completely stable and the user approves the outcome:
   ```bash
   git checkout prod
   git merge local
   git push origin prod
   ```
5. **Reset:** Switch back to `local` to continue further iteration.
   ```bash
   git checkout local
   ```

## Appendix: AI Studio Build Mode Context
- AI Studio has full-stack runtimes (Firebase, node.js) but should be sandboxed in `main`.
- AI Studio uses `requestFramePermissions` in `metadata.json` to handle hardware device access.
- See `.agents/skills/aistudio-gitguide/SKILL.md` for the explicit rules targeting AI Studio itself on how it circumvents private repository limits via temporary public access.
