import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/DeliveryChallan.css";

export default function DeliveryChallan() {
  const { collapsed } = useOutletContext();

  /* ================= PART 1 ================= */
  const [challanNo, setChallanNo] = useState("DC-01");
  const [date, setDate] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [docNo, setDocNo] = useState("");
  const [transporterGST, setTransporterGST] = useState("");
  const [name, setName] = useState("");
  const [lrNo, setLrNo] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [challanType, setChallanType] = useState("");

  /* ================= PART 2 ================= */
  const [billedTo, setBilledTo] = useState("");
  const [shippedTo, setShippedTo] = useState("");
  const [address, setAddress] = useState("");

  /* ================= PART 3 ================= */
  const [items, setItems] = useState([
    { product: "", description: "", hsn: "", qty: "", rate: "", tax: "" }
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { product: "", description: "", hsn: "", qty: "", rate: "", tax: "" }
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
    const rate = Number(i.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const totalTax = items.reduce((sum, i) => {
    const qty = Number(i.qty) || 0;
    const rate = Number(i.rate) || 0;
    const tax = Number(i.tax) || 0;
    return sum + ((qty * rate) * tax) / 100;
  }, 0);

  const total = subtotal + totalTax;

  return (
    <div className="delivery-challan-app">
      <div className={`dc-main-content ${collapsed ? "collapsed" : ""}`}>

        <div className="dc-wrapper">

          {/* ================= PART 1 ================= */}
          <div className="dc-card">

            <div className="dc-header-row">
              <h2>Delivery Challan</h2>

              <div className="dc-form-group">
                <label>Challan Type</label>
                <select
                  className="dc-select"
                  onChange={(e) => setChallanType(e.target.value)}
                >
                  <option>Select</option>
                  <option>Job Work</option>
                  <option>Approval Basis</option>
                  <option>Stock Transfer</option>
                  <option>To Exhibition</option>
                  <option>From Exhibition</option>
                </select>
              </div>
            </div>

            <div className="dc-grid-3">

              <div className="dc-form-group">
                <label>No</label>
                <input className="dc-input" value={challanNo} />
              </div>

              <div className="dc-form-group">
                <label>Date</label>
                <input
                  className="dc-input"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="dc-form-group">
                <label>Vehicle No</label>
                <input className="dc-input" onChange={(e) => setVehicleNo(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>Doc No</label>
                <input className="dc-input" onChange={(e) => setDocNo(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>Transporter GSTIN</label>
                <input className="dc-input" onChange={(e) => setTransporterGST(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>Name</label>
                <input className="dc-input" onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>LR / RR No</label>
                <input className="dc-input" onChange={(e) => setLrNo(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>Dispatch Date</label>
                <input
                  className="dc-input"
                  type="date"
                  onChange={(e) => setDispatchDate(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* ================= PART 2 ================= */}
          <div className="dc-card">
            <h3>Customer Details</h3>

            <div className="dc-grid-2">
              <div className="dc-form-group">
                <label>Billed To</label>
                <input className="dc-input" onChange={(e) => setBilledTo(e.target.value)} />
              </div>

              <div className="dc-form-group">
                <label>Shipped To</label>
                <input className="dc-input" onChange={(e) => setShippedTo(e.target.value)} />
              </div>

              <div className="dc-form-group dc-full">
                <label>Address</label>
                <textarea className="dc-textarea" onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
          </div>

          {/* ================= PART 3 ================= */}
          <div className="dc-card">
            <h3>Product Details</h3>

            <table className="dc-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>HSN</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Tax %</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, i) => {
                  const qty = Number(item.qty) || 0;
                  const rate = Number(item.rate) || 0;
                  const tax = Number(item.tax) || 0;
                  const amount = qty * rate + (qty * rate * tax) / 100;

                  return (
                    <tr key={i}>
                      <td><input className="dc-input" onChange={(e) => handleChange(i, "product", e.target.value)} /></td>
                      <td><input className="dc-input" onChange={(e) => handleChange(i, "description", e.target.value)} /></td>
                      <td><input className="dc-input" onChange={(e) => handleChange(i, "hsn", e.target.value)} /></td>
                      <td><input className="dc-input" type="number" onChange={(e) => handleChange(i, "qty", e.target.value)} /></td>
                      <td><input className="dc-input" type="number" onChange={(e) => handleChange(i, "rate", e.target.value)} /></td>
                      <td>
                        <select className="dc-select" onChange={(e) => handleChange(i, "tax", e.target.value)}>
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                        </select>
                      </td>
                      <td><input className="dc-input" value={amount.toFixed(2)} readOnly /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button className="dc-add-btn" onClick={addRow}>
              + Add Item
            </button>
          </div>

          {/* SUMMARY */}
          <div className="dc-summary-box">
            <div>Subtotal: ₹ {subtotal.toFixed(2)}</div>
            <div>Tax: ₹ {totalTax.toFixed(2)}</div>
            <div className="dc-total">Total: ₹ {total.toFixed(2)}</div>
          </div>

          {/* ACTIONS */}
          <div className="dc-footer-actions">
            <button>Save</button>
            <button>Save & Print</button>
            <button>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}