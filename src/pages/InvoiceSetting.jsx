import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Settings2,
  FileText,
  FolderCog,
  Hash,
  Printer,
  Receipt
} from "lucide-react";

import "../styles/InvoiceSettings.css";

const invoiceMenu = [
  {
    key: "default",
    label: "Default Settings",
    icon: <Settings2 size={16} />
  },

  {
    key: "createBook",
    label: "Create Invoice Book",
    icon: <FileText size={16} />
  },

  {
    key: "alterBook",
    label: "Alter / Delete Book",
    icon: <FolderCog size={16} />
  },

  {
    key: "voucher",
    label: "Voucher Number",
    icon: <Hash size={16} />
  },
  {
    key: "invoice-ref",
    label: "Invoice Ref Number",
    icon: <Receipt size={16} />
  },

  {
    key: "printing",
    label: "Invoice Printing",
    icon: <Printer size={16} />
  }
];

export default function InvoiceSettings() {
    const { collapsed } = useOutletContext();
    const [showInvoiceSettings, setShowInvoiceSettings] = useState(false);
    const [manualEntry, setManualEntry] = useState(false);
    const [currentCount, setCurrentCount] = useState(1);
    const [crNo, setCrNo] = useState("");
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
         setCrNo(generateInvoice());
       }
     }, [currentCount, crConfig, manualEntry]);

     const [printingSettings, setPrintingSettings] = useState({
      invoiceTitle: "TAX INVOICE",
      pageSize: "A4",
      orientation: "Portrait",
      pageType: "Original",
      copies: 1,
      template: "Modern Blue",

      companyName: true,
      companyAddress: true,
      companyLogo: true,
      contactPerson: true,
      contactNumber: true,
      companyEmail: true,
      website: true,
      stateCountry: true,

      partyName: true,
      partyAddress: true,
      partyPerson: true,
      partyPhone: true,
      partyEmail: true,
      partyGST: true,
      partySupply: true,

      qrCode: false,
      eInvoiceQR: false,
      eWayQR: false,
      dispatchDetails: false,

      terms: ""
});
const handlePrintingChange = (key, value) => {
  setPrintingSettings((prev) => ({
    ...prev,
    [key]: value
  }));
};

