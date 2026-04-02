import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/Purchase.css";

export default function Purchase() {
  const { collapsed } = useOutletContext();

  const [voucherNo] = useState("PUR-01");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("item");

  const [items, setItems] = useState([
    { desc: "", qty: "", rate: "", tax: "", amount: "" }
  ]);

  const [ledgers, setLedgers] = useState([
    { ledger: "", tax: "", amount: "" }
  ]);

  const [narration, setNarration] = useState("");

  // ================= ITEM CALC =================
  const calculateAmount = (item) => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    const tax = Number(item.tax) || 0;

    const base = qty * rate;
    return base + (base * tax) / 100;
  };

  const total =
    mode === "item"
      ? items.reduce((sum, i) => sum + calculateAmount(i), 0)
      : ledgers.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);

  return (
    <div className="purchase-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="purchase-wrapper">

          {/* HEADER */}
          <div className="purchase-header">
            <div>
              <h2>Purchase</h2>
              <span>Voucher No: {voucherNo}</span>
            </div>

            <div className="purchase-top-right">
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label>Voucher Mode</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="item">Item Invoice</option>
                  <option value="accounting">Accounting Invoice</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          {/* CUSTOMER / DISPATCH SECTION */}
          <div className="purchase-customer">
            <input placeholder="Search Supplier" />
            <button className="new-btn">New Supplier</button>
          </div>

          {/* ✅ NEW SECTION ADDED (NO REPLACEMENT) */}
          {/* ================= CUSTOMER DETAILS ================= */}
          <div className="purchase-customer-details">

            {/* BILLED TO */}
            <div className="purchase-customer-card">
              <h4>Billed To</h4>

              <input className="cust-input" placeholder="Search Supplier Name" />

              <div className="cust-info">
                <p><b>SALVIA GRAFICS PVT LTD</b></p>
                <p>265/2 F, Kuti Choraha</p>
                <p>Near, PVS Mall, Meerut-250002</p>
                <p>Contact: 9870123456</p>

                <p>PAN: ABMCS5888A</p>
                <p>GSTIN: 09ABMCS5888A1ZU</p>
                <p>Place of Supply: Uttar Pradesh</p>
              </div>
            </div>

            {/* SHIPPED TO */}
            <div className="purchase-customer-card">
              <h4>Shipped To</h4>

              <input className="cust-input" placeholder="Search Supplier Name" />

              <button className="pur-edit-btn">Edit</button>

              <div className="cust-info">
                <p><b>SALVIA GRAFICS PVT LTD</b></p>
                <p>265/2 F, Kuti Choraha</p>
                <p>Near, PVS Mall, Meerut-250002</p>
                <p>Contact: 9870123456</p>

                <p>PAN: ABMCS5888A</p>
                <p>GSTIN: 09ABMCS5888A1ZU</p>
                <p>Place of Supply: Uttar Pradesh</p>
              </div>
            </div>

          </div>

          {/* ================= TABLE ================= */}
          <div className="section-card">
          {mode === "item" ? (
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Tax %</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, i) => {
                  const amount = calculateAmount(row);

                  return (
                    <tr key={i}>
                      <td>
                        <input
                          onChange={(e) => {
                            const d = [...items];
                            d[i].desc = e.target.value;
                            setItems(d);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          onChange={(e) => {
                            const d = [...items];
                            d[i].qty = e.target.value;
                            setItems(d);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          onChange={(e) => {
                            const d = [...items];
                            d[i].rate = e.target.value;
                            setItems(d);
                          }}
                        />
                      </td>

                      <td>
                        <select
                          onChange={(e) => {
                            const d = [...items];
                            d[i].tax = e.target.value;
                            setItems(d);
                          }}
                        >
                          <option>0</option>
                          <option>5</option>
                          <option>12</option>
                          <option>18</option>
                        </select>
                      </td>

                      <td>
                        <input value={amount.toFixed(2)} readOnly />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Purchase Ledger</th>
                  <th>Tax Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {ledgers.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        placeholder="Purchase A/c"
                        onChange={(e) => {
                          const d = [...ledgers];
                          d[i].ledger = e.target.value;
                          setLedgers(d);
                        }}
                      />
                    </td>

                    <td>
                      <select
                        onChange={(e) => {
                          const d = [...ledgers];
                          d[i].tax = e.target.value;
                          setLedgers(d);
                        }}
                      >
                        <option>5%</option>
                        <option>12%</option>
                        <option>18%</option>
                      </select>
                    </td>

                    <td>
                      <input
                        onChange={(e) => {
                          const d = [...ledgers];
                          d[i].amount = e.target.value;
                          setLedgers(d);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          

          <button className="add-btn">+ Add Row</button>
          </div>

          <hr />

          {/* SUMMARY */}
          <div className="purchase-summary">
            <span>Total</span>
            <input value={total.toFixed(2)} readOnly />
          </div>

          {/* NARRATION */}
          <div className="purchase-narration">
            <label>Voucher Narration</label>
            <textarea
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </div>

          {/* ACTION */}
          <div className="pur-actions">
            <button className="pur-save-btn">Save</button>
            <button className="pur-cancel-btn">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}