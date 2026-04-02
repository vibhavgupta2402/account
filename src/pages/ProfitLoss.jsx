import { useOutletContext } from "react-router-dom";
import React, { useState, useMemo } from "react";
// import "./ProfitLoss.css";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const quarters = ["Jan–Mar","Apr–Jun","Jul–Sep","Oct–Dec"];

const sampleData = [
  { type: "Income", name: "Product Sale", monthly: [0,1200,1387,0,2587,0,0,0,0,0,0,0]},
  { type: "Income", name: "Service", monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]},
  { type: "Expense", name: "Rent", monthly: [0,0,0,0,2587,0,0,0,0,0,0,0]},
  { type: "Expense", name: "Salary", monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]}
];

export default function ProfitLoss() {
  const { collapsed } = useOutletContext();
  const [view,setView] = useState("Quarterly");

  const sum = arr => arr.reduce((a,b)=>a+b,0);

  const getValues = (monthly)=>{
    if(view==="Monthly") return monthly;

    if(view==="Quarterly"){
      return [
        sum(monthly.slice(0,3)),
        sum(monthly.slice(3,6)),
        sum(monthly.slice(6,9)),
        sum(monthly.slice(9,12))
      ];
    }

    return [sum(monthly)];
  };

  const columns = useMemo(()=>{
    if(view==="Monthly") return months;
    if(view==="Quarterly") return quarters;
    return ["Year Total"];
  },[view]);

  const incomeRows = sampleData.filter(d=>d.type==="Income");
  const expenseRows = sampleData.filter(d=>d.type==="Expense");

  const totalIncome = incomeRows.reduce((a,b)=>a+sum(b.monthly),0);
  const totalExpense = expenseRows.reduce((a,b)=>a+sum(b.monthly),0);
  const netResult = totalIncome - totalExpense;

  const renderSimpleTable = (rows,title,label)=>{

    const tableData = rows.map(r=>{
      const values = getValues(r.monthly);
      return {
        name: r.name,
        values,
        total: sum(values)
      };
    });

    const columnTotals = columns.map((_,colIndex)=>{
      return tableData.reduce((a,b)=>a + (b.values[colIndex] || 0),0);
    });

    const grandTotal = tableData.reduce((a,b)=>a + b.total,0);

    return (
      <div className="pl-table-section">
        <h2>{title}</h2>

        <table className="pl-table">
          <thead>
            <tr>
              <th>{label}</th>
              {columns.map((col,i)=>(
                <th key={i}>{col}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row,i)=>(
              <tr key={i}>
                <td className="left">{row.name}</td>
                {row.values.map((val,idx)=>(
                  <td key={idx}>₹ {val.toLocaleString()}</td>
                ))}
                <td className="strong">₹ {row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td className="strong">Total {title}</td>
              {columnTotals.map((val,i)=>(
                <td key={i} className="strong">
                  ₹ {val.toLocaleString()}
                </td>
              ))}
              <td className="strong">
                ₹ {grandTotal.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="pl-container">

        <div className="pl-header">
          <h1>Profit & Loss</h1>

          <select
            value={view}
            onChange={(e)=>setView(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        <div className="pl-summary">
          <div className="card income">
            <p>Total Income</p>
            <h3>₹ {totalIncome.toLocaleString()}</h3>
          </div>

          <div className="card expense">
            <p>Total Expense</p>
            <h3>₹ {totalExpense.toLocaleString()}</h3>
          </div>

          <div className={`card ${netResult>=0 ? "profit" : "loss"}`}>
            <p>{netResult>=0 ? "Net Profit" : "Net Loss"}</p>
            <h3>₹ {Math.abs(netResult).toLocaleString()}</h3>
          </div>
        </div>

        {renderSimpleTable(incomeRows,"Income","Source")}
        {renderSimpleTable(expenseRows,"Expense","Expense Type")}

      </div>
    </div>
  );
}








// import React, { useState, useMemo } from "react";


// const months = [
//   "Jan","Feb","Mar","Apr","May","Jun",
//   "Jul","Aug","Sep","Oct","Nov","Dec"
// ];

// const quarters = ["Jan–Mar","Apr–Jun","Jul–Sep","Oct–Dec"];

// const sampleData = [
//   {
//     type: "Income",
//     name: "Product Sale",
//     monthly: [0,1200,1387,0,2587,0,0,0,0,0,0,0]
//   },
//   {
//     type: "Income",
//     name: "Service",
//     monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]
//   },
//   {
//     type: "Expense",
//     name: "Rent",
//     monthly: [0,0,0,0,2587,0,0,0,0,0,0,0]
//   },
//   {
//     type: "Expense",
//     name: "Salary",
//     monthly: [0,0,0,0,1500,0,0,0,0,0,0,0]
//   }
// ];

// export default function ProfitLoss(){

//   const [view,setView] = useState("Quarterly");
//   const [fromDate,setFromDate] = useState("");
//   const [toDate,setToDate] = useState("");

//   const [netProfit,setNetProfit] = useState(0);
//   const [netLoss,setNetLoss] = useState(0);

//   const sum = arr => arr.reduce((a,b)=>a+b,0);

//   const transform = (row)=>{
//     if(view==="Monthly") return row.monthly;

//     if(view==="Quarterly"){
//       return [
//         sum(row.monthly.slice(0,3)),
//         sum(row.monthly.slice(3,6)),
//         sum(row.monthly.slice(6,9)),
//         sum(row.monthly.slice(9,12))
//       ];
//     }

//     if(view==="Yearly"){
//       return [sum(row.monthly)];
//     }
//   };

//   const columns = useMemo(()=>{
//     if(view==="Monthly") return months;
//     if(view==="Quarterly") return quarters;
//     return ["Year Total"];
//   },[view]);

//   const income = sampleData.filter(d=>d.type==="Income");
//   const expense = sampleData.filter(d=>d.type==="Expense");

//   const totalIncome = income.reduce((a,b)=>a+sum(b.monthly),0);
//   const totalExpense = expense.reduce((a,b)=>a+sum(b.monthly),0);

//   const calculateNet = ()=>{
//     const result = totalIncome - totalExpense;
//     if(result>=0){
//       setNetProfit(result);
//       setNetLoss(0);
//     }else{
//       setNetProfit(0);
//       setNetLoss(Math.abs(result));
//     }
//   };

//   const renderTable = (rows,title,label)=>(
//     <div className="section">
//       <h2>{title}</h2>
//       <div className="table-wrap">
//         <table>
//           <thead>
//             <tr>
//               <th>{label}</th>
//               {columns.map(c=><th key={c}>{c}</th>)}
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r,i)=>{
//               const values = transform(r);
//               return(
//                 <tr key={i}>
//                   <td>{r.name}</td>
//                   {values.map((v,idx)=>(
//                     <td key={idx} className="amount">₹ {v.toLocaleString()}</td>
//                   ))}
//                   <td className="amount strong">₹ {sum(values).toLocaleString()}</td>
//                 </tr>
//               )
//             })}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td>Total {title}</td>
//               {columns.map((_,i)=>{
//                 const colTotal = rows.reduce((a,b)=>a+transform(b)[i],0);
//                 return <td key={i} className="amount strong">₹ {colTotal.toLocaleString()}</td>
//               })}
//               <td className="amount strong">
//                 ₹ {rows.reduce((a,b)=>a+sum(b.monthly),0).toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );

//   return(
//     <div className="pl-container">

//       <div className="pl-header">
//         <div>
//           <div className="breadcrumb">Reports → Profit & Loss</div>
//           <h1>Profit & Loss</h1>
//         </div>
//         <div className="actions">
//           <button onClick={()=>window.print()}>Print</button>
//         </div>
//       </div>

//       <div className="filters">
//         <select value={view} onChange={(e)=>setView(e.target.value)}>
//           <option>Monthly</option>
//           <option>Quarterly</option>
//           <option>Yearly</option>
//         </select>
//         <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
//         <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
//       </div>

//       <div className="cards">
//         <div className="card income">
//           <h3>Net Income</h3>
//           <div className="value">₹ {totalIncome.toLocaleString()}</div>
//         </div>
//         <div className="card expense">
//           <h3>Net Expense</h3>
//           <div className="value">₹ {totalExpense.toLocaleString()}</div>
//         </div>
//         <div className="card profit">
//           <h3>Net Profit</h3>
//           <div className="value">₹ {netProfit.toLocaleString()}</div>
//         </div>
//         <div className="card loss">
//           <h3>Net Loss</h3>
//           <div className="value">₹ {netLoss.toLocaleString()}</div>
//         </div>
//       </div>

//       <div className="net-btn">
//         <button onClick={calculateNet}>
//           Calculate Net Profit
//         </button>
//       </div>

//       {renderTable(income,"Net Income","Source")}
//       {renderTable(expense,"Net Expense","Expense")}

//       <div className="section">
//         <h2>Net Profit</h2>
//         <table>
//           <tbody>
//             <tr>
//               <td>Total Income</td>
//               <td className="amount">₹ {totalIncome.toLocaleString()}</td>
//             </tr>
//             <tr>
//               <td>Total Expense</td>
//               <td className="amount">₹ {totalExpense.toLocaleString()}</td>
//             </tr>
//             <tr>
//               <td><strong>Net Profit</strong></td>
//               <td className="amount strong">
//                 ₹ {(netProfit || netLoss).toLocaleString()}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }