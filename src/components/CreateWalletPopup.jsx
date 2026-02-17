import React from "react";

function CreateWalletPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-md w-full max-w-md text-center text-white">
        <h2 className="text-xl font-bold mb-4">Add New Wallet</h2>
        <p className="mb-6 text-neutral-300">Currently not possible</p>

        <button
          onClick={onClose}
          className="bg-emerald-400 text-white py-2 px-4 rounded hover:bg-emerald-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CreateWalletPopup;
