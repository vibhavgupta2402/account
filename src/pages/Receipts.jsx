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
      <div className="receipt-page">

        <div className="receipt-card">

          {/* Header */}
          <div className="receipt-top-header">

            <div className="receipt-title-section">
              <div className="receipt-icon-box">
                <i className="fas fa-receipt"></i>
              </div>

              <div>
                <h2>Receipt</h2>

                <div className="receipt-voucher-row">
                  <span>Voucher No:</span>
                  <span className="receipt-voucher-badge">
                    {voucherNo}
                  </span>
                </div>
              </div>
            </div>

            <div className="receipt-date-box">
              <label>Receipt Date:</label>

              <DatePicker
                selected={reciptDate}
                onChange={(date) => setReciptDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={
                  new Date(
                    new Date().setFullYear(
                      new Date().getFullYear() - 1
                    )
                  )
                }
                className="receipt-date-input"
                onChangeRaw={(e) => {
                  if (!e || !e.target) return;

                  let value = e.target.value || "";

                  value = value.replace(/[^0-9/]/g, "");

                  if (value.length === 2 || value.length === 5) {
                    if (!value.endsWith("/")) value += "/";
                  }

                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  const parts = value.split("/");

                  if (parts[0] && Number(parts[0]) > 31)
                    parts[0] = "31";

                  if (parts[1] && Number(parts[1]) > 12)
                    parts[1] = "12";

                  if (
                    parts[2] &&
                    parts[2].length > 4
                  ) {
                    parts[2] = parts[2].slice(0, 4);
                  }

                  value = parts.join("/");
                  e.target.value = value;
                }}
              />
            </div>
          </div>

          {/* Receipt To */}
          <div className="receipt-filter-row">

            <div className="receipt-left-controls">

              <div className="receipt-filter-group">
                <label>Receipt To</label>

                <select
                  value={ledger}
                  onChange={(e) =>
                    setLedger(e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                </select>
              </div>

              <button
                className="receipt-ledger-btn"
                onClick={() =>
                  navigate("/Ledger", {
                    state: {
                      defaultGroup:
                        "Bank Accounts",
                    },
                  })
                }
              >
                + New Ledger
              </button>

              <div className="receipt-filter-group">
                <label>Against Type</label>

                <select
                  value={againstType}
                  onChange={(e) =>
                    setAgainstType(
                      e.target.value
                    )
                  }
                >
                  <option value="invoice">
                    Invoice
                  </option>
                  <option value="advance">
                    Advance
                  </option>
                  <option value="on_account">
                    On Account
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* Search */}
          <div className="receipt-search-row">
            <input
              type="text"
              placeholder="Search Customer Name..."
            />

            <button className="receipt-new-customer-btn">
              + New Customer
            </button>
          </div>

          {/* Table */}
          <div className="receipt-table-wrapper">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Chq no / Ref. No</th>

                  {againstType ===
                    "invoice" && (
                    <th>Against To</th>
                  )}

                  <th>Amount (₹)</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="receipt-customer-name">
                      {row.name}
                    </td>

                    <td>
                      <input
                        value={row.ref}
                        placeholder="Enter Cheque / Reference No"
                        onChange={(e) =>
                          handleChange(
                            i,
                            "ref",
                            e.target.value
                          )
                        }
                      />
                    </td>

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

                    <td>
                      <input
                        value={row.amount}
                        placeholder="0.00"
                        onChange={(e) =>
                          handleChange(
                            i,
                            "amount",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td className="receipt-delete-cell">
                      <button
                        className="receipt-del-btn"
                        onClick={() => {
                          const updated =
                            rows.filter(
                              (_, index) =>
                                index !== i
                            );
                          setRows(updated);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row */}
          <button
            className="receipt-add-row-btn"
            onClick={() =>
              setRows([
                ...rows,
                {
                  name: "",
                  ref: "",
                  against: "",
                  amount: "",
                },
              ])
            }
          >
            + Add Row
          </button>

          {/* Total */}
          <div className="receipt-total-wrapper">
            <div className="receipt-total-box">
              <span>TOTAL</span>

              <strong>
                ₹{" "}
                {total.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>
            </div>
          </div>

          {/* Narration */}
          <div className="receipt-narration-box">
            <label>
              Voucher Narration
            </label>

            <textarea
              value={narration}
              placeholder="Enter narration for this voucher..."
              onChange={(e) =>
                setNarration(
                  e.target.value
                )
              }
            />
          </div>

          {/* Actions */}
          <div className="receipt-action-buttons">
            <button className="receipt-save-btn">
              Save
            </button>

            <button className="receipt-send-btn">
              Save & Send
            </button>

            <button className="receipt-print-btn">
              Print
            </button>

            <button className="receipt-cancel-btn">
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}