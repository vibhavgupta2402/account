// // // import { useEffect, useRef } from "react";
// // // import { useOutletContext } from "react-router-dom";
// // // import "../styles/dashboard.css";

// // // export default function Dashboard() {
// // //     const { collapsed } = useOutletContext();
// // //     const donutRef = useRef(null);
// // //     const lineRef = useRef(null);

// // //     useEffect(() => {
// // //         let donutChart, lineChart;

// // //         donutChart = new window.Chart(donutRef.current, {
// // //             type: "doughnut",
// // //             data: {
// // //                 labels: ["income", "expense", "profit"],
// // //                 datasets: [{
// // //                     data: [45, 20, 12],
// // //                     backgroundColor: ["#34d399", "#fb923c", "#60a5fa"]
// // //                 }]
// // //             },
// // //             options: {
// // //                 cutout: "70%",
// // //                 plugins: { legend: { position: "bottom" } }
// // //             }
// // //         });

// // //         const data = {
// // //             months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
// // //             income: [120, 140, 160, 180, 210, 240, 260, 250, 270, 290, 310, 340],
// // //             expense: [80, 90, 110, 120, 130, 150, 165, 170, 175, 185, 195, 210],
// // //             profit: [40, 50, 50, 60, 80, 90, 95, 80, 95, 105, 115, 130]
// // //         };

// // //         const kIncome = document.getElementById("kIncome");
// // //         const kExpense = document.getElementById("kExpense");
// // //         const kProfit = document.getElementById("kProfit");

// // //         lineChart = new window.Chart(lineRef.current, {
// // //             type: "line",
// // //             data: {
// // //                 labels: data.months,
// // //                 datasets: [
// // //                     { label: "Income", data: data.income, borderColor: "#34d399", tension: .5, pointRadius: 0, borderWidth: 3 },
// // //                     { label: "Expense", data: data.expense, borderColor: "#fb923c", tension: .5, pointRadius: 0, borderWidth: 3 },
// // //                     { label: "Profit", data: data.profit, borderColor: "#60a5fa", tension: .5, pointRadius: 0, borderWidth: 3 }
// // //                 ]
// // //             },
// // //             options: {
// // //                 interaction: { mode: "index", intersect: false },
// // //                 plugins: {
// // //                     legend: { display: false },
// // //                     tooltip: {
// // //                         callbacks: {
// // //                             label(ctx) {
// // //                                 if (kIncome && kExpense && kProfit) {
// // //                                     kIncome.textContent = `₹ ${data.income[ctx.dataIndex]}k`;
// // //                                     kExpense.textContent = `₹ ${data.expense[ctx.dataIndex]}k`;
// // //                                     kProfit.textContent = `₹ ${data.profit[ctx.dataIndex]}k`;
// // //                                 }
// // //                                 return `${ctx.dataset.label}: ₹ ${ctx.parsed.y}k`;
// // //                             },
// // //                         },
// // //                     },
// // //                 },
// // //                 scales: { x: { grid: { display: false } }, y: { display: false } }
// // //             }
// // //         });

// // //         document.querySelectorAll(".legend-item").forEach(i => {
// // //             i.onclick = () => {
// // //                 const d = lineChart.data.datasets[i.dataset.index];
// // //                 i.classList.toggle("inactive");
// // //                 d.hidden = i.classList.contains("inactive");
// // //                 lineChart.update();
// // //             };
// // //         });

// // //         return () => {
// // //             donutChart.destroy();
// // //             lineChart.destroy();
// // //         };
// // //     }, []);

// // //     return (
// // //         <div className={`main ${collapsed ? "collapsed" : ""}`} id="main">
// // //             {/* 🔹 COPY SUMMARY, GRID & REPORTS HTML HERE EXACTLY */}
// // //             {/* Replace canvases with refs */}
// // //             <canvas ref={lineRef} id="financeChart"></canvas>
// // //             <canvas ref={donutRef} id="donutChart"></canvas>
// // //         </div>
// // //     );
// // // }





