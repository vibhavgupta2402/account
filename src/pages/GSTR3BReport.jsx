
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../styles/GSTR1Report.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GSTR1Report = () => {

  const [mode, setMode] =
    useState("month");

  const [month, setMonth] =
    useState("");

  const [quarter, setQuarter] =
    useState("");

  const [fileType, setFileType] =
    useState("software_excel");

  const { collapsed } =
    useOutletContext();

  /* =========================================
      DUMMY DATA
  ========================================= */

  const reportData = [

    {
      nature:
        "Supplies made to Unregistered Persons",

      state:
        "Delhi",

      taxableValue: 25000,

      igst: 4500
    },

    {
      nature:
        "Supplies made to Unregistered Persons",

      state:
        "Uttar Pradesh",

      taxableValue: 18000,

      igst: 3240
    }

  ];

  /* =========================================
      SAFE CELL WRITER
  ========================================= */

  const setCellValue = (
    workbook,
    sheetName,
    cell,
    value
  ) => {

    const sheet =
      workbook.Sheets[sheetName];

    if (!sheet) return;

    if (!sheet[cell]) {

      sheet[cell] = {

        t:
          typeof value === "number"
            ? "n"
            : "s",

        v: value

      };

    } else {

      sheet[cell].v = value;

    }

  };

  /* =========================================
      SOFTWARE EXCEL
      SAME TEMPLATE DOWNLOAD
  ========================================= */

  const downloadSoftwareExcel =
    async () => {

    try {

      /* LOAD TEMPLATE */

      const response =
        await fetch(
          "/templates/GSTR-3B Month-Yearly Report (2025-26) TAXMATE TECHNOLOGY PRIVATE LIMITED.xlsx"
        );

      if (!response.ok) {

        throw new Error(
          "Software template not found."
        );

      }

      const arrayBuffer =
        await response.arrayBuffer();

      const workbook =
        XLSX.read(arrayBuffer, {

          type: "array",

          cellStyles: true,

          cellFormula: true,

          cellDates: true

        });

      /* =========================================
          GSTR-3B - 3.1
      ========================================= */

      setCellValue(
        workbook,
        "GSTR-3B - 3.1",
        "D5",
        "09ABCDE1234F1Z5"
      );

      setCellValue(
        workbook,
        "GSTR-3B - 3.1",
        "D6",
        "TAXMATE TECHNOLOGY PRIVATE LIMITED"
      );

      setCellValue(
        workbook,
        "GSTR-3B - 3.1",
        "D7",
        "TAXMATE TECHNOLOGY PRIVATE LIMITED"
      );

      /* =========================================
          3.2 SHEET
      ========================================= */

      reportData.forEach(
        (item, index) => {

        const row =
          index + 3;

        setCellValue(
          workbook,
          "GSTR-3B - 3.2",
          `A${row}`,
          item.nature
        );

        setCellValue(
          workbook,
          "GSTR-3B - 3.2",
          `B${row}`,
          item.state
        );

        setCellValue(
          workbook,
          "GSTR-3B - 3.2",
          `C${row}`,
          item.taxableValue
        );

        setCellValue(
          workbook,
          "GSTR-3B - 3.2",
          `D${row}`,
          item.igst
        );

      });

      /* =========================================
          WRITE FILE
      ========================================= */

      const excelBuffer =
        XLSX.write(workbook, {

          type: "array",

          bookType: "xlsx",

          cellStyles: true

        });

      saveAs(

        new Blob(
          [excelBuffer],
          {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
        ),

        "Software_GSTR3B_Report.xlsx"

      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to generate software excel."
      );

    }

  };



/* =========================================
    PDF DOWNLOAD
========================================= */

const downloadPDF =
  () => {

  const doc =
    new jsPDF();

  /* =========================================
      TITLE
  ========================================= */

  doc.setFontSize(18);

  doc.text(
    "GSTR-3B Report",
    14,
    20
  );

  /* =========================================
      COMPANY DETAILS
  ========================================= */

  doc.setFontSize(11);

  doc.text(
    "Company : TAXMATE TECHNOLOGY PRIVATE LIMITED",
    14,
    32
  );

  doc.text(
    "GSTIN : 09ABCDE1234F1Z5",
    14,
    40
  );

  doc.text(
    `Mode : ${
      mode === "month"
        ? "Monthly"
        : "Quarterly"
    }`,
    14,
    48
  );

  /* =========================================
      TABLE
  ========================================= */

  autoTable(doc, {

    startY: 60,

    head: [

      [

        "Nature Of Supply",

        "State",

        "Taxable Value",

        "IGST"

      ]

    ],

    body: reportData.map(
      (item) => [

      item.nature,

      item.state,

      item.taxableValue,

      item.igst

    ]),

    styles: {

      fontSize: 10

    },

    headStyles: {

      fillColor: [41, 128, 185]

    }

  });

  /* =========================================
      SAVE PDF
  ========================================= */

  doc.save(
    "GSTR3B_Report.pdf"
  );

};



  /* =========================================
      MAIN HANDLER
  ========================================= */

  const handleDownload =
    async () => {

    if (
      fileType ===
      "software_excel"
    ) {

      await downloadSoftwareExcel();

      return;

    }

    if (
      fileType === "pdf"
    ) {

      downloadPDF();

    }

  };

  return (

    <div
      className={`main ${
        collapsed
          ? "collapsed"
          : ""
      }`}
    >

      <div className="gstr-container">

        <h2 className="gstr-title">
          GSTR-3B Report
        </h2>

        <div className="gstr-card">

          {/* LEFT */}

          <div className="gstr-left">

            <div className="gstr-switch-row">

              <span
                className={
                  mode === "month"
                    ? "label active"
                    : "label"
                }
              >
                Month
              </span>

              <div
                className={`gstr-switch ${
                  mode === "quarter"
                    ? "right"
                    : ""
                }`}
                onClick={() =>
                  setMode((prev) =>
                    prev === "month"
                      ? "quarter"
                      : "month"
                  )
                }
              >

                <div className="gstr-switch-thumb"></div>

              </div>

              <span
                className={
                  mode === "quarter"
                    ? "label active"
                    : "label"
                }
              >
                Quarterly
              </span>

            </div>

            {mode === "month" ? (

              <input
                type="month"
                className="gstr-input"
                value={month}
                onChange={(e) =>
                  setMonth(
                    e.target.value
                  )
                }
              />

            ) : (

              <select
                className="gstr-input"
                value={quarter}
                onChange={(e) =>
                  setQuarter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Quarter
                </option>

                <option value="Q1">
                  Q1 (Apr - Jun)
                </option>

                <option value="Q2">
                  Q2 (Jul - Sep)
                </option>

                <option value="Q3">
                  Q3 (Oct - Dec)
                </option>

                <option value="Q4">
                  Q4 (Jan - Mar)
                </option>

              </select>

            )}

          </div>

          {/* RIGHT */}

          <div className="gstr-right">

            <label>
              Type of File
            </label>

            <select
              className="gstr-input"
              value={fileType}
              onChange={(e) =>
                setFileType(
                  e.target.value
                )
              }
            >

              <option value="software_excel">
                Software Excel
              </option>

              <option value="pdf">
                PDF
              </option>

            </select>

          </div>

        </div>

        {/* DOWNLOAD */}

        <div className="gstr-action">

          <button
            className="gstr-download-btn"
            onClick={handleDownload}
          >
            ⬇ Download
          </button>

        </div>

      </div>

    </div>

  );

};

export default GSTR1Report;

