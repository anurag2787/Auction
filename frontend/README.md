# Auction Frontend

A real-time auction interface built with React, Vite, and Tailwind CSS.

## Architecture Principles

### Frontend is a Passive Renderer
- **Backend is the only authority**
- UI state is derived from server events via WebSocket
- Never update UI optimistically
- If UI disagrees with server, the UI is wrong

### Socket-Driven State Management
- State flows: Backend → Socket Events → Store → Components
- Components subscribe to store changes
- Only socket events (from backend) modify state
- User clicks trigger socket emissions, not immediate updates

### Truth Sources
- **Server Time**: Used for countdown calculations, never `Date.now()`
- **Socket Events**: The only valid source of auction updates
- **User Input**: Only triggers socket emissions, never modifies state directly

## Project Structure

```
src/
├── api/
│   └── auctionApi.js          # HTTP requests to backend
├── sockets/
│   └── socket.js              # WebSocket connection manager
├── store/
│   └── auctionStore.js        # Centralized auction state
├── hooks/
│   └── useAuction.js          # Custom hook for auction data
├── components/
│   ├── AuctionCard.jsx        # Main auction display component
│   ├── BidInput.jsx           # Bid submission form
│   ├── Timer.jsx              # Countdown timer
│   ├── StatusBadge.jsx        # Auction status indicator
│   └── ThemeToggle.jsx        # Light/dark mode toggle
├── pages/
│   └── Dashboard.jsx          # Main page layout
└── App.jsx                    # Root component
```

## Color System

### Light Mode
- Background: `#F9FAFB`
- Card: `#FFFFFF`
- Primary: `#2563EB`
- Success: `#16A34A`
- Danger: `#DC2626`
- Text: `#0F172A`

### Dark Mode
- Background: `#020617`
- Card: `#0F172A`
- Primary: `#3B82F6`
- Success: `#22C55E`
- Danger: `#EF4444`
- Text: `#E5E7EB`

## Features

### Auction Card
- **Real-time Bid Display**: Updates instantly from server
- **Countdown Timer**: Server-synced, pulses when < 10s
- **Status Badge**: Shows IDLE, WINNING, OUTBID, or ENDED
- **Flash Animation**: Green flash on bid updates
- **Shake Animation**: Shake when user is outbid
- **Bid Input**: Smart validation, disabled when auction ends

### Interactions
- **Price Flash**: Green background flash on bid update (500ms)
- **Outbid Shake**: Card shakes when outbid (500ms)
- **Button Pulse**: Loading state with "Sending…" text
- **Timer Pulse**: Red pulse when < 10 seconds remaining
- **Keyboard Support**: Press Enter in bid input to submit

### Accessibility
- High contrast colors (WCAG AA+)
- Semantic HTML with ARIA labels
- Keyboard navigation support
- Screen reader friendly status updates
- Focus management for interactive elements

## Socket Events

### Emitted Events
- `PLACE_BID` - Submit a bid
  ```javascript
  { itemId, amount, bidderId }
  ```

### Listened Events
- `UPDATE_BID_${itemId}` - Bid accepted
  ```javascript
  { itemId, bid, highestBidder }
  ```
- `OUTBID_${itemId}` - User was outbid
  ```javascript
  { itemId, currentHighestBid, currentHighestBidder }
  ```
- `BID_ERROR_${itemId}` - Bid rejected
  ```javascript
  { itemId, message }
  ```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_SOCKET_URL=http://localhost:3000
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Critical Rules

### Never Do This
❌ Update UI optimistically  
❌ Use `Date.now()` for countdown  
❌ Store auction state outside of store  
❌ Make socket emit without waiting for response  

### Always Do This
✅ Wait for socket events to update UI  
✅ Use server-provided end time for countdown  
✅ Keep all state in `auctionStore`  
✅ Disable inputs during pending requests  
✅ Show loading state while waiting for server  
✅ Trust the server as the single source of truth  

## Performance Notes

- Components only re-render on relevant store updates
- Timer updates don't cause unnecessary re-renders
- Socket listeners are cleaned up on unmount
- CSS animations are GPU-accelerated
- Dark mode preference is persisted to localStorage
