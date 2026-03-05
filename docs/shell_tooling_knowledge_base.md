# Shell & Tooling Knowledge Base

## File Layout & Canonical Paths (AUTHORITATIVE)

All agents (human or AI, including Copilot) **must write files to these exact paths**. Do not invent alternatives.

```
repo-root/
├─ policy/
│  ├─ tooling-policy.yaml        # AUTHORITATIVE policy (source of truth)
│  └─ tooling-policy.json        # Optional generated mirror (read-only)
├─ scripts/
│  └─ validate_tooling_policy.py # Local + CI policy validator
├─ .pre-commit-config.yaml       # Local enforcement hook
└─ docs/
   └─ shell-tooling-knowledge-base.md  # This document (human reference)
```

**Rules**
- `tooling-policy.yaml` is the single source of truth
- JSON is derived, never edited directly
- Validation logic lives only in `scripts/`
- Copilot must target these paths exactly

---

## Purpose
This document defines the **authoritative tooling model** for this system. It exists to prevent mixing environments, managers, and responsibilities when creating new projects, scripts, or configuration files. All agents and future work must adhere to this separation of concerns.

---

## Operating Environment
- **OS:** macOS
- **Shell:** zsh
- **Framework:** oh-my-zsh
- **Prompt:** powerlevel10k

This environment is optimized for **clarity, speed, and intentional tooling**, not experimentation or overlapping managers.

---

## JavaScript / Node.js Stack

### Node Runtime
- **Runtime:** Node.js
- **Manager:** Volta

**Volta responsibilities:**
- Install and manage Node versions
- Pin Node (and package manager) versions per project
- Ensure reproducible toolchains across machines

**Rules:**
- Do NOT install Node via other version managers (nvm, fnm, asdf, mise)
- Do NOT manually switch Node versions outside Volta

---

### Package Management (Node)

- **Primary package manager:** pnpm
- **Secondary / compatibility tool:** npm

**pnpm responsibilities:**
- Install project dependencies
- Manage lockfiles
- Run scripts (`pnpm run`, `pnpm build`, etc.)

**npm responsibilities:**
- System-level installs
- Legacy tooling that hard-requires `npm`

**Rules:**
- Use **pnpm for all project dependency work**
- Do NOT use npm for day-to-day dependency management
- npm exists for compatibility only

---

## Python Stack

- **Single tool:** uv

**uv responsibilities:**
- Python package installation
- Virtual environment handling (internally)
- Dependency resolution

**Explicit exclusions:**
- pip
- poetry / poetry-env
- virtualenv / virtualenvwrapper
- pipenv
- conda / conda-env
- pyenv

**Rules:**
- All Python work must go through `uv`
- Never introduce another Python manager or environment system

---

## Containers & Infrastructure

### Docker
- **Tools:** docker, docker-compose

**Responsibilities:**
- Container runtime
- Local service orchestration

**Rules:**
- Docker is allowed
- Kubernetes tooling is explicitly excluded

### Infrastructure as Code
- **Tool:** terraform

**Responsibilities:**
- Infrastructure provisioning

---

## Navigation & Shell Productivity

### Directory Navigation
- **Tool:** zoxide

**Rules:**
- zoxide is the only directory-jump system
- Do NOT add z, autojump, fasd, wd, or similar tools

### Search & UX
- fzf: fuzzy search
- eza: modern `ls`
- history + history-substring-search: command recall

---

## Security & Credentials

### SSH
- **Agent:** 1Password SSH Agent

**Rules:**
- Do NOT use system `ssh-agent`
- All SSH keys are managed via 1Password

### GPG
- **Tool:** gpg-agent

**Rules:**
- gpg-agent is allowed only for GPG-specific workflows
- It does not replace or interfere with SSH key handling

---

## Clipboard & macOS Utilities

- copybuffer: copy command output
- copyfile: copy file contents
- copypath: copy file paths
- macos / brew / battery: OS-level integrations

These are complementary and intentionally granular.

