// import { useOutletContext } from "react-router-dom";
// import React, { useState, useMemo } from "react";
// // import "./ProfitLoss.css";

// const months = [
//   "Jan","Feb","Mar","Apr","May","Jun",
//   "Jul","Aug","Sep","Oct","Nov","Dec"
// ];

// const quarters = ["Jan–Mar","Apr–Jun","Jul–Sep","Oct–Dec"];

// const sampleData = [
//   { type: "Income", name: "Product Sale", monthly: [0,1200,1387,0,2587,0,0,0,0,0,0,0]},
//   { type: "Income", name: "Service", monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]},
//   { type: "Expense", name: "Rent", monthly: [0,0,0,0,2587,0,0,0,0,0,0,0]},
//   { type: "Expense", name: "Salary", monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]}
// ];

// export default function ProfitLoss() {
//   const { collapsed } = useOutletContext();
//   const [view,setView] = useState("Quarterly");

//   const sum = arr => arr.reduce((a,b)=>a+b,0);

//   const getValues = (monthly)=>{
//     if(view==="Monthly") return monthly;

//     if(view==="Quarterly"){
//       return [
//         sum(monthly.slice(0,3)),
//         sum(monthly.slice(3,6)),
//         sum(monthly.slice(6,9)),
//         sum(monthly.slice(9,12))
//       ];
//     }

//     return [sum(monthly)];
//   };

//   const columns = useMemo(()=>{
//     if(view==="Monthly") return months;
//     if(view==="Quarterly") return quarters;
//     return ["Year Total"];
//   },[view]);

//   const incomeRows = sampleData.filter(d=>d.type==="Income");
//   const expenseRows = sampleData.filter(d=>d.type==="Expense");

//   const totalIncome = incomeRows.reduce((a,b)=>a+sum(b.monthly),0);
//   const totalExpense = expenseRows.reduce((a,b)=>a+sum(b.monthly),0);
//   const netResult = totalIncome - totalExpense;

//   const renderSimpleTable = (rows,title,label)=>{

//     const tableData = rows.map(r=>{
//       const values = getValues(r.monthly);
//       return {
//         name: r.name,
//         values,
//         total: sum(values)
//       };
//     });

//     const columnTotals = columns.map((_,colIndex)=>{
//       return tableData.reduce((a,b)=>a + (b.values[colIndex] || 0),0);
//     });

//     const grandTotal = tableData.reduce((a,b)=>a + b.total,0);

//     return (
//       <div className="pl-table-section">
//         <h2>{title}</h2>

//         <table className="pl-table">
//           <thead>
//             <tr>
//               <th>{label}</th>
//               {columns.map((col,i)=>(
//                 <th key={i}>{col}</th>
//               ))}
//               <th>Total</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tableData.map((row,i)=>(
//               <tr key={i}>
//                 <td className="left">{row.name}</td>
//                 {row.values.map((val,idx)=>(
//                   <td key={idx}>₹ {val.toLocaleString()}</td>
//                 ))}
//                 <td className="strong">₹ {row.total.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>

//           <tfoot>
//             <tr>
//               <td className="strong">Total {title}</td>
//               {columnTotals.map((val,i)=>(
//                 <td key={i} className="strong">
//                   ₹ {val.toLocaleString()}
//                 </td>
//               ))}
//               <td className="strong">
//                 ₹ {grandTotal.toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className={`main ${collapsed ? "collapsed" : ""}`}>
//       <div className="pl-container">

//         <div className="pl-header">
//           <h1>Profit & Loss</h1>

//           <select
//             value={view}
//             onChange={(e)=>setView(e.target.value)}
//           >
//             <option>Monthly</option>
//             <option>Quarterly</option>
//             <option>Yearly</option>
//           </select>
//         </div>

//         <div className="pl-summary">
//           <div className="card income">
//             <p>Total Income</p>
//             <h3>₹ {totalIncome.toLocaleString()}</h3>
//           </div>

//           <div className="card expense">
//             <p>Total Expense</p>
//             <h3>₹ {totalExpense.toLocaleString()}</h3>
//           </div>

//           <div className={`card ${netResult>=0 ? "profit" : "loss"}`}>
//             <p>{netResult>=0 ? "Net Profit" : "Net Loss"}</p>
//             <h3>₹ {Math.abs(netResult).toLocaleString()}</h3>
//           </div>
//         </div>

