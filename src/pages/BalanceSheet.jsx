// import { useOutletContext } from "react-router-dom";

// export default function BalanceSheet() {
//   const { collapsed } = useOutletContext();
//   return <div className={`main ${collapsed ? "collapsed" : ""}`}>Balance Sheet Page</div>;
// }



import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
// import "./App.css";

export default function BalanceSheet() {

  const { collapsed } = useOutletContext();

  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Custom");
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-01-22");

  const initialData = {
    Assets: [
      { name: "Accounts Receivable", amount: 241, date: "2025-05-01" },
      { name: "Cash on Hand", amount: 273, date: "2025-06-01" },
      { name: "Supplies", amount: 302, date: "2025-07-01" },
      { name: "Prepaid Expense", amount: 541, date: "2025-08-01" }
    ],
    Liabilities: [
      { name: "Accounts Payable", amount: 412, date: "2025-04-12" },
      { name: "Accruals", amount: 222, date: "2025-09-20" },
      { name: "Office Equipment", amount: 210, date: "2025-10-10" }
    ],
    Income: [
      { name: "Interest Income", amount: 241, date: "2025-06-10" },
      { name: "Sales", amount: 1892, date: "2025-07-15" }
    ],
    Expense: [
      { name: "Cost of Goods Sold", amount: 412, date: "2025-05-15" },
      { name: "Bank Charges", amount: 333, date: "2025-09-02" },
      { name: "Consulting", amount: 333, date: "2025-11-02" }
    ],
    Equity: [
      { name: "Common Stock", amount: 241, date: "2025-05-03" },
      { name: "Owner Draw", amount: 1892, date: "2025-06-19" },
      { name: "Retained Earnings", amount: 1892, date: "2025-07-22" }
    ]
  };

  useEffect(() => {
    const today = new Date();
    if (period === "Today") {
      const d = today.toISOString().split("T")[0];
      setFromDate(d);
      setToDate(d);
    }
    if (period === "This Month") {
      const first = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split("T")[0];
      const last = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString().split("T")[0];
      setFromDate(first);
      setToDate(last);
    }
  }, [period]);

  const filterRows = (rows) =>
    rows.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      r.date >= fromDate &&
      r.date <= toDate
    );

  const exportCSV = () => {
    let csv = "Category,Account,Amount\n";
    Object.entries(initialData).forEach(([cat, rows]) => {
      filterRows(rows).forEach((r) => {
        csv += `₹{cat},₹{r.name},₹{r.amount}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Balance_Sheet.csv";
    link.click();
  };

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="BS-full-layout">
        <div className="BS-bl_container">

          {/* HEADER */}
          <div className="BS-header">
            <div className="BS-header-left">
              <h1>Balance Sheet</h1>
              
            </div>

            <div className="BS-header-actions">
              <button className="BS-btn BS-primary" onClick={exportCSV}>
                Export
              </button>
              <button className="BS-btn BS-secondary" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>

          {/* FILTER SECTION */}
          <div className="BS-filters">
            <div className="BS-filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search Account..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="BS-filter-group">
              <label>Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>Today</option>
                <option>This Month</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="BS-filter-group">
              <label>From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="BS-filter-group">
              <label>To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* GRID */}
          <div className="BS-grid">
            {Object.entries(initialData).map(([title, rows]) => (
              <TableCard
                key={title}
                title={title}
                rows={filterRows(rows)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function TableCard({ title, rows }) {
  const total = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="BS-table-card">
      <div className="BS-table-header">{title}</div>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>₹{r.amount.toLocaleString()}</td>
            </tr>
          ))}
          <tr className="BS-total-row">
            <td>Total {title}</td>
            <td>₹{total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}