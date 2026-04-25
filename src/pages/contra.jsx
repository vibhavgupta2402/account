import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Contra.css";

export default function Contra() {
  const { collapsed } = useOutletContext();
   const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [voucherNo] = useState("CON-01");

  const [mode, setMode] = useState("deposit"); 
  // deposit | withdraw | transfer

  const [ledgerFrom, setLedgerFrom] = useState("");
  const [ledgerTo, setLedgerTo] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  // 🔥 AUTO LOGIC
  const handleModeChange = (value) => {
    setMode(value);

    if (value === "deposit") {
      setLedgerFrom("Cash");
      setLedgerTo("Bank");
    } else if (value === "withdraw") {
      setLedgerFrom("Bank");
      setLedgerTo("Cash");
    } else {
      setLedgerFrom("");
      setLedgerTo("");
    }
  };

  return (
    <div className="contra-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="contra-wrapper">

          {/* HEADER */}
          <div className="contra-header">
            <div>
              <h2>Contra</h2>
              <span>Voucher No: {voucherNo}</span>
            </div>

            <div className="contra-date">
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
          </div>

          {/* MODE */}
          <div className="contra-mode">
            <label>Transaction Mode</label>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
            >
              <option value="deposit">Cash Deposit</option>
              <option value="withdraw">Cash Withdrawal</option>
              <option value="transfer">Bank to Bank</option>
            </select>
          </div>

          <hr />

          {/* LEDGER SECTION */}
          <div className="contra-ledger">

            <div className="contra-row">
              {/* <label>From (Dr)</label> */}
              <label>From</label>
              <input
                value={ledgerFrom}
                onChange={(e) => setLedgerFrom(e.target.value)}
                disabled={mode !== "transfer"}
              />
            </div>

            <div className="contra-row">
              {/* <label>To (Cr)</label> */}
              <label>To</label>
              <input
                value={ledgerTo}
                onChange={(e) => setLedgerTo(e.target.value)}
                disabled={mode !== "transfer"}
              />
            </div>

          </div>

          {/* CHEQUE DETAILS */}
          <div className="contra-extra">
            <div className="contra-row">
              <label>Chq No/Transcation No/URR No</label>
              <input
                value={chequeNo}
                onChange={(e) => setChequeNo(e.target.value)}
              />
            </div>
            <div className="contra-row">
              <label>Chq Date</label>
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

            <div className="contra-row">
              <label>Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

          </div>

          <hr />

          {/* TOTAL */}
          <div className="contra-total">
            <span>TOTAL</span>
            <input value={(Number(amount) || 0).toFixed(2)} readOnly />
          </div>

          {/* NARRATION */}
          <div className="contra-narration">
            <label>Voucher Narration:</label>
            <textarea
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </div>

          {/* ACTION */}
          <div className="contra-actions">
            <button className="cont-save-btn">Save</button>
            <button className="cont-cancel-btn">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}