// // import { useOutletContext } from "react-router-dom";
// // import React, { useEffect, useRef, useState } from "react";

// // import {
// //   Chart as ChartJS,
// //   LineElement,
// //   ArcElement,
// //   PointElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend
// // } from "chart.js";
// // import { Line, Doughnut } from "react-chartjs-2";

// // ChartJS.register(
// //   LineElement,
// //   ArcElement,
// //   PointElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend
// // );

// // export default function Dashboard() {
// //   const { collapsed } = useOutletContext();
// //   const [setCollapsed] = useState(false);
// //   const [openMenu, setOpenMenu] = useState(null);

// //   const [kpi, setKpi] = useState({
// //     income: "–",
// //     expense: "–",
// //     profit: "–"
// //   });

// //   const chartRef = useRef(null);

// //   const data2024 = {
// //     months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
// //     income: [120, 140, 160, 180, 210, 240, 260, 250, 270, 290, 310, 340],
// //     expense: [80, 90, 110, 120, 130, 150, 165, 170, 175, 185, 195, 210],
// //     profit: [40, 50, 50, 60, 80, 90, 95, 80, 95, 105, 115, 130]
// //   };

// //   const lineData = {
// //     labels: data2024.months,
// //     datasets: [
// //       {
// //         label: "Income",
// //         data: data2024.income,
// //         borderColor: "#34d399",
// //         tension: 0.5,
// //         borderWidth: 3,
// //         pointRadius: 0
// //       },
// //       {
// //         label: "Expense",
// //         data: data2024.expense,
// //         borderColor: "#fb923c",
// //         tension: 0.5,
// //         borderWidth: 3,
// //         pointRadius: 0
// //       },
// //       {
// //         label: "Profit",
// //         data: data2024.profit,
// //         borderColor: "#60a5fa",
// //         tension: 0.5,
// //         borderWidth: 3,
// //         pointRadius: 0
// //       }
// //     ]
// //   };

// //   const lineOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     interaction: { mode: "index", intersect: false },
// //     plugins: {
// //       legend: { display: false },
// //       tooltip: {
// //         callbacks: {
// //           label(ctx) {
// //             setKpi({
// //               income: `₹ ${data2024.income[ctx.dataIndex]}k`,
// //               expense: `₹ ${data2024.expense[ctx.dataIndex]}k`,
// //               profit: `₹ ${data2024.profit[ctx.dataIndex]}k`
// //             });
// //             return `${ctx.dataset.label}: ₹ ${ctx.parsed.y}k`;
// //           }
// //         }
// //       }
// //     },
// //     scales: {
// //       x: { grid: { display: false } },
// //       y: { display: false }
// //     }
// //   };

// //   const donutData = {
    
// //     datasets: [
// //       {
// //         data: [45, 20, 12],
// //         backgroundColor: ["#34d399", "#fb923c", "#60a5fa"]
// //       }
// //     ],
// //     labels: ["Income", "Expense", "Profit"]
// //   };

// //   const toggleDataset = (index) => {
// //     const chart = chartRef.current;
// //     const meta = chart.getDatasetMeta(index);
// //     meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
// //     chart.update();
// //   };



// //   return <div className={`main ${collapsed ? "collapsed" : ""}`}>
// //     <main className={`Dashboard_main ${collapsed ? "collapsed" : ""}`}>
// //       {/* SUMMARY */}
// //       <div className="dash-summary">
// //         {[
// //           ["Total Sale", "₹ 4,80,000"],
// //           ["Total Purchase", "₹ 2,15,000"],
// //           ["Total Expense", "₹ 2,65,000"],
// //           ["Net Profit", "₹ 1,90,000"]
// //         ].map((s, i) => (
// //           <div className="dash-card" key={i}>
// //             <div>
// //               <h5>{s[0]}</h5>
// //               <div className="dash-amounts">{s[1]}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* CHART GRID */}
// //       {/* <div className="grid"> */}
// //         <div className="chart-card">
// //             <div className="card-header">
// //               <div className="card-title">Income, Expense & Profit</div>
// //             </div>