const handleToggle = (key) => {
  setPrintingSettings((prev) => ({
    ...prev,
    [key]: !prev[key]
  }));
};
const [defaultSettings, setDefaultSettings] = useState({
  rcm: false,
  orderDetails: true,
  eco: false,
  dispatch: false,
  shippedTo: true,
  discount: true,
  taxColumn: true,
  salesman: false,
  narration: true,
  eway: false,
  dueDate: true,
  einvoice: false,
  roundOff: true,
  gstEnable: true
});
const handleDefaultToggle = (key) => {
  setDefaultSettings((prev) => ({
    ...prev,
    [key]: !prev[key]
  }));
};

  const [activeTab, setActiveTab] = useState("default");

  return (
<div className={`main ${collapsed ? "collapsed" : ""}`}>
    <div className="invoice-page">

      {/* =======================================
          SIDEBAR
      ======================================= */}
      <div className="invoice-sidebar">
        <div className="invoice-sidebar-top">
          <h2>Invoice</h2>
          <p>Voucher settings</p>
        </div>
        <div className="invoice-menu">
          {invoiceMenu.map((item) => (
            <button
              key={item.key}
              className={`invoice-menu-btn 
              ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* =======================================
          CONTENT
      ======================================= */}
      <div className="invoice-content">
        {/* HEADER */}
        <div className="invoice-header">
          <div>
            <h1>
              {
                invoiceMenu.find(
                  (m) => m.key === activeTab
                )?.label
              }
            </h1>
            <p>
              Manage invoice preferences
            </p>
          </div>
          <div className="invoice-header-actions">
            <button className="restore-btn">
              Restore
            </button>
            <button className="save-btn">
              Save
            </button>
          </div>
        </div>
        {/* =======================================
            BODY
        ======================================= */}
        <div className="invoice-card">
          {/* DEFAULT SETTINGS */}
          {activeTab === "default" && (
            <div className="toggle-grid">
              {[
                ["RCM Enable", "rcm"],
                ["Order Details", "orderDetails"],
                ["ECO Enable", "eco"],
                ["Dispatch Details", "dispatch"],
                ["Shipped To", "shippedTo"],
                ["Discount Column", "discount"],
                ["Tax Column", "taxColumn"],
                ["Salesman", "salesman"],
                ["Narration", "narration"],
                ["E-Way Bill", "eway"],
                ["Due Date", "dueDate"],
                ["E-Invoice", "einvoice"],
                ["Round Off", "roundOff"],
                ["GST Enable", "gstEnable"]
              ].map(([label, key]) => (
                <div
                  className="toggle-item"
                  key={key}
                >
                  <span>{label}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={defaultSettings[key]}
                      onChange={() => handleDefaultToggle(key)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* CREATE BOOK */}
          {activeTab === "createBook" && (
            <div className="compact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input/>
                </div>
                <div className="form-group">
                  <label>Under</label>
                  <input placeholder='sale'></input>
                

                  {/* <select>
                    <option>Sale</option>
                  </select> */}
                </div>
              </div>
              <div className="form-actions">
                <button className="save-btn">
                  Save
                </button>
              </div>
            </div>
          )}
          {/* ALTER BOOK */}
          {activeTab === "alterBook" && (
            <div className="compact-form">
              <div className="form-group">
                <label>Select Invoice Book</label>
                <select>
                  <option>Sales Book</option>
                  <option>GST Invoice</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="restore-btn">
                  Alter
                </button>
                <button className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* VOUCHER */}
          {activeTab === "voucher" && (
            // <div className="compact-form">
            //   <div className="form-row">
            //     <div className="form-group">
            //       <label>Voucher Type</label>
            //       <select>
            //         <option>Automatic</option>
            //         <option>Manual</option>
            //       </select>
            //     </div>
            //     <div className="form-group">
            //       <label>Prefix</label>
            //       <input placeholder="SAL" />
            //     </div>
            //   </div>
            //   <div className="form-row">
            //     <div className="form-group">
            //       <label>Zero Padding</label>
            //       <input placeholder="5" />
            //     </div>
            //     <div className="form-group">
            //       <label>Start Number</label>
            //       <input placeholder="1" />
            //     </div>
            //   </div>
            // </div>
            <div className="compact-form">
              <div className="form-row">
                {/* <h3>Invoice Settings</h3> */}

                <div className="form-group">
                  <label>Manual:</label>
                  <div className="setting-popup-radio">
                    <label>
                      <input
                        type="radio"
                        checked={manualEntry}
                        onChange={() => {
                          setManualEntry(true);
                          setCrNo("");   // 🔥 CLEAR INPUT
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
                  <div className="form-group">
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

                  <div className="form-group">
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

                  <div className="form-group">
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
          {activeTab === "invoice-ref" && (
            // <div className="compact-form">
            //   <div className="form-row">
            //     <div className="form-group">
            //       <label>Voucher Type</label>
            //       <select>
            //         <option>Automatic</option>
            //         <option>Manual</option>
            //       </select>
            //     </div>
            //     <div className="form-group">
            //       <label>Prefix</label>
            //       <input placeholder="SAL" />
            //     </div>
            //   </div>
            //   <div className="form-row">
            //     <div className="form-group">
            //       <label>Zero Padding</label>
            //       <input placeholder="5" />
            //     </div>
            //     <div className="form-group">
            //       <label>Start Number</label>
            //       <input placeholder="1" />
            //     </div>
            //   </div>
            // </div>
            <div className="compact-form">
              <div className="form-row">
                {/* <h3>Invoice Settings</h3> */}

                <div className="form-group">
                  <label>Manual:</label>
                  <div className="setting-popup-radio">
                    <label>
                      <input
                        type="radio"
                        checked={manualEntry}
                        onChange={() => {
                          setManualEntry(true);
                          setCrNo("");   // 🔥 CLEAR INPUT
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
                  <div className="form-group">
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

                  <div className="form-group">
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

                  <div className="form-group">
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

          {/* PRINTING */}
          {/* {activeTab === "printing" && (
            <div className="compact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Invoice Title</label>
                  <select>
                    <option>TAX INVOICE</option>
                    <option>GST INVOICE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Page Size</label>
                  <select>
                    <option>A4</option>
                    <option>A5</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Orientation</label>
                  <select>
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Template</label>
                  <select>
                    <option>Modern Blue</option>
                  </select>
                </div>
              </div>
            </div>
          )} */}
          {/* PRINTING */}
          {activeTab === "printing" && (
            <div className="printing-layout">
              {/* =====================================
                  PAGE SETTINGS
              ===================================== */}
              <div className="printing-section">
                <div className="printing-title">
                  <h3>Page Settings</h3>
                </div>
                <div className="printing-grid">
                  <div className="printing-group">
                    <label>Invoice Title</label>
                    <select
                      value={printingSettings.invoiceTitle}
                      onChange={(e) =>
                        handlePrintingChange(
                          "invoiceTitle",
                          e.target.value
                        )
                      }
                    >
                      <option>TAX INVOICE</option>
                      <option>GST INVOICE</option>
                      <option>INVOICE</option>
                      <option>MANNUAL</option>
                    </select>
                  </div>
                  <div className="printing-group">
                    <label>Page Size</label>
                    <select>
                      <option>A4</option>
                      <option>A5</option>
                      <option>Legal</option>
                    </select>
                  </div>
                  <div className="printing-group">
                    <label>Orientation</label>
                    <select>
                      <option>Portrait</option>
                      <option>Landscape</option>
                    </select>
                  </div>
                  {/* <div className="printing-group">
                    <label>Page Type</label>
                    <select>
                      <option>Original</option>
                      <option>Duplicate</option>
                      <option>Triplicate</option>
                    </select>
                  </div> */}
                  <div className="printing-group">
                    <label>No. Of Pages</label>
                    <input type="number" placeholder="1" />
                  </div>
                  <div className="printing-group">
                    <label>Type Of Pages</label>
                    <select>
                      <option>Not Applicable</option>
                      <option>Original</option>
                      <option>Duplicate</option>
                      <option>Triplicate copy</option>
                      <option>Extra copy</option>
                    </select>
                  </div>
                  <div className="printing-group">
                    <label>E-way Bill Copy</label>
                    <input type="number" placeholder="1" />
                  </div>
                  <div className="printing-group">
                    <label>Invoice Template</label>
                    <select>
                      <option>Modern Blue</option>
                      <option>Classic</option>
                    </select>
                  </div>
                  <div className="printing-group">
                    <label>Select Printer</label>
                    <select>
                      <option>Select</option>
                      {/* <option>Classic</option> */}
                    </select>
                  </div>
                </div>
              </div>

              {/* =====================================
                  COMPANY DETAILS
              ===================================== */}
              <div className="printing-section">

                <div className="printing-title">
                  <h3>Company Details</h3>
                </div>

                <div className="printing-toggle-grid">

                  {/* {[
                    "Company Name",
                    "Company Address",
                    "Company Logo",
                    "Contact Person",
                    "Contact Number",
                    "Company Email",
                    "Website",
                    "State / Country"
                  ].map((item, index) => ( */}
                  {[
                    ["Company Name", "companyName"],
                    ["Company Address", "companyAddress"],
                    ["Company Logo", "companyLogo"],
                    ["Contact Person", "contactPerson"],
                    ["Contact Number", "contactNumber"],
                    ["Company Email", "companyEmail"],
                    ["Website", "website"],
                    ["State / Country", "stateCountry"]
                  ].map(([label, key]) => (

                    <div
                      className="printing-toggle-item"
                      key={label}
                    >
                      <span>{key}</span>
                      <label className="mini-switch">
                        <input
                          type="checkbox"
                          checked={printingSettings[key]}
                          onChange={() => handleToggle(key)}
                        />
                        <span className="mini-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* =====================================
                  PARTY DETAILS
              ===================================== */}
              <div className="printing-section">
                <div className="printing-title">
                  <h3>Party Details</h3>
                </div>
                <div className="printing-toggle-grid">
                  {[
                    ["Party Name", "partyName"],
                    ["Party Address", "partyAddress"],
                    ["Contact Person", "partyPerson"],
                    ["Phone Number", "partyPhone"],
                    ["Email ID", "partyEmail"],
                    ["GSTIN / PAN", "partyGST"],
                    ["Place Of Supply", "partySupply"]
                  ].map(([label, key]) => (
                  
                    <div
                      className="printing-toggle-item"
                      key={key}
                    >
                      <span>{label}</span>
                      <label className="mini-switch">
                        <input
                          type="checkbox"
                          checked={printingSettings[key]}
                          onChange={() => handleToggle(key)}
                        />
                        <span className="mini-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* =====================================
                  ADVANCED SETTINGS
              ===================================== */}
              <div className="printing-section">
                <div className="printing-title">
                  <h3>Advanced Settings</h3>
                </div>
                <div className="printing-toggle-grid">
                  {[
                    ["QR Code", "qrCode"],
                    ["E-Invoice QR Print", "eInvoiceQR"],
                    ["E-Way Bill QR", "eWayQR"],
                    ["Dispatch Details", "dispatchDetails"]
                  ].map(([item, index]) => (
                    <div
                      className="printing-toggle-item"
                      key={index}
                    >
                      <span>{item}</span>
                      <label className="mini-switch">
                        <input
                          type="checkbox"
                          checked={printingSettings[index]}
                          onChange={() => handleToggle(index)}
                        />
                        <span className="mini-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="printing-textarea">
                  <label>Terms & Conditions</label>
                  <textarea
                    rows="3"
                    value={printingSettings.terms}
                    onChange={(e) =>
                      handlePrintingChange(
                        "terms",
                        e.target.value
                      )
                    }
                    placeholder="Enter invoice terms & conditions..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* =======================================
          PREVIEW
      ======================================= */}
      <div className="preview-panel">
        <div className="preview-top">
          <h3>Preview</h3>
          <span>Live</span>
        </div>
        {/* <div className="preview-card">
          <div className="preview-company">
            <h2>TaxMate GST</h2>
            <p>
              Meerut, Uttar Pradesh
            </p>
          </div>
          <div className="preview-line"></div>
          <div className="preview-bill">
            <div>
              <h4>Billed To</h4>
              <p>Salvia Graphics</p>
            </div>
            <div>
              <h4>Invoice</h4>
              <p>#INV-001</p>
            </div>
          </div>
          <div className="preview-table">
            <div className="preview-head">
              <span>Item</span>
              <span>Qty</span>
              <span>Amount</span>
            </div>
            <div className="preview-row">
              <span>Product</span>
              <span>2</span>
              <span>₹2500</span>
            </div>
          </div>
          <div className="preview-total">
            <span>Total</span>
            <h2>₹2500</h2>
          </div>
        </div> */}
        <div className={`preview-card ${printingSettings.orientation.toLowerCase()}`}>
          {/* COMPANY */}
          <div className="preview-company-header">
            <div className="preview-company-left">
              {printingSettings.companyName && (
                <h2>TaxMate GST Pvt Ltd</h2>
              )}
              {printingSettings.companyAddress && (
                <p>265/2 F Kuti Choraha, Meerut</p>
              )}
              {printingSettings.companyEmail && (
                <p>support@taxmate.com</p>
              )}
              {printingSettings.contactNumber && (
                <p>+91 9876543210</p>
              )}
            </div>
            {printingSettings.companyLogo && (
              <div className="preview-company-logo">
                LOGO
              </div>
            )}
          </div>
          <div className="preview-line"></div>
          {/* BILL */}
          <div className="preview-bill">
            <div>
              <h4>Billed To</h4>
              {printingSettings.partyName && (
                <p>Salvia Graphics</p>
              )}
              {printingSettings.partyAddress && (
                <p>Delhi, India</p>
              )}
              {printingSettings.partyPhone && (
                <p>+91 9988776655</p>
              )}
              {printingSettings.partyGST && (
                <p>GSTIN: 09ABCDE1234F1Z5</p>
              )}
            </div>
            <div>
              <h4>
                {printingSettings.invoiceTitle}
              </h4>
              <p>
                {crNo || "#INV-001"}
              </p>
            </div>
          </div>
          {defaultSettings.rcm && (
            <div className="preview-tag">
              RCM Applicable
            </div>
          )}
          {defaultSettings.eco && (
            <div className="preview-tag">
              ECO Enabled
            </div>
          )}
          {defaultSettings.einvoice && (
            <div className="preview-tag success">
              E-Invoice Enabled
            </div>
          )}
          {defaultSettings.eway && (
            <div className="preview-tag warning">
              E-Way Bill Attached
            </div>
          )}
          {defaultSettings.salesman && (
            <div className="preview-salesman">
              Salesman:
              <strong> Rahul Sharma</strong>
            </div>
          )}
          {defaultSettings.orderDetails && (
            <div className="preview-order-info">
              <div>
                <span>Order No</span>
                <p>#ORD-001</p>
              </div>
              <div>
                <span>Order Date</span>
                <p>24 Apr 2026</p>
              </div>
            </div>
          )}
          {defaultSettings.dispatch && (
            <div className="preview-dispatch">
              <h4>Dispatch Details</h4>
              <div className="preview-dispatch-grid">
                <div>
                  <span>Transport</span>
                  <p>Self</p>
                </div>
                <div>
                  <span>Vehicle No</span>
                  <p>UP15AB1234</p>
                </div>
                <div>
                  <span>LR No</span>
                  <p>LR0012</p>
                </div>
              </div>
            </div>
          )}
          {defaultSettings.shippedTo && (
            <div className="preview-ship">
              <h4>Shipped To</h4>
              <p>Noida Warehouse</p>
              <p>Uttar Pradesh</p>
            </div>
          )}
          {/* TABLE */}
          <div className="preview-table">
            <div
              className={`preview-head ${
                defaultSettings.taxColumn
                  ? "with-tax"
                  : ""
              }`}
            >
              <span>Item</span>
              <span>Qty</span>
              {defaultSettings.discount && (
                <span>Disc</span>
              )}
              {defaultSettings.taxColumn && (
                <span>GST</span>
              )}
              <span>Amount</span>
            </div>
            <div
              className={`preview-row ${
                defaultSettings.taxColumn
                  ? "with-tax"
                  : ""
              }`}
            >
              <span>Product</span>
              <span>2</span>
              {defaultSettings.discount && (
                <span>₹100</span>
              )}
              {defaultSettings.taxColumn && (
                <span>18%</span>
              )}
              <span>₹2500</span>
            </div>
          </div>
          {/* QR */}
          {printingSettings.qrCode && (
            <div className="preview-qr">
              QR CODE
            </div>
          )}
          {/* TERMS */}
          {printingSettings.terms && (
            <div className="preview-terms">
              <h4>Terms & Conditions</h4>
              <p>
                {printingSettings.terms}
              </p>
            </div>
          )}
          {defaultSettings.narration && (
            <div className="preview-narration">
              Thank you for your business.
            </div>
          )}
          {/* TOTAL */}
          <div className="preview-total">
            <span>Total</span>
            <div>
              {defaultSettings.roundOff && (
                <p className="roundoff-text">
                  Round Off: ₹0.50
                </p>
              )}
              <h2>₹2950</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}