---

## Explicitly Forbidden Tooling (Do Not Introduce)

- Multiple version managers for the same language
- Multiple directory navigation systems
- Kubernetes tooling (kubectl, helm, k9s, etc.)
- Alternative prompts or shell frameworks
- Python tools outside uv

---

## tmux + direnv Operational Rules (MANDATORY)

### Core Risk Statement
`tmux` **preserves environment state**, while `direnv` **mutates environment state dynamically**. When combined incorrectly, this can result in silent environment leakage across projects.

These rules exist to prevent that failure mode.

### Hard Rules
1. **tmux sessions are project-scoped**
   - One project per tmux session
   - Do NOT reuse a tmux session across unrelated projects

2. **Never trust a long-lived tmux session**
   - If a tmux session survives a day or more, assume the environment may be stale
   - Restart the session when changing context

3. **direnv is authoritative for environment variables**
   - If a value conflicts, direnv wins
   - No manual exports should override direnv-managed values

4. **Detached tmux sessions must be treated as frozen state**
   - Re-attaching does NOT guarantee env refresh
   - Explicit reload is required (see below)

5. **Secrets + tmux require explicit resets**
   - SSH, cloud credentials, tokens must be revalidated after reattach

---

## Forcing direnv Reloads Inside tmux

### Preferred Method (Safe & Explicit)
From any tmux pane:

```sh
cd .. && cd -
```

This forces a directory transition, triggering direnv unload + reload.

### Explicit Reload Command

```sh
direnv reload
```

Use this after:
- Re-attaching a tmux session
- Switching git branches with env changes
- Editing `.envrc`

### Recommended Habit
> If you did not see direnv output, assume it did not reload.

---

## Safe tmuxinator Template

This template minimizes environment bleed and makes scope explicit.

```yaml
# ~/.config/tmuxinator/<project>.yml
name: project_name
root: ~/projects/project_name

on_project_start: direnv allow

windows:
  - editor:
      panes:
        - cd .
  - shell:
      panes:
        - cd .
```

### tmuxinator Safety Rules
- No long-running background services unless required
- No implicit exports
- Always land in project root
- Let direnv load naturally

---

## Pre-Flight Checklist (MANDATORY BEFORE ANY NEW WORK)

Before creating **any** new project, script, container, or configuration file, agents must confirm:

1. **Language identified** (Node / Python / Infra / Shell)
2. **Correct manager selected** (Volta, pnpm, uv, terraform, docker)
3. **No competing manager already active**
4. **Current directory matches intended project scope**
5. **direnv state confirmed** (explicit output observed)
6. **tmux session verified as project-scoped**

If any step is unclear, stop and resolve before proceeding.

---

## Red Flags (Indicators of Environment Leakage)

Immediate investigation is required if any of the following occur:

- Different behavior between tmux panes in the same session
- Tools reporting unexpected versions (Node, Python, package managers)
- Missing or extra environment variables without explanation
- Secrets appearing available outside their expected project
- direnv not printing load/unload messages when expected

**Rule:** Red flags are not debugged casually. Reset the environment first.

---

## Quick Decision Matrix

| Task | Tool | Forbidden Alternatives |
|----|----|----|
| Node version | Volta | nvm, fnm, asdf, mise |
| Node packages | pnpm | npm (for projects), yarn |
| System Node installs | npm | pnpm |
| Python packages | uv | pip, poetry, pipenv, conda |
| Containers | docker | podman, kubernetes |
| Infra | terraform | pulumi, ansible |
| Env vars | direnv | manual exports |
| Navigation | zoxide | z, autojump, fasd |

---

## Reset Playbook (AUTHORITATIVE RECOVERY PROCEDURE)

If **any red flag** is detected, follow this sequence **in order**. Do not attempt partial fixes.

### Full Environment Reset
1. Exit tmux completely:
   ```sh
   tmux kill-server
   ```
2. Return to a neutral directory:
   ```sh
   cd ~
   ```
