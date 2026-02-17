import React, { useState } from "react";
import SuccessTickPopup from "./SuccessTickPopup";

function WithdrawPopup({ wallets, onClose, onWithdraw }) {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWithdraw = async () => {
    if (!selectedWallet) {
      setError("Please select a wallet");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    const wallet = wallets.find(w => w._id === selectedWallet);
    if (!wallet || Number(amount) > wallet.balance) {
      setError("Insufficient balance");
      return;
    }

    // Make sure onWithdraw returns an object { success: true/false }
    const result = await onWithdraw(selectedWallet, Number(amount));

    if (result?.success) {
      setShowSuccess(true);
      setSelectedWallet("");
      setAmount("");
      setError("");

      // Auto-close popup after 2.5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2500);
    } else {
      setError(result?.message || "Failed to withdraw");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-neutral-900 p-8 rounded shadow-md w-full max-w-md text-white">
          <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">
            Withdraw
          </h1>

          {error && <div className="bg-red-700 text-white p-2 mb-4 rounded">{error}</div>}

          <select
            value={selectedWallet}
            onChange={e => setSelectedWallet(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 p-2 mb-4 rounded focus:outline-none focus:ring focus:border-emerald-400"
          >
            <option value="">Select Wallet</option>
            {wallets.map(w => (
              <option key={w._id} value={w._id}>
                {w.name} - ₹{w.balance || 0}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-neutral-800 border border-neutral-700 p-2 mb-4 rounded focus:outline-none focus:ring focus:border-emerald-400"
          />

          <div className="flex gap-2">
            <button
              onClick={handleWithdraw}
              className="flex-1 bg-emerald-400 text-black py-2 px-4 rounded hover:bg-emerald-500"
            >
              Withdraw
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <SuccessTickPopup
        show={showSuccess}
        message="Withdrawal Successful!"
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}

export default WithdrawPopup;
