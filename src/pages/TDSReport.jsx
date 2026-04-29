import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/TDSReport.css";

const TDSReport = () => {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [type, setType] = useState("tds");

  const { collapsed } = useOutletContext();

  const data = [
    {
      section: "194C",
      account: "ABC Pvt Ltd",
      pan: "ABCDE1234F",
      date: "2026-04-10",
      rate: "1%",
      amount: 10000,
      tax: 100,
    },
  ];

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      {/* 🔥 HEADER CARD */}
      <div className="tds-header-card">
        <div className="tds-header-left">
          <div className="tds-icon">📄</div>
          <div>
            <h2>TDS Report</h2>
            <p>Track and manage TDS/TCS deductions</p>
          </div>
        </div>
      </div>

      {/* FILTER CARD */}
      <div className="tds-filter-card">

        {/* LEFT */}
        <div className="tds-left">

          {/* TOGGLE */}
          <div className="tds-switch-row">

            <span className={mode === "month" ? "label active" : "label"}>
              Month
            </span>

            <div
              className={`tds-switch ${mode === "quarter" ? "right" : ""}`}
              onClick={() =>
                setMode((prev) => (prev === "month" ? "quarter" : "month"))
              }
            >
              <div className="tds-switch-thumb"></div>
            </div>

            <span className={mode === "quarter" ? "label active" : "label"}>
              Quarter
            </span>

          </div>

          {/* INPUT */}
          {mode === "month" ? (
            <input
              type="month"
              className="tds-input"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          ) : (
            <select
              className="tds-input"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              <option value="">Select Quarter</option>
              <option value="Q1">Q1 (Apr - Jun)</option>
              <option value="Q2">Q2 (Jul - Sep)</option>
              <option value="Q3">Q3 (Oct - Dec)</option>
              <option value="Q4">Q4 (Jan - Mar)</option>
            </select>
          )}

        </div>

        {/* RIGHT */}
        <div className="tds-right">
          <label>Type</label>
          <select
            className="tds-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="tds">TDS Report</option>
            <option value="tcs">TCS Report</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className="tds-table-card">
        <table>
          <thead>
            <tr>
              <th>TDS Section</th>
              <th>Account</th>
              <th>PAN No.</th>
              <th>Date</th>
              <th>Rate %</th>
              <th>Amount</th>
              <th>Tax</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.section}</td>
                <td>{row.account}</td>
                <td>{row.pan}</td>
                <td>{row.date}</td>
                <td>{row.rate}</td>
                <td>₹ {row.amount}</td>
                <td>₹ {row.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TDSReport;