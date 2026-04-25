import { useState,useEffect } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SaleOrder.css";

export default function SaleOrder() {
  const { collapsed } = useOutletContext();

  /* ================= HEADER ================= */

  const [sodisDate, setSodisDate] = useState(new Date());
  const [soDate, setSoDate] = useState(new Date());
  const [soRef, setSoRef] = useState("");
  const navigate = useNavigate();
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
  const [soNo, setSoNo] = useState("");
    const [manualEntry, setManualEntry] = useState(false);
    const [showInvoiceSettings, setShowInvoiceSettings] = useState(false);
    const [currentCount, setCurrentCount] = useState(1);
    const [crConfig, setCrConfig] = useState({
       prefix: "Tax/2025-26",
       zero: '',
       start: '',
       manual_pre: false
     });
     const generateInvoice = () => {
    const { prefix, zero } = crConfig;
    const zeroCount = Number(zero) || 0;
    let number = String(currentCount);
    // 🔥 final output ALWAYS 4 digit
    const totalLength = zeroCount + number.length;
    if (totalLength > 4) {
      // trim number from left
      number = number.slice(0, 4 - zeroCount);
    }
    // pad remaining
    const finalNumber = "0".repeat(zeroCount) + number;
    return `${prefix}/${finalNumber}`;
  };
  useEffect(() => {
     if (!manualEntry) {
       setSoNo(generateInvoice());
     }
   }, [currentCount, crConfig, manualEntry]);
  const [voucherCount, setVoucherCount] = useState(1);
  const generateVoucher = () => {
    const number = String(voucherCount).padStart(2, "0");
    return `SO-${number}`;
  };
  /* ============= Dispatch ======================= */
  const [shippingDate, setshippingDate] = useState(new Date());
  const [gstin, setGstin] = useState("");
  const [gstData, setGstData] = useState(null);
  const [gstLoading, setGstLoading] = useState(false);
  const [gstError, setGstError] = useState("");
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
  

  return (
    <div className="sale-order-app">
      <div className={`so-main-content ${collapsed ? "collapsed" : ""}`}>
        <div className="so-wrapper">
           <h2>Sale Order</h2>

          {/* ================= HEADER ================= */}
          <div className="so-card">
            <div className="so-header-row">
              <div className="pur-voucher-row">
                <label>Voucher No:</label>
                <span className="voucher-value">{generateVoucher()}</span>
              </div>
              <div className="so-header-date">
                <label>Date :</label>
                <DatePicker
                  selected={soDate}
                  onChange={(date) => setSoDate(date)}
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
             
            </div>
            <div className="so-grid-3">

                <div className="so-form-group">
                    <label>SO No</label>
                    <div className="cr-input-box">
                        <input
                          value={soNo}
                          readOnly={!manualEntry}
                          // placeholder="Tax/2025-26/0001"
                          maxLength={16}
                          onChange={(e) => {
                          let value = e.target.value;
                          // 🔥 MANUAL MODE → full freedom
                          if (manualEntry) {
                            setSoNo(value);
                            return;
                          }
                          // 🔥 AUTO MODE → prefix lock
                          const prefix = crConfig.prefix + "/";
                          if (!value.startsWith(prefix)) {
                            value = prefix;
                          }

                          let numberPart = value.replace(prefix, "");
                          numberPart = numberPart.replace(/\D/g, "");
                          numberPart = numberPart.slice(0, 4);

                          value = prefix + numberPart;
                          setSoNo(value);
                        }}
                        />

                        {/* ⚙️ SETTINGS ICON */}
                        <button
                          className="settings-btn"
                          onClick={() => setShowInvoiceSettings(true)}
                        >
                          ⚙️
                        </button>
                        {showInvoiceSettings && (
                          <div className="invoice-popup-overlay">
                            <div className="invoice-popup">
                              <h3>Invoice Settings</h3>

                              <div className="popup-group">
                                <label>Manual:</label>
                                <div className="popup-radio">
                                  <label>
                                    <input
                                      type="radio"
                                      checked={manualEntry}
                                      onChange={() => {
                                        setManualEntry(true);
                                        setSoNo("");   // 🔥 CLEAR INPUT
                                      }}
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
                              {/* 🔥 MAIN FIX: hide all when manual = true */}
                              {!manualEntry && (
                                <>
                                <div className="popup-group full">
                                  <label>Prefix</label>
                                  <input
                                    className="popup-input-box"
                                    value={crConfig.prefix}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value.length > 11) value = value.slice(0, 11);

                                      setCrConfig({ ...crConfig, prefix: value });
                                    }}
                                  />
                                </div>

                                <div className="popup-group">
                                  <label>Zero Padding</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="4"
                                    value={crConfig.zero}
                                    onChange={(e) => {
                                      let val = Number(e.target.value) || 0;
                                      if (val > 4) val = 4;

                                      setCrConfig({ ...crConfig, zero: val });
                                    }}
                                  />
                                </div>

                                <div className="popup-group">
                                  <label>Start No</label>
                                  <input
                                    type="number"
                                    value={crConfig.start}
                                    onChange={(e) => {
                                      let val = Math.max(0, Number(e.target.value) || 0);
                                      setCrConfig({ ...crConfig, start: val });
                                      setCurrentCount(val);
                                    }}
                                  />
                                </div>
                                </>
                              )}

                              <div className="popup-actions">
                                <button onClick={() => setShowInvoiceSettings(false)}>Cancel</button>
                                <button
                                  onClick={() => {
                                    if (
                                      !manualEntry && 
                                      (Number(crConfig.zero) || 0) + String(crConfig.start).length > 4
                                    ) {
                                      alert("Zero + Start digits cannot exceed 4");
                                      return;
                                    }
                                    setShowInvoiceSettings(false);
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                </div>

                {/* <div className="so-form-group">
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
                </div> */}

                {/* <div className="so-form-group">
                    <label>SO Ref No</label>
                    <input className="so-input" onChange={(e) => setSoRef(e.target.value)} />
                </div> */}

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
          <div className="section-card">
            <div className="dispatch-header">
            <h2>Dispatch Details</h2>
              <div className="transporter-box">
                <label>Transporter Name</label>
                <div className="transporter-row"> 
                  <select>
                    <option>Select</option>
                  </select>
                  <button
                    className="transporter-create-btn"
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
                  selected={sodisDate}
                  onChange={(date) => setSodisDate(date)}
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