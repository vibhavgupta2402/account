import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Search, 
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
  X,
  Settings
} from "lucide-react";
import "../styles/salesOrder.css";

export default function SalesOrderSummary() {
  const { collapsed } = useOutletContext();
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    supplyType: "all",
    config: "Customer"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "refNo", direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfigDropdown, setShowConfigDropdown] = useState(false);
  const configRef = useRef(null);

  // Column visibility configuration - Only for selectable columns
  const [columnConfig, setColumnConfig] = useState({
    showCustomerDetails: true,      // Customer (default)
    showItemDetails: false,          // Item Details
    showTransportDetails: false,     // Transport Details
    showBilledToShippedTo: false,    // Billed to shipped to
    showNarration: false,            // Show Narration
    showGSTDetails: false,           // GST Details (IGST/CGST,SGST/UTGST) & GST Rate
  });

  const data = [
    {
      refNo: "SO-001",
      date: "2026-04-01",
      displayDate: "01-04-2026",
      customer: "ABC Traders",
      customerGSTIN: "27AAACA1234A1Z",
      taxable: 10000,
      gst: 1800,
      total: 11800,
      status: "Pending",
      type: "Regular",
      items: 3,
      itemsList: "Product A (2 units @ ₹500), Product B (1 unit @ ₹1000)",
      transportDetails: "Transport: ABC Logistics, Vehicle No: MH-12-AB-1234, Driver: Ramesh",
      billingAddress: "Mumbai, Maharashtra - 400001",
      shippingAddress: "Thane, Maharashtra - 400601",
      narration: "Urgent delivery required",
      gstRate: "18%",
      cgst: 900,
      sgst: 900,
      igst: 0,
      customerDetails: "ABC Traders | GST: 27AAACA1234A1Z | Contact: 9876543210"
    },
    {
      refNo: "SO-002",
      date: "2026-04-02",
      displayDate: "02-04-2026",
      customer: "XYZ Pvt Ltd",
      customerGSTIN: "29BBBBC5678B2Z",
      taxable: 20000,
      gst: 3600,
      total: 23600,
      status: "Complete",
      type: "Export with Payment",
      items: 5,
      itemsList: "Product C (3 units @ ₹500), Product D (2 units @ ₹500)",
      transportDetails: "Transport: Global Shipping, Container No: GSCU1234567, Bill of Lading: BL123456",
      billingAddress: "Pune, Maharashtra - 411001",
      shippingAddress: "Mumbai Port, Maharashtra - 400001",
      narration: "Export documentation attached",
      gstRate: "18%",
      cgst: 0,
      sgst: 0,
      igst: 3600,
      customerDetails: "XYZ Pvt Ltd | GST: 29BBBBC5678B2Z | Contact: 9876543211"
    },
    {
      refNo: "SO-003",
      date: "2026-04-03",
      displayDate: "03-04-2026",
      customer: "MNO Industries",
      customerGSTIN: "33CCCDE7890C3X",
      taxable: 15000,
      gst: 2700,
      total: 17700,
      status: "Processing",
      type: "SEZ Supply",
      items: 2,
      itemsList: "Product E (2 units @ ₹500)",
      transportDetails: "Transport: SEZ Transport, Vehicle No: MH-14-CD-5678, SEZ Authorization: SEZ123",
      billingAddress: "Bangalore, Karnataka - 560001",
      shippingAddress: "SEZ Unit, Bangalore - 560099",
      narration: "SEZ documentation required",
      gstRate: "18%",
      cgst: 1350,
      sgst: 1350,
      igst: 0,
      customerDetails: "MNO Industries | GST: 33CCCDE7890C3X | Contact: 9876543212"
    },
    {
      refNo: "SO-004",
      date: "2026-03-28",
      displayDate: "28-03-2026",
      customer: "RST Global",
      customerGSTIN: "44DDDEF9012D4Y",
      taxable: 25000,
      gst: 4500,
      total: 29500,
      status: "Complete",
      type: "Regular",
      items: 8,
      itemsList: "Product F (5 units @ ₹500), Product G (3 units @ ₹500)",
      transportDetails: "Transport: Fast Logistics, Vehicle No: MH-01-EF-9012, LR No: LR789012",
      billingAddress: "Delhi, Delhi - 110001",
      shippingAddress: "Noida, UP - 201301",
      narration: "Priority handling",
      gstRate: "18%",
      cgst: 2250,
      sgst: 2250,
      igst: 0,
      customerDetails: "RST Global | GST: 44DDDEF9012D4Y | Contact: 9876543213"
    }
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case "Pending":
        return { icon: Clock, class: "so-status-pending", text: "Pending" };
      case "Complete":
        return { icon: CheckCircle, class: "so-status-complete", text: "Completed" };
      case "Processing":
        return { icon: Package, class: "so-status-processing", text: "Processing" };
      default:
        return { icon: Clock, class: "so-status-pending", text: status };
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  const handleSelectRow = (refNo) => {
    setSelectedRows(prev => 
      prev.includes(refNo) ? prev.filter(r => r !== refNo) : [...prev, refNo]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.refNo));
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
      showCustomerDetails: true,
      showItemDetails: false,
      showTransportDetails: false,
      showBilledToShippedTo: false,
      showNarration: false,
      showGSTDetails: false,
    });
  };

  const showAllColumns = () => {
    setColumnConfig({
      showCustomerDetails: true,
      showItemDetails: true,
      showTransportDetails: true,
      showBilledToShippedTo: true,
      showNarration: true,
      showGSTDetails: true,
    });
  };

  const hideAllColumns = () => {
    setColumnConfig({
      showCustomerDetails: false,
      showItemDetails: false,
      showTransportDetails: false,
      showBilledToShippedTo: false,
      showNarration: false,
      showGSTDetails: false,
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

  const getFilteredData = () => {
    let filtered = [...data];
    
    if (filters.fromDate && filters.toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const fromDate = new Date(filters.fromDate);
        const toDate = new Date(filters.toDate);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    } else if (filters.fromDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const fromDate = new Date(filters.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        return itemDate >= fromDate;
      });
    } else if (filters.toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999);
        return itemDate <= toDate;
      });
    }
    
    if (filters.supplyType && filters.supplyType !== "all") {
      filtered = filtered.filter(item => item.type === filters.supplyType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.refNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();
  
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    if (sortConfig.key === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const clearAllFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      supplyType: "all",
      config: "Customer"
    });
    setSearchTerm("");
    setSelectedRows([]);
  };

  const hasActiveFilters = filters.fromDate || filters.toDate || filters.supplyType !== "all" || searchTerm;

  // Define permanent columns (always visible)
  const permanentColumns = [
    { key: "refNo", label: "Ref no", field: "refNo", sortable: true },
    { key: "refDate", label: "Ref date", field: "displayDate", sortable: true },
    { key: "customerName", label: "Customer name", field: "customer", sortable: true },
    { key: "totalTaxable", label: "Total Taxable", field: "taxable", sortable: false },
    { key: "totalGst", label: "Total Gst", field: "gst", sortable: false },
    { key: "totalValue", label: "Total Value", field: "total", sortable: false },
  ];

  // Define selectable columns (can be toggled)
  const selectableColumns = [
    { key: "showCustomerDetails", label: "Customer", field: "customerDetails", sortable: false },
    { key: "showItemDetails", label: "Item Details", field: "itemsList", sortable: false },
    { key: "showTransportDetails", label: "Transport Details", field: "transportDetails", sortable: false },
    { key: "showBilledToShippedTo", label: "Billed to shipped to", field: "billingAddress", sortable: false, 
      render: (row) => (
        <div>
          <div><strong>Billed To:</strong> {row.billingAddress}</div>
          <div><strong>Shipped To:</strong> {row.shippingAddress}</div>
        </div>
      )
    },
    { key: "showNarration", label: "Show Narration", field: "narration", sortable: false },
    { key: "showGSTDetails", label: "GST Details (IGST/CGST,SGST/UTGST) & GST Rate", field: "gstDetails", sortable: false,
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
      <div className="so-sales-container">

        {/* Premium Header */}
        <div className="so-sales-header">
          <div className="so-sales-title-section">
            <div className="so-sales-icon-wrapper">
              <FileText size={28} />
            </div>
            <div>
              <h1>Sales Orders</h1>
              <p>Manage and track all your sales orders</p>
            </div>
          </div>

          {/* <button className="so-sales-btn-primary">
            <Plus size={20} />
            New Order
          </button> */}
        </div>

        {/* Filters Section */}
        <div className="so-sales-filters">
          <div className="so-sales-filters-grid">
            <div className="so-sales-filter-group">
              <label>
                <Calendar size={16} />
                Date Range
              </label>
              <div className="so-sales-date-range">
                <input 
                  type="date" 
                  className="so-sales-date-input"
                  value={filters.fromDate}
                  onChange={(e) => handleDateChange("fromDate", e.target.value)}
                  placeholder="From Date"
                />
                <span className="so-sales-date-separator">to</span>
                <input 
                  type="date" 
                  className="so-sales-date-input"
                  value={filters.toDate}
                  onChange={(e) => handleDateChange("toDate", e.target.value)}
                  placeholder="To Date"
                />
                {(filters.fromDate || filters.toDate) && (
                  <button className="so-sales-clear-date" onClick={clearDateFilter} title="Clear dates">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="so-sales-filter-group">
              <label>
                <Truck size={16} />
                Supply Type
              </label>
              <select 
                value={filters.supplyType}
                onChange={(e) => setFilters(prev => ({ ...prev, supplyType: e.target.value }))}
              >
                <option value="all">All Types</option>
                <option value="Regular">Regular</option>
                <option value="Export with Payment">Export with Payment</option>
                <option value="Export without Payment">Export without Payment</option>
                <option value="SEZ Supply">SEZ Supply</option>
              </select>
            </div>

            <div className="so-sales-filter-group">
              <label>
                <Settings size={16} />
                Configuration
              </label>
              <div className="so-sales-config-wrapper" ref={configRef}>
                <button 
                  className="so-sales-config-trigger"
                  onClick={() => setShowConfigDropdown(!showConfigDropdown)}
                >
                  Select Columns
                  <span className="so-sales-config-count">
                    {Object.values(columnConfig).filter(v => v === true).length}
                  </span>
                </button>

                {showConfigDropdown && (
                  <div className="so-sales-config-dropdown">
                    <div className="so-sales-config-header">
                      <span>Choose Optional Columns to Display</span>
                      <div className="so-sales-config-actions">
                        <button onClick={showAllColumns} className="so-sales-config-action-btn">Show All</button>
                        <button onClick={hideAllColumns} className="so-sales-config-action-btn">Hide All</button>
                        <button onClick={resetColumnConfig} className="so-sales-config-action-btn">Reset</button>
                      </div>
                    </div>
                    
                    <div className="so-sales-config-search">
                      <Search size={14} />
                      <input
                        type="text"
                        placeholder="Search columns..."
                        onChange={(e) => {
                          const searchTerm = e.target.value.toLowerCase();
                          const items = document.querySelectorAll(".so-sales-config-item");
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

                    <div className="so-sales-config-items">
                      {selectableColumns.map((col) => (
                        <label key={col.key} className="so-sales-config-item">
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

            <div className="so-sales-filter-actions">
              <button className="so-sales-btn-outline">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="so-sales-active-filters">
              <span className="so-sales-active-filters-label">Active Filters:</span>
              {filters.fromDate && (
                <span className="so-sales-filter-tag">
                  From: {new Date(filters.fromDate).toLocaleDateString()}
                  <button onClick={() => handleDateChange("fromDate", "")}>×</button>
                </span>
              )}
              {filters.toDate && (
                <span className="so-sales-filter-tag">
                  To: {new Date(filters.toDate).toLocaleDateString()}
                  <button onClick={() => handleDateChange("toDate", "")}>×</button>
                </span>
              )}
              {filters.supplyType !== "all" && (
                <span className="so-sales-filter-tag">
                  Type: {filters.supplyType}
                  <button onClick={() => setFilters(prev => ({ ...prev, supplyType: "all" }))}>×</button>
                </span>
              )}
              {searchTerm && (
                <span className="so-sales-filter-tag">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")}>×</button>
                </span>
              )}
              <button className="so-sales-clear-all" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="so-sales-stats-grid">
          <div className="so-sales-stat-card">
            <div className="so-sales-stat-icon so-sales-stat-icon-blue">
              <Package size={20} />
            </div>
            <div>
              <h3>Total Orders</h3>
              <p>{filteredData.length}</p>
            </div>
          </div>
          <div className="so-sales-stat-card">
            <div className="so-sales-stat-icon so-sales-stat-icon-green">
              <CheckCircle size={20} />
            </div>
            <div>
              <h3>Completed</h3>
              <p>{filteredData.filter(d => d.status === "Complete").length}</p>
            </div>
          </div>
          <div className="so-sales-stat-card">
            <div className="so-sales-stat-icon so-sales-stat-icon-orange">
              <Clock size={20} />
            </div>
            <div>
              <h3>Pending</h3>
              <p>{filteredData.filter(d => d.status === "Pending").length}</p>
            </div>
          </div>
          <div className="so-sales-stat-card">
            <div className="so-sales-stat-icon so-sales-stat-icon-purple">
              <FileText size={20} />
            </div>
            <div>
              <h3>Total Value</h3>
              <p>₹ {filteredData.reduce((sum, d) => sum + d.total, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Search Bar - Top of Table */}
        <div className="so-sales-table-toolbar">
          <div className="so-sales-search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="so-sales-table-search"
            />
            {searchTerm && (
              <button className="so-sales-clear-search-btn" onClick={() => setSearchTerm("")}>
                <X size={14} />
              </button>
            )}
          </div>
          <div className="so-sales-table-info">
            <span>{filteredData.length} orders found</span>
          </div>
        </div>

        {/* Premium Table with Dynamic Columns */}
        <div className="so-sales-table-wrapper">
          <table className="so-sales-table">
            <thead>
              <tr>
                <th className="so-sales-checkbox-col">
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
                    className={col.sortable ? "so-sales-sortable" : ""}
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
                  <tr key={row.refNo} className={selectedRows.includes(row.refNo) ? "so-sales-selected" : ""}>
                    <td className="so-sales-checkbox-col">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(row.refNo)}
                        onChange={() => handleSelectRow(row.refNo)}
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
                      
                      // Special formatting for status
                      if (col.field === "status") {
                        return (
                          <td key={col.key}>
                            <span className={`so-sales-status-badge ${getStatusConfig(row.status).class}`}>
                              <StatusIcon size={12} />
                              {getStatusConfig(row.status).text}
                            </span>
                           </td>
                        );
                      }
                      
                      return (
                        <td key={col.key} className={col.field === "refNo" ? "so-sales-ref-no" : ""}>
                          {displayValue || "-"}
                         </td>
                      );
                    })}
                    <td>
                      <div className="so-sales-action-buttons">
                        <button className="so-sales-icon-btn" title="View Details">
                          <Eye size={16} />
                        </button>
                        {row.status === "Pending" && (
                          <button className="so-sales-invoice-btn">
                            <FileText size={14} />
                            Create Invoice
                          </button>
                        )}
                        <button className="so-sales-icon-btn" title="More Options">
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
            <div className="so-sales-empty-state">
              <Package size={48} />
              <p>No orders found</p>
              <button className="so-sales-btn-outline" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedData.length > 0 && (
          <div className="so-sales-pagination">
            <div className="so-sales-pagination-info">
              Showing {sortedData.length} of {filteredData.length} orders
            </div>
            <div className="so-sales-pagination-controls">
              <button disabled>Previous</button>
              <button className="so-sales-active">1</button>
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