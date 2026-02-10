⚙️ Setup Instructions
1️⃣ Prerequisites

Make sure you have the following installed:

Node.js ≥ 20.9.0 (recommended: Node 20 LTS)

npm / pnpm (pnpm preferred for Turborepo)

PostgreSQL (local or cloud)

Git
<img width="788" height="132" alt="image" src="https://github.com/user-attachments/assets/05f69e32-73ee-4a38-bac2-80c0c8a0d437" />
2️⃣ Clone the Repository
<img width="788" height="117" alt="image" src="https://github.com/user-attachments/assets/83a5a8fc-fab8-4293-adc2-730a13b58aba" />
3️⃣ Install Dependencies (Monorepo)

From the root of the repo:
<img width="769" height="137" alt="image" src="https://github.com/user-attachments/assets/be52686e-c5e6-4266-9ecd-77894cb5e3f2" />
This installs dependencies for:

apps/api (Hono backend)

apps/web (Next.js frontend)

packages/db, packages/shared, etc.
4️⃣ Environment Variables

Create a .env file inside packages/db (or root, depending on your setup):
<img width="773" height="97" alt="image" src="https://github.com/user-attachments/assets/b47b4f4e-a78a-4480-8977-2ac65e8b3518" />
5️⃣ Database Setup (Prisma)

From packages/db:
<img width="818" height="480" alt="image" src="https://github.com/user-attachments/assets/2022b12a-dfd0-417a-8a51-507e5be73db3" />
6️⃣ Start the Backend (API)

From apps/api:
<img width="772" height="510" alt="image" src="https://github.com/user-attachments/assets/57bef792-e880-4efa-b589-b3e1dbd8a49c" />
7️⃣ Test Backend APIs (Optional but Recommended)
Send chat message
<img width="775" height="228" alt="image" src="https://github.com/user-attachments/assets/944284be-b4fa-479a-9ba3-97f2195ebe97" />
Streaming endpoint (SSE)
<img width="770" height="216" alt="image" src="https://github.com/user-attachments/assets/ebef1c0e-500a-4138-a307-8507249a3868" />
8️⃣ Start the Frontend

From apps/web:
<img width="786" height="384" alt="image" src="https://github.com/user-attachments/assets/a40d23c5-ab01-44be-8bf9-b086c8ceb288" />
9️⃣ Frontend ↔ Backend Connection

Ensure the frontend API calls point to:
<img width="798" height="175" alt="image" src="https://github.com/user-attachments/assets/e30f20c2-0b2d-4e8f-8904-ed89e95cb96e" />
10️⃣ Common Troubleshooting

Node version error
<img width="804" height="444" alt="image" src="https://github.com/user-attachments/assets/e3f5b991-a3f0-4517-9154-0dc8f2357a3b" />
Streaming not visible
➡️ Use:

->Postman (SSE supported)

->curl with -N

->Browser EventSource

Demo  video-https://www.loom.com/share/6794ef682cbc467ca3e1fafe5b4a6a43

Project structure--
<img width="1995" height="2927" alt="image" src="https://github.com/user-attachments/assets/8693d5c4-3eec-4190-a686-0661003b88da" />



















