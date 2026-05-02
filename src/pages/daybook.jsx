import { useState, useEffect } from "react";
import { Calendar, FileText, Download } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import "../styles/DayBook.css";

const DayBook = () => {
    const { collapsed } = useOutletContext();
  const [voucherType, setVoucherType] = useState("all");
  const [fromDate, setFromDate] = useState("2024-04-01");
  const [toDate, setToDate] = useState("2025-03-31");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

  // 🔥 TEMP DATA (replace with API later)
  useEffect(() => {
    setData([
      {
        date: "30-Nov-25",
        ledger: "Rahul Traders",
        type: "Purchase",
        voucherNo: "1",
        invoice: "GST00150",
        dr: "",
        cr: 236000,
      },
      {
        date: "31-Dec-25",
        ledger: "Bismi Enterprises",
        type: "Sale",
        voucherNo: "TXP/2025-25/001",
        invoice: "TXP/2025-25/001",
        dr: 118000,
        cr: "",
      },
      {
        date: "01-Jan-26",
        ledger: "Modi Pvt Ltd",
        type: "Purchase",
        voucherNo: "2",
        invoice: "TSF 2025-315",
        dr: "",
        cr: 118000,
      },
    ]);
  }, []);

  // 🔹 FILTER LOGIC
  const filteredData =
    voucherType === "all"
      ? data
      : data.filter((d) => d.type.toLowerCase() === voucherType);
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
    );

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <div className="db-container">

            {/* HEADER */}
            <div className="db-header">
                <h2>
                Day Book <span>Print</span>
                </h2>

                <div className="db-actions">
                <button className="db-download">
                    <Download size={16} /> PDF
                </button>
                <button className="db-download">
                    <Download size={16} /> Excel
                </button>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="db-filter">

                {/* VOUCHER TYPE */}
                <div className="db-field">
                <label>Voucher Type</label>
                <select
                    value={voucherType}
                    onChange={(e) => setVoucherType(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="sale">Sale</option>
                    <option value="purchase">Purchase</option>
                    <option value="credit note">Credit Note</option>
                    <option value="debit note">Debit Note</option>
                    <option value="payment">Payment</option>
                    <option value="receipt">Receipt</option>
                    <option value="contra">Contra</option>
                    <option value="journal">Journal</option>
                </select>
                </div>

                {/* DATE */}
                <div className="db-field">
                <label>Date Period</label>
                <div className="db-date">
                    <Calendar size={16} />
                    <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span>to</span>
                    <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                </div>

                {/* CONFIG */}
                <div className="db-field">
                <label>Configuration</label>
                <button className="db-config">⚙️</button>
                </div>

            </div>

            {/* TABLE */}
            <div className="db-table-wrapper">
                <table className="db-table">

                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Ledger Name</th>
                    <th>Voucher Type</th>
                    <th>Voucher No.</th>
                    <th>Invoice No.</th>
                    <th>Amount Dr.</th>
                    <th>Amount Cr.</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((row, i) => (
                    <tr key={i}>
                        <td>{row.date}</td>
                        <td>{row.ledger}</td>
                        <td>{row.type}</td>
                        <td>{row.voucherNo}</td>
                        <td>{row.invoice}</td>
                        <td className="dr">{row.dr}</td>
                        <td className="cr">{row.cr}</td>
                    </tr>
                    ))}
                </tbody>

                </table>
            </div>
            <div className="db-pagination">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next ➡
                </button>

            </div>

        </div>
    </div>
  );
};

export default DayBook;