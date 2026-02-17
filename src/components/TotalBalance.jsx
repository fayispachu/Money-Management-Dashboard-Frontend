import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import Referral from "./Referral";
import Bonus from "./Bonus";
import DepositPopup from "./DepositPopup";
import WithdrawPopup from "./WithdrawPopup";
import BankAccountPopup from "./BankAccountPopup";

function TotalBalance() {
  const { wallets, loading, error, deposit, withdraw } =
    useContext(WalletContext);

  const [activeButton, setActiveButton] = useState(null);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBankPopup, setShowBankPopup] = useState(false);

  const [bankAccounts, setBankAccounts] = useState([]);

  const totalBalance = wallets.reduce((sum, w) => sum + (w.balance || 0), 0);

  const getButtonStyle = name =>
    `flex-1 border rounded-md border-neutral-600 font-medium py-1.5 text-xs transition-all
     ${activeButton === name
       ? "bg-white text-black"
       : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`;

  const handleDeposit = async (walletId, amount) => {
    const result = await deposit(walletId, amount);
    if (!result.success) alert(result.message);
    else setShowDeposit(false);
  };

  const handleWithdraw = async (walletId, amount) => {
    const result = await withdraw(walletId, amount);
    if (!result.success) alert(result.message);
    else setShowWithdraw(false);
  };

  const handleAddBank = bank => {
    setBankAccounts(prev => [...prev, { ...bank, active: true }]);
    alert(`Bank ${bank.name} added successfully!`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-neutral-900 rounded-xl p-5 shadow-md">
        <h2 className="text-neutral-500 font-semibold text-lg">Total Balance</h2>

        <h1 className="text-3xl font-bold text-emerald-400 mt-2">
          ₹{totalBalance.toLocaleString()}
        </h1>

        <p className="text-neutral-600 text-xs">+35.5% from last month</p>

        {loading && <p className="text-neutral-400 text-sm mt-1">Loading wallets...</p>}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="flex gap-2 mt-3">
          <button
            className={getButtonStyle("deposit")}
            onClick={() => setShowDeposit(true)}
          >
            Deposit
          </button>
          <button
            className={getButtonStyle("withdraw")}
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw
          </button>
          <button
            className={getButtonStyle("account")}
            onClick={() => setShowBankPopup(true)}
          >
            Add Bank Account
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
          onWithdraw={handleWithdraw}
        />
      )}
      {showBankPopup && (
        <BankAccountPopup
          onClose={() => setShowBankPopup(false)}
          onAddBank={handleAddBank}
        />
      )}
    </div>
  );
}

export default TotalBalance;
