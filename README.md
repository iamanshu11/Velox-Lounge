# VeloxLounge — DragonPass Lounge Access

Full-stack web application for managing DragonPass memberships and premium airport lounge access.

```
velox-lounge/
├── backend/          ← Express.js API (Node.js + TypeScript)
│   ├── db/
│   │   ├── migrations/    ← 008 SQL migration files (one per table)
│   │   ├── seeds/         ← Seed runners (users, lounges, memberships…)
│   │   ├── migrate.ts     ← Migration runner
│   │   └── reset.ts       ← Dev reset script
│   └── src/
│       ├── config/        ← DB pool, env config
│       ├── controllers/   ← Route handlers
│       ├── middlewares/   ← Auth (JWT), error handling
│       ├── routes/        ← Express routers
│       ├── types/         ← TypeScript types
│       ├── utils/         ← JWT, response helpers, format helpers
│       ├── app.ts         ← Express app setup
│       └── server.ts      ← Entry point
├── frontend/         ← Next.js 15 App Router (TypeScript + Tailwind)
│   └── src/
│       ├── app/
│       │   ├── (auth)/        ← Login, Signup, Forgot/Reset Password
│       │   └── (dashboard)/   ← All protected pages
│       ├── components/
│       │   ├── ui/            ← Button, Card, Badge, Input, Toast…
│       │   ├── layout/        ← Sidebar, Header
│       │   └── common/        ← ThemeProvider, Spinner
│       ├── services/          ← Axios API calls (auth, membership, epass…)
│       ├── stores/            ← Zustand (auth, ui)
│       ├── types/             ← Shared TypeScript types
│       ├── utils/             ← cn(), format helpers
│       ├── hooks/             ← use-toast
│       └── lib/               ← Zod validation schemas
├── docker-compose.yml ← Full stack with PostgreSQL
└── README.md
```

## Ports

| Service    | Port |
|------------|------|
| Frontend   | 3004 |
| Backend    | 5004 |
| PostgreSQL | 5435 |

---

## 🐳 Docker Quick Start (Recommended)

The easiest way to run the full stack. Docker starts PostgreSQL, runs the API, and serves the frontend — no local Node or Postgres install needed.

```bash
# 1. Clone and enter the project
git clone <repo-url> velox-lounge
cd velox-lounge

# 2. (Optional) Set a strong JWT secret
export JWT_SECRET=your-super-secret-32-char-minimum

# 3. Build and start all services
docker compose up --build

# 4. Run database migrations (first time only)
docker compose exec backend npx tsx db/migrate.ts

# 5. Seed demo data (optional)
docker compose exec backend npx tsx db/seeds/index.ts
```

Open **http://localhost:3004**

To stop:
```bash
docker compose down          # stop containers
docker compose down -v       # stop + wipe the database volume
```

---

## Manual Quick Start

### 1. Database

```bash
createdb dragonpass_db
```

### 2. Backend

```bash
cd backend
npm install

# Configure
cp .env.example .env
# Edit .env — set DB_USER, DB_PASSWORD, JWT_SECRET

# Run migrations (creates all tables)
npm run db:migrate

# Seed demo data
npm run db:seed

# Start dev server — http://localhost:5004
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install

# .env.local already points to localhost:5004
# Edit if your backend runs elsewhere

# Start dev server — http://localhost:3004
npm run dev
```

Open **http://localhost:3004**

---

## Demo Accounts

| Role  | Email                    | Password   |
|-------|--------------------------|------------|
| Admin | admin@dragonpass.com     | Admin@123  |
| User  | demo@dragonpass.com      | User@123   |

---

## API Endpoints

| Method | Path                          | Auth     | Description             |
|--------|-------------------------------|----------|-------------------------|
| POST   | /api/auth/signup              | —        | Create account          |
| POST   | /api/auth/login               | —        | Sign in                 |
| GET    | /api/auth/me                  | JWT      | Current user            |
| POST   | /api/auth/forgot-password     | —        | Request reset link      |
| POST   | /api/auth/reset-password      | —        | Reset with token        |
| GET    | /api/membership               | JWT      | Get membership          |
| PUT    | /api/membership               | JWT      | Update membership       |
| POST   | /api/membership/activate      | JWT      | Activate with member ID |
| GET    | /api/epasses                  | JWT      | List e-passes           |
| POST   | /api/epasses                  | JWT      | Create e-pass           |
| PATCH  | /api/epasses/:id/cancel       | JWT      | Cancel e-pass           |
| GET    | /api/lounges                  | JWT      | Browse lounges          |
| GET    | /api/lounges/:id              | JWT      | Lounge detail           |
| GET    | /api/bookings                 | JWT      | List bookings           |
| POST   | /api/bookings                 | JWT      | Create booking          |
| PATCH  | /api/bookings/:id/cancel      | JWT      | Cancel booking          |
| PUT    | /api/profile                  | JWT      | Update profile          |
| PATCH  | /api/profile/password         | JWT      | Change password         |
| GET    | /api/activity                 | JWT      | Activity log            |
| GET    | /api/admin/stats              | ADMIN    | Platform stats          |
| GET    | /api/admin/users              | ADMIN    | All users               |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable         | Default                 | Description                    |
|------------------|-------------------------|--------------------------------|
| `PORT`           | `5004`                  | API server port                |
| `NODE_ENV`       | `development`           | Environment                    |
| `DB_HOST`        | `localhost`             | PostgreSQL host                |
| `DB_PORT`        | `5435`                  | PostgreSQL port                |
| `DB_NAME`        | `dragonpass_db`         | Database name                  |
| `DB_USER`        | —                       | Database user                  |
| `DB_PASSWORD`    | —                       | Database password              |
| `JWT_SECRET`     | —                       | Must be at least 32 characters |
| `JWT_EXPIRES_IN` | `7d`                    | Token lifetime                 |
| `CORS_ORIGIN`    | `http://localhost:3004` | Allowed frontend origin        |

### Frontend (`frontend/.env.local`)

| Variable              | Default                     | Description     |
|-----------------------|-----------------------------|-----------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5004/api` | Backend API URL |

---

## DragonPass API Integration

When credentials are available, update `backend/.env` and replace the local DB calls in controllers with `dragonpassApiService` calls. Zero frontend changes needed.
# Velox-Lounge
