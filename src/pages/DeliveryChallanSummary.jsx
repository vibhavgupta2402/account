import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  Calendar,
  Truck,
  Package,
  ArrowUpDown,
  CheckCircle,
  Clock,
  MoreVertical,
  Plus,
  Edit,
  Printer,
  X,
  Settings
} from "lucide-react";
import "../styles/deliveryChallanSummary.css";

export default function DeliveryChallanSummary() {
  const { collapsed } = useOutletContext();
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    challanType: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "docNo", direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfigDropdown, setShowConfigDropdown] = useState(false);
  const configRef = useRef(null);

  // Column visibility configuration for selectable columns
  const [columnConfig, setColumnConfig] = useState({
    showItemDetails: false,
    showBilledShipped: false,
    showTransportDetails: false,
    showGSTRate: false,
  });

  const data = [
    {
      docNo: "DC-001",
      docDate: "2026-04-01",
      displayDate: "01-04-2026",
      customer: "ABC Traders",
      customerGSTIN: "27AAACA1234A1Z",
      billingAddress: "Mumbai, Maharashtra - 400001",
      shippingAddress: "Thane, Maharashtra - 400601",
      voucherType: "Delivery Challan",
      voucherNo: "V001",
      taxable: 15000,
      gst: 2700,
      total: 17700,
      status: "Pending",
      items: 4,
      itemsList: "Product A (2 units), Product B (2 units)",
      transportDetails: "Transport: Roadways Transport, Vehicle No: MH-12-AB-5678, Driver: Suresh",
      gstRate: "18%",
      cgst: 1350,
      sgst: 1350,
      igst: 0,
      transportMode: "Road",
      transporter: "Roadways Transport",
      vehicleNo: "MH-12-AB-5678",
      lrNo: "LR123456",
    },
    {
      docNo: "DC-002",
      docDate: "2026-04-02",
      displayDate: "02-04-2026",
      customer: "XYZ Pvt Ltd",
      customerGSTIN: "29BBBBC5678B2Z",
      billingAddress: "Pune, Maharashtra - 411001",
      shippingAddress: "Mumbai Port, Maharashtra - 400001",
      voucherType: "Delivery Challan",
      voucherNo: "V002",
      taxable: 20000,
      gst: 3600,
      total: 23600,
      status: "Complete",
      items: 6,
      itemsList: "Product C (3 units), Product D (3 units)",
      transportDetails: "Transport: Express Logistics, Vehicle No: MH-14-CD-9012, LR No: LR789012",
      gstRate: "18%",
      cgst: 0,
      sgst: 0,
      igst: 3600,
      transportMode: "Road",
      transporter: "Express Logistics",
      vehicleNo: "MH-14-CD-9012",
      lrNo: "LR789012",
    },
    {
      docNo: "DC-003",
      docDate: "2026-04-03",
      displayDate: "03-04-2026",
      customer: "MNO Industries",
      customerGSTIN: "33CCCDE7890C3X",
      billingAddress: "Bangalore, Karnataka - 560001",
      shippingAddress: "SEZ Unit, Bangalore - 560099",
      voucherType: "Stock Transfer",
      voucherNo: "V003",
      taxable: 12000,
      gst: 2160,
      total: 14160,
      status: "Processing",
      items: 3,
      itemsList: "Product E (3 units)",
      transportDetails: "Transport: Railways, Wagon No: WGN-12345, Rake No: RK67890",
      gstRate: "18%",
      cgst: 1080,
      sgst: 1080,
      igst: 0,
      transportMode: "Rail",
      transporter: "Indian Railways",
      vehicleNo: "WGN-12345",
      lrNo: "RR456789",
    },
    {
      docNo: "DC-004",
      docDate: "2026-04-04",
      displayDate: "04-04-2026",
      customer: "PQR Enterprises",
      customerGSTIN: "44DDDEF9012D4Y",
      billingAddress: "Delhi, Delhi - 110001",
      shippingAddress: "Noida, UP - 201301",
      voucherType: "Job Work",
      voucherNo: "V004",
      taxable: 18000,
      gst: 3240,
      total: 21240,
      status: "Pending",
      items: 5,
      itemsList: "Product F (3 units), Product G (2 units)",
      transportDetails: "Transport: Air Cargo, Flight No: AI-202, AWB No: AWB123456",
      gstRate: "18%",
      cgst: 1620,
      sgst: 1620,
      igst: 0,
      transportMode: "Air",
      transporter: "Air Cargo",
      vehicleNo: "AI-202",
      lrNo: "AWB123456",
    }
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case "Pending":
        return { icon: Clock, class: "status-pending", text: "Pending" };
      case "Complete":
        return { icon: CheckCircle, class: "status-complete", text: "Completed" };
      case "Processing":
        return { icon: Package, class: "status-processing", text: "Processing" };
      default:
        return { icon: Clock, class: "status-pending", text: status };
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  const handleSelectRow = (docNo) => {
    setSelectedRows(prev => 
      prev.includes(docNo) ? prev.filter(r => r !== docNo) : [...prev, docNo]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.docNo));
    }
  };

  const handleDateChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearDateFilter = () => {
    setFilters(prev => ({
      ...prev,
      fromDate: "",
      toDate: ""
    }));
  };

  const handleColumnToggle = (column) => {
    setColumnConfig(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const resetColumnConfig = () => {
    setColumnConfig({
      showItemDetails: false,
      showBilledShipped: false,
      showTransportDetails: false,
      showGSTRate: false,
    });
  };

  const showAllColumns = () => {
    setColumnConfig({
      showItemDetails: true,
      showBilledShipped: true,
      showTransportDetails: true,
      showGSTRate: true,
    });
  };

  const hideAllColumns = () => {
    setColumnConfig({
      showItemDetails: false,
      showBilledShipped: false,
      showTransportDetails: false,
      showGSTRate: false,
    });
  };

  // Click outside handler for config dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setShowConfigDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply all filters
  const getFilteredData = () => {
    let filtered = [...data];
    
    // Date range filter
    if (filters.fromDate && filters.toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.docDate);
        const fromDate = new Date(filters.fromDate);
        const toDate = new Date(filters.toDate);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    } else if (filters.fromDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.docDate);
        const fromDate = new Date(filters.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        return itemDate >= fromDate;
      });
    } else if (filters.toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.docDate);
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999);
        return itemDate <= toDate;
      });
    }
    
    // Challan type filter
    if (filters.challanType && filters.challanType !== "all") {
      filtered = filtered.filter(item => item.voucherType === filters.challanType);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.docNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();
  
  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    if (sortConfig.key === "docDate") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getChallanTypeIcon = (type) => {
    switch(type) {
      case "Job Work": return "🔧";
      case "Stock Transfer": return "📦";
      case "Exhibition": return "🎪";
      default: return "📄";
    }
  };

  const clearAllFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      challanType: "all",
    });
    setSearchTerm("");
    setSelectedRows([]);
  };

  const hasActiveFilters = filters.fromDate || filters.toDate || (filters.challanType !== "all") || searchTerm;

  // Define permanent columns (always visible)
  const permanentColumns = [
    { key: "docNo", label: "Doc No", field: "docNo", sortable: true },
    { key: "date", label: "Date", field: "displayDate", sortable: true },
    { key: "customer", label: "Customer", field: "customer", sortable: true },
    { key: "voucherType", label: "Voucher Type", field: "voucherType", sortable: false },
    { key: "voucherNo", label: "Voucher No", field: "voucherNo", sortable: false },
    { key: "taxable", label: "Taxable", field: "taxable", sortable: false },
    { key: "gst", label: "GST", field: "gst", sortable: false },
    { key: "total", label: "Total", field: "total", sortable: false },
    { key: "status", label: "Status", field: "status", sortable: false },
  ];

  // Define selectable columns (can be toggled)
  const selectableColumns = [
    { 
      key: "showItemDetails", 
      label: "Item Details", 
      field: "itemsList", 
      sortable: false,
      render: (row) => (
        <div>
          <strong>Items:</strong> {row.itemsList}
          <div><strong>Quantity:</strong> {row.items} units</div>
        </div>
      )
    },
    { 
      key: "showBilledShipped", 
      label: "Billed-Shipped", 
      field: "billingAddress", 
      sortable: false,
      render: (row) => (
        <div>
          <div><strong>Billed To:</strong></div>
          <div className="address-text">{row.billingAddress}</div>
          <div><strong>Shipped To:</strong></div>
          <div className="address-text">{row.shippingAddress}</div>
        </div>
      )
    },
    { 
      key: "showTransportDetails", 
      label: "Transport Details", 
      field: "transportDetails", 
      sortable: false,
      render: (row) => (
        <div>
          <div><strong>Mode:</strong> {row.transportMode}</div>
          <div><strong>Transporter:</strong> {row.transporter}</div>
          <div><strong>Vehicle No:</strong> {row.vehicleNo}</div>
          <div><strong>LR/Ref No:</strong> {row.lrNo}</div>
        </div>
      )
    },
    { 
      key: "showGSTRate", 
      label: "GST Rate", 
      field: "gstRate", 
      sortable: false,
      render: (row) => (
        <div>
          <div><strong>GST Rate:</strong> {row.gstRate}</div>
          {row.igst > 0 && <div><strong>IGST:</strong> ₹{row.igst.toLocaleString()}</div>}
          {row.cgst > 0 && <div><strong>CGST:</strong> ₹{row.cgst.toLocaleString()}</div>}
          {row.sgst > 0 && <div><strong>SGST/UTGST:</strong> ₹{row.sgst.toLocaleString()}</div>}
        </div>
      )
    },
  ];

  // Get visible selectable columns based on configuration
  const visibleSelectableColumns = selectableColumns.filter(col => columnConfig[col.key]);

  // Combine permanent and selectable columns for display
  const allVisibleColumns = [...permanentColumns, ...visibleSelectableColumns];

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="dc-container-modern">

        {/* Premium Header */}
        <div className="dc-header-modern">
          <div className="dc-title-section">
            <div className="dc-icon-wrapper">
              <FileText size={28} />
            </div>
            <div>
              <h1>Delivery Challan</h1>
              <p>Manage and track all delivery challans</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="dc-filters-modern">
          <div className="filters-grid">
            <div className="filter-group">
              <label>
                <Calendar size={16} />
                Date Range
              </label>
              <div className="date-range">
                <input
                  type="date"
                  className="date-input"
                  value={filters.fromDate}
                  onChange={(e) => handleDateChange("fromDate", e.target.value)} 
                  placeholder="From Date"
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  className="date-input"
                  value={filters.toDate}
                  onChange={(e) => handleDateChange("toDate", e.target.value)}
                  placeholder="To Date"
                />
                {(filters.fromDate || filters.toDate) && (
                  <button className="clear-date-btn" onClick={clearDateFilter} title="Clear dates">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="filter-group">
              <label>
                <Truck size={16} />
                Challan Type
              </label>
              <select 
                value={filters.challanType}
                onChange={(e) => setFilters(prev => ({ ...prev, challanType: e.target.value }))}
              >
                <option value="all">All Types</option>
                <option value="Job Work">Job Work</option>
                <option value="Approval Basis">Approval Basis</option>
                <option value="Stock Transfer">Stock Transfer</option>
                <option value="Exhibition">Exhibition</option>
                <option value="From Exhibition">From Exhibition</option>
              </select>
            </div>

            <div className="filter-group search-group">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search by challan, customer or voucher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="active-filters">
              <span className="active-filters-label">Active Filters:</span>
              {filters.fromDate && (
                <span className="filter-tag">
                  From: {new Date(filters.fromDate).toLocaleDateString()}
                  <button onClick={() => handleDateChange("fromDate", "")}>×</button>
                </span>
              )}
              {filters.toDate && (
                <span className="filter-tag">
                  To: {new Date(filters.toDate).toLocaleDateString()}
                  <button onClick={() => handleDateChange("toDate", "")}>×</button>
                </span>
              )}
              {filters.challanType !== "all" && (
                <span className="filter-tag">
                  Type: {filters.challanType}
                  <button onClick={() => setFilters(prev => ({ ...prev, challanType: "all" }))}>×</button>
                </span>
              )}
              {searchTerm && (
                <span className="filter-tag">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")}>×</button>
                </span>
              )}
              <button className="clear-all-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}

          <div className="filter-group config-group">
            <label>
              <Settings size={16} />
              Configuration
            </label>
            <div className="dc-config-wrapper" ref={configRef}>
              <button 
                className="dc-config-trigger"
                onClick={() => setShowConfigDropdown(!showConfigDropdown)}
              >
                Select Columns
                <span className="dc-config-count">
                  {Object.values(columnConfig).filter(v => v === true).length}
                </span>
              </button>

              {showConfigDropdown && (
                <div className="dc-config-dropdown">
                  <div className="dc-config-header">
                    <span>Choose Optional Columns to Display</span>
                    <div className="dc-config-actions">
                      <button onClick={showAllColumns} className="dc-config-action-btn">Show All</button>
                      <button onClick={hideAllColumns} className="dc-config-action-btn">Hide All</button>
                      <button onClick={resetColumnConfig} className="dc-config-action-btn">Reset</button>
                    </div>
                  </div>
                  
                  <div className="dc-config-search">
                    <Search size={14} />
                    <input
                      type="text"
                      placeholder="Search columns..."
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const items = document.querySelectorAll(".dc-config-item");
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

                  <div className="dc-config-items">
                    {selectableColumns.map((col) => (
                      <label key={col.key} className="dc-config-item">
                        <input
                          type="checkbox"
                          checked={columnConfig[col.key]}
                          onChange={() => handleColumnToggle(col.key)}
                        />
                        <span>{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn-outline-modern">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FileText size={20} />
            </div>
            <div>
              <h3>Total Challans</h3>
              <p>{filteredData.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle size={20} />
            </div>
            <div>
              <h3>Completed</h3>
              <p>{filteredData.filter(d => d.status === "Complete").length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <Clock size={20} />
            </div>
            <div>
              <h3>Pending</h3>
              <p>{filteredData.filter(d => d.status === "Pending").length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <Package size={20} />
            </div>
            <div>
              <h3>Total Items</h3>
              <p>{filteredData.reduce((sum, d) => sum + d.items, 0)}</p>
            </div>
          </div>
        </div>

        {/* Search Bar - Top of Table */}
        <div className="dc-table-toolbar">
          <div className="dc-search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by challan, customer or voucher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dc-table-search"
            />
            {searchTerm && (
              <button className="dc-clear-search-btn" onClick={() => setSearchTerm("")}>
                <X size={14} />
              </button>
            )}
          </div>
          <div className="dc-table-info">
            <span>{filteredData.length} challans found</span>
          </div>
        </div>

        {/* Premium Table with Dynamic Columns */}
        <div className="dc-table-wrapper-modern">
          <table className="dc-table-modern">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                {allVisibleColumns.map((col) => (
                  <th 
                    key={col.key} 
                    onClick={() => col.sortable && handleSort(col.field)}
                    className={col.sortable ? "dc-sortable" : ""}
                  >
                    {col.label}
                    {col.sortable && <ArrowUpDown size={14} />}
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => {
                const StatusIcon = getStatusConfig(row.status).icon;
                return (
                  <tr key={row.docNo} className={selectedRows.includes(row.docNo) ? "selected" : ""}>
                    <td className="checkbox-col">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(row.docNo)}
                        onChange={() => handleSelectRow(row.docNo)}
                      />
                    </td>
                    {allVisibleColumns.map((col) => {
                      // Check if column has custom render function
                      if (col.render) {
                        return (
                          <td key={col.key}>
                            {col.render(row)}
                          </td>
                        );
                      }
                      
                      let displayValue = row[col.field];
                      
                      // Special formatting for amount fields
                      if (col.field === "taxable" || col.field === "gst" || col.field === "total") {
                        displayValue = `₹ ${displayValue?.toLocaleString()}`;
                      }
                      
                      // Special formatting for voucher type with icon
                      if (col.field === "voucherType") {
                        return (
                          <td key={col.key}>
                            <span className="voucher-type-badge">
                              {getChallanTypeIcon(displayValue)} {displayValue}
                            </span>
                          </td>
                        );
                      }
                      
                      // Special formatting for status
                      if (col.field === "status") {
                        return (
                          <td key={col.key}>
                            <span className={`status-badge ${getStatusConfig(row.status).class}`}>
                              <StatusIcon size={12} />
                              {getStatusConfig(row.status).text}
                            </span>
                          </td>
                        );
                      }
                      
                      return (
                        <td key={col.key} className={col.field === "docNo" ? "doc-no" : ""}>
                          {displayValue || "-"}
                        </td>
                      );
                    })}
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn" title="View Details">
                          <Eye size={16} />
                        </button>
                        {row.status === "Pending" && (
                          <>
                            <button className="icon-btn" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="invoice-btn-modern">
                              <Printer size={14} />
                              Print
                            </button>
                          </>
                        )}
                        <button className="icon-btn" title="More Options">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {sortedData.length === 0 && (
            <div className="empty-state">
              <Package size={48} />
              <p>No delivery challans found</p>
              <button className="btn-outline-modern" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedData.length > 0 && (
          <div className="pagination-modern">
            <div className="pagination-info">
              Showing {sortedData.length} of {filteredData.length} challans
            </div>
            <div className="pagination-controls">
              <button disabled>Previous</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>Next</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}