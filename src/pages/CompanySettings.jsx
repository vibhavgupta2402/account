
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import "../styles/CompanySettings.css";

const settingsOptions = [
  {
    title: "Create Company",
    desc: "Create a new company"
  },

  {
    title: "Alter Company",
    desc: "Change all details of the company"
  },

  {
    title: "Connect Company",
    desc: "Connect company to your CA"
  },

  {
    title: "Security",
    desc: "Create ID and Password to secure company"
  },

  {
    title: "Backup & Restore",
    desc: "Make backup and restore company"
  },

  {
    title: "Import Company",
    desc: "Import backup of Tally, Busy, Vyapar etc."
  },

  {
    title: "Language",
    desc: "Select software language with all Indian languages"
  },

  {
    title: "Split Company",
    desc: "Create next FY company with opening balance & inventory"
  },

  {
    title: "Delete Company",
    desc: "Delete company permanently without restore"
  }
];


const CompanySettings = () => {
    const { collapsed } = useOutletContext();
  return (
    <div className={`main ${collapsed ? 'collapsed' : ''}`}>
        <div className="company-settings-page">

        {/* HEADER */}
        <div className="settings-header">

            <div>
            <h1>Company Settings</h1>

            <p>
                Configure and manage your company settings
            </p>
            </div>

        </div>

        {/* GRID */}
        <div className="settings-grid">

            {settingsOptions.map((item, index) => (

            <div
                className={`settings-card ${
                item.title === "Delete Company"
                    ? "danger"
                    : ""
                }`}
                key={index}
            >

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

            </div>

            ))}

        </div>

        </div>
    </div>

  );
};

export default CompanySettings;