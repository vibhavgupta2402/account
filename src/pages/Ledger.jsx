import { useOutletContext, useNavigate, } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupSecondary from "../pages/SecGroupList";
import "../styles/ledger.css";

/* ================= GROUP TREE ================= */
const GROUP_TREE = [
  {
    name: "Current Assets",
    children: [
      { name: "Bank Accounts" },
      { name: "Cash in Hand" },
      { name: "Sundry Debtors" },
      { name: "Deposits" },
      { name: "Loan & Advances"},
      { name: "Stock in hand"}
    ]
  },
  {
    name: "Liabilities",
    children: [
      { name: "Capital Account" },
      { name: "Sundry Creditors" },
      { name: " Bank OD/Occ Alc"},
      { name: "Secured loans"},
      { name: "Unsecured loans"},
      { name: "Duties & Taxes"},
      { name: "Provisions"},
      { name: "Payables"}

    ]
  },
  {
    name : "Trading Account",
    children :[
      {name : "Opening Stock"},
      {name : "Purchase Account"},
      {name : "Direct Expenses"},
      {name : "Sales Account"},
      {name : "Direct income"},
      {name : "closing stock"},
      {name:"Gross profit"}
    ]
  },
  {
    name : "Profit & Loss Account",
    children:[
      {name : "Indirect Expenses"},
      {name : "Indirect Income"},
      {name : "Nett Profit"}

    ]
  }
];

/* ================= FLATTEN ================= */
const flattenGroups = (tree, depth = 0) => {
  let result = [];
  tree.forEach(node => {
    result.push({ name: node.name, depth });
    if (node.children) {
      result = result.concat(flattenGroups(node.children, depth + 1));
    }
  });
  return result;
};

const GROUP_LIST = flattenGroups(GROUP_TREE);


/* ================= GROUP TYPE ================= */
const getGroupType = (group) => {
  if (group === "Bank Accounts") return "bank";
  if (group === "Sundry Debtors") return "sundrydebtor";
  if (group === "Sundry Creditors") return "creditor";
  if (group === "Loan & Advances") return "loanadvance";
  if (group === "Secured loans") return "secureloans";
  if (group === "Unsecured loans") return "unsecureloans";
  if (group === "Duties & Taxes") return "tax";
  if (group === "Provisions") return "Provisions";

  return "basic";
};