3. Ensure no direnv state is active:
   ```sh
   direnv status
   ```
4. Re-enter the project directory:
   ```sh
   cd ~/projects/<project>
   ```
5. Observe explicit direnv load output

### Node Sanity Check
```sh
node -v
pnpm -v
volta list
```

### Python Sanity Check
```sh
uv pip list
```

**Rule:** If versions or outputs are unexpected, stop and re-evaluate tool selection.

---

## New Project Bootstrap Standard

Every new project **must** follow this initialization order:

1. Create project directory
2. Initialize version manager (if applicable)
   - Node: Volta
   - Python: uv
3. Create and approve `.envrc`
4. Run `direnv allow`
5. Initialize package manager
   - Node: pnpm
   - Python: uv
6. Commit lockfiles immediately

**Rule:** No application code before environment is stable and committed.

---

## CI / Automation Sanity Rules

Automated systems must enforce the same boundaries as local development.

### Required Checks
- Exactly one Node version manager present
- pnpm lockfile present for Node projects
- No forbidden tools referenced (pip, poetry, nvm, kubectl, etc.)
- `.envrc` changes reviewed explicitly

### Failure Policy
> CI failure due to tool violations is considered a **configuration error**, not a code error.

---

## How to Extend the Policy Safely (MANDATORY PROCESS)

Policy changes are **governed changes**, not casual edits. Any extension must preserve determinism and single-responsibility.

### Allowed Extensions
You MAY extend the policy to:
- Add a **new language** (e.g., Rust, Go)
- Add **new forbidden tools** for an existing language
- Add **new required files** or markers
- Add **new validation rules** that are strictly additive

### Forbidden Extensions
You MUST NOT:
- Introduce a second manager for the same responsibility
- Relax an existing restriction without explicit approval
- Add overlapping tools without declaring a primary
- Remove forbidden tools silently

---

### Extension Procedure (Required)

1. **Update `policy/tooling-policy.yaml` only**
   - Never edit JSON directly
2. **Declare responsibility boundaries explicitly**
   - Every tool must have a single purpose
3. **Update validation rules if enforcement is required**
   - Extend `validate_tooling_policy.py`
4. **Run local validation**
   ```sh
   pre-commit run --all-files
   ```
5. **Document the change**
   - Add a short note to this knowledge base

---

### Example: Adding a New Language (Rust)

```yaml
languages:
  rust:
    toolchain: rustup
    package_manager: cargo
    forbidden_tools: []
```

**Rule:** If a tool does not need enforcement, it still must be declared.

---

## Machine-Readable Tooling Policy (YAML/JSON)

This policy is intended for automated validation (local hooks + CI). Store **one** as the source of truth and optionally generate the other.

### Recommended file location
- `policy/tooling-policy.yaml` (authoritative)
- `policy/tooling-policy.json` (optional export)

### `policy/tooling-policy.yaml`
```yaml
version: 1
owner: phillip
platform:
  os: macos
  shell: zsh
  framework: oh-my-zsh
  prompt: powerlevel10k

languages:
  node:
    runtime_manager: volta
    package_manager_primary: pnpm
    package_manager_compat: npm
    allowed_runtimes: [node]
    forbidden_managers: [nvm, fnm, asdf, mise, nodenv, n]
    forbidden_package_managers_for_projects: [yarn]
  python:
    package_manager: uv
    forbidden_tools: [pip, pipenv, poetry, poetry-env, virtualenv, virtualenvwrapper, conda, conda-env, pyenv, pipx]

workflow:
  env:
    manager: direnv
    forbidden_patterns:
      - 'export AWS_'          # prefer direnv-managed vars in .envrc
      - 'export GCP_'          # prefer direnv-managed vars in .envrc
  navigation:
    manager: zoxide
    forbidden_tools: [z, autojump, fasd, wd, jump]

security:
  ssh_agent: 1password
  forbidden_ssh_agents: [ssh-agent, keychain]

infra:
  containers:
    allowed: [docker, docker-compose]
    forbidden: [podman, kubectl, kubectx, helm, k9s]
  iac:
    allowed: [terraform]
    forbidden: [pulumi]

validation:
  required_files:
    node_project:
      any_of: [package.json]
      must_include: [pnpm-lock.yaml]
    python_project:
      any_of: [pyproject.toml]
  forbidden_file_globs:
    - '**/.python-version'
    - '**/.nvmrc'
    - '**/.tool-versions'
```

