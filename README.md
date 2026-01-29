# 🏆 Auction Hub - Real-Time Bidding Platform

A modern, full-stack real-time auction platform with live bidding, WebSocket communication, and responsive design.

## 📋 What is Auction Hub?

A complete auction system where users can bid on items in real-time with:
- **Live bidding** via WebSocket
- **Real-time updates** across all connected users  
- **Server-synced timers** for accurate countdowns
- **Responsive design** for mobile and desktop
- **Race condition prevention** for concurrent bids

### 🎯 Live Demo
- **Frontend**: https://auction-mu-rouge.vercel.app
- **Backend**: https://auction-twk2.onrender.com

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone & run with Docker
git clone https://github.com/anurag2787/Auction
cd project

# Start both services with one command
docker-compose up --build

# Then open http://localhost:5173 in your browser
```

Environment variables are automatically configured for Docker networking.

### Option 2: Local Development

```bash
# Clone & setup
git clone https://github.com/anurag2787/Auction
cd project

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run locally (2 terminals)
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

Then open http://localhost:5173 in your browser.

## 📖 Documentation

**👉 For detailed information, see the component-specific READMEs:**

- **[Frontend README](./frontend/README.md)** - React app, components, Socket.io events, environment setup, deployment
- **[Backend README](./backend/README.md)** - Express server, REST API, WebSocket handlers, auction logic, database schema

## 📁 Project Structure

```
project/
├── backend/                 # Express.js + Socket.io server
│   ├── src/
│   ├── package.json
│   └── README.md           # ← Backend docs
│
├── frontend/                # React + Vite application
│   ├── src/
│   ├── package.json
│   └── README.md           # ← Frontend docs
│
└── README.md               # This file
```

## 🛠️ Tech Stack

**Frontend**: React 18 • Vite • Tailwind CSS • Zustand • Socket.io Client • Framer Motion

**Backend**: Express.js • Socket.io • Node.js • CORS

## 🎯 Quick Links

| Topic | Link |
|-------|------|
| Frontend Development | [frontend/README.md](./frontend/README.md) |
| Backend Development | [backend/README.md](./backend/README.md) |
| Deployment (Frontend) | [frontend/README.md](./frontend/README.md#deployment) |
| Deployment (Backend) | [backend/README.md](./backend/README.md#deployment) |
| Socket.io Events | See respective README files |
| Environment Variables | See respective README files |
| Troubleshooting | See respective README files |

## 🔗 Key Features

- **Real-time Bidding** - Live updates via WebSocket
- **4 Active Auctions** - MacBook Pro, Internship Stipend, Gaming Laptop, Headphones  
- **Dark Mode UI** - Responsive design, mobile-friendly
- **Server Authority** - Backend is source of truth
- **Race Condition Prevention** - Mutex lock on concurrent bids
- **Synced Timers** - Human-readable countdown format

## 🐳 Docker Setup

The project includes Docker configuration for easy deployment:

### Files
- `frontend/Dockerfile` - Multi-stage build for React app
- `backend/Dockerfile` - Node.js server runtime
- `docker-compose.yml` - Orchestrates both services

### Quick Commands

```bash
# Start both services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build

# Run in background
docker-compose up -d
```

### Network Details
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Internal communication**: `http://backend:3000` (Docker network)

Services communicate via a custom Docker network (`auction-network`) so the frontend can reach the backend at `http://backend:3000` without needing external IPs.

## 🚀 Next Steps

1. **Read [Frontend README](./frontend/README.md)** for UI development
2. **Read [Backend README](./backend/README.md)** for server development
3. **Clone and run locally** following Quick Start above
4. **Deploy to production** - Instructions in respective READMEs

## 📄 License

MIT

---

**For complete documentation, see [Frontend](./frontend/README.md) and [Backend](./backend/README.md) READMEs.**
