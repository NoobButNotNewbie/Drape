# Drape Backend

Backend API theo module/domain cho Drape.

## Chạy local

```bash
npm install
copy .env.example .env
npm run dev
```

API mặc định chạy tại `http://localhost:3000`. Health check: `GET /api/health`.

Mỗi domain nằm trong `src/modules`; logic dùng chung chỉ đặt trong `src/common`.
