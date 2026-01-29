# Auction Hub - Backend API

A real-time auction server built with **Express.js**, **Socket.io**, and **Node.js**. Handles live bidding, auction management, and real-time updates.

## 🌟 Features

### Real-Time Bidding System
- **Live Bid Updates**: Instant WebSocket notifications to all connected clients
- **Bid Validation**: Ensures bids are higher than current bid
- **Auction Management**: Automatic auction status tracking (idle, bidding, ended)
- **Concurrent Bid Handling**: Mutex lock to prevent race conditions
- **Server Time Sync**: Clients sync with server time for accurate countdowns

### Auction Catalog
1. **MacBook Pro** - Starting bid: $10
2. **Internship Stipend** - Starting bid: $300
4. **Sony Wireless Headphones** - Starting bid: $20

### API Endpoints
- `GET /items` - Fetch all active auctions with current bids and server time
- `POST /items/:id/bid` - Submit a bid (via WebSocket instead)

## 📁 Project Structure

```
src/
├── server.js                      # Entry point, server initialization
├── app.js                         # Express app setup with CORS
├── socket.js                      # Socket.io setup and event handlers
├── routes/
│   └── items.routes.js            # REST API routes
├── services/
│   └── auction.service.js         # Bid logic and validation
└── store/
    └── auction.store.js           # In-memory auction data (seeded)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The server will run on `http://localhost:3000`

## 🔌 Socket.io Events

### Client → Server

**`BID_PLACED`** - Submit a bid
```javascript
socket.emit('BID_PLACED', {
  itemId: "2",           // Auction item ID
  amount: 350,           // Bid amount in dollars
  bidderId: "bidder_123" // User's unique bidder ID
})
```

### Server → Client (Broadcast)

**`UPDATE_BID`** - Bid accepted and broadcast to all users
```javascript
socket.on('UPDATE_BID', {
  itemId: "2",
  currentBid: 350,
  highestBidder: "bidder_123"
})
```

**`OUTBID`** - Another user placed a higher bid
```javascript
socket.on('OUTBID', "Another bid just won")
```

**`BID_ERROR`** - Bid was rejected
```javascript
socket.on('BID_ERROR', "Bid too low")
```

**`SERVER_TIME`** - Server sends current time (for countdown sync)
```javascript
socket.on('SERVER_TIME', {
  serverTime: Date.now()
})
```

## 📡 REST API

### Get All Items
```http
GET /items
```

**Response:**
```json
{
  "serverTime": 1706520345000,
  "items": [
    {
      "id": "1",
      "title": "MacBook Pro",
      "startingPrice": 10,
      "currentBid": 150,
      "highestBidder": "bidder_456",
      "endsAt": 1706521345000,
      "status": "bidding"
    }
  ]
}
```

## 🏗️ Architecture

### In-Memory Store
All auction data is stored in a JavaScript `Map` in memory. Currently seeded with 4 items.

```javascript
auctions = Map {
  "1": { id, title, startingPrice, currentBid, highestBidder, endsAt, lock },
  "2": { ... },
  "3": { ... },
  "4": { ... }
}
```

### Bid Validation Flow
```
1. Client emits BID_PLACED
   ↓
2. Check if item exists
   ↓
3. Check if auction has ended (endsAt > now)
   ↓
4. Lock auction (prevent concurrent bids)
   ↓
5. Validate bid > currentBid
   ↓
6. Update bid if valid
   ↓
7. Broadcast UPDATE_BID to all clients
   ↓
8. Release lock
```

### Concurrency Control
Uses a simple `lock` flag to prevent race conditions:
```javascript
if (auction.lock) return socket.emit("OUTBID", "Another bid just won");
auction.lock = true;
try {
  // Validate and process bid
  auction.currentBid = amount;
  // Broadcast to all clients
  io.emit("UPDATE_BID", { ... });
} finally {
  auction.lock = false;
}
```

## 📊 Data Model

### Auction Item
```javascript
{
  id: string,              // Unique identifier
  title: string,           // Item name
  startingPrice: number,   // Minimum bid
  currentBid: number,      // Current highest bid
  highestBidder: string,   // User ID of current bidder
  endsAt: timestamp,       // Unix timestamp when auction ends
  status: string,          // 'idle', 'bidding', 'ended'
  lock: boolean           // Internal: prevents race conditions
}
```

## 🔒 CORS Configuration

The backend allows all origins:
```javascript
app.use(cors({ origin: "*" }));
```

This enables requests from:
- Local development: `http://localhost:5173`
- Production: Any domain

For production, restrict to specific origins:
```javascript
cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ]
})
```

## 🌐 Deployment (Render)

### Environment Variables
No environment variables required for basic setup.

### Deploy Steps
1. Push code to GitHub
2. Connect repository to Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy!

Backend will be available at: `https://auction-twk2.onrender.com`

## 🧪 Testing Bids

### Using Socket.io Client
```bash
# Install socket.io-client
npm install socket.io-client

# Create test script
cat > test-bid.js << 'EOF'
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  
  // Place a bid
  socket.emit('BID_PLACED', {
    itemId: '1',
    amount: 50,
    bidderId: 'test_user_123'
  });
});

socket.on('UPDATE_BID', (data) => {
  console.log('Bid updated:', data);
});

socket.on('BID_ERROR', (msg) => {
  console.log('Error:', msg);
});
EOF

# Run test
node test-bid.js
```

## 🐛 Troubleshooting

### WebSocket Connection Issues
- Check if Socket.io is running: `http://localhost:3000/socket.io/`
- Verify CORS is enabled
- Check browser DevTools > Network > WS for connection status

### Bids Not Appearing
- Ensure `BID_PLACED` event is emitted correctly
- Check server logs for validation errors
- Verify `UPDATE_BID` is being broadcast

### Auction Status Not Updating
- Server calculates status on `/items` request
- Use server time for countdown (not client time)
- Ensure `endsAt` timestamps are correct

## 📈 Performance Notes

- **In-Memory Storage**: Fast but lost on restart
- **Mutex Lock**: Simple but blocking
- **No Persistence**: Use database for production

For production, consider:
- MongoDB or PostgreSQL for persistence
- Redis for real-time data
- Horizontal scaling with Socket.io adapter

## 📄 License

MIT

## 🔗 Related

- **Frontend**: [Auction Hub Frontend](../frontend/README.md)
- **API Docs**: See Socket.io Events section above
- **Live Demo**: https://auction-twk2.onrender.com
