import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SaleOrder.css";

export default function SaleOrder() {
  const { collapsed } = useOutletContext();

  /* ================= HEADER ================= */
  const [soNo, setSoNo] = useState("SO-01");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [soDate, setSoDate] = useState("");
  const [soRef, setSoRef] = useState("");
  const [soType, setSoType] = useState("");
  const [buyer, setBuyer] = useState("");

  /* ================= CUSTOMER ================= */
  const [billedTo, setBilledTo] = useState("");
  const [shippedTo, setShippedTo] = useState("");

  /* ================= TERMS ================= */
  const [paymentTerms, setPaymentTerms] = useState("");
  const [soTerms, setSoTerms] = useState("");

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
    <div className="sale-order-app">
      <div className={`so-main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="so-wrapper">

          {/* ================= HEADER ================= */}
          <div className="so-card">

            <div className="so-header-row">
              <h2>Sale Order</h2>
            </div>
            <div className="so-grid-3">

                <div className="so-form-group">
                    <label>SO No</label>
                    <input className="so-input" value={soNo} />
                </div>

                <div className="so-form-group">
                    <label>SO Date</label>
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

                <div className="so-form-group">
                    <label>SO Ref No</label>
                    <input className="so-input" onChange={(e) => setSoRef(e.target.value)} />
                </div>

                <div className="so-form-group">
                    <label>Type of SO</label>
                    <select className="so-select" onChange={(e) => setSoType(e.target.value)}>
                    <option>Select</option>
                    <option>Goods</option>
                    <option>Service</option>
                    <option>Job Work</option>
                    </select>
                </div>

                <div className="so-form-group">
                    <label>Buyer</label>
                    <select className="so-select" onChange={(e) => setBuyer(e.target.value)}>
                    <option>Select</option>
                    <option>Self</option>
                    <option>Purchase Manager</option>
                    <option>Branch Buyer</option>
                    </select>
                </div>

            </div>
           
          </div>

          {/* ================= Supplier ================= */}
          <div className="so-card">
            <h3>Supplier Details</h3>

            <div className="so-customer-container">

              <div className="so-customer-card">
                <h4>Billed To</h4>
                <input className="so-input" onChange={(e) => setBilledTo(e.target.value)} />
                <button className="so-add-btn">Add New</button>
              </div>

              <div className="so-customer-card">
                <h4>Shipped To</h4>
                <input className="so-input" onChange={(e) => setShippedTo(e.target.value)} />
              </div>

            </div>
          </div>

          {/* ================= TERMS ================= */}
          <div className="so-card">

            <div className="so-grid-2">

              <div className="so-form-group">
                <label>Terms & Conditions of Payment</label>
                <textarea className="so-textarea" onChange={(e) => setPaymentTerms(e.target.value)} />
              </div>

              <div className="so-form-group">
                <label>Terms & Conditions of SO</label>
                <textarea className="so-textarea" onChange={(e) => setSoTerms(e.target.value)} />
              </div>

            </div>
          </div>

          {/* ================= ITEMS ================= */}
          <div className="so-card">
            <h3>Description of Goods</h3>

            <table className="so-table">
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
                      <td><input className="so-input" onChange={(e) => handleChange(i, "description", e.target.value)} /></td>
                      <td><input className="so-input" onChange={(e) => handleChange(i, "hsn", e.target.value)} /></td>
                      <td><input className="so-input" type="number" onChange={(e) => handleChange(i, "qty", e.target.value)} /></td>
                      <td><input className="so-input" type="number" onChange={(e) => handleChange(i, "price", e.target.value)} /></td>
                      <td>
                        <select className="so-select" onChange={(e) => handleChange(i, "gst", e.target.value)}>
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                        </select>
                      </td>
                      <td><input className="so-input" value={amount.toFixed(2)} readOnly /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button className="so-add-row-btn" onClick={addRow}>+ Add Item</button>
          </div>

          {/* ================= NOTES + SUMMARY ================= */}
          <div className="so-grid-2">

            <div className="so-notes">
              <label>Notes</label>
              <textarea className="so-textarea" />
            </div>

            <div className="so-summary-box">
              <div>Subtotal: ₹ {subtotal.toFixed(2)}</div>
              <div>CGST: ₹ {cgst.toFixed(2)}</div>
              <div>SGST: ₹ {sgst.toFixed(2)}</div>
              <div>Total GST: ₹ {totalGST.toFixed(2)}</div>
              <div className="so-total">Grand Total: ₹ {total.toFixed(2)}</div>
            </div>

          </div>

          {/* ================= ACTIONS ================= */}
          <div className="so-footer-actions">
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