import { useEffect, useState } from 'react';
import socket from '../sockets/socket';
import { useAuctionStore } from '../store/auctionStore';
import { getItems } from '../api/auctionApi';
import { AuctionCard } from '../components/AuctionCard';

export const Dashboard = () => {
  const { items, serverTime, setItems, setCurrentBidderId } = useAuctionStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidderId] = useState(() => `bidder_${Date.now()}`);

  useEffect(() => {
    setCurrentBidderId(bidderId);

    const fetchInitialItems = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!socket.connected) {
      socket.connect();
    }

    fetchInitialItems();

    const handleServerTime = (data) => {
      setItems((prevState) => ({
        items: prevState.items,
        serverTime: data.serverTime,
      }));
    };

    socket.on('SERVER_TIME', handleServerTime);

    return () => {
      socket.off('SERVER_TIME', handleServerTime);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-300 text-lg font-medium">Loading auctions...</p>
          <p className="text-slate-500 text-sm mt-2">Connecting to live feed</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Connection Error</h3>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
                  Live Auctions
                </h1>
                <p className="text-slate-400 text-lg">
                  {items.length > 0 ? (
                    <>
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                        {items.length} active auction{items.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  ) : (
                    'Waiting for auctions to start'
                  )}
                </p>
              </div>
              
              {/* Live Indicator */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-medium text-slate-300">LIVE</span>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Grid of Auction Cards */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AuctionCard
                    item={item}
                    serverTime={serverTime}
                    bidderId={bidderId}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Active Auctions</h3>
              <p className="text-slate-500 text-center max-w-md">
                There are no auctions available at the moment. Check back soon for new items!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};