// //           <div className="kpis">
// //             <div className="kpi income-text">Income <span>{kpi.income}</span></div>
// //             <div className="kpi expense-text">Expense <span>{kpi.expense}</span></div>
// //             <div className="kpi profit-text">Profit <span>{kpi.profit}</span></div>
// //           </div>

// //           <div className="legend">
// //             {["income", "expense", "profit"].map((l, i) => (
// //               <div key={i} className="legend-item" onClick={() => toggleDataset(i)}>
// //                 <div className={`legend-dot ${l}`}>{l[0]}</div>{l}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="chart-area">
// //             <Line ref={chartRef} data={lineData} options={lineOptions} />
// //           </div>
// //         </div>

// //         {/* <div className="card">
// //           <h3>Expense Breakup</h3>
// //           <div className="donut-box">
// //             <Doughnut options={{ cutout: "70%" }} data={donutData}  />
// //           </div>
// //         </div> */}
// //       {/* </div> */}

// //       {/* REPORTS */}
// //       <div className="reports">
// //         <div className="card-header">
// //           <h2>Recent Accounting Entries</h2>
// //           <button>View All</button>
// //         </div>

// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Date</th>
// //               <th>Type</th>
// //               <th>Party</th>
// //               <th>Amount</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr>
// //               <td>12 Aug</td>
// //               <td><span className="badge sale">Sales</span></td>
// //               <td>ABC Traders</td>
// //               <td>₹25,000</td>
// //             </tr>
// //             <tr>
// //               <td>11 Aug</td>
// //               <td><span className="badge expense">Expense</span></td>
// //               <td>Office Rent</td>
// //               <td>₹15,000</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>


// //     </main>
// //   </div>;
// // }

// import { useOutletContext } from "react-router-dom";
// import React, { useState } from "react";

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";

// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// export default function Dashboard() {

//   const { collapsed } = useOutletContext();

//   const [view, setView] = useState("monthly");

//   /* -------------------- CHART DATA -------------------- */

//   const chartData = {

//     monthly: {
//       labels: ["Jan","Feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"],
//       datasets: [
//         {
//           label: "Sales",
//           data: [400000,480000,420000,500000,520000,550000,580000,600000,620000,650000,680000,700000],
//           backgroundColor: "#ec4899"
//         },
//         {
//           label: "Purchase",
//           data: [200000,215000,230000,240000,260000,270000, 280000,290000,300000,310000,320000,330000],
//           backgroundColor: "#22c55e"
//         },
//         {
//           label: "Expense",
//           data: [150000,180000,170000,190000,200000,210000, 220000,230000,240000,250000,260000,270000],
//           backgroundColor: "#f97316"
//         },
//         {
//           label: "Net Profit",
//           data: [50000,85000,20000,70000,60000,70000, 80000,80000,80000,90000,100000,100000],
//           backgroundColor: "#eab308"
//         }
//       ]
//     },

//     quarterly: {
//       labels: ["Q1","Q2","Q3","Q4"],
//       datasets: [
//         {
//           label: "Sales",
//           data: [1200000,1500000,1700000,1900000],
//           backgroundColor: "#ec4899"
//         },
//         {
//           label: "Purchase",
//           data: [600000,700000,750000,800000],
//           backgroundColor: "#22c55e"
//         },
//         {
//           label: "Expense",
//           data: [450000,520000,600000,640000],
//           backgroundColor: "#f97316"
//         },
//         {
//           label: "Net Profit",
//           data: [150000,280000,350000,460000],
//           backgroundColor: "#eab308"
//         }
//       ]
//     },

//     yearly: {
//       labels: ["2022","2023","2024"],
//       datasets: [
//         {
//           label: "Sales",
//           data: [4500000,5200000,6000000],
//           backgroundColor: "#ec4899"
//         },
//         {
//           label: "Purchase",
//           data: [2300000,2500000,2800000],
//           backgroundColor: "#22c55e"
//         },
//         {
//           label: "Expense",
//           data: [1800000,2000000,2200000],
//           backgroundColor: "#f97316"
//         },
//         {
//           label: "Net Profit",
//           data: [400000,700000,1000000],
//           backgroundColor: "#eab308"
//         }
//       ]
//     }

