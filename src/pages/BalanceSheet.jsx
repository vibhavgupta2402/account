// // import { useOutletContext } from "react-router-dom";

// // export default function BalanceSheet() {
// //   const { collapsed } = useOutletContext();
// //   return <div className={`main ${collapsed ? "collapsed" : ""}`}>Balance Sheet Page</div>;
// // }



// import React, { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
// // import "./App.css";

// export default function BalanceSheet() {

//   const { collapsed } = useOutletContext();

//   const [search, setSearch] = useState("");
//   const [period, setPeriod] = useState("Custom");
//   const [fromDate, setFromDate] = useState("2025-04-01");
//   const [toDate, setToDate] = useState("2026-01-22");

//   const initialData = {
//     Assets: [
//       { name: "Accounts Receivable", amount: 241, date: "2025-05-01" },
//       { name: "Cash on Hand", amount: 273, date: "2025-06-01" },
//       { name: "Supplies", amount: 302, date: "2025-07-01" },
//       { name: "Prepaid Expense", amount: 541, date: "2025-08-01" }
//     ],
//     Liabilities: [
//       { name: "Accounts Payable", amount: 412, date: "2025-04-12" },
//       { name: "Accruals", amount: 222, date: "2025-09-20" },
//       { name: "Office Equipment", amount: 210, date: "2025-10-10" }
//     ],
//     Income: [
//       { name: "Interest Income", amount: 241, date: "2025-06-10" },
//       { name: "Sales", amount: 1892, date: "2025-07-15" }
//     ],
//     Expense: [
//       { name: "Cost of Goods Sold", amount: 412, date: "2025-05-15" },
//       { name: "Bank Charges", amount: 333, date: "2025-09-02" },
//       { name: "Consulting", amount: 333, date: "2025-11-02" }
//     ],
//     Equity: [
//       { name: "Common Stock", amount: 241, date: "2025-05-03" },
//       { name: "Owner Draw", amount: 1892, date: "2025-06-19" },
//       { name: "Retained Earnings", amount: 1892, date: "2025-07-22" }
//     ]
//   };

//   useEffect(() => {
//     const today = new Date();
//     if (period === "Today") {
//       const d = today.toISOString().split("T")[0];
//       setFromDate(d);
//       setToDate(d);
//     }
//     if (period === "This Month") {
//       const first = new Date(today.getFullYear(), today.getMonth(), 1)
//         .toISOString().split("T")[0];
//       const last = new Date(today.getFullYear(), today.getMonth() + 1, 0)
//         .toISOString().split("T")[0];
//       setFromDate(first);
//       setToDate(last);
//     }
//   }, [period]);

//   const filterRows = (rows) =>
//     rows.filter((r) =>
//       r.name.toLowerCase().includes(search.toLowerCase()) &&
//       r.date >= fromDate &&
//       r.date <= toDate
//     );

//   const exportCSV = () => {
//     let csv = "Category,Account,Amount\n";
//     Object.entries(initialData).forEach(([cat, rows]) => {
//       filterRows(rows).forEach((r) => {
//         csv += `₹{cat},₹{r.name},₹{r.amount}\n`;
//       });
//     });

//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Balance_Sheet.csv";
//     link.click();
//   };

//   return (
//     <div className={`main ${collapsed ? "collapsed" : ""}`}>
//       <div className="BS-full-layout">
//         <div className="BS-bl_container">

//           {/* HEADER */}
//           <div className="BS-header">
//             <div className="BS-header-left">
//               <h1>Balance Sheet</h1>
              
//             </div>

//             <div className="BS-header-actions">
//               <button className="BS-btn BS-primary" onClick={exportCSV}>
//                 Export
//               </button>
//               <button className="BS-btn BS-secondary" onClick={() => window.print()}>
//                 Print
//               </button>
//             </div>
//           </div>

