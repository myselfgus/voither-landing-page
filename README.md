# Cloudflare AI Chat App Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/myselfgus/voither-landing-page)

A production-ready **Cloudflare Workers** application featuring a modern, responsive AI chat interface with multi-session support, streaming responses, tool calling (weather, web search, MCP tools), and session management. Built with the Cloudflare Agents SDK, it leverages Durable Objects for stateful chat sessions and Cloudflare AI Gateway for Gemini model integration.

## ✨ Key Features

- **Multi-Session Chat**: Create, list, switch, rename, and delete chat sessions with automatic title generation.
- **Streaming Responses**: Real-time message streaming for natural conversation flow.
- **Tool Calling**: Built-in tools for weather lookup, web search (via SerpAPI), URL content fetching, and extensible MCP integration.
- **Model Switching**: Support for Gemini 2.5 Flash/Pro/2.0 Flash via Cloudflare AI Gateway.
- **Persistent State**: Chat history and sessions stored in Durable Objects with SQLite backing.
- **Responsive UI**: Dark/light theme, mobile-friendly design with shadcn/ui components and Tailwind CSS.
- **Session Management API**: RESTful endpoints for sessions (`/api/sessions`).
- **Error Handling & Logging**: Robust client/server error reporting and health checks.
- **Production-Ready**: CORS, logging, TypeScript, optimized bundling with Vite.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, TanStack Query, React Router, Sonner (Toasts), Framer Motion |
| **Backend** | Cloudflare Workers, Hono, Cloudflare Agents SDK, Durable Objects |
| **AI/ML** | Cloudflare AI Gateway, OpenAI SDK (Gemini-compatible), Model Context Protocol (MCP) |
| **Tools** | SerpAPI (Web Search), Custom Tools (Weather), MCP Remote Tools |
| **State** | Immer, Zustand, TanStack Query |
| **Dev Tools** | Bun, Wrangler, ESLint, TypeScript 5 |
| **UI/UX** | Radix UI, Tailwind Animate, Class Variance Authority |

## 🚀 Quick Start

1. **Clone & Install** (uses Bun for speed):
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

2. **Configure Environment Variables** (in `wrangler.jsonc` or Cloudflare Dashboard):
   ```json
   {
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
       "CF_AI_API_KEY": "{your-cloudflare-api-token}",
       "SERPAPI_KEY": "{your-serpapi-key}"  // Optional for web search
     }
   }
   ```
   - Get `CF_AI_BASE_URL` and `CF_AI_API_KEY` from [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/).
   - SerpAPI key from [serpapi.com](https://serpapi.com) (optional).

3. **Run Locally**:
   ```bash
   bun dev
   ```
   Open `http://localhost:3000` (or `${PORT:-3000}`).

4. **Type Generation** (Cloudflare types):
   ```bash
   bun cf-typegen  # or `wrangler types`
   ```

## 📖 Usage

### Chat Interface
- Start a new session via `/api/sessions` (auto-generated title from first message).
- Send messages: `POST /api/chat/{sessionId}/chat` (supports streaming).
- List sessions: `GET /api/sessions`.
- Delete session: `DELETE /api/sessions/{sessionId}`.
- Switch models: `POST /api/chat/{sessionId}/model`.

### Example API Calls
```bash
# Create session with first message
curl -X POST /api/sessions \
  -H "Content-Type: application/json" \
  -d '{"firstMessage": "Hello, world!"}'

# Chat in session (streaming)
curl -X POST /api/chat/{sessionId}/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather in London?", "stream": true}'
```

### Customization
- **UI**: Edit `src/pages/HomePage.tsx` and `src/components/*`.
- **Tools**: Extend `worker/tools.ts` (add functions to `customTools` or MCP servers).
- **Chat Logic**: Modify `worker/chat.ts` (system prompt, tool handling).
- **Routes**: Add endpoints in `worker/userRoutes.ts`.
- **Sidebar**: Customize `src/components/app-sidebar.tsx` (uses `AppLayout`).

## 🔧 Development

- **Hot Reload**: `bun dev` (frontend + worker proxy).
- **Build**: `bun build` (produces `dist/` for deployment).
- **Lint**: `bun lint`.
- **Preview**: `bun preview`.
- **Workers Types**: Run `bun cf-typegen` after `wrangler deploy`.
- **Debug Sessions**: Use `/api/sessions/stats` or Dashboard > Durable Objects.

Watch for Durable Object migrations in `wrangler.jsonc`.

## ☁️ Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun deploy  # Builds + wrangler deploy
```

Or manually:
```bash
bun build
wrangler deploy
```

- **Custom Domain**: Set in Cloudflare Dashboard > Workers > Triggers.
- **Environment Vars**: Configure in Dashboard (overrides `wrangler.jsonc`).
- **Observability**: Enabled by default (logs, metrics).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/myselfgus/voither-landing-page)

## 🤝 Contributing

1. Fork & clone.
2. `bun install`.
3. Create feature branch: `git checkout -b feature/xyz`.
4. Commit: `git commit -m "feat: description"`.
5. Push & PR.

Follow TypeScript, ESLint, and Tailwind best practices.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- [Agents SDK](https://developers.cloudflare.com/agents/)
- Issues: Open a GitHub issue.

Built with ❤️ for Cloudflare developers.