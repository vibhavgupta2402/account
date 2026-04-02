import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/PaymentInvoice.css";

export default function Payment() {
  const { collapsed } = useOutletContext();

  const [paymentDate, setPaymentDate] = useState("");
  const [ledger, setLedger] = useState("");
  const [voucherNo] = useState("PAY-01");

  const [againstType, setAgainstType] = useState("invoice"); 
// invoice | advance | on_account
  const [rows, setRows] = useState([
    { name: "SALVIA GRAFICS PVT LTD", ref: "", against: "", amount: "" },
    { name: "BEST COMPRESSOR MFG VALVE CO", ref: "", against: "", amount: "" },
    { name: "A. K. TRADERS", ref: "", against: "", amount: "" }
  ]);

  const [narration, setNarration] = useState("");

  // total
  const total = rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="payment-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="payment-wrapper">

          {/* HEADER */}
          <div className="payment-header">
            <div>
              <h2>Payment</h2>
              <span>Voucher No: {voucherNo}</span>
            </div>

            <div className="payment-date">
              <label>Payment Date:</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>
          </div>

          {/* PAYMENT BY */}
          <div className="payment-by">
            <label>Against Type</label>
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

          {/* CUSTOMER TABLE */}
          {/* <div className="customer-section"> */}

            <div className="Py-customer-header">
              <input placeholder="Search Customer Name" />
              <button className="P-new-btn">New Customer</button>
            </div>
              <div className="table-head">
                <span></span>
                {againstType === "invoice" && <span>Chq no / Ref. No</span>}
                {againstType === "invoice" && <span>Against to:</span>}
                <span>Amount</span>
              </div>
            

            {/* ROWS */}
            {rows.map((row, i) => (
              <div key={i} className="customer-row">

                <div className="customer-name">{row.name}</div>

                {againstType === "invoice" && (
                  <input
                    value={row.ref}
                    onChange={(e) => handleChange(i, "ref", e.target.value)}
                  />
                )}

                {againstType === "invoice" && (
                  <input
                    value={row.against}
                    onChange={(e) => handleChange(i, "against", e.target.value)}
                  />
                )}

                <input
                  value={row.amount}
                  onChange={(e) => handleChange(i, "amount", e.target.value)}
                />

              </div>
            ))}

          {/* </div> */}

          <hr />

          {/* TOTAL */}
          <div className="total-section">
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

          {/* ACTIONS */}
          <div className="actions-but">
            <button className="save-btn-act">Save</button>
            <button className="cancel-btn-act">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}