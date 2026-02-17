import React from "react";
import { MoreVertical } from "lucide-react";

function WalletAccounts() {
  const wallets = [
    { name: "Wallet A", amount: "10,000", growth: "+10% since last hour" },
    { name: "Wallet B", amount: "5,000", growth: "+5% since last hour" },
    { name: "Wallet C", amount: "5,000", growth: "+7% since last hour", active: true },
    { name: "Wallet D", amount: "5,000", growth: "+3% since last hour" },
  ];

  return (
    <div className="pb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-lg">
          Wallet Accounts
        </h2>
        <MoreVertical size={16} className="text-neutral-500 cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className={`relative bg-neutral-800 rounded-lg px-2 py-2 border
              ${
                wallet.active
                  ? "border-emerald-500 shadow-[0_0_0_1px_#10b981]"
                  : "border-neutral-700"
              }`}
          >
            <MoreVertical
              size={14}
              className="absolute top-2 right-2 text-neutral-500 cursor-pointer"
            />

            <p className="text-neutral-400 text-xs">
              {wallet.name}
            </p>

            <h1 className="text-white text-base font-semibold mt-1">
              {wallet.amount}
            </h1>

            <p className="text-neutral-500 text-xs mt-1">
              {wallet.growth}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletAccounts;
