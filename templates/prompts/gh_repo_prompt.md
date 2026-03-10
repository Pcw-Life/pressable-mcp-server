**Role**: You are an elite, world-class TypeScript Developer, distinguished Systems Architect, DevOps Master, and renowned Open-Source Maintainer specializing in the Model Context Protocol (MCP), highly scalable Cloudflare Workers, and complex API integration design. You produce code and repository scaffolding that represents the absolute pinnacle of software engineering standards.

**Task Requirements Overview**:
Scaffold an exhaustive, hyper-professional, production-ready, and enterprise-grade template repository to be used for creating future Cloudflare-deployed MCP servers. This repository must serve as the universal gold standard for taking existing comprehensive API documentation (like OpenAPI 3.1, Swagger, or GraphQL schemas) and transforming them into exposed, robust, and highly secure MCP tools, resources, and prompts.

The goal is to provide a complete "batteries-included" developer experience (DX). A developer should be able to clone this template, drop in their `openapi.json`, run a bootstrap script, and have a fully typed, secure, and easily maintainable codebase ready to deploy to the Edge via Cloudflare Workers. Furthermore, the repository must be primed for immense open-source success, encompassing community health, funding visibility, automated workflows, and extreme documentation coverage.

Generate the complete file structure, configuration files, community health files, project management templates, the overarching architecture, and the core TypeScript code. Do not skip or abbreviate any files or sections. Evaluate all instructions to their maximum depth.

Below is the exhaustive, granular breakdown of every single component that MUST be included in your output.

---

### 1. Robust Community Health & Open Source Scaffolding

To ensure this repository is incredibly successful, welcoming, and easy to manage, you must generate the complete contents for the following files within the `.github/` directory:

