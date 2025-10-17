import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");

  // Automatically format card number (####-####-####-####)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1-").trim();
    setCardNumber(formatted.endsWith("-") ? formatted.slice(0, -1) : formatted);
  };

  // Automatically format expiry date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Processing your payment...");

    try {
      const res = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber, expiry, cvc, amount, currency }),
      });
      const data = await res.json();
      setMessage(data.message || "Payment successful!");
    } catch (error) {
      console.error(error);
      setMessage("Error processing payment.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>💳 Mastercard Secure Payment</h1>
        <form onSubmit={handleSubmit} autoComplete="on">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            name="cc-number"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234-5678-9012-3456"
            required
          />

          <div className="row">
            <div className="col">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                id="expiry"
                type="text"
                name="cc-exp"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="cvc">CVC</label>
              <input
                id="cvc"
                type="password"
                name="cc-csc"
                autoComplete="cc-csc"
                maxLength={3}
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
          </div>

          <label htmlFor="amount">Amount</label>
          <div className="amount-row">
            <input
              id="amount"
              type="number"
              name="transaction-amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ILS">ILS</option>
            </select>
          </div>

          <button type="submit">Pay Now</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default App;
