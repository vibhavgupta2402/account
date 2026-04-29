import { useState, useMemo } from "react";
import "../styles/CustomerVendorSummary.css";
import { useOutletContext } from "react-router-dom";

const CustomerVendorSummary = () => {
  const { collapsed } = useOutletContext();
  const [period, setPeriod] = useState("monthly");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const data = [
    {
      name: "Mathur Ind.",
      type: "Creditor",
      unit: "MTR",
      opening: 1000,
      inward: 500,
      outward: 300,
      rate: 50,
      gst: "18%",
    },
    {
      name: "SA Traders",
      type: "Debtor",
      unit: "KGS",
      opening: 700,
      inward: 300,
      outward: 200,
      rate: 40,
      gst: "5%",
    },
    {
      name: "Sharma Enterprises",
      type: "Creditor",
      unit: "PCS",
      opening: 1500,
      inward: 800,
      outward: 600,
      rate: 75,
      gst: "18%",
    },
    {
      name: "Gupta Agencies",
      type: "Debtor",
      unit: "MTR",
      opening: 900,
      inward: 400,
      outward: 350,
      rate: 55,
      gst: "12%",
    },
  ];

  const processed = useMemo(() => {
    let filtered = data.filter((d) => {
      // Search filter
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      
      // Type filter
      if (type === "customer") return matchesSearch && d.type === "Debtor";
      if (type === "vendor") return matchesSearch && d.type === "Creditor";
      if (type === "gst") return matchesSearch;
      return matchesSearch;
    });

    // Calculate derived fields
    let calculated = filtered.map((d) => {
      const closingQty = d.opening + d.inward - d.outward;
      const closingAmt = closingQty * d.rate;
      const openingAmt = d.opening * d.rate;
      const inwardAmt = d.inward * d.rate;
      const outwardAmt = d.outward * d.rate;

      return {
        ...d,
        closingQty,
        closingAmt,
        openingAmt,
        inwardAmt,
        outwardAmt,
      };
    });

    // Sorting
    if (sortConfig.key) {
      calculated.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return calculated;
  }, [search, type, sortConfig]);

  // Summary Statistics
  const summaryStats = useMemo(() => {
    const totalOpening = processed.reduce((sum, row) => sum + row.opening, 0);
    const totalInward = processed.reduce((sum, row) => sum + row.inward, 0);
    const totalOutward = processed.reduce((sum, row) => sum + row.outward, 0);
    const totalClosing = processed.reduce((sum, row) => sum + row.closingQty, 0);
    const totalValue = processed.reduce((sum, row) => sum + row.closingAmt, 0);

    return { totalOpening, totalInward, totalOutward, totalClosing, totalValue };
  }, [processed]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const getPartyTypeBadge = (type) => {
    return type === "Creditor" ? 
      <span className="badge vendor">🏭 Vendor</span> : 
      <span className="badge customer">👤 Customer</span>;
  };

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="cv-container">
        {/* Header Section */}
        <div className="cv-header">
          <div className="header-left">
            <h1 className="cv-title">
              <span className="title-icon">👥</span>
              Customer / Vendor Summary
            </h1>
            <p className="cv-subtitle">Track party-wise transactions and balances</p>
          </div>
        </div>

        {/* Stats Cards - Compact */}
        <div className="stats-grid-compact">
          <div className="stat-card-compact">
            <div className="stat-icon-compact purple">📦</div>
            <div className="stat-info-compact">
              <span className="stat-label">Total Closing</span>
              <strong>{summaryStats.totalClosing.toLocaleString()} Units</strong>
            </div>
          </div>
          <div className="stat-card-compact">
            <div className="stat-icon-compact green">💰</div>
            <div className="stat-info-compact">
              <span className="stat-label">Total Value</span>
              <strong>₹ {summaryStats.totalValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</strong>
            </div>
          </div>
          <div className="stat-card-compact">
            <div className="stat-icon-compact blue">📥</div>
            <div className="stat-info-compact">
              <span className="stat-label">Total Inward</span>
              <strong>{summaryStats.totalInward.toLocaleString()}</strong>
            </div>
          </div>
          <div className="stat-card-compact">
            <div className="stat-icon-compact orange">📤</div>
            <div className="stat-info-compact">
              <span className="stat-label">Total Outward</span>
              <strong>{summaryStats.totalOutward.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Filters Row - Compact */}
        <div className="filters-row-compact">
          <div className="filter-group-compact">
            <label>📅 Period</label>
            <select 
              className="compact-select"
              value={period} 
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="filter-group-compact">
            <label>👥 View Type</label>
            <select 
              className="compact-select"
              value={type} 
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All Parties</option>
              <option value="customer">Customers Only</option>
              <option value="vendor">Vendors Only</option>
              <option value="gst">GST Rate Wise</option>
            </select>
          </div>

          <div className="search-group-compact">
            <label>🔍 Search</label>
            <div className="search-wrapper-compact">
              <input
                className="compact-search"
                placeholder="Search party name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-btn" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
          </div>
        </div>

        {/* Table Section - Compact Size */}
        <div className="table-card-compact">
          <div className="table-header-compact">
            <div className="table-title-compact">
              <span>📋</span>
              <h3>Transaction Details</h3>
              <span className="record-badge">{processed.length} records</span>
            </div>
          </div>

          <div className="table-container-compact">
            {type !== "gst" ? (
              <table className="compact-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")} className="sortable">
                      Party Name {getSortIcon("name")}
                    </th>
                    <th onClick={() => handleSort("type")} className="sortable">
                      Type {getSortIcon("type")}
                    </th>
                    <th onClick={() => handleSort("unit")} className="sortable">
                      Unit {getSortIcon("unit")}
                    </th>
                    <th onClick={() => handleSort("opening")} className="sortable numeric">
                      Opening {getSortIcon("opening")}
                    </th>
                    <th onClick={() => handleSort("inward")} className="sortable numeric">
                      Inward {getSortIcon("inward")}
                    </th>
                    <th onClick={() => handleSort("outward")} className="sortable numeric">
                      Outward {getSortIcon("outward")}
                    </th>
                    <th onClick={() => handleSort("closingQty")} className="sortable numeric">
                      Closing Qty {getSortIcon("closingQty")}
                    </th>
                    <th onClick={() => handleSort("closingAmt")} className="sortable numeric">
                      Closing Amt {getSortIcon("closingAmt")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processed.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-state-compact">
                        <span>📭</span>
                        <p>No records found</p>
                      </td>
                    </tr>
                  ) : (
                    processed.map((row, i) => (
                      <tr key={i} className="data-row">
                        <td className="party-name">{row.name}</td>
                        <td>{getPartyTypeBadge(row.type)}</td>
                        <td><span className="unit-pill">{row.unit}</span></td>
                        <td className="numeric">{row.opening.toLocaleString()}</td>
                        <td className="numeric inward">{row.inward.toLocaleString()}</td>
                        <td className="numeric outward">{row.outward.toLocaleString()}</td>
                        <td className="numeric closing-qty">{row.closingQty.toLocaleString()}</td>
                        <td className="numeric closing-amt">
                          ₹ {row.closingAmt.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="compact-table gst-table">
                <thead>
                  <tr>
                    <th rowSpan="2">Party Name</th>
                    <th rowSpan="2">GST Rate</th>
                    <th colSpan="3">Opening</th>
                    <th colSpan="3">Inward</th>
                    <th colSpan="3">Outward</th>
                    <th colSpan="3">Closing</th>
                  </tr>
                  <tr>
                    <th>Qty</th><th>Rate</th><th>Amt</th>
                    <th>Qty</th><th>Rate</th><th>Amt</th>
                    <th>Qty</th><th>Rate</th><th>Amt</th>
                    <th>Qty</th><th>Rate</th><th>Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {processed.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="empty-state-compact">
                        <span>📭</span>
                        <p>No records found</p>
                      </td>
                    </tr>
                  ) : (
                    processed.map((row, i) => (
                      <tr key={i} className="data-row">
                        <td className="party-name">{row.name}</td>
                        <td><span className="gst-pill">{row.gst}</span></td>
                        <td className="numeric">{row.opening}</td>
                        <td className="numeric">₹{row.rate}</td>
                        <td className="numeric">₹{row.openingAmt}</td>
                        <td className="numeric">{row.inward}</td>
                        <td className="numeric">₹{row.rate}</td>
                        <td className="numeric">₹{row.inwardAmt}</td>
                        <td className="numeric">{row.outward}</td>
                        <td className="numeric">₹{row.rate}</td>
                        <td className="numeric">₹{row.outwardAmt}</td>
                        <td className="numeric closing-qty">{row.closingQty}</td>
                        <td className="numeric">₹{row.rate}</td>
                        <td className="numeric closing-amt">₹{row.closingAmt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerVendorSummary;