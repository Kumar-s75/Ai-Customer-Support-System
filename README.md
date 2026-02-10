# ⚙️ Setup Instructions

Welcome! Follow the steps below to run the project locally.

---

## 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js ≥ 20.9.0** *(recommended: Node 20 LTS)*
- **pnpm** *(preferred for Turborepo)* or npm
- **PostgreSQL** *(local or cloud)*
- **Git**

📌 Version check:

```bash
node -v
pnpm -v
```

![Prerequisites](https://github.com/user-attachments/assets/05f69e32-73ee-4a38-bac2-80c0c8a0d437)

---

## 2️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

![Clone Repo](https://github.com/user-attachments/assets/83a5a8fc-fab8-4293-adc2-730a13b58aba)

---

## 3️⃣ Install Dependencies (Monorepo)

From the root of the repository:

```bash
pnpm install
```

This installs dependencies for:

- `apps/api` → Hono backend  
- `apps/web` → Next.js frontend  
- `packages/db`, `packages/shared`, etc.

![Install Dependencies](https://github.com/user-attachments/assets/be52686e-c5e6-4266-9ecd-77894cb5e3f2)

---

## 4️⃣ Environment Variables

Create a `.env` file inside **packages/db**:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

![Env Setup](https://github.com/user-attachments/assets/b47b4f4e-a78a-4480-8977-2ac65e8b3518)

---

## 5️⃣ Database Setup (Prisma)

Go into the database package:

```bash
cd packages/db
```

Run migrations and generate Prisma client:

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

![Prisma Setup](https://github.com/user-attachments/assets/2022b12a-dfd0-417a-8a51-507e5be73db3)

---

## 6️⃣ Start the Backend (API)

From the backend folder:

```bash
cd apps/api
pnpm dev
```

Backend will start at:

```
http://localhost:8000
```

![Backend Start](https://github.com/user-attachments/assets/57bef792-e880-4efa-b589-b3e1dbd8a49c)

---

## 7️⃣ Test Backend APIs *(Optional but Recommended)*

### ✅ Send Chat Message Endpoint

Example request:

```bash
POST http://localhost:8000/chat
```

![Chat Endpoint](https://github.com/user-attachments/assets/944284be-b4fa-479a-9ba3-97f2195ebe97)

---

### ✅ Streaming Endpoint (SSE)

```bash
GET http://localhost:8000/stream
```

![Streaming Endpoint](https://github.com/user-attachments/assets/ebef1c0e-500a-4138-a307-8507249a3868)

⚠️ Streaming works best with:

- Postman *(SSE supported)*
- `curl -N`
- Browser `EventSource`

Example:

```bash
curl -N http://localhost:8000/stream
```

---

## 8️⃣ Start the Frontend

From the frontend folder:

```bash
cd apps/web
pnpm dev
```

Frontend will run at:

```
http://localhost:3000
```

![Frontend Start](https://github.com/user-attachments/assets/a40d23c5-ab01-44be-8bf9-b086c8ceb288)

---

## 9️⃣ Frontend ↔ Backend Connection

Ensure frontend API calls point to:

```ts
http://localhost:8000
```

![Frontend Backend Connection](https://github.com/user-attachments/assets/e30f20c2-0b2d-4e8f-8904-ed89e95cb96e)

---

## 🔟 Common Troubleshooting

### ❌ Node Version Error

Make sure you're running Node 20+:

```bash
node -v
```

If needed:

```bash
nvm install 20
nvm use 20
```

![Node Error](https://github.com/user-attachments/assets/e3f5b991-a3f0-4517-9154-0dc8f2357a3b)

---

### ❌ Streaming Not Visible

Use one of these tools:

- Postman  
- `curl -N`  
- Browser `EventSource`

---

## 🎥 Demo Video

Watch the demo here:  
https://www.loom.com/share/6794ef682cbc467ca3e1fafe5b4a6a43

---

## 📂 Project Structure

![Project Structure](https://github.com/user-attachments/assets/8693d5c4-3eec-4190-a686-0661003b88da)

---
