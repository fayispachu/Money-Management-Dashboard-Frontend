import React, { useContext } from "react";
import { MoreHorizontal } from "lucide-react";
import { WalletContext } from "../context/WalletContext";

function TransactionHistory() {
  const { transactions } = useContext(WalletContext);

  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow-md h-64 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-neutral-400 font-semibold text-base">Transaction History</h2>
        <MoreHorizontal size={16} className="text-neutral-500 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
        {transactions.length === 0 && (
          <p className="text-neutral-500 text-sm text-center mt-4">No transactions yet</p>
        )}
        {transactions.map((txn, index) => (
          <div
            key={index}
            className="flex justify-between items-start bg-neutral-800 px-3 py-2 rounded-md"
          >
            <div>
              <p className="text-neutral-400 text-[11px]">
                {txn.title} ({txn.wallet?.name || "Wallet"})
              </p>
              <h3 className={`text-sm font-semibold mt-0.5 ${txn.status === "Failed" ? "text-red-500" : "text-white"}`}>
                {txn.type === "deposit" ? `+${txn.amount}` : `-${txn.amount}`}
                <span className="text-xs text-neutral-400 ml-1">{txn.currency}</span>
              </h3>
              <p className="text-neutral-500 text-[11px] mt-0.5">
                {new Date(txn.createdAt).toLocaleString()}
              </p>
            </div>
            <span className={`text-[11px] font-medium ${txn.status === "Success" ? "text-emerald-500" : "text-red-500"}`}>
              {txn.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
