import { useOutletContext } from "react-router-dom";

export default function AddPurchase() {
  const { collapsed } = useOutletContext();

  return (
    <div className={`main ${collapsed ? "collapsed" : ""}`}>
      Add Purchase Page
    </div>
  );
}
