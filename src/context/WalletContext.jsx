import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../api/axios";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch wallets
  useEffect(() => {
    if (!user) return;
    const fetchWallets = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get(`/wallets/user/${user.id}`);
        const walletsWithTxns = data.map(wallet => ({
          ...wallet,
          transactions: wallet.transactions || [],
        }));
        setWallets(walletsWithTxns);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
        setWallets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, [user]);

  // Fetch transactions
  useEffect(() => {
    if (!user) return;
    const fetchTransactions = async () => {
      try {
        const { data } = await axiosInstance.get(`/transactions/user/${user.id}`);
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, [user]);

  // Create wallet
  const createWallet = async (name, currency) => {
    if (!user) return { success: false, message: "User not logged in" };
    try {
      const { data } = await axiosInstance.post("/wallets/create", {
        userId: user.id,
        name,
        currency,
      });
      setWallets(prev => [...prev, { ...data.wallet, transactions: [] }]);
      return { success: true, wallet: data.wallet };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Deposit
  const deposit = async (walletId, amount) => {
    if (!walletId || amount <= 0) return { success: false, message: "Invalid input" };
    try {
      const { data } = await axiosInstance.post("/wallets/deposit", { walletId, amount });

      // Update wallet & transactions
      setWallets(prev =>
        prev.map(w =>
          w._id === walletId
            ? {
                ...w,
                balance: w.balance + amount,
                transactions: [
                  ...(w.transactions || []),
                  {
                    type: "deposit",
                    amount,
                    currency: w.currency,
                    title: `Deposit to ${w.name}`,
                    status: "Success",
                    createdAt: new Date(),
                  },
                ],
              }
            : w
        )
      );

      setTransactions(prev => [
        {
          wallet: { name: wallets.find(w => w._id === walletId)?.name },
          type: "deposit",
          amount,
          currency: wallets.find(w => w._id === walletId)?.currency,
          title: `Deposit to ${wallets.find(w => w._id === walletId)?.name}`,
          status: "Success",
          createdAt: new Date(),
        },
        ...prev,
      ]);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Withdraw
  const withdraw = async (walletId, amount) => {
    const wallet = wallets.find(w => w._id === walletId);
    if (!wallet) return { success: false, message: "Wallet not found" };
    if (amount <= 0) return { success: false, message: "Invalid amount" };
    if (wallet.balance < amount) return { success: false, message: "Insufficient balance" };

    try {
      await axiosInstance.post("/wallets/withdraw", { walletId, amount });

      // Update wallet & transactions
      setWallets(prev =>
        prev.map(w =>
          w._id === walletId
            ? {
                ...w,
                balance: w.balance - amount,
                transactions: [
                  ...(w.transactions || []),
                  {
                    type: "withdraw",
                    amount,
                    currency: w.currency,
                    title: `Withdrawal from ${w.name}`,
                    status: "Success",
                    createdAt: new Date(),
                  },
                ],
              }
            : w
        )
      );

      setTransactions(prev => [
        {
          wallet: { name: wallet.name },
          type: "withdraw",
          amount,
          currency: wallet.currency,
          title: `Withdrawal from ${wallet.name}`,
          status: "Success",
          createdAt: new Date(),
        },
        ...prev,
      ]);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallets,
        transactions,
        loading,
        error,
        createWallet,
        deposit,
        withdraw,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
