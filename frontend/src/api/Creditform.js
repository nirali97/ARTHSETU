import React, { useState } from "react";
import { evaluateCredit } from "../api/creditApi";

function CreditForm() {
  const [formData, setFormData] = useState({
    annualIncome: "",
    savingsBalance: "",
    spendingRatio: "",
    utilityLateCount: "",
    creditHistoryLength: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    const jsonData = {
      annual_income: Number(formData.annualIncome),
      savings_balance: Number(formData.savingsBalance),
      spending_ratio: Number(formData.spendingRatio),
      utility_bill_late_count: Number(formData.utilityLateCount),
      credit_history_length_months: Number(formData.creditHistoryLength)
    };

    console.log("Submitted JSON:");
    console.log(JSON.stringify(jsonData, null, 2));

    try {
      const response = await evaluateCredit(jsonData);
      console.log("Backend Response:", response);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Could not connect to backend or get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef4ff, #f9fbff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#1e293b" }}>
          ArthSetu
        </h1>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "25px" }}>
          Alternative Credit Scoring Form
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Annual Income</label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Savings Balance</label>
            <input
              type="number"
              name="savingsBalance"
              value={formData.savingsBalance}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Spending Ratio</label>
            <input
              type="number"
              step="0.01"
              name="spendingRatio"
              value={formData.spendingRatio}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Utility Bill Late Count</label>
            <input
              type="number"
              name="utilityLateCount"
              value={formData.utilityLateCount}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Credit History Length (Months)</label>
            <input
              type="number"
              name="creditHistoryLength"
              value={formData.creditHistoryLength}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "12px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0"
            }}
          >
            <h3 style={{ marginBottom: "12px", color: "#0f172a" }}>Prediction Result</h3>

            <p><strong>Probability of Default:</strong> {String(result.probability_of_default ?? "N/A")}</p>
            <p><strong>Risk Category:</strong> {String(result.risk_category ?? "N/A")}</p>
            <p><strong>Decision:</strong> {String(result.decision ?? "N/A")}</p>
            <p><strong>Loan Limit:</strong> {String(result.loan_limit ?? "N/A")}</p>

            {result.shap_explanations && (
              <div style={{ marginTop: "15px" }}>
                <strong>SHAP Explanations:</strong>
                <pre
                  style={{
                    background: "#e2e8f0",
                    padding: "10px",
                    borderRadius: "8px",
                    overflowX: "auto",
                    marginTop: "8px"
                  }}
                >
                  {JSON.stringify(result.shap_explanations, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

export default CreditForm;