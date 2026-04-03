import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/salesummary.css";

export default function GeneralReports() {
    const { collapsed } = useOutletContext();
    const [showConfig, setShowConfig] = useState(false);
    const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
  const [config, setConfig] = useState({
    showAll: true,
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

  const handleCheck = (key) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  return (
     <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
    <div className="report-container">

      {/* Header */}
      <h2 className="report-title">Sale Summary</h2>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>From</label>
          <input type="date" />
        </div>
        <div className="filter-group">
          <label>To</label>
          <input type="date" />
        </div>

        <div className="filter-group">
          <label>By</label>
          <select>
            <option>Invoice</option>
            <option>HSN</option>
            <option>Customer</option>
          </select>
        </div>
      </div>

      {/* Configuration */}
      <div className="config-dropdown">
        <button className="config-btn" onClick={() => setShowConfig(!showConfig)}>
          Configuration ▼
        </button>

        {showConfig && (
          <div className="config-menu">
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
        )}
      </div>

      {/* SALES SUMMARY */}
      <div className="table-section">
        <h3>Sales Summary</h3>

        <table>
          <thead>
            <tr>
              <th>Inv No</th>
              <th>Inv Date</th>
              <th>Customer Name</th>
              {config.showVoucherType && <th>Voucher Type</th>}
              <th>Taxable Value</th>
              <th>Total GST</th>
              <th>Inv Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>01-04-2026</td>
              <td>ABC Pvt Ltd</td>
              {config.showVoucherType && <td>Sales</td>}
              <td>1000</td>
              <td>180</td>
              <td>1180</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* HSN SUMMARY */}
      <div className="table-section">
        <h3>HSN Summary</h3>

        <table>
          <thead>
            <tr>
              <th>HSN/SAC</th>
              <th>Taxable Value</th>
              <th>Total GST</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>5000</td>
              <td>900</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CUSTOMER SUMMARY */}
      <div className="table-section">
        <h3>Customer Summary</h3>

        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Inv Date</th>
              {config.showVoucherType && <th>Voucher Type</th>}
              {config.showGSTRate && <th>GST Rate</th>}
              <th>Taxable Value</th>
              <th>Total GST</th>
              <th>Inv Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XYZ Ltd</td>
              <td>02-04-2026</td>
              {config.showVoucherType && <td>Sales</td>}
              {config.showGSTRate && <td>18%</td>}
              <td>2000</td>
              <td>360</td>
              <td>2360</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    </div>
  );
}