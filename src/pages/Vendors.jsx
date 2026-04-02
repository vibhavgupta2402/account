// import { useOutletContext } from "react-router-dom";
// import React, { useState } from "react";

// export default function Vendors() {
//   const { collapsed } = useOutletContext();
//   const [setCollapsed] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const [parties, setParties] = useState([
//     { name: "Mohan", amount: "0.00" },
//     { name: "Ravi Traders", amount: "1250.00" }
//   ]);

//   /* ===== ADD PARTY (EXACT HTML LOGIC) ===== */
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

//   const toggleMenu = (e) => {
//     const submenu = e.currentTarget.nextElementSibling;
//     submenu.style.display =
//       submenu.style.display === "block" ? "none" : "block";
//   };

//   return <div className={`main ${collapsed ? "collapsed" : ""}`}>
//     <div className="Parties_main">

//       <div className="header">
//         <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
//           Parties <i className="fa fa-chevron-down"></i>
//           <div
//             className="dropdown-menu"
//             style={{ display: dropdownOpen ? "block" : "" }}
//           >
//             <div>Party Details</div>
//             <div>Statements</div>
//           </div>
//         </div>

//         <div className="settings" onClick={() => setSettingsOpen(!settingsOpen)}>
//           <i className="fa fa-gear"></i>
//           <div
//             className="settings-menu"
//             style={{ display: settingsOpen ? "block" : "" }}
//           >
//             <div>Add Party Group</div>
//             <div>Shipping Address</div>
//             <div>Manage Party Status</div>
//           </div>
//         </div>
//       </div>

//       <div className="party_main">
//         <div className="Party_sidebar">
//           {parties.map((p, i) => (
//             <div key={i} className={`party ${i === 0 ? "active" : ""}`}>
//               <span>{p.name}</span>
//               <span>₹ {p.amount}</span>
//             </div>
//           ))}
//         </div>

//         <div className="content">
//           <div className="content-header">
//             <h3>Transactions</h3>
//             <button className="add-btn" onClick={() => setModalOpen(true)}>
//               + Add Party
//             </button>
//           </div>

//           <div className="party-card">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Type</th>
//                   <th>Date</th>
//                   <th>Total</th>
//                   <th>Balance</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Sale</td>
//                   <td>22/01/2026</td>
//                   <td>₹750</td>
//                   <td>₹0</td>
//                   <td className="row-action">
//                     <i className="fa fa-trash delete"></i>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* ADD PARTY MODAL */}
//       <div className={`modal ${modalOpen ? "show" : ""}`}>
//         <div className="modal-box">
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h3>Add Party</h3>
//             <i className="fa fa-xmark" onClick={() => setModalOpen(false)}></i>
//           </div>

//           <div className="form-grid">
//             <input id="pname" placeholder="Party Name *" />
//             <input placeholder="GSTIN" />
//             <input placeholder="Phone Number" />
//           </div>

//           <div className="tabs">
//             <div className={`tab ${activeTab === 0 ? "active" : ""}`} onClick={() => setActiveTab(0)}>
//               GST & Address
//             </div>
//             <div className={`tab ${activeTab === 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>
//               Credit & Balance
//             </div>
//             <div className={`tab ${activeTab === 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>
//               Additional Fields
//             </div>
//           </div>

//           {/* TAB 1 */}
//           <div className={`tab-content ${activeTab === 0 ? "active" : ""}`}>
//             <div className="form-grid">
//               <select>
//                 <option>Unregistered / Consumer</option>
//               </select>
//               <select>
//                 <option>Select State</option>
//               </select>
//               <input placeholder="Email" />
//             </div>
//             <div className="form-grid">
//               <textarea placeholder="Billing Address"></textarea>
//               <textarea placeholder="Shipping Address"></textarea>
//             </div>
//           </div>

//           {/* TAB 2 */}
//           <div className={`tab-content ${activeTab === 1 ? "active" : ""}`}>
//             <div className="form-grid">
//               <input placeholder="Credit Limit" />
//               <input placeholder="Opening Balance" />
//               <select>
//                 <option>To Receive</option>
//               </select>
//             </div>
//           </div>

