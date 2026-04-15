  import { useState, useRef, useEffect } from "react";
  import { useOutletContext,useNavigate } from "react-router-dom";
  import { FaTrash } from "react-icons/fa";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import "../styles/SalesInvoice.css";


  export default function SalesInvoice() {
    const { collapsed } = useOutletContext();
    // ================= INVOICE =================
    const [manualEntry, setManualEntry] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState("");
    const [customer,setCustomer] = useState({});
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    const [orderDate, setOrderDate] = useState(new Date());
    const [dispatchDate, setDispatchDate] = useState(new Date());
    const [shippingDate, setshippingDate] = useState(new Date());
    // ================= TYPE + ECO =================
    const [typeOfSupply, setTypeOfSupply] = useState("");
    // NEW STATES
    const [invoiceType, setInvoiceType] = useState("item"); // item | accounting
    const [rcmApplicable, setRcmApplicable] = useState(false);

    const [openGroupDropdown, setOpenGroupDropdown] = useState(false);

    const [ledger, setLedger] = useState({
      gstin: "",
      name: "",
      address1: "",
      address2: "",
      state: "",
      group: "Sundry Debtors"   // ✅ ALWAYS DEFAULT
    });

    const [groupList, setGroupList] = useState([]);
    useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("ledgerGroups")) || [];

    setGroupList(savedGroups);

    // ✅ ensure default always set
    setLedger((prev) => ({
      ...prev,
      group: prev.group || "Sundry Debtors"
    }));
  }, []);

  const fetchGSTDetails = async (gstin) => {
  if (gstin.length !== 15) return;

  try {
    const res = await fetch(`/api/gst/${gstin}`);

    if (res.status === 200) {
      const data = await res.json();

      setLedger((prev) => ({
        ...prev,
        name: data.name || "",
        address1: data.address1 || "",
        address2: data.address2 || "",
        state: data.state || ""
      }));
    }
  } catch (err) {
    console.log("GST Fetch Error:", err);
  }
};

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
    const [registrationType, setRegistrationType] = useState("E-commerce operator");

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
  const [gstin, setGstin] = useState("");
const [gstData, setGstData] = useState(null);
const [gstLoading, setGstLoading] = useState(false);
const [gstError, setGstError] = useState("");
const [showCustomerPopup, setShowCustomerPopup] = useState(false);

