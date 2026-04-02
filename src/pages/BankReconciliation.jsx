import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const yearlyData = {
  2024: [
    { month: "Jan", income: 100000, expense: 72000 },
    { month: "Feb", income: 110000, expense: 75000 },
    { month: "Mar", income: 125000, expense: 90000 },
    { month: "Apr", income: 140000, expense: 95000 }
  ],
  2025: [
    { month: "Jan", income: 150000, expense: 80000 },
    { month: "Feb", income: 135000, expense: 85000 },
    { month: "Mar", income: 160000, expense: 92000 },
    { month: "Apr", income: 170000, expense: 100000 }
  ]
};

export default function BankReconciliation() {
  const { collapsed } = useOutletContext();
  const [selectedYear, setSelectedYear] = useState("2025");
  const data = yearlyData[selectedYear];

  const calculated = useMemo(() => {
    const totalIncome = data.reduce((a, b) => a + b.income, 0);
    const totalExpense = data.reduce((a, b) => a + b.expense, 0);
    const netProfit = totalIncome - totalExpense;
    const receivables = totalIncome * 0.15;
    const payables = totalExpense * 0.12;

    return {
      totalIncome,
      totalExpense,
      netProfit,
      receivables,
      payables,
      netPosition: receivables - payables
    };
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { point: { radius: 0 } }
  };

  const createDataset = (values, color) => ({
    labels: data.map(d => d.month),
    datasets: [
      {
        data: values,
        borderColor: color,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, color + "66");
          gradient.addColorStop(1, color + "05");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  });


  return <div className={`main ${collapsed ? "collapsed" : ""}`}>


    <div className="BankReconciliation-dashboard-container">
      {/* KPI GRID */}
      <div className="BankReconciliation-kpi-grid">

        {[
          { title: "Total Income", value: calculated.totalIncome, data: data.map(d => d.income), color: "#34d399" },
          { title: "Total Expenses", value: calculated.totalExpense, data: data.map(d => d.expense), color: "#fb923c" },
          { title: "Net Profit", value: calculated.netProfit, data: data.map(d => d.income - d.expense), color: "#60a5fa" },
          { title: "Receivables", value: calculated.receivables, data: data.map(d => d.income * 0.15), color: "#34d399" },
          { title: "Payables", value: calculated.payables, data: data.map(d => d.expense * 0.12), color: "#fb923c" }
        ].map((item, i) => (
          <div className="BankReconciliation-kpi-card" key={i}>
            <div className="BankReconciliation-chart-bg">
              <Line
                data={createDataset(item.data, item.color)}
                options={chartOptions}
              />
            </div>
            <div className="BankReconciliation-kpi-content">
              <h4>{item.title}</h4>
              <h2>₹ {item.value.toLocaleString()}</h2>
            </div>
          </div>
        ))}

      </div>

      {/* SPLIT SECTION */}
      <div className="BankReconciliation-split">

        {/* Monthly Trend Table */}
        <div className="BankReconciliation-card">
          <div className="BankReconciliation-card-header">
            <h3>Monthly Accounting Trend</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Object.keys(yearlyData).map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.month}</td>
                  <td>₹ {item.income.toLocaleString()}</td>
                  <td>₹ {item.expense.toLocaleString()}</td>
                  <td className="BankReconciliation-profit">
                    ₹ {(item.income - item.expense).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Outstanding Snapshot */}
        <div className="BankReconciliation-card">
          <h3>Outstanding Snapshot ({selectedYear})</h3>

          <div className="BankReconciliation-snapshot-row">
            <span>Customer Receivables</span>
            <span className="BankReconciliation-green">
              ₹ {calculated.receivables.toLocaleString()}
            </span>
          </div>

          <div className="BankReconciliation-snapshot-row">
            <span>Vendor Payables</span>
            <span className="BankReconciliation-orange">
              ₹ {calculated.payables.toLocaleString()}
            </span>
          </div>

          <div className="BankReconciliation-snapshot-row total">
            <span>Net Position</span>
            <span>
              ₹ {calculated.netPosition.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

    </div>


  </div>;
}
