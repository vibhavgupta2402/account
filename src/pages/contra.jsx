import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/Contra.css";

export default function Contra() {
  const { collapsed } = useOutletContext();

  const [date, setDate] = useState("");
  const [voucherNo] = useState("CON-01");

  const [mode, setMode] = useState("deposit"); 
  // deposit | withdraw | transfer

  const [ledgerFrom, setLedgerFrom] = useState("");
  const [ledgerTo, setLedgerTo] = useState("");

  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");

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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
              <label>From (Dr)</label>
              <input
                value={ledgerFrom}
                onChange={(e) => setLedgerFrom(e.target.value)}
                disabled={mode !== "transfer"}
              />
            </div>

            <div className="contra-row">
              <label>To (Cr)</label>
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
              <label>Chq No</label>
              <input
                value={chequeNo}
                onChange={(e) => setChequeNo(e.target.value)}
              />
            </div>

            <div className="contra-row">
              <label>Chq Date</label>
              <input
                type="date"
                value={chequeDate}
                onChange={(e) => setChequeDate(e.target.value)}
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