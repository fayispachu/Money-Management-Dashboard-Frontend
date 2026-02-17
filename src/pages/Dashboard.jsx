import React from "react";
import TotalBalance from "../components/TotalBalance";
import OverallWalletChart from "../components/OverallWalletChart";
import TransactionHistory from "../components/TransactionHistory";
import BankAccounts from "../components/BankAccounts";
import WalletAccounts from "../components/WalletAccounts";
import Header from "../components/Header";

function Dashboard() {
  return (<>
        <Header/>

    <div className="min-h-screen pt-20  bg-neutral-950 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TotalBalance />
        <OverallWalletChart />
            <div className="flex flex-col"><BankAccounts />
                  <WalletAccounts/></div>

        <TransactionHistory />
    
      </div>
    </div>
  </>);
}

export default Dashboard;
