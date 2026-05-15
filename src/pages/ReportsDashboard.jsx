import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ChevronDown,
  FileText,
  Receipt,
  Boxes,
  Landmark,
  TrendingUp,
  FileSpreadsheet,
  Zap
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/ReportsDashboard.css";

const reportSections = [
  {
    key: "general",
    title: "General Reports",
    icon: <FileText size={16} />,
    color: "#6366f1",
    reports: [
      { name: "Sales Summary", path: "/SaleSummary" },
      { name: "Sales Return Summary", path: "/SaleReturnSummary" },
      { name: "Sales Order Summary", path: "/SaleOrderSummary" },
      { name: "Purchase Summary", path: "/PurchaseSummary" },
      { name: "Purchase Return Summary", path: "/PurchaseReturnSummary" },
      { name: "Delivery Challan Summary", path: "/DeliveryChallanSummary" }
    ]
  },
  {
    key: "stock",
    title: "Stock Reports",
    icon: <Boxes size={16} />,
    color: "#f59e0b",
    reports: [
      { name: "Stock Summary", path: "/StockSummary" },
      { name: "HSN/SAC Summary", path: "/HSNSAC" },
      { name: "Customer Vendor Summary", path: "/CustomerVendorSummary" }
    ]
  },
  {
    key: "tax",
    title: "Tax Reports",
    icon: <Receipt size={16} />,
    color: "#10b981",
    reports: [
      { name: "GSTR-1", path: "/GSTR1Report" },
      { name: "GSTR-2", path: "/GSTR2Report" },
      { name: "GSTR-3B", path: "/GSTR3BReport" },
      { name: "GSTR-7", path: "/GSTR7Report" },
      { name: "TDS", path: "/TDSReport" },
      { name: "TCS", path: "/TCSReport" }
    ]
  },
  {
    key: "financial",
    title: "Financial Reports",
    icon: <Landmark size={16} />,
    color: "#8b5cf6",
    reports: [
      { name: "Trial Balance", path: "/TrialBalance" },
      { name: "Profit & Loss", path: "/ProfitLoss" },
      { name: "Balance Sheet", path: "/BalanceSheet" },
      { name: "Cash Flow", path: "/CashFlow" }
    ]
  }
];

const ReportsDashboard = () => {
  const [openSections, setOpenSections] = useState({ general: true });
  const { collapsed } = useOutletContext();

  const toggleSection = (key) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="reports-dashboard">
        {/* Compact Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <div className="header-icon">
              <TrendingUp size={20} />
            </div>
            <div>
              <h1>Reports</h1>
              <p>Access all business reports</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-chip">
              <Zap size={14} />
              <span>Quick Access</span>
            </div>
          </div>
        </div>

        {/* Compact Cards Grid */}
        <div className="reports-grid">
          {reportSections.map((section) => (
            <div className="report-card" key={section.key}>
              {/* Card Header */}
              <div 
                className="report-card-header"
                onClick={() => toggleSection(section.key)}
                style={{ borderLeftColor: section.color }}
              >
                <div className="card-header-left">
                  <div className="card-icon" style={{ color: section.color }}>
                    {section.icon}
                  </div>
                  <span className="card-title">{section.title}</span>
                  <span className="report-badge">{section.reports.length}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`chevron ${openSections[section.key] ? "rotate" : ""}`}
                  style={{ color: section.color }}
                />
              </div>

              {/* Reports List */}
              {openSections[section.key] && (
                <div className="reports-list">
                  {section.reports.map((report, idx) => (
                    <NavLink
                      key={idx}
                      to={report.path}
                      className={({ isActive }) => 
                        `report-item ${isActive ? "active" : ""}`
                      }
                    >
                      <FileSpreadsheet size={14} className="report-icon" />
                      <span>{report.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;