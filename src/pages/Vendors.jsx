// // import { useOutletContext } from "react-router-dom";
// // import React, { useState } from "react";

// // export default function Vendors() {
// //   const { collapsed } = useOutletContext();
// //   const [setCollapsed] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [settingsOpen, setSettingsOpen] = useState(false);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState(0);

// //   const [parties, setParties] = useState([
// //     { name: "Mohan", amount: "0.00" },
// //     { name: "Ravi Traders", amount: "1250.00" }
// //   ]);

// //   /* ===== ADD PARTY (EXACT HTML LOGIC) ===== */
// //   const saveParty = () => {
// //     const input = document.getElementById("pname");
// //     const name = input.value.trim();

// //     if (!name) {
// //       alert("Party Name required");
// //       return;
// //     }

// //     setParties([...parties, { name, amount: "0.00" }]);
// //     input.value = "";
// //     setModalOpen(false);
// //   };

// //   const toggleMenu = (e) => {
// //     const submenu = e.currentTarget.nextElementSibling;
// //     submenu.style.display =
// //       submenu.style.display === "block" ? "none" : "block";
// //   };

// //   return <div className={`main ${collapsed ? "collapsed" : ""}`}>
// //     <div className="Parties_main">

// //       <div className="header">
// //         <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
// //           Parties <i className="fa fa-chevron-down"></i>
// //           <div
// //             className="dropdown-menu"
// //             style={{ display: dropdownOpen ? "block" : "" }}
// //           >
// //             <div>Party Details</div>
// //             <div>Statements</div>
// //           </div>
// //         </div>

// //         <div className="settings" onClick={() => setSettingsOpen(!settingsOpen)}>
// //           <i className="fa fa-gear"></i>
// //           <div
// //             className="settings-menu"
// //             style={{ display: settingsOpen ? "block" : "" }}
// //           >
// //             <div>Add Party Group</div>
// //             <div>Shipping Address</div>
// //             <div>Manage Party Status</div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="party_main">
// //         <div className="Party_sidebar">
// //           {parties.map((p, i) => (
// //             <div key={i} className={`party ${i === 0 ? "active" : ""}`}>
// //               <span>{p.name}</span>
// //               <span>₹ {p.amount}</span>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="content">
// //           <div className="content-header">
// //             <h3>Transactions</h3>
// //             <button className="add-btn" onClick={() => setModalOpen(true)}>
// //               + Add Party
// //             </button>
// //           </div>

// //           <div className="party-card">
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Type</th>
// //                   <th>Date</th>
// //                   <th>Total</th>
// //                   <th>Balance</th>
// //                   <th></th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 <tr>
// //                   <td>Sale</td>
// //                   <td>22/01/2026</td>
// //                   <td>₹750</td>
// //                   <td>₹0</td>
// //                   <td className="row-action">
// //                     <i className="fa fa-trash delete"></i>
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ADD PARTY MODAL */}
// //       <div className={`modal ${modalOpen ? "show" : ""}`}>
// //         <div className="modal-box">
// //           <div style={{ display: "flex", justifyContent: "space-between" }}>
// //             <h3>Add Party</h3>
// //             <i className="fa fa-xmark" onClick={() => setModalOpen(false)}></i>
// //           </div>

// //           <div className="form-grid">
// //             <input id="pname" placeholder="Party Name *" />
// //             <input placeholder="GSTIN" />
// //             <input placeholder="Phone Number" />
// //           </div>

// //           <div className="tabs">
// //             <div className={`tab ${activeTab === 0 ? "active" : ""}`} onClick={() => setActiveTab(0)}>
// //               GST & Address
// //             </div>
// //             <div className={`tab ${activeTab === 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>
// //               Credit & Balance
// //             </div>
// //             <div className={`tab ${activeTab === 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>
// //               Additional Fields
// //             </div>
// //           </div>

// //           {/* TAB 1 */}
// //           <div className={`tab-content ${activeTab === 0 ? "active" : ""}`}>
// //             <div className="form-grid">
// //               <select>
// //                 <option>Unregistered / Consumer</option>
// //               </select>
// //               <select>
// //                 <option>Select State</option>
// //               </select>
// //               <input placeholder="Email" />
// //             </div>
// //             <div className="form-grid">
// //               <textarea placeholder="Billing Address"></textarea>
// //               <textarea placeholder="Shipping Address"></textarea>
// //             </div>
// //           </div>

