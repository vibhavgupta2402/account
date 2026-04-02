import { useOutletContext } from "react-router-dom";
import React, { useState, useMemo } from "react";

const transactionsData = [
  { date: "2026-01-01", ledger: "Cash", voucher: "Payment-In", no: "PI-001", debit: 10000, credit: 0 },
  { date: "2026-01-02", ledger: "Bank", voucher: "Invoice", no: "INV-101", debit: 0, credit: 15000 },
  { date: "2026-01-03", ledger: "Sales", voucher: "Invoice", no: "INV-102", debit: 0, credit: 12000 },
  { date: "2026-01-04", ledger: "Purchase", voucher: "Invoice", no: "PUR-201", debit: 20000, credit: 0 },
  { date: "2026-01-05", ledger: "Cash", voucher: "Payment-Out", no: "PO-001", debit: 0, credit: 3000 },
  { date: "2026-01-06", ledger: "Bank", voucher: "Payment-In", no: "PI-002", debit: 25000, credit: 0 },
  { date: "2026-01-07", ledger: "Expense", voucher: "Journal", no: "JR-001", debit: 4000, credit: 0 },
  { date: "2026-01-08", ledger: "Sales", voucher: "Invoice", no: "INV-103", debit: 0, credit: 18000 },
  { date: "2026-01-09", ledger: "Purchase", voucher: "Invoice", no: "PUR-202", debit: 22000, credit: 0 },
  { date: "2026-01-10", ledger: "Cash", voucher: "Payment-In", no: "PI-003", debit: 9000, credit: 0 },
  { date: "2026-01-11", ledger: "Bank", voucher: "Payment-Out", no: "PO-002", debit: 0, credit: 6000 },
  { date: "2026-01-12", ledger: "Expense", voucher: "Journal", no: "JR-002", debit: 3500, credit: 0 },
  { date: "2026-01-13", ledger: "Sales", voucher: "Invoice", no: "INV-104", debit: 0, credit: 20000 },
  { date: "2026-01-14", ledger: "Purchase", voucher: "Invoice", no: "PUR-203", debit: 17000, credit: 0 },
  { date: "2026-01-15", ledger: "Cash", voucher: "Payment-Out", no: "PO-003", debit: 0, credit: 4500 }
];

export default function Ledger() {
  const { collapsed } = useOutletContext();

  const [view, setView] = useState("ledger");
  const [ledgerFilter, setLedgerFilter] = useState("");
  const [voucherFilter, setVoucherFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* FILTER LOGIC */
  const filteredData = useMemo(() => {
    return transactionsData.filter(t => {

      if (view === "ledger" && ledgerFilter && t.ledger !== ledgerFilter)
        return false;

      if (view === "voucher" && voucherFilter && t.voucher !== voucherFilter)
        return false;

      if (view === "date") {
        if (fromDate && t.date < fromDate) return false;
        if (toDate && t.date > toDate) return false;
      }

      return true;
    });
  }, [view, ledgerFilter, voucherFilter, fromDate, toDate]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredData.length / perPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, currentPage, perPage]);

  /* SUMMARY */
  const summary = useMemo(() => {
    const totalDebit = filteredData.reduce((a, b) => a + b.debit, 0);
    const totalCredit = filteredData.reduce((a, b) => a + b.credit, 0);

    return {
      totalDebit,
      totalCredit,
      closing: totalDebit - totalCredit
    };
  }, [filteredData]);

  return <div className={`main ${collapsed ? "collapsed" : ""}`}>

    <div className="ledger-container">

      {/* VIEW SWITCH */}
      <div className="view-switch">
        <button
          className={view === "ledger" ? "active" : ""}
          onClick={() => { setView("ledger"); setCurrentPage(1); }}
        >
          Ledger-wise
        </button>

        <button
          className={view === "voucher" ? "active" : ""}
          onClick={() => { setView("voucher"); setCurrentPage(1); }}
        >
          Voucher-wise
        </button>

        <button
          className={view === "date" ? "active" : ""}
          onClick={() => { setView("date"); setCurrentPage(1); }}
        >
          Date-wise
        </button>
      </div>

      {/* FILTER ROW */}
      <div className="ledger-filter-row">

        <div className="ledger-filters">

          {view === "ledger" && (
            <select onChange={(e) => setLedgerFilter(e.target.value)}>
              <option value="">All Ledgers</option>
              <option>Cash</option>
              <option>Bank</option>
              <option>Sales</option>
              <option>Purchase</option>
              <option>Expense</option>
            </select>
          )}

          {view === "voucher" && (
            <select onChange={(e) => setVoucherFilter(e.target.value)}>
              <option value="">All Vouchers</option>
              <option>Invoice</option>
              <option>Payment-In</option>
              <option>Payment-Out</option>
              <option>Journal</option>
            </select>
          )}

          {view === "date" && (
            <>
              <input type="date" onChange={(e) => setFromDate(e.target.value)} />
              <input type="date" onChange={(e) => setToDate(e.target.value)} />
            </>
          )}

        </div>

        {/* PER PAGE */}
        <div className="ledger-per-page">
          <label>Show</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="ledger-summary">
        <div className="ledger-card ledger-debit-card">
          <span>Total Debit</span>
          <h2>₹ {summary.totalDebit.toLocaleString()}</h2>
        </div>

        <div className="ledger-card ledger-credit-card">
          <span>Total Credit</span>
          <h2>₹ {summary.totalCredit.toLocaleString()}</h2>
        </div>

        <div className="ledger-card ledger-closing-card">
          <span>Closing Balance</span>
          <h2>₹ {summary.closing.toLocaleString()}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="ledger-table-wrap">

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ledger</th>
              <th>Voucher</th>
              <th>No</th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>{t.ledger}</td>
                <td>{t.voucher}</td>
                <td>{t.no}</td>
                <td className="ledger-debit">₹ {t.debit || "-"}</td>
                <td className="ledger-credit">₹ {t.credit || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="ledger-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>

      </div>

    </div>


  </div>;
}