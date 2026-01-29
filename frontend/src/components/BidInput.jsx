import { useState } from 'react';

export const BidInput = ({ itemId, bidderId, placeBid, bidStatus, currentBid, isSubmitting }) => {
  const [amount, setAmount] = useState('');
  const isLoading = isSubmitting;
  const isDisabled = isLoading || bidStatus === 'ended';

  const handleBidClick = () => {
    const parsedAmount = parseFloat(amount);

    if (!amount.trim()) {
      alert('Please enter a bid amount');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    if (parsedAmount <= currentBid) {
      alert(`Bid must be greater than current bid ($${currentBid})`);
      return;
    }

    placeBid(itemId, parsedAmount, bidderId);
    setAmount('');
  };

  const handleQuickBid = () => {
    const quickBidAmount = currentBid + 10;
    placeBid(itemId, quickBidAmount, bidderId);
    setAmount('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleBidClick();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Custom Bid Section */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-400">
          Enter Your Bid Amount
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Must be > $${currentBid}`}
            disabled={isDisabled}
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed bg-gray-800 text-white placeholder-gray-500"
            step="0.01"
            min={currentBid + 0.01}
          />
          <button
            onClick={handleBidClick}
            disabled={isDisabled}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isDisabled
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            } ${isLoading ? 'opacity-75' : ''}`}
          >
            {isLoading ? 'Bidding...' : bidStatus === 'ended' ? 'Ended' : 'Bid Now'}
          </button>
        </div>
      </div>

      {/* Quick Bid Section */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-400">
          Quick Bid Option
        </label>
        <button
          onClick={handleQuickBid}
          disabled={isDisabled}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isDisabled
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
              : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
          } ${isLoading ? 'opacity-75' : ''}`}
        >
          +$10 (${currentBid + 10})
        </button>
      </div>
    </div>
  );
};
