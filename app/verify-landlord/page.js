// app/verify-landlord/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { submitVerificationRequest } from "@/lib/verification";
import "@/styles/auth.css";

export default function VerifyLandlordPage() {
  const { user, userRole } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) router.push("/login");
    if (userRole && userRole !== "landlord") router.push("/");
  }, [user, userRole]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await submitVerificationRequest(user.uid, form);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!user || userRole !== "landlord") return null;

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Request Submitted ✅</h1>
            <p>
              Your verification request has been received. We'll review it and
              get back to you shortly. You can start adding listings while you wait.
            </p>
          </div>
          <button
            className="auth-submit"
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify Your Property</h1>
          <p>
            Submit your details so we can verify you as a trusted landlord.
            Verified landlords get a badge on all their listings.
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. 08012345678"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Property Address</label>
            <input
              type="text"
              name="address"
              placeholder="e.g. No. 5 Alakahia Road, Choba"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit for Verification"}
          </button>

          <button
            type="button"
            className="auth-submit"
            style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.1)", color: "#94a3b8", marginTop: "0" }}
            onClick={() => router.push("/")}
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}