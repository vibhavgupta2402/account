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
  {
    type: "dr",
    ledger: "",
    adjust: "",
    invoice: "",
    amount: ""
  }
]);
  const totalDr = rows.reduce(

  (sum, row) =>

    row.type === "dr"
      ? sum + (Number(row.amount) || 0)
      : sum,

  0

);

const totalCr = rows.reduce(

  (sum, row) =>

    row.type === "cr"
      ? sum + (Number(row.amount) || 0)
      : sum,

  0

);

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
              {/* <div className="journal-mode">
                <label>Transaction Mode:</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="single">Single Entry</option>
                  <option value="double">Double Entry</option>
                </select>
              </div> */}
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
            {/* {mode === "single" && (
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
          )} */}
          {/* {mode === "double" && (
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
          )} */}
          <div className="journal-table-head">
            <span>Type</span>
            <span>Ledger Name</span>
            <span>Adjust To</span>
            <span>Invoice No</span>
            <span>Dr Amount</span>
            <span>Cr Amount</span>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="journal-row">
              {/* TYPE */}
              <select
                className="col-type"
                value={row.type}
                onChange={(e) => {
                  const updated = [...rows];
                  updated[i].type = e.target.value;
                  updated[i].amount = "";
                  setRows(updated);
                }}
              >
                <option value="dr">DR</option>
                <option value="cr">CR</option>
              </select>
              {/* LEDGER */}
              <input
                className="col-ledger"
                placeholder="Ledger Name"
                value={row.ledger}
                onChange={(e) => {
                  const updated = [...rows];
                  updated[i].ledger = e.target.value;
                  setRows(updated);
                }}
              />
              {/* ADJUST */}
              <select
                className="col-adjust"
                value={row.adjust}
                onChange={(e) => {
                  const updated = [...rows];
                  updated[i].adjust = e.target.value;
                  setRows(updated);
                }}
              >
                <option value="">Select</option>
                <option value="invoice">
                  Invoice
                </option>
                <option value="on_account">
                  On Account
                </option>
              </select>
              {/* INVOICE */}

              {row.adjust === "invoice" ? (
                <input
                  className="col-invoice"
                  placeholder="Invoice No"
                  value={row.invoice}
                  onChange={(e) => {
                    const updated = [...rows];
                    updated[i].invoice = e.target.value;
                    setRows(updated);
                  }}
                />
              ) : (
                <input
                  className="col-invoice disabled"
                  placeholder="N/A"
                  disabled
                />
              )}
              {/* DR */}
              <input
                className="col-dr"
                placeholder="0.00"
                disabled={row.type !== "dr"}
                value={row.type === "dr"
                  ? row.amount
                  : ""
                }
                onChange={(e) => {
                  const updated = [...rows];
                  updated[i].amount = e.target.value;
                  setRows(updated);
                  // AUTO ADD NEW ROW
                  if (
                    i === rows.length - 1 &&
                    updated[i].ledger &&
                    updated[i].amount
                  ) {
                    setRows([
                      ...updated,
                      {
                        type: "dr",
                        ledger: "",
                        adjust: "",
                        invoice: "",
                        amount: ""
                      }
                    ]);
                  }
                }}
              />
              {/* CR */}
              <input
                className="col-cr"
                placeholder="0.00"
                disabled={row.type !== "cr"}
                value={row.type === "cr"
                  ? row.amount
                  : ""
                }
                onChange={(e) => {
                  const updated = [...rows];
                  updated[i].amount = e.target.value;
                  setRows(updated);
                  // AUTO ADD NEW ROW
                  if (
                    i === rows.length - 1 &&
                    updated[i].ledger &&
                    updated[i].amount
                  ) {
                    setRows([
                      ...updated,
                      {
                        type: "dr",
                        ledger: "",
                        adjust: "",
                        invoice: "",
                        amount: ""
                      }
                    ]);
                  }
                }}
              />
            </div>
          ))}
            <hr />
            {/* TOTAL */}
            <div className="J-total-wrapper">
              <div className="J-total-box">
                <span>Total DR</span>
                <input
                  value={totalDr.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="J-total-box">
                <span>Total CR</span>
                <input
                  value={totalCr.toFixed(2)}
                  readOnly
                />
              </div>
              {/* <div className="J-total-box diff">
                <span>Difference</span>
                <input
                  value={Math.abs(
                    totalDr - totalCr
                  ).toFixed(2)}
                  readOnly
                />
              </div> */}
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