const navigate = useNavigate();
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
  const [currentCount, setCurrentCount] = useState(1);
  // const generateInvoice = () => {
  //   const { prefix, zero } = invoiceConfig;

  //   const zeroCount = Number(zero) || 0;   // convert HERE only
  //   const zeros = "0".repeat(zeroCount);
  //   const number = zeros + String(currentCount);
  //   return `${prefix}/${number}`;
  // };
  const generateInvoice = () => {
  const { prefix, zero } = invoiceConfig;
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
    setInvoiceNo(generateInvoice());
  }
}, [currentCount, invoiceConfig, manualEntry]);


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

  useEffect(() => {
  const handleClickOutside = () => {
    setOpenStateDropdown(false);
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

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
                      {/* <input
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        placeholder="Tax/2025-26/001"
                        readOnly={!manualEntry}
                      /> */}
                      <input
                        value={invoiceNo}
                        readOnly={!manualEntry}
                        // placeholder="Tax/2025-26/0001"
                        maxLength={16}
                        onChange={(e) => {
                        let value = e.target.value;
                        // 🔥 MANUAL MODE → full freedom
                        if (manualEntry) {
                          setInvoiceNo(value);
                          return;
                        }
                        // 🔥 AUTO MODE → prefix lock
                        const prefix = invoiceConfig.prefix + "/";
                        if (!value.startsWith(prefix)) {
                          value = prefix;
                        }

                        let numberPart = value.replace(prefix, "");
                        numberPart = numberPart.replace(/\D/g, "");
                        numberPart = numberPart.slice(0, 4);

                        value = prefix + numberPart;
                        setInvoiceNo(value);
                      }}
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
                  
                </div>
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
                                setInvoiceNo("");   // 🔥 CLEAR INPUT
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
                              value={invoiceConfig.prefix}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value.length > 11) value = value.slice(0, 11);

                                setInvoiceConfig({ ...invoiceConfig, prefix: value });
                              }}
                            />
                          </div>

                          <div className="popup-group">
                            <label>Zero Padding</label>
                            <input
                              type="number"
                              min="0"
                              max="4"
                              value={invoiceConfig.zero}
                              onChange={(e) => {
                                let val = Number(e.target.value) || 0;
                                if (val > 4) val = 4;

                                setInvoiceConfig({ ...invoiceConfig, zero: val });
                              }}
                            />
                          </div>

                          <div className="popup-group">
                            <label>Start No</label>
                            <input
                              type="number"
                              value={invoiceConfig.start}
                              onChange={(e) => {
                                let val = Math.max(0, Number(e.target.value) || 0);
                                setInvoiceConfig({ ...invoiceConfig, start: val });
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
                              (Number(invoiceConfig.zero) || 0) + String(invoiceConfig.start).length > 4
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
                <div className="type-supply-container">
                  <div className="form-group">
                    <label>Voucher Mode</label>
                    <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)}>
                      <option value="item">Item Invoice</option>
                      <option value="accounting">Accounting Invoice</option>
                    </select>
                  </div>
                  <div className="rcm-form-group">
                    <label>RCM Applicable</label>
                    <select onChange={(e) => setRcmApplicable(e.target.value === "yes")}>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {/* TYPE */}
                  <div className="type-form-group">
                    <label>Type of Supply:</label>
                    <select value={typeOfSupply} onChange={(e) => setTypeOfSupply(e.target.value)}>
                      <option value="Outward">Outward Supply</option>
                      <option value="Export_with_payment">Export with payment</option>
                      <option value="Export_without_payment">Export without payment</option>
                      <option value="SEZ">SEZ supply</option>
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
                        <h4>Create ECO</h4>

                        <div className="eco-form">

                          {/* LEFT */}
                          <div className="eco-left">

                            <div className="eco-field">
                              <label>GSTIN</label>
                              <div className="eco-inline">
                                <input
                                  placeholder="Enter GSTIN"
                                  value={ledger.gstin}
                                  maxLength={15}
                                  onChange={(e) => {
                                    const value = e.target.value.toUpperCase();
                                    setLedger({ ...ledger, gstin: value });
                                    fetchGSTDetails(value);
                                  }}
                                />
                                <span className="eco-auto">
                                  {ledger.gstin.length === 15 ? "Fetching..." : "Auto"}
                                </span>
                              </div>
                            </div>

                            <div className="eco-field">
                              <label>Name</label>
                              <input
                                placeholder="Enter Name"
                                value={ledger.name}
                                onChange={(e) =>
                                  setLedger({ ...ledger, name: e.target.value })
                                }
                              />
                            </div>

                            <div className="eco-field">
                              <label>Address</label>
                              <input
                                placeholder="Address Line 1"
                                value={ledger.address1}
                                onChange={(e) =>
                                  setLedger({ ...ledger, address1: e.target.value })
                                }
                              />
                              <input
                                placeholder="Address Line 2"
                                value={ledger.address2}
                                onChange={(e) =>
                                  setLedger({ ...ledger, address2: e.target.value })
                                }
                              />
                            </div>

                            <div className="eco-field">
                              <label>State</label>
                              <input
                                placeholder="Select State"
                                value={ledger.state}
                                onChange={(e) =>
                                  setLedger({ ...ledger, state: e.target.value })
                                }
                              />
                            </div>

                          </div>

                          {/* RIGHT */}
                          <div className="eco-right">

                            <div className="eco-field">
                              <label>Type</label>
                              <input
                                value={customer?.registration || "E-commerce operator"}
                                readOnly
                              />
                            </div>

                            {/* GROUP DROPDOWN */}
                            <div className="eco-field">
                              <label>Group</label>

                              <div className="eco-select">

                                <div
                                  className="eco-select-box"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenGroupDropdown(!openGroupDropdown);
                                  }}
                                >
                                  {ledger.group || "Sundry Debtors"}
                                </div>

                                {openGroupDropdown && (
                                  <div className="eco-select-dropdown">

                                    {(groupList.length ? groupList : ["Sundry Debtors"]).map((grp) => (
                                      <div
                                        key={grp}
                                        className="eco-option"
                                        onClick={() => {
                                          setLedger({ ...ledger, group: grp });
                                          setOpenGroupDropdown(false);
                                        }}
                                      >
                                        {grp}
                                      </div>
                                    ))}

                                  </div>
                                )}

                              </div>
                            </div>

                            <div className="eco-field">
                              <label>Opening Balance</label>
                              <div className="eco-inline">
                                <input placeholder="0.00" />
                                <select>
                                  <option>Dr</option>
                                  <option>Cr</option>
                                </select>
                              </div>
                            </div>

                          </div>

                        </div>

                        {/* ACTION */}
                        <div className="eco-actions">
                          <button
                            className="eco-cancel"
                            onClick={() => setShowEcoEditor(false)}
                          >
                            Cancel
                          </button>

                          <button
                            className="eco-save"
                            onClick={() => {
                              console.log("ECO DATA:", ledger);

                              const existing = JSON.parse(localStorage.getItem("ecoList")) || [];
                              localStorage.setItem("ecoList", JSON.stringify([...existing, ledger]));

                              setShowEcoEditor(false);
                            }}
                          >
                            Save
                          </button>
                        </div>

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
                  <DatePicker
                    selected={invoiceDate}
                    onChange={(date) => setInvoiceDate(date)}
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

                <div className="form-group">
                  <label>Order Date</label>
                  <DatePicker
                    selected={orderDate}
                    onChange={(date) => setOrderDate(date)}
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
                <div className="form-group">
                  <label>Salesman/Agent</label>
                  <select>
                    <option>Select</option>
                  </select>
                </div>

              </div>

            </div>

            {/* ================= DISPATCH ================= */}
            {invoiceType !== "accounting" && (
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
                      onClick={() => navigate("/ledger")}
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
                    selected={dispatchDate}
                    onChange={(date) => setDispatchDate(date)}
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
                
                {/* 🔥 EXPORT / SEZ EXTRA FIELDS */}
                  {(typeOfSupply === "Export_with_payment" || 
                    typeOfSupply === "Export_without_payment" ||
                    typeOfSupply === "SEZ") && (
                    
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
                      
                      {/* ONLY FOR EXPORT WITHOUT PAYMENT */}
                      {typeOfSupply === "Export_without_payment" && (
                        <div className="LUT">
                          <label>LUT / Bond No</label>
                          <input placeholder="LUT / Bond No" />
                        </div>
                      )}
                    </>
                  )}
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

                let igst = 0;
                let cgst = 0;
                let sgst = 0;

                if (typeOfSupply === "Outward") {
                  cgst = gst / 2;
                  sgst = gst / 2;
                }

                if (typeOfSupply === "Export_with_payment") {
                  igst = gst;
                }

                if (typeOfSupply === "Export_without_payment") {
                  igst = 0;
                  cgst = 0;
                  sgst = 0;
                }

                if (typeOfSupply === "SEZ") {
                  igst = gst; // can refine later
                }

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