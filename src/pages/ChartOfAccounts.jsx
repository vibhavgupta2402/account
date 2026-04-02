import { useOutletContext } from "react-router-dom";

export default function ChartOfAccounts() {
  const toggleList = (el) => {
    const list = el.nextElementSibling;
    list.style.display =
      list.style.display === "block" ? "none" : "block";
  };


  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>
    <div className="CHA-ledger-grid">
      {/* ASSETS */}
      <div className="CHA-ledger-card">
        <div
          className="CHA-ledger-header"
          onClick={(e) => toggleList(e.currentTarget)}
        >
          <h3>Assets</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>

        <div className="CHA-ledger-list">
          <div className="CHA-ledger-item">
            <span>Cash</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Bank</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Accounts Receivable</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>

      {/* LIABILITIES */}
      <div className="CHA-ledger-card">
        <div
          className="CHA-ledger-header"
          onClick={(e) => toggleList(e.currentTarget)}
        >
          <h3>Liabilities</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>

        <div className="CHA-ledger-list">
          <div className="CHA-ledger-item">
            <span>Accounts Payable</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Loans</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>

      {/* CAPITAL */}
      <div className="CHA-ledger-card">
        <div
          className="CHA-ledger-header"
          onClick={(e) => toggleList(e.currentTarget)}
        >
          <h3>Capital</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>

        <div className="CHA-ledger-list">
          <div className="CHA-ledger-item">
            <span>Owner Capital</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>

      {/* INCOME */}
      <div className="CHA-ledger-card">
        <div
          className="CHA-ledger-header"
          onClick={(e) => toggleList(e.currentTarget)}
        >
          <h3>Income</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>

        <div className="CHA-ledger-list">
          <div className="CHA-ledger-item">
            <span>Sales</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Other Income</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>

      {/* EXPENSES */}
      <div className="CHA-ledger-card">
        <div
          className="CHA-ledger-header"
          onClick={(e) => toggleList(e.currentTarget)}
        >
          <h3>Expenses</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>

        <div className="CHA-ledger-list">
          <div className="CHA-ledger-item">
            <span>Office Expense</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Salary</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>

          <div className="CHA-ledger-item">
            <span>Rent</span>
            <span className="CHA-actions">
              <i className="fa-solid fa-pen"></i>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>



    </div>
  </div>;
}