// //           {/* TAB 2 */}
// //           <div className={`tab-content ${activeTab === 1 ? "active" : ""}`}>
// //             <div className="form-grid">
// //               <input placeholder="Credit Limit" />
// //               <input placeholder="Opening Balance" />
// //               <select>
// //                 <option>To Receive</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* TAB 3 */}
// //           <div className={`tab-content ${activeTab === 2 ? "active" : ""}`}>
// //             <div className="form-grid">
// //               <input placeholder="PAN" />
// //               <input placeholder="Custom Field 1" />
// //               <input placeholder="Custom Field 2" />
// //             </div>
// //           </div>

// //           <div className="actions">
// //             <button className="btn-outline" onClick={() => setModalOpen(false)}>
// //               Cancel
// //             </button>
// //             <button className="btn-primary" onClick={saveParty}>
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //   </div>;
// // }


// import { useOutletContext } from "react-router-dom";
// import React, { useState } from "react";

// export default function Vendors() {

//   const { collapsed } = useOutletContext();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

//   const [parties, setParties] = useState([
//     { name: "Mohan", amount: "0.00" },
//     { name: "Ravi Traders", amount: "1250.00" }
//   ]);

//   /* ===== SAVE PARTY ===== */
//   const saveParty = () => {
//     const input = document.getElementById("pname");
//     const name = input.value.trim();

//     if (!name) {
//       alert("Party Name required");
//       return;
//     }

//     setParties([...parties, { name, amount: "0.00" }]);
//     input.value = "";
//     setModalOpen(false);
//   };

//   return (
//   <div className={`main ${collapsed ? "collapsed" : ""}`}>
//   <div className="Parties_main">

//   {/* HEADER */}
//   <div className="header">

//     <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
//       Parties <i className="fa fa-chevron-down"></i>

//       <div
//         className="dropdown-menu"
//         style={{ display: dropdownOpen ? "block" : "" }}
//       >
//         <div>Party Details</div>
//         <div>Statements</div>
//       </div>
//     </div>

//     <div className="settings" onClick={() => setSettingsOpen(!settingsOpen)}>
//       <i className="fa fa-gear"></i>

//       <div
//         className="settings-menu"
//         style={{ display: settingsOpen ? "block" : "" }}
//       >
//         <div>Add Party Group</div>
//         <div>Shipping Address</div>
//         <div>Manage Party Status</div>
//       </div>
//     </div>

//   </div>

//   {/* MAIN SECTION */}
//   <div className="party_main">

//   {/* SIDEBAR */}
//   <div className="Party_sidebar">
//     {parties.map((p, i) => (
//       <div key={i} className={`party ${i === 0 ? "active" : ""}`}>
//         <span>{p.name}</span>
//         <span>₹ {p.amount}</span>
//       </div>
//     ))}
//   </div>

//   {/* CONTENT */}
//   <div className="content">

//     <div className="content-header">
//       <h3>Transactions</h3>

//       <button className="add-btn" onClick={() => setModalOpen(true)}>
//         + Add Party
//       </button>
//     </div>

//     <div className="party-card">

//       <table>
//         <thead>
//           <tr>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Total</th>
//             <th>Balance</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>Sale</td>
//             <td>22/01/2026</td>
//             <td>₹750</td>
//             <td>₹0</td>
//             <td className="row-action">
//               <i className="fa fa-trash delete"></i>
//             </td>
//           </tr>
//         </tbody>

//       </table>

//     </div>

//   </div>

//   </div>

//   {/* ===== ADD VENDOR POPUP ===== */}
//   <div className={`modal ${modalOpen ? "show" : ""}`}>

//   <div className="modal-box vendor-popup">

//   <div className="popup-header">
//     <h3>Add Vendor</h3>
//     <i className="fa fa-xmark" onClick={() => setModalOpen(false)}></i>
//   </div>

//   <div className="customer-style-form">

//   {/* LEFT SIDE */}
//   <div className="form-left">

//   <div className="gst-row">
//     <input placeholder="GSTIN / URP" />
//     <button className="get-btn">Get Data</button>
//   </div>

//   <input id="pname" placeholder="Party Name *" />

//   <input placeholder="Billing Address 1" />

//   <input placeholder="Billing Address 2" />

//   <input placeholder="Pin Code" />