### `policy/tooling-policy.json` (optional)
```json
{
  "version": 1,
  "owner": "phillip",
  "platform": {
    "os": "macos",
    "shell": "zsh",
    "framework": "oh-my-zsh",
    "prompt": "powerlevel10k"
  },
  "languages": {
    "node": {
      "runtime_manager": "volta",
      "package_manager_primary": "pnpm",
      "package_manager_compat": "npm",
      "allowed_runtimes": ["node"],
      "forbidden_managers": ["nvm", "fnm", "asdf", "mise", "nodenv", "n"],
      "forbidden_package_managers_for_projects": ["yarn"]
    },
    "python": {
      "package_manager": "uv",
      "forbidden_tools": ["pip", "pipenv", "poetry", "poetry-env", "virtualenv", "virtualenvwrapper", "conda", "conda-env", "pyenv", "pipx"]
    }
  },
  "workflow": {
    "env": {
      "manager": "direnv",
      "forbidden_patterns": ["export AWS_", "export GCP_"]
    },
    "navigation": {
      "manager": "zoxide",
      "forbidden_tools": ["z", "autojump", "fasd", "wd", "jump"]
    }
  },
  "security": {
    "ssh_agent": "1password",
    "forbidden_ssh_agents": ["ssh-agent", "keychain"]
  },
  "infra": {
    "containers": {
      "allowed": ["docker", "docker-compose"],
      "forbidden": ["podman", "kubectl", "kubectx", "helm", "k9s"]
    },
    "iac": {
      "allowed": ["terraform"],
      "forbidden": ["pulumi"]
    }
  },
  "validation": {
    "required_files": {
      "node_project": {
        "any_of": ["package.json"],
        "must_include": ["pnpm-lock.yaml"]
      },
      "python_project": {
        "any_of": ["pyproject.toml"]
      }
    },
    "forbidden_file_globs": ["**/.python-version", "**/.nvmrc", "**/.tool-versions"]
  }
}
```

---

## Local Enforcement with pre-commit

### Goal
Block commits that introduce forbidden managers/tools, forbidden marker files, or violate required lockfile rules.

### Recommended files
- `.pre-commit-config.yaml`
- `scripts/validate_tooling_policy.py`
- `policy/tooling-policy.yaml`