//         {renderSimpleTable(incomeRows,"Income","Source")}
//         {renderSimpleTable(expenseRows,"Expense","Expense Type")}

//       </div>
//     </div>
//   );
// }








// // import React, { useState, useMemo } from "react";


// // const months = [
// //   "Jan","Feb","Mar","Apr","May","Jun",
// //   "Jul","Aug","Sep","Oct","Nov","Dec"
// // ];

// // const quarters = ["Jan–Mar","Apr–Jun","Jul–Sep","Oct–Dec"];

// // const sampleData = [
// //   {
// //     type: "Income",
// //     name: "Product Sale",
// //     monthly: [0,1200,1387,0,2587,0,0,0,0,0,0,0]
// //   },
// //   {
// //     type: "Income",
// //     name: "Service",
// //     monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]
// //   },
// //   {
// //     type: "Expense",
// //     name: "Rent",
// //     monthly: [0,0,0,0,2587,0,0,0,0,0,0,0]
// //   },
// //   {
// //     type: "Expense",
// //     name: "Salary",
// //     monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]
// //   }
// // ];

// // export default function ProfitLoss(){

// //   const [view,setView] = useState("Quarterly");
// //   const [fromDate,setFromDate] = useState("");
// //   const [toDate,setToDate] = useState("");

// //   const [netProfit,setNetProfit] = useState(0);
// //   const [netLoss,setNetLoss] = useState(0);

// //   const sum = arr => arr.reduce((a,b)=>a+b,0);

// //   const transform = (row)=>{
// //     if(view==="Monthly") return row.monthly;

// //     if(view==="Quarterly"){
// //       return [
// //         sum(row.monthly.slice(0,3)),
// //         sum(row.monthly.slice(3,6)),
// //         sum(row.monthly.slice(6,9)),
// //         sum(row.monthly.slice(9,12))
// //       ];
// //     }

// //     if(view==="Yearly"){
// //       return [sum(row.monthly)];
// //     }
// //   };

// //   const columns = useMemo(()=>{
// //     if(view==="Monthly") return months;
// //     if(view==="Quarterly") return quarters;
// //     return ["Year Total"];
// //   },[view]);

// //   const income = sampleData.filter(d=>d.type==="Income");
// //   const expense = sampleData.filter(d=>d.type==="Expense");

// //   const totalIncome = income.reduce((a,b)=>a+sum(b.monthly),0);
// //   const totalExpense = expense.reduce((a,b)=>a+sum(b.monthly),0);

// //   const calculateNet = ()=>{
// //     const result = totalIncome - totalExpense;
// //     if(result>=0){
// //       setNetProfit(result);
// //       setNetLoss(0);
// //     }else{
// //       setNetProfit(0);
// //       setNetLoss(Math.abs(result));
// //     }
// //   };

// //   const renderTable = (rows,title,label)=>(
// //     <div className="section">
// //       <h2>{title}</h2>
// //       <div className="table-wrap">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>{label}</th>
// //               {columns.map(c=><th key={c}>{c}</th>)}
// //               <th>Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {rows.map((r,i)=>{
// //               const values = transform(r);
// //               return(
// //                 <tr key={i}>
// //                   <td>{r.name}</td>
// //                   {values.map((v,idx)=>(
// //                     <td key={idx} className="amount">₹ {v.toLocaleString()}</td>
// //                   ))}
// //                   <td className="amount strong">₹ {sum(values).toLocaleString()}</td>
// //                 </tr>
// //               )
// //             })}
// //           </tbody>
// //           <tfoot>
// //             <tr>
// //               <td>Total {title}</td>
// //               {columns.map((_,i)=>{
// //                 const colTotal = rows.reduce((a,b)=>a+transform(b)[i],0);
// //                 return <td key={i} className="amount strong">₹ {colTotal.toLocaleString()}</td>
// //               })}
// //               <td className="amount strong">
// //                 ₹ {rows.reduce((a,b)=>a+sum(b.monthly),0).toLocaleString()}
// //               </td>
// //             </tr>
// //           </tfoot>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   return(
// //     <div className="pl-container">

// //       <div className="pl-header">
// //         <div>
// //           <div className="breadcrumb">Reports → Profit & Loss</div>
// //           <h1>Profit & Loss</h1>
// //         </div>
// //         <div className="actions">
// //           <button onClick={()=>window.print()}>Print</button>
// //         </div>
// //       </div>

