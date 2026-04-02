import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/selectCompany.css";
import logo from "../assets/Logo.jpeg";

export default function SelectCompany({onClose}) {

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
  const [newCompanyName, setNewCompanyName] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const [showStateList, setShowStateList] = useState(false);
  const [showGstStateList, setShowGstStateList] = useState(false);
  const [showRegType, setShowRegType] = useState(false);

  const states = [
    "Uttar Pradesh", "Delhi", "Gujarat", "Punjab", "Tamil Nadu"
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
          <div className="modal-overlay">
            <div className="company-modal">
              {/* HEADER */}
              <div className="modal-header">
                <h3>Create Company</h3>
                <button className="cross" onClick={() => setIsCreating(false)}>✖</button>
              </div>

              {/* TAB SWITCH */}
              <div className="tab-bar">
                <button onClick={() => setActiveTab("company")}
                  className={activeTab === "company" ? "active" : ""}>
                  Company Details
                </button>

                <button onClick={() => setActiveTab("gst")}
                  className={activeTab === "gst" ? "active" : ""}>
                  GST Details
                </button>
              </div>

              {/* ================= COMPANY DETAILS ================= */}
              {activeTab === "company" && (
                <div className="form-section">

                  <div className="form-row">
                    <label>Company Name</label>
                    <input placeholder="Enter company name" />
                  </div>

                  <div className="form-row">
                    <label>Mailing Name</label>
                    <input />
                  </div>

                  <div className="form-row">
                    <label>Address</label>
                    <textarea />
                  </div>

                  <div className="form-row">
                    <label>State</label>

                    <div className="dropdown-box">
                      <input
                        readOnly
                        value={selectedState}
                        placeholder="Select State"
                        onClick={() => setShowStateList(!showStateList)}
                      />

                      {showStateList && (
                        <div className="dropdown-panel">
                          {states.map((s, i) => (
                            <div key={i} className="dropdown-item" onClick={() => {setSelectedState(s); setShowStateList(false);}}>
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Country</label>
                    <input value="India" readOnly />
                  </div>

                  <div className="form-row">
                    <label>Mobile</label>
                    <input placeholder="+91" />
                  </div>

                </div>
              )}

              {/* ================= GST DETAILS ================= */}
              {activeTab === "gst" && (
                <div className="form-section">

                  <div className="form-row">
                    <label>Registration Status</label>

                    <div className="dropdown-box">
                      <input
                        readOnly
                        value={selectedStatus}
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      />

                      {showStatusDropdown && (
                        <div className="dropdown-panel">
                          {["Active", "Inactive"].map((status, i) => (
                            <div
                              key={i}
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedStatus(status);     // ✅ set value
                                setShowStatusDropdown(false);  // ✅ close dropdown
                              }}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <label>State</label>

                    <div className="dropdown-box">
                      <input
                        readOnly
                        value={selectedgstState}   
                        placeholder="Select State"
                        onClick={() => setShowGstStateList(!showGstStateList)}
                      />

                      {showGstStateList && (
                        <div className="dropdown-panel">
                          {states.map((s, i) => (
                            <div
                              key={i}
                              className="dropdown-item"
                              onClick={() => {
                                setgstSelectedState(s);       
                                setShowGstStateList(false);
                              }}
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  

                  <div className="form-row">
                    <label>Registration Type</label>

                    <div className="dropdown-box">
                      <input
                        readOnly
                        value={selectedregState}
                        placeholder="Select"
                        onClick={() => setShowRegType(!showRegType)}
                      />

                      {showRegType && (
                        <div className="dropdown-panel">
                          {regTypes.map((r, i) => (
                            <div key={i} className="dropdown-item" onClick={() => {
                                setregSelectedState(r);       
                                setShowRegType(false);
                              }}>
                              {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <label>GSTIN</label>
                    <input />
                  </div>

                  <div className="form-row">
                    <label>Periodic of GSTR-1</label>
                    <div className="dropdown-box">
                      <input
                        readOnly
                        value={selectedPeriod}
                        onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                      />
                      {showPeriodDropdown && (
                        <div className="dropdown-panel">
                          {["Monthly", "Quarterly", "Annually"].map((item, i) => (
                            <div
                              key={i}
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedPeriod(item);     
                                setShowPeriodDropdown(false); 
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* FOOTER */}
              <div className="modal-footer">
                <button className="S-save-btn">Save</button>
                {/* <button className="S-cancel-btn" onClick={() => setIsCreating(false)}>Cancel</button> */}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
      </div>
  );
}