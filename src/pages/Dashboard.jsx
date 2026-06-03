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


import React, { useEffect, useState } from "react";
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

import { Bar } from "react-chartjs-2";
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

  const chartData = {

    monthly: {

      labels: [
        "Jan","Feb","Mar","Apr",
        "May","Jun","Jul","Aug",
        "Sep","Oct","Nov","Dec"
      ],

      datasets: [

        {
          label: "Sales",

          data: [
            32,28,30,26,
            29,34,31,28,
            30,35,33,37
          ],

          backgroundColor: "#ff4d6d",

          borderRadius: 8,

          barThickness: 10
        },

        {
          label: "Purchase",

          data: [
            22,20,24,18,
            21,26,22,20,
            21,28,25,29
          ],

          backgroundColor: "#3b82f6",

          borderRadius: 8,

          barThickness: 10
        },

        {
          label: "Expenses",

          data: [
            14,12,15,13,
            14,18,16,14,
            15,19,17,18
          ],

          backgroundColor: "#f97316",

          borderRadius: 8,

          barThickness: 10
        },

        {
          label: "Profit",

          data: [
            10,8,9,7,
            8,12,10,9,
            11,13,12,14
          ],

          backgroundColor: "#65a30d",

          borderRadius: 8,

          barThickness: 10
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

          data: [
            90,110,95,120
          ],

          backgroundColor: "#ff4d6d",
          borderRadius: 8,
          barPercentage: 0.9,
          categoryPercentage: 0.7
        },

        {
          label: "Purchase",

          data: [
            60,72,66,75
          ],

          backgroundColor: "#3b82f6",

          borderRadius: 8,
          barPercentage: 0.9,

  categoryPercentage: 0.7
        },

        {
          label: "Expenses",

          data: [
            40,46,42,50
          ],

          backgroundColor: "#f97316",

          borderRadius: 8
        },

        {
          label: "Profit",

          data: [
            20,28,24,35
          ],

          backgroundColor: "#65a30d",

          borderRadius: 8
        }

      ]

    },

    yearly: {

      labels: [
        "2023","2024","2025","2026"
      ],

      datasets: [

        {
          label: "Sales",

          data: [
            320,420,390,480
          ],
          backgroundColor: "#ff4d6d",
          borderRadius: 8
        },

        {
          label: "Purchase",

          data: [
            210,260,250,300
          ],

          backgroundColor: "#3b82f6",

          borderRadius: 8
        },

        {
          label: "Expenses",

          data: [
            150,180,170,210
          ],

          backgroundColor: "#f97316",

          borderRadius: 8
        },

        {
          label: "Profit",

          data: [
            70,100,95,130
          ],

          backgroundColor: "#65a30d",

          borderRadius: 8
        }

      ]

    },

    daily: {

      labels: [
        "Mon","Tue","Wed",
        "Thu","Fri","Sat","Sun"
      ],

      datasets: [

        {
          label: "Sales",

          data: [
            12,15,14,13,18,20,17
          ],

          backgroundColor: "#ff4d6d",

          borderRadius: 8
        },

        {
          label: "Purchase",

          data: [
            8,10,9,8,11,12,10
          ],

          backgroundColor: "#3b82f6",

          borderRadius: 8
        },

        {
          label: "Expenses",

          data: [
            5,6,5,7,8,7,6
          ],

          backgroundColor: "#f97316",

          borderRadius: 8
        },

        {
          label: "Profit",

          data: [
            4,5,4,5,7,8,7
          ],

          backgroundColor: "#65a30d",

          borderRadius: 8
        }

      ]

    }

  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          padding: 20,
          color: "#111827",
          font: {
            size: 14,
            weight: "600"
          }

        }

      }

    },

    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#374151",
          font: {
            size: 13,
            weight: "600"
          }

        }

      },

      y: {

        beginAtZero: true,

        grid: {
          color: "#e5e7eb"
        },

        ticks: {

          color: "#374151",

          callback: (value) =>
            value + " L"

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
              <h4>E-Way Bill Status</h4>
              <p>Generated: 125</p>
              <p>Sales: 2.11 Cr.</p>
            </div>

            <div className="mini-card blue">
              <h4>E-Invoice Status</h4>
              <p>Generated: 325</p>
              <p>Sales: 2.07 Cr.</p>
              <p>Pending: 30</p>
            </div>

          </div>

        </div>

        {/* ================================
            CHART + PENDING TABLES
        ================================= */}

        <div className="chart-grid">

          {/* CHART */}

          <div className="chart-card">

            <div className="chart-header">

              <h3>Business Graph</h3>

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

            <div className="chart-wrapper">

              <Bar
                data={chartData[view]}
                options={chartOptions}
              />

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