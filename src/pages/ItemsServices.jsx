import { useOutletContext } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
// import "./ItemsServices.css";

export default function ItemsServices() {
  const { collapsed } = useOutletContext();
  const [activeTab, setActiveTab] = useState("products");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productPage, setProductPage] = useState(1);
  const [txnPage, setTxnPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  /* ================= PRODUCTS ================= */

  const productNames = [
    "Laptop","Mouse","Keyboard","Monitor","Printer","Desk","Chair",
    "Pen Drive","Hard Disk","Scanner","Tablet","Speaker","Webcam",
    "Router","Projector","Mobile","Headphones","Power Bank","Cable","SSD"
  ];

  const transactionNames = [
    "Amit Traders","Ravi Enterprises","Kiran Sales","Jay Distributors",
    "Mahesh Store","Vijay Mart","Suresh Agency","Ganesh Traders",
    "Deepak Sales","Shivam Mart","Om Distributors","Royal Traders",
    "Prime Store","Modern Sales","National Mart","Perfect Traders",
    "Metro Sales","Sunrise Traders","Global Mart","Future Traders"
  ];
  const servicesData = [
  {
    id: 1,
    name: "Installation Services",
    qty: 10,
    avgRate: 10000,
    closingBalance: 100000,

    transactions: [
      {
        id: 1,
        type: "Service Invoice",
        name: "Bismi Enterprises",
        date: "05-04-2026",
        qty: 2,
        price: 10000,
        status: "Paid"
      }
    ]
  },

  {
    id: 2,
    name: "Office Maintenance",
    qty: 25,
    avgRate: 15200,
    closingBalance: 380000,

    transactions: [
      {
        id: 1,
        type: "AMC",
        name: "National Traders",
        date: "08-04-2026",
        qty: 5,
        price: 15200,
        status: "Received"
      }
    ]
  },

  {
    id: 3,
    name: "Repair",
    qty: 3,
    avgRate: 5000,
    closingBalance: 15000,

    transactions: [
      {
        id: 1,
        type: "Repair",
        name: "Metro Sales",
        date: "11-04-2026",
        qty: 1,
        price: 5000,
        status: "Paid"
      }
    ]
  }
];

  const generateTransactions = () =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      type: i % 2 === 0 ? "Purchase" : "Sale",
      name: transactionNames[(i + Math.floor(Math.random()*10)) % transactionNames.length],
      date: `2026-02-${String((i%9)+1).padStart(2,"0")}`,
      qty: 1 + i,
      price: 1000 + i * 150,
      status: i % 2 === 0 ? "Paid" : "Received"
    }));

  const initialProducts = productNames.map((name, index) => ({
    id: index + 1,
    name,
    purchasePrice: 2000 + index * 400,
    salePrice: 2500 + index * 450,
    stockQty: index % 4 === 0 ? 0 : 10 + index,
    unit: "PCS",
    transactions: generateTransactions()
  }));

  const [products, setProducts] = useState(initialProducts);

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const productsPerPage = 6;
  const paginatedProducts = filteredProducts.slice(
    (productPage-1)*productsPerPage,
    productPage*productsPerPage
  );

  /* ================= FILTER TRANSACTIONS ================= */

  const filteredTransactions = useMemo(() => {
    if (!selectedProduct) return [];
    let txns = selectedProduct.transactions;
    if (selectedDate) {
      txns = txns.filter(t => t.date === selectedDate);
    }
    return txns;
  }, [selectedProduct, selectedDate]);

  const txnPerPage = 5;
  const paginatedTxns = filteredTransactions.slice(
    (txnPage-1)*txnPerPage,
    txnPage*txnPerPage
  );

  /* ================= ADD PRODUCT ================= */

  const [newProduct, setNewProduct] = useState({
    name:"", purchasePrice:"", salePrice:"", stockQty:""
  });

  const handleAdd = () => {
    const newObj = {
      id: products.length+1,
      name: newProduct.name,
      purchasePrice: Number(newProduct.purchasePrice),
      salePrice: Number(newProduct.salePrice),
      stockQty: Number(newProduct.stockQty),
      unit:"PCS",
      transactions: generateTransactions()
    };
    setProducts([...products, newObj]);
    setShowModal(false);
  };
  const units = [
  { code: "BAG", name: "Bags" },
  { code: "BAL", name: "Bale" },
  { code: "BDL", name: "Bundles" },
  { code: "BKL", name: "Buckles" },
  { code: "BOX", name: "Box" },
  { code: "BTL", name: "Bottles" },
  { code: "BUN", name: "Bunches" },
  { code: "CAN", name: "Cans" },
  { code: "CBM", name: "Cubic Meter" },
  { code: "CTN", name: "Cartons" },
  { code: "DOZ", name: "Dozen" },
  { code: "DRM", name: "Drum" },
  { code: "GMS", name: "Grams" },
  { code: "KGS", name: "Kilograms" },
  { code: "LTR", name: "Litre" },
  { code: "MLT", name: "Millilitre" },
  { code: "MTR", name: "Meters" },
  { code: "NOS", name: "Numbers" },
  { code: "PAC", name: "Packs" },
  { code: "PCS", name: "Pieces" },
  { code: "PRS", name: "Pairs" },
  { code: "QTL", name: "Quintal" },
  { code: "ROL", name: "Rolls" },
  { code: "SET", name: "Sets" },
  { code: "SQF", name: "Square Feet" },
  { code: "SQM", name: "Square Meters" },
  { code: "TON", name: "Tonnes" },
  { code: "UNT", name: "Units" },
  { code: "OTH", name: "Others" }
];
const [unitSearch, setUnitSearch] = useState("");
const [showUnitDropdown, setShowUnitDropdown] = useState(false);
const unitRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (unitRef.current && !unitRef.current.contains(e.target)) {
      setShowUnitDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const [godownList, setGodownList] = useState(["Main Store"]);
const [selectedGodown, setSelectedGodown] = useState("");

const [showGodownModal, setShowGodownModal] = useState(false);
const [newGodown, setNewGodown] = useState({
  name: "",
  address: ""
});

// Opening balance
const [openingQty, setOpeningQty] = useState("");
const [openingRate, setOpeningRate] = useState("");
const [openingAmount, setOpeningAmount] = useState("");


  return (
    <div className={`main ${collapsed?"collapsed":""}`}>
      <div className="Item_main">

        {/* TABS */}
        <div className="tabs">
          {/* {["products","services","category","units"].map(tab=>( */}
          {["products","services"].map(tab=>(
            <div key={tab}
              className={`tab ${activeTab===tab?"active":""}`}
              onClick={()=>setActiveTab(tab)}>
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ================= PRODUCTS ================= */}
        {activeTab==="products" && (
          <>
            {/* <div className="top-bar">

              <div className="left-tools">
                <div className="search-box">
                  <i className="fa fa-search"></i>
                  <input
                    placeholder="Search product..."
                    value={search}
                    onChange={e=>setSearch(e.target.value)}
                  />
                </div>

                <div className="calendar-box">
                  <i className="fa fa-calendar"></i>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e=>setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn" onClick={()=>setShowModal(true)}>
                + Add Item
              </button>

            </div> */}
            <div className="toolbar-modern-v2">
              {/* TOP ROW */}
              <div className="toolbar-top-row">
                {/* LEFT FILTERS */}
                <div className="toolbar-filters">
                  {/* DATE RANGE */}
                  <div className="toolbar-group">
                    <label>Date Range</label>
                    <div className="date-range">
                      <input type="date" />
                      <span>-</span>
                      <input type="date" />
                    </div>
                  </div>
                  {/* DATE PERIOD */}
                  <div className="toolbar-group">
                    <label>Date Period</label>
                    <select className="toolbar-select">
                      <option>Yearly</option>
                      <option>Quarterly</option>
                      <option>Monthly</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  {/* CONFIGURATION */}
                  <div className="toolbar-group">
                    <label>Configuration</label>
                    <select className="toolbar-select">
                      <option>Item + Godown</option>
                      <option>Item Wise</option>
                      <option>Godown Wise</option>
                    </select>
                  </div>
                </div>
                {/* RIGHT BUTTON */}
                <div className="toolbar-action">
                  <button
                    className="btn-primary"
                    onClick={()=>setShowModal(true)}
                  >
                    + Add Item
                  </button>
                </div>

              </div>

              {/* SEARCH ROW */}
              <div className="toolbar-search-row">

                <div className="search-field">
                  <i className="fa fa-search"></i>

                  <input
                    placeholder="Search items..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                </div>

              </div>

            </div>
            {/* <div className="layout"> */}

              {/* PRODUCT LIST */}
              {/* <div className="product-list">
                {paginatedProducts.map(p=>(
                  <div key={p.id}
                    className={`product-card ${selectedProduct?.id===p.id?"active":""}`}
                    onClick={()=>{setSelectedProduct(p); setTxnPage(1);}}>
                    <h4>{p.name}</h4>
                    
                  </div>
                ))}

                <div className="pagination">
                  {Array.from({length:Math.ceil(filteredProducts.length/productsPerPage)},(_,i)=>(
                    <button key={i}
                      className={productPage===i+1?"active":""}
                      onClick={()=>setProductPage(i+1)}>
                      {i+1}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* DETAILS */}
              {/* {selectedProduct && (
                <div className="details">

                  <div className="summary">
                    <div>
                      <span>Sale Price</span>
                      <strong>₹{selectedProduct.salePrice}</strong>
                    </div>
                    <div>
                      <span>Purchase Price</span>
                      <strong>₹{selectedProduct.purchasePrice}</strong>
                    </div>
                    <div>
                      <span>Stock Qty</span>
                      <strong>{selectedProduct.stockQty}</strong>
                    </div>
                    <div>
                      <span>Stock Value</span>
                      <strong>
                        ₹{selectedProduct.purchasePrice * selectedProduct.stockQty}
                      </strong>
                    </div>
                  </div>

                  <div className="transaction-table">
                    <h3>Transactions</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTxns.map(t=>(
                          <tr key={t.id}>
                            <td>{t.type}</td>
                            <td>{t.name}</td>
                            <td>{t.date}</td>
                            <td>{t.qty}</td>
                            <td>₹{t.price}</td>
                            <td>{t.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pagination">
                      {Array.from({length:Math.ceil(filteredTransactions.length/txnPerPage)},(_,i)=>(
                        <button key={i}
                          className={txnPage===i+1?"active":""}
                          onClick={()=>setTxnPage(i+1)}>
                          {i+1}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )} */}
            {/* </div> */}
            <div className="inventory-wrapper">

              {/* TABLE HEADER */}
              <div className="inventory-header">

                <span>Goods Description</span>
                <span>Godown</span>
                <span>Qty</span>
                <span>Stock Avg Rate</span>
                <span>Cl. Balance</span>
                <span>Action</span>

              </div>

              {/* ROWS */}
              {filteredProducts.map((item) => (

                <div key={item.id}>

                  {/* MAIN ROW */}
                  <div className="inventory-row">

                    <span>{item.name}</span>

                    <span>
                      {item.godown || "Main Store"}
                    </span>

                    <span>
                      {item.stockQty || 0} {item.unit}
                    </span>

                    <span>
                      ₹ {item.purchasePrice}
                    </span>

                    <span>
                      ₹ {
                        (
                          item.purchasePrice *
                          item.stockQty
                        ).toLocaleString()
                      }
                    </span>

                    <button
                      className="details-btn"
                      onClick={() =>
                        setSelectedProduct(
                          selectedProduct?.id === item.id
                            ? null
                            : item
                        )
                      }
                    >
                      {selectedProduct?.id === item.id
                        ? "Hide"
                        : "Details"}
                    </button>

                  </div>

                  {/* DETAILS TABLE */}
                  {selectedProduct?.id === item.id && (

                    <div className="details-box">

                      {/* TOP */}
                      <div className="details-toolbar">

                        <div>
                          <h4>
                            {item.name} Details Report
                          </h4>

                          <p>
                            Unit : {item.unit}
                          </p>
                        </div>

                        <div className="date-filter">
                          <input type="date" />
                          <span>to</span>
                          <input type="date" />
                        </div>

                      </div>

                      {/* HEADER */}
                      <div className="details-header">

                        <span>Voucher Type</span>
                        <span>Party</span>
                        <span>Date</span>
                        <span>Qty</span>
                        <span>Rate</span>
                        <span>Status</span>

                      </div>

                      {/* ROWS */}
                      {item.transactions.map((t) => (

                        <div
                          className="details-row"
                          key={t.id}
                        >

                          <span>{t.type}</span>
                          <span>{t.name}</span>
                          <span>{t.date}</span>
                          <span>{t.qty}</span>
                          <span>₹ {t.price}</span>
                          <span>{t.status}</span>

                        </div>

                      ))}

                      {/* FOOTER */}
                      <div className="details-actions">
                        <button className="print-btn">
                          Print
                        </button>

                        <button className="pdf-btn">
                          PDF
                        </button>
                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>
          </>
        )}
        

        {/* ================= DARK SECTIONS ================= */}

        {activeTab==="services" && (
          <div className="services-wrapper">
            {/* TOOLBAR */}
            <div className="toolbar-modern-v2">
              {/* TOP */}
              <div className="toolbar-top-row">
                <div className="toolbar-filters">
                  {/* DATE PERIOD */}
                  <div className="toolbar-group">
                    <label>Date Period</label>
                    <select className="toolbar-select">
                      <option>Yearly</option>
                      <option>Quarterly</option>
                      <option>Monthly</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
                {/* BUTTON */}
                <div className="toolbar-action">
                  <button
                    className="btn-primary"
                    onClick={()=>setShowModal(true)}
                  >
                    + Add Item
                  </button>
                </div>
              </div>
              {/* SEARCH */}
              <div className="toolbar-search-row">
                <div className="search-field">
                  <i className="fa fa-search"></i>
                  <input
                    placeholder="Search services..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* TABLE */}
            <div className="inventory-wrapper">
              {/* HEADER */}
              <div className="inventory-header services-grid">
                <span>Goods Description</span>
                <span>Qty</span>
                <span>Stock Avg Rate</span>
                <span>Cl. Balance</span>
                <span>Action</span>
              </div>
              {/* ROWS */}
              {servicesData
                .filter(s =>
                  s.name.toLowerCase()
                  .includes(search.toLowerCase())
                )
                .map((item)=>(
                <div key={item.id}>
                  {/* MAIN ROW */}
                  <div className="inventory-row services-grid">
                    <span>{item.name}</span>
                    <span>{item.qty}</span>
                    <span>₹ {item.avgRate}</span>
                    <span>
                      ₹ {item.closingBalance.toLocaleString()}
                    </span>
                    <button
                      className="details-btn"
                      onClick={() =>
                        setSelectedService(
                          selectedService?.id === item.id
                            ? null
                            : item
                        )
                      }
                    >
                      {selectedService?.id === item.id
                        ? "Hide"
                        : "Details"}
                    </button>
                  </div>
                  {/* DETAILS */}
                  {selectedService?.id === item.id && (
                    <div className="details-box">
                      {/* TOP */}
                      <div className="details-toolbar">
                        <h4>
                          {item.name} Report
                        </h4>
                        <div className="date-filter">
                          <input type="date" />
                          <span>to</span>
                          <input type="date" />
                        </div>
                      </div>
                      {/* HEADER */}
                      <div className="details-header">
                        <span>Voucher Type</span>
                        <span>Party</span>
                        <span>Date</span>
                        <span>Qty</span>
                        <span>Rate</span>
                        <span>Status</span>
                      </div>
                      {/* ROWS */}
                      {item.transactions.map((t)=>(
                        <div
                          className="details-row"
                          key={t.id}
                        >
                          <span>{t.type}</span>
                          <span>{t.name}</span>
                          <span>{t.date}</span>
                          <span>{t.qty}</span>
                          <span>₹ {t.price}</span>
                          <span>{t.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {activeTab==="category" && (
          <div className="dark">
            <h2>CATEGORY</h2>
            <table>
              <tbody>
                <tr><th>Name</th><th>Description</th></tr>
                <tr><td>Electronics</td><td>Electronic items</td></tr>
                <tr><td>Clothing</td><td>Garments</td></tr>
                <tr><td>Furniture</td><td>Home furniture</td></tr>
                <tr><td>Stationery</td><td>Office products</td></tr>
                <tr><td>Hardware</td><td>Tools & parts</td></tr>
              </tbody>
            </table>
          </div>
        )} */}

        {/* {activeTab==="units" && (
          <div className="dark">
            <h2>UNITS</h2>
            <table>
              <tbody>
                <tr><th>Name</th><th>Symbol</th></tr>
                <tr><td>Pieces</td><td>PCS</td></tr>
                <tr><td>Kilogram</td><td>KG</td></tr>
                <tr><td>Gram</td><td>GM</td></tr>
                <tr><td>Liter</td><td>LTR</td></tr>
                <tr><td>Box</td><td>BOX</td></tr>
              </tbody>
            </table>
          </div>
        )} */}
        {/* {activeTab === "units" && (
      <div className="dark">
        <h2>Unit Quantity Code (UQC) in GST</h2>

        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>UQC</th>
              <th>Description</th>
              <th>S. No.</th>
              <th>UQC</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>

            <tr><td>1</td><td>BAG</td><td>Bags</td><td>23</td><td>MLT</td><td>Millilitre</td></tr>
            <tr><td>2</td><td>BAL</td><td>Bale</td><td>24</td><td>MTR</td><td>Meters</td></tr>
            <tr><td>3</td><td>BDL</td><td>Bundles</td><td>25</td><td>MTS</td><td>Metric Ton</td></tr>
            <tr><td>4</td><td>BKL</td><td>Buckles</td><td>26</td><td>NOS</td><td>Numbers</td></tr>
            <tr><td>5</td><td>BOU</td><td>Billions of Units</td><td>27</td><td>PAC</td><td>Packs</td></tr>
            <tr><td>6</td><td>BOX</td><td>Box</td><td>28</td><td>PCS</td><td>Pieces</td></tr>
            <tr><td>7</td><td>BTL</td><td>Bottles</td><td>29</td><td>PRS</td><td>Pairs</td></tr>
            <tr><td>8</td><td>BUN</td><td>Bunches</td><td>30</td><td>QTL</td><td>Quintal</td></tr>
            <tr><td>9</td><td>CAN</td><td>Cans</td><td>31</td><td>ROL</td><td>Rolls</td></tr>
            <tr><td>10</td><td>CBM</td><td>Cubic Meter</td><td>32</td><td>SET</td><td>Sets</td></tr>
            <tr><td>11</td><td>CCM</td><td>Cubic Centimeter</td><td>33</td><td>SQF</td><td>Square Feet</td></tr>
            <tr><td>12</td><td>CMS</td><td>Centimeter</td><td>34</td><td>SQM</td><td>Square Meters</td></tr>
            <tr><td>13</td><td>CTN</td><td>Cartons</td><td>35</td><td>SQY</td><td>Square Yards</td></tr>
            <tr><td>14</td><td>DOZ</td><td>Dozen</td><td>36</td><td>TBS</td><td>Tablets</td></tr>
            <tr><td>15</td><td>DRM</td><td>Drum</td><td>37</td><td>TGM</td><td>Ten Grams</td></tr>
            <tr><td>16</td><td>GGR</td><td>Great Gross</td><td>38</td><td>THD</td><td>Thousands</td></tr>
            <tr><td>17</td><td>GMS</td><td>Grams</td><td>39</td><td>TON</td><td>Tonnes</td></tr>
            <tr><td>18</td><td>GRS</td><td>Gross</td><td>40</td><td>TUB</td><td>Tubes</td></tr>
            <tr><td>19</td><td>GYD</td><td>Gross Yards</td><td>41</td><td>UGS</td><td>US Gallons</td></tr>
            <tr><td>20</td><td>KGS</td><td>Kilograms</td><td>42</td><td>UNT</td><td>Units</td></tr>
            <tr><td>21</td><td>KLR</td><td>Kilolitre</td><td>43</td><td>YDS</td><td>Yards</td></tr>
            <tr><td>22</td><td>KME</td><td>Kilometre</td><td>44</td><td>OTH</td><td>Others</td></tr>

          </tbody>
        </table>
      </div>
)} */}

        {/* ================= MODAL ================= */}
        {/* {showModal && (
          <div className="Item_modal">
            <div className="modal-box">
              <h2>Add New Product</h2>
              <input placeholder="Product Name"
                onChange={e=>setNewProduct({...newProduct,name:e.target.value})}/>
              <input type="number" placeholder="Purchase Price"
                onChange={e=>setNewProduct({...newProduct,purchasePrice:e.target.value})}/>
              <input type="number" placeholder="Sale Price"
                onChange={e=>setNewProduct({...newProduct,salePrice:e.target.value})}/>
              <input type="number" placeholder="Stock Quantity"
                onChange={e=>setNewProduct({...newProduct,stockQty:e.target.value})}/>
              <div className="modal-actions">
                <button onClick={()=>setShowModal(false)}>Cancel</button>
                <button className="save" onClick={handleAdd}>Save</button>
              </div>
            </div>
          </div>
        )} */}
      {showModal && (
        <div className="Item_modal">
          <div className="modal-box">
            <h2>Add New Product</h2>

            <input
              placeholder="Name"
              onChange={(e)=>
                setNewProduct({...newProduct,name:e.target.value})
              }
            />

            <input
              placeholder="HSN"
              onChange={(e)=>
                setNewProduct({...newProduct,hsn:e.target.value})
              }
            />
            <input
              placeholder="Description of items"
              onChange={(e)=>
                setNewProduct({...newProduct,hsn:e.target.value})
              }
            />
            <div className="unit-dropdown" ref={unitRef}>
              <input
                placeholder="Select Unit (e.g. KGS)"
                value={unitSearch}
                onChange={(e) => {
                  setUnitSearch(e.target.value.toUpperCase());
                  setShowUnitDropdown(true);
                }}
                onClick={() => setShowUnitDropdown(true)}
              />

              {showUnitDropdown && (
                <div className="unit-list">
                  {units
                    .filter(
                      (u) =>
                        u.code.toLowerCase().includes(unitSearch.toLowerCase()) ||
                        u.name.toLowerCase().includes(unitSearch.toLowerCase()) // optional search
                    )
                    .map((u, i) => (
                      <div
                        key={i}
                        className="unit-item"
                        onClick={() => {
                          setUnitSearch(u.code); // ✅ ONLY CODE SHOWN
                          setNewProduct({ ...newProduct, unit: u.code });
                          setShowUnitDropdown(false);
                        }}
                      >
                        {u.code} {/* ✅ ONLY CODE DISPLAY */}
                      </div>
                    ))}

                  {units.filter(
                    (u) =>
                      u.code.toLowerCase().includes(unitSearch.toLowerCase()) ||
                      u.name.toLowerCase().includes(unitSearch.toLowerCase())
                  ).length === 0 && (
                    <div className="unit-item no-data">No unit found</div>
                  )}
                </div>
              )}
            </div>
            {/* ================= GODOWN ================= */}
            <div className="row">
              <select
                value={selectedGodown}
                onChange={(e) => {
                  setSelectedGodown(e.target.value);
                  setNewProduct({ ...newProduct, godown: e.target.value });
                }}
              >
                <option>Select Godown</option>
                {godownList.map((g, i) => (
                  <option key={i}>{g}</option>
                ))}
              </select>

              <button
                className="gd-add-btn"
                onClick={() => setShowGodownModal(true)}
              >
                + Add New
              </button>
</div>



            <div className="row">
              <select
                onChange={(e)=>
                  setNewProduct({...newProduct,category:e.target.value})
                }
              >
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Accessories</option>
              </select>

              <button className="item-create-btn">Create</button>
            </div>

            <select
              onChange={(e)=>
                setNewProduct({...newProduct,type:e.target.value})
              }
            >
              <option>Select Type of Supply</option>
              <option>Goods</option>
              <option>Service</option>
              <option>Capital Goods</option>
            </select>

            <div className="row">
              <input
                type="number"
                placeholder="Rate"
                onChange={(e)=>
                  setNewProduct({...newProduct,rate:e.target.value})
                }
              />
              <span className="percent">%</span>
            </div>

            <select
              onChange={(e)=>
                setNewProduct({...newProduct,taxability:e.target.value})
              }
            >
              <option>Select Taxability Type</option>
              <option>Taxable</option>
              <option>Non-GST</option>
              <option>Nil Rated</option>
              <option>Exempt</option>
            </select>
            {/* ================= OPENING BALANCE ================= */}
            <div className="opening-balance">
              <label>Opening Balance</label>

              <div className="row">
                <input
                  type="number"
                  placeholder="Qty"
                  value={openingQty}
                  onChange={(e) => setOpeningQty(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Rate"
                  value={openingRate}
                  onChange={(e) => setOpeningRate(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={openingAmount}
                  onChange={(e) => setOpeningAmount(e.target.value)}
                />
              </div>
            </div>
            {showGodownModal && (
              <div className="mini-modal-overlay">
                <div className="mini-modal">
                  <h3>Add New Godown</h3>

                  <input
                    placeholder="Name"
                    value={newGodown.name}
                    onChange={(e) =>
                      setNewGodown({ ...newGodown, name: e.target.value })
                    }
                  />

                  <textarea
                    placeholder="Address"
                    value={newGodown.address}
                    onChange={(e) =>
                      setNewGodown({ ...newGodown, address: e.target.value })
                    }
                  />

                  <div className="modal-actions">
                    <button
                      className="cancel"
                      onClick={() => setShowGodownModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="save"
                      onClick={() => {
                        if (newGodown.name.trim()) {
                          setGodownList([...godownList, newGodown.name]);
                          setSelectedGodown(newGodown.name);
                          setShowGodownModal(false);
                          setNewGodown({ name: "", address: "" });
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="cancel" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="save" onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