//   <select>
//     <option>Select State</option>
//   </select>

//   <input placeholder="Phone Number" />

//   <input placeholder="Email ID" />

//   <input placeholder="PAN" />

//   <div className="balance-row">
//     <input placeholder="Opening Balance" />
//     <select>
//       <option>Dr</option>
//       <option>Cr</option>
//     </select>
//   </div>

//   </div>

//   {/* RIGHT SIDE */}
//   <div className="form-right">

//   <label>Registration Type</label>

//   <select>
//     <option>Select</option>
//     <option>Composition</option>
//     <option>Regular</option>
//     <option>Unregistered / Consumer</option>
//     <option>Government Entity / TDS</option>
//     <option>Regular - SEZ</option>
//     <option>Regular - Exports (EOU)</option>
//     <option>E-Commerce Operator</option>
//     <option>Input Service Distributor</option>
//     <option>Embassy / UN Body</option>
//     <option>Non Resident Taxpayer</option>
//   </select>

//   </div>

//   </div>

//   <div className="actions">

//   <button
//   className="btn-outline"
//   onClick={() => setModalOpen(false)}
//   >
//   Cancel
//   </button>

//   <button
//   className="btn-primary"
//   onClick={saveParty}
//   >
//   Save
//   </button>

//   </div>

//   </div>
//   </div>

//   </div>
//   </div>
//   );
// }

import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  CalendarDays,
  Settings2,
  Printer,
  FileSpreadsheet,
  FileText,
  Eye,
  Building2,
  BadgeIndianRupee,
  ReceiptText
} from "lucide-react";
import "../styles/VendorLedger.css";
const dummyParties = [
  {
    id: 1,
    name: "Bismi Enterprises",
    gstin: "09ABCDE0102D1Z8",
    contact: "9876543210",
    email: "bismi@gmail.com",
    address: "Meerut, Uttar Pradesh",
    balance: 120500,
    type: "Dr"
  },

  {
    id: 2,
    name: "Super Sports Fitness",
    gstin: "09ABCDE2222D1Z8",
    contact: "9999999999",
    email: "fitness@gmail.com",
    address: "Delhi",
    balance: 0,
    type: "Cr"
  },

  {
    id: 3,
    name: "Lani India Industries",
    gstin: "09ABCDE3333D1Z8",
    contact: "8888888888",
    email: "lani@gmail.com",
    address: "Noida",
    balance: 180300,
    type: "Dr"
  },

  {
    id: 4,
    name: "Kumar Trading Co.",
    gstin: "09ABCDE4444D1Z8",
    contact: "7777777777",
    email: "kumar@gmail.com",
    address: "Kanpur",
    balance: -80500,
    type: "Cr"
  }
];

const ledgerEntries = [
  {
    date: "01-04-25",
    ledger: "Opening Balance",
    narration: "-",
    voucherType: "-",
    voucherNo: "-",
    invoiceNo: "-",
    dr: 10000,
    cr: 0,
    balance: 10000
  },

  {
    date: "05-05-25",
    ledger: "Sales A/c",
    narration: "Invoice Sale",
    voucherType: "Sales",
    voucherNo: "SAL-20",
    invoiceNo: "INV-220",
    dr: 218000,
    cr: 0,
    balance: 228000
  },

  {
    date: "06-05-25",
    ledger: "IDBI Bank",
    narration: "Chq No 120",
    voucherType: "Receipt",
    voucherNo: "REC-11",
    invoiceNo: "INV-220",
    dr: 0,
    cr: 200000,
    balance: 28000
  }
];

