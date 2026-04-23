import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Lock, CheckCircle, ArrowLeft } from "lucide-react";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  const orderSummary = {
    event: "Annual Altar Servers Retreat",
    date: "May 15, 2024",
    price: 5000,
    fee: 250,
    total: 5250
  };

  if (completed) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200 text-center">
        <div className="space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
            <p className="mt-2 text-slate-600">Your ticket has been confirmed. Check your email for details.</p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Payment Form */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 "))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/"))}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    maxLength="3"
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay ₦{orderSummary.total.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Event</span>
                <span className="font-medium text-slate-900">{orderSummary.event}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Date</span>
                <span className="font-medium text-slate-900">{orderSummary.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Ticket Price</span>
                <span className="font-medium text-slate-900">₦{orderSummary.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Processing Fee</span>
                <span className="font-medium text-slate-900">₦{orderSummary.fee.toLocaleString()}</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-emerald-600">₦{orderSummary.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4" />
              <span className="font-medium">Secure Payment</span>
            </div>
            <p>Your payment information is encrypted and secure. We accept all major credit cards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;