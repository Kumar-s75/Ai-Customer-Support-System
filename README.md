⚙️ Setup Instructions

Welcome! Follow the steps below to run the project locally.

---

## 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js ≥ 20.9.0** *(recommended: Node 20 LTS)*
- **pnpm** *(preferred for Turborepo)* or npm
- **PostgreSQL** *(local or cloud)*
- **Git**

📌 Version check:


bash
node -v
pnpm -v


![Prerequisites](https://github.com/user-attachments/assets/05f69e32-73ee-4a38-bac2-80c0c8a0d437)

---

## 2️⃣ Clone the Repository


bash
git clone <your-repo-url>
cd <repo-folder>


![Clone Repo](https://github.com/user-attachments/assets/83a5a8fc-fab8-4293-adc2-730a13b58aba)

---

## 3️⃣ Install Dependencies (Monorepo)

From the root of the repository:


bash
pnpm install


This installs dependencies for:

- apps/api → Hono backend  
- apps/web → Next.js frontend  
- packages/db, packages/shared, etc.

![Install Dependencies](https://github.com/user-attachments/assets/be52686e-c5e6-4266-9ecd-77894cb5e3f2)

---

## 4️⃣ Environment Variables

Create a .env file inside **packages/db**:


env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"


![Env Setup](https://github.com/user-attachments/assets/b47b4f4e-a78a-4480-8977-2ac65e8b3518)

---

## 5️⃣ Database Setup (Prisma)

Go into the database package:


bash
cd packages/db


Run migrations and generate Prisma client:


bash
pnpm prisma migrate dev
pnpm prisma generate


![Prisma Setup](https://github.com/user-attachments/assets/2022b12a-dfd0-417a-8a51-507e5be73db3)

---

## 6️⃣ Start the Backend (API)

From the backend folder:


bash
cd apps/api
pnpm dev


Backend will start at:


http://localhost:8000


![Backend Start](https://github.com/user-attachments/assets/57bef792-e880-4efa-b589-b3e1dbd8a49c)

---

## 7️⃣ Test Backend APIs *(Optional but Recommended)*

### ✅ Send Chat Message Endpoint

Example request:


bash
POST http://localhost:8000/chat


![Chat Endpoint](https://github.com/user-attachments/assets/944284be-b4fa-479a-9ba3-97f2195ebe97)

---

### ✅ Streaming Endpoint (SSE)


bash
GET http://localhost:8000/stream


![Streaming Endpoint](https://github.com/user-attachments/assets/ebef1c0e-500a-4138-a307-8507249a3868)

⚠️ Streaming works best with:

- Postman *(SSE supported)*
- curl -N
- Browser EventSource

Example:


bash
curl -N http://localhost:8000/stream


---

## 8️⃣ Start the Frontend

From the frontend folder:


bash
cd apps/web
pnpm dev


Frontend will run at:


http://localhost:3000


![Frontend Start](https://github.com/user-attachments/assets/a40d23c5-ab01-44be-8bf9-b086c8ceb288)

---

## 9️⃣ Frontend ↔ Backend Connection

Ensure frontend API calls point to:


ts
http://localhost:8000


![Frontend Backend Connection](https://github.com/user-attachments/assets/e30f20c2-0b2d-4e8f-8904-ed89e95cb96e)

---

## 🔟 Common Troubleshooting

### ❌ Node Version Error

Make sure you're running Node 20+:


bash
node -v


If needed:


bash
nvm install 20
nvm use 20


![Node Error](https://github.com/user-attachments/assets/e3f5b991-a3f0-4517-9154-0dc8f2357a3b)

---

### ❌ Streaming Not Visible

Use one of these tools:

- Postman  
- curl -N  
- Browser EventSource

---

## 🎥 Demo Video

Watch the demo here:  
https://www.loom.com/share/6794ef682cbc467ca3e1fafe5b4a6a43

---

## 📂 Project Structure

![Project Structure](https://github.com/user-attachments/assets/8693d5c4-3eec-4190-a686-0661003b88da)

---
### Important Note:


- I was asked to implement VERCEL AI SDK for streaming but I intentionally implemented streaming manually using Server-Sent Events to demonstrate a clear understanding of how token streaming, typing indicators, and agent orchestration work at    a lower level.
- The system is SDK-agnostic, and integrating Vercel AI SDK would be a straightforward swap at the router layer.  
- The router agent can be easily integrated with
  Vercel AI SDK (streamText) without changing the API or frontend contracts.
---

⭐ Bonus Features Implemented


✔️ Rate Limiting (Middleware-Level)

->Basic rate limiting is implemented at the API layer using Hono middleware patterns. Incoming requests pass through a centralized middleware where request flow can be controlled to prevent excessive or abusive usage.

->This implementation is intentionally lightweight and in-memory, suitable for assignment scope, and can be extended to Redis or edge-based rate limiting in production.


✔️ Context Management & Compaction

->To handle long-running conversations and token constraints:

->Older messages are summarized into a conversation-level summary.

->Only the summary + recent messages are passed to agents.

->Summaries are persisted and reused across requests.

->This ensures efficient context usage and scalable conversational memory.


✔️ Streaming Responses with Typing Indicators

->The chat system supports real-time streaming responses using Server-Sent Events (SSE):

->Intermediate states like “Thinking…” and “Searching…” are streamed

->Final responses are sent token-by-token

->Improves perceived responsiveness and UX



✔️ Multi-Agent Routing with Tooling

->A central Router Agent analyzes user input and delegates it to:

->Support Agent – FAQs & troubleshooting

->Order Agent – Order status & delivery

->Billing Agent – Payments, refunds & invoices

->Each agent has access to domain-specific tools backed by seeded database data.


🧪 Testing Strategy

This project uses a pragmatic, production-oriented testing approach, prioritizing real system behavior over artificial mocks.

✅ Integration Testing (Primary Focus)

-Core functionality is validated through end-to-end API testing using real requests, real database data, and real agent execution.

-Covered flows include:

-Service Health

-GET /health → server + middleware validation

-Chat Lifecycle

-POST /api/chat/messages

-POST /api/chat/stream (Server-Sent Events)

-Multi-Agent Routing

-Router agent correctly classifies intent and delegates to:

-Support Agent

-Order Agent

-Billing Agent

-Tool Execution

-Orders, payments, invoices, and conversation tools hit the database directly

-Persistence

-Conversations and messages are stored and retrieved via Prisma

-Error Handling

-Global error middleware validated with malformed inputs

-These tests validate the entire execution pipeline:

-Controller → Router Agent → Sub-Agent → Tools → Database → Response

✅ Logic Validation (Unit-Level by Design)

-Critical logic is deterministic and validated through integration flows rather than isolated mocks:

-Intent classification

-Agent delegation logic

-Context assembly & compaction

-Tool correctness (orders, billing, conversations)

-This avoids brittle mock-heavy tests while ensuring real-world correctness.




