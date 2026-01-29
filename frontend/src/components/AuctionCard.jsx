import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { StatusBadge } from './StatusBadge';
import { BidInput } from './BidInput';
import { useAuction } from '../hooks/useAuction';

export const AuctionCard = ({ item, serverTime, bidderId }) => {
  const { id, title, currentBid, endsAt, status } = item;
  const { placeBid, isSubmitting } = useAuction();
  const [previousBid, setPreviousBid] = useState(currentBid);
  const [showFlash, setShowFlash] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    if (currentBid > previousBid) {
      setShowFlash(true);
      setBidHistory(prev => [...prev.slice(-2), { amount: currentBid, timestamp: Date.now() }]);
      setTimeout(() => setShowFlash(false), 800);
    } else if (currentBid < previousBid) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 600);
    }
    setPreviousBid(currentBid);
  }, [currentBid, previousBid]);

  const shakeVariant = {
    shake: {
      x: [0, -8, 8, -8, 8, 0],
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -4, scale: 1.01 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={shouldShake ? 'shake' : 'animate'}
      whileHover={status !== 'ended' ? 'hover' : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
        showFlash 
          ? 'bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 blur-xl' 
          : status === 'ended'
          ? 'bg-slate-700/10 blur-xl'
          : 'bg-blue-500/10 blur-xl group-hover:bg-blue-500/20'
      }`}></div>

      {/* Main Card */}
      <div className={`relative rounded-2xl shadow-2xl border backdrop-blur-sm transition-all duration-500 overflow-hidden ${
        showFlash
          ? 'bg-gradient-to-br from-emerald-900/90 via-green-900/90 to-emerald-900/90 border-emerald-500/50 shadow-emerald-500/25'
          : status === 'ended'
          ? 'bg-slate-900/90 border-slate-700/50'
          : 'bg-slate-800/90 border-slate-700/50 group-hover:border-slate-600/50'
      }`}>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white mb-1 truncate">
                {title}
              </h3>
              <p className="text-sm text-slate-400">Auction #{id}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Timer Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur"></div>
            <div className="relative flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-slate-300">
                  Time Remaining
                </span>
              </div>
              <Timer endsAt={endsAt} serverTime={serverTime} />
            </div>
          </div>

          {/* Current Bid Display */}
          <div className="relative">
            {/* Pulse animation on bid update */}
            <AnimatePresence>
              {showFlash && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-green-500/30 to-emerald-500/30 rounded-2xl blur-xl"
                />
              )}
            </AnimatePresence>

            <div className="relative p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Current Bid
                  </p>
                  {bidHistory.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
                    >
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-bold text-emerald-400">New</span>
                    </motion.div>
                  )}
                </div>
                
                <motion.div
                  key={currentBid}
                  initial={{ scale: 0.9, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                    ${currentBid.toFixed(2)}
                  </span>
                  {bidHistory.length > 1 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-semibold text-emerald-400"
                    >
                      +${(currentBid - bidHistory[bidHistory.length - 2].amount).toFixed(2)}
                    </motion.span>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bid Input Section */}
          {status !== 'ended' ? (
            <BidInput
              itemId={id}
              bidderId={bidderId}
              placeBid={placeBid}
              bidStatus={status}
              currentBid={currentBid}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-bold text-slate-400 mb-1">Auction Ended</p>
              <p className="text-sm text-slate-500">Final bid: ${currentBid.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Top corner decoration */}
        {status === 'active' && (
          <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rotate-45 translate-x-12 -translate-y-12"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};