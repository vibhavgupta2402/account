import { useOutletContext } from "react-router-dom";
import React, { useRef, useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./purchase.css";

/* ================= FIRMS ================= */

const firmsList = [
  "Firm A",
  "Firm B",
  "Firm C",
  "Firm D",
  "Firm E"
];

/* ================= DEFAULT DATA ================= */

const generateData = () => {
  const parties = [
    "Mohan Traders","Ravi Enterprises","Sharma & Co","Gupta Suppliers",
    "Verma Traders","A1 Wholesale","Modern Store","Global Imports",
    "Raj Brothers","Om Suppliers","City Traders","Krishna Mart",
    "Star Wholesale","Sunrise Traders","Prime Supplies","Royal Enterprises",
    "Nikhil Stores","Elite Traders","Metro Wholesale","National Suppliers"
  ];

  return parties.map((name, i) => {
    const amount = Math.floor(Math.random() * 8000) + 1000;
    const credit = i % 2 === 0;

    return {
      id: i + 1,
      date: `2026-${String((i % 12) + 1).padStart(2, "0")}-15`,
      invoice: `PB-${String(i + 1).padStart(3, "0")}`,
      party: name,
      firm: firmsList[i % firmsList.length],
      payment: credit ? "Credit" : "Cash",
      amount,
      balance: credit ? amount : 0
    };
  });
};

export default function PurchaseBills() {
  const { collapsed } = useOutletContext();
  const fileRef = useRef();

  const [data, setData] = useState(generateData());
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All Purchase Invoice");
  const [firm, setFirm] = useState("All Firms");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const rowsPerPage = 5;

  /* ================= PERIOD LOGIC ================= */

  const applyPeriodFilter = (items) => {
    const now = new Date();

    if (period === "This Month") {
      return items.filter(i => {
        const d = new Date(i.date);
        return d.getMonth() === now.getMonth() &&
               d.getFullYear() === now.getFullYear();
      });
    }

    if (period === "Last Month") {
      const last = new Date(now.getFullYear(), now.getMonth() - 1);
      return items.filter(i => {
        const d = new Date(i.date);
        return d.getMonth() === last.getMonth() &&
               d.getFullYear() === last.getFullYear();
      });
    }

    if (period === "This Quarter") {
      const quarter = Math.floor(now.getMonth() / 3);
      return items.filter(i => {
        const d = new Date(i.date);
        return Math.floor(d.getMonth() / 3) === quarter &&
               d.getFullYear() === now.getFullYear();
      });
    }

    if (period === "This Year") {
      return items.filter(i =>
        new Date(i.date).getFullYear() === now.getFullYear()
      );
    }

    return items;
  };

  /* ================= MAIN FILTER ================= */

  const filteredData = useMemo(() => {
    let filtered = [...data];

    filtered = applyPeriodFilter(filtered);

    // Calendar filter ALWAYS active
    if (fromDate) {
      filtered = filtered.filter(i => i.date >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter(i => i.date <= toDate);
    }

    if (firm !== "All Firms") {
      filtered = filtered.filter(i => i.firm === firm);
    }

    if (search) {
      filtered = filtered.filter(i =>
        i.party.toLowerCase().includes(search.toLowerCase()) ||
        i.invoice.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;

  }, [data, search, period, fromDate, toDate, firm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, period, fromDate, toDate, firm]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* ================= SUMMARY ================= */

  const paid = filteredData
    .filter(i => i.balance === 0)
    .reduce((a, b) => a + b.amount, 0);

  const unpaid = filteredData
    .filter(i => i.balance > 0)
    .reduce((a, b) => a + b.balance, 0);

  const total = filteredData
    .reduce((a, b) => a + b.amount, 0);

  /* ================= ADD PURCHASE ================= */

  const handleAdd = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const amount = Number(form.get("amount"));
    const payment = form.get("payment");

    const newItem = {
      id: data.length + 1,
      date: form.get("date"),
      invoice: form.get("invoice"),
      party: form.get("party"),
      firm: form.get("firm"),
      payment,
      amount,
      balance: payment === "Cash" ? 0 : amount
    };

    setData([...data, newItem]);
    setShowModal(false);
  };

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="page-header">
        <h2>Purchase Bills</h2>

        <div className="header-actions">
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus"></i> Add Purchase
          </button>
          <button className="File_updoad" onClick={() => fileRef.current.click()}>
            <i className="fa fa-upload"></i>
          </button>
          <button className="File_updoad" onClick={() => window.print()}>
            <i className="fa fa-print"></i>
          </button>
          <input type="file" ref={fileRef} hidden />
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="filters">

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>All Purchase Invoice</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
          <option>Custom</option>
        </select>

        {/* CALENDAR ALWAYS VISIBLE */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <select value={firm} onChange={(e) => setFirm(e.target.value)}>
          <option>All Firms</option>
          {firmsList.map((f, i) => (
            <option key={i}>{f}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Invoice or Party"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* SUMMARY */}
      <div className="Purchase_summary">
        <div className="Purchase_card paid">Paid ₹ {paid}</div>
        <div className="Purchase_card unpaid">Unpaid ₹ {unpaid}</div>
        <div className="Purchase_card total">Total ₹ {total}</div>
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice</th>
              <th>Party</th>
              <th>Firm</th>
              <th>Payment</th>
              <th className="right">Amount</th>
              <th className="right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.invoice}</td>
                  <td>{item.party}</td>
                  <td>{item.firm}</td>
                  <td>{item.payment}</td>
                  <td className="right">{item.amount}</td>
                  <td className="right">{item.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Parties Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}

            <button disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        )}
      </div>

      {/* ADD PURCHASE MODAL */}
      {showModal && (
        <div className="purchase_modal">
          <form className="modal-content" onSubmit={handleAdd}>
            <h3>Add Purchase</h3>

            {/* Calendar inside modal */}
            <input type="date" name="date" required />

            <input type="text" name="invoice" placeholder="Invoice No" required />
            <input type="text" name="party" placeholder="Party Name" required />

            <select name="firm" required>
              {firmsList.map((f, i) => (
                <option key={i}>{f}</option>
              ))}
            </select>

            <select name="payment">
              <option>Cash</option>
              <option>Credit</option>
            </select>

            <input type="number" name="amount" placeholder="Amount" required />

            <div className="modal-actions">
              <button className="save-btn" type="submit">Save</button>
              <button className="cancel-btn" type="button"
                onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