export default function LedgerCreate() {
  const { collapsed } = useOutletContext();
  const navigate = useNavigate();
  const [showGroupModal, setShowGroupModal] = useState(false);

  const [groupList, setGroupList] = useState(GROUP_LIST);

  /* ================= STATE ================= */
  const [ledger, setLedger] = useState({
    name: "",
    address: "",
    group: "",
    mailingName: "",

    // BANK
    accHolder: "",
    accNo: "",
    ifsc: "",
    Swiftcode: "",
    bankName: "",
    branch: "",
    bankConfig: "No",

     // GST / DEBTOR
    gstin: "",
    billByBill: "Yes",
    creditPeriod: "",
    creditCheck: "No",
    contactPerson: "",
    mobile: "",
    email: "",

    // loan & advance

    assests : "",
    appropiate: "",
    method : "",

     dutyType: "Others",   // Others | GST
  taxType: "IGST",      // IGST | CGST | SGST | CESS
  percentage: "",
  roundingMethod: "Not Applicable",
  includeAssessable: "Not Applicable"
  });



  const [showGroup, setShowGroup] = useState(false);
  const [groupIndex, setGroupIndex] = useState(0);

  /* ================= AUTO SYNC ================= */
  useEffect(() => {
    setLedger(prev => ({
      ...prev,
      mailingName: prev.name
    }));
  }, [ledger.name]);
  useEffect(() => {
  const handleClickOutside = (e) => {
    // अगर group panel open है और click panel के बाहर हुआ
    if (showGroup) {
      const panel = document.querySelector(".ledger-group-panel");
      const modal = document.querySelector(".group-modal-box");

      if (panel && !panel.contains(e.target) && (!modal || !modal.contains(e.target))) {
        setShowGroup(false);   // 🔥 CLOSE DROPDOWN
      }
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showGroup]);

  /* ================= KEYBOARD NAV ================= */
  const handleGroupKeys = (e) => {
    if (!showGroup) return;

    if (e.key === "ArrowDown") {
      setGroupIndex(prev => (prev + 1) % GROUP_LIST.length);
    }

    if (e.key === "ArrowUp") {
      setGroupIndex(prev =>
        prev === 0 ? GROUP_LIST.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      setLedger(prev => ({
        ...prev,
        group: GROUP_LIST[groupIndex].name
      }));
      setShowGroup(false);
    }

    if (e.key === "Escape") {
      setShowGroup(false);
    }
  };
  const handleGetGSTDetails = async () => {
  if (ledger.gstin.length !== 15) {
    alert("GSTIN must be 15 characters");
    return;
  }

  try {
    const res = await fetch(`/api/gst/${ledger.gstin}`);
    const data = await res.json();

    setLedger(prev => ({
      ...prev,
      name: data.legal_name || "",
      address: data.address || "",
      contactPerson: data.contact_person || "",
      mobile: data.mobile || "",
      email: data.email || ""
    }));

  } catch (err) {
    console.error(err);
    alert("Failed to fetch GST details");
  }
};

  /* ================= gst-rowUI ================= */
  return (
    <div className="ledger-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>

        <div className="ledger-wrapper">

          {/* HEADER */}
          <h2 className="heading">Ledger Creation</h2>

          {/* TOP */}
          <div className="ledger-top">
            <div className="ledger-left-top">
              <div className="ledger-row">
                <label>Name</label>
                <input
                  value={ledger.name}
                  onChange={(e) =>
                    setLedger(prev => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="add-ledger-row">
                <label>Address</label>
                <textarea
                  className="ledger-textarea"
                  value={ledger.address}
                  onChange={(e) =>
                    setLedger(prev => ({ ...prev, address: e.target.value }))
                  }
                  placeholder="Enter Address"
                />
              </div>
            </div>
            <div className="ledger-right-top">
               <div className="gst-row">
                <label>GSTIN</label>

                <input
                  maxLength={15}
                  value={ledger.gstin}
                  onChange={(e) =>
                    setLedger(prev => ({
                      ...prev,
                      gstin: e.target.value.toUpperCase()
                    }))
                  }
                />

                <button className ="gst-btn" onClick={handleGetGSTDetails}>
                  Get Details
                </button>

                <label>Ledger Code</label>
                <input />
              </div>

              {/* CUSTOMER INFO */}
              <div className="customer-grid">

                <div className="contact">
                  <label>Customer</label>
                  <input value={ledger.contactPerson} readOnly />
                </div>

                <div className="mobile">
                  <label>Mobile</label>
                  <input value={ledger.mobile} readOnly />
                </div>

                <div className="email">
                  <label>Email</label>
                  <input value={ledger.email} readOnly />
                </div>

              </div>

            </div>
          </div>

          <div className="ledger-divider"></div>

          {/* BOTTOM SPLIT */}
          <div className="ledger-bottom">

            {/* LEFT */}
            <div className="ledger-left">

              <div className="under-ledger-row">
                <label>Under</label>
                <input
                  value={ledger.group}
                  readOnly
                  onClick={() => setShowGroup(true)}
                />
              </div>

              {/* 🔥 DYNAMIC FORM */}
              {getGroupType(ledger.group) === "bank" && (
                <div className="ledger-section">

                  <h3>Bank Account Details</h3>

                  <div className="ledger-line">
                    <span>A/c Holder</span><span>:</span>
                    <input
                      value={ledger.accHolder}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, accHolder: e.target.value }))
                      }
                    />
                  </div>

                  <div className="ledger-line">
                    <span>A/c No</span><span>:</span>
                    <input
                      value={ledger.accNo}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, accNo: e.target.value }))
                      }
                    />
                  </div>

                  <div className="ledger-line">
                    <span>IFSC</span><span>:</span>
                    <input
                      value={ledger.ifsc}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, ifsc: e.target.value }))
                      }
                    />
                  </div>
                  <div className="ledger-line">
                    <span>SWIFT CODE</span><span>:</span>
                    <input
                      value={ledger.Swiftcode}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, Swiftcode: e.target.value }))
                      }
                    />
                  </div>

                  <div className="ledger-line">
                    <span>Bank Name</span><span>:</span>
                    <input
                      value={ledger.bankName}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, bankName: e.target.value }))
                      }
                    />
                  </div>

                </div>
              )}
              
                 {getGroupType(ledger.group) === "tax" && (
                <div className="ledger-section">

                  <h3>Duties & Taxes</h3>

                  {/* TYPE */}
                  <div className="ledger-line">
                    <span>Type of Duty/Tax</span>
                    <span>:</span>
                    <select
                      value={ledger.dutyType}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, dutyType: e.target.value }))
                      }
                    >
                      <option>Others</option>
                      <option>GST</option>
                    </select>
                  </div>

                  {/* ================= OTHERS ================= */}
                  {ledger.dutyType === "Others" && (
                    <>
                      <div className="ledger-line">
                        <span>Percentage of calculation</span>
                        <span>:</span>
                        <input
                          value={ledger.percentage}
                          onChange={(e) =>
                            setLedger(prev => ({ ...prev, percentage: e.target.value }))
                          }
                        />
                      </div>

                      <h4>Statutory Details</h4>

                      <div className="ledger-line">
                        <span>Include in Assessable Value</span>
                        <span>:</span>
                        <select
                          value={ledger.includeAssessable}
                          onChange={(e) =>
                            setLedger(prev => ({
                              ...prev,
                              includeAssessable: e.target.value
                            }))
                          }
                        >
                          <option>Not Applicable</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* ================= GST ================= */}
                  {ledger.dutyType === "GST" && (
                    <>
                      <div className="ledger-line">
                        <span>Tax Type</span>
                        <span>:</span>
                        <select
                          value={ledger.taxType}
                          onChange={(e) =>
                            setLedger(prev => ({ ...prev, taxType: e.target.value }))
                          }
                        >
                          <option>IGST</option>
                          <option>CGST</option>
                          <option>SGST/UTGST</option>
                          <option>CESS</option>
                        </select>
                      </div>

                      <div className="ledger-line">
                        <span>Percentage</span>
                        <span>:</span>
                        <input
                          value={ledger.percentage}
                          onChange={(e) =>
                            setLedger(prev => ({ ...prev, percentage: e.target.value }))
                          }
                        />
                      </div>

                      <div className="ledger-line">
                        <span>Rounding Method</span>
                        <span>:</span>
                        <select
                          value={ledger.roundingMethod}
                          onChange={(e) =>
                            setLedger(prev => ({ ...prev, roundingMethod: e.target.value }))
                          }
                        >
                          <option>Not Applicable</option>
                          <option>Downward Rounding</option>
                          <option>Normal Rounding</option>
                          <option>Upward Rounding</option>
                        </select>
                      </div>
                    </>
                  )}

                </div>
              )}
              {getGroupType(ledger.group) === "loanadvance" && (
                <div className="ledger-section">
                  <h3>Loan & Advances</h3>
                  <div className="sundry-ledger-line">
                    <span>Inculde in Assessable Value calculation</span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.assests}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, assests: e.target.value }))
                      }>
                        <option>Not applicable</option>
                        <option>GST</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Appropriate to </span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.appropiate}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, appropiate: e.target.value }))
                      }>
                        <option>Goods</option>
                        <option>Goods and Services</option>
                        <option>Sevices</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Method of calculation </span>
                    <span>:</span>
                    <b>Based on value</b>
                  
                  </div>
                </div>
              )}
              {getGroupType(ledger.group) === "Provisions" && (
                <div className="ledger-section">
                  <h3>Provisions</h3>
                  <div className="sundry-ledger-line">
                    <span>Inculde in Assessable Value calculation</span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.assests}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, assests: e.target.value }))
                      }>
                        <option>Not applicable</option>
                        <option>GST</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Appropriate to </span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.appropiate}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, appropiate: e.target.value }))
                      }>
                        <option>Goods</option>
                        <option>Goods and Services</option>
                        <option>Sevices</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Method of calculation </span>
                    <span>:</span>
                    <b>Based on value</b>
                  
                  </div>
                </div>
              )}
              {getGroupType(ledger.group) === "secureloans" && (
                <div className="ledger-section">
                  <h3 className="sec-hed">Statutory details</h3>
                  <div className="sundry-ledger-line">
                    <span>Inculde in Assessable Value calculation</span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.assests}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, assests: e.target.value }))
                      }>
                        <option>Not applicable</option>
                        <option>GST</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Appropriate to </span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.appropiate}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, appropiate: e.target.value }))
                      }>
                        <option>Goods</option>
                        <option>Goods and Services</option>
                        <option>Sevices</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Method of calculation </span>
                    <span>:</span>
                    <b>Based on value</b>
                  
                  </div>
                </div>
              )}
              {getGroupType(ledger.group) === "unsecureloans" && (
                <div className="ledger-section">
                  <h3 className="sec-hed">Statutory details</h3>
                  <div className="sundry-ledger-line">
                    <span>Inculde in Assessable Value calculation</span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.assests}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, assests: e.target.value }))
                      }>
                        <option>Not applicable</option>
                        <option>GST</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Appropriate to </span>
                    <span>:</span>
                    <select className="sundryloan-tally-select"
                      value={ledger.appropiate}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, appropiate: e.target.value }))
                      }>
                        <option>Goods</option>
                        <option>Goods and Services</option>
                        <option>Sevices</option>
                    </select>
                  </div>
                  <div className="sundry-ledger-line">
                    <span>Method of calculation </span>
                    <span>:</span>
                    <b>Based on value</b>
                  
                  </div>
                </div>
              )}

              {getGroupType(ledger.group) === "sundrydebtor" && (
                <div className="ledger-section">
                  <h3>Sundry Debtors Details</h3>
                  {/* BILL BY BILL */}
                  <div className="sundry-ledger-line">
                    <span>Maintain balances bill-by-bill</span>
                    <span>:</span>
                    <select
                      className="sundry-tally-select"
                      value={ledger.billByBill}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, billByBill: e.target.value }))
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  {/* CREDIT PERIOD */}
                  <div className="sundry-ledger-line">
                    <span>Default credit period</span>
                    <span>:</span>
                    <input
                      className="sundry-tally-input"
                      placeholder="e.g. 30 Days"
                      value={ledger.creditPeriod}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, creditPeriod: e.target.value }))
                      }
                    />
                  </div>

                  {/* CREDIT CHECK */}
                  <div className="sundry-ledger-line">
                    <span>Check for credit days during voucher entry</span>
                    <span>:</span>
                    <select
                      className="sundry-tally-select"
                      value={ledger.creditCheck}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, creditCheck: e.target.value }))
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>

                </div>
              )}
              {getGroupType(ledger.group) === "creditor" && (
                <div className="ledger-section">
                  <h3>Sundry Debtors Details</h3>
                  {/* BILL BY BILL */}
                  <div className="sundry-ledger-line">
                    <span>Maintain balances bill-by-bill</span>
                    <span>:</span>
                    <select
                      className="sundry-tally-select"
                      value={ledger.billByBill}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, billByBill: e.target.value }))
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  {/* CREDIT PERIOD */}
                  <div className="sundry-ledger-line">
                    <span>Default credit period</span>
                    <span>:</span>
                    <input
                      className="sundry-tally-input"
                      placeholder="e.g. 30 Days"
                      value={ledger.creditPeriod}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, creditPeriod: e.target.value }))
                      }
                    />
                  </div>

                  {/* CREDIT CHECK */}
                  <div className="sundry-ledger-line">
                    <span>Check for credit days during voucher entry</span>
                    <span>:</span>
                    <select
                      className="sundry-tally-select"
                      value={ledger.creditCheck}
                      onChange={(e) =>
                        setLedger(prev => ({ ...prev, creditCheck: e.target.value }))
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>

                </div>
              )}

            </div>

            {/* RIGHT */}
            <div className="ledger-right">

              <div className="ledger-mailing">

                <h3>Mailing Details</h3>

                {/* <div className="ledger-line">
                  <span>Name</span><span>:</span>
                  <input value={ledger.mailingName} readOnly />
                </div>

                <div className="ledger-line">
                  <span>Address</span><span>:</span>
                  <input value={ledger.address} readOnly />
                </div> */}

                <div className="ledger-line">
                  <span>State</span><span>:</span>
                  <b>Uttar Pradesh</b>
                </div>

                <div className="ledger-line">
                  <span>Country</span><span>:</span>
                  <b>India</b>
                </div>
                {/* <div className="ledger-line">
                 <span>Pincode</span>
                 <span>:</span>
                 <input className="tally-input" />
               </div> */}
               {/* BANKING */}
               {/* <h4>Banking Details</h4> */}

               {/* <div className="ledger-line">
                 <span>Provide bank details</span>
                 <span>:</span>
                 <select className="tally-select">
                   <option>No</option>
                   <option>Yes</option>
                 </select>
               </div> */}
               {/* TAX */}
               <h4>Tax Registration Details</h4>

               <div className="ledger-line">
                 <span>PAN/IT No.</span>
                 <span>:</span>
                 <input className="tally-input" />
               </div>

               <div className="ledger-line">
                 <span>Registration type</span>
                 <span>:</span>
                 <select>
                  <option>Regular</option>
                  <option>Composition</option>
                  <option>Unregistered / Consumer</option>
                  <option>Government Entity / TDS</option>
                  <option>Regular - SEZ</option>
                  <option>Regular - Exports (EOU)</option>
                  <option>E-Commerce Operator</option>
                  <option>Input Service Distributor</option>
                  <option>Embassy / UN Body</option>
                  <option>Non Resident Taxpayer</option>
                 </select>
                 {/* <b>Regular</b> */}
               </div>

               {/* <div className="ledger-line">
                 <span>GSTIN/UIN</span>
                 <span>:</span>
                 <input className="tally-input" />
               </div>

               <div className="ledger-line">
                 <span>Set/Alter GST details</span>
                 <span>:</span>
                 <select className="tally-select">
                   <option>No</option>
                   <option>Yes</option>
                 </select>
               </div> */}

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="ledger-footer">
            <button className="led-save-btn">Save</button>
            <button className="led-cancel-btn">Cancel</button>
          </div>

        </div>

        {/* 🔥 GROUP PANEL */}
        {showGroup && (
          <div
            className="ledger-group-panel"
            tabIndex={0}
            onKeyDown={handleGroupKeys}
          >
            <div className="list-group-header">
                <h3>List of Groups</h3>
                <button className="group-create-btn" onClick={() => setShowGroupModal(true)}>Create</button>

            </div>

            {GROUP_LIST.map((g, i) => (
              <div
                key={i}
                className={`group-item ${i === groupIndex ? "active" : ""}`}
                onClick={() => {
                  setLedger(prev => ({ ...prev, group: g.name }));
                  setShowGroup(false);
                }}
              >
                <span
                  className="group-text"
                  style={{ paddingLeft: `${g.depth * 20}px` }}
                >
                  {g.name}
                </span>

              </div>
            ))}
          </div>
        )}
        {showGroupModal && (
        <div
          className="group-modal-overlay"
          onClick={() => setShowGroupModal(false)}   // 🔥 outside click
        >
          <div
            className="group-modal-box"
            onClick={(e) => e.stopPropagation()}     // 🔥 prevent close inside
          >
            <GroupSecondary
              onClose={() => setShowGroupModal(false)}   // 🔥 cancel button
              onSave={(data) => {

                const newGroup = {
                  name: data.name,
                  depth: 1
                };

                setGroupList(prev => [...prev, newGroup]);

                setLedger(prev => ({
                  ...prev,
                  group: data.name
                }));

                setShowGroupModal(false);
              }}
            />
          </div>
        </div>
      )}

      </div>
    </div>
  );
}