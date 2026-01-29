import { useEffect, useState } from 'react';
import socket from '../sockets/socket';
import { useAuctionStore } from '../store/auctionStore';

export const useAuction = () => {
  const { updateBid, setStatus } = useAuctionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Subscribe to UPDATE_BID event
    socket.on('UPDATE_BID', (data) => {
      const { itemId, currentBid, highestBidder } = data;
      updateBid(itemId, currentBid, highestBidder);
      setIsSubmitting(false);
    });

    // Subscribe to OUTBID event
    socket.on('OUTBID', (data) => {
      setIsSubmitting(false);
    });

    // Subscribe to BID_ERROR event
    socket.on('BID_ERROR', (error) => {
      setIsSubmitting(false);
      console.error('Bid error:', error.message);
    });

    // Subscribe to AUCTION_ENDED event
    socket.on('AUCTION_ENDED', (data) => {
      const { itemId } = data;
      setStatus(itemId, 'ended');
    });

    return () => {
      socket.off('UPDATE_BID');
      socket.off('OUTBID');
      socket.off('BID_ERROR');
      socket.off('AUCTION_ENDED');
    };
  }, [updateBid, setStatus]);

  const placeBid = (itemId, amount, bidderId) => {
    setIsSubmitting(true);
    socket.emit('BID_PLACED', {
      itemId,
      amount,
      bidderId,
    });
  };

  return {
    placeBid,
    isSubmitting,
  };
};

