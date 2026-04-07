import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const addExpense = async () => {
    const userId = localStorage.getItem("user_id");

    const data = {
      amount: parseFloat(amount),
      description: description,
      user_id: Number(userId),
    };

    console.log("Sending data:", data); // DEBUG

    await axios.post("http://127.0.0.1:8000/expense", data);

    navigate("/dashboard");
  };

  return (
    <div className="p-6">
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={addExpense}
      >
        Add Expense
      </button>
    </div>
  );
}