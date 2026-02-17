import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

function WalletAccounts() {
  // Predefined demo wallets that look like real data
  const walletsData = [
    { id: 1, name: "Main Wallet", amount: "12,500", growth: "+4% since last hour" },
    { id: 2, name: "Savings Wallet", amount: "8,200", growth: "+2% since last hour" },
    { id: 3, name: "Trading Wallet", amount: "5,750", growth: "+7% since last hour" },
    { id: 4, name: "Emergency Fund", amount: "3,000", growth: "+1% since last hour" },
  ];

  const [activeWallet, setActiveWallet] = useState(null);

  return (
    <div className="pb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-lg">
          Wallet Accounts
        </h2>
        <MoreVertical size={16} className="text-neutral-500 cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {walletsData.map((wallet, index) => (
          <div
            key={wallet.id}
            className={`relative bg-neutral-800 rounded-lg px-2 py-2 border cursor-pointer
              ${activeWallet === index
                ? "border-emerald-500 shadow-[0_0_0_1px_#10b981]"
                : "border-neutral-700"
              }`}
            onClick={() => setActiveWallet(index)}
          >
            <MoreVertical
              size={14}
              className="absolute top-2 right-2 text-neutral-500 cursor-pointer"
            />
            <p className="text-neutral-400 text-xs">{wallet.name}</p>
            <h1 className="text-white text-base font-semibold mt-1">{wallet.amount}</h1>
            <p className="text-neutral-500 text-xs mt-1">{wallet.growth}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletAccounts;