//           {/* TAB 3 */}
//           <div className={`tab-content ${activeTab === 2 ? "active" : ""}`}>
//             <div className="form-grid">
//               <input placeholder="PAN" />
//               <input placeholder="Custom Field 1" />
//               <input placeholder="Custom Field 2" />
//             </div>
//           </div>

//           <div className="actions">
//             <button className="btn-outline" onClick={() => setModalOpen(false)}>
//               Cancel
//             </button>
//             <button className="btn-primary" onClick={saveParty}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//   </div>;
// }


import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";

export default function Vendors() {

  const { collapsed } = useOutletContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [parties, setParties] = useState([
    { name: "Mohan", amount: "0.00" },
    { name: "Ravi Traders", amount: "1250.00" }
  ]);

  /* ===== SAVE PARTY ===== */
  const saveParty = () => {
    const input = document.getElementById("pname");
    const name = input.value.trim();

    if (!name) {
      alert("Party Name required");
      return;
    }

    setParties([...parties, { name, amount: "0.00" }]);
    input.value = "";
    setModalOpen(false);
  };

  return (
  <div className={`main ${collapsed ? "collapsed" : ""}`}>
  <div className="Parties_main">

  {/* HEADER */}
  <div className="header">

    <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
      Parties <i className="fa fa-chevron-down"></i>

      <div
        className="dropdown-menu"
        style={{ display: dropdownOpen ? "block" : "" }}
      >
        <div>Party Details</div>
        <div>Statements</div>
      </div>
    </div>

    <div className="settings" onClick={() => setSettingsOpen(!settingsOpen)}>
      <i className="fa fa-gear"></i>

      <div
        className="settings-menu"
        style={{ display: settingsOpen ? "block" : "" }}
      >
        <div>Add Party Group</div>
        <div>Shipping Address</div>
        <div>Manage Party Status</div>
      </div>
    </div>

  </div>

  {/* MAIN SECTION */}
  <div className="party_main">

  {/* SIDEBAR */}
  <div className="Party_sidebar">
    {parties.map((p, i) => (
      <div key={i} className={`party ${i === 0 ? "active" : ""}`}>
        <span>{p.name}</span>
        <span>₹ {p.amount}</span>
      </div>
    ))}
  </div>

  {/* CONTENT */}
  <div className="content">

    <div className="content-header">
      <h3>Transactions</h3>

      <button className="add-btn" onClick={() => setModalOpen(true)}>
        + Add Party
      </button>
    </div>

    <div className="party-card">

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Total</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Sale</td>
            <td>22/01/2026</td>
            <td>₹750</td>
            <td>₹0</td>
            <td className="row-action">
              <i className="fa fa-trash delete"></i>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>

  </div>

  {/* ===== ADD VENDOR POPUP ===== */}
  <div className={`modal ${modalOpen ? "show" : ""}`}>

  <div className="modal-box vendor-popup">

  <div className="popup-header">
    <h3>Add Vendor</h3>
    <i className="fa fa-xmark" onClick={() => setModalOpen(false)}></i>
  </div>

  <div className="customer-style-form">

  {/* LEFT SIDE */}
  <div className="form-left">

  <div className="gst-row">
    <input placeholder="GSTIN / URP" />
    <button className="get-btn">Get Data</button>
  </div>

  <input id="pname" placeholder="Party Name *" />

  <input placeholder="Billing Address 1" />

  <input placeholder="Billing Address 2" />

  <input placeholder="Pin Code" />

  <select>
    <option>Select State</option>
  </select>

  <input placeholder="Phone Number" />

  <input placeholder="Email ID" />

  <input placeholder="PAN" />

  <div className="balance-row">
    <input placeholder="Opening Balance" />
    <select>
      <option>Dr</option>
      <option>Cr</option>
    </select>
  </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="form-right">

  <label>Registration Type</label>

  <select>
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

  <div className="actions">

  <button
  className="btn-outline"
  onClick={() => setModalOpen(false)}
  >
  Cancel
  </button>

  <button
  className="btn-primary"
  onClick={saveParty}
  >
  Save
  </button>

  </div>

  </div>
  </div>

  </div>
  </div>
  );
}