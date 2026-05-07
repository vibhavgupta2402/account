// import { Link } from "react-router-dom";
// import logo from "../assets/Logo.jpeg";
// import "../styles/dashboard.css";
// import "../styles/style.css";

// export default function Sidebar({ collapsed }) {
//   const toggleMenu = (e) => {
//     const submenu = e.currentTarget.nextElementSibling;
//     submenu.style.display =
//       submenu.style.display === "block" ? "none" : "block";
//   };

//   return (
//     <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
//       <div className="sidebar-header">
//         <div className="sidebar-logo">
//           <span><img src={logo} alt="Company Logo" /></span>
//         </div>
//       </div>

//       <ul className="menu">
//         <li>
//           <Link to="/">
//             <i className="fa-solid fa-house"></i>
//             <span>Dashboard</span>
//           </Link>
//         </li>


//         <li className="dropdown">
//           <a onClick={toggleMenu}>
//             <i className="fa-solid fa-users"></i>
//             <span>Masters</span>
//             <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
//           </a>
//           <div className="submenu">
//             <Link to="/ChartOfAccounts">Chart of Accounts</Link>
//             <Link to="/ItemsServices">Items / Services</Link>
//             <Link to="/customers">Customers</Link>
//             <Link to="/vendors">Vendors</Link>
//           </div>
//         </li>

//         <li className="dropdown">
//           <a onClick={toggleMenu}>
//             <i className="fa-sharp fa-solid fa-money-bill-transfer"></i>
//             <span>Transactions</span>
//             <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
//           </a>
//           <div className="submenu">
//             <Link to="/SalesInvoices">Sales Invoices</Link>
//             <Link to="/PurchaseBills">Purchase Bills</Link>
//             <Link to="/Receipts">Receipts</Link>
//             <Link to="/Payments">Payments</Link>
//             <Link to="/JournalEntries">Journal Entries</Link>
//           </div>
//         </li>

//         <li className="dropdown">
//           <a onClick={toggleMenu}>
//             <i className="fa-solid fa-building-columns"></i>
//             <span>Banking</span>
//             <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
//           </a>
//           <div className="submenu">
//             <Link to="/BankAccounts">Bank Accounts</Link>
//             <Link to="/BankReconciliation">Bank Reconciliation</Link>
//           </div>
//         </li>

//         <li className="dropdown">
//           <a onClick={toggleMenu}>
//             <i className="fa-solid fa-file-lines"></i>
//             <span>Reports</span>
//             <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
//           </a>
//           <div className="submenu">
//             <Link to="/Ledger">Ledger</Link>
//             <Link to="/TrialBalance">Trial Balance</Link>
//             <Link to="/ProfitLoss">Profit & Loss</Link>
//             <Link to="/BalanceSheet">Balance Sheet</Link>
//             <Link to="/CashFlow">Cash Flow</Link>
//           </div>
//         </li>

//         <li>
//           <Link to="/Documents">
//             <i className="fa-solid fa-file-invoice"></i>
//             <span>Documents</span>
//           </Link>
//         </li>

//         <li>
//           <Link to="/Settings">
//             <i className="fa-solid fa-gear"></i>
//             <span>Settings</span>
//           </Link>
//         </li>


//       </ul>
//     </aside>
//   );
// }





import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/Logo.jpeg";
import userImg from "../assets/Logo.jpeg";
import "../styles/dashboard.css";
import "../styles/style.css";

