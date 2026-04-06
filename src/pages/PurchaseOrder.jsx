import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/PurchaseOrder.css";

export default function PurchaseOrder() {
  const { collapsed } = useOutletContext();

  /* ================= HEADER ================= */
  const [poNo, setPoNo] = useState("PO-01");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [poDate, setPoDate] = useState("");
  const [poType, setPoType] = useState("");
  const [buyer, setBuyer] = useState("");

  /* ================= SUPPLIER ================= */
  const [billedTo, setBilledTo] = useState("");
  const [shippedTo, setShippedTo] = useState("");

  /* ================= TERMS ================= */
  const [paymentTerms, setPaymentTerms] = useState("");
  const [poTerms, setPoTerms] = useState("");

  /* ================= ITEMS ================= */
  const [items, setItems] = useState([
    { description: "", hsn: "", qty: "", price: "", gst: "" }
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { description: "", hsn: "", qty: "", price: "", gst: "" }
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  /* ================= CALCULATIONS ================= */
  const subtotal = items.reduce((sum, i) => {
    const qty = Number(i.qty) || 0;
    const price = Number(i.price) || 0;
    return sum + qty * price;
  }, 0);

  const totalGST = items.reduce((sum, i) => {
    const qty = Number(i.qty) || 0;
    const price = Number(i.price) || 0;
    const gst = Number(i.gst) || 0;
    return sum + ((qty * price) * gst) / 100;
  }, 0);

  const cgst = totalGST / 2;
  const sgst = totalGST / 2;

  const total = subtotal + totalGST;

  return (
    <div className="purchase-order-app">
      <div className={`po-main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="po-wrapper">

          {/* ================= HEADER ================= */}
          <div className="po-card">

            <div className="po-header-row">
              <h2>Purchase Order</h2>
            </div>

              <div className="po-grid-3">

                <div className="po-form-group">
                  <label>PO No</label>
                  <input className="po-input" value={poNo} />
                </div>

                <div className="po-form-group">
                  <label>PO Date</label>
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

                <div className="po-form-group">
                  <label>Type of PO</label>
                  <select
                    className="po-select"
                    onChange={(e) => setPoType(e.target.value)}
                  >
                    <option>Select</option>
                    <option>Goods</option>
                    <option>Service</option>
                    <option>Job Work</option>
                  </select>
                </div>

                <div className="po-form-group">
                  <label>Buyer</label>
                  <select
                    className="po-select"
                    onChange={(e) => setBuyer(e.target.value)}
                  >
                    <option>Select</option>
                    <option>Self</option>
                    <option>Purchase Manager</option>
                    <option>Branch Buyer</option>
                  </select>
                </div>

              </div>
            
          </div>

          {/* ================= SUPPLIER ================= */}
          <div className="po-card">
            <h3>Supplier Details</h3>

            <div className="po-supplier-container">

              <div className="po-supplier-card">
                <h4>Billed To</h4>
                <input
                  className="po-input"
                  placeholder="Enter Supplier"
                  onChange={(e) => setBilledTo(e.target.value)}
                />
                <button className="po-add-btn">Add New</button>
              </div>

              <div className="po-supplier-card">
                <h4>Shipped To</h4>
                <input
                  className="po-input"
                  placeholder="Enter Location"
                  onChange={(e) => setShippedTo(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* ================= TERMS ================= */}
          <div className="po-card">

            <div className="po-grid-2">

              <div className="po-form-group">
                <label>Terms & Conditions of Payment</label>
                <textarea
                  className="po-textarea"
                  onChange={(e) => setPaymentTerms(e.target.value)}
                />
              </div>

              <div className="po-form-group">
                <label>Terms & Conditions of PO</label>
                <textarea
                  className="po-textarea"
                  onChange={(e) => setPoTerms(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* ================= ITEMS ================= */}
          <div className="po-card">
            <h3>Description of Goods</h3>

            <table className="po-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>HSN</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>GST %</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, i) => {
                  const qty = Number(item.qty) || 0;
                  const price = Number(item.price) || 0;
                  const gst = Number(item.gst) || 0;
                  const amount = qty * price + (qty * price * gst) / 100;

                  return (
                    <tr key={i}>
                      <td>
                        <input
                          className="po-input"
                          onChange={(e) => handleChange(i, "description", e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          className="po-input"
                          onChange={(e) => handleChange(i, "hsn", e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          className="po-input"
                          type="number"
                          onChange={(e) => handleChange(i, "qty", e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          className="po-input"
                          type="number"
                          onChange={(e) => handleChange(i, "price", e.target.value)}
                        />
                      </td>

                      <td>
                        <select
                          className="po-select"
                          onChange={(e) => handleChange(i, "gst", e.target.value)}
                        >
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                        </select>
                      </td>

                      <td>
                        <input
                          className="po-input"
                          value={amount.toFixed(2)}
                          readOnly
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button className="po-add-row-btn" onClick={addRow}>
              + Add Item
            </button>
          </div>

          {/* ================= NOTES + SUMMARY ================= */}
          <div className="po-grid-2">

            <div className="po-notes">
              <label>Notes</label>
              <textarea className="po-textarea" />
            </div>

            <div className="po-summary-box">
              <div>Subtotal: ₹ {subtotal.toFixed(2)}</div>
              <div>CGST: ₹ {cgst.toFixed(2)}</div>
              <div>SGST: ₹ {sgst.toFixed(2)}</div>
              <div>Total GST: ₹ {totalGST.toFixed(2)}</div>
              <div className="po-total">Grand Total: ₹ {total.toFixed(2)}</div>
            </div>

          </div>

          {/* ================= ACTIONS ================= */}
          <div className="po-footer-actions">
            <button>Save</button>
            <button>Save & Print</button>
            <button>Save & Send</button>
            <button>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}