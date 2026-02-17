import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import BankAccountPopup from "./BankAccountPopup";
import { useBank } from "../context/BankContext";

function BankAccounts() {
  const { banks, addBank, deleteBank } = useBank();
  const [showAddBankPopup, setShowAddBankPopup] = useState(false);
  const [showTopDropdown, setShowTopDropdown] = useState(false);
  const [openCardDropdown, setOpenCardDropdown] = useState(null);
  const [activeBank, setActiveBank] = useState(null);

  const renderBanks = banks.length > 0 ? banks : [{ _id: "demo", name: "Demo Bank", balance: "0.00", demo: true }];

  return (
    <div className="pb-3 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-lg">Associated Bank Accounts</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {renderBanks.map((account) => (
          <div
            key={account._id}
            className={`bg-neutral-800 rounded-lg px-2 py-2 border cursor-pointer relative
              ${activeBank === account._id
                ? "border-emerald-500 shadow-[0_0_0_1px_#10b981]"
                : "border-neutral-700"
              }`}
            onClick={() => !account.demo && setActiveBank(account._id)}
          >
            {!account.demo && (
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
            )}
            <p className={`text-xs ${account.demo ? "text-neutral-600 italic" : "text-neutral-400"}`}>{account.name}</p>
            <h1 className={`text-base font-semibold mt-1 ${account.demo ? "text-neutral-500" : "text-white"}`}>{account.balance}$</h1>
            <p className={`text-xs mt-1 ${account.demo ? "text-neutral-600 italic" : "text-emerald-500"}`}>
              {account.demo ? "XXXXXX" : "XXXXX87UYHJ"}
            </p>
          </div>
        ))}
      </div>

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
