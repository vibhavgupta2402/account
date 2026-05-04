import { useNavigate } from "react-router-dom";
import { useState, useEffect,useRef  } from "react";
import "../styles/selectCompany.css";
import logo from "../assets/Logo.jpeg";

export default function SelectCompany({onClose, onSave}) {

  const navigate = useNavigate();
  const [companies, setCompanies] = useState([
    "A. K. STEELS",
    "G. K. CONSTRUCTIONS",
    "NATIONAL CASTING INDUSTRIES",
    "MAYA FURNITURE & INTERIOR",
    "TAXMATE TECHNOLOGY PRIVATE LIMITED",
    "BEST COMPRESSOR MFG. VALVE CO.",
    "UPDATE BOOKS",
    "SHIKSHA SAGAR PUBLICATION"
  ]);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [showStateList, setShowStateList] = useState(false);
  const [showGstStateList, setShowGstStateList] = useState(false);
  const [showRegType, setShowRegType] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const dropdownRef = useRef(null);
  
  // GST Details
  const [financialYear, setFinancialYear] = useState("2024-25");
  const [bookBeginning, setBookBeginning] = useState("");
  const [returnType, setReturnType] = useState("Monthly");
  const [registrationType, setRegistrationType] = useState("Regular");
  const [useInventory, setUseInventory] = useState("No");
  
  // Other Details
  const [ewayBill, setEwayBill] = useState("No");
  const [threshold, setThreshold] = useState("50000");
  const [eInvoice, setEInvoice] = useState("No");
  const [ewbLoginId, setEwbLoginId] = useState("");
  const [ewbPassword, setEwbPassword] = useState("");

  const handleSave = () => {
    const companyData = {
      companyName: newCompanyName,
      gstin,
      registeredAddress,
      branchAddress,
      state: selectedState,
      country: "India",
      email,
      website,
      contactPerson,
      contactNo,
      financialYear,
      bookBeginning,
      returnType,
      registrationType,
      useInventory,
      ewayBill,
      threshold,
      eInvoice,
      ewbLoginId,
      ewbPassword,
    };
    
    if (onSave) onSave(companyData);
    if (onClose) onClose();
  };

  const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh"
];

  const regTypes = ["Regular", "Composition", "Regular - SEZ"];

  const [selectedState, setSelectedState] = useState("");
  const [selectedgstState, setgstSelectedState] = useState("");
  const [selectedregState, setregSelectedState] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const selectCompany = (company) => {
    localStorage.setItem("company", company);
    navigate("/dashboard");
  };
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  const createCompany = () => {
    setIsCreating(true);
  };

  const handleCreateCompany = (e) => {
    e.preventDefault();
    if (newCompanyName.trim()) {
      setCompanies([newCompanyName.trim(), ...companies]);
      setNewCompanyName("");
      setIsCreating(false);
      setActiveTab("company");
      setShowStateList(false);
      setShowRegType(false);
      if (onClose) onClose();
    }
  };

  const filtered = companies.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowStateList(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const isValidGST = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
  return regex.test(gst);
};
const handleGetGST = async () => {
  if (!isValidGST(gstin)) {
    alert("Invalid GSTIN");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/get-gst", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gstin }),
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Auto fill fields
      setNewCompanyName(data.companyName);
      setRegisteredAddress(data.address);
      setSelectedState(data.state);
      setEmail(data.email || "");
    } else {
      alert("GST not found");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
  


  return (
    <div className="sidebar-logo">
          <span><img src={logo} alt="Company Logo" /></span>
      
    <div className="company-page">
      <div className="gradient-bg"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="company-container">
        <div className="company-header">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11a9.39 9.39 0 0 0 1-11.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 7l-8-5-8 5v10c0 5.55 3.84 9.74 9 11 2.16-.53 4.08-1.46 5.74-2.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="app-title">
                Accounting Software
              </h1>
            </div>
            <p className="subtitle">Choose your company to get started</p>
          </div>

          <button
            className="create-btn"
            onClick={createCompany}
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Company
          </button>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              className="company-search"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{companies.length}</span>
            <span className="stat-label">Total Companies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{filtered.length}</span>
            <span className="stat-label">Found</span>
          </div>
        </div>

        <div className="company-list">
          {filtered.length > 0 ? (
            filtered.map((company, i) => (
              <div
                key={company + i}
                className="company-card"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="company-info">
                  <div className="company-avatar">
                    {company.charAt(0).toUpperCase()}
                  </div>
                  <div className="company-details">
                    <span className="company-name">{company}</span>
                    <span className="company-id">ID: {i + 1}</span>
                  </div>
                </div>
                <button
                  className="select-btn"
                  onClick={() => selectCompany(company)}
                >
                  Select
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 64 64" fill="none">
                  <path d="M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20h24v24H20z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>No companies found</h3>
              <p>Try adjusting your search or create a new company</p>
            </div>
          )}
        </div>

        {isCreating && (
          <div className="create-popup-overlay">
              <div className="create-popup-modal">
                {/* HEADER */}
                <div className="popup-header">
                  <h3>Create Company</h3>
                  <button onClick={() => setIsCreating(false)} className="close-btn">✖</button>
                </div>

                {/* 3-COLUMN LAYOUT */}
                <div className="popup-three-columns">
                  
                  {/* COLUMN 1: COMPANY DETAILS */}
                  <div className="popup-column">
                    <div className="column-header">
                      <span className="column-icon">🏢</span>
                      <h4>Company Details</h4>
                    </div>
                    
                    <div className="popup-field">
                      <label>GSTIN</label>
                      <div className="gst-row">
                        <input 
                          maxLength={15} 
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          placeholder="22AAAAA0000A1Z"
                        />
                        <button className="gst-btn" onClick={handleGetGST}>
                          Get GST
                        </button>
                      </div>
                    </div>

                    <div className="popup-field">
                      <label>Company Name</label>
                      <input 
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className="popup-field">
                      <label>Registered Address</label>
                      <textarea 
                        rows="2"
                        value={registeredAddress}
                        onChange={(e) => setRegisteredAddress(e.target.value)}
                        placeholder="Plot No, Street, City, PIN"
                      />
                    </div>

                    <div className="popup-field">
                      <label>Branch Address</label>
                      <textarea 
                        rows="2"
                        value={branchAddress}
                        onChange={(e) => setBranchAddress(e.target.value)}
                        placeholder="Branch location (optional)"
                      />
                    </div>

                    <div className="popup-field">
                      <label>State</label>

                      <div className="dropdown-box" ref={dropdownRef}>
                        <input
                          value={selectedState}
                          placeholder="Search or select state"
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            setShowStateList(true);
                          }}
                          onClick={() => setShowStateList(true)}
                        />

                        {showStateList && (
                          <div className="dropdown-panel">
                            {states.filter((state) =>state.toLowerCase().startsWith(selectedState.toLowerCase()))
                              .map((state, i) => (
                                <div
                                  key={i}
                                  className="dropdown-item"
                                  onClick={() => {
                                    setSelectedState(state);
                                    setShowStateList(false);
                                  }}
                                >
                                  {state}
                                </div>
                              ))}

                            {/* If no match */}
                            {states.filter((s) =>
                              s.toLowerCase().includes(selectedState.toLowerCase())
                            ).length === 0 && (
                              <div className="dropdown-item no-data">
                                No state found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="popup-field">
                      <label>Country</label>
                      <input value="India" readOnly />
                    </div>

                    <div className="popup-field">
                      <label>Email</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@company.com"
                      />
                    </div>

                    <div className="popup-field">
                      <label>Website</label>
                      <input 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="popup-field">
                      <label>Contact Person</label>
                      <input 
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Full name"
                      />
                    </div>

                    <div className="popup-field">
                      <label>Contact No</label>
                      <input 
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* COLUMN 2: GST DETAILS */}
                  <div className="popup-column">
                    <div className="column-header">
                      <span className="column-icon">📑</span>
                      <h4>GST Details</h4>
                    </div>

                    <div className="popup-field">
                      <label>Financial Year</label>
                      <input 
                        placeholder="2024-25"
                        value={financialYear}
                        onChange={(e) => setFinancialYear(e.target.value)}
                      />
                    </div>

                    <div className="popup-field">
                      <label>Book Beginning</label>
                      <input 
                        type="date"
                        value={bookBeginning}
                        onChange={(e) => setBookBeginning(e.target.value)}
                      />
                    </div>

                    <div className="popup-field">
                      <label>Return Type</label>
                      <select 
                        value={returnType}
                        onChange={(e) => setReturnType(e.target.value)}
                      >
                        <option>Monthly</option>
                        <option>Quarterly</option>
                      </select>
                    </div>

                    <div className="popup-field">
                      <label>Registration Type</label>
                      <select 
                        value={registrationType}
                        onChange={(e) => setRegistrationType(e.target.value)}
                      >
                        <option>Regular</option>
                        <option>Composition</option>
                        <option>Regular SEZ</option>
                      </select>
                    </div>

                    <div className="popup-field">
                      <label>Use Inventory</label>
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="inventory" 
                            checked={useInventory === "Yes"}
                            onChange={() => setUseInventory("Yes")}
                          /> Yes
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="inventory"
                            checked={useInventory === "No"}
                            onChange={() => setUseInventory("No")}
                          /> No
                        </label>
                      </div>
                    </div>

                    {/* <div className="popup-field">
                      <label>GST Filing Status</label>
                      <select defaultValue="Active">
                        <option>Active</option>
                        <option>Suspended</option>
                      </select>
                    </div>

                    <div className="popup-field">
                      <label>Annual Turnover</label>
                      <input placeholder="Enter turnover amount" />
                    </div> */}
                  </div>

                  {/* COLUMN 3: OTHER DETAILS */}
                  <div className="popup-column">
                    <div className="column-header">
                      <span className="column-icon">⚙️</span>
                      <h4>Other Details</h4>
                    </div>

                    {/* ================= E-WAY BILL ================= */}
                    <div className="popup-field">
                      <label>E-Way Bill Applicable</label>
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="eway" 
                            checked={ewayBill === "Yes"}
                            onChange={() => setEwayBill("Yes")}
                          /> Yes
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="eway"
                            checked={ewayBill === "No"}
                            onChange={() => setEwayBill("No")}
                          /> No
                        </label>
                      </div>
                    </div>

                    {/* ✅ SHOW ONLY IF YES */}
                    {ewayBill === "Yes" && (
                      <>
                        <div className="popup-field">
                          <label>Threshold (₹)</label>
                          <input 
                            placeholder="50000"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                          />
                        </div>

                        <div className="popup-field">
                          <label>EWB Login ID</label>
                          <input 
                            value={ewbLoginId}
                            onChange={(e) => setEwbLoginId(e.target.value)}
                            placeholder="Username / API login"
                          />
                        </div>

                        <div className="popup-field">
                          <label>Password</label>
                          <input 
                            type="password"
                            value={ewbPassword}
                            onChange={(e) => setEwbPassword(e.target.value)}
                            placeholder="••••••"
                          />
                        </div>
                      </>
                    )}

                    {/* ================= E-INVOICE ================= */}
                    <div className="popup-field">
                      <label>E-Invoice Applicable</label>
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="einvoice"
                            checked={eInvoice === "Yes"}
                            onChange={() => setEInvoice("Yes")}
                          /> Yes
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="einvoice"
                            checked={eInvoice === "No"}
                            onChange={() => setEInvoice("No")}
                          /> No
                        </label>
                      </div>
                    </div>

                    {/* ✅ SHOW ONLY IF YES */}
                    {eInvoice === "Yes" && (
                      <>
                        <div className="popup-field">
                          <label>Invoice Login ID</label>
                          <input placeholder="Invoice Username" />
                        </div>

                        <div className="popup-field">
                          <label>Invoice Password</label>
                          <input type="password" placeholder="••••••" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="popup-footer">
                  <button onClick={handleSave} className="save-btn">Save Company</button>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
      </div>
  );
}