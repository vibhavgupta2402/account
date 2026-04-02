import { useOutletContext } from "react-router-dom";

export default function Documents() {
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>Documents Page</div>;
}
