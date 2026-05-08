import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Building2,
  Settings,
  Link2,
  Shield,
  DatabaseBackup,
  Download,
  Languages,
  SplitSquareVertical,
  Trash2
} from "lucide-react";

import "../styles/CompanySettings.css";

const sidebarOptions = [
  {
    key: "create",
    label: "Create Company",
    icon: <Building2 size={18} />
  },

  {
    key: "alter",
    label: "Alter Company",
    icon: <Settings size={18} />
  },

  {
    key: "connect",
    label: "Connect Company",
    icon: <Link2 size={18} />
  },

  {
    key: "security",
    label: "Security",
    icon: <Shield size={18} />
  },

  {
    key: "backup",
    label: "Backup & Restore",
    icon: <DatabaseBackup size={18} />
  },

  {
    key: "import",
    label: "Import Company",
    icon: <Download size={18} />
  },

  {
    key: "language",
    label: "Language",
    icon: <Languages size={18} />
  },

  {
    key: "split",
    label: "Split Company",
    icon: <SplitSquareVertical size={18} />
  },

  {
    key: "delete",
    label: "Delete Company",
    icon: <Trash2 size={18} />,
    danger: true
  }
];

const CompanySettings = ({onSave}) => {
  const { collapsed } = useOutletContext();
   const [eInvoice, setEInvoice] = useState("No");
   const [ewayBill, setEwayBill] = useState("No");
  const [threshold, setThreshold] = useState("50000");
  const [ewbLoginId, setEwbLoginId] = useState("");
  const [ewbPassword, setEwbPassword] = useState("");
  const [financialYear, setFinancialYear] = useState("2024-25");
  const [bookBeginning, setBookBeginning] = useState("");
  const [returnType, setReturnType] = useState("Monthly");
  const [registrationType, setRegistrationType] = useState("Regular");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [useInventory, setUseInventory] = useState("No");
  const dropdownRef = useRef(null);
   const [showStateList, setShowStateList] = useState(false);
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

  const [activeTab, setActiveTab] = useState("create");
   const isValidGST = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
  return regex.test(gst);
};
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
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="company-settings-wrapper">

        {/* ================= SIDEBAR ================= */}
        <div className="company-settings-sidebar">

          <div className="settings-sidebar-header">
            <h2>Settings</h2>
            <p>Manage company preferences</p>
          </div>

          <div className="settings-sidebar-menu">

            {sidebarOptions.map((item) => (

              <button
                key={item.key}
                className={`settings-menu-item 
                ${activeTab === item.key ? "active" : ""}
                ${item.danger ? "danger" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* ================= CONTENT ================= */}
        <div className="company-settings-content">

          {/* CREATE COMPANY */}
          {/* {activeTab === "create" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Create Company</h2>
                  <p>Create a new company profile</p>
                </div>

                <button className="company-save-btn">
                  Save Company
                </button>
              </div>

              <div className="settings-form-grid">

                <div className="company-setting-form-group">
                  <label>Company Name</label>
                  <input type="text" placeholder="Enter company name" />
                </div>

                <div className="company-setting-form-group">
                  <label>GST Number</label>
                  <input type="text" placeholder="Enter GST number" />
                </div>

                <div className="company-setting-form-group full-width">
                  <label>Address</label>
                  <textarea placeholder="Enter company address" />
                </div>

                <div className="company-setting-form-group">
                  <label>Email</label>
                  <input type="email" placeholder="company@email.com" />
                </div>

                <div className="company-setting-form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="+91 9876543210" />
                </div>

              </div>

            </div>
          )} */}
          {/* CREATE COMPANY */}
          {activeTab === "create" && (
            <div className="settings-content-card">
              {/* HEADER */}
              <div className="content-header">
                <div>
                  <h2>Create Company</h2>
                  <p>Create a new company profile</p>
                </div>
                <button onClick={handleSave} className="company-save-btn">Save Company</button>
              </div>

              {/* SIMPLE 2 COLUMN LAYOUT */}
              <div className="company-create-grid">
                {/* =========================================
                    SECTION 1: COMPANY DETAILS (Full width header)
                ========================================= */}
                <div className="company-create-section">
                  <h4>
                    <span>🏢</span> Company Details
                  </h4>
                </div>

                {/* GSTIN */}
                <div className="company-create-form-group">
                  <label>GSTIN</label>
                  <div className="company-create-gst-row">
                    {/* <input type="text" placeholder="22AAAAA0000A1Z" />
                    <button className="company-create-gst-btn">Get GST</button> */}
                    <input 
                          maxLength={15} 
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          placeholder="22AAAAA0000A1Z"
                        />
                        <button className="company-create-gst-btn" onClick={handleGetGST}>
                          Get GST
                        </button>
                  </div>
                </div>

                {/* Company Name */}
                <div className="company-create-form-group">
                  <label>Company Name</label>
                  {/* <input type="text" placeholder="Enter company name" /> */}
                  <input 
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        placeholder="Enter company name"
                      />
                </div>

                {/* Registered Address - Full Width */}
                <div className="company-create-form-group company-create-full-width">
                  <label>Registered Address</label>
                  {/* <textarea rows="3" placeholder="Plot No, Street, City, PIN" /> */}
                  <textarea 
                        rows="2"
                        value={registeredAddress}
                        onChange={(e) => setRegisteredAddress(e.target.value)}
                        placeholder="Plot No, Street, City, PIN"
                      />
                </div>

                {/* Branch Address - Full Width */}
                <div className="company-create-form-group company-create-full-width">
                  <label>Branch Address</label>
                  {/* <textarea rows="3" placeholder="Branch address" /> */}
                  <textarea 
                        rows="2"
                        value={branchAddress}
                        onChange={(e) => setBranchAddress(e.target.value)}
                        placeholder="Branch location (optional)"
                      />
                </div>

                {/* State */}
                <div className="company-create-form-group">
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

                {/* Country */}
                <div className="company-create-form-group">
                  <label>Country</label>
                  <input value="India" readOnly />
                </div>

                {/* Email */}
                <div className="company-create-form-group">
                  <label>Email</label>
                  {/* <input type="email" placeholder="company@email.com" /> */}
                  <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@company.com"
                      />
                </div>

                {/* Website */}
                <div className="company-create-form-group">
                  <label>Website</label>
                  <input 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                      />
                </div>

                {/* Contact Person */}
                <div className="company-create-form-group">
                  <label>Contact Person</label>
                  <input 
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Full name"
                      />
                </div>

                {/* Contact No */}
                <div className="company-create-form-group">
                  <label>Contact No</label>
                 <input 
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                </div>

                {/* =========================================
                    SECTION 2: GST DETAILS
                ========================================= */}
                <div className="company-create-section">
                  <h4>
                    <span>📑</span> GST Details
                  </h4>
                </div>

                {/* Financial Year */}
                <div className="company-create-form-group">
                  <label>Financial Year</label>
                  <input 
                        placeholder="2024-25"
                        value={financialYear}
                        onChange={(e) => setFinancialYear(e.target.value)}
                      />
                </div>

                {/* Book Beginning */}
                <div className="company-create-form-group">
                  <label>Book Beginning</label>
                  <input 
                        type="date"
                        value={bookBeginning}
                        onChange={(e) => setBookBeginning(e.target.value)}
                      />
                </div>

                {/* Return Type */}
                <div className="company-create-form-group">
                  <label>Return Type</label>
                 <select 
                        value={returnType}
                        onChange={(e) => setReturnType(e.target.value)}
                      >
                        <option>Monthly</option>
                        <option>Quarterly</option>
                      </select>
                </div>

                {/* Registration Type */}
                <div className="company-create-form-group">
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

                {/* Use Inventory */}
                <div className="company-create-form-group">
                  <label>Use Inventory</label>
                  <div className="company-create-radio-group">
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

                {/* =========================================
                    SECTION 3: OTHER DETAILS
                ========================================= */}
                <div className="company-create-section">
                  <h4>
                    <span>⚙️</span> Other Details
                  </h4>
                </div>

                {/* E-Way Bill Applicable */}
                <div className="company-create-form-group">
                  <label>E-Way Bill Applicable</label>
                  <div className="company-create-radio-group">
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

                {/* Threshold */}
                {/* <div className="company-create-form-group">
                  <label>Threshold (₹)</label>
                  <input type="text" placeholder="50000" />
                </div> */}

                {/* EWB Login ID */}
                {/* <div className="company-create-form-group">
                  <label>EWB Login ID</label>
                  <input type="text" placeholder="Username / API login" />
                </div>

                {/* Password */}
                {/* <div className="company-create-form-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••" />
                </div> */} 

                {/* E-Invoice Applicable */}
                <div className="company-create-form-group">
                  <label>E-Invoice Applicable</label>
                  <div className="company-create-radio-group">
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

                {/* Invoice Login ID */}
                {/* <div className="company-create-form-group">
                  <label>Invoice Login ID</label>
                  <input type="text" placeholder="Invoice Username" />
                </div>

                {/* Invoice Password */}
                {/* <div className="company-create-form-group">
                  <label>Invoice Password</label>
                  <input type="password" placeholder="••••••" />
                </div> */} 
              </div>
            </div>
          )}

          {/* ALTER COMPANY */}
          {activeTab === "alter" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Alter Company</h2>
                  <p>Update company information</p>
                </div>

                <button className="save-btn">
                  Update
                </button>
              </div>

              <div className="settings-detail-list">

                <div className="detail-item">
                  <div>
                    <h4>Company Name</h4>
                    <p>TaxMate GST Pvt Ltd</p>
                  </div>

                  <button>Edit</button>
                </div>

                <div className="detail-item">
                  <div>
                    <h4>GST Details</h4>
                    <p>09ABCDE1234F1Z5</p>
                  </div>

                  <button>Edit</button>
                </div>

                <div className="detail-item">
                  <div>
                    <h4>Company Address</h4>
                    <p>Meerut, Uttar Pradesh</p>
                  </div>

                  <button>Edit</button>
                </div>

              </div>

            </div>
          )}

          {/* CONNECT COMPANY */}
          {activeTab === "connect" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Connect Company</h2>
                  <p>Connect with CA or accountant</p>
                </div>
              </div>

              <div className="connect-box">
                <input
                  type="email"
                  placeholder="Enter CA email"
                />

                <button className="connect-btn">
                  Connect
                </button>
              </div>

            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Security Settings</h2>
                  <p>Manage login and security</p>
                </div>
              </div>

              <div className="settings-form-grid">

                <div className="company-setting-form-group">
                  <label>Username</label>
                  <input type="text" />
                </div>

                <div className="company-setting-form-group">
                  <label>Password</label>
                  <input type="password" />
                </div>

                <div className="company-setting-form-group">
                  <label>2FA Authentication</label>

                  <select>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>

              </div>

            </div>
          )}

          {/* BACKUP */}
          {activeTab === "backup" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Backup & Restore</h2>
                  <p>Secure your company data</p>
                </div>
              </div>

              <div className="backup-actions">

                <button className="backup-btn">
                  Create Backup
                </button>

                <button className="restore-btn">
                  Restore Backup
                </button>

              </div>

            </div>
          )}

          {/* IMPORT */}
          {activeTab === "import" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Import Company</h2>
                  <p>Import from Tally, Busy, Vyapar etc.</p>
                </div>
              </div>

              <div className="upload-box">
                <p>Drag & drop backup file here</p>

                <button className="upload-btn">
                  Upload File
                </button>
              </div>

            </div>
          )}

          {/* LANGUAGE */}
          {activeTab === "language" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Language Settings</h2>
                  <p>Select preferred software language</p>
                </div>
              </div>

              <div className="company-setting-form-group language-select">
                <label>Language</label>

                <select>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Punjabi</option>
                  <option>Gujarati</option>
                </select>
              </div>

            </div>
          )}

          {/* SPLIT */}
          {activeTab === "split" && (
            <div className="settings-content-card">

              <div className="content-header">
                <div>
                  <h2>Split Company</h2>
                  <p>Create next financial year company</p>
                </div>
              </div>

              <div className="split-company-box">

                <input type="date" />

                <button className="split-btn">
                  Split Company
                </button>

              </div>

            </div>
          )}

          {/* DELETE */}
          {activeTab === "delete" && (
            <div className="settings-content-card danger-card">

              <div className="content-header">
                <div>
                  <h2>Delete Company</h2>
                  <p>This action cannot be undone</p>
                </div>
              </div>

              <div className="delete-warning">

                <p>
                  Are you sure you want to permanently delete this company?
                </p>

                <button className="delete-company-btn">
                  Delete Permanently
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CompanySettings;