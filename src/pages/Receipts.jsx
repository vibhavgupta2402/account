import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/ReceiptInvoice.css";

export default function Receipt() {
  const { collapsed } = useOutletContext();
  const [voucherNo] = useState("REC-01");
  const [againstType, setAgainstType] = useState("invoice");

  const [date, setDate] = useState("");
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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
            {againstType === "invoice" && <span>Chq no / Ref. No</span>}
            {againstType === "invoice" && <span>Invoice No</span>}
            <span>Amount</span>
          </div>

          {/* ROWS */}
          {rows.map((row, i) => (
            <div key={i} className="R-customer-row">

              <div className="R-customer-name">{row.name}</div>

              {/* Only for Invoice */}
              {againstType === "invoice" && (
                <input
                  value={row.ref}
                  placeholder="Ref No"
                  onChange={(e) => handleChange(i, "ref", e.target.value)}
                />
              )}

              {/* Invoice Selection */}
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

              {/* Amount always visible */}
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