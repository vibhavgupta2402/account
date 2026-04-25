import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DeliveryChallan.css";

export default function DeliveryChallan() {
  const { collapsed } = useOutletContext();

  /* ================= PART 1 ================= */
  const [challanNo, setChallanNo] = useState("DC-01");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [date, setDate] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [docNo, setDocNo] = useState("");
  const [transporterGST, setTransporterGST] = useState("");
  const [name, setName] = useState("");
  const [lrNo, setLrNo] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [challanType, setChallanType] = useState("");
   const [customer,setCustomer] = useState({});
   const [showCustomerPopup, setShowCustomerPopup] = useState(false);
    const [editBilled, setEditBilled] = useState(false);
    const [editShipped, setEditShipped] = useState(false);
    const [invoiceType, setInvoiceType] = useState("item");
   const states = [
     "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
     "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
     "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
     "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
     "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
     "Uttarakhand","West Bengal"
   ];
   const [openStateDropdown, setOpenStateDropdown] = useState(false);
   const [selectedState, setSelectedState] = useState("");

  /* ================= PART 2 ================= */
  const [billedTo, setBilledTo] = useState({
        name: "SALVIA GRAFICS PVT LTD",
        address: "2652/F Kuti Choraha, Near PVS Mall, Garh Road",
        city: "Meerut-250002",
        contact: "Vikram Singh",
        mobile: "9897012345",
        pan: "ABMCS5888A",
        gstin: "09ABMCS5888A12U",
        pos: "09-Uttar Pradesh"
      });
  
      const [shippedTo, setShippedTo] = useState({
        name: "SALVIA GRAFICS PVT LTD",
        address: "2652/F Kuti Choraha, Near PVS Mall, Garh Road",
        city: "Meerut-250002",
        contact: "Vikram Singh",
        mobile: "9897012345",
        pan: "ABMCS5888A",
        gstin: "09ABMCS5888A12U",
        pos: "09-Uttar Pradesh"
      });
  const [address, setAddress] = useState("");

  /* ================= PART 3 ================= */
  const [items, setItems] = useState([
    { product: "", description: "", hsn: "", qty: "", rate: "", tax: "" }
  ]);
  const [voucherCount, setVoucherCount] = useState(1);
  const generateVoucher = () => {
    const number = String(voucherCount).padStart(2, "0");
    return `DC-${number}`;
  };

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
          <h2>Delivery Challan</h2>
          {/* ================= PART 1 ================= */}
          <div className="dc-card">
            <div className="dc-header-row">
              <div className="pur-voucher-row">
                  <label>Voucher No:</label>
                  <span className="voucher-value">{generateVoucher()}</span>
                </div>
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
              <div className="dc-form-group">
                <label>Date</label>
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
            <h3>Dispatch details</h3>
            <div className="dc-grid-3">
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
          </div>

          {/* ================= PART 2 ================= */}
          <div className="section-card">
              <h2>Customer Details</h2>
              <div className="search-customer">
                <label>Search Customer Name</label>
                <div className="search-box">
                  <input type="text" placeholder="Search customer..." />
                  <button
                    className="new-customer-btn"
                    onClick={() => setShowCustomerPopup(true)}
                  >
                    New Customer
                  </button>
                 {showCustomerPopup && (
                  <div
                    className="cust-overlay"
                    onClick={() => setShowCustomerPopup(false)}   // 🔥 outside click close
                  >

                    <div
                      className="cust-popup"
                      onClick={(e) => e.stopPropagation()}        // 🔥 prevent inside click close
                    >

                      {/* HEADER */}
                      <div className="cust-header">
                        <h3>Add New Customer</h3>

                        <button
                          className="cust-close-btn"
                          onClick={() => setShowCustomerPopup(false)}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="cust-form-wrapper">

                        {/* LEFT */}
                        <div className="cust-left">

                          {/* GST ROW */}
                          <div className="cust-gst-row">
                            <input
                              className="cust-input"
                              placeholder="GSTIN / URP"
                              onChange={(e)=>setCustomer({...customer,gstin:e.target.value})}
                            />

                            <button className="cust-get-btn">Get Data</button>
                          </div>

                          <input className="cust-input" placeholder="Party Name"
                            onChange={(e)=>setCustomer({...customer,name:e.target.value})}
                          />

                          <input className="cust-input" placeholder="Billing Address 1"
                            onChange={(e)=>setCustomer({...customer,address1:e.target.value})}
                          />

                          <input className="cust-input" placeholder="Billing Address 2"
                            onChange={(e)=>setCustomer({...customer,address2:e.target.value})}
                          />

                          <input className="cust-input" placeholder="Pin"
                            onChange={(e)=>setCustomer({...customer,pin:e.target.value})}
                          />

                          <div className="cust-select">

                          <div
                            className="cust-select-box"
                            onClick={() => setOpenStateDropdown(!openStateDropdown)}
                          >
                            {selectedState || "Select State"}
                            <span className="arrow">▼</span>
                          </div>

                          {openStateDropdown && (
                            <div className="cust-select-dropdown">

                              {states.map((state) => (
                                <div
                                  key={state}
                                  className="cust-option"
                                  onClick={() => {
                                    setSelectedState(state);
                                    setCustomer({...customer, state});
                                    setOpenStateDropdown(false);
                                  }}
                                >
                                  {state}
                                </div>
                              ))}

                            </div>
                          )}

                        </div>

                          <input className="cust-input" placeholder="Contact No"
                            onChange={(e)=>setCustomer({...customer,contact:e.target.value})}
                          />

                          <input className="cust-input" placeholder="Email ID"
                            onChange={(e)=>setCustomer({...customer,email:e.target.value})}
                          />

                          <input className="cust-input" placeholder="PAN"
                            onChange={(e)=>setCustomer({...customer,pan:e.target.value})}
                          />

                          <div className="cust-row">
                            <input className="cust-input" placeholder="Opening Balance"
                              onChange={(e)=>setCustomer({...customer,balance:e.target.value})}
                            />

                            <select className="cust-input"
                              onChange={(e)=>setCustomer({...customer,drcr:e.target.value})}
                            >
                              <option>Dr</option>
                              <option>Cr</option>
                            </select>
                          </div>

                        </div>

                        {/* RIGHT */}
                        <div className="cust-right">

                          <label>Registration Type</label>

                          <select className="sale-cust-input"
                            onChange={(e)=>setCustomer({...customer,registration:e.target.value})}
                          >
                            <option>Select</option>
                            <option>Composition</option>
                            <option>Regular</option>
                            <option>Unregistered / Consumer</option>
                            <option>Government Entity / TDS</option>
                            <option>Regular - SEZ</option>
                            <option>Regular - Exports (EOU)</option>
                            <option>E-Commerce Operator</option>
                            <option>Input Service Distributor</option>
                            <option>Embassy / UN Body</option>
                            <option>Non Resident Taxpayer</option>
                          </select>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="cust-actions">
                        <button className="cust-save-btn">Save Customer</button>
                      </div>

                    </div>

                  </div>
                )}
                </div>
              </div>
              {/* Billed To and Shipped To */}
              <div className="customer-details-container">         
                {/* Billed To */}
                <div className="customer-card">
                  <div className="customer-card-header">
                    <h3>Billed To:</h3>
                  </div>
                  
                  {editBilled ? (
                    <div className="customer-edit-form">
                      <input 
                        type="text" 
                        value={billedTo.name}
                        onChange={(e) => setBilledTo({...billedTo, name: e.target.value})}
                        placeholder="Company Name"
                      />
                      <input 
                        type="text" 
                        value={billedTo.address}
                        onChange={(e) => setBilledTo({...billedTo, address: e.target.value})}
                        placeholder="Address"
                      />
                      <input 
                        type="text" 
                        value={billedTo.city}
                        onChange={(e) => setBilledTo({...billedTo, city: e.target.value})}
                        placeholder="City"
                      />
                      <div className="form-row">
                        <input 
                          type="text" 
                          value={billedTo.contact}
                          onChange={(e) => setBilledTo({...billedTo, contact: e.target.value})}
                          placeholder="Contact Person"
                        />
                        <input 
                          type="text" 
                          value={billedTo.mobile}
                          onChange={(e) => setBilledTo({...billedTo, mobile: e.target.value})}
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="form-row">
                        <input 
                          type="text" 
                          value={billedTo.pan}
                          onChange={(e) => setBilledTo({...billedTo, pan: e.target.value})}
                          placeholder="PAN"
                        />
                        <input 
                          type="text" 
                          value={billedTo.gstin}
                          onChange={(e) => setBilledTo({...billedTo, gstin: e.target.value})}
                          placeholder="GSTIN"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={billedTo.pos}
                        onChange={(e) => setBilledTo({...billedTo, pos: e.target.value})}
                        placeholder="Place of Supply"
                      />
                    </div>
                  ) : (
                    <div className="customer-details">
                      <p className="customer-name">{billedTo.name}</p>
                      <p className="customer-address">{billedTo.address}</p>
                      <p className="customer-address">{billedTo.city}</p>
                      <p className="customer-contact">
                        Contact: {billedTo.contact} (Mobile - {billedTo.mobile})
                      </p>
                      <p className="customer-tax">
                        PAN: {billedTo.pan}
                      </p>
                      <p className="customer-tax">
                        GSTIN: {billedTo.gstin}
                      </p>
                      <p className="customer-pos">
                        Place of Supply: {billedTo.pos}
                      </p>
                    </div>
                  )}
                </div>

                {/* Shipped To */}
                {invoiceType !== "accounting" && (
                <div className="customer-card">
                  <div className="customer-card-header">
                    <h3>Shipped To:</h3>
                    <button 
                      className="edit-btn"
                      onClick={() => setEditShipped(!editShipped)}
                    >
                      {editShipped ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  
                  {editShipped ? (
                    <div className="customer-edit-form">
                      <input 
                        type="text" 
                        value={shippedTo.name}
                        onChange={(e) => setShippedTo({...shippedTo, name: e.target.value})}
                        placeholder="Company Name"
                      />
                      <input 
                        type="text" 
                        value={shippedTo.address}
                        onChange={(e) => setShippedTo({...shippedTo, address: e.target.value})}
                        placeholder="Address"
                      />
                      <input 
                        type="text" 
                        value={shippedTo.city}
                        onChange={(e) => setShippedTo({...shippedTo, city: e.target.value})}
                        placeholder="City"
                      />
                      <div className="form-row">
                        <input 
                          type="text" 
                          value={shippedTo.contact}
                          onChange={(e) => setShippedTo({...shippedTo, contact: e.target.value})}
                          placeholder="Contact Person"
                        />
                        <input 
                          type="text" 
                          value={shippedTo.mobile}
                          onChange={(e) => setShippedTo({...shippedTo, mobile: e.target.value})}
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="form-row">
                        <input 
                          type="text" 
                          value={shippedTo.pan}
                          onChange={(e) => setShippedTo({...shippedTo, pan: e.target.value})}
                          placeholder="PAN"
                        />
                        <input 
                          type="text" 
                          value={shippedTo.gstin}
                          onChange={(e) => setShippedTo({...shippedTo, gstin: e.target.value})}
                          placeholder="GSTIN"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={shippedTo.pos}
                        onChange={(e) => setShippedTo({...shippedTo, pos: e.target.value})}
                        placeholder="Place of Supply"
                      />
                    </div>
                  ) : (
                    <div className="customer-details">
                      <p className="customer-name">{shippedTo.name}</p>
                      <p className="customer-address">{shippedTo.address}</p>
                      <p className="customer-address">{shippedTo.city}</p>
                      <p className="customer-contact">
                        Contact: {shippedTo.contact} (Mobile - {shippedTo.mobile})
                      </p>
                      <p className="customer-tax">
                        PAN: {shippedTo.pan}
                      </p>
                      <p className="customer-tax">
                        GSTIN: {shippedTo.gstin}
                      </p>
                      <p className="customer-pos">
                        Place of Supply: {shippedTo.pos}
                      </p>
                    </div>
                  )}
                </div>
                )}
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
          <div className="eway-wrapper">

            {/* LEFT SIDE */}
            <div className="eway-left">
              <div className="eway-container">
                <div className="eway-header">
                  <button className="eway-btn">Create E-way Bill</button>
                </div>

                <div className="eway-form">
                  <div className="eway-field">
                    <label>E-way Bill No</label>
                    <input type="text" placeholder="Enter E-way Bill No" />
                  </div>

                  <div className="eway-field">
                    <label>E-way Bill Date</label>
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="eway-right">
              <div className="dc-summary-box">
                <div>Subtotal: ₹ {subtotal.toFixed(2)}</div>
                <div>Tax: ₹ {totalTax.toFixed(2)}</div>
                <div className="dc-total">Total: ₹ {total.toFixed(2)}</div>
              </div>

              <div className="dc-footer-actions">
                <button>Save</button>
                <button>Save & Print</button>
                <button>Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}