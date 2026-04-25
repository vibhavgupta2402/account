import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/ReceiptInvoice.css";

export default function Receipt() {
  const { collapsed } = useOutletContext();
  const navigate = useNavigate();
  const [voucherNo] = useState("REC-01");
  const [againstType, setAgainstType] = useState("invoice");
   const [reciptDate, setReciptDate] = useState(new Date());
  const [ledger, setLedger] = useState("");

  const [rows, setRows] = useState([
    { name: "SALVIA GRAFICS PVT LTD", ref: "", against: "", amount: "" },
    { name: "BEST COMPRESSOR MFG VALVE CO", ref: "", against: "", amount: "" },
    { name: "A. K. TRADERS", ref: "", against: "", amount: "" }
  ]);

  const [narration, setNarration] = useState("");

  const total = rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="receipt-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="receipt-wrapper">

          {/* HEADER */}
          <div className="receipt-header">
            <div>
              <h2>Receipt</h2>
              <span>Voucher No: {voucherNo}</span>
            </div>

            <div className="receipt-date">
              <label>Receipt Date:</label>
              <DatePicker
                selected={reciptDate}
                onChange={(date) =>setReciptDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // ✅ last 1 year
                className="date-input"
                onChangeRaw={(e) => {
                  if (!e || !e.target) return;
                  let value = e.target.value || "";
                  // allow only numbers + /
                  value = value.replace(/[^0-9/]/g, "");
                  // auto format DD/MM/YYYY
                  if (value.length === 2 || value.length === 5) {
                    if (!value.endsWith("/")) value += "/";
                  }
                  // restrict length
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }
                  const parts = value.split("/");
                  // day check
                  if (parts[0] && Number(parts[0]) > 31) parts[0] = "31";
                  // month check
                  if (parts[1] && Number(parts[1]) > 12) parts[1] = "12";
                  // year limit (4 digit)
                  if (parts[2] && parts[2].length > 4) {
                    parts[2] = parts[2].slice(0, 4);
                  }
                  value = parts.join("/");
                  e.target.value = value;
                }}
              />
            </div>
          </div>

          {/* RECEIPT TO */}
          <div className="receipt-ledger">
            <label>Receipt to :</label>
            <select
              value={ledger}
              onChange={(e) => setLedger(e.target.value)}
            >
              <option value="">Select</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
            <button className="payment-ledger-btn" onClick={() => navigate("/Ledger",{state: { defaultGroup: "Bank Accounts" } })} >New ledger</button> 

            <label>Against Type :</label>
            <select
              value={againstType}
              onChange={(e) => setAgainstType(e.target.value)}
            >
              <option value="invoice">Invoice</option>
              <option value="advance">Advance</option>
              <option value="on_account">On Account</option>
            </select>
          </div>

          <hr />

          {/* SEARCH */}
          <div className="R-customer-header">
            <input placeholder="R-Search Customer Name" />
            <button className="R-new-btn">New Customer</button>
          </div>

          {/* TABLE HEADER */}
          <div className="R-table-head">
            <span></span>
            <span>Chq no / Ref. No</span>
            {againstType === "invoice" && <span>Invoice No</span>}
            <span>Amount</span>
          </div>

          {/* ROWS */}
          {rows.map((row, i) => (
              <div
                key={i}
                className={`R-customer-row ${againstType !== "invoice" ? "no-against" : ""}`}
              >
                <div className="R-customer-name">{row.name}</div>

                {/* ✅ Always visible */}
                <input
                  value={row.ref}
                  onChange={(e) => handleChange(i, "ref", e.target.value)}
                />

                {/* ✅ Only for invoice */}
                {againstType === "invoice" && (
                  <select
                  value={row.against}
                  onChange={(e) => handleChange(i, "against", e.target.value)}
                >
                  <option value="">Select Invoice</option>
                  <option>INV-001</option>
                  <option>INV-002</option>
                </select>
                )}

                <input
                  value={row.amount}
                  onChange={(e) => handleChange(i, "amount", e.target.value)}
                />
              </div>
            ))}

          <hr />

          {/* TOTAL */}
          <div className="R-total-section">
            <span>TOTAL</span>
            <input value={total.toFixed(2)} readOnly />
          </div>

          {/* NARRATION */}
          <div className="narration">
            <label>Voucher Narration:</label>
            <textarea
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="R-actions">
            <button className="R-save-btn">Save</button>
            <button className="R-send-btn">Save & Send</button>
            <button className="R-print-btn">Print</button>
            <button className="R-cancel-btn">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}