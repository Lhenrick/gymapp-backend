# Click’n’Fit Backend (Express + Prisma + TS)

## Quickstart
1) Copy `.env.example` to `.env` and adjust variables.
2) Start Postgres (Docker): `docker compose up -d`
3) Install deps: `npm i`
4) Generate client & migrate: `npx prisma generate && npm run prisma:migrate -- --name init`
5) Seed data: `npm run seed`
6) Run dev: `npm run dev`

### Key Endpoints (base: `/api`)
- `POST /auth/register` { email, password, name?, locale? }
- `POST /auth/login` { email, password }
- `GET /auth/me` (Bearer token)

- `GET /catalog/muscles`
- `GET /catalog/exercises?muscle=chest`

- `GET /plans` (auth)
- `POST /plans` (auth) Create plan with days & items
- `DELETE /plans/:id` (auth)

- `GET /sessions` (auth)
- `POST /sessions` (auth)
- `POST /sessions/:sessionId/sets` (auth)

- `GET /stats/overview` (auth)

### Notes
- Fix for your previous error: the model is `SessionSet`, not `SessionsSet`.
- All payloads validated with Zod; JWT-based auth; bcrypt for hashes.
- Prisma schema models: User, Muscle, Exercise, WorkoutPlan/Day/Item, WorkoutSession, SessionSet.
