import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { WalletContext } from "../context/WalletContext";
import Referral from "./Referral";
import Bonus from "./Bonus";
import DepositPopup from "./DepositPopup";
import WithdrawPopup from "./WithdrawPopup";
import CreateWalletPopup from "./CreateWalletPopup";

function TotalBalance() {
  const { wallets, loading, error, deposit, withdrawToBank } =
    useContext(WalletContext);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  const totalBalance = wallets.reduce(
    (sum, w) => sum + (w.balance || 0),
    0
  );

  const handleDeposit = async (walletId, amount) => {
    const result = await deposit(walletId, amount);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Deposit successful");
      setShowDeposit(false);
    }
  };

  const handleWithdrawToBank = async (walletId, amount, bankId) => {
    const result = await withdrawToBank(walletId, bankId, amount);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Withdrawal to bank successful");
      setShowWithdraw(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-neutral-900 rounded-xl p-5 shadow-md">
        <h2 className="text-neutral-500 font-semibold text-lg">
          Total Balance
        </h2>

        <h1 className="text-3xl font-bold text-emerald-400 mt-2">
          ${totalBalance.toLocaleString()}
        </h1>

        <p className="text-neutral-600 text-xs">
          +35.5% from last month
        </p>

        {loading && (
          <p className="text-neutral-400 text-sm mt-1">
            Loading wallets...
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 border rounded-md border-neutral-600 font-medium py-1.5 text-xs transition-all bg-neutral-800 text-neutral-300 hover:bg-white hover:text-black"
            onClick={() => setShowDeposit(true)}
          >
            Deposit
          </button>

          <button
            className="flex-1 border rounded-md border-neutral-600 font-medium py-1.5 text-xs transition-all bg-neutral-800 text-neutral-300 hover:bg-white hover:text-black"
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw to Bank
          </button>

          <button
            className="flex-1 border rounded-md border-neutral-600 font-medium py-1.5 text-xs transition-all bg-neutral-800 text-neutral-300 hover:bg-white hover:text-black"
            onClick={() => setShowCreateWallet(true)}
          >
            Add New Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Referral />
        <Bonus />
      </div>

      {showDeposit && (
        <DepositPopup
          wallets={wallets}
          onClose={() => setShowDeposit(false)}
          onDeposit={handleDeposit}
        />
      )}

      {showWithdraw && (
        <WithdrawPopup
          wallets={wallets}
          onClose={() => setShowWithdraw(false)}
          onWithdrawToBank={handleWithdrawToBank} // updated prop
        />
      )}

      {showCreateWallet && (
        <CreateWalletPopup
          onClose={() => setShowCreateWallet(false)}
        />
      )}
    </div>
  );
}

export default TotalBalance;
