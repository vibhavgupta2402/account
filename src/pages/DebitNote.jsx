import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DebitNote.css";

export default function CreditNote() {

  const { collapsed } = useOutletContext();

  // ================= HEADER =================
  const [creditNo, setCreditNo] = useState("");
  const [creditDate, setCreditDate] = useState("");
  const [originalInvoice, setOriginalInvoice] = useState("");
  const [originalDate, setOriginalDate] = useState("");
  const [type, setType] = useState("");
  const [customer,setCustomer] = useState({});
   const [showCustomerPopup, setShowCustomerPopup] = useState(false);
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
const [invoiceDate, setInvoiceDate] = useState(new Date());

  // ================= DISPATCH =================
  const [dispatch, setDispatch] = useState({
    docNo: "",
    gstin: "",
    lr: "",
    vehicle: "",
    date: ""
  });

  // ================= CUSTOMER =================
  const [editBilled, setEditBilled] = useState(false);
  const [editShipped, setEditShipped] = useState(false);

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
  const deleteRow = (index) => {
  const updated = items.filter((_, i) => i !== index);
  setItems(updated.length ? updated : [{
    description: "",
    hsn: "",
    qty: "",
    rate: "",
    discount: "",
    tax: "",
    amount: ""
  }]);
};
 

  // ================= ITEMS =================
  const [items, setItems] = useState([
    { desc: "", hsn: "", qty: "", rate: "", discount: "", tax: "" }
  ]);

  const addRow = () => {
    setItems([...items, { desc: "", hsn: "", qty: "", rate: "", discount: "", tax: "" }]);
  };

  // ================= CALC =================
  const subTotal = items.reduce((s, i) => s + (i.qty * i.rate || 0), 0);

  const taxTotal = items.reduce((s, i) => {
    const base = (i.qty * i.rate || 0) - (i.discount || 0);
    return s + (base * (i.tax || 0)) / 100;
  }, 0);

  const total = subTotal + taxTotal;

   return (
    <div className="credit-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="credit-wrapper">

          {/* HEADER */}
          <div className="header-cr">
            <h2>Debit Note</h2>
            <div className="header-grid">
              <div className="debit-section-card">
              <div className="form-group">
                <label>Dr.Note Number</label>
              <input 
                // placeholder="Dr.Note Number"
                value={creditNo}
                onChange={(e) => setCreditNo(e.target.value)}
              />
              </div>
              <div className="form-group">
                <label>Dr.Note Date</label>
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
              {/* <input 
                placeholder="Original Invoice No"
                value={originalInvoice}
                onChange={(e) => setOriginalInvoice(e.target.value)}
              />
              <input 
                type="date"
                placeholder="Original Invoice Date"
                value={originalDate}
                onChange={(e) => setOriginalDate(e.target.value)}
              /> */}
              {/* <div></div>
              <input 
                placeholder="Type of Dr.Note"
                value={type}
                onChange={(e) => setType(e.target.value)}
              /> */}
              <div className="form-group">
                <label>Type of Dr. Note</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select</option>
                  <option value="sales_return">Purchase Return</option>
                  <option value="rate_diff">Rate Difference</option>
                  <option value="discount">Discount</option>
                  <option value="tax_adjustment">Tax Adjustment</option>
                  <option value="amount">Interest</option>
                  <option value="bank">Bank Charges</option>
                </select>
              </div>
            </div>
            </div>
          </div>

          {/* DISPATCH */}
          <div className="debit-dispatch-section">
          <div className="dispatch-section">
            <h3>Dispatch Details</h3>
            <div className="grid">
              <input 
                placeholder="Dispatch Doc No"
                value={dispatch.docNo}
                onChange={(e) => setDispatch({ ...dispatch, docNo: e.target.value })}
              />
              <input 
                placeholder="Bill of Lading / LR"
                value={dispatch.lr}
                onChange={(e) => setDispatch({ ...dispatch, lr: e.target.value })}
              />
              <input 
                placeholder="Vehicle No"
                value={dispatch.vehicle}
                onChange={(e) => setDispatch({ ...dispatch, vehicle: e.target.value })}
              />
              <input 
                placeholder="Transport GSTIN"
                value={dispatch.gstin}
                onChange={(e) => setDispatch({ ...dispatch, gstin: e.target.value })}
              />
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

          {/* ================= CUSTOMER ================= */}
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
                  {/* <button 
                    className="edit-btn"
                    onClick={() => setEditBilled(!editBilled)}
                  >
                    {editBilled ? 'Save' : 'Edit'}
                  </button> */}
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
                      Contact: {billedTo.contact || 'N/A'} (Mobile - {billedTo.mobile || 'N/A'})
                    </p>
                    <p className="customer-tax">
                      PAN: {billedTo.pan || 'N/A'}
                    </p>
                    <p className="customer-tax">
                      GSTIN: {billedTo.gstin}
                    </p>
                    <p className="customer-pos">
                      Place of Supply: {billedTo.pos || 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {/* Shipped To */}
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
                      Contact: {shippedTo.contact || 'N/A'} (Mobile - {shippedTo.mobile || 'N/A'})
                    </p>
                    <p className="customer-tax">
                      PAN: {shippedTo.pan || 'N/A'}
                    </p>
                    <p className="customer-tax">
                      GSTIN: {shippedTo.gstin}
                    </p>
                    <p className="customer-pos">
                      Place of Supply: {shippedTo.pos || 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="section-card">
            <h2>Items</h2>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>S.L</th>
                  <th>Description</th>
                  <th>HSN</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const qty = Number(item.qty) || 0;
                  const rate = Number(item.rate) || 0;
                  const discount = Number(item.discount) || 0;
                  const tax = Number(item.tax) || 0;
                  const base = qty * rate - discount;
                  const amount = base + (base * tax) / 100;
                  return (
                    <tr key={i}>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteRow(i)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                      <td>{i + 1}</td>
                      <td>
                        <input
                          onChange={(e) => {
                            const d = [...items];
                            d[i].description = e.target.value;
                            setItems(d);
                          }}
                        />
                      </td>
                      <td><input /></td>
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
                        <input
                          type="number"
                          onChange={(e) => {
                            const d = [...items];
                            d[i].discount = e.target.value;
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
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
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
            <button onClick={addRow}>+ Add Item</button>
          </div>

          {/* SUMMARY */}
          <div className="tax-summary-box">
            {(() => {
              const sub = items.reduce((s, i) => {
                const qty = Number(i.qty) || 0;
                const rate = Number(i.rate) || 0;
                const discount = Number(i.discount) || 0;
                return s + (qty * rate - discount);
              }, 0);

              const gst = items.reduce((s, i) => {
                const qty = Number(i.qty) || 0;
                const rate = Number(i.rate) || 0;
                const discount = Number(i.discount) || 0;
                const tax = Number(i.tax) || 0;

                const base = qty * rate - discount;
                return s + (base * tax) / 100;
              }, 0);

              const igst = 0;
              const cgst = gst / 2;
              const sgst = gst / 2;
              const cess = 0;
              const tcs = 0;

              const totalBeforeRound = sub + igst + cgst + sgst + cess + tcs;

              const roundOff = Math.round(totalBeforeRound) - totalBeforeRound;

              const grandTotal = totalBeforeRound + roundOff;

              return (
                <>
                  <div>Sub Total: ₹ {sub.toFixed(2)}</div>
                  <div>IGST: ₹ {igst.toFixed(2)}</div>
                  <div>CGST: ₹ {cgst.toFixed(2)}</div>
                  <div>SGST: ₹ {sgst.toFixed(2)}</div>
                  <div>CESS: ₹ {cess.toFixed(2)}</div>
                  <div>TCS: ₹ {tcs.toFixed(2)}</div>
                  <div>Round Off: ₹ {roundOff.toFixed(2)}</div>
                  <div className="total">Grand Total: ₹ {grandTotal.toFixed(2)}</div>
                </>
              );
            })()}
          </div>
          {/* ================= ACTIONS ================= */}
          <div className="footer-actions">
            <button>Save</button>
            <button>Save & Send</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}