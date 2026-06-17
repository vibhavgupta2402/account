import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { FaTrash ,FaSearch,FaUniversity,FaTruck,FaPen,FaSave,
  FaPaperPlane,
  FaPrint,
  FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Purchase.css";

export default function Purchase() {
  const { collapsed } = useOutletContext();
  const navigate = useNavigate();
  const [purdisDate, setPurdisDate] = useState(new Date());
  const [mode, setMode] = useState("item");
  const [purchaseType, setPurchaseType] = useState("Goods");
const [invoiceRef, setInvoiceRef] = useState("");
const [invoiceRefDate, setInvoiceRefDate] = useState(new Date());
const [purchaseDate, setPurchaseDate] = useState(new Date());
const [shippingDate, setshippingDate] = useState(new Date());
const [gstin, setGstin] = useState("");
const [gstData, setGstData] = useState(null);
const [gstLoading, setGstLoading] = useState(false);
const [gstError, setGstError] = useState("");
const [editBilled, setEditBilled] = useState(false);
const [editShipped, setEditShipped] = useState(false);
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
const validateGST = async (value) => {
  if (value.length !== 15) return;

  try {
    setGstLoading(true);
    setGstError("");
    setGstData(null);

    const res = await fetch(`/api/gst/${value}`); // 🔥 your backend

    if (res.status === 200) {
      const data = await res.json();
      setGstData(data);
    } else {
      setGstError("Invalid GSTIN");
    }
  } catch (err) {
    setGstError("Error validating GSTIN");
  } finally {
    setGstLoading(false);
  }
};
const handleGSTChange = (e) => {
  const value = e.target.value.toUpperCase();

  setGstin(value);

  if (value.length === 15) {
    validateGST(value);
  } else {
    setGstData(null);
    setGstError("");
  }
};

  const [items, setItems] = useState([
  {
    id: Date.now(),
    desc: "",
    qty: "",
    rate: "",
    tax: "0"
  }
]);
  const [voucherCount, setVoucherCount] = useState(1);
  const generateVoucher = () => {
    const number = String(voucherCount).padStart(2, "0");
    return `PUR-${number}`;
  };
 const [ledgers, setLedgers] = useState([
  {
    id: 1,
    ledger: "",
    tax: "",
    amount: ""
  }
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
          <div className="header-cr">
            <div className="pur-header-grid">
              <div className="purchase-section-card">
                {/* Voucher Row */}
                 <div className="purchase-header-top">

                  <div className="purchase-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>

                  <div className="purchase-header-info">
                    <h2>Purchase</h2>

                    <div className="purchase-voucher-row">
                      <label>Voucher No:</label>

                      <span className="purchase-voucher-value">
                        {generateVoucher()}
                      </span>
                    </div>
                  </div>

                </div>
                {/* Main Grid */}
                <div className="pur-header">
                  <div className="pur-form-group">
                    <label>Type of Purchase</label>
                    <select
                      value={purchaseType}
                      onChange={(e) => setPurchaseType(e.target.value)}
                    >
                      <option>Goods</option>
                      <option>Services</option>
                      <option>Capital Goods</option>
                    </select>
                  </div>
                  <div className="pur-form-group">
                    <label>Purchase Date</label>
                    <DatePicker
                      selected={purchaseDate}
                      onChange={(date) =>setPurchaseDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // ✅ last 1 year
                      className="date-input"
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

                  <div className="pur-form-group">
                    <label>Invoice Ref No</label>
                    <input
                      value={invoiceRef}
                      onChange={(e) => setInvoiceRef(e.target.value)}
                    />
                  </div>

                  <div className="pur-form-group">
                    <label>Invoice Date</label>
                    <DatePicker
                      selected={invoiceRefDate}
                      onChange={(date) => setInvoiceRefDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="date-input"
                    />
                  </div>

                  <div className="pur-form-group">
                    <label>Voucher Mode</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                      <option value="item">Item Invoice</option>
                      <option value="accounting">Accounting Invoice</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="section-card">
            <div className="dispatch-header">
            <div className="purchase-dispatch-title">
              <div className="purchase-dispatch-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Dispatch Details</h3>
            </div>
              <div className="transporter-box">
                <label>Transporter Name</label>
                <div className="transporter-row"> 
                  <select>
                    <option>Select</option>
                  </select>
                  <button
                    className="pur-transporter-create-btn"
                    onClick={() => navigate("/Ledger")}
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className="gstin-container">
                <label>Transport GSTIN</label>
                <input 
                  value={gstin}
                  onChange={handleGSTChange}
                  placeholder="Transport GSTIN"
                />

                {/* LOADING */}
                {gstLoading && <div className="gst-status">Validating...</div>}

                {/* ERROR */}
                {gstError && <div className="gst-error">{gstError}</div>}

                {/* SUCCESS */}
                {gstData && (
                  <div className="gst-result-box">
                    <p><strong>{gstData.name}</strong></p>
                    <p>{gstData.state}</p>
                    <p>Status: {gstData.status}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="dispatch-grid">
              <div className="dis-container">
                <label>Dispatch Doc No</label>
                <input placeholder="Dispatch Doc No" />
              </div>
              <div className="veh-container">
                <label>Vehical No</label>
                <input placeholder="Vehicle No" />
              </div>
              {/* <input placeholder="Transport GSTIN" /> */}
              {/* <input placeholder="Agent Name" /> */}
              <div className="LR">
                <label>LR-RR No</label>
                <input placeholder="LR-RR No" />
              </div>
              <div className="date-container">
                <label>Date</label>
                <DatePicker
                  selected={purdisDate}
                  onChange={(date) => setPurdisDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // ✅ last 1 year
                  className="date-input"
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
                  <>
                  <div className="port">
                    <label>Port of Export</label>
                    <select>
                      <option>Select</option>
                      <option>INDEA6 - AACHIVS SEZ/NOIDA </option>
                    </select>
                    {/* <input placeholder="Port No." /> */}
                  </div>
                  {/* <div className="country">
                    <label>Country Name</label>
                    <input placeholder="Country" />
                  </div> */}
                  <div className="ship-bill">
                    <label>Shipping Bill No</label>
                    <input placeholder="Shipping Bill No" />
                  </div>
                  <div className="ship-bill">
                    <label>Shipping date</label>
                      <DatePicker
                  selected={shippingDate}
                  onChange={(date) => setshippingDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // ✅ last 1 year
                  className="date-input"
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
                    
                    
                  </>
              
            </div>
          </div>

          {/* CUSTOMER / DISPATCH SECTION */}
          <div className="section-card">
            <div className="purchase-customer">
              <div className="pay-cust-details">
                <div className="purchase-cust-icon">
                  <i className="fas fa-users"></i>
                </div>

                <h2>Supplier Details</h2>
              </div>

              <div className="purchase-search-row">
                <input placeholder="Search Supplier" />

                <button className="new-btn">
                  + New Supplier
                </button>
              </div>

            </div>

            {/* ✅ NEW SECTION ADDED (NO REPLACEMENT) */}
            {/* ================= CUSTOMER DETAILS ================= */}
            <div className="purchase-customer-details">

              {/* BILLED TO */}
              <div className="purchase-customer-card">
                <div className="customer-card-header">
                  <h3 className="pay-customer-card-title">
                    <FaUniversity />
                    Billed To:
                  </h3>
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

              {/* SHIPPED TO */}
              <div className="purchase-customer-card">
                <div className="customer-card-header">
                  <h3 className="pay-customer-card-title">
                    <FaTruck />
                    Shipped To:
                  </h3>
                  <button 
                      className="pay-edit-btn"
                      onClick={() => setEditShipped(!editShipped)}
                    >
                      <FaPen />
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((row, i) => {
                      const amount = calculateAmount(row);

                      return (
                        <tr key={row.id}>
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
                          <td className="purchase-delete-cell">
                            <button
                              className="purchase-del-btn"
                              onClick={() => {
                                setItems(
                                  items.filter(
                                    (item) => item.id !== row.id
                                  )
                                );
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgers.map((row, i) => (
                      <tr key={row.id}>
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
                        <td className="purchase-delete-cell">
                          <button
                            className="purchase-del-btn"
                            onClick={() => {
                              setLedgers(
                                ledgers.filter(
                                  (ledger) => ledger.id !== row.id
                                )
                              );
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              

              <button
                className="add-btn"
                onClick={() => {
                  if (mode === "item") {
                    setItems([
                      ...items,
                      {
                        id: Date.now(),
                        desc: "",
                        qty: "",
                        rate: "",
                        tax: "0"
                      }
                    ]);
                  } else {
                    setLedgers([
                      ...ledgers,
                      {
                        id: Date.now(),
                        ledger: "",
                        tax: "",
                        amount: ""
                      }
                    ]);
                  }
                }}
              >
                + Add Row
              </button>
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