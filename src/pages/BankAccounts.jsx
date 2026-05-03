import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import "../styles/CashBankBook.css";

const CashBankBook = () => {
  const { collapsed } = useOutletContext();
  const [bookType, setBookType] = useState("both");
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-03-31");
  const [reconciliation, setReconciliation] = useState(false);
  const [reconDate, setReconDate] = useState("");

  const [data, setData] = useState([]);

  // 🔥 DUMMY DATA
  useEffect(() => {
    setData([
      {
        date: "01-04-25",
        particulars: "Opening Balance",
        type: "",
        voucherNo: "",
        ref: "",
        dr: 20000,
        cr: 0,
      },
      {
        date: "01-04-25",
        particulars: "Purchase GST",
        type: "Purchase",
        voucherNo: "PUR-01",
        ref: "LAVI-25",
        dr: 0,
        cr: 50620,
      },
      {
        date: "01-04-25",
        particulars: "Sales GST",
        type: "Sales",
        voucherNo: "SAL-01",
        ref: "TX/01",
        dr: 190200,
        cr: 0,
      },
      {
        date: "02-04-25",
        particulars: "Salary Paid",
        type: "Payment",
        voucherNo: "PAY-01",
        ref: "",
        dr: 0,
        cr: 25000,
      },
    ]);
  }, []);
    const [configOpen, setConfigOpen] = useState()
    const [config, setConfig] = useState({
    mode: "day", // day | month | quarter
    details: false,
    stripe: false,
    lineShow: false,
    narration: false,
    itemDetails: false,
  });
  const [summary, setSummary] = useState({
  cash: {
    name: "Cash-in-Hand",
    items: [
      { name: "Cash", dr: 130100, cr: 0 }
    ]
  },
  bank: {
    name: "Bank Accounts",
    items: [
      { name: "HDFC Bank", dr: 320510, cr: 0 },
      { name: "YES Bank", dr: 125300, cr: 0 }
    ]
  }
});
const getTotal = (items, key) =>
  items.reduce((sum, i) => sum + (i[key] || 0), 0);

  // 🔥 RUNNING BALANCE LOGIC
  let runningBalance = 0;

  const processedData = data.map((row) => {
    runningBalance = runningBalance + (row.dr || 0) - (row.cr || 0);

    return {
      ...row,
      balance: runningBalance,
    };
  });
  const groupByDate = (data) => {
  const grouped = {};

  data.forEach((row) => {
    if (!grouped[row.date]) grouped[row.date] = [];
    grouped[row.date].push(row);
  });

  return grouped;
};

const groupedData = groupByDate(data);
const processDayWise = () => {
  let runningBalance = 0;

  const result = [];

  Object.keys(groupedData).forEach((date) => {
    const rows = groupedData[date];

    // 🔹 Opening
    result.push({
      type: "opening",
      date,
      particulars: "Opening Balance",
      dr: runningBalance > 0 ? runningBalance : 0,
      cr: runningBalance < 0 ? Math.abs(runningBalance) : 0,
    });

    let dayDr = 0;
    let dayCr = 0;

    // 🔹 Entries
    rows.forEach((r) => {
      runningBalance = runningBalance + (r.dr || 0) - (r.cr || 0);

      dayDr += r.dr || 0;
      dayCr += r.cr || 0;

      result.push({
        ...r,
        type: "entry",
        balance: runningBalance,
      });
    });

    // 🔹 Total
    result.push({
      type: "total",
      particulars: "Total",
      dr: dayDr,
      cr: dayCr,
    });

    // 🔹 Closing
    result.push({
      type: "closing",
      particulars: "Closing Balance",
      dr: runningBalance > 0 ? runningBalance : 0,
      cr: runningBalance < 0 ? Math.abs(runningBalance) : 0,
    });
  });

  return result;
};

const finalRows = processDayWise();

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="cb-container">

        {/* HEADER */}
        <h2>Cash / Bank Book</h2>

        {/* FILTER */}
        <div className="cb-filter">

          {/* BOOK */}
          <div className="cb-field">
            <label>Type</label>
            <select value={bookType} onChange={(e) => setBookType(e.target.value)}>
              <option value="both">Both</option>
              <option value="cash">Cash Book</option>
              <option value="bank">Bank Book</option>
            </select>
          </div>

          {/* DATE */}
          <div className="cb-field">
            <label>Date Period</label>
            <div className="cb-date">
              <Calendar size={16} />
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <span>to</span>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>
          <div className="cb-config">
            <button onClick={() => setConfigOpen(!configOpen)}>
              ⚙ Configuration
            </button>

            {configOpen && (
              <div className="cb-config-dropdown">

                {/* 🔹 MODE (RADIO) */}
                <p className="cfg-title">Balance Type</p>

                <label>
                  <input
                    type="radio"
                    checked={config.mode === "day"}
                    onChange={() => setConfig({ ...config, mode: "day" })}
                  />
                  Day Wise Balance
                </label>

                <label>
                  <input
                    type="radio"
                    checked={config.mode === "month"}
                    onChange={() => setConfig({ ...config, mode: "month" })}
                  />
                  Month Wise Balance
                </label>

                <label>
                  <input
                    type="radio"
                    checked={config.mode === "quarter"}
                    onChange={() => setConfig({ ...config, mode: "quarter" })}
                  />
                  Quarter Wise Balance
                </label>

                <hr />

                {/* 🔹 OPTIONS */}
                <p className="cfg-title">View Options</p>

                <label>
                  <input
                    type="checkbox"
                    checked={config.details}
                    onChange={() =>
                      setConfig({ ...config, details: !config.details })
                    }
                  />
                  Details Wise
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.stripe}
                    onChange={() =>
                      setConfig({ ...config, stripe: !config.stripe })
                    }
                  />
                  Stripe View
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.lineShow}
                    onChange={() =>
                      setConfig({ ...config, lineShow: !config.lineShow })
                    }
                  />
                  Line Show
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.narration}
                    onChange={() =>
                      setConfig({ ...config, narration: !config.narration })
                    }
                  />
                  Show Narration
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.itemDetails}
                    onChange={() =>
                      setConfig({ ...config, itemDetails: !config.itemDetails })
                    }
                  />
                  Show Item Details
                </label>

              </div>
            )}
          </div>
          {/* RECONCILIATION */}
          <div className="cb-field">
            <label>Bank Reconciliation</label>

            <div className="cb-radio">
              <label>
                <input
                  type="radio"
                  checked={reconciliation === true}
                  onChange={() => setReconciliation(true)}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  checked={reconciliation === false}
                  onChange={() => setReconciliation(false)}
                />
                No
              </label>
            </div>

            {/* DATE INPUT */}
            {reconciliation && (
              <input
                type="date"
                value={reconDate}
                onChange={(e) => setReconDate(e.target.value)}
                className="cb-recon-date"
              />
            )}
          </div>
        </div>
        <div className="cb-balance">

          {/* TITLE */}
          <div className="cb-balance-header">
            <h3>Cash / Bank Balance</h3>
            <span>({fromDate} to {toDate})</span>
          </div>

          {/* TABLE */}
          <table className="cb-balance-table">

            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount Dr.</th>
                <th>Amount Cr.</th>
              </tr>
            </thead>

            <tbody>
              {/* CASH */}
              <tr className="group">
                <td>{summary.cash.name}</td>
                <td className="amount">{getTotal(summary.cash.items, "dr")}</td>
                <td className="amount">{getTotal(summary.cash.items, "cr")}</td>
              </tr>

              {summary.cash.items.map((item, i) => (
                <tr key={i} className="child">
                  <td>- {item.name}</td>
                  <td className="amount">{item.dr || ""}</td>
                  <td className="amount">{item.cr || ""}</td>
                </tr>
              ))}

              {/* BANK */}
              <tr className="group">
                <td>{summary.bank.name}</td>
                <td className="amount">{getTotal(summary.bank.items, "dr")}</td>
                <td className="amount">{getTotal(summary.bank.items, "cr")}</td>
              </tr>

              {summary.bank.items.map((item, i) => (
                <tr key={i} className="child">
                  <td>- {item.name}</td>
                  <td className="amount">{item.dr || ""}</td>
                  <td className="amount">{item.cr || ""}</td>
                </tr>
              ))}

            </tbody>

          </table>

          {/* ACTION BUTTONS */}
          <div className="cb-balance-actions">
            <button className="cb-btn">🖨 Print</button>
            <button className="cb-btn">📄 PDF</button>
          </div>

        </div>

        {/* TABLE */}
        <div className="cb-table-wrapper">
          <div className="cb-balance-header">
            <h3>Cash Book</h3>
            <span>({fromDate} to {toDate})</span>
          </div>
          <table className="cb-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Particulars</th>
                <th>Voucher Type</th>
                <th>Voucher No.</th>
                <th>Ref</th>
                <th>Dr</th>
                <th>Cr</th>
                {/* <th>Balance</th> */}
              </tr>
            </thead>

            <tbody>
              {finalRows.map((row, i) => (
                <tr key={i} className={row.type}>

                  <td>{row.date || ""}</td>

                  <td>{row.particulars}</td>

                  <td>{row.type === "entry" ? row.type : ""}</td>
                  <td>{row.voucherNo || ""}</td>
                  <td>{row.ref || ""}</td>

                  <td className="dr">{row.dr || ""}</td>
                  <td className="cr">{row.cr || ""}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default CashBankBook;