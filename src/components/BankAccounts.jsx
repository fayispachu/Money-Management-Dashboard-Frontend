import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import BankAccountPopup from "./BankAccountPopup";
import { useBank } from "../context/BankContext";

function BankAccounts() {
  const { banks, addBank, setActiveBank, deleteBank } = useBank();
  const [showAddBankPopup, setShowAddBankPopup] = useState(false);

  return (
    <div className="pb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-lg">Associated Bank Accounts</h2>
        <button
          onClick={() => setShowAddBankPopup(true)}
          className="text-neutral-500 hover:text-white"
        >
          Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {banks.map((account, index) => (
          <div
            key={account._id}
            className={`relative bg-neutral-800 rounded-lg px-2 py-2 border cursor-pointer
              ${account.active
                ? "border-emerald-500 shadow-[0_0_0_1px_#10b981]"
                : "border-neutral-700"
              }`}
            onClick={() => setActiveBank(account._id)}
          >
            <MoreVertical
              size={14}
              className="absolute top-2 right-2 text-neutral-500 cursor-pointer"
            />

            <p className="text-neutral-400 text-xs">{account.name}</p>
            <h1 className="text-white text-base font-semibold mt-1">{account.accountNumber}</h1>
            <p className="text-emerald-500 text-xs mt-1">{account.ifsc}</p>

            <button
              className="absolute bottom-2 right-2 text-red-500 text-xs"
              onClick={(e) => { e.stopPropagation(); deleteBank(account._id); }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAddBankPopup && (
        <BankAccountPopup
          onClose={() => setShowAddBankPopup(false)}
          onAddBank={(bank) => { addBank(bank); setShowAddBankPopup(false); }}
        />
      )}
    </div>
  );
}

export default BankAccounts;
