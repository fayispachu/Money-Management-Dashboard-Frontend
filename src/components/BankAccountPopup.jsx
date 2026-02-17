import React, { useState } from "react";

function BankAccountPopup({ onClose, onAddBank }) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [error, setError] = useState("");

  const handleAddBank = () => {
    // Trim inputs to avoid whitespace issues
    const name = bankName.trim();
    const accNum = accountNumber.trim();
    const ifscCode = ifsc.trim();

    if (!name || !accNum || !ifscCode) {
      setError("All fields are required");
      return;
    }

    if (accNum.length < 6) {
      setError("Enter a valid account number (min 6 digits)");
      return;
    }

    // if (!/^[A-Z]{4}[0-9]{7}$/.test(ifscCode.toUpperCase()) && ifscCode.length !== 11) {
    //   // Basic IFSC pattern check
    //   setError("Enter a valid IFSC code");
    //   return;
    // }

    // Call parent handler
    onAddBank({
      name,
      accountNumber: accNum,
      ifsc: ifscCode.toUpperCase(),
      active: true,
    });

    // Reset fields
    setBankName("");
    setAccountNumber("");
    setIfsc("");
    setError("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4 text-center">
          Add Bank Account
        </h2>

        {error && (
          <div className="bg-red-700 text-white p-2 mb-4 rounded">{error}</div>
        )}

        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          autoFocus
          onChange={(e) => setBankName(e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 p-2 mb-3 rounded focus:outline-none focus:ring focus:border-emerald-400"
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/, ""))} // only digits
          className="w-full bg-neutral-800 border border-neutral-700 p-2 mb-3 rounded focus:outline-none focus:ring focus:border-emerald-400"
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value.toUpperCase())} // uppercase automatically
          className="w-full bg-neutral-800 border border-neutral-700 p-2 mb-4 rounded focus:outline-none focus:ring focus:border-emerald-400"
        />

        <div className="flex gap-2">
          <button
            onClick={handleAddBank}
            className="flex-1 bg-emerald-400 text-black py-2 px-4 rounded hover:bg-emerald-500 transition"
          >
            Add Account
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BankAccountPopup;