//   };

//   /* -------------------- CHART OPTIONS -------------------- */

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins:{
//       legend:{
//         position:"top"
//       },
//       tooltip:{
//         callbacks:{
//           label:(ctx)=>{
//             return ctx.dataset.label + ": ₹ " + ctx.parsed.y.toLocaleString();
//           }
//         }
//       }
//     },
//     scales:{
//       x:{
//         grid:{display:false}
//       },
//       y:{
//         beginAtZero:true,
//         ticks:{
//           callback:(value)=>"₹" + (value/1000) + "k"
//         }
//       }
//     }
//   };

//   return (

// <div className={`main ${collapsed ? "collapsed" : ""}`}>

// <main className={`Dashboard_main ${collapsed ? "collapsed" : ""}`}>

// {/* -------------------- SUMMARY CARDS -------------------- */}

// <div className="dash-summary">

// {[
// ["Total Sale","₹ 4,80,000"],
// ["Total Purchase","₹ 2,15,000"],
// ["Total Expense","₹ 2,65,000"],
// ["Net Profit","₹ 1,90,000"]
// ].map((s,i)=>(
// <div className="dash-card" key={i}>
// <div>
// <h5>{s[0]}</h5>
// <div className="dash-amounts">{s[1]}</div>
// </div>
// </div>
// ))}

// </div>

// {/* -------------------- CHART -------------------- */}

// <div className="chart-card">

//   <div className="card-header">

//     <div className="card-title">
//     Income, Expense & Profit
//     </div>

//     <select className="chart-filter" value={view} onChange={(e)=>setView(e.target.value)}>
//       <option value="monthly">Monthly</option>
//       <option value="quarterly">Quarterly</option>
//       <option value="yearly">Yearly</option>
//     </select>

//   </div>

//   <div className="chart-area">
//   <Bar data={chartData[view]} options={barOptions}/>
//   </div>

// </div>

// {/* -------------------- REPORT TABLE -------------------- */}

// <div className="reports">

// <div className="card-header">
// <h2>Recent Accounting Entries</h2>
// <button>View All</button>
// </div>

// <table>

// <thead>
// <tr>
// <th>Date</th>
// <th>Type</th>
// <th>Party</th>
// <th>Amount</th>
// </tr>
// </thead>

// <tbody>

// <tr>
// <td>12 Aug</td>
// <td><span className="badge sale">Sales</span></td>
// <td>ABC Traders</td>
// <td>₹25,000</td>
// </tr>

// <tr>
// <td>11 Aug</td>
// <td><span className="badge expense">Expense</span></td>
// <td>Office Rent</td>
// <td>₹15,000</td>
// </tr>

// <tr>
// <td>10 Aug</td>
// <td><span className="badge purchase">Purchase</span></td>
// <td>XYZ Supplier</td>
// <td>₹18,000</td>
// </tr>

// </tbody>

// </table>

// </div>

// </main>

// </div>

// );

// }


import { useOutletContext, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Dashboard() {

  const { collapsed } = useOutletContext();
  const navigate = useNavigate();

  const [view, setView] = useState("monthly");
  const [company, setCompany] = useState("");

  /* LOAD COMPANY NAME */

  useEffect(() => {

    const selectedCompany = localStorage.getItem("company");

    if (selectedCompany) {
      setCompany(selectedCompany);
    }

  }, []);

  /* SHUT COMPANY */

  const shutCompany = () => {

    localStorage.removeItem("company");

    navigate("/select-company");

  };

  /* CHART DATA */

  const chartData = {

    monthly: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Sales",
          data: [400000,480000,420000,500000,520000,550000,580000,600000,620000,650000,680000,700000],
          backgroundColor: "#ec4899"
        },
        {
          label: "Purchase",
          data: [200000,215000,230000,240000,260000,270000,280000,290000,300000,310000,320000,330000],
          backgroundColor: "#22c55e"
        },
        {
          label: "Expense",
          data: [150000,180000,170000,190000,200000,210000,220000,230000,240000,250000,260000,270000],
          backgroundColor: "#f97316"
        },
        {
          label: "Net Profit",
          data: [50000,85000,20000,70000,60000,70000,80000,80000,80000,90000,100000,100000],
          backgroundColor: "#eab308"
        }
      ]
    },

    quarterly: {
      labels: ["Q1","Q2","Q3","Q4"],
      datasets: [
        {
          label: "Sales",
          data: [1200000,1500000,1700000,1900000],
          backgroundColor: "#ec4899"
        },
        {
          label: "Purchase",
          data: [600000,700000,750000,800000],
          backgroundColor: "#22c55e"
        },
        {
          label: "Expense",
          data: [450000,520000,600000,640000],
          backgroundColor: "#f97316"
        },
        {
          label: "Net Profit",
          data: [150000,280000,350000,460000],
          backgroundColor: "#eab308"
        }
      ]
    },

    yearly: {
      labels: ["2022","2023","2024"],
      datasets: [
        {
          label: "Sales",
          data: [4500000,5200000,6000000],
          backgroundColor: "#ec4899"
        },
        {
          label: "Purchase",
          data: [2300000,2500000,2800000],
          backgroundColor: "#22c55e"
        },
        {
          label: "Expense",
          data: [1800000,2000000,2200000],
          backgroundColor: "#f97316"
        },
        {
          label: "Net Profit",
          data: [400000,700000,1000000],
          backgroundColor: "#eab308"
        }
      ]
    }

  };

  /* CHART OPTIONS */

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top"
      }
    },

    scales: {

      x: {
        grid: {
          display: false
        }
      },

      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₹" + (value / 1000) + "k"
        }
      }

    }
  };

  return (

    <div className={`main ${collapsed ? "collapsed" : ""}`}>

      <main className={`Dashboard_main ${collapsed ? "collapsed" : ""}`}>

        {/* COMPANY BAR */}

        <div className="company-bar">

          <div className="company-name">
            <strong>{company}</strong>
          </div>

          <button
            className="close-company-btn"
            onClick={shutCompany}
          >
            Shut Company
          </button>

        </div>

        {/* SUMMARY */}

        <div className="dash-summary">

          {[
            ["Total Sale","₹ 4,80,000"],
            ["Total Purchase","₹ 2,15,000"],
            ["Total Expense","₹ 2,65,000"],
            ["Net Profit","₹ 1,90,000"]
          ].map((s,i)=>(
            
            <div className="dash-card" key={i}>
              <div>
                <h5>{s[0]}</h5>
                <div className="dash-amounts">{s[1]}</div>
              </div>
            </div>

          ))}

        </div>

        {/* CHART */}

        <div className="chart-card">

          <div className="card-header">

            <div className="card-title">
              Income, Expense & Profit
            </div>

            <select
              className="chart-filter"
              value={view}
              onChange={(e)=>setView(e.target.value)}
            >

              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>

            </select>

          </div>

          <div className="chart-area">
            <Bar data={chartData[view]} options={barOptions}/>
          </div>

        </div>

        {/* REPORT TABLE */}

        <div className="reports">

          <div className="card-header">
            <h2>Recent Accounting Entries</h2>
            <button>View All</button>
          </div>

          <table>

            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Party</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>12 Aug</td>
                <td><span className="badge sale">Sales</span></td>
                <td>ABC Traders</td>
                <td>₹25,000</td>
              </tr>

              <tr>
                <td>11 Aug</td>
                <td><span className="badge expense">Expense</span></td>
                <td>Office Rent</td>
                <td>₹15,000</td>
              </tr>

              <tr>
                <td>10 Aug</td>
                <td><span className="badge purchase">Purchase</span></td>
                <td>XYZ Supplier</td>
                <td>₹18,000</td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}