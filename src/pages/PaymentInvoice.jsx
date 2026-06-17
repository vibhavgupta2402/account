import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/PaymentInvoice.css";

export default function Payment() {
  const { collapsed } = useOutletContext();
  const navigate = useNavigate();

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [ledger, setLedger] = useState("");
  const [voucherNo] = useState("PAY-01");
  // const [payDate, setInvoiceDate] = useState(new Date());

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
      <div className="payment-page">

        {/* Voucher Card */}
        <div className="payment-card">

          {/* Header */}
          <div className="payment-top-header">
            <div className="payment-title-section">
              <div className="payment-icon-box">
                <i className="fas fa-wallet"></i>
              </div>

              <div>
                <h2>Payment</h2>

                <div className="voucher-row">
                  <span>Voucher No:</span>
                  <span className="voucher-badge">{voucherNo}</span>
                </div>
              </div>
            </div>

            <div className="payment-date-box">
              <label>Payment Date:</label>
              <DatePicker
                selected={paymentDate}
                onChange={(date) =>setPaymentDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // ✅ last 1 year
                className="pay-date-input"
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

          {/* Payment By */}
          <div className="payment-filter-row">

            <div className="payment-left-controls">

              <div className="pay-filter-group">
                <label>Payment by</label>

                <select
                  value={ledger}
                  onChange={(e) => setLedger(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                </select>
              </div>

              <button
                className="new-ledger-btn"
                onClick={() =>
                  navigate("/Ledger", {
                    state: { defaultGroup: "Bank Accounts" }
                  })
                }
              >
                + New Ledger
              </button>

              <div className="pay-filter-group">
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

            </div>

          </div>

          {/* Search */}
          <div className="customer-search-row">
            <input
              type="text"
              placeholder="Search Customer Name..."
            />

            <button className="pay-new-customer-btn">
              + New Customer
            </button>
          </div>

          {/* Table */}
          <div className="payment-table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Chq no / Ref. No</th>

                  {againstType === "invoice" && (
                    <th>Against to</th>
                  )}

                  <th>Amount (₹)</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="customer-name">
                      {row.name}
                    </td>

                    <td>
                      <input
                        value={row.ref}
                        placeholder="Enter Cheque / Reference No"
                        onChange={(e) =>
                          handleChange(i, "ref", e.target.value)
                        }
                      />
                    </td>

                    {againstType === "invoice" && (
                      <td>
                        <input
                          type="text"
                          value={row.against}
                          placeholder="Enter Invoice"
                          onChange={(e) =>
                            handleChange(
                              i,
                              "against",
                              e.target.value
                            )
                          }
                        />
                      </td>
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

                    <td className="delete-cell">
                      <button
                        className="pay-del-btn"
                        onClick={() => {
                          const updated = rows.filter(
                            (_, index) => index !== i
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
            className="add-row-btn"
            onClick={() =>
              setRows([
                ...rows,
                {
                  name: "",
                  ref: "",
                  against: "",
                  amount: ""
                }
              ])
            }
          >
            + Add Row
          </button>

          {/* Total */}
          <div className="total-wrapper">
            <div className="total-box">
              <span>TOTAL</span>
              <strong>₹ {total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Narration */}
          <div className="pay-narration-box">
            <label>Voucher Narration</label>

            <textarea
              value={narration}
              placeholder="Enter narration for this voucher..."
              onChange={(e) =>
                setNarration(e.target.value)
              }
            />
          </div>

          {/* Footer Buttons */}
          <div className="action-buttons">
            <button className="save-btn-act">
              Save
            </button>

            <button className="cancel-btn-act">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}