### `scripts/validate_tooling_policy.py`
```python
#!/usr/bin/env python3
"""Validate repository contents against policy/tooling-policy.yaml.

This is intentionally conservative: it blocks obvious toolchain drift.
"""

from __future__ import annotations

import fnmatch
import json
import os
import re
import sys
from pathlib import Path
from typing import Any, Iterable


REPO_ROOT = Path.cwd()
POLICY_PATH = REPO_ROOT / "policy" / "tooling-policy.yaml"


def _fail(msg: str) -> None:
    print(f"TOOLING-POLICY-FAIL: {msg}")
    sys.exit(1)


def _load_policy() -> dict[str, Any]:
    try:
        import yaml  # type: ignore
    except Exception as exc:  # pragma: no cover
        _fail(
            "PyYAML is required for tooling policy validation. "
            "Install it in your dev environment (e.g., uv tool install pyyaml) or add it to the repo tooling. "
            f"Import error: {exc}"
        )

    if not POLICY_PATH.exists():
        _fail(f"Missing policy file: {POLICY_PATH}")

    with POLICY_PATH.open("r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    if not isinstance(data, dict):
        _fail("Policy file did not parse into a dictionary")
    return data


def _iter_files(root: Path) -> Iterable[Path]:
    for p in root.rglob("*"):
        # Skip VCS + common build artifacts
        if any(part in {".git", ".venv", "node_modules", ".terraform"} for part in p.parts):
            continue
        if p.is_file():
            yield p


def _matches_any_glob(path: Path, globs: list[str]) -> bool:
    rel = str(path.relative_to(REPO_ROOT))
    return any(fnmatch.fnmatch(rel, g) for g in globs)


def _read_text_safely(path: Path, max_bytes: int = 1_000_000) -> str:
    try:
        size = path.stat().st_size
        if size > max_bytes:
            return ""
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def main() -> None:
    policy = _load_policy()

    validation = policy.get("validation", {})
    forbidden_file_globs = list(validation.get("forbidden_file_globs", []))

    # Forbidden marker files (e.g., .nvmrc, .tool-versions)
    for f in _iter_files(REPO_ROOT):
        if forbidden_file_globs and _matches_any_glob(f, forbidden_file_globs):
            _fail(f"Forbidden tool marker file detected: {f}")

    # Content-based checks
    forbidden_patterns = []
    workflow_env = policy.get("workflow", {}).get("env", {})
    forbidden_patterns.extend(workflow_env.get("forbidden_patterns", []))

    infra_forbidden = policy.get("infra", {}).get("containers", {}).get("forbidden", [])
    node_forbidden_managers = policy.get("languages", {}).get("node", {}).get("forbidden_managers", [])
    python_forbidden_tools = policy.get("languages", {}).get("python", {}).get("forbidden_tools", [])

    # Build a conservative string list to detect drift in configs/docs/scripts
    forbidden_strings = set(
        [*infra_forbidden, *node_forbidden_managers, *python_forbidden_tools]
    )

    # Avoid false positives on plain words like "pip" by checking word boundaries
    boundary_terms = {"pip", "poetry", "conda", "nvm", "kubectl", "helm", "k9s", "pipenv", "pyenv", "pipx"}

    for f in _iter_files(REPO_ROOT):
        # Only scan text-like files
        if f.suffix.lower() in {".png", ".jpg", ".jpeg", ".gif", ".pdf", ".zip"}:
            continue

        text = _read_text_safely(f)
        if not text:
            continue

        # Forbidden explicit export patterns
        for pat in forbidden_patterns:
            if pat in text:
                _fail(f"Forbidden env pattern '{pat}' found in {f}")

        for term in forbidden_strings:
            if term in boundary_terms:
                if re.search(rf"{re.escape(term)}", text):
                    _fail(f"Forbidden tool reference '{term}' found in {f}")
            else:
                if term in text:
                    _fail(f"Forbidden tool reference '{term}' found in {f}")

    # Required files checks
    required = validation.get("required_files", {})

    # Node projects: if package.json exists, require pnpm-lock.yaml
    if (REPO_ROOT / "package.json").exists():
        must_include = required.get("node_project", {}).get("must_include", [])
        for req in must_include:
            if not (REPO_ROOT / req).exists():
                _fail(f"Node project missing required file: {req} (pnpm must be authoritative)")

    print("TOOLING-POLICY-OK")


if __name__ == "__main__":
    main()
```

### `.pre-commit-config.yaml`
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: check-yaml
      - id: check-json
      - id: end-of-file-fixer
      - id: trailing-whitespace

  - repo: local
    hooks:
      - id: validate-tooling-policy
        name: Validate tooling policy (Volta/pnpm/uv boundaries)
        entry: python3 scripts/validate_tooling_policy.py
        language: system
        pass_filenames: false
```

### Local installation
```sh
pre-commit install
pre-commit run --all-files
```

---

## Guiding Principles

1. **One language = one manager**
2. **One responsibility per tool**
3. **Compatibility tools may exist, but are not defaults**
4. **Speed matters, but clarity matters more**

Any deviation from this document must be intentional, documented, and approved before implementation.

