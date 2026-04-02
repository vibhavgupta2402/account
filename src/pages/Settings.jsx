import { useOutletContext } from "react-router-dom";

export default function Settings() {
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>Settings Page</div>;
}
