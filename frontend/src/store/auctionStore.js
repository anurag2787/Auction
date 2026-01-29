import { create } from 'zustand';

export const useAuctionStore = create((set) => ({
  items: [],
  serverTime: null,
  currentBidderId: null,

  setItems: (data) => set({
    items: data.items,
    serverTime: data.serverTime,
  }),

  setCurrentBidderId: (bidderId) => set({
    currentBidderId: bidderId,
  }),

  updateBid: (itemId, bid, bidder) => set((state) => ({
    items: state.items.map((item) =>
      item.id === itemId
        ? { 
            ...item, 
            currentBid: bid, 
            currentBidder: bidder,
            status: bidder === state.currentBidderId ? 'winning' : 'idle'
          }
        : item
    ),
  })),

  setStatus: (itemId, status) => set((state) => ({
    items: state.items.map((item) =>
      item.id === itemId
        ? { ...item, status }
        : item
    ),
  })),
}));
