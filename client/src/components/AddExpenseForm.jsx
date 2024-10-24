import React, { useState, useEffect } from "react";

const AddExpenseForm = ({ onAddExpense, editingExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({ description: title, amount, category });
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded mb-4">
      <h3 className="text-white text-lg font-semibold mb-2">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h3>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800 text-white p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-800 text-white p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-800 text-white p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
