import { useOutletContext } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const firms = ["Firm A", "Firm B", "Firm C", "Firm D"];

const generateTransactions = () => {
  const parties = [
    "Mohan Traders", "Ravi Enterprises", "Sharma & Co", "Gupta Suppliers",
    "Verma Traders", "A1 Wholesale", "Modern Store", "Global Imports",
    "Raj Brothers", "Om Suppliers", "City Traders", "Krishna Mart",
    "Star Wholesale", "Sunrise Traders", "Prime Supplies", "Royal Enterprises",
    "Nikhil Stores", "Elite Traders", "Metro Wholesale", "National Suppliers"
  ];

  return parties.map((p, i) => {
    const amount = Math.floor(Math.random() * 5000) + 500;
    const paid = i % 2 === 0;

    return {
      id: i + 1,
      date: `2026-${String((i % 12) + 1).padStart(2, "0")}-10`,
      invoice: `TRX-${String(i + 1).padStart(3, "0")}`,
      party: p,
      firm: firms[i % firms.length],
      paymentType: paid ? "Cash" : "Cheque",
      amount,
      balance: paid ? 0 : amount
    };
  });
};


export default function Payments() {
  const { collapsed } = useOutletContext();
  const [data, setData] = useState(generateTransactions());
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All Transactions");
  const [firm, setFirm] = useState("All Firms");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  /* ================= PERIOD FILTER ================= */
  const applyPeriod = (items) => {
    const now = new Date();

    if (period === "Today") {
      const today = now.toISOString().split("T")[0];
      return items.filter(i => i.date === today);
    }

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

  /* ================= FILTER LOGIC ================= */
  const filteredData = useMemo(() => {
    let filtered = [...data];

    filtered = applyPeriod(filtered);

    if (fromDate) filtered = filtered.filter(i => i.date >= fromDate);
    if (toDate) filtered = filtered.filter(i => i.date <= toDate);

    if (firm !== "All Firms")
      filtered = filtered.filter(i => i.firm === firm);

    if (search)
      filtered = filtered.filter(i =>
        i.party.toLowerCase().includes(search.toLowerCase()) ||
        i.invoice.toLowerCase().includes(search.toLowerCase())
      );

    return filtered;

  }, [data, period, fromDate, toDate, firm, search]);

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
  const totalAmount = filteredData.reduce((a, b) => a + b.amount, 0);
  const received = filteredData
    .filter(i => i.balance === 0)
    .reduce((a, b) => a + b.amount, 0);

  const hasData = filteredData.length > 0;

  /* ================= ADD TRANSACTION ================= */
  const handleAdd = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const amount = Number(form.get("amount"));
    const paymentType = form.get("paymentType");

    const newItem = {
      id: data.length + 1,
      date: form.get("date"),
      invoice: form.get("invoice"),
      party: form.get("party"),
      firm: form.get("firm"),
      paymentType,
      amount,
      balance: paymentType === "Cash" ? 0 : amount
    };

    setData([...data, newItem]);
    setShowModal(false);
  };




  return <div className={`main ${collapsed ? "collapsed" : ""}`}>

    <div className=".payments_transactions-page">
      {/* TOPBAR */}
      <div className="payments_topbar">
        <h2>Transactions</h2>

        {hasData && (
          <button className="payments_btn-primary"
            onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className="payments_content">
        {/* FILTERS */}

        <div className="payments_filters">
          <select value={period}
            onChange={e => setPeriod(e.target.value)}>
            <option>All Transactions</option>
            <option>Today</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
            <option>Custom</option>
          </select>

          <input type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)} />

          <input type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)} />

          <select value={firm}
            onChange={e => setFirm(e.target.value)}>
            <option>All Firms</option>
            {firms.map((f, i) => (
              <option key={i}>{f}</option>
            ))}
          </select>

          <input
            className="payments_search"
            placeholder="Search Transactions"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* SUMMARY */}
        <div className="payments_summary">
          <b>Total Amount</b><br />
          ₹ {totalAmount}
          <br />
          <small>Received ₹ {received}</small>
        </div>

        {/* TABLE */}
        <div className="payments_table-wrap">

          {hasData ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Invoice</th>
                    <th>Party</th>
                    <th>Firm</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map(item => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.invoice}</td>
                      <td>{item.party}</td>
                      <td>{item.firm}</td>
                      <td>{item.paymentType}</td>
                      <td>{item.amount}</td>
                      <td>{item.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="payments_pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={currentPage === i + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="payments_empty">
              No Transactions Found
              <br />
              <button className="payments_btn-primary"
                onClick={() => setShowModal(true)}>
                + Add Transaction
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="payments_modal">
          <form className="modal-content" onSubmit={handleAdd}>
            <h3>Add Transaction</h3>

            <input type="date" name="date" required />
            <input type="text" name="invoice" placeholder="Invoice No" required />
            <input type="text" name="party" placeholder="Party Name" required />

            <select name="firm" required>
              {firms.map((f, i) => (
                <option key={i}>{f}</option>
              ))}
            </select>

            <select name="paymentType">
              <option>Cash</option>
              <option>Cheque</option>
            </select>

            <input type="number" name="amount" placeholder="Amount" required />

            <div className="modal-actions">
              <button type="submit">Save</button>
              <button type="button"
                onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>

  </div>;
}
