import { useState } from "react";

export default function App() {
  const [salary, setSalary] = useState("");
  
  const calculateTax = (income) => {
    if (income <= 1275000) return null;
    
    const taxableIncome = Math.max(0, income - 75000);
    let taxBrackets = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 },
    ];

    let tax = 0;
    let previousLimit = 0;
    let taxDetails = [];

    for (let { limit, rate } of taxBrackets) {
      if (taxableIncome > previousLimit) {
        let amount = Math.min(taxableIncome, limit) - previousLimit;
        let slabTax = amount * rate;
        tax += slabTax;
        if (rate > 0) taxDetails.push({ range: `${previousLimit}-${limit}`, rate, amount, tax: slabTax });
        previousLimit = limit;
      }
    }

    return { totalTax: tax, details: taxDetails };
  };

  const taxData = salary ? calculateTax(Number(salary)) : null;

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Tax Calculator</h2>
      <input
        type="number"
        placeholder="Enter your salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      {taxData === null ? (
        <p>No Tax</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Tax Slab</th>
              <th>Rate</th>
              <th>Taxable Amount</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            {taxData.details.map((row, index) => (
              <tr key={index}>
                <td>{row.range}</td>
                <td>{row.rate * 100}%</td>
                <td>₹{row.amount.toLocaleString()}</td>
                <td>₹{row.tax.toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"><strong>Total Tax</strong></td>
              <td><strong>₹{taxData.totalTax.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
