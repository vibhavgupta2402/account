import { useOutletContext } from "react-router-dom";
import React, { useState, useMemo } from "react";

export default function CashFlow() {
  const { collapsed } = useOutletContext();

  const [period, setPeriod] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Applied filters state
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({});

  const data = [
    { date: "2026-01-22", party: "Mohan", type: "Purchase", cashIn: 0, cashOut: 290 },
    { date: "2026-01-22", party: "Mohan", type: "Sale", cashIn: 750, cashOut: 0 },
    { date: "2026-01-22", party: "Rafik", type: "Purchase", cashIn: 0, cashOut: 850 }
  ];

  const applyFilters = () => {
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
  };

  const resetFilters = () => {
    setPeriod("");
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
  };

  const applyPeriod = (value) => {
    setPeriod(value);
    const n = new Date();
    let f, t;

    if (value === "today") {
      f = t = n.toISOString().slice(0, 10);
    }
    if (value === "thisMonth") {
      f = new Date(n.getFullYear(), n.getMonth(), 1).toISOString().slice(0, 10);
      t = new Date(n.getFullYear(), n.getMonth() + 1, 0).toISOString().slice(0, 10);
    }
    if (value === "lastMonth") {
      f = new Date(n.getFullYear(), n.getMonth() - 1, 1).toISOString().slice(0, 10);
      t = new Date(n.getFullYear(), n.getMonth(), 0).toISOString().slice(0, 10);
    }
    if (value === "thisYear") {
      f = `${n.getFullYear()}-01-01`;
      t = `${n.getFullYear()}-12-31`;
    }

    setFromDate(f || "");
    setToDate(t || "");
  };

  const filteredData = useMemo(() => {
    return data.filter(row => {

      if (search &&
        !Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()))
        return false;

      if (appliedFrom && row.date < appliedFrom) return false;
      if (appliedTo && row.date > appliedTo) return false;

      for (let key in columnFilters) {
        if (
          columnFilters[key] &&
          !String(row[key]).toLowerCase().includes(columnFilters[key].toLowerCase())
        ) return false;
      }

      return true;
    });
  }, [search, appliedFrom, appliedTo, columnFilters]);

  const totals = useMemo(() => {
    let tin = 0, tout = 0;
    filteredData.forEach(r => {
      tin += Number(r.cashIn);
      tout += Number(r.cashOut);
    });
    return {
      totalIn: tin,
      totalOut: tout,
      closing: tin - tout
    };
  }, [filteredData]);

  const exportCSV = () => {
    let csv = "Date,Party,Type,Cash In,Cash Out\n";
    filteredData.forEach(r => {
      csv += `${r.date},${r.party},${r.type},${r.cashIn},${r.cashOut}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cash_flow_report.csv";
    link.click();
  };


  return <div className={`main ${collapsed ? "collapsed" : ""}`}>

    <div className="CF_Containter">

      <div className="CF-header">
        <h1>Cash Flow Report</h1>
        <div>
          <button className="CF-icon-btn CF-Export_BTN" onClick={exportCSV}>Export</button>
          <button className="CF-icon-btn CF-Print_BTN" onClick={() => window.print()}>Print</button>
        </div>
      </div>

      <div className="CF-wrapper">

        <aside className="CF-controls">
          <h3>Report Controls</h3>

          <label>Period</label>
          <select value={period} onChange={(e) => applyPeriod(e.target.value)}>
            <option value="">Custom</option>
            <option value="today">Today</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
          </select>

          <label>From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

          <label>To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

          <div className="CF-filter-buttons">
            <button className="CF-apply-btn" onClick={applyFilters}>Apply</button>
            <button className="CF-reset-btn" onClick={resetFilters}>Reset</button>
          </div>

        </aside>

        <section className="CF-main-section">

          <div className="CF-table-toolbar">
            <strong>Transactions</strong>
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="CF-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Party</th>
                  <th>Type</th>
                  <th>Cash In</th>
                  <th>Cash Out</th>
                  <th>Running</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="CF-no-data">
                      No Transactions To Show
                    </td>
                  </tr>
                ) : (
                  filteredData.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td>{r.party}</td>
                      <td>{r.type}</td>
                      <td className="CF-green">{r.cashIn || ""}</td>
                      <td className="CF-red">{r.cashOut || ""}</td>
                      <td className={r.cashIn - r.cashOut >= 0 ? "green" : "red"}>
                        {r.cashIn - r.cashOut}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="CF-footer">
            <div className="CF-green">Total In: ₹ {totals.totalIn}</div>
            <div className="CF-red">Total Out: ₹ {totals.totalOut}</div>
            <div>Closing: ₹ {totals.closing}</div>
          </div>

        </section>

      </div>
    </div>

  </div>;
}
