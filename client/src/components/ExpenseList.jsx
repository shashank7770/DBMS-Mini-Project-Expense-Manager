import React from "react";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="expense-item bg-gray-800 text-white p-4 my-2 flex flex-col items-start"
        >
          <h3 className="text-lg font-semibold">{expense.description}</h3>
          <p>{expense.amount}</p>
          <p className=" bg-gray-700 rounded-lg p-1 mb-2">{expense.category}</p>
          <div className="flex justify-between">
            <button
              onClick={() => onEditExpense(expense)}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteExpense(expense._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
