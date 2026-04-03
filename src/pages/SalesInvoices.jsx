  import { useState, useRef, useEffect } from "react";
  import { useOutletContext } from "react-router-dom";
  import { FaTrash } from "react-icons/fa";
  import "../styles/SalesInvoice.css";

  export default function SalesInvoice() {
    const { collapsed } = useOutletContext();
    // ================= INVOICE =================
    const [manualEntry, setManualEntry] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState("");
    // ================= TYPE + ECO =================
    const [typeOfSupply, setTypeOfSupply] = useState("");
    // NEW STATES
    const [invoiceType, setInvoiceType] = useState("item"); // item | accounting
    const [rcmApplicable, setRcmApplicable] = useState(false);

    // ================= ITEMS =================
    const [items, setItems] = useState([
      { description: "", hsn: "", qty: "", rate: "", discount: "", tax: "", amount: "" }
    ]);
    const ecoRef = useRef(null);
    // ================= CUSTOMER =================
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
    // const [shippedTo, setShippedTo] = useState({ ...billedTo });

    const [ecoOptions, setEcoOptions] = useState([
    "Amazon",
    "Flipkart",
    "Meesho",
    "Blinkit"
    ]);

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
    const [showInvoiceSettings, setShowInvoiceSettings] = useState(false);

  const [invoiceConfig, setInvoiceConfig] = useState({
    prefix: "Tax/2025-26",
    zero: '',
    start: '',
    manual_pre: false
  });
  const [voucherCount, setVoucherCount] = useState(1);
  const generateVoucher = () => {
    const number = String(voucherCount).padStart(2, "0");
    return `SAL-${number}`;
  };
  const handleSave = () => {
    setCurrentCount(prev => prev + 1);
    setVoucherCount(prev => prev + 1);
  };
  const [currentCount, setCurrentCount] = useState(1);
  const generateInvoice = () => {
    const { prefix, zero } = invoiceConfig;

    const zeroCount = Number(zero) || 0;   // convert HERE only
    const zeros = "0".repeat(zeroCount);

    const number = zeros + String(currentCount);

    return `${prefix}/${number}`;
  };
  useEffect(() => {
    if (!invoiceConfig.manual) {
      setInvoiceNo(generateInvoice());
    }
  }, [currentCount, invoiceConfig]);


    const [selectedEco, setSelectedEco] = useState("");
    const [newEco, setNewEco] = useState("");
    const [showEcoEditor, setShowEcoEditor] = useState(false);

    const [editBilled, setEditBilled] = useState(false);
    const [editShipped, setEditShipped] = useState(false);
    const addRow = () => {
    setItems([
      ...items,
      {
        description: "",
        hsn: "",
        qty: "",
        rate: "",
        discount: "",
        tax: 0,
        amount: 0
      }
    ]);
  };

  /* ✅ ADD THIS HERE */
  useEffect(() => {
    if (rcmApplicable) {
      const updated = items.map(item => ({
        ...item,
        tax: 0
      }));
      setItems(updated);
    }
  }, [rcmApplicable]);

  /* YOUR EXISTING USEEFFECT */
    useEffect(() => {
    function handleClickOutside(event) {
      if (ecoRef.current && !ecoRef.current.contains(event.target)) {
        setShowEcoEditor(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    return (
      <div className="sales-invoice-app">
        <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
          <div className="invoice-wrapper">
            <h2>Sale Invoice</h2>
            
            {/* ================= SALE SECTION ================= */}
            <div className="section-card">
              <div className="sale-header">
              <div className="voucher-row">
                    <label>Voucher No:</label>
                    <span className="voucher-value">{generateVoucher()}</span>
                  </div>
                {/* ================= HEADER ================= */}
                <div className="invoice-header-section">
                  
                  <div className="invoice-row">
                  {/* Invoice No */}
                  <div className="invoice-no-group">
                    <label>Invoice No</label>

                    <div className="invoice-input-box">
                      <input
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        placeholder="Tax/2025-26/001"
                        readOnly={!manualEntry}
                      />

                      {/* ⚙️ SETTINGS ICON */}
                      <button
                        className="settings-btn"
                        onClick={() => setShowInvoiceSettings(true)}
                      >
                        ⚙️
                      </button>
                    </div>
                  </div>

                  {/* Manual */}
                  <div className="manual-field">
                    <label>Manual:</label>

                    <div className="manual-options">
                      <label>
                        <input
                          type="radio"
                          checked={manualEntry}
                          onChange={() => setManualEntry(true)}
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          checked={!manualEntry}
                          onChange={() => setManualEntry(false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                  {showInvoiceSettings && (
                    <div className="invoice-popup-overlay">

                      <div className="invoice-popup">
                        <h3>Invoice Settings</h3>

                        <div className="popup-group full">
                          <label>Prefix</label>
                          <input className="popup-input-box"
                            value={invoiceConfig.prefix}
                            onChange={(e) =>
                              setInvoiceConfig({ ...invoiceConfig, prefix: e.target.value })
                            }
                          />
                        </div>

                        <div className="popup-group">
                          <label>Zero Padding</label>
                          <input className="popup-input-box"
                              type="number"
                              min="0"
                              value={invoiceConfig.zero}
                              onChange={(e) => {
                                const val = e.target.value;

                                setInvoiceConfig({
                                  ...invoiceConfig,
                                  zero: val === "" ? "" : val
                                });
                              }}
                            />
                        </div>

                        <div className="popup-group">
                          <label>Start No</label>
                          <input className="popup-input-box"
                            type="number"
                            value={invoiceConfig.start}
                            onChange={(e) => {
                              const val = e.target.value;

                              // store raw value (string)
                              setInvoiceConfig({
                                ...invoiceConfig,
                                start: val === "" ? "" : val
                              });

                              // update counter only if valid number
                              if (val !== "") {
                                setCurrentCount(Number(val));
                              }
                            }}
                          />
                        </div>

                        <div className="popup-actions">
                          <button onClick={() => setShowInvoiceSettings(false)}>Cancel</button>
                          <button onClick={() => setShowInvoiceSettings(false)}>Save</button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
                <div className="type-supply-container">
                  <div className="form-group">
                    <label>Voucher Mode</label>
                    <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)}>
                      <option value="item">Item Invoice</option>
                      <option value="accounting">Accounting Invoice</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>RCM Applicable</label>
                    <select onChange={(e) => setRcmApplicable(e.target.value === "yes")}>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {/* TYPE */}
                  <div className="form-group">
                    <label>Type of Supply:</label>
                    <select value={typeOfSupply} onChange={(e) => setTypeOfSupply(e.target.value)}>
                      <option>Outward Supply</option>
                      <option>Export with payment</option>
                      <option>Export without payment</option>
                      <option>SEZ supply</option>
                    </select>
                  </div>

                  {/* ECO */}
                  <div className="eco-wrapper" ref={ecoRef}>

                    <label>ECO:</label>

                    <div className="eco-inline">

                      <select
                        value={selectedEco}
                        onChange={(e) => setSelectedEco(e.target.value)}
                      >
                        <option value="">Select ECO</option>
                        {ecoOptions.map((eco, i) => (
                          <option key={i}>{eco}</option>
                        ))}
                      </select>

                      {/* EDIT BUTTON */}
                      <button
                        className="eco-edit-btn"
                        onClick={() => setShowEcoEditor(!showEcoEditor)}
                      >
                        ✏️
                      </button>

                    </div>

                    {/* 🔥 DROPDOWN EDIT PANEL */}
                    {showEcoEditor && (
                      <div className="eco-dropdown-panel">

                        {/* ADD */}
                        <div className="eco-add-row">
                          <input
                            value={newEco}
                            onChange={(e) => setNewEco(e.target.value)}
                            placeholder="Enter ECO name"
                          />
                          <button
                            onClick={() => {
                              if (newEco.trim()) {
                                setEcoOptions([...ecoOptions, newEco]);
                                setNewEco("");
                                setShowEcoEditor(false);
                              }
                            }}
                          >
                            Add
                          </button>
                        </div>

                        {/* LIST */}
                        {ecoOptions.map((eco, index) => (
                          <div key={index} className="eco-item-row">

                            <span>{eco}</span>

                            <button
                              onClick={() => {
                                const updated = ecoOptions.filter((_, i) => i !== index);
                                setEcoOptions(updated);

                                // remove selection if deleted
                                if (eco === selectedEco) {
                                  setSelectedEco("");
                                }
                              }}
                            >
                              ❌
                            </button>

                          </div>
                        ))}

                      </div>
                    )}

                  </div>

                </div>

              </div>

              <div className="sale-grid">
                <div className="form-group">
                  <label>Order Number</label>
                  <select>
                    <option>Select</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Invoice Date</label>
                  <input type="date" />
                </div>

                <div className="form-group">
                  <label>Order Date</label>
                  <input type="date" />
                </div>

              </div>

            </div>

            {/* ================= DISPATCH ================= */}
            {invoiceType !== "accounting" && (
            <div className="section-card">

              <h2>Dispatch Details</h2>

              <div className="dispatch-grid">

                <input placeholder="Dispatch Doc No" />
                <input placeholder="Vehicle No" />
                <input placeholder="Transport GSTIN" />
                {/* <input placeholder="Agent Name" /> */}
                <input placeholder="LR-RR No" />
                <input type="date" />
              </div>
            </div>
            )}
            {/* ================= CUSTOMER ================= */}
            <div className="section-card">
              <h2>Customer Details</h2>
              <div className="search-customer">
                <label>Search Customer Name</label>
                <div className="search-box">
                  <input type="text" placeholder="Search customer..." />
                  <button className="new-customer-btn">New Customer</button>
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

            {/* ================= ITEMS ================= */}
            <div className="section-card">
              <h2>Items</h2>

              {invoiceType === "item" ? (
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

                      const amount = rcmApplicable
                        ? base   // 🚨 GST disabled
                        : base + (base * tax) / 100;

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
                          <td><input onChange={(e) => {
                            const d = [...items]; d[i].description = e.target.value; setItems(d);
                          }} /></td>

                          <td><input /></td>

                          <td><input type="number" onChange={(e) => {
                            const d = [...items]; d[i].qty = e.target.value; setItems(d);
                          }} /></td>

                          <td><input type="number" onChange={(e) => {
                            const d = [...items]; d[i].rate = e.target.value; setItems(d);
                          }} /></td>

                          <td><input type="number" onChange={(e) => {
                            const d = [...items]; d[i].discount = e.target.value; setItems(d);
                          }} /></td>

                          <td>
                            <select
                              disabled={rcmApplicable}   // 🚨 disable tax
                              onChange={(e) => {
                                const d = [...items]; d[i].tax = e.target.value; setItems(d);
                              }}
                            >
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                            </select>
                          </td>

                          <td><input value={amount.toFixed(2)} readOnly /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              ) : (
                /* 🔥 ACCOUNTING INVOICE MODE */
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Action</th> 
                      <th>Ledger</th>
                      <th>Tax Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => deleteRow(i)}
                          >
                            <FaTrash />
                          </button>
                        </td>

                        {/* Ledger */}
                        <td>
                          <input
                            placeholder="Purchase A/c"
                            onChange={(e) => {
                              const d = [...items];
                              d[i].ledger = e.target.value;
                              setItems(d);
                            }}
                          />
                        </td>

                        {/* Tax */}
                        <td>
                          <select
                            disabled={rcmApplicable}
                            value={rcmApplicable ? 0 : item.tax || 0}
                            onChange={(e) => {
                              const d = [...items];
                              d[i].tax = Number(e.target.value);
                              setItems(d);
                            }}
                          >
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                          </select>
                        </td>

                        {/* Amount (MAIN FIX) */}
                        <td>
                          <input
                            type="number"
                            value={item.amount || ""}
                            onChange={(e) => {
                              const d = [...items];
                              d[i].amount = Number(e.target.value);   // ✅ IMPORTANT
                              setItems(d);
                            }}
                          />
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <button onClick={addRow}>+ Add Item</button>
            </div>

            {/* ================= SUMMARY ================= */}
            <div className="tax-summary-box">
              {(() => {

                let sub = 0;
                let gst = 0;

                if (invoiceType === "item") {
                  // ✅ NORMAL ITEM LOGIC
                  // sub = items.reduce((s, i) => s + (i.qty * i.rate || 0), 0);
                  sub = items.reduce((s, i) => {
                    const qty = Number(i.qty) || 0;
                    const rate = Number(i.rate) || 0;
                    const discount = Number(i.discount) || 0;
                    return s + (qty * rate - discount);
                  }, 0);

                  gst = items.reduce((s, i) => {
                    const base = (i.qty * i.rate || 0) - (i.discount || 0);
                    return rcmApplicable ? s : s + (base * (i.tax || 0)) / 100;
                  }, 0);

                } else {
                  // 🔥 ACCOUNTING MODE LOGIC
                  sub = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);

                  gst = items.reduce((s, i) => {
                    const amt = Number(i.amount) || 0;
                    return rcmApplicable ? s : s + (amt * (i.tax || 0)) / 100;
                  }, 0);
                }

                const igst = typeOfSupply === "Export with payment" ? gst : 0;
                const cgst = typeOfSupply !== "Export with payment" ? gst / 2 : 0;
                const sgst = typeOfSupply !== "Export with payment" ? gst / 2 : 0;

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