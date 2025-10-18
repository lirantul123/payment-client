import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./App.css";

const stripePromise = loadStripe("pk_test_1234567890"); // Replace with your Stripe publishable key

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("USD");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("Processing your payment...");

    try {
      const res = await fetch(
        "http://localhost:5000/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency,
            name,
            email,
            invoiceRequested,
          }),
        }
      );

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name, email },
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("✅ Payment successful!");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>💳 Secure Payment Portal</h1>
        <form onSubmit={handleSubmit}>
          {/* Payer details */}
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Amount + currency */}
          <label htmlFor="amount">Amount</label>
          <div className="amount-row">
            <input
              id="amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Invoice request */}
          <div className="invoice-section">
            <label>
              <input
                type="checkbox"
                checked={invoiceRequested}
                onChange={(e) => setInvoiceRequested(e.target.checked)}
              />
              Request Invoice
            </label>

            {invoiceRequested && (
              <p className="invoice-note">
                Invoice will be issued to <strong>{name || "your name"}</strong>{" "}
                and sent to <strong>{email || "your email"}</strong>.
              </p>
            )}
          </div>

          {/* Card element with proper label */}
          <div className="card-details">
            <label className="card-label">Card Details</label>
            <div className="card-input-wrapper">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#fff",
                      "::placeholder": { color: "#888" },
                    },
                    invalid: { color: "#ff4d4f" },
                  },
                }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
