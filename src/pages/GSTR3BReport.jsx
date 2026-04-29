import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/GSTR1Report.css";

const GSTR1Report = () => {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [fileType, setFileType] = useState("software_excel");

  const handleDownload = () => {
    const payload = {
      mode,
      month,
      quarter,
      fileType,
    };

    console.log("Download Request:", payload);
    alert("Download started!");
  };

  const { collapsed } = useOutletContext();

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="gstr-container">

        <h2 className="gstr-title">GSTR-3B Report</h2>

        <div className="gstr-card">

          {/* LEFT */}
          <div className="gstr-left">

            {/* 🔥 NEW SWITCH */}
            <div className="gstr-switch-row">

              <span className={mode === "month" ? "label active" : "label"}>
                Month
              </span>

              <div
                className={`gstr-switch ${mode === "quarter" ? "right" : ""}`}
                onClick={() =>
                  setMode((prev) => (prev === "month" ? "quarter" : "month"))
                }
              >
                <div className="gstr-switch-thumb"></div>
              </div>

              <span className={mode === "quarter" ? "label active" : "label"}>
                Quarterly
              </span>

            </div>

            {/* INPUT */}
            {mode === "month" ? (
              <input
                type="month"
                className="gstr-input"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            ) : (
              <select
                className="gstr-input"
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
              >
                <option value="">Select Quarter</option>
                <option value="Q1">Q1 (Apr - Jun)</option>
                <option value="Q2">Q2 (Jul - Sep)</option>
                <option value="Q3">Q3 (Oct - Dec)</option>
                <option value="Q4">Q4 (Jan - Mar)</option>
              </select>
            )}

          </div>

          {/* RIGHT */}
          <div className="gstr-right">
            <label>Type of File</label>
            <select
              className="gstr-input"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option value="software_excel">Software Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

        </div>

        {/* DOWNLOAD */}
        <div className="gstr-action">
          <button className="gstr-download-btn" onClick={handleDownload}>
            ⬇ Download
          </button>
        </div>

      </div>
    </div>
  );
};

export default GSTR1Report;