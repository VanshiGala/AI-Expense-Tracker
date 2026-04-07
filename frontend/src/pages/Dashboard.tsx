import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/expenses/${userId}`)
      .then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className="p-6">
      <button
        className="bg-green-500 text-white px-4 py-2 mb-4"
        onClick={() => navigate("/add")}
      >
        Add Expense
      </button>

      {expenses.map((exp) => (
        <div key={exp.id} className="border p-3 mb-2 rounded">
          <p>{exp.description}</p>
          <p>₹ {exp.amount}</p>
          <p className="text-sm text-gray-500">{exp.category}</p>
        </div>
      ))}
    </div>
  );
}