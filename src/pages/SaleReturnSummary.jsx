import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/salesReturn.css";

export default function SalesReturnSummary() {
  const { collapsed } = useOutletContext();

  // State Management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [showConfigDropdown, setShowConfigDropdown] = useState(false);
  const configRef = useRef(null);
  const [filters, setFilters] = useState({
    groupBy: "Document",
    fromDate: "2026-04-01",
    toDate: "2026-04-07",
  });

  // Column configuration state - Only for optional columns
  const [config, setConfig] = useState({
    typeOfSupply: false,
    showItems: false,
    showNarration: false,
    showGSTRate: true,
    showVoucherType: true,
    showVoucherNo: true,
    showGSTIN: false,
    showTaxes: true,
    showTDS: false,
    showOriginal: false,
    showCustomerAddress: false,
  });

  // Sample/Dummy Data
  const dummyData = [
    {
      id: 1,
      docNo: "SR-001",
      docDate: "01-04-2026",
      customerName: "ABC Pvt Ltd",
      voucherType: "Sales Return",
      taxableValue: 1000,
      totalGST: 180,
      totalAmount: 1180,
      createdBy: "Admin",
      createdDate: "01-04-2026",
      gstRate: "18%",
      taxes: "CGST: 90, SGST: 90",
      tds: "2% - 20",
      gstin: "27AAACA1234A1Z",
      originalDocNo: "INV-2026-001",
      customerAddress: "Mumbai, Maharashtra",
      items: "Product A (2 units)",
      narration: "Return due to damage",
      typeOfSupply: "Intra-State",
    },
    {
      id: 2,
      docNo: "SR-002",
      docDate: "02-04-2026",
      customerName: "XYZ Industries",
      voucherType: "Sales Return",
      taxableValue: 2500,
      totalGST: 450,
      totalAmount: 2950,
      createdBy: "Manager",
      createdDate: "02-04-2026",
      gstRate: "18%",
      taxes: "CGST: 225, SGST: 225",
      tds: "2% - 50",
      gstin: "29BBBBC5678B2Z",
      originalDocNo: "INV-2026-045",
      customerAddress: "Pune, Maharashtra",
      items: "Product B (5 units)",
      narration: "Wrong product shipped",
      typeOfSupply: "Intra-State",
    },
    {
      id: 3,
      docNo: "SR-003",
      docDate: "03-04-2026",
      customerName: "PQR Solutions",
      voucherType: "Sales Return",
      taxableValue: 5000,
      totalGST: 900,
      totalAmount: 5900,
      createdBy: "Admin",
      createdDate: "03-04-2026",
      gstRate: "18%",
      taxes: "CGST: 450, SGST: 450",
      tds: "2% - 100",
      gstin: "33CCCDE7890C3X",
      originalDocNo: "INV-2026-089",
      customerAddress: "Bangalore, Karnataka",
      items: "Product C (10 units)",
      narration: "Quality issues",
      typeOfSupply: "Inter-State",
    },
  ];

  // Simulate API call
  const fetchSalesReturnData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSalesData(dummyData);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesReturnData();
  }, [filters.fromDate, filters.toDate, filters.groupBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setShowConfigDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCheck = (key) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetConfig = () => {
    setConfig({
      typeOfSupply: false,
      showItems: false,
      showNarration: false,
      showGSTRate: true,
      showVoucherType: true,
      showVoucherNo: true,
      showGSTIN: false,
      showTaxes: true,
      showTDS: false,
      showOriginal: false,
      showCustomerAddress: false,
    });
  };

  // Column definitions - Fixed columns always visible
  const fixedColumns = [
    { key: "voucherNo", label: "Doc No", field: "docNo" },
    { key: "docDate", label: "Doc Date", field: "docDate" },
    { key: "customerName", label: "Customer Name", field: "customerName" },
    { key: "taxableValue", label: "Taxable Value", field: "taxableValue" },
    { key: "totalGST", label: "Total GST", field: "totalGST" },
    { key: "totalAmount", label: "Total Amount", field: "totalAmount" },
    { key: "createdBy", label: "Created By", field: "createdBy" },
    { key: "createdDate", label: "Created Date", field: "createdDate" },
  ];

  // Optional columns - Can be toggled
  const optionalColumns = [
    { key: "showVoucherNo", label: "Show Voucher No", field: "docNo" },
    { key: "showVoucherType", label: "Show Voucher Type", field: "voucherType" },
    { key: "showGSTRate", label: "Show GST Rate", field: "gstRate" },
    { key: "showTaxes", label: "Show Taxes (CGST/SGST/UTGST)", field: "taxes" },
    { key: "showTDS", label: "Show TDS/TCS", field: "tds" },
    { key: "showGSTIN", label: "Show GSTIN", field: "gstin" },
    { key: "showOriginal", label: "Show Original Inv.no/Date", field: "originalDocNo" },
    { key: "showCustomerAddress", label: "Show Customer Address", field: "customerAddress" },
    { key: "showItems", label: "Show Items", field: "items" },
    { key: "showNarration", label: "Show Narration", field: "narration" },
    { key: "typeOfSupply", label: "Type of Supply", field: "typeOfSupply" },
  ];

  // Get visible columns
  const visibleColumns = [
    ...fixedColumns,
    ...optionalColumns.filter(col => config[col.key])
  ];

  // Calculate totals
  const totals = salesData.reduce(
    (acc, row) => ({
      taxableValue: acc.taxableValue + (row.taxableValue || 0),
      totalGST: acc.totalGST + (row.totalGST || 0),
      totalAmount: acc.totalAmount + (row.totalAmount || 0),
    }),
    { taxableValue: 0, totalGST: 0, totalAmount: 0 }
  );

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="sr-container">
        {/* HEADER */}
        <div className="sr-header">
          <div>
            <h2 className="sr-title">Sales Return Summary</h2>
            <p className="sr-subtitle">Manage and track all sales return transactions</p>
          </div>
          <div className="sr-header-actions">
            <button className="sr-export-btn" onClick={() => console.log("Export clicked")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Export
            </button>
            <button className="sr-print-btn" onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V3h12v6M6 21h12v-6H6zM21 9H3v6h2v-4h14v4h2z"/>
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="sr-filters-card">
          <div className="sr-filters">
            <div className="sr-filter-group">
              <label>Group By</label>
              <select 
                className="sr-select"
                value={filters.groupBy}
                onChange={(e) => handleFilterChange("groupBy", e.target.value)}
              >
                <option>Document</option>
                <option>HSN</option>
                <option>Customer</option>
              </select>
            </div>

            <div className="sr-filter-group">
              <label>From Date</label>
              <input 
                type="date" 
                className="sr-date-input" 
                value={filters.fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              />
            </div>

            <div className="sr-filter-group">
              <label>To Date</label>
              <input 
                type="date" 
                className="sr-date-input" 
                value={filters.toDate}
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
              />
            </div>

            {/* Column Visibility Dropdown */}
            <div className="sr-filter-group sr-config-dropdown-wrapper" ref={configRef}>
              <label>Manage Columns</label>
              <button 
                className="sr-config-trigger"
                onClick={() => setShowConfigDropdown(!showConfigDropdown)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Select Columns
                <span className="sr-config-count">
                  {Object.values(config).filter(v => v === true).length}
                </span>
              </button>

              {showConfigDropdown && (
                <div className="sr-config-menu">
                  <div className="sr-config-menu-header">
                    <span>Toggle Optional Columns</span>
                    <button onClick={resetConfig} className="sr-config-reset">Reset</button>
                  </div>
                  <div className="sr-config-menu-search">
                    <input
                      type="text"
                      placeholder="Search columns..."
                      className="sr-search-input"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const items = document.querySelectorAll(".sr-config-menu-item");
                        items.forEach((item) => {
                          const label = item.querySelector("span")?.innerText.toLowerCase();
                          if (label?.includes(searchTerm)) {
                            item.style.display = "flex";
                          } else {
                            item.style.display = "none";
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="sr-config-menu-items">
                    {optionalColumns.map((col) => (
                      <label key={col.key} className="sr-config-menu-item">
                        <input
                          type="checkbox"
                          checked={config[col.key]}
                          onChange={() => handleCheck(col.key)}
                        />
                        <span>{col.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="sr-config-menu-footer">
                    <button onClick={() => {
                      const newConfig = {};
                      optionalColumns.forEach((col) => {
                        newConfig[col.key] = true;
                      });
                      setConfig(newConfig);
                    }}>Show All</button>
                    <button onClick={() => {
                      const newConfig = {};
                      optionalColumns.forEach((col) => {
                        newConfig[col.key] = false;
                      });
                      setConfig(newConfig);
                    }}>Hide All</button>
                  </div>
                </div>
              )}
            </div>

            <button className="sr-apply-btn" onClick={fetchSalesReturnData}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Apply Filters
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="sr-main">
          <div className="sr-table-card">
            <div className="sr-table-header">
              <h3>Sales Return Documents</h3>
              <div className="sr-table-stats">
                <span className="sr-record-count">{salesData.length} records found</span>
                {salesData.length > 0 && (
                  <div className="sr-totals">
                    <span>Total: ₹{totals.totalAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="sr-loading">
                <div className="sr-spinner"></div>
                <p>Loading data...</p>
              </div>
            ) : error ? (
              <div className="sr-error">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>{error}</p>
                <button onClick={fetchSalesReturnData} className="sr-retry-btn">Retry</button>
              </div>
            ) : (
              <>
                <div className="sr-table-wrapper">
                  <table className="sr-data-table">
                    <thead>
                      <tr>
                        {visibleColumns.map((col) => (
                          <th key={col.key}>{col.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.length === 0 ? (
                        <tr>
                          <td colSpan={visibleColumns.length} className="sr-no-data">
                            No data found for selected filters
                           </td>
                         </tr>
                      ) : (
                        salesData.map((row) => (
                          <tr key={row.id}>
                            {visibleColumns.map((col) => (
                              <td key={col.key}>
                                {col.key === "taxableValue" || col.key === "totalGST" || col.key === "totalAmount" 
                                  ? `₹${row[col.field]?.toLocaleString()}`
                                  : row[col.field] || "-"
                                }
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="sr-pagination">
                  <button className="sr-page-btn" disabled>Previous</button>
                  <span className="sr-page-info">Page 1 of 1</span>
                  <button className="sr-page-btn" disabled>Next</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}