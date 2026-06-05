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


import React, { useEffect, useState, useMemo } from "react";
import {useOutletContext,useNavigate} from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { FaTruck, FaFileInvoice } from "react-icons/fa";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  ShoppingCart,
  ReceiptText,
  Wallet,
  TrendingUp,
  Landmark,
  Scale,
  Boxes,
  IndianRupee,
  Bell,
  UserRound,
  BadgeDollarSign,
  BanknoteArrowUp,
  PackageSearch,
  ClipboardList,
  FileSpreadsheet,
  ChartColumnBig,
  CircleDollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock3,
} from "lucide-react";
import "../styles/MainDashboard.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { collapsed } = useOutletContext();
  const navigate = useNavigate();
  const [company, setCompany] = useState({companyName: "",
    gstin: "",
    contactPerson: "",
    contactNo: "",
    financialYear: ""});
  const [view, setView] = useState("daily");
  useEffect(() => {
    const selectedCompany = localStorage.getItem("company");
    if (selectedCompany) {
      setCompany(selectedCompany);
    }
    setCompany({
      companyName: selectedCompany || "",
      gstin: "09ABCDE08070128",
      contactPerson: "Mr. Mohd Sajid",
      contactNo: "9897325276",
      financialYear: "2025-26"
    });
  }, []);
  
  const shutCompany = () => {
    localStorage.removeItem("company");
    navigate("/select-company");
  };

  /* ================================
      SUMMARY CARDS
  ================================= */
 const summaryCards = [

  {
    title: "Total Sales",
    amount: "3.25 Cr.",
    icon: <ShoppingCart size={23} />,
    bg: "linear-gradient(135deg,#2563eb,#60a5fa)"
  },

  {
    title: "Total Purchase",
    amount: "22.85 Cr.",
    icon: <ReceiptText size={23} />,
    bg: "linear-gradient(135deg,#16a34a,#4ade80)"
  },

  {
    title: "Total Expenses",
    amount: (
    <div className="dual-amount">
      <span>Direct Exp :<strong> 12.5 L</strong></span>
      <span>Indirect Exp :<strong> 23.25 L</strong></span>
    </div>
  ),
    icon: <Wallet size={23} />,
    bg: "linear-gradient(135deg,#dc2626,#fb7185)"
  },

  {
    title: "Net Profit",
    amount: "10.28 L",
    icon: <TrendingUp size={23} />,
    bg: "linear-gradient(135deg,#f59e0b,#facc15)"
  },
  {
    title: "Total Receipts",
    amount: "10.28 L",
    icon: <ArrowDownCircle size={23} />,
    bg: "linear-gradient(135deg,#059669,#34d399)"
  },
  {
    title: "Total Payments",
    amount: "10.28 L",
    icon: <ArrowUpCircle size={23} />,
    bg: "linear-gradient(135deg,#dc2626,#fb7185)"
  },
  {
    title: "Pending Receipts",
    amount: "10.28 L",
    icon: <Clock3  size={23} />,
    bg: "linear-gradient(135deg,#4f46e5,#818cf8)"
  },
  {
    title: "Pending Payments",
    amount: "10.28 L",
    icon: <CircleDollarSign  size={23} />,
    bg: "linear-gradient(135deg,#0f766e,#2dd4bf)"
  },

  {
    title: "Cash/Bank",
    amount: (
    <div className="dual-amount">
      <span>Cash :<strong> 85K</strong></span>
      <span>Bank :<strong> 3.25 L</strong></span>
    </div>
  ),
    icon: <Landmark size={23} />,
    bg: "linear-gradient(135deg,#0891b2,#22d3ee)"
  },

  {
    title: "Assets & Liabilities",
    amount: (
    <div className="dual-amount">
      <span>Assets :<strong> 10.52 L</strong></span>
      <span>Liabilities :<strong> 8.25 L</strong></span>
    </div>
  ),
    icon: <Scale size={23} />,
    bg: "linear-gradient(135deg,#7c3aed,#c084fc)"
  },

  {
    title: "Stock Balance",
    amount: "27.25 L",
    icon: <Boxes size={23} />,
    bg: "linear-gradient(135deg,#db2777,#f472b6)"
  },

  {
    title: "Stock",
    amount: (
    <div className="dual-amount">
      <span>In :<strong> 85 cr</strong></span>
      <span>out :<strong> 3.25 cr</strong></span>
    </div>
  ),
    icon: <IndianRupee size={23} />,
    bg: "linear-gradient(135deg,#059669,#34d399)"
  }

];

  /* ================================
      CHART DATA
  ================================= */