// //       <div className="filters">
// //         <select value={view} onChange={(e)=>setView(e.target.value)}>
// //           <option>Monthly</option>
// //           <option>Quarterly</option>
// //           <option>Yearly</option>
// //         </select>
// //         <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
// //         <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
// //       </div>

// //       <div className="cards">
// //         <div className="card income">
// //           <h3>Net Income</h3>
// //           <div className="value">₹ {totalIncome.toLocaleString()}</div>
// //         </div>
// //         <div className="card expense">
// //           <h3>Net Expense</h3>
// //           <div className="value">₹ {totalExpense.toLocaleString()}</div>
// //         </div>
// //         <div className="card profit">
// //           <h3>Net Profit</h3>
// //           <div className="value">₹ {netProfit.toLocaleString()}</div>
// //         </div>
// //         <div className="card loss">
// //           <h3>Net Loss</h3>
// //           <div className="value">₹ {netLoss.toLocaleString()}</div>
// //         </div>
// //       </div>

// //       <div className="net-btn">
// //         <button onClick={calculateNet}>
// //           Calculate Net Profit
// //         </button>
// //       </div>

// //       {renderTable(income,"Net Income","Source")}
// //       {renderTable(expense,"Net Expense","Expense")}

// //       <div className="section">
// //         <h2>Net Profit</h2>
// //         <table>
// //           <tbody>
// //             <tr>
// //               <td>Total Income</td>
// //               <td className="amount">₹ {totalIncome.toLocaleString()}</td>
// //             </tr>
// //             <tr>
// //               <td>Total Expense</td>
// //               <td className="amount">₹ {totalExpense.toLocaleString()}</td>
// //             </tr>
// //             <tr>
// //               <td><strong>Net Profit</strong></td>
// //               <td className="amount strong">
// //                 ₹ {(netProfit || netLoss).toLocaleString()}
// //               </td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>

// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import "../styles/ProfitLoss.css";
// import { Calendar, Settings2, ChevronDown, FileText } from "lucide-react";



// const ProfitLoss = () => {
//   const { collapsed } = useOutletContext();

//   const [view, setView] = useState("horizontal");
//   const [configOpen, setConfigOpen] = useState(false);
//   const [type, setType] = useState("both");

//   const [config, setConfig] = useState({
//     showGross: true,
//     showVertical: false,
//     showPercent: true,
//   });

//   // 🔥 EXACT DATA FROM YOUR PDF
//   const expenses = [
//     {
//       group: "Opening Stock",
//       children: [{ name: "Stock", amount: 5000 }],
//     },
//     {
//       group: "Purchase Accounts",
//       children: [{ name: "Purchase @18%", amount: 3000 }],
//     },
//     {
//       group: "Direct Expenses",
//       children: [
//         { name: "Electricity Exp.", amount: 100 },
//         { name: "Freight Charges", amount: 200 },
//         { name: "Wages", amount: 50 },
//       ],
//     },
//   ];

//   const income = [
//     {
//       group: "Sales Accounts",
//       children: [
//         { name: "Sales @10%", amount: 4000 },
//         { name: "Sales @5%", amount: 2500 },
//       ],
//     },
//     {
//       group: "Closing Stock",
//       children: [{ name: "Stock", amount: 8000 }],
//     },
//     {
//       group: "Indirect Income",
//       children: [
//         { name: "Commission Rec.", amount: 400 },
//         { name: "Rent Rec.", amount: 200 },
//         { name: "Discount Rec.", amount: 150 },
//       ],
//     },
//   ];

//   const indirectExpenses = [
//     { name: "Accounting Charges", amount: 200 },
//     { name: "Audit Fee", amount: 100 },
//     { name: "Bank Charges", amount: 50 },
//     { name: "Discount Paid", amount: 100 },
//     { name: "Mobile Exp.", amount: 80 },
//     { name: "Fuel Exp.", amount: 20 },
//     { name: "Salary to Staff", amount: 2000 },
//     { name: "Salary to Partner", amount: 1000 },
//   ];

//   const grossProfit = 4150;
//   const netProfit = 1400;

//   return (
//     <div className={`main ${collapsed ? "collapsed" : ""}`}>

//       {/* HEADER */}
//       <div className="pl-header">
//         <div className="pl-title">
//           <div className="pl-icon">
//             <FileText size={26}/>
//           </div>
//           <div className="pl-heading">
//             <h2>Profit & Loss Account</h2>
//           </div>
//         </div>
//       </div>

//       {/* FILTER */}
//       <div className="pl-filter">
//         <div className="pl-grid">
//           <div className="pl-date">
//               <Calendar size={26} />
//               <input type="date" defaultValue="2024-04-01" />
//               <span>to</span>
//               <input type="date" defaultValue="2025-03-31" />
//             </div>
//           <div className="pl-dropdown">
//             <label>Type</label>

//             <select value={type} onChange={(e) => setType(e.target.value)}>
//               <option value="both">Both (Default)</option>
//               <option value="ledger">Ledgers Only</option>
//               <option value="group">Groups Only</option>
//             </select>
//           </div>
//           {/* FILTER BAR */}
          
//             {/* CONFIGURATION */}
//             <div className="pl-config">

//               <button onClick={() => setConfigOpen(!configOpen)}>
//                 <Settings2 size={16} />
//                 Configuration
//                 <ChevronDown size={16} />
//               </button>

//               {configOpen && (
//                 <div className="pl-config-dropdown">

//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={config.showGross}
//                       onChange={() =>
//                         setConfig({ ...config, showGross: !config.showGross })
//                       }
//                     />
//                     Show Gross Profit
//                   </label>

//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={config.showVertical}
//                       onChange={() =>
//                         setConfig({ ...config, showVertical: !config.showVertical })
//                       }
//                     />
//                     Show Vertical P/L A/c
//                   </label>

//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={config.showPercent}
//                       onChange={() =>
//                         setConfig({ ...config, showPercent: !config.showPercent })
//                       }
//                     />
//                     Show Percentage
//                   </label>
//                 </div>
//               )}
//             </div>
          
//         </div>
//       </div>
//       {/* 🔥 TOGGLE */}
        // <div className="pl-toggle">
        //   <span className={view === "horizontal" ? "active" : ""}>
        //     Horizontal
        //   </span>

        //   <div
        //     className={`pl-switch ${view === "vertical" ? "right" : ""}`}
        //     onClick={() =>
        //       setView((prev) =>
        //         prev === "horizontal" ? "vertical" : "horizontal"
        //       )
        //     }
        //   >
        //     <div className="pl-thumb"></div>
        //   </div>
        //   <span className={view === "vertical" ? "active" : ""}>
        //     Vertical
        //   </span>
        // </div>
//       {/* 🔥 HORIZONTAL TABLE */}
//       {view === "horizontal" && (
//         <div className="pl-table-wrapper">
//           <table className="pl-table">
//             <thead>
//               <tr>
//                 <th>Particulars</th>
//                 {config.showPercent && <th>%</th>}
//                 <th>Amount</th>
//                 <th className="divider"></th>
//                 <th>Particulars</th>
//                 {config.showPercent && <th>%</th>}
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* LEFT SIDE (EXPENSES) */}
//               <tr>
//                 <td className="group">Opening Stock</td>
//                 {config.showPercent && <td></td>}
//                 <td>5000</td>
//                 <td className="divider"></td>
//                 {/* RIGHT SIDE */}
//                 <td className="group">Sales Account</td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//               </tr>
//               <tr>
//                 <td className="child">Stock 5000</td>
//                 {config.showPercent && <td>100%</td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td className="child">Sales @10%</td>
//                 {config.showPercent && <td></td>}
//                 <td>4000</td>
//               </tr>
//               <tr>
//                 <td></td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td className="child">Sales @5%</td>
//                 {config.showPercent && <td></td>}
//                 <td>2500</td>
//               </tr>
//               {/* PURCHASE */}
//               <tr>
//                 <td className="group">Purchase Accounts</td>
//                 {config.showPercent && <td></td>}
//                 <td>5000</td>
//                 <td className="divider"></td>
//                 <td className="group">Closing Stock</td>
//                 {config.showPercent && <td></td>}
//                 <td>8000</td>
//               </tr>
//               <tr>
//                 <td className="child">Purchase @18%  3000</td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td className="child">Stock</td>
//                 {config.showPercent && <td></td>}
//                 <td>8000</td>
//               </tr>
//               <tr>
//                 <td className="child">Purchase @5%  2000</td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td></td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//               </tr>
//               {/* DIRECT EXP */}
//               <tr>
//                 <td className="group">Direct Expenses</td>
//                 {config.showPercent && <td></td>}
//                 <td>350</td>
//                 <td className="divider"></td>
//                 <td></td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//               </tr>
//               <tr>
//                 <td className="child">Electricity  100</td>
//                 {config.showPercent && <td></td>}
//                 <td> </td>
//                 <td className="divider"></td>
//                 <td></td><td></td><td></td>
//               </tr>
//               <tr>
//                 <td className="child">Freight 200</td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td></td><td></td><td></td>
//               </tr>
//               <tr>
//                 <td className="child">Wages 50</td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//                 <td className="divider"></td>
//                 <td></td><td></td><td></td>
//               </tr>

//               {/* GROSS PROFIT */}
//               {config.showGross && (
//                 <tr className="highlight">
//                   <td>Gross Profit c/d</td>
//                   {config.showPercent && <td></td>}
//                   <td>4150</td>

//                   <td className="divider"></td>

//                   <td>Gross Profit b/d</td>
//                   {config.showPercent && <td></td>}
//                   <td>4150</td>
//                 </tr>
//               )}

//               {/* INDIRECT */}
//               <tr>
//                 <td className="group">Indirect Expenses</td>
//                 {config.showPercent && <td></td>}
//                 <td>3500</td>

//                 <td className="divider"></td>

//                 <td className="group">Indirect Income</td>
//                 {config.showPercent && <td></td>}
//                 <td>750</td>
//               </tr>

//               <tr>
//                 <td className="child">Accounting</td>
//                 {config.showPercent && <td></td>}
//                 <td>200</td>

//                 <td className="divider"></td>

//                 <td className="child">Commission</td>
//                 {config.showPercent && <td></td>}
//                 <td>400</td>
//               </tr>

//               <tr>
//                 <td className="child">Audit</td>
//                 {config.showPercent && <td></td>}
//                 <td>100</td>

//                 <td className="divider"></td>

//                 <td className="child">Rent</td>
//                 {config.showPercent && <td></td>}
//                 <td>200</td>
//               </tr>

//               <tr>
//                 <td className="child">Bank</td>
//                 {config.showPercent && <td></td>}
//                 <td>50</td>

//                 <td className="divider"></td>

//                 <td className="child">Discount</td>
//                 {config.showPercent && <td></td>}
//                 <td>150</td>
//               </tr>

//               {/* NET */}
//               <tr className="total">
//                 <td>Net Profit</td>
//                 {config.showPercent && <td></td>}
//                 <td>1400</td>

//                 <td className="divider"></td>

//                 <td></td>
//                 {config.showPercent && <td></td>}
//                 <td></td>
//               </tr>

//             </tbody>
//           </table>

//         </div>
//       )}
//       {/* 🔥 VERTICAL FORMAT */}
//       {(view === "vertical" || config.showVertical) && (
//         <div className="pl-vertical-wrapper">

//           {/* TRADING ACCOUNT */}
//           <div className="pl-vertical-section">
//             <h3>TRADING ACCOUNT</h3>

//             <table className="pl-vertical-table">
//               <thead>
//                 <tr>
//                   <th>Particulars</th>
//                   <th>Amount</th>
//                   {config.showPercent && <th>%</th>}
//                 </tr>
//               </thead>

//               <tbody>

//                 {/* SALES */}
//                 <tr className="group">
//                   <td>Sales Account</td>
//                   <td>6500</td>
//                   {config.showPercent && <td>100%</td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Sales @10%</td>
//                   <td>4000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Sales @5%</td>
//                   <td>2500</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 {/* COST OF SALES */}
//                 <tr className="group">
//                   <td>Cost of Sales</td>
//                   <td>2000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Opening Stock</td>
//                   <td>5000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Add: Purchase Account</td>
//                   <td>5000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child indent">
//                   <td>Less: Closing Stock</td>
//                   <td>(8000)</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 {/* DIRECT EXPENSE */}
//                 <tr className="group">
//                   <td>Direct Expenses</td>
//                   <td>350</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Electricity Exp.</td>
//                   <td>100</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Freight Charges</td>
//                   <td>200</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Wages</td>
//                   <td>50</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 {/* GROSS PROFIT */}
//                 {config.showGross && (
//                   <tr className="highlight">
//                     <td>Gross Profit</td>
//                     <td>4150</td>
//                     {config.showPercent && <td></td>}
//                   </tr>
//                 )}

//               </tbody>
//             </table>
//           </div>


//           {/* INCOME STATEMENT */}
//           <div className="pl-vertical-section">

//             <h3>INCOME STATEMENT</h3>

//             <table className="pl-vertical-table">

//               <thead>
//                 <tr>
//                   <th>Particulars</th>
//                   <th>Amount</th>
//                   {config.showPercent && <th>%</th>}
//                 </tr>
//               </thead>

//               <tbody>

//                 {/* INDIRECT INCOME */}
//                 <tr className="group">
//                   <td>Indirect Income</td>
//                   <td>750</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Commission Rec.</td>
//                   <td>400</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Rent Rec.</td>
//                   <td>200</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Discount Rec.</td>
//                   <td>150</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 {/* INDIRECT EXPENSE */}
//                 <tr className="group">
//                   <td>Indirect Expenses</td>
//                   <td>3500</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Accounting Charges</td>
//                   <td>200</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Audit Fee</td>
//                   <td>100</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Bank Charges</td>
//                   <td>50</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Discount Paid</td>
//                   <td>100</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Mobile Exp.</td>
//                   <td>80</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Fuel Exp.</td>
//                   <td>20</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Salary to Staff</td>
//                   <td>2000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 <tr className="child">
//                   <td>Salary to Partner</td>
//                   <td>1000</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//                 {/* NET PROFIT */}
//                 <tr className="total">
//                   <td>Net Income Before Tax</td>
//                   <td>1400</td>
//                   {config.showPercent && <td></td>}
//                 </tr>

//               </tbody>
//             </table>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default ProfitLoss;

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/ProfitLoss.css";
import { Calendar, Settings2, ChevronDown, FileText } from "lucide-react";

const ProfitLoss = () => {
  const { collapsed } = useOutletContext();

  const [view, setView] = useState("horizontal");
  const [configOpen, setConfigOpen] = useState(false);
  const [type, setType] = useState("both");
  const [data, setData] = useState(null);

  const [config, setConfig] = useState({
    showGross: true,
    showVertical: false,
    showPercent: true,
  });

  // ✅ BACKEND READY DATA STRUCTURE
  const expenses = [
    {
      group: "Opening Stock",
      total: 5000,
      children: [{ name: "Stock", amount: 5000, percent: 100 }],
    },
    {
      group: "Purchase Accounts",
      total: 5000,
      children: [
        { name: "Purchase @18%", amount: 3000 },
        { name: "Purchase @5%", amount: 2000 },
      ],
    },
    {
      group: "Direct Expenses",
      total: 350,
      children: [
        { name: "Electricity", amount: 100 },
        { name: "Freight", amount: 200 },
        { name: "Wages", amount: 50 },
      ],
    },
  ];

  const income = [
    {
      group: "Sales Accounts",
      total: 6500,
      children: [
        { name: "Sales @10%", amount: 4000 },
        { name: "Sales @5%", amount: 2500 },
      ],
    },
    {
      group: "Closing Stock",
      total: 8000,
      children: [{ name: "Stock", amount: 8000 }],
    },
    {
      group: "Indirect Income",
      total: 750,
      children: [
        { name: "Commission", amount: 400 },
        { name: "Rent", amount: 200 },
        { name: "Discount", amount: 150 },
      ],
    },
  ];

  const indirectExpenses = [
    {
      group: "Indirect Expenses",
      total: 3500,
      children: [
        { name: "Accounting", amount: 200 },
        { name: "Audit", amount: 100 },
        { name: "Bank", amount: 50 },
        { name: "Discount Paid", amount: 100 },
        { name: "Mobile", amount: 80 },
        { name: "Fuel", amount: 20 },
        { name: "Salary Staff", amount: 2000 },
        { name: "Salary Partner", amount: 1000 },
      ],
    },
  ];

  // 🔹 GENERATE ROWS
  const generateRows = (data) => {
    const rows = [];
    data.forEach((g) => {
      rows.push({ type: "group", name: g.group, amount: g.total });

      g.children.forEach((c) => {
        rows.push({
          type: "child",
          name: `${c.name} ${c.amount}`,
          percent: c.percent || "",
        });
      });
    });
    return rows;
  };

  useEffect(() => {
  setData({
    trading: {
      sales: {
        total: 6500,
        items: [
          { name: "Sales @10%", amount: 4000 },
          { name: "Sales @5%", amount: 2500 }
        ]
      },
      cost_of_sales: {
        total: 2000,
        items: [
          { name: "Opening Stock", amount: 5000 },
          { name: "Purchase", amount: 5000 },
          { name: "Closing Stock", amount: 8000, type: "minus" }
        ]
      },
      direct_expenses: {
        total: 350,
        items: [
          { name: "Electricity", amount: 100 },
          { name: "Freight", amount: 200 },
          { name: "Wages", amount: 50 }
        ]
      }
    },
    income_statement: {
      indirect_income: {
        total: 750,
        items: [
          { name: "Commission", amount: 400 },
          { name: "Rent", amount: 200 },
          { name: "Discount", amount: 150 }
        ]
      },
      indirect_expenses: {
        total: 3500,
        items: indirectExpenses[0].children
      }
    },
    gross_profit: grossProfit,
    net_profit: netProfit
  });
}, []);
const renderGroup = (title, groupData) => {
  if (!groupData) return null;

  return (
    <>
      <tr className="group">
        <td>{title}</td>
        <td></td>
        <td className="amount">{groupData.total}</td>
        {config.showPercent && <td></td>}
      </tr>

      {groupData.items.map((item, i) => (
        <tr className="child" key={i}>
          <td>- {item.name}</td>
          <td className="inner">
            {item.type === "minus"
              ? `(${item.amount})`
              : item.amount}
          </td>
          <td></td>
          {config.showPercent && <td></td>}
        </tr>
      ))}
    </>
  );
};
  const syncRows = (left, right) => {
    const max = Math.max(left.length, right.length);
    const l = [...left];
    const r = [...right];

    while (l.length < max) l.push({});
    while (r.length < max) r.push({});

    return l.map((_, i) => ({ left: l[i], right: r[i] }));
  };

  // 🔹 SPLIT DATA
  const tradingExpenses = expenses;
  const tradingIncome = income.slice(0, 2);

  const indirectIncome = [income[2]];

  // 🔹 GENERATE
  const leftTrading = generateRows(tradingExpenses);
  const rightTrading = generateRows(tradingIncome);

  const leftIndirect = generateRows(indirectExpenses);
  const rightIndirect = generateRows(indirectIncome);

  const tradingRows = syncRows(leftTrading, rightTrading);
  const indirectRows = syncRows(leftIndirect, rightIndirect);

  // 🔹 CALCULATIONS
  const sum = (arr) => arr.reduce((a, b) => a + (b.total || 0), 0);

  const tradingLeftTotal = sum(tradingExpenses);
  const tradingRightTotal = sum(tradingIncome);

  const grossProfit = Math.abs(tradingRightTotal - tradingLeftTotal);

  const indirectLeftTotal = sum(indirectExpenses);
  const indirectRightTotal = sum(indirectIncome);

  const netProfit = Math.abs(
    tradingRightTotal +
      indirectRightTotal -
      (tradingLeftTotal + indirectLeftTotal)
  );

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      {/* HEADER */}
      <div className="pl-header">
        <div className="pl-title">
          <FileText size={26} />
          <h2>Profit & Loss Report</h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="pl-filter">
        <div className="pl-grid">
          <div className="pl-date">
            <Calendar size={20} />
            <input type="date" defaultValue="2024-04-01" />
            <span>to</span>
            <input type="date" defaultValue="2025-03-31" />
          </div>

          <div>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="both">Both</option>
              <option value="ledger">Ledger</option>
              <option value="group">Group</option>
            </select>
          </div>

          <div className="pl-config">
            <label>Configuration</label>
            <button onClick={() => setConfigOpen(!configOpen)}>
              <Settings2 size={16} /> Select Configuration <ChevronDown size={16} />
            </button>

            {configOpen && (
              <div className="pl-config-dropdown">
                <label>
                  <input
                    type="checkbox"
                    checked={config.showGross}
                    onChange={() =>
                      setConfig({ ...config, showGross: !config.showGross })
                    }
                  />
                  Show Gross Profit
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.showPercent}
                    onChange={() =>
                      setConfig({
                        ...config,
                        showPercent: !config.showPercent,
                      })
                    }
                  />
                  Show Percentage
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
        <div className="pl-toggle">
          <span className={view === "horizontal" ? "active" : ""}>
            Horizontal
          </span>

          <div
            className={`pl-switch ${view === "vertical" ? "right" : ""}`}
            onClick={() =>
              setView((prev) =>
                prev === "horizontal" ? "vertical" : "horizontal"
              )
            }
          >
            <div className="pl-thumb"></div>
          </div>
          <span className={view === "vertical" ? "active" : ""}>
            Vertical
          </span>
        </div>

      {/* 🔥 CONDITIONAL RENDER */}
       {view === "horizontal" && !config.showVertical && (
          <div className="pl-table-wrapper">
            <table className="pl-table">
              <thead>
                <tr>
                  <th>PARTICULARS</th>
                  {config.showPercent && <th>%</th>}
                  <th>AMOUNT</th>
                  <th className="divider"></th>
                  <th>PARTICULARS</th>
                  {config.showPercent && <th>%</th>}
                  <th>AMOUNT</th>
                </tr>
              </thead>

              <tbody>
                {/* TRADING */}
                {tradingRows.map((row, i) => (
                  <tr key={i}>
                    <td className={row.left.type}>{row.left.name || ""}</td>
                    {config.showPercent && <td>{row.left.percent || ""}</td>}
                    <td className="amount">
                      {row.left.type === "group" ? row.left.amount : ""}
                    </td>

                    <td className="divider"></td>

                    <td className={row.right.type}>{row.right.name || ""}</td>
                    {config.showPercent && <td>{row.right.percent || ""}</td>}
                    <td className="amount">
                      {row.right.type === "group" ? row.right.amount : ""}
                    </td>
                  </tr>
                ))}

                {/* GROSS */}
                {config.showGross && (
                  <tr className="highlight">
                    <td>Gross Profit c/d</td>
                    {config.showPercent && <td></td>}
                    <td>{tradingLeftTotal < tradingRightTotal ? grossProfit : ""}</td>

                    <td className="divider"></td>

                    <td>Gross Profit b/d</td>
                    {config.showPercent && <td></td>}
                    <td>{tradingRightTotal > tradingLeftTotal ? grossProfit : ""}</td>
                  </tr>
                )}

                {/* INDIRECT */}
                {indirectRows.map((row, i) => (
                  <tr key={i}>
                    <td className={row.left.type}>{row.left.name || ""}</td>
                    {config.showPercent && <td>{row.left.percent || ""}</td>}
                    <td className="amount">
                      {row.left.type === "group" ? row.left.amount : ""}
                    </td>

                    <td className="divider"></td>

                    <td className={row.right.type}>{row.right.name || ""}</td>
                    {config.showPercent && <td>{row.right.percent || ""}</td>}
                    <td className="amount">
                      {row.right.type === "group" ? row.right.amount : ""}
                    </td>
                  </tr>
                ))}

                {/* NET */}
                <tr className="total">
                  <td>Net Profit</td>
                  {config.showPercent && <td></td>}
                  <td>{netProfit}</td>

                  <td className="divider"></td>
                  <td></td>
                  {config.showPercent && <td></td>}
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/* 🔥 FINAL VERTICAL RENDER */}
        {(view === "vertical" || config.showVertical) && data && (
          <div className="pl-vertical">
            <table className="pl-vertical-table">
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th></th>
                  <th>Amount</th>
                  {config.showPercent && <th>%</th>}
                </tr>
              </thead>
              <tbody>
                {/* 🔴 TRADING ACCOUNT */}
                <tr className="section">
                  <td colSpan={config.showPercent ? 4 : 3}>
                    TRADING ACCOUNT
                  </td>
                </tr>
                {renderGroup("Sales Accounts", data.trading.sales)}
                {renderGroup("Cost of Sales", data.trading.cost_of_sales)}
                {renderGroup("Direct Expenses", data.trading.direct_expenses)}
                {config.showGross && (
                  <tr className="highlight">
                    <td>Gross Profit</td>
                    <td></td>
                    <td className="amount">{data.gross_profit}</td>
                    {config.showPercent && <td></td>}
                  </tr>
                )}
                {/* 🔴 INCOME STATEMENT */}
                <tr className="section">
                  <td colSpan={config.showPercent ? 4 : 3}>
                    INCOME STATEMENT
                  </td>
                </tr>
                {renderGroup(
                  "Indirect Income",
                  data.income_statement.indirect_income
                )}

                {renderGroup(
                  "Indirect Expenses",
                  data.income_statement.indirect_expenses
                )}

                {/* NET */}
                <tr className="total">
                  <td>Net Income Before Tax</td>
                  <td></td>
                  <td className="amount">{data.net_profit}</td>
                  {config.showPercent && <td></td>}
                </tr>

              </tbody>
            </table>
          </div>
        )}
    </div>
  
  );
};

export default ProfitLoss;