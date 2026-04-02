import { useOutletContext } from "react-router-dom";
import React, { useState, useMemo } from "react";

const ledgerData = [
  { name: "Cash", category: "Assets", debit: 250000, credit: 0 },
  { name: "Bank", category: "Assets", debit: 420000, credit: 0 },
  { name: "Accounts Receivable", category: "Assets", debit: 180000, credit: 0 },
  { name: "Sales", category: "Income", debit: 0, credit: 610000 },
  { name: "Accounts Payable", category: "Liabilities", debit: 0, credit: 140000 },
  { name: "Office Expenses", category: "Expenses", debit: 120000, credit: 0 },
  { name: "Rent Expense", category: "Expenses", debit: 90000, credit: 0 }
];

export default function TrialBalance() {

  const [ledgerFilter, setLedgerFilter] = useState("All Ledgers");
  const [viewMode, setViewMode] = useState("Summary View");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData = useMemo(() => {
    return ledgerData.filter(l =>
      ledgerFilter === "All Ledgers" ? true : l.category === ledgerFilter
    );
  }, [ledgerFilter]);

  const totals = useMemo(() => {
    const debit = filteredData.reduce((a, b) => a + b.debit, 0);
    const credit = filteredData.reduce((a, b) => a + b.credit, 0);
    return { debit, credit, diff: debit - credit };
  }, [filteredData]);

  const exportCSV = () => {
    const rows = [
      ["Ledger Name", "Debit", "Credit"],
      ...filteredData.map(l => [l.name, l.debit, l.credit])
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "trial_balance.csv");
    document.body.appendChild(link);
    link.click();
  };
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>

    <div className="tb-container">
      <div className="tb-header">
        <h1>Trial Balance</h1>
      </div>

      {/* FILTER BAR */}
      <div className="tb-filters">

        <div className="filter-group">
          <label>From</label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>To</label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>Ledger</label>
          <select value={ledgerFilter} onChange={e => setLedgerFilter(e.target.value)}>
            <option>All Ledgers</option>
            <option>Assets</option>
            <option>Liabilities</option>
            <option>Income</option>
            <option>Expenses</option>
          </select>
        </div>

        <div className="filter-group">
          <label>View</label>
          <select value={viewMode} onChange={e => setViewMode(e.target.value)}>
            <option>Summary View</option>
            <option>Detailed View</option>
          </select>
        </div>

        <div className="tb-actions">
          <button className="export-btn" onClick={exportCSV}>Export</button>
          <button className="print-btn" onClick={() => window.print()}>Print</button>
        </div>

      </div>

      {/* CARD */}
      <div className="tb-card" id="printArea">

        <table>
          <thead>
            <tr>
              <th>Ledger Name</th>
              <th>Debit (₹)</th>
              <th>Credit (₹)</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((l, i) => (
              <tr key={i}>
                <td>
                  {l.name}
                  {viewMode === "Detailed View" && (
                    <div className="detail-tag">{l.category}</div>
                  )}
                </td>
                <td className="debit">
                  {l.debit ? l.debit.toLocaleString() : "—"}
                </td>
                <td className="credit">
                  {l.credit ? l.credit.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td>Total</td>
              <td>{totals.debit.toLocaleString()}</td>
              <td>{totals.credit.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        <div className="tb-status">
          <span className="badge">
            {totals.diff === 0 ? "Trial Balance Tallies ✅" : "Not Matching ❌"}
          </span>
          <span>Difference: ₹ {totals.diff.toLocaleString()}</span>
        </div>

      </div>
    </div>

  </div>;
}
