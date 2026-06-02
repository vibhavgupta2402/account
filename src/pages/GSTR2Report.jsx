
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../styles/GSTR1Report.css";

const GSTR1Report = () => {

  /* =========================================
      STATES
  ========================================= */

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
      LATER API DATA
  ========================================= */

  const purchaseData = [

    {
      gstin: "09ABCDE1234F1Z5",
      supplier: "ABC Traders",
      invoiceNo: "PUR-001",
      invoiceDate: "01/04/2025",
      invoiceValue: 25000,
      placeOfSupply: "Uttar Pradesh",
      reverseCharge: "No",
      invoiceType: "Regular",
      rate: 18,
      taxableValue: 21186,
      cess: 0
    },

    {
      gstin: "07PQRSX5678K1Z2",
      supplier: "XYZ Enterprises",
      invoiceNo: "PUR-002",
      invoiceDate: "03/04/2025",
      invoiceValue: 42000,
      placeOfSupply: "Delhi",
      reverseCharge: "No",
      invoiceType: "Regular",
      rate: 18,
      taxableValue: 35593,
      cess: 0
    },

    {
      gstin: "24AAACB2894G1ZT",
      supplier: "Lavi India Industries",
      invoiceNo: "PUR-003",
      invoiceDate: "04/04/2025",
      invoiceValue: 65000,
      placeOfSupply: "Gujarat",
      reverseCharge: "No",
      invoiceType: "Regular",
      rate: 18,
      taxableValue: 55084,
      cess: 0
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

    if (!sheet) {

      console.error(
        `Sheet not found: ${sheetName}`
      );

      return;

    }

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
  ========================================= */

/* =========================================
    SOFTWARE EXCEL
========================================= */

const downloadSoftwareExcel =
  () => {

  const workbook =
    XLSX.utils.book_new();

  /* =========================================
      COMMON HEADER
  ========================================= */

  const commonHeaders = [

    [

      "GSTIN",
      "Supplier Name",
      "Invoice No",
      "Invoice Date",
      "Invoice Value",
      "Place Of Supply",
      "Reverse Charge",
      "Invoice Type",
      "GST Rate",
      "Taxable Value",
      "CESS"

    ]

  ];

  /* =========================================
      COMMON DATA
  ========================================= */

  const commonRows =
    purchaseData.map(
      (item) => [
      item.gstin,
      item.supplier,
      item.invoiceNo,
      item.invoiceDate,
      item.invoiceValue,
      item.placeOfSupply,
      item.reverseCharge,
      item.invoiceType,
      item.rate,
      item.taxableValue,
      item.cess

    ]);

  /* =========================================
      CREATE SHEET FUNCTION
  ========================================= */

  const createSheet = (
    sheetName,
    data
  ) => {

    const worksheet =
      XLSX.utils.aoa_to_sheet(
        data
      );

    worksheet["!cols"] = [

      { wch: 20 },
      { wch: 28 },
      { wch: 18 },
      { wch: 16 },
      { wch: 18 },
      { wch: 22 },
      { wch: 18 },
      { wch: 18 },
      { wch: 12 },
      { wch: 18 },
      { wch: 12 }

    ];

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      sheetName
    );

  };

  /* =========================================
      GENERAL
  ========================================= */

  createSheet(

    "General",

    [

      [
        "Company Name",
        "GSTIN",
        "Financial Year"
      ],

      [
        "Tax Mate enterprices",
        "09ABCDE1234F1Z5",
        "2024-25"
      ]

    ]

  );

  /* =========================================
      B2B
  ========================================= */

  createSheet(
    "B2B",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      EXPORT
  ========================================= */

  createSheet(
    "Export",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      REVERSE CHARGE
  ========================================= */

  createSheet(
    "Reverse charge",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      IMPORT GOODS
  ========================================= */

  createSheet(
    "Import Goods",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      CR.DR
  ========================================= */

  createSheet(
    "Cr.Dr",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      CR.DR UNREGISTERED
  ========================================= */

  createSheet(
    "Cr.Dr Unregistered",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      NIL RATED
  ========================================= */

  createSheet(
    "Nil Rated",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      ISD
  ========================================= */

  createSheet(
    "ISD",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      TDS and TCS
  ========================================= */

  createSheet(
    "TDS and TCS",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      ADVANCE PAID
  ========================================= */

  createSheet(
    "Advance Paid",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      ADVANCE ADJUSTED
  ========================================= */

  createSheet(
    "Advance Adjusted",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      ITC REVERSAL
  ========================================= */

  createSheet(
    "ITC Reversal",
    [
      ...commonHeaders,
      ...commonRows
    ]
  );

  /* =========================================
      HSN SUMMARY
  ========================================= */

  createSheet(

    "HSN Summary",

    [

      [
        "HSN Code",
        "Description",
        "Taxable Value",
        "GST Rate"
      ],

      ...purchaseData.map(
        (item) => [

        "5208",

        "Cotton Fabric",

        item.taxableValue,

        item.rate

      ])

    ]

  );

  /* =========================================
      MASTER
  ========================================= */

  createSheet(

    "Master",

    [

      [
        "System"
      ],

      [
        "Generated By ERP"
      ]

    ]

  );

  /* =========================================
      DROPDOWNS
  ========================================= */

  createSheet(

    "Dropdowns",

    [

      [
        "Dropdown Values"
      ],

      [
        "Regular"
      ],

      [
        "SEZ"
      ],

      [
        "Composition"
      ]

    ]

  );

  /* =========================================
      WRITE FILE
  ========================================= */

  const excelBuffer =
    XLSX.write(workbook, {

      type: "array",

      bookType: "xlsx"

    });

  saveAs(

    new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    ),

    "Software_GSTR2_Report.xlsx"

  );

};



  /* =========================================
      GOVT EXCEL
  ========================================= */

  const downloadGovtExcel =
    async () => {

    try {

      const response =
        await fetch(
          "/templates/GSTR2_Excel_Workbook_Template_V2.2.xlsx"
        );

      if (!response.ok) {

        throw new Error(
          "Govt template not found."
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
          GENERAL
      ========================================= */

      setCellValue(
        workbook,
        "General",
        "B4",
        "LAVI INDIA INDUSTRIES"
      );

      setCellValue(
        workbook,
        "General",
        "B5",
        "09ABCDE1234F1Z5"
      );

      setCellValue(
        workbook,
        "General",
        "B6",
        "2024-25"
      );

      /* =========================================
          ALL SHEETS
      ========================================= */

      purchaseData.forEach(
        (item, index) => {

        const row =
          index + 8;

        /* B2B */

        setCellValue(
          workbook,
          "B2B",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "B2B",
          `B${row}`,
          item.supplier
        );

        setCellValue(
          workbook,
          "B2B",
          `C${row}`,
          item.invoiceNo
        );

        setCellValue(
          workbook,
          "B2B",
          `D${row}`,
          item.invoiceDate
        );

        setCellValue(
          workbook,
          "B2B",
          `E${row}`,
          item.invoiceValue
        );

        setCellValue(
          workbook,
          "B2B",
          `F${row}`,
          item.taxableValue
        );

        setCellValue(
          workbook,
          "B2B",
          `G${row}`,
          item.rate
        );

        /* EXPORT */

        setCellValue(
          workbook,
          "Export",
          `A${row}`,
          item.invoiceNo
        );

        setCellValue(
          workbook,
          "Export",
          `B${row}`,
          item.invoiceDate
        );

        setCellValue(
          workbook,
          "Export",
          `C${row}`,
          item.invoiceValue
        );

        /* REVERSE CHARGE */

        setCellValue(
          workbook,
          "Reverse charge",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "Reverse charge",
          `B${row}`,
          item.supplier
        );

        /* IMPORT GOODS */

        setCellValue(
          workbook,
          "Import Goods",
          `A${row}`,
          item.invoiceNo
        );

        setCellValue(
          workbook,
          "Import Goods",
          `B${row}`,
          item.invoiceValue
        );

        /* CR.DR */

        setCellValue(
          workbook,
          "Cr.Dr",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "Cr.Dr",
          `B${row}`,
          item.supplier
        );

        /* CR.DR UNREGISTERED */

        setCellValue(
          workbook,
          "Cr.Dr Unregistered",
          `A${row}`,
          item.supplier
        );

        setCellValue(
          workbook,
          "Cr.Dr Unregistered",
          `B${row}`,
          item.taxableValue
        );

        /* NIL RATED */

        setCellValue(
          workbook,
          "Nil Rated",
          `A${row}`,
          "Inter-State"
        );

        setCellValue(
          workbook,
          "Nil Rated",
          `B${row}`,
          item.taxableValue
        );

        /* ISD */

        setCellValue(
          workbook,
          "ISD",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "ISD",
          `B${row}`,
          item.invoiceNo
        );

        /* TDS AND TCS */

        setCellValue(
          workbook,
          "TDS and TCS",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "TDS and TCS",
          `B${row}`,
          item.taxableValue
        );

        /* ADVANCE PAID */

        setCellValue(
          workbook,
          "Advance Paid",
          `A${row}`,
          item.invoiceDate
        );

        setCellValue(
          workbook,
          "Advance Paid",
          `B${row}`,
          item.taxableValue
        );

        /* ADVANCE ADJUSTED */

        setCellValue(
          workbook,
          "Advance Adjusted",
          `A${row}`,
          item.invoiceDate
        );

        setCellValue(
          workbook,
          "Advance Adjusted",
          `B${row}`,
          item.taxableValue
        );

        /* ITC REVERSAL */

        setCellValue(
          workbook,
          "ITC Reversal",
          `A${row}`,
          item.gstin
        );

        setCellValue(
          workbook,
          "ITC Reversal",
          `B${row}`,
          item.taxableValue
        );

        /* HSN SUMMARY */

        setCellValue(
          workbook,
          "HSN Summary",
          `A${row}`,
          "5208"
        );

        setCellValue(
          workbook,
          "HSN Summary",
          `B${row}`,
          "Cotton Fabric"
        );

        setCellValue(
          workbook,
          "HSN Summary",
          `C${row}`,
          item.taxableValue
        );

        /* MASTER */

        setCellValue(
          workbook,
          "Master",
          `A${row}`,
          "System Generated"
        );

        /* DROPDOWNS */

        setCellValue(
          workbook,
          "Dropdowns",
          `A${row}`,
          "Auto Filled"
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

        "Govt_GSTR2_Report.xlsx"

      );

    } catch (error) {

      console.error(
        "Govt Excel Error:",
        error
      );

      alert(
        error.message ||
        "Unable to generate govt excel."
      );

    }

  };

  /* =========================================
      JSON DOWNLOAD
  ========================================= */

  const downloadJSON =
    () => {

    const jsonBlob =
      new Blob(

        [
          JSON.stringify(
            purchaseData,
            null,
            2
          )
        ],

        {
          type:
            "application/json"
        }

      );

    saveAs(
      jsonBlob,
      "GSTR2_Report.json"
    );

  };

  /* =========================================
      MAIN DOWNLOAD HANDLER
  ========================================= */

  const handleDownload =
    async () => {

    if (
      fileType ===
      "software_excel"
    ) {

      downloadSoftwareExcel();

      return;

    }

    if (
      fileType ===
      "govt_excel"
    ) {

      await downloadGovtExcel();

      return;

    }

    if (
      fileType === "json"
    ) {

      downloadJSON();

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
          GSTR-2 Report
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

              <option value="govt_excel">
                Govt Excel
              </option>

              <option value="json">
                JSON
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

