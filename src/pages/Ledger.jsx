// import { useOutletContext } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import "../styles/ledger.css";

// const GROUPS = [
//   "Bank Accounts",
//   "Cash-in-Hand",
//   "Capital Account",
//   "Current Assets",
//   "Current Liabilities",
//   "Direct Expenses",
//   "Direct Incomes",
//   "Indirect Expenses",
//   "Indirect Incomes",
//   "Sales Accounts",
//   "Purchase Accounts"
// ];

// export default function LedgerCreate() {
//   const { collapsed } = useOutletContext();

//   const [ledger, setLedger] = useState({
//     name: "",
//     address: "",
//     group: "",
//     mailingName: "",
//     accountNo: ""
//   });

//   const [showGroup, setShowGroup] = useState(false);
//   const [groupIndex, setGroupIndex] = useState(0);

//   // 🔥 Auto sync
//   useEffect(() => {
//     setLedger(prev => ({
//       ...prev,
//       mailingName: prev.name
//     }));
//   }, [ledger.name]);

//   // 🔥 Focus group panel
//   useEffect(() => {
//     if (showGroup) {
//       document.getElementById("group-panel")?.focus();
//     }
//   }, [showGroup]);

//   // 🔥 TAB FLOW
//   const handleTab = (e, next) => {
//     if (e.key === "Tab") {
//       e.preventDefault();
//       if (next === "group") setShowGroup(true);
//     }
//   };

//   // 🔥 GROUP NAVIGATION
//   const handleGroupKeys = (e) => {
//     if (!showGroup) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setGroupIndex(prev => (prev + 1) % GROUPS.length);
//     }

//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setGroupIndex(prev =>
//         prev === 0 ? GROUPS.length - 1 : prev - 1
//       );
//     }

//     if (e.key === "Enter") {
//       e.preventDefault();

//       setLedger(prev => ({
//         ...prev,
//         group: GROUPS[groupIndex]
//       }));

//       setShowGroup(false);

//       // 🔥 focus address manually
//       document.getElementById("address-input")?.focus();
//     }

//     if (e.key === "Escape") {
//       setShowGroup(false);
//     }
//   };

//   return (
//     <div className="ledger-app">
//   <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
//     <div className="ledger-container">

//       {/* HEADER */}
//       <div className="ledger-header">
//         <h2>Ledger Creation</h2>
//       </div>

//       {/* BODY */}
//       <div className="ledger-body">

//         {/* LEFT SIDE */}
//         <div className="ledger-left">

//           <div className="form-row">
//             <label>Name</label>
//             <input
//               value={ledger.name}
//               onChange={(e) =>
//                 setLedger(prev => ({ ...prev, name: e.target.value }))
//               }
//             />
//           </div>

//           <div className="form-row">
//             <label>Address</label>
//             <textarea
//               value={ledger.address}
//               onChange={(e) =>
//                 setLedger(prev => ({ ...prev, address: e.target.value }))
//               }
//             />
//           </div>

//           <div className="form-row">
//             <label>Under</label>
//             <input value={ledger.group} readOnly />
//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="ledger-right-section">

//           {/* MAILING */}
//           <div className="ledger-mailing">

//             <h3>Mailing Details</h3>

//             <div className="ledger-line">
//               <span>Name</span>
//               <span>:</span>
//               <input
//                 className="tally-input"
//                 value={ledger.mailingName}
//                 onChange={(e) =>
//                   setLedger(prev => ({ ...prev, mailingName: e.target.value }))
//                 }
//               />
//             </div>

//             <div className="ledger-line">
//               <span>Address</span>
//               <span>:</span>
//               <textarea
//                 className="tally-textarea"
//                 value={ledger.address}
//                 onChange={(e) =>
//                   setLedger(prev => ({ ...prev, address: e.target.value }))
//                 }
//               />
//             </div>

//             <div className="ledger-line">
//               <span>State</span>
//               <span>:</span>
//               <b>Uttar Pradesh</b>
//             </div>

//             <div className="ledger-line">
//               <span>Country</span>
//               <span>:</span>
//               <b>India</b>
//             </div>

//             <div className="ledger-line">
//               <span>Pincode</span>
//               <span>:</span>
//               <input className="tally-input" />
//             </div>

//             {/* BANKING */}
//             <h4>Banking Details</h4>

//             <div className="ledger-line">
//               <span>Provide bank details</span>
//               <span>:</span>
//               <select className="tally-select">
//                 <option>No</option>
//                 <option>Yes</option>
//               </select>
//             </div>

//             {/* TAX */}
//             <h4>Tax Registration Details</h4>

//             <div className="ledger-line">
//               <span>PAN/IT No.</span>
//               <span>:</span>
//               <input className="tally-input" />
//             </div>

//             <div className="ledger-line">
//               <span>Registration type</span>
//               <span>:</span>
//               <b>Regular</b>
//             </div>

//             <div className="ledger-line">
//               <span>GSTIN/UIN</span>
//               <span>:</span>
//               <input className="tally-input" />
//             </div>

//             <div className="ledger-line">
//               <span>Set/Alter GST details</span>
//               <span>:</span>
//               <select className="tally-select">
//                 <option>No</option>
//                 <option>Yes</option>
//               </select>
//             </div>

//           </div>
//           {/* BANK */}
//           {ledger.group === "Bank Accounts" && (
//             <div className="card">
//               <h3>Bank Details</h3>

//               <div className="form-row">
//                 <label>Account No</label>
//                 <input
//                   value={ledger.accountNo}
//                   onChange={(e) =>
//                     setLedger(prev => ({
//                       ...prev,
//                       accountNo: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//             </div>
//           )}

//         </div>

//       </div>

//       {/* FOOTER */}
//       <div className="ledger-footer">
//         <button className="led-save-btn">Save</button>
//         <button className="led-cancel-btn">Cancel</button>
//       </div>

//     </div>
//   </div>
// </div>
//   );
// }

import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
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

  /* ================= UI ================= */
  return (
    <div className="ledger-app">
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>

        <div className="ledger-wrapper">

          {/* HEADER */}
          <h2 className="heading">Ledger Creation</h2>

          {/* TOP */}
          <div className="ledger-top">

            <div className="ledger-row">
              <label>Name</label>
              <input
                value={ledger.name}
                onChange={(e) =>
                  setLedger(prev => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="ledger-row">
              <label>Address</label>
              <input
                value={ledger.address}
                onChange={(e) =>
                  setLedger(prev => ({ ...prev, address: e.target.value }))
                }
              />
            </div>

          </div>

          <div className="ledger-divider"></div>

          {/* BOTTOM SPLIT */}
          <div className="ledger-bottom">

            {/* LEFT */}
            <div className="ledger-left">

              <div className="ledger-row">
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

                <div className="ledger-line">
                  <span>Name</span><span>:</span>
                  <input value={ledger.mailingName} readOnly />
                </div>

                <div className="ledger-line">
                  <span>Address</span><span>:</span>
                  <input value={ledger.address} readOnly />
                </div>

                <div className="ledger-line">
                  <span>State</span><span>:</span>
                  <b>Uttar Pradesh</b>
                </div>

                <div className="ledger-line">
                  <span>Country</span><span>:</span>
                  <b>India</b>
                </div>
                <div className="ledger-line">
                 <span>Pincode</span>
                 <span>:</span>
                 <input className="tally-input" />
               </div>
               {/* BANKING */}
               <h4>Banking Details</h4>

               <div className="ledger-line">
                 <span>Provide bank details</span>
                 <span>:</span>
                 <select className="tally-select">
                   <option>No</option>
                   <option>Yes</option>
                 </select>
               </div>
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
                 <b>Regular</b>
               </div>

               <div className="ledger-line">
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
               </div>

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
            <h3>List of Groups</h3>

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

      </div>
    </div>
  );
}