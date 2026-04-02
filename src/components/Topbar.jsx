// import "../styles/dashboard.css";
// import "../styles/style.css";
// import { useNavigate } from "react-router-dom";

// export default function Topbar({ collapsed, toggleSidebar }) {
//   const navigate = useNavigate();

//   return (
//     <header className={`topbar ${collapsed ? "collapsed" : ""}`} id="topbar">
//       <i
//         className={`fa-solid ${
//           collapsed ? "fa-angles-right" : "fa-angles-left"
//         } toggle-btn`}
//         onClick={toggleSidebar}
//       ></i>

//       {/* <div className="search">
//         <input type="text" placeholder="Search Transactions" />
//       </div> */}

//       <div className="top-actions">
//         <div className="top-menu">
//         <button onClick={() => navigate("/SalesInvoices")} className="sale_btn">
//           Sale
//         </button>
//         <button onClick={() => navigate("/HomeAddPurchase")} className="credit_btn">
//           Credit
//         </button>
//         <button onClick={() => navigate("/HomeAddPurchase")} className="debit-btn">
//           Debit note
//         </button>
//         <button onClick={() => navigate("/Payments")} className="payment-btn">
//           Payment
//         </button>
//         <button onClick={() => navigate("/Receipts")} className="receipt-btn">
//           Receipt
//         </button>
//         <button onClick={() => navigate("/HomeAddPurchase")} className="order-btn">
//           Order 
//         </button>
//         <button onClick={() => navigate("/JournalEntries")} className="journal-btn">
//           Journal
//         </button>
//         </div>
//         <button onClick={() => navigate("/HomeAddSales")} className="sale-btn">
//           + Add Sale
//         </button>
//         <button onClick={() => navigate("/HomeAddPurchase")} className="purchase-btn">
//           + Add Purchase
//         </button>
        
//       </div>
//     </header>
//   );
// }

// import "../styles/dashboard.css";
// import "../styles/style.css";
import "../styles/tabbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Topbar({ collapsed, toggleSidebar }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("sale");

  const menuItems = [
    { key: "sale", label: "Sale", path: "/SalesInvoices" },
    { key: "credit", label: "Credit Note", path: "/CreditNote"},
    { key: "debit", label: "Debit Note", path: "/DebitNote" },
    { key: "payment", label: "Payment", path: "/PaymentInvoice"},
    { key: "receipt", label: "Receipt", path: "/Receipts" },
    { key: "purchase", label: "Purchase", path: "/purchasevoucher" },
    { key: "journal", label: "Journal", path: "/Journal" },
    { key: "deliverychallan", label: "Delivery Challan", path: "/Delivery" },
    { key: "Purchaseorder", label: "Purchase Order", path: "/PurchaseOrder"},
    { key: "Saleorder", label: "Sale Order", path: "/SaleOrder" },
    { key: "Contra", label: "Contra", path: "/contra" },

  ];

  const handleMenuClick = (path, key) => {
    navigate(path);
    setActiveMenu(key);
  };

  return (
    <header className={`topbar ${collapsed ? "collapsed" : ""}`} id="topbar">
      <div className="toggle-wrapper">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fa-solid ${collapsed ? "fa-angles-right" : "fa-angles-left"}`}></i>
        </button>
      </div>

      <div className="top-actions">
        {/* <div className="top-menu"> */}
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`menu-btn ${item.key}-btn ${activeMenu === item.key ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.path, item.key)}
            >
              {/* <span className="menu-icon">{item.icon}</span> */}
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
        
        {/* <div className="cta-buttons">
          <button 
            className="cta-btn sale-cta"
            onClick={() => navigate("/HomeAddSales")}
          >
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Sale
          </button>
          <button 
            className="cta-btn purchase-cta"
            onClick={() => navigate("/HomeAddPurchase")}
          >
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Purchase
          </button>
        </div> */}
      {/* </div> */}
    </header>
  );
}