export default function Sidebar({ collapsed }) {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const handleDropdown = (name, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === name ? null : name);
  };
  const handleSubDropdown = (name, e) => {
  e.preventDefault();
  setOpenSubDropdown(prev => prev === name ? null : name);
};
  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">

      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span><img src={logo} alt="Company Logo" /></span>
        </div>
      </div>

      <ul className="menu">

        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Masters */}
        <li className={`dropdown ${openDropdown === "masters" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("masters", e)}>
            <i className="fa-solid fa-users"></i>
            <span>Masters</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "masters" ? "block" : "none" }}>
            <NavLink to="/Ledger" className={({ isActive }) => isActive ? "active-link" : ""}>Ledger</NavLink>
            <NavLink to="/ItemsServices" className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink>
            <NavLink to="/customers" className={({ isActive }) => isActive ? "active-link" : ""}>Customers</NavLink>
            <NavLink to="/vendors" className={({ isActive }) => isActive ? "active-link" : ""}>Vendors</NavLink>
            <NavLink to="/ItemGroup" className={({ isActive }) => isActive ? "active-link" : ""}>Item Group</NavLink>
            <NavLink to="/Godown" className={({ isActive }) => isActive ? "active-link" : ""}>Godown</NavLink>
          </div>
        </li>
        {/* Ledger book */}
        <li>
          <NavLink to="/Ledgerbook" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-file-invoice"></i>
            <span>Ledger Book</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Daybook" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-file-invoice"></i>
            <span>DayBook</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/BankAccounts" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-building-columns"></i>
            <span>Bank/Cash Book</span>
          </NavLink>
        </li>

        {/* Transactions */}
        {/* <li className={`dropdown ${openDropdown === "transactions" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("transactions", e)}>
            <i className="fa-sharp fa-solid fa-money-bill-transfer"></i>
            <span>Transactions</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "transactions" ? "block" : "none" }}>
            <NavLink to="/SalesInvoices" className={({ isActive }) => isActive ? "active-link" : ""}>Sales Invoices</NavLink>
            <NavLink to="/PurchaseBills" className={({ isActive }) => isActive ? "active-link" : ""}>Purchase Bills</NavLink>
            <NavLink to="/Receipts" className={({ isActive }) => isActive ? "active-link" : ""}>Receipts</NavLink>
            <NavLink to="/Payments" className={({ isActive }) => isActive ? "active-link" : ""}>Payments</NavLink>
            <NavLink to="/JournalEntries" className={({ isActive }) => isActive ? "active-link" : ""}>Journal Entries</NavLink>
          </div>
        </li> */}

        {/* Banking */}
        {/* <li className={`dropdown ${openDropdown === "banking" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("banking", e)}>
            <i className="fa-solid fa-building-columns"></i>
            <span>Bank/Cash Book</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "banking" ? "block" : "none" }}>
            <NavLink to="/BankAccounts" className={({ isActive }) => isActive ? "active-link" : ""}>Bank Accounts</NavLink>
            <NavLink to="/BankReconciliation" className={({ isActive }) => isActive ? "active-link" : ""}>Bank Reconciliation</NavLink>
          </div>
        </li> */}

        {/* Reports */}
        <li className={`dropdown ${openDropdown === "reports" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("reports", e)}>
            <i className="fa-solid fa-file-lines"></i>
            <span>Reports</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "reports" ? "block" : "none" }}>
            {/* <NavLink to="/Ledger" className={({ isActive }) => isActive ? "active-link" : ""}>Ledger</NavLink> */}
           
            <div className={`dropdown ${openDropdown === "generalReport" ? "active-dropdown" : ""}`}>
      
              <a href="#" onClick={(e) => handleSubDropdown("generalReport", e)}>
                General Reports
                <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
              </a>

              <div className="submenu nested" style={{ display: openSubDropdown  === "generalReport" ? "block" : "none" }}>
                <NavLink to="/SaleSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Sale Summary
                </NavLink>

                <NavLink to="/SaleReturnSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Sale Return Summary
                </NavLink>
                <NavLink to="/PurchaseSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Purchase Summary
                </NavLink>
                <NavLink to="/PurchaseReturnSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Purchase Return Summary
                </NavLink>
                <NavLink to="/SaleOrderSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Sale Order Summary
                </NavLink>
                <NavLink to="/DeliveryChallanSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Delivery Challan Summary
                </NavLink>
              </div>
            </div>
            {/* <NavLink to="/StockReports" className={({ isActive }) => isActive ? "active-link" : ""}>Stock Reports</NavLink> */}
            <div className={`dropdown ${openDropdown === "stockReport" ? "active-dropdown" : ""}`}>
      
              <a href="#" onClick={(e) => handleSubDropdown("stockReport", e)}>
                Stock Reports
                <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
              </a>

              <div className="submenu nested" style={{ display: openSubDropdown  === "stockReport" ? "block" : "none" }}>
                <NavLink to="/StockSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Stock Summary
                </NavLink>

                <NavLink to="/HSNSAC" className={({ isActive }) => isActive ? "active-link" : ""}>
                  HSNSAC Summary
                </NavLink>
                <NavLink to="/CustomerVendorSummary" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Customer Vendor Summary
                </NavLink>
              </div>
            </div>
            {/* <NavLink to="/TaxReports" className={({ isActive }) => isActive ? "active-link" : ""}>Tax Reports</NavLink> */}
            <div className={`dropdown ${openDropdown === "taxReport" ? "active-dropdown" : ""}`}>
      
              <a href="#" onClick={(e) => handleSubDropdown("taxReport", e)}>
                Tax Reports
                <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
              </a>

              <div className="submenu nested" style={{ display: openSubDropdown  === "taxReport" ? "block" : "none" }}>
                <NavLink to="/GSTR1Report" className={({ isActive }) => isActive ? "active-link" : ""}>
                  GSTR-1 Report
                </NavLink>

                <NavLink to="/GSTR2Report" className={({ isActive }) => isActive ? "active-link" : ""}>
                  GSTR-2 Report
                </NavLink>
                <NavLink to="/GSTR3BReport" className={({ isActive }) => isActive ? "active-link" : ""}>
                  GSTR-3B Report
                </NavLink>
                <NavLink to="/GSTR7Report" className={({ isActive }) => isActive ? "active-link" : ""}>GSTR-7   Report</NavLink>
                <NavLink to="/TDSReport" className={({ isActive }) => isActive ? "active-link" : ""}>TDS   Report</NavLink>
                <NavLink to="/TCSReport" className={({ isActive }) => isActive ? "active-link" : ""}>TCS   Report</NavLink>
              </div>
            </div>
            <div className={`dropdown ${openDropdown === "finacialreport" ? "active-dropdown" : ""}`}>
      
              <a href="#" onClick={(e) => handleSubDropdown("finacialreport", e)}>
                Finacial Reports
                <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
              </a>

              <div className="submenu nested" style={{ display: openSubDropdown  === "finacialreport" ? "block" : "none" }}>
                 <NavLink to="/TrialBalance" className={({ isActive }) => isActive ? "active-link" : ""}>Trial Balance</NavLink>
            <NavLink to="/ProfitLoss" className={({ isActive }) => isActive ? "active-link" : ""}>Profit & Loss</NavLink>
            <NavLink to="/BalanceSheet" className={({ isActive }) => isActive ? "active-link" : ""}>Balance Sheet</NavLink>
            <NavLink to="/CashFlow" className={({ isActive }) => isActive ? "active-link" : ""}>Cash Flow</NavLink>
              </div>
            </div>
            
          </div>
        </li>

       {/* Manage company */}

        <li className={`dropdown ${openDropdown === "managecompany" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("managecompany", e)}>
            <i className="fa-solid fa-file-lines"></i>
            <span>Manage Company</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "managecompany" ? "block" : "none" }}>
            <NavLink to="/UserManagement" className={({ isActive }) => isActive ? "active-link" : ""}>User Management</NavLink>
            <NavLink to="/Automation" className={({ isActive }) => isActive ? "active-link" : ""}>Automation</NavLink>
          </div>
        </li>

        {/* <li>
          <NavLink to="/Documents" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-file-invoice"></i>
            <span>Documents</span>
          </NavLink>
        </li> */}

        {/* <li>
          <NavLink to="/Settings" className={({ isActive }) => isActive ? "active-link" : ""}>
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
          </NavLink>
        </li> */}
        <li className={`dropdown ${openDropdown === "Settings" ? "active-dropdown" : ""}`}>
          <a href="#" onClick={(e) => handleDropdown("Settings", e)}>
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
            <i className="fa-solid fa-chevron-down" style={{ marginLeft: "auto" }}></i>
          </a>
          <div className="submenu" style={{ display: openDropdown === "Settings" ? "block" : "none" }}>
            <NavLink to="/CompanySettings" className={({ isActive }) => isActive ? "active-link" : ""}>Company Setting</NavLink>
            <NavLink to="/Automation" className={({ isActive }) => isActive ? "active-link" : ""}>Invoice Setting</NavLink>
            <NavLink to="/Automation" className={({ isActive }) => isActive ? "active-link" : ""}>User Setting</NavLink>
            <NavLink to="/Automation" className={({ isActive }) => isActive ? "active-link" : ""}>Backup Setting</NavLink>
          </div>
        </li>

      </ul>

      {/* Sticky User Section */}
      <div className="sidebar-user-section" ref={settingsRef}>
        <div className="sidebar-user-info" onClick={() => setSettingsOpen(!settingsOpen)}>
          <img src={userImg} alt="User" />
          {!collapsed && <span className="sidebar-username">Admin User</span>}
        </div>

        {settingsOpen && (
          <div className="settings-menu show-settings">
            <div>Profile</div>
            <div>Change Profile</div>
            <div>Logout</div>
          </div>
        )}
      </div>

    </aside>
  );
}