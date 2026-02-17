import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchBanks = async () => {
  if (!user?.id) return;

  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/banks/user/${user.id}`
    );
    setBanks(data);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch banks");
  } finally {
    setLoading(false);
  }
};

const addBank = async (bank) => {
  console.log("addBank triggered", bank);
  console.log("Current user:", user);

  if (!user?.id) {
    console.log("User missing");
    return;
  }

  try {
    console.log("Sending request...");
    await axiosInstance.post("/banks/add", {
      userId: user.id,   // ✅ FIXED
      name: bank.name,
      accountNumber: bank.accountNumber,
      ifsc: bank.ifsc,
    });

    console.log("Bank added successfully");
    fetchBanks();
  } catch (err) {
    console.error("AddBank Error:", err.response?.data || err.message);
  }
};

useEffect(() => {
  console.log("User changed:", user);
  fetchBanks();
}, [user]);


  const deleteBank = async (bankId) => {
    try {
      await axiosInstance.delete(`/banks/${bankId}`);
      fetchBanks();
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, [user]);

  return (
    <BankContext.Provider
      value={{ banks, loading, error, addBank, deleteBank }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
