import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import "../styles/GSTR1Report.css";
import * as XLSX from "xlsx";

const GSTR1Report = () => {
  const { collapsed } = useOutletContext();
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [fileType, setFileType] = useState("software_excel");
  /* =========================================
      DUMMY ERP DATA
      FUTURE -> BACKEND API DATA
  ========================================= */
  const voucherData = {

  general: [
    {
      gstin: "09ABCDE1234F1Z5",
      legalName: "SmartGST Pvt Ltd",
      tradeName: "SmartGST",
      returnPeriod: "April 2026",
      financialYear: "2026-27"
    }
  ],

  b2b: [
    {
      gstin: "09ABCDE1234F1Z5",
      receiver: "ABC Traders",
      invoiceNo: "INV001",
      invoiceDate: "01-04-2026",
      invoiceValue: 25000,
      placeOfSupply: "09-Uttar Pradesh",
      reverseCharge: "N",
      invoiceType: "Regular",
      ecommerceGSTIN: "",
      gstRate: 18,
      taxableValue: 21000,
      cess: 0
    }
  ],

  b2cLarge: [
    {
      invoiceNo: "B2CL001",
      invoiceDate: "05-04-2026",
      invoiceValue: 500000,
      placeOfSupply: "27-Maharashtra",
      applicableTaxRate: "",
      gstRate: 18,
      taxableValue: 423728,
      cess: 0,
      ecommerceGSTIN: ""
    }
  ],

  export: [
    {
      exportType: "WPAY",
      invoiceNo: "EXP001",
      invoiceDate: "06-04-2026",
      invoiceValue: 100000,
      portCode: "INDEL1",
      shippingBillNo: "SB001",
      shippingBillDate: "07-04-2026",
      gstRate: 18,
      taxableValue: 84745,
      cess: 0
    }
  ],

  nilRated: [
    {
      description: "Nil Rated Sales",
      nilRated: 5000,
      exempted: 2000,
      nonGst: 0
    }
  ],

  crdr: [
    {
      gstin: "09ABCDE1234F1Z5",
      receiver: "ABC Traders",
      noteNo: "CN001",
      noteDate: "10-04-2026",
      noteType: "Credit",
      placeOfSupply: "09-Uttar Pradesh",
      gstRate: 18,
      taxableValue: 1000,
      cess: 0
    }
  ],

  crdrUnregistered: [
    {
      noteNo: "CN002",
      noteDate: "11-04-2026",
      noteType: "Debit",
      placeOfSupply: "27-Maharashtra",
      gstRate: 18,
      taxableValue: 2000,
      cess: 0
    }
  ],

  advanceReceived: [
    {
      placeOfSupply: "09-Uttar Pradesh",
      gstRate: 18,
      grossAdvance: 50000,
      cess: 0
    }
  ],

  advanceAdjusted: [
    {
      placeOfSupply: "09-Uttar Pradesh",
      gstRate: 18,
      grossAdvanceAdjusted: 20000,
      cess: 0
    }
  ],

  hsnSummary: [
    {
      hsn: "8471",
      description: "Computer",
      uqc: "PCS",
      quantity: 10,
      totalValue: 500000,
      taxableValue: 423728,
      igst: 38136,
      cgst: 0,
      sgst: 0,
      cess: 0
    }
  ],

  documentIssued: [
    {
      nature: "Invoices",
      from: "INV001",
      to: "INV200",
      total: 200,
      cancelled: 2
    }
  ],

  ecomSupplies: [
    {
      gstin: "29ABCDE1234F1Z5",
      supplyValue: 50000,
      rate: 18,
      taxableValue: 42372,
      cess: 0
    }
  ],

  ecomSupplies9_5: [
    {
      gstin: "29ABCDE1234F1Z5",
      supplyValue: 10000,
      rate: 5,
      taxableValue: 9523,
      cess: 0
    }
  ]

};
  /* =========================================
      EXCEL SHEET HEADERS
  ========================================= */
  const sheetHeaders = {

  general: [
    "GSTIN",
    "Legal Name",
    "Trade Name",
    "Return Period",
    "Financial Year"
  ],

  b2b: [
    "GSTIN/UIN of Recipient",
    "Receiver Name",
    "Invoice Number",
    "Invoice Date",
    "Invoice Value",
    "Place Of Supply",
    "Reverse Charge",
    "Invoice Type",
    "E-Commerce GSTIN",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ],

  b2cLarge: [
    "Invoice Number",
    "Invoice Date",
    "Invoice Value",
    "Place Of Supply",
    "Applicable % of Tax Rate",
    "Rate",
    "Taxable Value",
    "Cess Amount",
    "E-Commerce GSTIN"
  ],

  export: [
    "Export Type",
    "Invoice Number",
    "Invoice Date",
    "Invoice Value",
    "Port Code",
    "Shipping Bill Number",
    "Shipping Bill Date",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ],

  nilRated: [
    "Description",
    "Nil Rated Supplies",
    "Exempted Supplies",
    "Non GST Supplies"
  ],

  crdr: [
    "GSTIN/UIN",
    "Receiver Name",
    "Note Number",
    "Note Date",
    "Note Type",
    "Place Of Supply",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ],

  crdrUnregistered: [
    "Note Number",
    "Note Date",
    "Note Type",
    "Place Of Supply",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ],

  advanceReceived: [
    "Place Of Supply",
    "Rate",
    "Gross Advance Received",
    "Cess Amount"
  ],

  advanceAdjusted: [
    "Place Of Supply",
    "Rate",
    "Gross Advance Adjusted",
    "Cess Amount"
  ],

  hsnSummary: [
    "HSN",
    "Description",
    "UQC",
    "Total Quantity",
    "Total Value",
    "Taxable Value",
    "Integrated Tax Amount",
    "Central Tax Amount",
    "State/UT Tax Amount",
    "Cess Amount"
  ],

  documentIssued: [
    "Nature Of Document",
    "Sr. No. From",
    "Sr. No. To",
    "Total Number",
    "Cancelled"
  ],

  ecomSupplies: [
    "GSTIN of E-Commerce Operator",
    "Supply Value",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ],

  ecomSupplies9_5: [
    "GSTIN of E-Commerce Operator",
    "Supply Value",
    "Rate",
    "Taxable Value",
    "Cess Amount"
  ]

};

  /* =========================================
      DOWNLOAD EXCEL
  ========================================= */

  const handleDownload = async () => {
    
  /* =========================================
    GOVERNMENT EXCEL DOWNLOAD
  ========================================= */

 
/* =========================================
    GOVERNMENT EXCEL DOWNLOAD
========================================= */

if (fileType === "govt_excel") {

  try {

    /* LOAD GOVT TEMPLATE */

    const response = await fetch(
      "/templates/GSTR1_Excel_Workbook_Template_V2.2.xlsx"
    );

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
      type: "array",
      cellStyles: true,
      cellFormula: true,
      cellDates: true
    });

    /* =========================================
       HELPER FUNCTION
    ========================================= */

    const insertRows = (
      sheetName,
      rows,
      startCell
    ) => {

      const worksheet =
        workbook.Sheets[sheetName];

      if (!worksheet) {
        console.log(
          `${sheetName} sheet not found`
        );
        return;
      }

      XLSX.utils.sheet_add_aoa(
        worksheet,
        rows,
        {
          origin: startCell
        }
      );

    };

    /* =========================================
       B2B SHEET
    ========================================= */

    const b2bRows =
      voucherData.b2b.map((item) => [
        item.gstin,
        item.receiver,
        item.invoiceNo,
        item.invoiceDate,
        item.invoiceValue,
        item.placeOfSupply,
        item.reverseCharge,
        item.invoiceType,
        item.ecommerceGSTIN,
        item.gstRate,
        item.taxableValue,
        item.cess
      ]);

    insertRows(
      "b2b,sez,de",
      b2bRows,
      "A5"
    );

    /* =========================================
       B2CL SHEET
    ========================================= */

    const b2clRows =
      voucherData.b2cLarge.map((item) => [
        item.invoiceNo,
        item.invoiceDate,
        item.invoiceValue,
        item.placeOfSupply,
        item.applicableTaxRate,
        item.gstRate,
        item.taxableValue,
        item.cess,
        item.ecommerceGSTIN
      ]);

    insertRows(
      "b2cl",
      b2clRows,
      "A5"
    );

    /* =========================================
       EXPORT SHEET
    ========================================= */

    const exportRows =
      voucherData.export.map((item) => [
        item.exportType,
        item.invoiceNo,
        item.invoiceDate,
        item.invoiceValue,
        item.portCode,
        item.shippingBillNo,
        item.shippingBillDate,
        item.gstRate,
        item.taxableValue,
        item.cess
      ]);

    insertRows(
      "exp",
      exportRows,
      "A5"
    );

    /* =========================================
       HSN SHEET
    ========================================= */

    const hsnRows =
      voucherData.hsnSummary.map((item) => [
        item.hsn,
        item.description,
        item.uqc,
        item.quantity,
        item.totalValue,
        item.taxableValue,
        item.igst,
        item.cgst,
        item.sgst,
        item.cess
      ]);

    insertRows(
      "hsn(b2b)",
      hsnRows,
      "A5"
    );

    /* =========================================
       DOCS SHEET
    ========================================= */

    const docsRows =
      voucherData.documentIssued.map((item) => [
        item.nature,
        item.from,
        item.to,
        item.total,
        item.cancelled
      ]);

    insertRows(
      "docs",
      docsRows,
      "A5"
    );

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
      "Govt_GSTR1_Report.xlsx"
    );

    return;

  } catch (error) {

    console.error(error);

    alert(
      "Government Excel generation failed."
    );

    return;
  }
}



    /* JSON */
    if (fileType === "json") {
      const blob = new Blob(
        [JSON.stringify(voucherData, null, 2)],
        {
          type: "application/json"
        }
      );
      saveAs(blob, "GSTR1_Report.json");
      return;
    }

    /* EXCEL */
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "SmartGST ERP";
    workbook.created = new Date();
    /* CREATE SHEETS */
    Object.keys(sheetHeaders).forEach(
      (sheetName) => {
        const worksheet =
          workbook.addWorksheet(sheetName);
        /* HEADERS */
        worksheet.addRow(
          sheetHeaders[sheetName]
        );
        const headerRow = worksheet.getRow(1);
        headerRow.height = 24;
        headerRow.eachCell((cell) => {
          cell.font = {
            bold: true,
            color: {
              argb: "FFFFFFFF"
            },
            size: 11
          };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: "4F46E5"
            }
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: "center"
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
          };
        });
        /* DATA */
        /* =========================================
            ROW MAPPING
          ========================================= */

          const rowMapping = {

            general: (item) => [
              item.gstin,
              item.legalName,
              item.tradeName,
              item.returnPeriod,
              item.financialYear
            ],

            b2b: (item) => [
              item.gstin,
              item.receiver,
              item.invoiceNo,
              item.invoiceDate,
              item.invoiceValue,
              item.placeOfSupply,
              item.reverseCharge,
              item.invoiceType,
              item.ecommerceGSTIN,
              item.gstRate,
              item.taxableValue,
              item.cess
            ],

            b2cLarge: (item) => [
              item.invoiceNo,
              item.invoiceDate,
              item.invoiceValue,
              item.placeOfSupply,
              item.applicableTaxRate,
              item.gstRate,
              item.taxableValue,
              item.cess,
              item.ecommerceGSTIN
            ],

            export: (item) => [
              item.exportType,
              item.invoiceNo,
              item.invoiceDate,
              item.invoiceValue,
              item.portCode,
              item.shippingBillNo,
              item.shippingBillDate,
              item.gstRate,
              item.taxableValue,
              item.cess
            ],

            nilRated: (item) => [
              item.description,
              item.nilRated,
              item.exempted,
              item.nonGst
            ],

            crdr: (item) => [
              item.gstin,
              item.receiver,
              item.noteNo,
              item.noteDate,
              item.noteType,
              item.placeOfSupply,
              item.gstRate,
              item.taxableValue,
              item.cess
            ],

            crdrUnregistered: (item) => [
              item.noteNo,
              item.noteDate,
              item.noteType,
              item.placeOfSupply,
              item.gstRate,
              item.taxableValue,
              item.cess
            ],

            advanceReceived: (item) => [
              item.placeOfSupply,
              item.gstRate,
              item.grossAdvance,
              item.cess
            ],

            advanceAdjusted: (item) => [
              item.placeOfSupply,
              item.gstRate,
              item.grossAdvanceAdjusted,
              item.cess
            ],

            hsnSummary: (item) => [
              item.hsn,
              item.description,
              item.uqc,
              item.quantity,
              item.totalValue,
              item.taxableValue,
              item.igst,
              item.cgst,
              item.sgst,
              item.cess
            ],

            documentIssued: (item) => [
              item.nature,
              item.from,
              item.to,
              item.total,
              item.cancelled
            ],

            ecomSupplies: (item) => [
              item.gstin,
              item.supplyValue,
              item.rate,
              item.taxableValue,
              item.cess
            ],

            ecomSupplies9_5: (item) => [
              item.gstin,
              item.supplyValue,
              item.rate,
              item.taxableValue,
              item.cess
            ]

          };

          /* =========================================
            GET ROWS
          ========================================= */

          const rows = voucherData[sheetName] || [];

          /* =========================================
            ADD ROWS
          ========================================= */

          rows.forEach((item) => {

            const row =
              rowMapping[sheetName]
                ? rowMapping[sheetName](item)
                : [];

            worksheet.addRow(row);

          });
        /* COLUMN WIDTH */
        worksheet.columns.forEach(
          (column) => {
            column.width = 24;
          }
        );
        worksheet.views = [
          {
            state: "frozen",
            ySplit: 1
          }
        ];
        worksheet.autoFilter = {
          from: "A1",
          to: "Z1"
        };
        /* BODY STYLE */
        worksheet.eachRow(
          (row, rowNumber) => {
            if (rowNumber !== 1) {
              row.eachCell((cell) => {
                cell.border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" }
                };
                cell.alignment = {
                  vertical: "middle",
                  horizontal: "left"
                };
                if (rowNumber % 2 === 0) {
                  cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: {
                      argb: "F8FAFC"
                    }
                  };
                }
              });
            }
          }
        );

        /* DROPDOWN */
        if (sheetName === "b2b") {
          worksheet.dataValidations.add(
            "G2:G500",
            {
              type: "list",
              allowBlank: true,
              formulae: ['"Y,N"']
            }
          );
          worksheet.dataValidations.add(
            "H2:H500",
            {
              type: "list",
              allowBlank: true,
              formulae: [
                '"Regular B2B,SEZWP,SEZWOP"'
              ]
            }
          );
        }
      }
    );

    /* SAVE FILE */
    const buffer =
      await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      fileType === "govt_excel"
        ? "Govt_GSTR1_Report.xlsx"
        : "Software_GSTR1_Report.xlsx"
    );
  };
  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      <div className="gstr-container">
        {/* HEADER */}
        <div className="gstr-header">
          <div>
            <h2 className="gstr-title">
              GSTR-1 Report
            </h2>
            {/* <p className="gstr-subtitle">
              Download GST ready report
              for Software / Govt Portal
            </p> */}
          </div>
        </div>
        {/* CARD */}
        <div className="gstr-card">
          {/* LEFT */}
          <div className="gstr-left">
            {/* SWITCH */}
            <div className="gstr-switch-row">
              <span className={mode === "month" ? "label active": "label"}>
                Month
              </span>
              <div className={`gstr-switch ${mode === "quarter"? "right": ""}`}
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
            {/* MONTH */}
            {mode === "month" ? (
              <input
                type="month"
                className="gstr-input"
                value={month}
                onChange={(e) =>
                  setMonth(e.target.value)
                }
              />
            ) : (
              <select
                className="gstr-input"
                value={quarter}
                onChange={(e) =>
                  setQuarter(e.target.value)
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
            <label>Type of File</label>
            <select className="gstr-input" value={fileType}onChange={(e) =>setFileType(e.target.value)}>
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
        {/* ACTION */}
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