/* =========================================
    PREMIUM CHART DATA
========================================= */

// const createGradient = (context, startColor) => {
//   const chart = context.chart;
//   const { ctx, chartArea } = chart;

//   if (!chartArea) return null;

//   const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//   gradient.addColorStop(0, startColor);
//   gradient.addColorStop(0.35, startColor.replace("1)", "0.15)"));
//   gradient.addColorStop(0.50, "rgba(255, 255, 255, 0)");

//   return gradient;
// };

// const commonDataset = (label, data, borderColor, gradientColor) => ({
//   label,
//   data,
//   borderColor,
//   backgroundColor: (context) => createGradient(context, gradientColor),
//   fill: true,
//   tension: 0.45,
//   borderWidth: 3,
//   pointRadius: 0,
//   pointHoverRadius: 6,
//   pointHoverBackgroundColor: "#ffffff",
//   pointHoverBorderWidth: 4,
//   cubicInterpolationMode: "monotone"
// });

// const chartData = useMemo(() => {
//   return {
//     daily: {
//       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       datasets: [
//         commonDataset("Sales", [32, 38, 42, 39, 47, 44, 52], "#2563eb", "rgba(37, 99, 235, 1)"),
//         commonDataset("Purchase", [18, 24, 28, 25, 30, 27, 36], "#64748b", "rgba(100, 116, 139, 1)"),
//         commonDataset("Expenses", [10, 15, 14, 13, 18, 16, 20], "#f97316", "rgba(249, 115, 22, 1)"),
//         commonDataset("Profit", [4, 8, 7, 7, 10, 8, 12], "#65a30d", "rgba(101, 163, 13, 1)")
//       ]
//     },
//     monthly: {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       datasets: [
//         commonDataset("Sales", [28, 35, 41, 38, 49, 40, 45, 52, 47, 58, 50, 63], "#2563eb", "rgba(37, 99, 235, 1)"),
//         commonDataset("Purchase", [18, 24, 29, 25, 31, 27, 25, 30, 27, 33, 29, 37], "#64748b", "rgba(100, 116, 139, 1)"),
//         commonDataset("Expenses", [9, 14, 13, 12, 16, 15, 14, 17, 16, 21, 19, 24], "#f97316", "rgba(249, 115, 22, 1)"),
//         commonDataset("Profit", [3, 8, 7, 7, 9, 8, 7, 10, 8, 12, 10, 14], "#65a30d", "rgba(101, 163, 13, 1)")
//       ]
//     },
//     quarterly: {
//       labels: ["Q1", "Q2", "Q3", "Q4"],
//       datasets: [
//         commonDataset("Sales", [120, 145, 138, 170], "#2563eb", "rgba(37, 99, 235, 1)"),
//         commonDataset("Purchase", [70, 82, 78, 96], "#64748b", "rgba(100, 116, 139, 1)"),
//         commonDataset("Expenses", [42, 50, 46, 60], "#f97316", "rgba(249, 115, 22, 1)"),
//         commonDataset("Profit", [18, 25, 22, 32], "#65a30d", "rgba(101, 163, 13, 1)")
//       ]
//     },
//     yearly: {
//       labels: ["2022", "2023", "2024", "2025"],
//       datasets: [
//         commonDataset("Sales", [280, 340, 410, 520], "#2563eb", "rgba(37, 99, 235, 1)"),
//         commonDataset("Purchase", [170, 210, 250, 320], "#64748b", "rgba(100, 116, 139, 1)"),
//         commonDataset("Expenses", [90, 120, 145, 180], "#f97316", "rgba(249, 115, 22, 1)"),
//         commonDataset("Profit", [42, 58, 75, 120], "#65a30d", "rgba(101, 163, 13, 1)")
//       ]
//     }
//   };
// }, []);
//     const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   interaction: {
//     mode: "index",
//     intersect: false
//   },
//   plugins: {
//     legend: {
//       position: "top",
//       align: "center",
//       labels: {
//         usePointStyle: true,
//         pointStyle: "circle",
//         padding: 30, // Increased padding for breathing room
//         color: "#1e293b", // Slate-800 instead of harsh true black
//         boxWidth: 10,
//         boxHeight: 10,
//         font: {
//           size: 14,
//           weight: "600", // Semi-bold looks cleaner than ultra-thick 700
//           family: "'Inter', sans-serif"
//         }
//       }
//     },
//     tooltip: {
//       backgroundColor: "rgba(17, 24, 39, 0.95)", // Slightly translucent dark glass
//       titleColor: "#ffffff",
//       bodyColor: "#f3f4f6",
//       padding: 12,
//       cornerRadius: 12,
//       boxPadding: 6, // Adds premium spacing inside tooltips
//       usePointStyle: true // Uses the circular icons in the tooltip matching the legend
//     }
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false
//       },
//       ticks: {
//         color: "#94a3b8", // Subdued gray text so chart curves stand out
//         padding: 10,
//         font: {
//           size: 12,
//           weight: "600",
//           family: "'Inter', sans-serif"
//         }
//       },
//       border: {
//         display: false // Removes the harsh bottom line axis line
//       }
//     },
//     y: {
//       beginAtZero: true,
//       suggestedMax: 60, // Gives the chart top headroom exactly like the image
//       grid: {
//         color: "rgba(226, 232, 240, 0.4)", // Very soft slate divider lines
//         drawTicks: false
//       },
//       border: {
//         display: false
//       },
//       ticks: {
//         color: "#94a3b8",
//         padding: 12,
//         font: {
//           size: 12,
//           weight: "500",
//           family: "'Inter', sans-serif"
//         },
//         callback: (value) => value + "L"
//       }
//     }
//   }
// };
const createBarGradient = (
  context,
  color1,
  color2
) => {

  const chart = context.chart;
  const { ctx, chartArea } = chart;
  if (!chartArea) return null;
  const gradient =
    ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  gradient.addColorStop(
    1,
    "rgba(255,255,255,0.12)"
  );
  return gradient;
};


