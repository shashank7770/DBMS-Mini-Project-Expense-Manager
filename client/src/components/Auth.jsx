import React, { useState } from "react";

const Auth = ({ onLogin, onRegister }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (!isValidEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        await onRegister({ name, email, password });
      } else {
        await onLogin({ email, password });
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-[60vh]">
      <img
        src="./illustration.png"
        alt=""
        className="h-[100%] aspect-square object-cover"
      />
      <div className="max-w-md mx-auto p-4 border border-white border-[10px] text-white h-[100%]">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        {error && (
          <div className="mb-4 text-red-500 error">
            {" "}
            {/* Error message styling */}
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {isRegister && (
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setError("");
                setName(e.target.value);
              }}
              className="w-full p-2 border-b border-gray-300 bg-transparent"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            className="w-full p-2 border-b border-gray-300 bg-transparent"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-b border-gray-300 bg-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
          <button
            type="button"
            className="text-sm text-blue-500"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "No account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
