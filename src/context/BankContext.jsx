import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Banks
  const fetchBanks = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError("");

      const { data } = await axiosInstance.get(
        `/banks/user/${user.id}`
      );

      setBanks(data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch banks";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Add Bank
  const addBank = async (bank) => {
    if (!user?.id) {
      toast.error("User not logged in");
      return { success: false };
    }

    try {
      await axiosInstance.post("/banks/add", {
        userId: user.id,
        name: bank.name,
        accountNumber: bank.accountNumber,
        ifsc: bank.ifsc,
      });

      toast.success("Bank added successfully");
      await fetchBanks();

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to add bank";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Delete Bank
  const deleteBank = async (bankId) => {
    try {
      await axiosInstance.delete(`/banks/${bankId}`);

      toast.success("Bank deleted successfully");
      await fetchBanks();

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Delete failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Fetch when user changes
  useEffect(() => {
    fetchBanks();
  }, [user]);

  return (
    <BankContext.Provider
      value={{
        banks,
        loading,
        error,
        addBank,
        deleteBank,
        fetchBanks,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
