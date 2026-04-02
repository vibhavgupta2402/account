import { useOutletContext } from "react-router-dom";

export default function About() {
  const { collapsed } = useOutletContext();
  return <div className={`main ${collapsed ? "collapsed" : ""}`}>About Page</div>;
}
