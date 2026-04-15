import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/groupSecondary.css";

export default function GroupSecondary( { onClose, onSave }) {
    const { collapsed } = useOutletContext();
  const [form, setForm] = useState({
    name: "",
    alias: "",
    under: "Capital Account",
    subLedger: "No",
    netBalance: "No",
    usedForCalc: "No",
    method: "Not Applicable"
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
     <div className={`so-main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="grp-sec-container">
        {/* HEADER */}
        <div className="grp-sec-header">
            <h2>Group Creation (Secondary)</h2>
        </div>

        {/* FORM */}
        <div className="grp-sec-card">

            {/* TOP */}
            <div className="grp-sec-row">
            <label>Name</label>
            <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
            />
            </div>

            <div className="grp-sec-row">
            <label>(Alias)</label>
            <input
                value={form.alias}
                onChange={(e) => handleChange("alias", e.target.value)}
            />
            </div>

            <div className="grp-sec-row">
            <label>Under</label>
            <select
                value={form.under}
                onChange={(e) => handleChange("under", e.target.value)}
            >
                <option>Capital Account</option>
                <option>Current Assets</option>
                <option>Liabilities</option>
            </select>
            </div>

            <div className="grp-sec-divider"></div>

            {/* OPTIONS */}
            <div className="grp-sec-row">
            <label>Group behaves like a sub-ledger</label>
            <select
                value={form.subLedger}
                onChange={(e) => handleChange("subLedger", e.target.value)}
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="grp-sec-row">
            <label>Nett Debit/Credit Balances for Reporting</label>
            <select
                value={form.netBalance}
                onChange={(e) => handleChange("netBalance", e.target.value)}
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="grp-sec-row">
            <label>
                Used for calculation (taxes, discounts)
                <span className="grp-sec-subtext">
                (for sales invoice entries)
                </span>
            </label>
            <select
                value={form.usedForCalc}
                onChange={(e) => handleChange("usedForCalc", e.target.value)}
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="grp-sec-row">
            <label>Method to allocate (purchase invoice)</label>
            <select
                value={form.method}
                onChange={(e) => handleChange("method", e.target.value)}
            >
                <option>Not Applicable</option>
                <option>Appropriate by Quantity</option>
                <option>Appropriate by Value</option>
            </select>
            </div>

            {/* ACTIONS */}
            <div className="grp-sec-actions">
            <button className="grp-sec-save" onClick={() => onSave(form)}>Save</button>
            <button className="grp-sec-cancel" onClick={onClose}>Cancel</button>
            </div>

        </div>
        </div>
    </div>
);
}
