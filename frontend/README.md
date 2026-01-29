# Auction Hub - Real-Time Bidding Platform

A modern, real-time auction platform built with **React**, **Vite**, **Tailwind CSS**, and **Socket.io** for live bidding experience.

## 🌟 Features

### Live Auction System
- **Real-time Bidding**: Instant bid updates via WebSocket
- **Server-Synced Countdown Timer**: Accurate time remaining display (Years, Days, Hours, Minutes, Seconds)
- **Dynamic Status Badges**: IDLE, WINNING, OUTBID, BIDDING, ENDED states
- **Animated Bid Updates**: Green flash on new bids, shake animation when outbid
- **Responsive Design**: Works seamlessly on mobile and desktop

### User Experience
- **Smart Bid Input**: Validation for minimum bids with quick +$10 bid option
- **Real-time Notifications**: Instant feedback on bid success/failure
- **Auto-hide Controls**: Bid input disappears when auction ends
- **Dark Mode Only**: Sleek dark theme throughout
- **Keyboard Support**: Press Enter to submit bids
- **Live Auction Status**: Shows auction status and remaining time

## 📁 Project Structure

```
src/
├── api/
│   └── auctionApi.js              # HTTP API client (fetches initial items)
├── sockets/
│   └── socket.js                  # Socket.io connection setup
├── store/
│   └── auctionStore.js            # Zustand store for auction state
├── hooks/
│   └── useAuction.js              # Custom hook for bid management
├── components/
│   ├── AuctionCard.jsx            # Individual auction item display
│   ├── BidInput.jsx               # Bid submission form (responsive)
│   ├── Timer.jsx                  # Countdown timer with human-readable format
│   ├── StatusBadge.jsx            # Auction status indicator
│   └── ThemeToggle.jsx            # (Removed - dark mode only)
├── pages/
│   └── Dashboard.jsx              # Main auction dashboard
├── context/
│   └── ThemeContext.jsx           # (Removed - dark mode only)
├── App.jsx                        # Root component with header
└── main.jsx                       # Entry point
```

## 🎨 Design

### Color Palette (Dark Mode Only)
- **Background**: Gradient from slate-950 to slate-900
- **Cards**: slate-800 with slate-700 borders
- **Primary**: blue-500 (buttons)
- **Success**: green-500 (quick bid button)
- **Warning**: red-400 (low time countdown)
- **Text**: white/gray-300 (high contrast)

### Layout
- **Header**: Centered, glassmorphic design with glow effect
- **Grid Layout**: Responsive 1-3 columns (mobile to desktop)
- **Card Design**: Animated with hover effects and gradient overlays
- **Spacing**: Generous padding for touch-friendly mobile experience

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE=http://localhost:3000" > .env
echo "VITE_SOCKET_URL=http://localhost:3000" >> .env
```

### Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔌 Socket Events

### Emitted Events
- **`BID_PLACED`**: Submit a bid
  ```javascript
  { itemId, amount, bidderId }
  ```

### Listened Events
- **`UPDATE_BID`**: Bid accepted and updated
  ```javascript
  { itemId, currentBid, highestBidder }
  ```
- **`OUTBID`**: Another user placed a higher bid
  ```javascript
  { message }
  ```
- **`BID_ERROR`**: Bid was rejected
  ```javascript
  { message }
  ```
- **`SERVER_TIME`**: Server time sync (for accurate countdown)
  ```javascript
  { serverTime }
  ```

## 📋 Environment Variables

Create `.env` file in the root:

```env
VITE_API_BASE=https://auction-twk2.onrender.com  # Backend API URL
VITE_SOCKET_URL=https://auction-twk2.onrender.com # Socket.io server URL
```

Or for local development (`.env.local`):

```env
VITE_API_BASE=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

## 🏗️ Architecture

### State Management (Zustand Store)
```javascript
{
  items: [],                    // Array of auction items
  serverTime: null,             // Server's current time
  currentBidderId: string,      // Current user's ID
  
  // Mutations
  setItems(data),               // Initialize items
  updateBid(itemId, bid),       // Update bid
  setStatus(itemId, status),    // Update auction status
  setCurrentBidderId(id)        // Set user ID
}
```

### Component Hierarchy
```
App
  ├── Header (Centered, Glassmorphic)
  └── Dashboard
      ├── Loading/Error States
      └── Grid of AuctionCards
          ├── Timer
          ├── StatusBadge
          ├── Current Bid Display
          └── BidInput (hidden when ended)
```

## 🎯 Key Features Explained

### Server-Synced Timer
- Uses server time for accuracy
- Converts seconds to human-readable format (e.g., "1d 2h 30m 45s")
- Pulses red when less than 1 minute remaining
- Shows "Ended" when countdown reaches zero

### Responsive Bid Input
- **Desktop**: Horizontal layout (input + button side-by-side)
- **Mobile**: Vertical stack (input above buttons)
- Full-width buttons on mobile for easy tapping
- Auto-clears input on successful bid
- Disabled during pending bids

### Bid Validation
- Minimum bid must exceed current bid
- Prevents non-numeric or negative values
- Shows appropriate error messages
- Quick +$10 option for faster bidding

## 📱 Responsive Breakpoints

- **Mobile**: Default (single column, full-width buttons)
- **Tablet**: `sm:` (600px+)
- **Desktop**: `lg:` (1024px+)

## 🔒 CORS Configuration

The frontend communicates with the backend via:
1. **HTTP**: REST API for fetching initial auction list
2. **WebSocket**: Real-time bid updates and notifications

Backend allows all origins: `cors({ origin: "*" })`

## 🐛 Troubleshooting

### Bids not updating?
- Check if WebSocket is connected (browser DevTools > Network > WS)
- Verify `VITE_SOCKET_URL` is correct
- Ensure backend is running and Socket.io is configured

### Timer not accurate?
- Server time is used for synchronization
- Check if server is sending `SERVER_TIME` events
- Browser clock should be reasonably accurate

### CORS errors?
- Make sure backend has CORS enabled
- Check `VITE_API_BASE` environment variable
- Verify frontend and backend URLs match

## 📚 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Real-time**: Socket.io
- **HTTP Client**: Native Fetch API
- **Animations**: Framer Motion

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Render)
```bash
# Ensure CORS is enabled
# Deploy to Render with env variables
```

## 📄 License

MIT

## Performance Notes

- Components only re-render on relevant store updates
- Timer updates don't cause unnecessary re-renders
- Socket listeners are cleaned up on unmount
- CSS animations are GPU-accelerated
- Dark mode preference is persisted to localStorage
