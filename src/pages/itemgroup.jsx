import { useEffect, useState } from "react";
import "../styles/InventoryMaster.css";
import { useOutletContext } from "react-router-dom";
import { Package2 } from "lucide-react";

const InventoryMaster = () => {

  /* =========================================
      MASTER STATES
  ========================================= */

  const [units, setUnits] = useState([
    "PCS",
    "KGS",
    "BTL"
  ]);

  const [categories, setCategories] = useState([
    "Electronics",
    "Food"
  ]);

  const [godowns, setGodowns] = useState([
    "Main Warehouse"
  ]);

  /* =========================================
      TOP FORM STATES
  ========================================= */

  const [unitForm, setUnitForm] = useState({
    symbol: "",
    code: "",
    decimal: ""
  });
  const { collapsed } = useOutletContext();

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: ""
  });

  const [godownForm, setGodownForm] = useState({
    name: "",
    description: "",
    address: ""
  });

  /* =========================================
      STOCK ITEM FORM
  ========================================= */

  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",

    unit: "",
    category: "",
    godown: "",

    gstApplicable: true,

    hsn: "",
    gstDescription: "",
    taxability: "Taxable",
    gstRate: "",

    supplyType: "Goods",

    qty: "",
    rate: "",
    amount: ""
  });

  /* =========================================
      AUTO AMOUNT
  ========================================= */

  useEffect(() => {

    const qty = Number(itemForm.qty || 0);
    const rate = Number(itemForm.rate || 0);

    setItemForm((prev) => ({
      ...prev,
      amount: qty * rate
    }));

  }, [itemForm.qty, itemForm.rate]);

  /* =========================================
      SAVE FUNCTIONS
  ========================================= */

  const saveUnit = () => {

    if (!unitForm.symbol) return;

    setUnits((prev) => [
      ...prev,
      unitForm.symbol
    ]);

    setUnitForm({
      symbol: "",
      code: "",
      decimal: ""
    });
  };

  const saveCategory = () => {

    if (!categoryForm.name) return;

    setCategories((prev) => [
      ...prev,
      categoryForm.name
    ]);

    setCategoryForm({
      name: "",
      description: ""
    });
  };

  const saveGodown = () => {

    if (!godownForm.name) return;

    setGodowns((prev) => [
      ...prev,
      godownForm.name
    ]);

    setGodownForm({
      name: "",
      description: "",
      address: ""
    });
  };

  /* =========================================
      SAVE ITEM
  ========================================= */

  const saveItem = () => {
    console.log(itemForm);
  };

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <div className="inventory-page">
            {/* =====================================
                    PAGE HEADER
                ===================================== */}

            <div className="inventory-header">
                <div className="inventory-header-left">
                    <div className="inventory-header-icon">
                    <Package2 size={26} />
                    </div>
                    <div>
                    <h1>Item Group</h1>
                    <p>
                        Manage stock items, categories,
                        units and godowns
                    </p>
                    </div>
                </div>
                <div className="inventory-header-right">
                    <div className="inventory-badge">
                     Inventory Module
                    </div>
                </div>
            </div>
        {/* =====================================
            TOP MASTER CARDS
        ===================================== */}
        <div className="inventory-top-grid">
            {/* UNIT */}
            <div className="inventory-card">
                <div className="inventory-card-title">
                    Stock Unit
                </div>
                <div className="inventory-form-group">
                    <label>Symbol</label>
                    <input
                    value={unitForm.symbol}
                    onChange={(e) =>
                        setUnitForm({
                        ...unitForm,
                        symbol: e.target.value
                        })
                    }
                    placeholder="PCS"
                    />
                </div>
                <div className="inventory-form-group">
                    <label>Unit Code</label>
                    <select
                    value={unitForm.code}
                    onChange={(e) =>
                        setUnitForm({
                        ...unitForm,
                        code: e.target.value
                        })
                    }
                    >
                    <option value="">Select</option>
                    <option>PCS - Pieces</option>
                    <option>KGS - Kilograms</option>
                    <option>BTL - Bottles</option>
                    </select>
                </div>
                <div className="inventory-form-group">
                    <label>Decimal Places</label>
                    <input
                    value={unitForm.decimal}
                    onChange={(e) =>
                        setUnitForm({
                        ...unitForm,
                        decimal: e.target.value
                        })
                    }
                    placeholder="2"
                    />
                </div>
                <div className="inventory-actions">
                    <button
                    className="inventory-save-btn"
                    onClick={saveUnit}
                    >
                    Save
                    </button>
                </div>
            </div>
            {/* CATEGORY */}
            <div className="inventory-card">
                <div className="inventory-card-title">
                    Stock Category
                </div>
                <div className="inventory-form-group">
                    <label>Name</label>
                    <input
                    value={categoryForm.name}
                    onChange={(e) =>
                        setCategoryForm({
                        ...categoryForm,
                        name: e.target.value
                        })
                    }
                    placeholder="Electronics"
                    />
                </div>
                <div className="inventory-form-group">
                    <label>Description</label>
                    <textarea
                    rows="3"
                    value={categoryForm.description}
                    onChange={(e) =>
                        setCategoryForm({
                        ...categoryForm,
                        description: e.target.value
                        })
                    }
                    />
                </div>
                <div className="inventory-actions">
                    <button
                    className="inventory-save-btn"
                    onClick={saveCategory}
                    >
                    Save
                    </button>
                </div>
            </div>
            {/* GODOWN */}
            <div className="inventory-card">
                <div className="inventory-card-title">
                    Stock Godown
                </div>
                <div className="inventory-form-group">
                    <label>Name</label>
                    <input
                    value={godownForm.name}
                    onChange={(e) =>
                        setGodownForm({
                        ...godownForm,
                        name: e.target.value
                        })
                    }
                    placeholder="Main Warehouse"
                    />
                </div>
                <div className="inventory-form-group">
                    <label>Description</label>
                    <input
                    value={godownForm.description}
                    onChange={(e) =>
                        setGodownForm({
                        ...godownForm,
                        description: e.target.value
                        })
                    }
                    />
                </div>
                <div className="inventory-form-group">
                    <label>Address</label>
                    <textarea
                    rows="2"
                    value={godownForm.address}
                    onChange={(e) =>
                        setGodownForm({
                        ...godownForm,
                        address: e.target.value
                        })
                    }
                    />
                </div>
                <div className="inventory-actions">
                    <button
                    className="inventory-save-btn"
                    onClick={saveGodown}
                    >
                    Save
                    </button>
                </div>
            </div>
        </div>
        {/* ====================================
            STOCK ITEM
        ===================================== */}
        <div className="inventory-item-card">
            <div className="inventory-main-title">
            Stock Item
            </div>
            <div className="inventory-item-grid">
            {/* LEFT */}
            <div className="inventory-item-section">
                <div className="inventory-form-group">
                <label>Name</label>
                <input
                    value={itemForm.name}
                    onChange={(e) =>
                    setItemForm({
                        ...itemForm,
                        name: e.target.value
                    })
                    }
                />
                </div>
                <div className="inventory-form-group">
                    <label>Unit</label>
                    <select
                        value={itemForm.unit}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            unit: e.target.value
                        })
                        }
                    >
                        <option value="">
                        Select Unit
                        </option>
                        {units.map((u, i) => (
                        <option key={i}>
                            {u}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="inventory-form-group">
                    <label>Description</label>
                    <textarea
                        rows="3"
                        value={itemForm.description}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            description: e.target.value
                        })
                        }
                    />
                </div>
                
                <div className="inventory-form-group">
                <label>Category</label>
                <select
                    value={itemForm.category}
                    onChange={(e) =>
                    setItemForm({
                        ...itemForm,
                        category: e.target.value
                    })
                    }
                >
                    <option value="">
                    Select Category
                    </option>
                    {categories.map((c, i) => (
                    <option key={i}>
                        {c}
                    </option>
                    ))}
                </select>
                </div>
                <div className="inventory-form-group">
                <label>Godown</label>
                <select
                    value={itemForm.godown}
                    onChange={(e) =>
                    setItemForm({
                        ...itemForm,
                        godown: e.target.value
                    })
                    }
                >
                    <option value="">
                    Select Godown
                    </option>
                    {godowns.map((g, i) => (
                    <option key={i}>
                        {g}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            {/* RIGHT */}
            <div className="inventory-item-section">
                <div className="inventory-radio">
                <label>GST Applicable</label>
                <div className="inventory-radio-group">
                    <label>
                    <input
                        type="radio"
                        checked={itemForm.gstApplicable}
                        onChange={() =>
                        setItemForm({
                            ...itemForm,
                            gstApplicable: true
                        })
                        }
                    />
                    Yes
                    </label>
                    <label>
                    <input
                        type="radio"
                        checked={!itemForm.gstApplicable}
                        onChange={() =>
                        setItemForm({
                            ...itemForm,
                            gstApplicable: false
                        })
                        }
                    />
                    No
                    </label>
                </div>
                </div>
                {itemForm.gstApplicable && (
                <>
                    <div className="inventory-form-group">
                    <label>HSN / SAC</label>
                    <input
                        value={itemForm.hsn}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            hsn: e.target.value
                        })
                        }
                    />
                    </div>
                    <div className="inventory-form-group">
                    <label>Description Of Item</label>
                    <input
                        value={itemForm.gstDescription}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            gstDescription:
                            e.target.value
                        })
                        }
                    />
                    </div>
                    <div className="inventory-form-group">
                    <label>Taxability</label>
                    <select
                        value={itemForm.taxability}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            taxability:
                            e.target.value
                        })
                        }
                    >
                        <option>Taxable</option>
                        <option>Exempt</option>
                        <option>Nil GST</option>
                        <option>Non-GST</option>
                    </select>
                    </div>
                    <div className="inventory-form-group">
                    <label>GST Rate</label>
                    <input
                        value={itemForm.gstRate}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            gstRate:
                            e.target.value
                        })
                        }
                        placeholder="18%"
                    />
                    </div>
                    <div className="inventory-form-group">
                    <label>Type Of Supply</label>
                    <select
                        value={itemForm.supplyType}
                        onChange={(e) =>
                        setItemForm({
                            ...itemForm,
                            supplyType:
                            e.target.value
                        })
                        }
                    >
                        <option>Goods</option>
                        <option>Service</option>
                        <option>Capital Goods</option>
                    </select>
                    </div>
                </>
                )}
            </div>
            </div>
            {/* OPENING BALANCE */}
            <div className="inventory-opening">
            <div className="inventory-opening-title">
                Opening Balance
            </div>
            <div className="inventory-opening-grid">
                <div className="inventory-form-group">
                <label>Qty</label>
                <input
                    value={itemForm.qty}
                    onChange={(e) =>
                    setItemForm({
                        ...itemForm,
                        qty: e.target.value
                    })
                    }
                />
                </div>
                <div className="inventory-form-group">
                <label>Rate</label>
                <input
                    value={itemForm.rate}
                    onChange={(e) =>
                    setItemForm({
                        ...itemForm,
                        rate: e.target.value
                    })
                    }
                />
                </div>
                <div className="inventory-form-group">
                <label>Amount</label>
                <input
                    value={itemForm.amount}
                    readOnly
                />
                </div>
            </div>
            </div>
            <div className="inventory-actions">
            <button
                className="inventory-save-btn"
                onClick={saveItem}
            >
                Save Item
            </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default InventoryMaster;