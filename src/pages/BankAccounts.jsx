import { useOutletContext } from "react-router-dom";

export default function BankAccounts() {
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>Bank Accounts Page</div>;
}
