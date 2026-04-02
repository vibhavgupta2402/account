import { useOutletContext } from "react-router-dom";

export default function JournalEntries() {
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>Delivery Challan Page</div>;
}
