import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/TrialBalance.css";

const TrialBalance = () => {
  const { collapsed } = useOutletContext();

  const [mode, setMode] = useState("month");
  const [quarter, setQuarter] = useState("");
  const [viewType, setViewType] = useState("both");
  const [showOpening, setShowOpening] = useState(false);

  // DATA (unchanged)
  const data = [
    {
      group: "Capital Account",
      children: [
        { name: "Capital Mr. Ram", dr: 0, cr: 50000 },
        { name: "Capital Mr. Shyam", dr: 0, cr: 40000 },
        { name: "Salary Mr. Ram", dr: 10000, cr: 0 },
        { name: "Salary Mr. Shyam", dr: 10000, cr: 0 },
      ],
    },
    
    {
      group: "Loan Liabilities",
      children: [
        
      
      ],
    },
    {
      group: "Unsecured loan",
      children: [
       { name: "M/S ABC", dr: 0, cr: 10000 },
      ],
    },
    {
      group: "Secured loan",
      children: [
         { name: "HDFC Bank", dr: 0, cr: 25000 },
        { name: "XYZ Finance", dr: 0, cr: 15000 },
      ],
    },
    {
      group: "Sundry creditor",
      children: [
         { name: "m/s Bismi Enterprises", dr: 0, cr: 25000 },
        { name: "m/s kumar Trading Co.", dr: 0, cr: 15000 },
      ],
    },
    {
      group: "Outstanding Expenses",
      children: [
         { name: "Audit fee Payable", dr: 0, cr: 25000 },
        { name: "Rent Payable", dr: 0, cr: 15000 },
      ],
    },
    {
      group: "Fixed Assets",
      children: [
        { name: "Building", dr: 100000, cr: 0 },
        { name: "Furniture", dr: 20000, cr: 0 },
        { name: "Computer", dr: 15000, cr: 0 },
      ],
    },
    {
      group: "Current Assets",
      children: [
        { name: "Stock", dr: 30000, cr: 0 },
        { name: "Cash", dr: 5000, cr: 0 },
        { name: "Bank", dr: 12000, cr: 0 },
      ],
    },

    {
      group: "Sundry Creditors",
      children: [
        { name: "MIS", dr: 0, cr: 5000 },
        { name: "Ms_", dr: 0, cr: 3000 },
        { name: "MIS M/S", dr: 0, cr: 4000 },
      ],
    },
    {
      group: "Loans & Advances",
      children: [
        { name: "Deepak (Emp.)", dr: 10000, cr: 0 },
        { name: "Suresh (Emp.)", dr: 8000, cr: 0 },
        { name: "Arman (Loan)", dr: 12000, cr: 0 },
        { name: "M/S Salvia Eutt. (Loan)", dr: 15000, cr: 0 },
      ],
    },
    {
      group: "Suspense Account",
      children: [
        { name: "Suspense A/c", dr: 0, cr: 2000 },
      ],
    },
    {
      group: "Sales Account",
      children: [
        { name: "Sales @ Y%", dr: 0, cr: 25000 },
        { name: "Sales @ 10%", dr: 0, cr: 30000 },
      ],
    },
    {
      group: "Purchase Account",
      children: [
        { name: "Purchase @ 5%", dr: 20000, cr: 0 },
        { name: "Purchase @ 10%", dr: 15000, cr: 0 },
      ],
    },
    {
      group: "Direct Expenses",
      children: [
        { name: "Freight Charges", dr: 3000, cr: 0 },
        { name: "Electricity Charges", dr: 5000, cr: 0 },
        { name: "Wages", dr: 8000, cr: 0 },
      ],
    },
    {
      group: "Direct Income",
      children: [
        { name: "Commission on Pauline", dr: 0, cr: 7000 },
      ],
    },
    {
      group: "Indirect Expenses",
      children: [
        { name: "Accounting Charges", dr: 2000, cr: 0 },
        { name: "Audit Fees", dr: 4000, cr: 0 },
        { name: "Advertisement", dr: 3000, cr: 0 },
        { name: "Electricity Bill", dr: 2500, cr: 0 },
        { name: "Telephone Bill", dr: 1500, cr: 0 },
        { name: "Salary to Staff", dr: 10000, cr: 0 },
      ],
    },
    {
      group: "Indirect Income",
      children: [
        { name: "Rent Received", dr: 0, cr: 8000 },
        { name: "Freight on Sales", dr: 0, cr: 2000 },
        { name: "Commission Received", dr: 0, cr: 3000 },
      ],
    },

    {
      group: "Direct Expenses",
      children: [
        { name: "Freight Charges", dr: 2000, cr: 0 },
        { name: "Wages", dr: 8000, cr: 0 },
      ],
    },
  ];

  // ROWS (unchanged logic)
  const rows = useMemo(() => {
    let result = [];

    data.forEach((group) => {
      const groupDr = group.children.reduce((a, b) => a + b.dr, 0);
      const groupCr = group.children.reduce((a, b) => a + b.cr, 0);

      if (viewType === "group") {
        result.push({ name: group.group, dr: groupDr, cr: groupCr, isGroup: true });
      } else if (viewType === "ledger") {
        group.children.forEach((l) => result.push({ ...l, isGroup: false }));
      } else {
        result.push({ name: group.group, dr: groupDr, cr: groupCr, isGroup: true });
        group.children.forEach((l) => result.push({ ...l, isGroup: false }));
      }
    });

    return result;
  }, [viewType]);

  // TOTALS (unchanged)
  const totalDr = data.flatMap((g) => g.children).reduce((s, r) => s + r.dr, 0);
  const totalCr = data.flatMap((g) => g.children).reduce((s, r) => s + r.cr, 0);
  const isMatched = totalDr === totalCr;

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="tb-header">
        <h2>Trial Balance</h2>
        <p>Compare Debit and Credit balances</p>
      </div>

      {/* 🔥 FIXED FILTER CARD */}
      <div className="tb-filter-card">

        {/* 🔥 ROW 1 */}
        <div className="tb-top-row">

          {/* LEFT SIDE (toggle + input column) */}
          <div className="tb-left-block">

            {/* TOGGLE */}
            <div className="tb-switch-row">
              <span className={mode === "month" ? "active" : ""}>Monthly</span>

              <div
                className={`tb-switch ${mode === "quarter" ? "right" : ""}`}
                onClick={() =>
                  setMode((prev) => (prev === "month" ? "quarter" : "month"))
                }
              >
                <div className="tb-thumb"></div>
              </div>

              <span className={mode === "quarter" ? "active" : ""}>Quarterly</span>
            </div>

            {/* 🔥 INPUT JUST BELOW TOGGLE */}
            <div className="tb-bottom-row">
              {mode === "month" ? (
                <input type="month" className="tb-input" />
              ) : (
                <select
                  className="tb-input"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                >
                  <option value="">Select Quarter</option>
                  <option value="Q1">Apr - Jun</option>
                  <option value="Q2">Jul - Sep</option>
                  <option value="Q3">Oct - Dec</option>
                  <option value="Q4">Jan - Mar</option>
                </select>
              )}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="tb-right-block">

            <div className="tb-field-inline">
              <label>Type</label>
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <option value="both">Both (Default)</option>
                <option value="group">Group Wise</option>
                <option value="ledger">Ledger Wise</option>
              </select>
            </div>

            <label className="tb-checkbox">
              <input
                type="checkbox"
                checked={showOpening}
                onChange={() => setShowOpening(!showOpening)}
              />
              <span>Show Opening Balance</span>
            </label>

          </div>

        </div>

      </div>
      {/* TABLE */}
      <div className="tb-table">
        <table>
          <thead>
            <tr>
              <th>Particulars</th>

              {showOpening && (
                <>
                  <th>Opening Dr</th>
                  <th>Opening Cr</th>
                </>
              )}

              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.isGroup ? "group" : "ledger"}>
                <td style={{ paddingLeft: r.isGroup ? "10px" : "30px" }}>
                  {r.isGroup ? <b>{r.name}</b> : r.name}
                </td>

                {showOpening && (
                  <>
                    <td>0</td>
                    <td>0</td>
                  </>
                )}

                <td>{r.dr ? r.dr.toLocaleString() : ""}</td>
                <td>{r.cr ? r.cr.toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td><b>Total</b></td>

              {showOpening && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}

              <td><b>{totalDr.toLocaleString()}</b></td>
              <td><b>{totalCr.toLocaleString()}</b></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* STATUS */}
      <div className={`tb-status ${isMatched ? "match" : "not-match"}`}>
        {isMatched
          ? "✔ Trial Balance Matched"
          : "✖ Trial Balance Not Matching"}
      </div>

    </div>
  );
};

export default TrialBalance;