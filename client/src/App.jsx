import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import axios from "axios";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setExpenses(response.data))
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        });
    }
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const userToken = response.data.token;
      setToken(userToken);
      localStorage.setItem("token", userToken);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Invalid login credentials."
      );
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        credentials
      );
      const userToken = response.data.token;
      setToken(userToken);
      localStorage.setItem("token", userToken);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handleAddExpense = (expense) => {
    if (editingExpense) {
      axios
        .put(
          `http://localhost:5000/api/expenses/${editingExpense._id}`,
          expense,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setExpenses(
            expenses.map((exp) =>
              exp._id === editingExpense._id ? response.data : exp
            )
          );
          setEditingExpense(null);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("http://localhost:5000/api/expenses", expense, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setExpenses([...expenses, response.data]))
        .catch((error) => console.log(error));
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = (expenseId) => {
    axios
      .delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="container bg-zinc-900 w-screen h-screen px-[30%]">
      {!token ? (
        <div className=" w-screen h-screen flex justify-center items-center bg-zinc-800 absolute top-0 left-0">
          <Auth onLogin={handleLogin} onRegister={handleRegister} />
        </div>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded mb-4"
          >
            Logout
          </button>
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            editingExpense={editingExpense}
          />
          <ExpenseList
            expenses={expenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </>
      )}
    </div>
  );
};

export default App;
