import React, { useState } from "react";
import SuccessTickPopup from "./SuccessTickPopup";

function DepositPopup({ wallets, onClose, onDeposit }) {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeposit = async () => {
    if (!selectedWallet) {
      setError("Please select a wallet");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    const result = await onDeposit(selectedWallet, Number(amount));

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
      setError(result?.message || "Failed to deposit");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-neutral-900 p-6 rounded-xl shadow-md w-full max-w-md text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">Deposit</h1>

          {error && <div className="bg-red-800 text-red-200 p-2 mb-4 rounded">{error}</div>}

          <select
            value={selectedWallet}
            onChange={e => setSelectedWallet(e.target.value)}
            className="w-full border border-neutral-600 p-2 mb-4 rounded bg-neutral-800 text-white focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Wallet</option>
            {wallets.map(w => (
              <option key={w._id} value={w._id}>
                {w.name} - ${w.balance || 0}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-neutral-600 p-2 mb-4 rounded bg-neutral-800 text-white focus:outline-none focus:ring focus:border-blue-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleDeposit}
              className="flex-1 bg-emerald-400 text-black py-2 px-4 rounded hover:bg-emerald-700"
            >
              Deposit
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-neutral-700 text-white py-2 px-4 rounded hover:bg-neutral-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <SuccessTickPopup
        show={showSuccess}
        message="Deposit Successful!"
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}

export default DepositPopup;
