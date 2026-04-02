import React, { useState, useEffect } from "react";
// import "./App.css";s

const companyState = "Gujarat";

const HomeAddSales = () => {

  /* ===============================
     CUSTOMERS (20 with different states)
  =============================== */
  const customers = [
    { id: 1, name: "Amit Traders", phone: "9876500011", state: "Gujarat" },
    { id: 2, name: "Ravi Enterprises", phone: "9876500012", state: "Maharashtra" },
    { id: 3, name: "Kiran Sales", phone: "9876500013", state: "Rajasthan" },
    { id: 4, name: "Jay Distributors", phone: "9876500014", state: "Delhi" },
    { id: 5, name: "Mahesh Store", phone: "9876500015", state: "Punjab" },
    { id: 6, name: "Vijay Mart", phone: "9876500016", state: "Karnataka" },
    { id: 7, name: "Suresh Agency", phone: "9876500017", state: "Tamil Nadu" },
    { id: 8, name: "Ganesh Traders", phone: "9876500018", state: "Uttar Pradesh" },
    { id: 9, name: "Deepak Sales", phone: "9876500019", state: "Bihar" },
    { id: 10, name: "Shivam Mart", phone: "9876500020", state: "Madhya Pradesh" },
    { id: 11, name: "Om Distributors", phone: "9876500021", state: "Kerala" },
    { id: 12, name: "Royal Traders", phone: "9876500022", state: "Goa" },
    { id: 13, name: "Prime Store", phone: "9876500023", state: "Haryana" },
    { id: 14, name: "Modern Sales", phone: "9876500024", state: "West Bengal" },
    { id: 15, name: "National Mart", phone: "9876500025", state: "Odisha" },
    { id: 16, name: "Perfect Traders", phone: "9876500026", state: "Assam" },
    { id: 17, name: "Metro Sales", phone: "9876500027", state: "Telangana" },
    { id: 18, name: "Sunrise Traders", phone: "9876500028", state: "Jharkhand" },
    { id: 19, name: "Global Mart", phone: "9876500029", state: "Chhattisgarh" },
    { id: 20, name: "Future Traders", phone: "9876500030", state: "Delhi" },
  ];

  /* ===============================
     ITEMS (20 with own price)
  =============================== */
  const itemsList = [
    { id: 1, name: "Laptop", unit: "PCS", price: 45000, discount: 5, tax: 18 },
    { id: 2, name: "Mouse", unit: "PCS", price: 500, discount: 2, tax: 18 },
    { id: 3, name: "Keyboard", unit: "PCS", price: 1200, discount: 3, tax: 18 },
    { id: 4, name: "Monitor", unit: "PCS", price: 15000, discount: 4, tax: 18 },
    { id: 5, name: "Printer", unit: "PCS", price: 10000, discount: 6, tax: 18 },
    { id: 6, name: "Desk", unit: "PCS", price: 7000, discount: 5, tax: 12 },
    { id: 7, name: "Chair", unit: "PCS", price: 3500, discount: 5, tax: 12 },
    { id: 8, name: "Pen Drive", unit: "PCS", price: 800, discount: 1, tax: 18 },
    { id: 9, name: "Hard Disk", unit: "PCS", price: 4500, discount: 3, tax: 18 },
    { id: 10, name: "Scanner", unit: "PCS", price: 8500, discount: 5, tax: 18 },
    { id: 11, name: "Tablet", unit: "PCS", price: 20000, discount: 4, tax: 18 },
    { id: 12, name: "Speaker", unit: "PCS", price: 2500, discount: 3, tax: 18 },
    { id: 13, name: "Webcam", unit: "PCS", price: 1800, discount: 2, tax: 18 },
    { id: 14, name: "Router", unit: "PCS", price: 2200, discount: 3, tax: 18 },
    { id: 15, name: "Projector", unit: "PCS", price: 30000, discount: 5, tax: 18 },
    { id: 16, name: "Mobile", unit: "PCS", price: 25000, discount: 5, tax: 18 },
    { id: 17, name: "Headphones", unit: "PCS", price: 1500, discount: 2, tax: 18 },
    { id: 18, name: "Power Bank", unit: "PCS", price: 1200, discount: 2, tax: 18 },
    { id: 19, name: "Cable", unit: "PCS", price: 300, discount: 1, tax: 18 },
    { id: 20, name: "SSD", unit: "PCS", price: 6000, discount: 4, tax: 18 },
  ];

  /* ===============================
     TAB + ROW CREATION
  =============================== */

  const createRow = (id = 1) => ({
    id,
    item: "",
    qty: 1,
    unit: "",
    price: 0,
    discount: 0,
    tax: 0,
    amount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
  });

  const createTab = (num) => ({
    id: Date.now() + Math.random(),
    title: `Sale #${num}`,
    customer: "",
    phone: "",
    invoiceDate: "",
    state: "",
    rows: [createRow(1)],
    roundOff: 0,
  });

  const [tabs, setTabs] = useState([createTab(1)]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [tabCounter, setTabCounter] = useState(1);

  useEffect(() => {
    setActiveTabId(tabs[0].id);
  }, []);

  const activeTab = tabs.find(t => t.id === activeTabId);

  /* ===============================
     CALCULATION FUNCTION
  =============================== */

  const calculateRow = (row, state) => {
    const subtotal = row.qty * row.price;
    const discountAmt = subtotal * (row.discount / 100);
    const taxable = subtotal - discountAmt;
    const taxAmt = taxable * (row.tax / 100);

    let cgst = 0, sgst = 0, igst = 0;

    if (state === companyState) {
      cgst = taxAmt / 2;
      sgst = taxAmt / 2;
    } else {
      igst = taxAmt;
    }

    return {
      ...row,
      amount: (taxable + taxAmt).toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      igst: igst.toFixed(2),
    };
  };

  /* ===============================
     HANDLE CUSTOMER
  =============================== */

  const handleCustomer = (name) => {
    const selected = customers.find(c => c.name === name);

    setTabs(prev => prev.map(tab =>
      tab.id === activeTabId
        ? {
          ...tab,
          customer: selected.name,
          phone: selected.phone,
          state: selected.state,
          invoiceDate: new Date().toISOString().split("T")[0],
          rows: tab.rows.map(r => calculateRow(r, selected.state))
        }
        : tab
    ));
  };

  /* ===============================
     HANDLE ITEM SELECT
  =============================== */

  const handleItem = (rowId, name) => {
    const item = itemsList.find(i => i.name === name);

    setTabs(prev => prev.map(tab => {
      if (tab.id !== activeTabId) return tab;

      const updatedRows = tab.rows.map(row => {
        if (row.id !== rowId) return row;

        const updated = {
          ...row,
          item: item.name,
          unit: item.unit,
          price: item.price,
          discount: item.discount,
          tax: item.tax
        };

        return calculateRow(updated, tab.state);
      });

      return { ...tab, rows: updatedRows };
    }));
  };

  /* ===============================
     HANDLE FIELD CHANGE
  =============================== */

  const handleFieldChange = (rowId, field, value) => {
    setTabs(prev => prev.map(tab => {
      if (tab.id !== activeTabId) return tab;

      const updatedRows = tab.rows.map(row => {
        if (row.id !== rowId) return row;

        const updated = { ...row, [field]: Number(value) };
        return calculateRow(updated, tab.state);
      });

      return { ...tab, rows: updatedRows };
    }));
  };

  /* ===============================
     ADD / DELETE ROW
  =============================== */

  const addRow = () => {
    setTabs(prev =>
      prev.map(tab =>
        tab.id === activeTabId
          ? { ...tab, rows: [...tab.rows, createRow(tab.rows.length + 1)] }
          : tab
      )
    );
  };

  const deleteRow = (rowId) => {
    setTabs(prev =>
      prev.map(tab => {
        if (tab.id !== activeTabId) return tab;
        if (tab.rows.length === 1) return tab;

        const filtered = tab.rows
          .filter(r => r.id !== rowId)
          .map((r, i) => ({ ...r, id: i + 1 }));

        return { ...tab, rows: filtered };
      })
    );
  };

  /* ===============================
     TOTALS
  =============================== */

  const subtotal = activeTab?.rows.reduce((s, r) => s + (r.qty * r.price), 0) || 0;
  const totalCGST = activeTab?.rows.reduce((s, r) => s + Number(r.cgst), 0) || 0;
  const totalSGST = activeTab?.rows.reduce((s, r) => s + Number(r.sgst), 0) || 0;
  const totalIGST = activeTab?.rows.reduce((s, r) => s + Number(r.igst), 0) || 0;
  const grandTotal = activeTab?.rows.reduce((s, r) => s + Number(r.amount), 0) || 0;
  const finalTotal = grandTotal + Number(activeTab?.roundOff || 0);

  /* ===============================
     Go on dashboard
  =============================== */

  const goDashboard = () => {
    window.location.href = "/";
  };

  // ✅ Open New Tab (with 1 row)
  const openNewSale = () => {
    const newCount = tabCounter + 1;
    const newTab = createTab(newCount);

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setTabCounter(newCount);
  };

  // ✅ Close Tab (minimum 1 tab)
  const closeTab = (id) => {
    if (tabs.length === 1) return;

    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (activeTabId === id) {
      setActiveTabId(updatedTabs[0].id);
    }
  };


  return (
    <>

      {/* TOP INFO BAR */}
      <div className="AddSalePurchase_topbar">
        <div>
          <i
            className="fa-solid fa-xmark"
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={goDashboard}
          ></i>
          Company · Help · Versions · Shortcuts
        </div>
        <div>
          <a href="#">Request a Callback</a> | +91-1234567891 |
          <a href="#">Get Instant Online Support</a>
        </div>
      </div>



      {/* TAB BAR */}
      <div className="AddSalePurchase_topbar">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                background: activeTabId === tab.id ? "#fff" : "#ddd",
                borderRadius: "6px 6px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {tab.title}
              {tabs.length > 1 && (
                <i
                  className="fa-solid fa-xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                ></i>
              )}
            </div>
          ))}

          <i
            className="fa-solid fa-plus"
            style={{ cursor: "pointer", padding: "6px" }}
            onClick={openNewSale}
          ></i>
        </div>
      </div>




      {activeTab && (
        <div className="AddSalePurchase_container">

          <div className="page-title">
            <h2>{activeTab.title}</h2>
            <div className="toggle">
              Credit <input type="checkbox" defaultChecked /> Cash
            </div>
          </div>

          {/* CUSTOMER SECTION */}
          <div className="card">
            <div className="form-grid">
              <div className="input-group">
                <label>Search by Name / Phone *</label>
                <select
                  value={activeTab.customer}
                  onChange={(e) => handleCustomer(e.target.value)}
                >
                  <option value="">Select</option>
                  {customers.map(c => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Phone No.</label>
                <input value={activeTab.phone} readOnly />
              </div>

              <div className="input-group">
                <label>Invoice No.</label>
                <input value={activeTab.title.replace("Sale #", "")} readOnly />
              </div>

              <div className="input-group">
                <label>Invoice Date</label>
                <input type="date" value={activeTab.invoiceDate} readOnly />
              </div>

              <div className="input-group">
                <label>State of Supply</label>
                <input value={activeTab.state} readOnly />
              </div>
            </div>
          </div>

          {/* ITEM TABLE */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price / Unit</th>
                  <th>Discount %</th>
                  <th>Tax %</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {activeTab.rows.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>

                    <td>
                      <select
                        value={row.item}
                        onChange={(e) => handleItem(row.id, e.target.value)}
                      >
                        <option value="">Select</option>
                        {itemsList.map(item => (
                          <option key={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleFieldChange(row.id, "qty", e.target.value)}
                      />
                    </td>

                    <td><input value={row.unit} readOnly /></td>

                    <td>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) => handleFieldChange(row.id, "price", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={row.discount}
                        onChange={(e) => handleFieldChange(row.id, "discount", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={row.tax}
                        onChange={(e) => handleFieldChange(row.id, "tax", e.target.value)}
                      />
                    </td>

                    <td>{row.amount}</td>

                    <td>
                      <i
                        className="fa-solid fa-trash row-delete"
                        onClick={() => deleteRow(row.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="add-row" onClick={addRow}>
              ADD ROW
            </button>
          </div>

          {/* FOOTER TOTAL */}
          <div className="footer">
            <div>Subtotal: ₹ {subtotal.toFixed(2)}</div>
            <div>CGST: ₹ {totalCGST.toFixed(2)}</div>
            <div>SGST: ₹ {totalSGST.toFixed(2)}</div>
            <div>IGST: ₹ {totalIGST.toFixed(2)}</div>

            <div>
              Round Off:
              <input
                type="number"
                value={activeTab.roundOff}
                onChange={(e) =>
                  setTabs(prev =>
                    prev.map(tab =>
                      tab.id === activeTabId
                        ? { ...tab, roundOff: Number(e.target.value) }
                        : tab
                    )
                  )
                }
              />
            </div>

            <div><strong>Grand Total: ₹ {finalTotal.toFixed(2)}</strong></div>

            <div>
              <button className="btn">Share</button>
              <button className="btn primary">Save</button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default HomeAddSales;
