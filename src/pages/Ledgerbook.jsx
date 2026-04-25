import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import '../styles/LedgerBook.css';

// Mock data for demonstration
const mockLedgers = [
  {
    id: '1',
    name: 'Bismi Enterprises',
    type: 'customer',
    openingBalance: 10000,
    entries: [
      {
        id: 'e1',
        date: '01-04-25',
        vancherType: 'Opening Balance',
        vancherNo: 'OB-001',
        narration: 'Opening Balance',
        amountDr: 10000,
        amountCr: 0,
        balance: 10000,
        mo: 'Dr'
      },
      {
        id: 'e2',
        date: '05-05-25',
        vancherType: 'Sales',
        vancherNo: 'SA-2025001',
        narration: 'Sales AK',
        amountDr: 0,
        amountCr: 218000,
        balance: 228000,
        mo: 'Dr'
      },
      {
        id: 'e3',
        date: '06-05-25',
        vancherType: 'Receipt',
        vancherNo: 'INC-20',
        narration: 'IDB/Bank Chq.No: 200000',
        amountDr: 200000,
        amountCr: 0,
        balance: 28000,
        mo: 'Dr'
      }
    ]
  },
  {
    id: '2',
    name: 'Suresh Kumar',
    type: 'salesman',
    code: 'SM-001',
    openingBalance: 0,
    entries: [],
    salesmanData: [
      {
        id: 's1',
        date: '01-04-25',
        partyName: 'Bismi Enterprises',
        vancherType: 'Opening Balance',
        vancherNo: 'OB-001',
        mo: 'Cr',
        salesAmount: 15000,
        commPercent: 5,
        commAmount: 750,
        amountDr: 0,
        amountCr: 15000,
        balance: 15000
      },
      {
        id: 's2',
        date: '05-05-25',
        partyName: 'Bismi Enterprises',
        vancherType: 'Salary A/c',
        vancherNo: 'JN-25',
        mo: 'Cr',
        salesAmount: 10000,
        commPercent: 0,
        commAmount: 0,
        amountDr: 0,
        amountCr: 10000,
        balance: 25000,
      },
      {
        id: 's3',
        date: '31-05-25',
        partyName: 'IDB/Bank',
        vancherType: 'Payment',
        vancherNo: 'Pay-120',
        mo: 'Dr',
        salesAmount: 25000,
        commPercent: 0,
        commAmount: 0,
        amountDr: 25000,
        amountCr: 0,
        balance: 0,
      },
      {
        id: 's4',
        date: '10-06-25',
        partyName: 'Commission Entry',
        vancherType: 'Journal',
        vancherNo: 'CM-25',
        mo: 'Cr',
        salesAmount: 40000,
        commPercent: 0,
        commAmount: 0,
        amountDr: 0,
        amountCr: 40000,
        balance: 40000,
      }
    ]
  }
];