- **`.github/ISSUE_TEMPLATE/bug_report.yml`**: A highly detailed GitHub forms-based bug report template. It must require users to provide: steps to reproduce, expected vs. actual behavior, specific environment details (OS, Node version, Wrangler version, MCP Client used), relevant error logs, and whether they are willing to submit a PR to fix it.
- **`.github/ISSUE_TEMPLATE/feature_request.yml`**: A forms-based feature request template focusing on the user's problem, the proposed solution, alternative solutions considered, and use-case examples.
- **`.github/ISSUE_TEMPLATE/api_tool_request.yml`**: A specialized form template specifically for users to request new MCP tools to be integrated from an existing API documentation endpoint. It should ask for the API endpoint URL, required parameters, and desired output format.
- **`.github/PULL_REQUEST_TEMPLATE.md`**: A comprehensive PR template featuring an interactive checklist (e.g., tests added/passed, documentation updated, typechecking passed, linting passed), related issue linking (Fixes #...), a description of the changes, and manual testing steps for reviewers.
- **`.github/CONTRIBUTING.md`**: Extensive, empathetic contributing guidelines. It must detail:
  - How to fork and clone the project.
  - How to set up the local environment (`pnpm install`, Wrangler dev).
  - The repository architecture overview and mental model.
  - Step-by-step instructions on how to manually add a new MCP tool, resource, or prompt.
  - The branching strategy (e.g., feature branches, conventional commits).
  - The pull request review and merge process.
- **`.github/CODE_OF_CONDUCT.md`**: A standard Contributor Covenant Code of Conduct, ensuring a safe and inclusive environment. Include placeholders for the maintainer's contact email for reporting violations.
- **`.github/SECURITY.md`**: A professional security policy explaining how to report vulnerabilities privately rather than opening public issues. Include supported versions, response SLAs, and a PGP key placeholder if applicable.
- **`.github/CODEOWNERS`**: Setup a CODEOWNERS file detailing which teams or individuals own specific parts of the codebase (e.g., assigning `@<YOUR_GITHUB_HANDLE>` to `*`, and potentially separating out `/docs/` or `/.github/workflows/` to other maintainers).
- **`.github/FUNDING.yml`**: A funding file to activate the "Sponsor" button on GitHub. You must include diverse funding platforms to maximize financial support for the open-source effort. Use placeholders for: `github: [maintainer]`, `patreon: [maintainer]`, `open_collective: [project]`, `ko_fi: [maintainer]`, `tidelift: npm/package-name`, and `custom: [sponsor-me-url]`.

---

### 2. Community Engagement: GitHub Discussions & Project Board Settings

Include instructional documentation, scripts, or Terraform/GitHub Actions configuration to bootstrap the project management layer:

- **GitHub Discussions**: Provide a script or markdown guide on enabling and configuring GitHub Discussions with robust categories: Announcements, General Open Chat, Q&A (marked for answering), Show and Tell, and API Tool Ideas. Include a template for a "Welcome" discussion post.
- **GitHub Project Board (V2)**: Outline the configuration of an automated GitHub Project Board for task progression. Define automated columns and views: Backlog, Todo (Ready for Dev), In Progress, In Review, Done.

---

### 3. CI/CD, Automation, & Release Engineering (GitHub Actions)

Your output must include bulletproof, enterprise-grade GitHub Actions workflows ensuring strict code quality and automated deployments:

- **`.github/workflows/ci.yml`**: A Continuous Integration workflow triggered on push and PRs to `main`. It must:
  - Cache dependencies using `actions/setup-node`.
  - Run `pnpm lint` (ESLint + Prettier).
  - Run `pnpm typecheck` (tsc --noEmit).
  - Run `pnpm test` (Vitest) across multiple Node.js matrix versions (18.x, 20.x, 22.x).
  - Enforce branch protection rules conceptually (by requiring this action to pass).
- **`.github/workflows/deploy.yml`**: A Continuous Deployment workflow that:
  - Triggers only on pushes or merged PRs to the `main` branch.
  - Uses the official Cloudflare Wrangler action.
  - Automatically runs `wrangler deploy` using GitHub Secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
  - Injects other required production secrets onto the Worker environment.
- **`.github/workflows/dependabot.yml`**: Advanced Dependabot configuration ensuring both npm dependencies and GitHub Actions are kept up-to-date. Configure weekly schedules, labels (`dependencies`), and distinct reviewer assignment.
- **`.github/workflows/release.yml`**: A workflow utilizing semantic-release or Changesets to automatically generate CHANGELOG.md entries, bump `package.json` versions, and draft GitHub Releases based on conventional commit messages.

---

### 4. Advanced Project Setup, DevContainers, & Tooling Configuration

The template must enforce absolute code consistency and ease of onboarding.

- **`.devcontainer/devcontainer.json`**: An exhaustive DevContainer configuration using a standard TypeScript/Node base image. It must auto-install necessary VS Code/Cursor extensions (ESLint, Prettier, Cloudflare extensions, GitHub Copilot) and define the post-create command (`pnpm install`).
- **Package Management**: Utilize `pnpm` workspace functionality or standard `pnpm` configuration for strict dependency management.
- **Dependencies**:
  - Core: `@modelcontextprotocol/sdk`, `hono` (for advanced routing and middleware), `@cloudflare/workers-types`.
  - Data Validation: `zod` and `@asteasolutions/zod-to-openapi`.
  - Logging & Telemetry: Include a structured logging library, or custom JSON logger tailored for Workers.
  - Testing: `vitest` and `msw` (Mock Service Worker) for E2E API mocking.
- **Strict Config Files**:
  - `tsconfig.json` utilizing the strictest possible compiler options (`strict: true`, `noImplicitAny`, proper Cloudflare target environments, `skipLibCheck`).
  - `.prettierrc` defining clear formatting rules (e.g., single quotes, trailing commas, print width).
  - `eslint.config.js` or `.eslintrc.js` utilizing the new flat config, extending TypeScript and Prettier recommended rules. Include specific rules preventing floating promises and enforcing explicit return types on tools.
  - `.editorconfig` to enforce tab sizing and EOF newlines across all IDEs.

---

### 5. Configured Cloudflare Worker Integration & Security

- **`wrangler.toml`**: Configured masterfully for production and staging environments.
  - Define `name`, `main` (`src/index.ts`), `compatibility_date` (recent), and `compatibility_flags` (such as `nodejs_compat` if needed for SSE streaming nuances).
  - Include sections for [vars] (environmental variables), [observability] (enabling tail workers or metrics), and clearly defined placeholder secret bindings necessary for external APIs (e.g., `TARGET_API_KEY`).
  - Must use ES Modules (`export default { fetch(...) {...} }`).

---

### 6. MCP Architecture & Server-Sent Events (SSE) Deep Dive (Crucial)

Because this runs on the serverless architecture of Cloudflare Workers, standard Standard Input/Output (`stdio`) cannot be used. You MUST architect the MCP server using Server-Sent Events (SSE) via `SSEServerTransport` coupled with `hono`.

Provide the precise, flawless implementation for:

- **`src/index.ts`**: The Cloudflare Worker entrypoint using Hono.
  - Implement extremely robust CORS middleware to allow MCP clients to connect securely.
  - Implement a `GET /sse` endpoint to instantiate and hold open the SSE connection for the MCP client.
  - Implement a `POST /message` endpoint to route inbound JSON-RPC messages from the client to the specifically matched active SSE transport instance.
  - Handle session mapping: You must demonstrate how to manage multiple active SSE connections in the stateless Worker environment, or detail the inherent limitations.
- **`src/mcp/server.ts`**: The core MCP class instantiation layer.
  - Capability registration spanning ALL THREE MCP core primitive concepts: **Resources**, **Prompts**, and **Tools**.
  - Provide a highly resilient connection lifecycle management strategy, including heartbeat handling, graceful shutdown, and disconnect detection.

---

### 7. Modular API Translation Architecture

The codebase must be structured to seamlessly absorb dozens or hundreds of API endpoints.

- **`src/tools/index.ts`**: A robust registry system that dynamically or statically exports all categorized tools.
- **`src/tools/example-tool.ts`**: A pristine, strongly-typed, beautifully documented reference tool. It must demonstrate:
  - Using `z.object()` to define complex input schemas (query params, body params).
  - Making an authenticated HTTP call to the target API using the `api/client`.
  - Graceful mapping of Upstream REST API Errors into standardized JSON-RPC/MCP error formats without leaking sensitive upstream auth details.
  - Formatting the upstream JSON response into a rich, markdown-styled MCP content text representation that the LLM client will quickly comprehend.
- **`src/resources/` & `src/prompts/`**: Include boilerplate files showing how one might expose static API documentation or onboarding guides as MCP Resources, and how to define built-in system Prompts for the AI assistant.
- **`src/api/client.ts`**: A sophisticated, strongly-typed `fetch()` wrapper utilizing Cloudflare `env` variables. It must feature:
  - Request timeouts.
  - Exponential backoff / automatic retry logic on 429 and 5xx responses.
  - Centralized injection of authentication headers (e.g., Bearer tokens).
  - Response parsing algorithms that safely handle unexpected HTML error pages from upstream APIs.
- **`src/middleware/auth.ts`**: API Key protection for the server itself, ensuring that only authenticated MCP Clients (like Cursor, Claude Desktop, or another AI Agent) passing a specific `Authorization` header can access the `/sse` and `/message` endpoints.

---

### 8. The "API Doc Ingestion" Blueprint & Scripts

Provide the code for advanced utility scripts that accelerate development.

- **`scripts/ingest-openapi.ts`**: A profound utility script (using Node or Deno) that parses an `openapi.json` file. It should demonstrate the algorithm for traversing paths, extracting the `operationId`, reading parameters and request bodies, and outputting templated TypeScript files containing the respective Zod schemas and skeleton `src/tools/` implementations.
- Heavily document this script's behavior so developers grasp the primary workflow: `Swagger/OpenAPI -> run script -> review output -> deploy MCP Server`.

---

### 9. Documentation Architecture (Docs Site & Typedoc)

Do not just provide a single README; build a robust documentation strategy:

- Describe how to set up `typedoc` to automatically generate HTML pages mapping the internals of the `src/` directory.
- Alternatively, include configuration for a `docs/` folder powered by Docusaurus or VitePress to host extensive guides on how the template works under the hood.

---

### 10. The Ultimate, Masterpiece README.md

The root `README.md` must be spectacular—a true masterclass in open-source documentation that drives immense adoption.

- **Hero Section**: A powerful layout including a placeholder for a stunning project banner/logo (`<img src="assets/banner.png" />`).
- **Dynamic Badges**: Build Status, License, Release Version, npm downloads (if applicable), Codecov, TypeScript strictly typed, and a bright Sponsor badge.
- **Mission Statement & Value Proposition**: Clearly articulate *why* this template exists and the massive value of bridging APIs to MCP on Edge networks.
- **Table of Contents**: Hyperlinked sections.
- **Architecture Overview & Diagram**: Elaborate intensely on the transport layer disparity: why SSE via Hono is mandatory over `stdio` for serverless environments. Include a mermaid.js sequence diagram showing the flow of an MCP Client -> Worker (SSE/Message) -> External API.
- **Quickstart Guide**:
  - Uncompromising prerequisites (Node.js, pnpm, Wrangler CLI).
  - Step-by-step local testing using `wrangler dev`.
  - Clear instructions on how to use `curl`, Postman, or a local MCP Inspector client to test the SSE endpoint locally.
- **Step-by-Step Tutorial: Ingesting your API Docs**: Instructions on utilizing the `/scripts` provided to auto-generate the tool schemas, and instructions on how to manually craft custom tools, resources, and Prompts.
- **Sponsorship & Funding Center**: Explicit, highly visible callouts encouraging structural funding for this open-source effort. Create distinct sections for individual backers and enterprise sponsors. Detail exactly where to find the sponsorship links (matching the `FUNDING.yml`) and use placeholders like `[Sponsor me on GitHub Teams](link)`, `[Become a Patron](link)`, and `[Buy me a coffee](link)`.
- **Roadmap**: A visual roadmap (todo lists) showing planned features.
- **Contributing & Community**: Links to `CONTRIBUTING.md`, the Code of Conduct, and the GitHub Discussions board.
- **License**: MIT standard wording placeholder.

---

### Output Execution Parameters

Because this request demands an extraordinarily comprehensive scaffold involving thousands of lines of conceptual code, you must structure your output meticulously. Use markdown heavily to separate the sections.

Ensure your response outputs:
1. **The Grand Directory Tree**: An exhaustive ASCII file tree encompassing every file mentioned above.
2. **Community & .github Files**: Block quotes containing the raw content for all issue templates, the PR template, Code of Conduct, CODEOWNERS, and Funding files.
3. **Configuration & DevOps Files**: The full code for package.json, tsconfig.json, wrangler.toml, Devcontainer JSON, and GitHub Action workflows (.yml).
4. **Source Code (`src/` Architecture)**: Provide absolute perfection in the TypeScript files (`index.ts`, `server.ts`, `tools/*`, `resources/*`, `prompts/*`, `api/client.ts`, `middleware/auth.ts`). Show the masterclass implementation of MCP over SSE with Hono, covering connection states, tool routing, schemas, and upstream fetching.
5. **Scripts & Utilities**: The fully functional OpenAPI ingestion script pattern in TypeScript.
6. **Markdown Documentation**: The complete, stylized README.md raw markdown content.

**Important**: Do not skip sections, do not truncate code by saying "repeat for other tools", and do not shorten configuration files. Evaluate to absolute maximum depth. Provide full files. If you reach your output token limit in a single response (which is highly likely), stop cleanly and wait for me to say "continue" to print the rest. I require the complete, functional, ready-to-deploy, enterprise-grade template.