const VendorLedger = () => {

  const [search, setSearch] = useState("");
  const { collapsed } = useOutletContext();

  const [selectedParty, setSelectedParty] =
    useState(dummyParties[0]);

  const [config, setConfig] = useState({
    showVoucherNo: true,
    showInvoiceNo: true,
    showNarration: true,
    showBillWise: false,
    showBalance: true,
    hideStripe: false,
    hideTableLine: false,
    showDetails: true,

    showCompanyAddress: true,
    showGSTIN: true,
    showContactPerson: true,
    showContactNumber: true,
    showEmail: true
  });
  const [showConfig, setShowConfig] =
  useState(false);

const [showPrinting, setShowPrinting] =
  useState(false);

  /* ======================================
      FILTER PARTY
  ====================================== */

  const filteredParties = useMemo(() => {

    return dummyParties.filter((party) =>
      party.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  /* ======================================
      TOGGLE
  ====================================== */

  const toggleSetting = (key) => {

    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));

  };

  /* ======================================
      TOTALS
  ====================================== */

  const totalDr = ledgerEntries.reduce(
    (acc, item) => acc + item.dr,
    0
  );

  const totalCr = ledgerEntries.reduce(
    (acc, item) => acc + item.cr,
    0
  );

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

    <div className="vendor-ledger-page">

      {/* ===================================
          HEADER
      =================================== */}

      <div className="vendor-header">

        <div className="vendor-header-left">

          <div className="vendor-header-icon">
            <ReceiptText size={28} />
          </div>

          <div>

            <h1>
              Vendor / Customer Ledger
            </h1>

            <p>
              Manage party ledgers,
              balances and transactions
            </p>

          </div>

        </div>

        <div className="vendor-header-badge">

          Dynamic ERP Ledger

        </div>

      </div>

      {/* ===================================
          MAIN LAYOUT
      =================================== */}

      <div className="vendor-layout">

        {/* ===================================
            LEFT PANEL
        =================================== */}

        <div className="vendor-sidebar">

          {/* SEARCH */}

          <div className="vendor-search">

            <Search size={16} />

            <input
              placeholder="Search party..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* PARTY LIST */}

          <div className="vendor-party-list">

            {filteredParties.map((party) => (

              <div
                key={party.id}
                className={`vendor-party-card ${
                  selectedParty.id === party.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedParty(party)
                }
              >

                <div>

                  <h4>{party.name}</h4>

                  <p>
                    GSTIN:
                    {" "}
                    {party.gstin}
                  </p>

                </div>

                <div
                  className={`vendor-balance ${
                    party.balance >= 0
                      ? "positive"
                      : "negative"
                  }`}
                >

                  ₹
                  {Math.abs(
                    party.balance
                  ).toLocaleString()}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ===================================
            RIGHT CONTENT
        =================================== */}

        <div className="vendor-content">

          {/* ===================================
              TOP FILTERS
          =================================== */}

          <div className="vendor-toolbar">
            <div className="vendor-toolbar-left">
              <div className="vendor-filter">
                <CalendarDays size={16} />
                <input type="date" />
              </div>
              <div className="vendor-filter">
                <CalendarDays size={16} />
                <input type="date" />
              </div>
            </div>
            <div className="vendor-toolbar-right">
              {/* CONFIGURATION */}
              <div className="vendor-dropdown-wrapper">
                <button
                  className="vendor-toolbar-btn"
                  onClick={() =>
                    setShowConfig(!showConfig)
                  }
                >
                  <Settings2 size={15} />
                  Configuration
                </button>
                {showConfig && (
                  <div className="vendor-dropdown-panel">
                    <div className="vendor-dropdown-title">
                      Ledger Configuration
                    </div>
                    {[
                      ["Voucher No", "showVoucherNo"],
                      ["Invoice No", "showInvoiceNo"],
                      ["Narration", "showNarration"],
                      ["Balance", "showBalance"],
                      ["Hide Stripe", "hideStripe"],
                      ["Hide Table Line", "hideTableLine"],
                      ["Show Details", "showDetails"]
                    ].map(([label, key]) => (
                      <label
                        key={key}
                        className="vendor-toggle"
                      >
                        <input
                          type="checkbox"
                          checked={config[key]}
                          onChange={() =>
                            toggleSetting(key)
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* PRINT SETTINGS */}
              <div className="vendor-dropdown-wrapper">
                <button
                  className="vendor-toolbar-btn"
                  onClick={() =>
                    setShowPrinting(!showPrinting)
                  }
                >
                  <Printer size={15} />
                  Printing
                </button>
                {showPrinting && (
                  <div className="vendor-dropdown-panel">
                    <div className="vendor-dropdown-title">
                      Printing Settings
                    </div>
                    {[
                      ["Company Address", "showCompanyAddress"],
                      ["GSTIN", "showGSTIN"],
                      ["Contact Number", "showContactNumber"],
                      ["Email", "showEmail"]
                    ].map(([label, key]) => (
                      <label
                        key={key}
                        className="vendor-toggle"
                      >
                        <input
                          type="checkbox"
                          checked={config[key]}
                          onChange={() =>
                            toggleSetting(key)
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ===================================
              CONFIGURATION
          =================================== */}
          {/* <div className="vendor-config-grid">
            {[
              ["Voucher No", "showVoucherNo"],
              ["Invoice No", "showInvoiceNo"],
              ["Narration", "showNarration"],
              ["Balance", "showBalance"],
              ["Hide Stripe", "hideStripe"],
              ["Hide Table Line", "hideTableLine"],
              ["Show Details", "showDetails"],
              ["Company Address", "showCompanyAddress"],
              ["GSTIN", "showGSTIN"],
              ["Contact Number", "showContactNumber"],
              ["Email", "showEmail"]
            ].map(([label, key]) => (
              <label
                key={key}
                className="vendor-toggle"
              >
                <input
                  type="checkbox"
                  checked={config[key]}
                  onChange={() =>
                    toggleSetting(key)
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div> */}
          {/* ===================================
              PREVIEW CARD
          =================================== */}
          <div className="vendor-preview-card">
            {/* HEADER */}
            <div className="vendor-preview-header">
              <div>
                <h2>
                  {selectedParty.name}
                </h2>
                {config.showGSTIN && (
                  <p>
                    GSTIN:
                    {" "}
                    {selectedParty.gstin}
                  </p>
                )}
                {config.showCompanyAddress && (
                  <p>
                    {selectedParty.address}
                  </p>
                )}
                {config.showContactNumber && (
                  <p>
                    Contact:
                    {" "}
                    {selectedParty.contact}
                  </p>
                )}
                {config.showEmail && (
                  <p>
                    Email:
                    {" "}
                    {selectedParty.email}
                  </p>
                )}
              </div>
              <div className="vendor-preview-balance">
                <BadgeIndianRupee size={18} />
                ₹
                {selectedParty.balance.toLocaleString()}
              </div>
            </div>
            {/* TABLE */}
            <div className="vendor-table-wrapper">
              <table
                className={`vendor-table ${
                  config.hideTableLine
                    ? "hide-lines"
                    : ""
                } ${
                  config.hideStripe
                    ? "hide-stripe"
                    : ""
                }`}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ledger</th>
                    {config.showNarration && (
                      <th>Narration</th>
                    )}
                    <th>Voucher Type</th>
                    {config.showVoucherNo && (
                      <th>Voucher No</th>
                    )}
                    {config.showInvoiceNo && (
                      <th>Invoice No</th>
                    )}
                    <th>Amount Dr</th>
                    <th>Amount Cr</th>
                    {config.showBalance && (
                      <th>Balance</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.map(
                    (entry, index) => (

                      <tr key={index}>

                        <td>{entry.date}</td>

                        <td>{entry.ledger}</td>

                        {config.showNarration && (
                          <td>
                            {entry.narration}
                          </td>
                        )}

                        <td>
                          {entry.voucherType}
                        </td>

                        {config.showVoucherNo && (
                          <td>
                            {entry.voucherNo}
                          </td>
                        )}

                        {config.showInvoiceNo && (
                          <td>
                            {entry.invoiceNo}
                          </td>
                        )}

                        <td>
                          ₹
                          {entry.dr.toLocaleString()}
                        </td>

                        <td>
                          ₹
                          {entry.cr.toLocaleString()}
                        </td>

                        {config.showBalance && (
                          <td>
                            ₹
                            {entry.balance.toLocaleString()}
                          </td>
                        )}

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* TOTALS */}

            <div className="vendor-footer-summary">

              <div>

                <span>
                  Current Total Dr
                </span>

                <strong>
                  ₹
                  {totalDr.toLocaleString()}
                </strong>

              </div>

              <div>

                <span>
                  Current Total Cr
                </span>

                <strong>
                  ₹
                  {totalCr.toLocaleString()}
                </strong>

              </div>

              <div>

                <span>
                  Closing Balance
                </span>

                <strong>
                  ₹
                  {(
                    totalDr - totalCr
                  ).toLocaleString()}
                </strong>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="vendor-actions">

              <button>
                <Eye size={15} />
                Preview
              </button>

              <button>
                <FileSpreadsheet size={15} />
                Excel
              </button>

              <button>
                <FileText size={15} />
                PDF
              </button>

              <button>
                <Printer size={15} />
                Print
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
    </div>
  );
};

export default VendorLedger;