const LedgerBook = () => {
  const { collapsed } = useOutletContext();
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isLedgerDropdownOpen, setIsLedgerDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState('01-04-2025');
  const [toDate, setToDate] = useState('31-03-2026');
  const [showVancherNo, setShowVancherNo] = useState(true);
  const [showNarration, setShowNarration] = useState(false);
  const [showBillWise, setShowBillWise] = useState(false);
  const [showBalanceColumn, setShowBalanceColumn] = useState(true);
  const [hideStripeView, setHideStripeView] = useState(false);
  const [showAllColumns, setShowAllColumns] = useState(false);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLedgerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateTotals = (entries) => {
    const totalDr = entries.reduce((sum, e) => sum + e.amountDr, 0);
    const totalCr = entries.reduce((sum, e) => sum + e.amountCr, 0);
    return { totalDr, totalCr };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // const handleApply = () => {
  //   // Apply filters logic here
  //   console.log('Applying filters:', { fromDate, toDate, selectedLedger });
  // };

  const renderLedgerTable = (ledger) => {
    const { totalDr, totalCr } = calculateTotals(ledger.entries);
    const closingBalance = ledger.entries.length > 0 
      ? ledger.entries[ledger.entries.length - 1].balance 
      : ledger.openingBalance;

    return (
      <div className="corporate-table-wrapper">
        <table className="corporate-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ledger Name</th>
              {showVancherNo && <th>Voucher No</th>}
              <th>Voucher Type</th>
              <th>Dr/Cr</th>
              {showNarration && <th>Narration</th>}
              <th className="text-right">Debit (₹)</th>
              <th className="text-right">Credit (₹)</th>
              {showBalanceColumn && <th className="text-right">Balance (₹)</th>}
            </tr>
          </thead>
          <tbody>
            <tr className="opening-row">
              <td>{fromDate.split('-')[0]}-{fromDate.split('-')[1]}-{fromDate.split('-')[2].slice(-2)}</td>
              <td className="font-medium">{ledger.name}</td>
              {showVancherNo && <td>-</td>}
              <td>Opening Balance</td>
              <td>{ledger.openingBalance >= 0 ? 'Dr' : 'Cr'}</td>
              {showNarration && <td>Opening Balance</td>}
              <td className="text-right debit">
                {ledger.openingBalance >= 0 ? formatCurrency(ledger.openingBalance) : '-'}
              </td>
              <td className="text-right credit">
                {ledger.openingBalance < 0 ? formatCurrency(Math.abs(ledger.openingBalance)) : '-'}
              </td>
              {showBalanceColumn && (
                <td className="text-right balance">
                  {formatCurrency(ledger.openingBalance)} {ledger.openingBalance >= 0 ? 'Dr' : 'Cr'}
                </td>
              )}
            </tr>

            {ledger.entries.map((entry, idx) => (
              <tr key={entry.id} className={!hideStripeView && idx % 2 === 0 ? 'stripe-row' : ''}>
                <td>{entry.date}</td>
                <td className="font-medium">{ledger.name}</td>
                {showVancherNo && <td>{entry.vancherNo}</td>}
                <td>{entry.vancherType}</td>
                <td>{entry.mo}</td>
                {showNarration && <td>{entry.narration}</td>}
                <td className="text-right debit">
                  {entry.amountDr > 0 ? formatCurrency(entry.amountDr) : '-'}
                </td>
                <td className="text-right credit">
                  {entry.amountCr > 0 ? formatCurrency(entry.amountCr) : '-'}
                </td>
                {showBalanceColumn && (
                  <td className="text-right balance">
                    {formatCurrency(entry.balance)} {entry.mo}
                  </td>
                )}
              </tr>
            ))}

            <tr className="total-row">
              <td colSpan={showVancherNo ? (showNarration ? 6 : 5) : (showNarration ? 5 : 4)} className="text-right">
                <strong>Current Total</strong>
              </td>
              <td className="text-right debit"><strong>{formatCurrency(totalDr)}</strong></td>
              <td className="text-right credit"><strong>{formatCurrency(totalCr)}</strong></td>
              {showBalanceColumn && <td></td>}
            </tr>

            <tr className="closing-row">
              <td colSpan={showVancherNo ? (showNarration ? 6 : 5) : (showNarration ? 5 : 4)} className="text-right">
                <strong>Closing Balance</strong>
              </td>
              <td className="text-right balance"><strong>{formatCurrency(closingBalance)}</strong></td>
              <td></td>
              {showBalanceColumn && <td></td>}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderSalesmanTable = (ledger) => {
    if (!ledger.salesmanData) return null;
    
    const totalSales = ledger.salesmanData.reduce((sum, e) => sum + e.salesAmount, 0);
    const totalComm = ledger.salesmanData.reduce((sum, e) => sum + e.commAmount, 0);
    const closingBalance = ledger.salesmanData.length > 0 
      ? ledger.salesmanData[ledger.salesmanData.length - 1].balance 
      : 0;

    return (
      <div className="salesman-section">
        <div className="salesman-info-bar">
          <span className="info-icon">👤</span>
          <span className="info-text">Salesman Code: <strong>{ledger.code || 'N/A'}</strong></span>
        </div>
        <div className="corporate-table-wrapper">
          <table className="corporate-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Party Name</th>
                {showVancherNo && <th>Voucher No</th>}
                <th>Voucher Type</th>
                <th>Dr/Cr</th>
                <th className="text-right">Sales Amount (₹)</th>
                <th className="text-right">Commission %</th>
                <th className="text-right">Commission Amount (₹)</th>
                <th className="text-right">Debit (₹)</th>
                <th className="text-right">Credit (₹)</th>
                {showBalanceColumn && <th className="text-right">Balance (₹)</th>}
              </tr>
            </thead>
            <tbody>
              {ledger.salesmanData.map((entry, idx) => (
                <tr key={entry.id} className={!hideStripeView && idx % 2 === 0 ? 'stripe-row' : ''}>
                  <td>{entry.date}</td>
                  <td className="font-medium">{entry.partyName}</td>
                  {showVancherNo && <td>{entry.vancherNo}</td>}
                  <td>{entry.vancherType}</td>
                  <td>{entry.mo}</td>
                  <td className="text-right">{formatCurrency(entry.salesAmount)}</td>
                  <td className="text-right">{entry.commPercent}%</td>
                  <td className="text-right commission">{formatCurrency(entry.commAmount)}</td>
                  <td className="text-right debit">
                    {entry.amountDr > 0 ? formatCurrency(entry.amountDr) : '-'}
                  </td>
                  <td className="text-right credit">
                    {entry.amountCr > 0 ? formatCurrency(entry.amountCr) : '-'}
                  </td>
                  {showBalanceColumn && (
                    <td className="text-right balance">
                      {formatCurrency(entry.balance)} {entry.balance >= 0 ? 'Cr' : 'Dr'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={showVancherNo ? 5 : 4} className="text-right">
                  <strong>Totals</strong>
                </td>
                <td className="text-right"><strong>{formatCurrency(totalSales)}</strong></td>
                <td></td>
                <td className="text-right"><strong>{formatCurrency(totalComm)}</strong></td>
                <td className="text-right debit"><strong>{formatCurrency(ledger.salesmanData.reduce((sum, e) => sum + e.amountDr, 0))}</strong></td>
                <td className="text-right credit"><strong>{formatCurrency(ledger.salesmanData.reduce((sum, e) => sum + e.amountCr, 0))}</strong></td>
                {showBalanceColumn && <td className="text-right balance"><strong>{formatCurrency(closingBalance)}</strong></td>}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="ledger-content">
        {/* Header Bar */}
        <div className="ledger-header-bar">
          <div className="header-title">
            <h2>Ledger Book</h2>
            <p className="header-subtitle">View and manage ledger transactions</p>
          </div>
          <div className="header-actions">
            <button className="action-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Export
            </button>
            <button className="action-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              PDF
            </button>
            <button className="action-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 18"/>
                <path d="M6 14L18 14"/>
                <path d="M6 10L18 10"/>
                <path d="M6 6L18 6"/>
                <path d="M4 4L20 4"/>
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="filters-card">
          <div className="led-filters-grid">
            <div className="filter-field">
              <label className="filter-label">From Date</label>
              <div className="date-input-wrapper">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input
                  type="text"
                  className="filter-input"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            <div className="filter-field">
              <label className="filter-label">To Date</label>
              <div className="date-input-wrapper">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input
                  type="text"
                  className="filter-input"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            <div className="filter-field" ref={dropdownRef}>
              <label className="filter-label">Select Ledger</label>
              <div className="ledger-select-wrapper">
                <button
                  onClick={() => setIsLedgerDropdownOpen(!isLedgerDropdownOpen)}
                  className="ledger-select-btn"
                >
                  <span className={selectedLedger ? 'selected-text' : 'placeholder-text'}>
                    {selectedLedger ? selectedLedger.name : 'Choose a ledger...'}
                  </span>
                  <svg className={`dropdown-chevron ${isLedgerDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {isLedgerDropdownOpen && (
                  <div className="ledger-dropdown-menu">
                    {mockLedgers.map((ledger) => (
                      <button
                        key={ledger.id}
                        onClick={() => {
                          setSelectedLedger(ledger);
                          setIsLedgerDropdownOpen(false);
                        }}
                        className="ledger-option"
                      >
                        <div className="option-info">
                          <span className="option-name">{ledger.name}</span>
                          <span className="option-type">{ledger.type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="filter-field apply-field">
              {/* <button className="apply-btn" onClick={handleApply}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Apply Filters
              </button> */}
            </div>
          </div>

          {/* Display Options - Integrated */}
          <div className="display-options">
            <span className="options-label">Display Options:</span>
            <div className="options-group">
              <label className="option-checkbox">
                <input type="checkbox" checked={showVancherNo} onChange={(e) => setShowVancherNo(e.target.checked)} />
                <span>Voucher No</span>
              </label>
              <label className="option-checkbox">
                <input type="checkbox" checked={showNarration} onChange={(e) => setShowNarration(e.target.checked)} />
                <span>Narration</span>
              </label>
              <label className="option-checkbox">
                <input type="checkbox" checked={showBillWise} onChange={(e) => setShowBillWise(e.target.checked)} />
                <span>Bill Wise</span>
              </label>
              <label className="option-checkbox">
                <input type="checkbox" checked={showBalanceColumn} onChange={(e) => setShowBalanceColumn(e.target.checked)} />
                <span>Balance Column</span>
              </label>
              <label className="option-checkbox">
                <input type="checkbox" checked={hideStripeView} onChange={(e) => setHideStripeView(e.target.checked)} />
                <span>Disable Stripes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Ledger Display Area */}
        {selectedLedger ? (
          <div className="ledger-display-area">
            <div className="ledger-header-info">
              <div>
                <h3>{selectedLedger.name}</h3>
                <div className="ledger-meta">
                  <span className="meta-badge">{selectedLedger.type}</span>
                  <span className="meta-text">Ledger Account</span>
                </div>
              </div>
              <div className="date-range-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{fromDate} - {toDate}</span>
              </div>
            </div>

            {selectedLedger.type === 'salesman' && selectedLedger.salesmanData ? (
              renderSalesmanTable(selectedLedger)
            ) : (
              renderLedgerTable(selectedLedger)
            )}
          </div>
        ) : (
          <div className="empty-ledger-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h4>No Ledger Selected</h4>
            <p>Please select a ledger from the dropdown above to view transaction details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LedgerBook;