const chartData = {
  daily: {
    labels: [
      "Mon","Tue","Wed",
      "Thu","Fri","Sat","Sun"
    ],
    datasets: [
      {
        label: "Sales",
        data: [12,15,13,14,18,22,17],
        backgroundColor: (context) =>
          createBarGradient(
            context,
            "#084ee5",
            "#a6ceff"
          ),
        borderRadius: 5,
        barThickness: 8
      },

      {
        label: "Purchase",
        data: [8,10,9,8,11,13,9],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#032a34",
          "#4de4f8"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Expenses",
        data: [5,6,5,5,7,8,6],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#f91511",
          "#fcc670"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Profit",
        data: [4,5,4,4,6,6,5],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#05571197",
          "#80f4a1"
        ),
        borderRadius: 4,
        barThickness: 8
      }

    ]

  },

  monthly: {

    labels: [
      "Jan","Feb","Mar","Apr",
      "May","Jun","Jul","Aug",
      "Sep","Oct","Nov","Dec"
    ],

    datasets: [

      {
        label: "Sales",
        data: [12,15,13,14,18,22,17,16,20,19,18,21],
        backgroundColor: (context) =>
          createBarGradient(
            context,
            "#084ee5",
            "#a6ceff"
          ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Purchase",
        data: [8,10,9,8,11,13,9,10,12,11,10,12],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#032a34",
          "#4de4f8"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Expenses",
        data: [5,6,5,5,7,8,6,6,7,7,6,7],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#f91511",
          "#fcc670"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Profit",
        data: [4,5,4,4,6,6,5,5,6,6,5,6],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#05571197",
          "#80f4a1"
        ),
        borderRadius: 4,
        barThickness: 8
      }

    ]

  },

  quarterly: {

    labels: [
      "Q1","Q2","Q3","Q4"
    ],

    datasets: [

      {
        label: "Sales",
        data: [55,72,68,78],
        backgroundColor: (context) =>
          createBarGradient(
            context,
            "#084ee5",
            "#a6ceff"
          ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Purchase",
        data: [38,48,45,52],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#032a34",
          "#4de4f8"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Expenses",
        data: [22,26,25,28],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#f91511",
          "#fcc670"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Profit",
        data: [18,22,20,24],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#05571197",
          "#80f4a1"
        ),
        borderRadius: 4,
        barThickness: 8
      }

    ]

  },

  yearly: {

    labels: [
      "2022",
      "2023",
      "2024",
      "2025"
    ],

    datasets: [

      {
        label: "Sales",
        data: [180,220,280,350],
        backgroundColor: (context) =>
          createBarGradient(
            context,
            "#084ee5",
            "#a6ceff"
          ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Purchase",
        data: [120,150,190,250],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#032a34",
          "#4de4f8"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Expenses",
        data: [80,95,120,145],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#f91511",
          "#fcc670"
        ),
        borderRadius: 4,
        barThickness: 8
      },

      {
        label: "Profit",
        data: [40,55,90,120],
        backgroundColor: (context) =>
        createBarGradient(
          context,
          "#05571197",
          "#80f4a1"
        ),
        borderRadius: 4,
        barThickness: 8
      }

    ]

  }

};
const chartOptions = {
  responsive: true,
  // datasets: {
  //   bar: {
  //     categoryPercentage: 0.70,
  //     barPercentage: 0.50
  //   }
  // },

  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        boxHeight: 8,
        padding: 30,
        color: "#334155",
        font: {
          size: 12,
          weight: "600"
        }
      }
    },
    
    datalabels: {
    anchor: "end",
    align: "top",
    color: "#475569",
    font: {
      size: 10,
      weight: "600"
    },
    formatter: (value) =>
      `${value} Cr`

  }

  },

  scales: {
    x: {
      stacked: false,
      grid: { display: false},
      ticks: {
        color: "#64748B",
        font: {
          weight: "600"
        }
      }
    },
    y: {
      beginAtZero: true,
      max: 25,
      grid: {
        color: "#EEF2F7",
        drawBorder: false
      },
      ticks: {
        stepSize: 5,
        color: "#94A3B8",
        callback: (value) =>
          `${value} Cr`
      }
    }
  }
};
  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="dashboard-page">
        {/* ================================
            TOP HEADER
        ================================= */}
        <div className="dashboard-header">
          {/* =========================================
              LEFT SECTION
          ========================================= */}
          <div className="header-left">
            <div className="company-top-row">
              {/* LOGO */}
              <div className="company-logo">
                TM
              </div>

              {/* COMPANY INFO */}
              <div className="company-info">
                {/* COMPANY NAME */}
                <h1 className="company-name">
                  {company.companyName}
                </h1>

                {/* COMPANY DETAILS */}
                <div className="company-details">
                  <div>
                    <span>
                      GSTIN: {company.gstin}
                    </span>
                  </div>
                  {/* <span className="dot">•</span> */}
                  <div className="dash-span">
                    <span>
                      Contact Person: {company.contactPerson}
                    </span>
                    <span>Contact No: {company.contactNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT SECTION
          ========================================= */}
          <div className="header-right">
            {/* FY */}
            <div className="fy-box">
              <span className="fy-label">F.Y.</span>
              <span className="fy-value">
                {company.financialYear}
              </span>
            </div>

            {/* DATE */}
            <div className="date-box">
              <span className="fy-label">Current Date</span>
              <span className="fy-value">
                {new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>

            {/* NOTIFICATION */}
            <div className="header-icon">
              <Bell />
            </div>

            {/* BUTTON */}
            <button className="shut-btn" onClick={shutCompany}>
              Shut Company
            </button>
          </div>
        </div>
        {/* ================================
            SUMMARY CARDS
        ================================= */}

        <div className="summary-grid">
          {summaryCards.map(
            (card, index) => (
            <div
              className="summary-card"
              key={index}
            >

              <div
                className="das-card-icon"
                style={{
                  background: card.bg
                }}
              >
                {card.icon}
              </div>
              <div>
                <h4>{card.title}</h4>
                <h2>{card.amount}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* ================================
            GST + SIDE TABLES
        ================================= */}

        <div className="middle-grid">

          {/* GST TABLE */}
          <div className="gst-card">

            <div className="gst-top-header">

              <div className="section-title">
                GST Status
              </div>

              <div className="gst-filter">

                <span>
                  Month
                </span>

                <select className="gst-select">

                  <option>
                    Current Month
                  </option>

                  <option>
                    April
                  </option>

                  <option>
                    May
                  </option>

                  <option>
                    June
                  </option>

                </select>

              </div>

            </div>

            <table className="gst-table">

              <thead>

                <tr>

                  <th className="part-head">Particulars</th>

                  <th className="igst-head">
                    IGST
                  </th>

                  <th className="cgst-head">
                    CGST
                  </th>

                  <th className="sgst-head">
                    SGST
                  </th>

                  <th className="cess-head">
                    CESS
                  </th>

                  <th className="total-head">
                    Total GST
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* NET OUTPUT */}

                <tr className="output-row">

                  <td className="row-title output-title">
                    Net Outputs
                  </td>

                  <td className="output-value">
                    5,00,000
                  </td>

                  <td className="output-value">
                    3,80,000
                  </td>

                  <td className="output-value">
                    3,80,000
                  </td>

                  <td className="output-value">
                    30,000
                  </td>

                  <td className="total-output">
                    12,90,000
                  </td>

                </tr>

                {/* LESS INPUT */}

                <tr className="input-row">
                  <td className="row-title input-title">
                    Less Inputs
                  </td>
                  <td className="input-value">
                    6,00,000
                  </td>
                  <td className="input-value">
                    4,00,000
                  </td>
                  <td className="input-value">
                    4,00,000
                  </td>
                  <td className="input-value">
                    10,000
                  </td>
                  <td className="total-input">
                    14,10,000
                  </td>
                </tr>
                {/* ITC PAYABLE */}
                <tr className="payable-row">
                  <td className="row-title payable-title">
                    <span className="itc-text">
                      ITC
                    </span>
                    <span className="slash-text">
                      /
                    </span>
                    <span className="payable-text">
                      Payable
                    </span>
                  </td>
                  {/* NEGATIVE */}
                  <td className="negative-cell">
                    -1,00,000
                  </td>
                  <td className="negative-cell">
                    -20,000
                  </td>
                  <td className="negative-cell">
                    -20,000
                  </td>
                  {/* POSITIVE */}
                  <td className="positive-cell">
                    20,000
                  </td>
                  {/* TOTAL */}
                  <td className="negative-total">
                    -1,20,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* RIGHT SIDE */}

          <div className="side-cards">

            <div className="mini-card green">
              <div className="card-icon">
                <FaTruck />
              </div>

              <div className="card-content">
                <h4>E-Way Bill Status</h4>
                <div className="card-status-row">
                  <span>Generated :</span>
                  <span className="value">125</span>
                </div>
                <div className="card-status-row">
                  <span>Sales :</span>
                  <span className="value">2.11 Cr.</span>
                </div>
              </div>
            </div>

            <div className="mini-card blue">
              <div className="card-icon">
                <FaFileInvoice />
              </div>

              <div className="card-content">
                <h4>E-Invoice Status</h4>
                <div className="status-row">
                  <span>Generated :</span>
                  <span className="value">325</span>
                </div>

                <div className="status-row">
                  <span>Sales :</span>
                  <span className="value">2.07 Cr.</span>
                </div>

                <div className="status-row">
                  <span>Pending :</span>
                  <span className="pending-value">30</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================================
            CHART + PENDING TABLES
        ================================= */}

        <div className="chart-grid">

          {/* CHART */}
          <div className="chart-card">
            {/* HEADER */}
            <div className="chart-header">
              <h3>
                Business Graph
              </h3>
              <select
                value={view}
                onChange={(e)=>
                  setView(e.target.value)
                }
                className="graph-select"
              >

                <option value="daily">
                  Daily
                </option>

                <option value="monthly">
                  Month Wise
                </option>

                <option value="quarterly">
                  Quarter Wise
                </option>

                <option value="yearly">
                  Year Wise
                </option>
              </select>
            </div>
            {/* CHART */}
            <div className="chart-wrapper">
              {/* <Line
                data={chartData[view]}
                options={chartOptions}
              /> */}
              <Bar
                data={chartData[view]}
                options={chartOptions}
              />
            </div>
            {/* TREND STATS */}
            <div className="trend-stats">
              {/* CARD 1 */}
              <div className="trend-box">
                <div className="trend-icon blue">
                  ↑
                </div>
                <div className="trend-content">
                  <p>
                    Highest Sales
                  </p>
                  <h4>
                    ₹4.45 Cr
                  </h4>
                  <span>
                    in December
                  </span>
                </div>
              </div>
              {/* CARD 2 */}
              <div className="trend-box">
                <div className="trend-icon gray">
                  ↓
                </div>
                <div className="trend-content">
                  <p>
                    Lowest Sales
                  </p>
                  <h4>
                    ₹2.45 Cr
                  </h4>
                  <span>
                    in January
                  </span>
                </div>
              </div>
              {/* CARD 3 */}
              <div className="trend-box">
                <div className="trend-icon orange">
                  ⟳
                </div>
                <div className="trend-content">
                  <p>
                    Avg. Monthly Sales
                  </p>
                  <h4>
                    ₹3.12 Cr
                  </h4>
                  <span>
                    12 Months Avg.
                  </span>
                </div>
              </div>
              {/* CARD 4 */}
              <div className="trend-box">
                <div className="trend-icon green">
                  %
                </div>
                <div className="trend-content">
                  <p>
                    Avg. Profit Margin
                  </p>
                  <h4>
                    24.82%
                  </h4>
                  <span>
                    12 Months Avg.
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* SIDE TABLES */}

          <div className="pending-section">

            <div className="pending-card">

              <div className="section-title">
                Pending Receipts
              </div>

              <table>

                <thead>

                  <tr>
                    <th>Party</th>
                    <th>Amount</th>
                    <th>Due Days</th>
                    <th>Reminders</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>ABCK Company</td>
                    <td>5,10,320</td>
                    <td>122</td>
                    <td>
                      <div className="whatsapp-icon">
                        <i className="ri-whatsapp-line"></i>
                      </div>
                    </td>
                    <td>
                      <span className="voucher receipt">
                        Receipt Voucher
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Laviza Textile</td>
                    <td>3,20,580</td>
                    <td>93</td>
                    <td>
                      <div className="whatsapp-icon">
                        <i className="ri-whatsapp-line"></i>
                      </div>
                    </td>
                    <td>
                      <span className="voucher receipt">
                        Receipt Voucher
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Mathur Industries</td>
                    <td>8,25,330</td>
                    <td>65</td>
                    <td>
                      <div className="whatsapp-icon">
                        <i className="ri-whatsapp-line"></i>
                      </div>
                    </td>
                    <td>
                      <span className="voucher receipt">
                        Receipt Voucher
                      </span>
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

            <div className="pending-card">

              <div className="section-title">
                Pending Payments
              </div>

              <table>

                <thead>

                  <tr>
                    <th>Party</th>
                    <th>Amount</th>
                    <th>Due Days</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>ABCK Company</td>
                    <td>5,10,320</td>
                    <td>122</td>
                     <td>
                      <span className="voucher payment">
                        Payment Voucher
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Laviza Textile</td>
                    <td>3,20,580</td>
                    <td>78</td>
                     <td>
                      <span className="voucher payment">
                        Payment Voucher
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Mathur Industries</td>
                    <td>8,25,330</td>
                    <td>98</td>
                     <td>
                      <span className="voucher payment">
                        Payment Voucher
                      </span>
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* ================================
            LAST ENTRIES
        ================================= */}

        <div className="last-entry-card">

          <div className="section-title">
            Last Entries Of The Day
          </div>

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Party</th>
                <th>Voucher Type</th>
                <th>Voucher No</th>
                <th>Amount cr</th>
                <th>Amount dr</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>15-02-26</td>
                <td>Bismi Enterprises</td>
                <td>Payment</td>
                <td>Pau-01</td>
                <td>80,500</td>
                <td></td>

              </tr>

              <tr>
                <td>15-02-26</td>
                <td>Sharon Traders</td>
                <td>Receipt</td>
                <td>Rec-01</td>
                <td></td>
                <td>1,00,000</td>
              </tr>

              <tr>
                <td>15-02-26</td>
                <td>ABC Traders</td>  
                <td>Sales</td>
                <td>Tax/2025-26/001</td>
                <td>5,10,320</td>
                <td></td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}