//           {/* FILTER SECTION */}
//           <div className="BS-filters">
//             <div className="BS-filter-group">
//               <label>Search</label>
//               <input
//                 type="text"
//                 placeholder="Search Account..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             <div className="BS-filter-group">
//               <label>Period</label>
//               <select
//                 value={period}
//                 onChange={(e) => setPeriod(e.target.value)}
//               >
//                 <option>Today</option>
//                 <option>This Month</option>
//                 <option>Custom</option>
//               </select>
//             </div>

//             <div className="BS-filter-group">
//               <label>From</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//             </div>

//             <div className="BS-filter-group">
//               <label>To</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* GRID */}
//           <div className="BS-grid">
//             {Object.entries(initialData).map(([title, rows]) => (
//               <TableCard
//                 key={title}
//                 title={title}
//                 rows={filterRows(rows)}
//               />
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// function TableCard({ title, rows }) {
//   const total = rows.reduce((sum, r) => sum + r.amount, 0);

//   return (
//     <div className="BS-table-card">
//       <div className="BS-table-header">{title}</div>
//       <table>
//         <thead>
//           <tr>
//             <th>Account</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((r, i) => (
//             <tr key={i}>
//               <td>{r.name}</td>
//               <td>₹{r.amount.toLocaleString()}</td>
//             </tr>
//           ))}
//           <tr className="BS-total-row">
//             <td>Total {title}</td>
//             <td>₹{total.toLocaleString()}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Calendar,
  Settings2,
  ChevronDown,
  FileText,
} from "lucide-react";
import "../styles/BalanceSheet.css"; // ✅ NEW CSS FILE

const BalanceSheet = () => {
  const { collapsed } = useOutletContext();

  const [view, setView] = useState("horizontal");
  const [configOpen, setConfigOpen] = useState(false);
  const [type, setType] = useState()

  const [config, setConfig] = useState({
    showPercent: false,
    showVertical: false,
  });
  const [company, setCompany] = useState({
  name: "TaxMate Technology Pvt Ltd",
});

  // 🔥 TEMP DATA (REPLACE WITH API)
  const [data, setData] = useState({
  liabilities: [
    {
      group: "Capital Account",
      total: 10432440,
      items: [
        { name: "Opening Capital", amount: 10052634 },
        { name: "Add Net Profit", amount: 730256 },
        { name: "Less Drawings", amount: 350450, type: "minus" },
      ],
    },
    {
      group: "Secured Loans",
      total: 1872966,
      items: [
        { name: "Aditya Birla Fin.", amount: 433965 },
        { name: "Bajaj Finance", amount: 667573 },
        { name: "Cholamandalam", amount: 557022 },
        { name: "ICICI Bank", amount: 214406 },
      ],
    },
    {
      group: "Unsecured Loans",
      total: 2057062,
      items: [
        { name: "Nahid Saifi", amount: 1092462 },
        { name: "Sazzad Ali", amount: 964600 },
      ],
    },
    {
      group: "Sundry Creditors",
      total: 11229517,
      items: [
        { name: "Outstanding Balances", amount: 0 },
      ],
    },
    {
      group: "Outstanding Balances",
      total: 44936,
      items: [
        { name: "Accounting Charges", amount: 10000 },
        { name: "Audit Fees", amount: 10000 },
        { name: "Mandi Samiti Tax", amount: 24936 },
      ],
    },
  ],

  assets: [
    {
      group: "Fixed Assets",
      total: 813693,
      items: [
        { name: "Bike", amount: 58648 },
        { name: "Fan & Cooler", amount: 15660 },
        { name: "Furniture", amount: 277333 },
        { name: "Machinery", amount: 339239 },
        { name: "Teen Sheet", amount: 48003 },
        { name: "Tools", amount: 73928 },
      ],
    },
    {
      group: "Current Assets",
      total: 2453134,
      items: [
        { name: "Closing Stock", amount: 2362403 },
        { name: "Sundry Debtors", amount: 12451 },
        { name: "BID Security", amount: 50000 },
        { name: "Cash in hand", amount: 44250 },
      ],
    },
    {
      group: "Bank Balances",
      total: 104277,
      items: [
        { name: "HDFC Bank", amount: 104277 },
      ],
    },
    {
      group: "GST Credit Ledgers",
      total: 187417,
      items: [
        { name: "IGST", amount: 140985 },
        { name: "CGST", amount: 22949 },
        { name: "SGST", amount: 23483 },
        { name: "CESS", amount: 0 },
      ],
    },
  ],

  total: 25636922,
});

  // 🔹 GENERATE ROWS (same logic as P&L)
  const generateRows = (groups) => {
  const rows = [];

  groups.forEach((g) => {
    // GROUP ROW
    rows.push({
      type: "group",
      name: g.group,
      amount: g.total,
    });

    // CHILD ROWS
    g.items.forEach((item) => {
      rows.push({
        type: "child",
        name: item.name,
        inner:
          item.type === "minus"
            ? `(${item.amount})`
            : item.amount,
      });
    });
  });

  return rows;
};
  const leftRows = generateRows(data.liabilities);
  const rightRows = generateRows(data.assets);
  const max = Math.max(leftRows.length, rightRows.length);
  while (leftRows.length < max) leftRows.push({});
  while (rightRows.length < max) rightRows.push({});

  const syncRows = (left, right) => {
    const max = Math.max(left.length, right.length);
    const l = [...left];
    const r = [...right];

    while (l.length < max) l.push({});
    while (r.length < max) r.push({});

    return l.map((_, i) => ({ left: l[i], right: r[i] }));
  };
  const renderVerticalGroup = (title, groupData) => {
  if (!groupData) return null;

  return (
    <>
      {/* GROUP */}
      <tr className="group">
        <td>{title}</td>
        <td></td>
        <td className="amount">{groupData.total}</td>
        {config.showPercent && <td></td>}
      </tr>

      {/* CHILDREN */}
      {groupData.items.map((item, i) => (
        <tr key={i} className="child">
          <td>- {item.name}</td>

          <td className="inner">
            {item.type === "minus"
              ? `(${item.amount})`
              : item.amount}
          </td>

          <td></td>
          {config.showPercent && <td></td>}
        </tr>
      ))}
    </>
  );
};
  // const leftRows = data ? generateRows(data.liabilities) : [];
  // const rightRows = data ? generateRows(data.assets) : [];

  const rows = syncRows(leftRows, rightRows);

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="bs-header">
        <div className="bs-top">
          <div className="bs-title">
            <FileText size={24} />
            <span>Balance Sheet Report</span>
          </div>
          <div className="bs-date">
            <Calendar size={16} />
            <input type="date" defaultValue="2024-04-01" />
            <span>to</span>
            <input type="date" defaultValue="2025-03-31" />
          </div>
        </div>

        {/* COMPANY NAME */}
        <div className="bs-company">
          {company.name}
        </div>

        {/* SUB TITLE */}
        <div className="bs-subtitle">
          (01-04-2024 to 31-03-2025)
        </div>
        {/* FILTER */}
      <div className="bs-filter">

          {/* TYPE */}
          <div className="bs-filter-left">
            <label>Type</label>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="both">Both </option>
              <option value="ledger">Ledgers Only</option>
              <option value="group">Groups Only</option>
            </select>
          </div>

          {/* CONFIG */}
          <div className="bs-filter-right">
            <label>Cofiguration</label>
            <div className="bs-config">
              <button onClick={() => setConfigOpen(!configOpen)}>
                <Settings2 size={16} />
                Configuration
                <ChevronDown size={16} />
              </button>
              {configOpen && (
                <div className="bs-config-dropdown">
                  {/* ORDER */}
                  <label>
                    <input
                      type="radio"
                      checked={config.order === "liabilities"}
                      onChange={() =>
                        setConfig({ ...config, order: "liabilities" })
                      }
                    />
                    Liabilities → Assets
                  </label>

                  <label>
                    <input
                      type="radio"
                      checked={config.order === "assets"}
                      onChange={() =>
                        setConfig({ ...config, order: "assets" })
                      }
                    />
                    Assets → Liabilities
                  </label>

                  {/* PERCENT */}
                  <label>
                    <input
                      type="checkbox"
                      checked={config.showPercent}
                      onChange={() =>
                        setConfig({
                          ...config,
                          showPercent: !config.showPercent,
                        })
                      }
                    />
                    Show Percentage
                  </label>

                  {/* VERTICAL */}
                  <label>
                    <input
                      type="checkbox"
                      checked={config.showVertical}
                      onChange={() =>
                        setConfig({
                          ...config,
                          showVertical: !config.showVertical,
                        })
                      }
                    />
                    Show Vertical
                  </label>

                </div>
              )}
            </div>
            </div>
        </div>

      </div>

      

      {/* TOGGLE */}
      <div className="bs-toggle">
        <span className={view === "horizontal" ? "active" : ""}>
          Horizontal
        </span>

        <div
          className={`bs-switch ${view === "vertical" ? "right" : ""}`}
          onClick={() =>
            setView(view === "horizontal" ? "vertical" : "horizontal")
          }
        >
          <div className="bs-thumb"></div>
        </div>

        <span className={view === "vertical" ? "active" : ""}>
          Vertical
        </span>
      </div>

      {/* 🔴 HORIZONTAL */}
      {view === "horizontal" && !config.showVertical && (
        <div className="bs-table-wrapper">
          <table className="bs-table">
            <thead>
              <tr>
                <th>Liabilities</th>
                <th></th>
                <th>Amount</th>
                <th className="divider"></th>
                <th>Assets</th>
                <th></th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {leftRows.map((left, i) => {
                const right = rightRows[i];
                return (
                  <tr key={i}>
                    {/* LEFT */}
                    <td className={left.type}>{left.name || ""}</td>
                    <td className="inner">{left.inner || ""}</td>
                    <td className="amount">
                      {left.type === "group" ? left.amount : ""}
                    </td>
                    <td className="divider"></td>

                    {/* RIGHT */}
                    <td className={right.type}>{right.name || ""}</td>
                    <td className="inner">{right.inner || ""}</td>
                    <td className="amount">
                      {right.type === "group" ? right.amount : ""}
                    </td>

                  </tr>
                );
              })}

              {/* TOTAL */}
              <tr className="total">
                <td>Total</td>
                <td></td>
                <td>{data.total}</td>

                <td className="divider"></td>

                <td>Total</td>
                <td></td>
                <td>{data.total}</td>
              </tr>

            </tbody>
          </table>
        </div>
      )}

      {/* 🔴 VERTICAL */}
      {(view === "vertical" || config.showVertical) && data && (
        <div className="bs-vertical">

          <table className="bs-vertical-table">

            <thead>
              <tr>
                <th>Particulars</th>
                <th></th>
                <th>Amount</th>
                {config.showPercent && <th>%</th>}
              </tr>
            </thead>

            <tbody>

              {/* 🔴 LIABILITIES */}
              <tr className="section">
                <td colSpan={config.showPercent ? 4 : 3}>
                  LIABILITIES
                </td>
              </tr>

              {data.liabilities.map((g, i) => (
                <React.Fragment key={i}>
                  {renderVerticalGroup(g.group, g)}
                </React.Fragment>
              ))}

              {/* 🔴 TOTAL (LIABILITIES) */}
              <tr className="subtotal">
                <td>Total</td>
                <td></td>
                <td className="amount">{data.total}</td>
                {config.showPercent && <td></td>}
              </tr>

              {/* 🔴 ASSETS */}
              <tr className="section">
                <td colSpan={config.showPercent ? 4 : 3}>
                  ASSETS
                </td>
              </tr>

              {data.assets.map((g, i) => (
                <React.Fragment key={i}>
                  {renderVerticalGroup(g.group, g)}
                </React.Fragment>
              ))}

              {/* 🔴 FINAL TOTAL */}
              <tr className="total">
                <td>Total</td>
                <td></td>
                <td className="amount">{data.total}</td>
                {config.showPercent && <td></td>}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default BalanceSheet;