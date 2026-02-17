import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import BankAccountPopup from "./BankAccountPopup";
import { useBank } from "../context/BankContext";

function BankAccounts() {
  const { banks, addBank, deleteBank } = useBank();
  const [showAddBankPopup, setShowAddBankPopup] = useState(false);
  const [showTopDropdown, setShowTopDropdown] = useState(false);

  // Track which card dropdown is open
  const [openCardDropdown, setOpenCardDropdown] = useState(null);

  return (
    <div className="pb-3 relative">
      {/* Header with top-right three-dot menu */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-lg">
          Associated Bank Accounts
        </h2>

        {/* Small three-dot menu for Add Account */}
        <div className="relative">
          <MoreVertical
            size={18}
            className="text-neutral-500 cursor-pointer"
            onClick={() => setShowTopDropdown(!showTopDropdown)}
          />
          {showTopDropdown && (
            <div className="absolute right-0 mt-1 w-36 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50">
              <button
                className="block w-full text-left px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white"
                onClick={() => {
                  setShowAddBankPopup(true);
                  setShowTopDropdown(false);
                }}
              >
                Add Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bank cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {banks.map((account) => (
          <div
            key={account._id}
            className={`bg-neutral-800 rounded-lg px-2 py-2 border cursor-pointer relative
              ${account.active
                ? "border-emerald-500 shadow-[0_0_0_1px_#10b981]"
                : "border-neutral-700"
              }`}
          >
            {/* Three-dot menu on each card */}
            <div className="absolute top-2 right-2">
              <MoreVertical
                size={14}
                className="text-neutral-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCardDropdown(openCardDropdown === account._id ? null : account._id);
                }}
              />
              {openCardDropdown === account._id && (
                <div className="absolute right-0 mt-1 w-28 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-neutral-800 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBank(account._id);
                      setOpenCardDropdown(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="text-neutral-400 text-xs">{account.name}</p>
            <h1 className="text-white text-base font-semibold mt-1">{account.balance}</h1>
            <p className="text-emerald-500 text-xs mt-1">XXXXX87UYHJ</p>
          </div>
        ))}
      </div>

      {/* Add Bank popup */}
      {showAddBankPopup && (
        <BankAccountPopup
          onClose={() => setShowAddBankPopup(false)}
          onAddBank={(bank) => {
            addBank(bank);
            setShowAddBankPopup(false);
          }}
        />
      )}
    </div>
  );
}

export default BankAccounts;
