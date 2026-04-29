import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/StockSummary.css";

const StockSummary = () => {
  const { collapsed } = useOutletContext();

  const initialData = [
    {
      item: "Cloth",
      group: "Godown-1",
      unit: "MTR",
      opening: 1120,
      inward: 5325,
      outward: 6320,
      rate: 30.25,
    },
    {
      item: "Rice",
      group: "Godown-2",
      unit: "KG",
      opening: 500,
      inward: 1200,
      outward: 900,
      rate: 40,
    },
    {
      item: "Wheat Flour",
      group: "Godown-1",
      unit: "KG",
      opening: 800,
      inward: 2500,
      outward: 2100,
      rate: 35.50,
    },
    {
      item: "Sugar",
      group: "Godown-2",
      unit: "KG",
      opening: 300,
      inward: 950,
      outward: 800,
      rate: 42.75,
    },
  ];

  const [periodType, setPeriodType] = useState("monthly");
  const [type, setType] = useState("both");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter + Calculation + Sorting
  const processedData = useMemo(() => {
    let data = [...initialData];

    // Search filter
    if (search) {
      data = data.filter(
        (d) =>
          d.item.toLowerCase().includes(search.toLowerCase()) ||
          d.group.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate derived fields
    let calculatedData = data.map((row) => {
      const stock = row.opening + row.inward - row.outward;
      const closing = stock * row.rate;
      const turnover = row.outward * row.rate;

      return {
        ...row,
        stock,
        closing,
        turnover,
      };
    });

    // Sorting
    if (sortConfig.key) {
      calculatedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return calculatedData;
  }, [search, sortConfig]);

  // Summary Statistics
  const summaryStats = useMemo(() => {
    const totalOpening = processedData.reduce((sum, row) => sum + row.opening, 0);
    const totalInward = processedData.reduce((sum, row) => sum + row.inward, 0);
    const totalOutward = processedData.reduce((sum, row) => sum + row.outward, 0);
    const totalStock = processedData.reduce((sum, row) => sum + row.stock, 0);
    const totalValue = processedData.reduce((sum, row) => sum + row.closing, 0);

    return { totalOpening, totalInward, totalOutward, totalStock, totalValue };
  }, [processedData]);

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

  const getStockStatus = (stock) => {
    if (stock > 1000) return "high";
    if (stock > 500) return "medium";
    return "low";
  };

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="stock-summary-container">
        {/* Header Section */}
        <div className="summary-header">
          <div className="header-left">
            <h1 className="page-title">
              <span className="title-icon">📊</span>
              Stock Summary
            </h1>
            <p className="page-subtitle">Manage and track your inventory efficiently</p>
          </div>
          <div className="header-right">
            <button className="stock-export-btn">
              📥 Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">📦</div>
            <div className="stat-info">
              <h3>Total Stock Qty</h3>
              <p>{summaryStats.totalStock.toLocaleString()} Units</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">💰</div>
            <div className="stat-info">
              <h3>Total Stock Value</h3>
              <p>₹ {summaryStats.totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">📥</div>
            <div className="stat-info">
              <h3>Total Inward</h3>
              <p>{summaryStats.totalInward.toLocaleString()} Units</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">📤</div>
            <div className="stat-info">
              <h3>Total Outward</h3>
              <p>{summaryStats.totalOutward.toLocaleString()} Units</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-card">
          <div className="filters-header">
            <span className="filters-icon">🔍</span>
            <h3>Filters & Controls</h3>
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Period Type</label>
              <select
                className="modern-select"
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
              >
                <option value="custom">📅 Custom Range</option>
                <option value="quarterly">📆 Quarterly</option>
                <option value="monthly">📆 Monthly</option>
                <option value="yearly">📅 Yearly</option>
              </select>
            </div>

            {periodType === "custom" && (
              <div className="filter-group date-range-group">
                <label>Date Range</label>
                <div className="date-range">
                  <input
                    type="date"
                    className="date-input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <span className="date-separator">→</span>
                  <input
                    type="date"
                    className="date-input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="filter-group">
              <label>View Type</label>
              <select
                className="modern-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="both">📋 Both (Item & Group)</option>
                <option value="item">📦 Item-wise</option>
                <option value="group">🏭 Group-wise</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-card">
          <div className="table-header">
            <div className="table-title-section">
              <span className="table-icon">📋</span>
              <h3>Inventory Details</h3>
              <span className="record-count">{processedData.length} records</span>
            </div>
            <div className="stock-search-below">
                <span className="search-icon">🔎</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by item name or group..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button className="clear-search" onClick={() => setSearch("")}>
                    ✕
                    </button>
                )}
            </div>
          </div>
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  {type !== "group" && (
                    <th onClick={() => handleSort("item")} className="sortable">
                      Item Name {getSortIcon("item")}
                    </th>
                  )}
                  {type !== "item" && (
                    <th onClick={() => handleSort("group")} className="sortable">
                      Group {getSortIcon("group")}
                    </th>
                  )}
                  <th onClick={() => handleSort("unit")} className="sortable">
                    Unit {getSortIcon("unit")}
                  </th>
                  <th onClick={() => handleSort("opening")} className="sortable numeric">
                    Opening Qty {getSortIcon("opening")}
                  </th>
                  <th onClick={() => handleSort("inward")} className="sortable numeric">
                    Inward Qty {getSortIcon("inward")}
                  </th>
                  <th onClick={() => handleSort("outward")} className="sortable numeric">
                    Outward Qty {getSortIcon("outward")}
                  </th>
                  <th onClick={() => handleSort("rate")} className="sortable numeric">
                    Avg Rate {getSortIcon("rate")}
                  </th>
                  <th onClick={() => handleSort("stock")} className="sortable numeric">
                    Stock Qty {getSortIcon("stock")}
                  </th>
                  <th onClick={() => handleSort("closing")} className="sortable numeric">
                    Closing Stock {getSortIcon("closing")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {processedData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">
                      <div className="empty-state">
                        <span className="empty-icon">📭</span>
                        <p>No data found</p>
                        <span>Try adjusting your search or filters</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedData.map((row, index) => (
                    <tr key={index} className="table-row">
                      {type !== "group" && <td className="item-name">{row.item}</td>}
                      {type !== "item" && <td className="group-name">{row.group}</td>}
                      <td>
                        <span className="unit-badge">{row.unit}</span>
                      </td>
                      <td className="numeric">{row.opening.toLocaleString()}</td>
                      <td className="numeric inward-value">{row.inward.toLocaleString()}</td>
                      <td className="numeric outward-value">{row.outward.toLocaleString()}</td>
                      <td className="numeric rate-value">
                        ₹ {row.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="numeric">
                        <span className={`stock-badge ${getStockStatus(row.stock)}`}>
                          {row.stock.toLocaleString()}
                        </span>
                      </td>
                      <td className="numeric closing-value">
                        ₹ {row.closing.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSummary;