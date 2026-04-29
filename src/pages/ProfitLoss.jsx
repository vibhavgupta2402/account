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


import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/ProfitLoss.css";

const ProfitLoss = () => {
  const { collapsed } = useOutletContext();

  const [view, setView] = useState("horizontal");
  const [configOpen, setConfigOpen] = useState(false);

  const [config, setConfig] = useState({
    showGross: true,
    showVertical: false,
    showPercent: true,
  });

  // 🔥 PROPER STRUCTURE (from your PDF)
  const data = {
    left: [
      {
        group: "Opening Stock",
        children: [{ name: "Stock", amount: 5000 }],
      },
      {
        group: "Purchase Accounts",
        children: [{ name: "Purchase @18%", amount: 3000 }],
      },
      {
        group: "Direct Expenses",
        children: [
          { name: "Electricity Exp.", amount: 100 },
          { name: "Freight Charges", amount: 200 },
          { name: "Wages", amount: 50 },
        ],
      },
    ],
    right: [
      {
        group: "Sales Accounts",
        children: [
          { name: "Sales @10%", amount: 4000 },
          { name: "Sales @5%", amount: 2500 },
        ],
      },
      {
        group: "Closing Stock",
        children: [{ name: "Stock", amount: 8000 }],
      },
      {
        group: "Indirect Income",
        children: [
          { name: "Commission Rec.", amount: 400 },
          { name: "Rent Rec.", amount: 200 },
          { name: "Discount Rec.", amount: 150 },
        ],
      },
    ],
    indirectExpenses: [
      { name: "Accounting Charges", amount: 200 },
      { name: "Audit Fee", amount: 100 },
      { name: "Bank Charges", amount: 50 },
      { name: "Discount Paid", amount: 100 },
      { name: "Mobile Exp.", amount: 80 },
      { name: "Fuel Exp.", amount: 20 },
      { name: "Salary to Staff", amount: 2000 },
      { name: "Salary to Partner", amount: 1000 },
    ],
  };

  const grossProfit = 4150;
  const netProfit = 1400;

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="pl-header">
        <h2>Profit & Loss Account</h2>
        <p>(01-04-2024 to 31-03-2025)</p>
      </div>

      {/* FILTER + CONFIG */}
      <div className="pl-filter-card">

        <div className="pl-left">
          <input type="date" />
          <span>to</span>
          <input type="date" />
        </div>

        <div className="pl-right">

          <select>
            <option>Both (Default)</option>
            <option>Ledger Only</option>
            <option>Group Only</option>
          </select>

          {/* CONFIG DROPDOWN */}
          <div className="pl-config">
            <button onClick={() => setConfigOpen(!configOpen)}>
              Configuration ⚙
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
                    checked={config.showVertical}
                    onChange={() =>
                      setConfig({ ...config, showVertical: !config.showVertical })
                    }
                  />
                  Show Vertical P/L A/c
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={config.showPercent}
                    onChange={() =>
                      setConfig({ ...config, showPercent: !config.showPercent })
                    }
                  />
                  Show Percentage
                </label>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 🔥 HORIZONTAL TABLE */}
      {!config.showVertical && (
        <div className="pl-table">

          <div className="pl-col">
            <h4>Expenses</h4>

            {data.left.map((grp, i) => (
              <div key={i}>
                <b>{grp.group}</b>
                {grp.children.map((c, j) => (
                  <div key={j} className="pl-child">
                    {c.name} - ₹ {c.amount}
                  </div>
                ))}
              </div>
            ))}

            <div className="pl-highlight">
              Gross Profit c/d: ₹ {grossProfit}
            </div>

            <div className="pl-section">
              <b>Indirect Expenses</b>
              {data.indirectExpenses.map((e, i) => (
                <div key={i} className="pl-child">
                  {e.name} - ₹ {e.amount}
                </div>
              ))}
            </div>

            <div className="pl-total">Net Profit: ₹ {netProfit}</div>
          </div>

          <div className="pl-col">
            <h4>Income</h4>

            {data.right.map((grp, i) => (
              <div key={i}>
                <b>{grp.group}</b>
                {grp.children.map((c, j) => (
                  <div key={j} className="pl-child">
                    {c.name} - ₹ {c.amount}
                  </div>
                ))}
              </div>
            ))}

            <div className="pl-highlight">
              Gross Profit b/d: ₹ {grossProfit}
            </div>
          </div>

        </div>
      )}

      {/* 🔥 VERTICAL VIEW */}
      {config.showVertical && (
        <div className="pl-vertical">

          <h4>Trading Account</h4>
          <div>Sales: ₹ 6500</div>
          <div>Cost of Sales: ₹ 2000</div>
          <div>Direct Expenses: ₹ 350</div>

          <div className="pl-highlight">
            Gross Profit: ₹ {grossProfit}
          </div>

          <h4>Income Statement</h4>
          <div>Indirect Income: ₹ 750</div>
          <div>Indirect Expenses: ₹ 3500</div>

          <div className="pl-total">
            Net Income Before Tax: ₹ {netProfit}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfitLoss;