import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/purchasesummary.css";

export default function GeneralReports() {
  const { collapsed } = useOutletContext();
  const [showConfig, setShowConfig] = useState(false);
  const configRef = useRef(null);
  
  // State for filters
  const [filters, setFilters] = useState({
    fromDate: "2026-04-01",
    toDate: "2026-04-07",
    by: "Invoice"
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  
  // State for config
  const [config, setConfig] = useState({
    typeOfSupply: false,
    showItems: false,
    showNarration: false,
    showGSTRate: true,
    showVoucherType: true,
    showVoucherNo: true,
    showGSTIN: true,
    showCustomerAddress: false,
    showTaxes: true,
    showTDS: false,
  });

  // Sample data for Invoice
  const invoiceData = [
    { id: 1, invNo: "INV-001", invDate: "01-04-2026", customerName: "ABC Pvt Ltd", voucherType: "Sales", taxableValue: 1000, totalGST: 180, invValue: 1180, gstRate: "18%", gstin: "27AAACA1234A1Z", address: "Mumbai" },
    { id: 2, invNo: "INV-002", invDate: "01-04-2026", customerName: "XYZ Industries", voucherType: "Sales", taxableValue: 2500, totalGST: 450, invValue: 2950, gstRate: "18%", gstin: "29BBBBC5678B2Z", address: "Pune" },
    { id: 3, invNo: "INV-003", invDate: "02-04-2026", customerName: "PQR Solutions", voucherType: "Sales", taxableValue: 5000, totalGST: 900, invValue: 5900, gstRate: "18%", gstin: "33CCCDE7890C3X", address: "Bangalore" },
    { id: 4, invNo: "INV-004", invDate: "02-04-2026", customerName: "LMN Enterprises", voucherType: "Sales", taxableValue: 3200, totalGST: 576, invValue: 3776, gstRate: "18%", gstin: "22LMNOP1234D4Y", address: "Chennai" },
    { id: 5, invNo: "INV-005", invDate: "03-04-2026", customerName: "RST Group", voucherType: "Sales", taxableValue: 1800, totalGST: 324, invValue: 2124, gstRate: "18%", gstin: "19RSTUV5678E5W", address: "Hyderabad" },
    { id: 6, invNo: "INV-006", invDate: "03-04-2026", customerName: "UVW Corp", voucherType: "Sales", taxableValue: 4200, totalGST: 756, invValue: 4956, gstRate: "18%", gstin: "24UVWXYZ7890F6X", address: "Delhi" },
    { id: 7, invNo: "INV-007", invDate: "04-04-2026", customerName: "MNO Solutions", voucherType: "Sales", taxableValue: 3500, totalGST: 630, invValue: 4130, gstRate: "18%", gstin: "26MNOPQR4567G7Y", address: "Kolkata" },
    { id: 8, invNo: "INV-008", invDate: "04-04-2026", customerName: "DEF Industries", voucherType: "Sales", taxableValue: 2800, totalGST: 504, invValue: 3304, gstRate: "18%", gstin: "28DEFGHI3456H8Z", address: "Ahmedabad" },
    { id: 9, invNo: "INV-009", invDate: "05-04-2026", customerName: "GHI Enterprises", voucherType: "Sales", taxableValue: 4500, totalGST: 810, invValue: 5310, gstRate: "18%", gstin: "30GHIJKL2345I9W", address: "Pune" },
    { id: 10, invNo: "INV-010", invDate: "05-04-2026", customerName: "JKL Pvt Ltd", voucherType: "Sales", taxableValue: 3800, totalGST: 684, invValue: 4484, gstRate: "18%", gstin: "32JKLMNO1234J0V", address: "Mumbai" },
    { id: 11, invNo: "INV-011", invDate: "06-04-2026", customerName: "STU Limited", voucherType: "Sales", taxableValue: 6200, totalGST: 1116, invValue: 7316, gstRate: "18%", gstin: "34STUVWX9876K1U", address: "Bangalore" },
    { id: 12, invNo: "INV-012", invDate: "06-04-2026", customerName: "VWX Corp", voucherType: "Sales", taxableValue: 2900, totalGST: 522, invValue: 3422, gstRate: "18%", gstin: "36VWXYZA8765L2T", address: "Chennai" },
  ];

  // Sample data for HSN
  const hsnData = [
    { id: 1, hsnCode: "84713000", taxableValue: 15000, totalGST: 2700, description: "Laptops", gstRate: "18%" },
    { id: 2, hsnCode: "84715000", taxableValue: 8500, totalGST: 1530, description: "Servers", gstRate: "18%" },
    { id: 3, hsnCode: "84716000", taxableValue: 5200, totalGST: 936, description: "Keyboards", gstRate: "18%" },
    { id: 4, hsnCode: "84717000", taxableValue: 12400, totalGST: 2232, description: "Storage Devices", gstRate: "18%" },
    { id: 5, hsnCode: "84718000", taxableValue: 3800, totalGST: 684, description: "Other Peripherals", gstRate: "18%" },
    { id: 6, hsnCode: "84719000", taxableValue: 2900, totalGST: 522, description: "Other Machines", gstRate: "18%" },
    { id: 7, hsnCode: "84733000", taxableValue: 4300, totalGST: 774, description: "Parts", gstRate: "18%" },
    { id: 8, hsnCode: "84734000", taxableValue: 2100, totalGST: 378, description: "Accessories", gstRate: "18%" },
    { id: 9, hsnCode: "84735000", taxableValue: 1800, totalGST: 324, description: "Components", gstRate: "18%" },
    { id: 10, hsnCode: "84741000", taxableValue: 5600, totalGST: 1008, description: "Sorting Machines", gstRate: "18%" },
    { id: 11, hsnCode: "84742000", taxableValue: 8900, totalGST: 1602, description: "Crushing Machines", gstRate: "18%" },
    { id: 12, hsnCode: "84743000", taxableValue: 3400, totalGST: 612, description: "Mixing Machines", gstRate: "18%" },
  ];

  // Sample data for Customer
  const customerData = [
    { id: 1, customerName: "ABC Pvt Ltd", invDate: "01-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 1000, totalGST: 180, invValue: 1180, gstin: "27AAACA1234A1Z", address: "Mumbai" },
    { id: 2, customerName: "XYZ Industries", invDate: "01-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 2500, totalGST: 450, invValue: 2950, gstin: "29BBBBC5678B2Z", address: "Pune" },
    { id: 3, customerName: "PQR Solutions", invDate: "02-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 5000, totalGST: 900, invValue: 5900, gstin: "33CCCDE7890C3X", address: "Bangalore" },
    { id: 4, customerName: "LMN Enterprises", invDate: "02-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 3200, totalGST: 576, invValue: 3776, gstin: "22LMNOP1234D4Y", address: "Chennai" },
    { id: 5, customerName: "RST Group", invDate: "03-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 1800, totalGST: 324, invValue: 2124, gstin: "19RSTUV5678E5W", address: "Hyderabad" },
    { id: 6, customerName: "UVW Corp", invDate: "03-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 4200, totalGST: 756, invValue: 4956, gstin: "24UVWXYZ7890F6X", address: "Delhi" },
    { id: 7, customerName: "MNO Solutions", invDate: "04-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 3500, totalGST: 630, invValue: 4130, gstin: "26MNOPQR4567G7Y", address: "Kolkata" },
    { id: 8, customerName: "DEF Industries", invDate: "04-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 2800, totalGST: 504, invValue: 3304, gstin: "28DEFGHI3456H8Z", address: "Ahmedabad" },
    { id: 9, customerName: "GHI Enterprises", invDate: "05-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 4500, totalGST: 810, invValue: 5310, gstin: "30GHIJKL2345I9W", address: "Pune" },
    { id: 10, customerName: "JKL Pvt Ltd", invDate: "05-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 3800, totalGST: 684, invValue: 4484, gstin: "32JKLMNO1234J0V", address: "Mumbai" },
    { id: 11, customerName: "STU Limited", invDate: "06-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 6200, totalGST: 1116, invValue: 7316, gstin: "34STUVWX9876K1U", address: "Bangalore" },
    { id: 12, customerName: "VWX Corp", invDate: "06-04-2026", voucherType: "Sales", gstRate: "18%", taxableValue: 2900, totalGST: 522, invValue: 3422, gstin: "36VWXYZA8765L2T", address: "Chennai" },
  ];

  // Get current data based on filter
  const getCurrentData = () => {
    switch(filters.by) {
      case "Invoice":
        return invoiceData;
      case "HSN":
        return hsnData;
      case "Customer":
        return customerData;
      default:
        return invoiceData;
    }
  };

  const currentData = getCurrentData();
  
  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = currentData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(currentData.length / rowsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setShowConfig(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.by]);

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const handleCheck = (key) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Calculate totals
  const calculateTotals = () => {
    return currentData.reduce((acc, row) => ({
      taxableValue: acc.taxableValue + (row.taxableValue || 0),
      totalGST: acc.totalGST + (row.totalGST || 0),
      invValue: acc.invValue + (row.invValue || 0),
    }), { taxableValue: 0, totalGST: 0, invValue: 0 });
  };

  const totals = calculateTotals();

  // Render Invoice Table
  const renderInvoiceTable = () => (
    <div className="table-section">
      <div className="table-header">
        <h3>Invoice Summary</h3>
        <div className="table-stats">
          <span>Total Records: {currentData.length}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Inv No</th>
              <th>Inv Date</th>
              <th>Customer Name</th>
              {config.showVoucherType && <th>Voucher Type</th>}
              {config.showGSTIN && <th>GSTIN</th>}
              {config.showCustomerAddress && <th>Address</th>}
              <th>Taxable Value</th>
              {config.showGSTRate && <th>GST Rate</th>}
              {config.showTaxes && <th>Total GST</th>}
              <th>Inv Value</th>
              {config.showTDS && <th>TDS</th>}
              {config.showItems && <th>Items</th>}
              {config.showNarration && <th>Narration</th>}
              {config.typeOfSupply && <th>Type of Supply</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={row.id}>
                <td>{indexOfFirstRow + idx + 1}</td>
                <td>{row.invNo}</td>
                <td>{row.invDate}</td>
                <td>{row.customerName}</td>
                {config.showVoucherType && <td>{row.voucherType}</td>}
                {config.showGSTIN && <td>{row.gstin || "-"}</td>}
                {config.showCustomerAddress && <td>{row.address || "-"}</td>}
                <td>₹{row.taxableValue.toLocaleString()}</td>
                {config.showGSTRate && <td>{row.gstRate || "18%"}</td>}
                {config.showTaxes && <td>₹{row.totalGST.toLocaleString()}</td>}
                <td>₹{row.invValue.toLocaleString()}</td>
                {config.showTDS && <td>-</td>}
                {config.showItems && <td>-</td>}
                {config.showNarration && <td>-</td>}
                {config.typeOfSupply && <td>Intra-State</td>}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={7 + (config.showVoucherType ? 1 : 0) + (config.showGSTIN ? 1 : 0) + (config.showCustomerAddress ? 1 : 0)}>
                <strong>Total:</strong>
              </td>
              <td><strong>₹{totals.taxableValue.toLocaleString()}</strong></td>
              {config.showGSTRate && <td></td>}
              {config.showTaxes && <td><strong>₹{totals.totalGST.toLocaleString()}</strong></td>}
              <td><strong>₹{totals.invValue.toLocaleString()}</strong></td>
              {(config.showTDS || config.showItems || config.showNarration || config.typeOfSupply) && 
                Array(4).fill().map((_, i) => <td key={i}></td>)
              }
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );

  // Render HSN Table
  const renderHSNTable = () => (
    <div className="table-section">
      <div className="table-header">
        <h3>HSN Summary</h3>
        <div className="table-stats">
          <span>Total Records: {currentData.length}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>HSN/SAC Code</th>
              <th>Description</th>
              <th>Taxable Value</th>
              {config.showGSTRate && <th>GST Rate</th>}
              {config.showTaxes && <th>Total GST</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={row.id}>
                <td>{indexOfFirstRow + idx + 1}</td>
                <td>{row.hsnCode}</td>
                <td>{row.description}</td>
                <td>₹{row.taxableValue.toLocaleString()}</td>
                {config.showGSTRate && <td>{row.gstRate}</td>}
                {config.showTaxes && <td>₹{row.totalGST.toLocaleString()}</td>}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={3}><strong>Total:</strong></td>
              <td><strong>₹{totals.taxableValue.toLocaleString()}</strong></td>
              {config.showGSTRate && <td></td>}
              {config.showTaxes && <td><strong>₹{totals.totalGST.toLocaleString()}</strong></td>}
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );

  // Render Customer Table
  const renderCustomerTable = () => (
    <div className="table-section">
      <div className="table-header">
        <h3>Customer Summary</h3>
        <div className="table-stats">
          <span>Total Records: {currentData.length}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Inv Date</th>
              {config.showVoucherType && <th>Voucher Type</th>}
              {config.showGSTIN && <th>GSTIN</th>}
              {config.showCustomerAddress && <th>Address</th>}
              <th>Taxable Value</th>
              {config.showGSTRate && <th>GST Rate</th>}
              {config.showTaxes && <th>Total GST</th>}
              <th>Inv Value</th>
              {config.showTDS && <th>TDS</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={row.id}>
                <td>{indexOfFirstRow + idx + 1}</td>
                <td>{row.customerName}</td>
                <td>{row.invDate}</td>
                {config.showVoucherType && <td>{row.voucherType}</td>}
                {config.showGSTIN && <td>{row.gstin || "-"}</td>}
                {config.showCustomerAddress && <td>{row.address || "-"}</td>}
                <td>₹{row.taxableValue.toLocaleString()}</td>
                {config.showGSTRate && <td>{row.gstRate}</td>}
                {config.showTaxes && <td>₹{row.totalGST.toLocaleString()}</td>}
                <td>₹{row.invValue.toLocaleString()}</td>
                {config.showTDS && <td>-</td>}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={5 + (config.showVoucherType ? 1 : 0) + (config.showGSTIN ? 1 : 0) + (config.showCustomerAddress ? 1 : 0)}>
                <strong>Total:</strong>
              </td>
              <td><strong>₹{totals.taxableValue.toLocaleString()}</strong></td>
              {config.showGSTRate && <td></td>}
              {config.showTaxes && <td><strong>₹{totals.totalGST.toLocaleString()}</strong></td>}
              <td><strong>₹{totals.invValue.toLocaleString()}</strong></td>
              {config.showTDS && <td></td>}
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="report-container">
        {/* Header */}
        <div className="report-header">
          <h2 className="report-title">Purchase Summary</h2>
          <div className="header-actions">
            <button className="export-btn">Export</button>
            <button className="print-btn">Print</button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters">
            <div className="filter-group">
              <label>From Date</label>
              <input 
                type="date" 
                value={filters.fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>To Date</label>
              <input 
                type="date" 
                value={filters.toDate}
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Group By</label>
              <select 
                value={filters.by}
                onChange={(e) => handleFilterChange("by", e.target.value)}
              >
                <option>Invoice</option>
                <option>HSN</option>
                <option>Customer</option>
              </select>
            </div>

            {/* Configuration Dropdown */}
            <div className="config-dropdown-wrapper" ref={configRef}>
              <button className="config-btn" onClick={() => setShowConfig(!showConfig)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Columns
                <span className="config-count">
                  {Object.values(config).filter(v => v === true).length}
                </span>
              </button>

              {showConfig && (
                <div className="config-menu">
                  <div className="config-menu-header">
                    <span>Toggle Columns</span>
                    <button onClick={() => {
                      setConfig({
                        typeOfSupply: false,
                        showItems: false,
                        showNarration: false,
                        showGSTRate: true,
                        showVoucherType: true,
                        showVoucherNo: true,
                        showGSTIN: true,
                        showCustomerAddress: false,
                        showTaxes: true,
                        showTDS: false,
                      });
                    }} className="config-reset">Reset</button>
                  </div>
                  <div className="config-menu-items">
                    {Object.keys(config).map((key) => (
                      <label key={key} className="config-item">
                        <input
                          type="checkbox"
                          checked={config[key]}
                          onChange={() => handleCheck(key)}
                        />
                        {formatLabel(key)}
                      </label>
                    ))}
                  </div>
                  <div className="config-menu-footer">
                    <button onClick={() => {
                      const newConfig = {};
                      Object.keys(config).forEach(key => newConfig[key] = true);
                      setConfig(newConfig);
                    }}>Show All</button>
                    <button onClick={() => {
                      const newConfig = {};
                      Object.keys(config).forEach(key => newConfig[key] = false);
                      setConfig(newConfig);
                    }}>Hide All</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conditional Table Rendering */}
        {filters.by === "Invoice" && renderInvoiceTable()}
        {filters.by === "HSN" && renderHSNTable()}
        {filters.by === "Customer" && renderCustomerTable()}
      </div>
    </div>
  );
}