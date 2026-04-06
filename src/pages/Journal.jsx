import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Journal.css";

export default function Journal() {
  const { collapsed } = useOutletContext();
  const [invoiceDate, setInvoiceDate] = useState(new Date());

  const [date, setDate] = useState("");
  const [ledger, setLedger] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [voucherNo] = useState("JOU-01");
  const [mode, setMode] = useState("single"); // single | double

  const [rows, setRows] = useState([
  { ledger: "", adjust: "", invoice: "", dr: "", cr: "" }
]);
const total =
  mode === "single"
    ? Number(amount) || 0
    : rows.reduce((sum, r) => sum + (Number(r.dr) || 0), 0);

  return (
    <div className="journal-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="journal-wrapper">

          {/* HEADER */}
          <div className="journal-header">
            <div>
              <h2>Journal</h2>
              <span>Voucher No: {voucherNo}</span>
            </div>

            <div className="journal-date">
              <label>Date:</label>
              <DatePicker
                  selected={invoiceDate}
                  onChange={(date) => setInvoiceDate(date)}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}   // prevent future date
                  className="date-input"
  
                  onChangeRaw={(e) => {
                    let value = e.target.value;
  
                    // 🔥 limit total length (dd/MM/yyyy = 10 chars)
                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }
  
                    const parts = value.split("/");
  
                    // 🔥 restrict year to max 4 digits
                    if (parts[2] && parts[2].length > 4) {
                      parts[2] = parts[2].slice(0, 4);
                      value = parts.join("/");
                    }
  
                    e.target.value = value;
                  }}
                />
            </div>
            <div className="journal-mode">
              <label>Transaction Mode:</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="single">Single Entry</option>
                <option value="double">Double Entry</option>
              </select>
            </div>
          </div>

          {/* LEDGER */}
          {/* <div className="ledger-select">
            <label>Ledger Name:</label>
            <select
              value={ledger}
              onChange={(e) => setLedger(e.target.value)}
            >
              <option>Select Bank / Cash ledger</option>
              <option>Cash</option>
              <option>Bank</option>
            </select>
          </div> */}

          <hr />

          {/* TABLE HEADER */}
          {mode === "single" && (
          <>
            <div className="journal-table-head">
              <span>Ledger Name</span>
              <span className="right">Amount</span>
            </div>

            <div className="journal-row">
              <input placeholder="Ledger Name" />

              <input
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </>
        )}
        {mode === "double" && (
          <>
            <div className="journal-table-head">
              <span>Ledger</span>
              <span>Adjust</span>
              <span>Invoice No</span>
              <span>Dr Amount</span>
              <span>Cr Amount</span>
            </div>

            {rows.map((row, i) => (
              <div key={i} className="journal-row">

                <input
                  className="col-ledger"
                  placeholder="Ledger"
                  onChange={(e) => {
                    const d = [...rows];
                    d[i].ledger = e.target.value;
                    setRows(d);
                  }}
                />

                <select
                  className="col-ledger"
                  value={row.adjust}
                  onChange={(e) => {
                    const d = [...rows];
                    d[i].adjust = e.target.value;
                    setRows(d);
                  }}
                >
                  <option value="">Select</option>
                  <option value="invoice">Invoice</option>
                  <option value="on_account">On Account</option>
                </select>

                {row.adjust === "invoice" ? (
                  <select
                    className="col-invoice"
                    onChange={(e) => {
                      const d = [...rows];
                      d[i].invoice = e.target.value;
                      setRows(d);
                    }}
                  >
                    <option>Select Invoice</option>
                    <option>INV-001</option>
                  </select>
                ) : (
                  <input className="col-invoice" disabled placeholder="N/A" />
                )}

                <input
                   className="col-dr"
                  placeholder="Dr"
                  onChange={(e) => {
                    const d = [...rows];
                    d[i].dr = e.target.value;
                    setRows(d);
                  }}
                />

                <input
                   className="col-dr"
                  placeholder="Cr"
                  onChange={(e) => {
                    const d = [...rows];
                    d[i].cr = e.target.value;
                    setRows(d);
                  }}
                />

              </div>
            ))}
          </>
        )}

          <hr />

          {/* TOTAL */}
          <div className="J-total-section">
            <span>TOTAL</span>
            <input value={total.toFixed(2)} readOnly />
          </div>

          {/* NARRATION */}
          <div className="J-narration">
            <label>Voucher Narration:</label>
            <textarea
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </div>

          {/* ACTIONS */}
          <div className="J-actions">
            <button className="J-save-btn">Save</button>
            <button className="J-cancel-btn">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}