import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function Customers() {

const { collapsed } = useOutletContext();

const [customer,setCustomer] = useState({});

return (

<div className={`main ${collapsed ? "collapsed" : ""}`}>

<div className="customer-page">

<h2>Add Customer</h2>

<div className="customer-form">

{/* LEFT SIDE */}
<div className="form-left">

<div className="form-row">
<input placeholder="GSTIN / URP"
onChange={(e)=>setCustomer({...customer,gstin:e.target.value})}
/>

<button className="get-btn">Get Data</button>
</div>

<input placeholder="Party Name"
onChange={(e)=>setCustomer({...customer,name:e.target.value})}
/>

<input placeholder="Billing Address 1"
onChange={(e)=>setCustomer({...customer,address1:e.target.value})}
/>

<input placeholder="Billing Address 2"
onChange={(e)=>setCustomer({...customer,address2:e.target.value})}
/>

<input placeholder="Pin"
onChange={(e)=>setCustomer({...customer,pin:e.target.value})}
/>

<select
onChange={(e)=>setCustomer({...customer,state:e.target.value})}
>
<option>Select State</option>
<option>Uttar Pradesh</option>
<option>Delhi</option>
<option>Maharashtra</option>
<option>Gujarat</option>
</select>

<input placeholder="Contact No"
onChange={(e)=>setCustomer({...customer,contact:e.target.value})}
/>

<input placeholder="Email ID"
onChange={(e)=>setCustomer({...customer,email:e.target.value})}
/>

<input placeholder="PAN"
onChange={(e)=>setCustomer({...customer,pan:e.target.value})}
/>

<div className="form-row">
<input placeholder="Opening Balance"
onChange={(e)=>setCustomer({...customer,balance:e.target.value})}
/>

<select
onChange={(e)=>setCustomer({...customer,drcr:e.target.value})}
>
<option>Dr</option>
<option>Cr</option>
</select>
</div>

</div>

{/* RIGHT SIDE */}
<div className="form-right">

<label>Registration Type</label>

<select
onChange={(e)=>setCustomer({...customer,registration:e.target.value})}
>

<option>Select</option>

<option>Composition</option>
<option>Regular</option>
<option>Unregistered / Consumer</option>
<option>Government Entity / TDS</option>
<option>Regular - SEZ</option>
<option>Regular - Exports (EOU)</option>
<option>E-Commerce Operator</option>
<option>Input Service Distributor</option>
<option>Embassy / UN Body</option>
<option>Non Resident Taxpayer</option>

</select>

</div>

</div>

<button className="save-btn">Save Customer</button>

</div>

</div>

);
}