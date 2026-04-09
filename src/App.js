import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import ChartOfAccounts from "./pages/ChartOfAccounts";
import ItemsServices from "./pages/ItemsServices";
import SalesInvoices from "./pages/SalesInvoices";
import PurchaseBills from "./pages/PurchaseBills";
import Receipts from "./pages/Receipts";
import Payments from "./pages/Payments";
import JournalEntries from "./pages/JournalEntries";
import BankAccounts from "./pages/BankAccounts";
import BankReconciliation from "./pages/BankReconciliation";
import Ledger from "./pages/Ledger";
import TrialBalance from "./pages/TrialBalance";
import ProfitLoss from "./pages/ProfitLoss";
import BalanceSheet from "./pages/BalanceSheet";
import CashFlow from "./pages/CashFlow";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import HomeAddSales from "./pages/HomeAddSales";
import HomeAddPurchase from "./pages/HomeAddPurchase";
import SelectCompany from "./pages/SelectCompany";
import CreditNote from "./pages/CreditNote";
import DebitNote from "./pages/DebitNote";
import PaymentInvoice from "./pages/PaymentInvoice";
import Order from "./pages/Order";
import Journal from "./pages/Journal";
import Delivery from "./pages/DeliveryChallan";
import PurchaseOrder from "./pages/PurchaseOrder";
import SaleOrder from "./pages/SaleOrder";
import Ledgerbook from "./pages/Ledgerbook";
import Contra from "./pages/contra";
import Purchase from "./pages/purchasevoucher";
import SaleSummary from "./pages/SaleSummary";
import SaleReturnSummary from "./pages/SaleReturnSummary";


// JournalEntries

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<SelectCompany/>}/>
         <Route path="/select-company" element={<SelectCompany />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/ChartOfAccounts" element={<ChartOfAccounts />} />
          <Route path="/ItemsServices" element={<ItemsServices />} />
          <Route path="/SalesInvoices" element={<SalesInvoices />} />
          <Route path="/PurchaseBills" element={<PurchaseBills />} />
          <Route path="/Receipts" element={<Receipts />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/JournalEntries" element={<JournalEntries />} />
          <Route path="/BankAccounts" element={<BankAccounts />} />
          <Route path="/BankReconciliation" element={<BankReconciliation />} />
          <Route path="/Ledger" element={<Ledger />} />
          <Route path="/Ledgerbook" element={<Ledgerbook />} />
          <Route path="/TrialBalance" element={<TrialBalance />} />
          <Route path="/ProfitLoss" element={<ProfitLoss />} />
          <Route path="/BalanceSheet" element={<BalanceSheet />} />
          <Route path="/CashFlow" element={<CashFlow />} />
          <Route path="/Documents" element={<Documents />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/creditnote" element={<CreditNote />} />
          <Route path="/debitnote" element={<DebitNote />} />
          <Route path="/paymentinvoice" element={<PaymentInvoice />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Journal" element={<Journal />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/PurchaseOrder" element={<PurchaseOrder />} />
          <Route path="/SaleOrder" element={<SaleOrder />} />
          <Route path="/contra" element={<Contra/>} />
          <Route path="/purchasevoucher" element={<Purchase/>} />
          <Route path="/SaleSummary" element={<SaleSummary/>} />
          <Route path="/SaleReturnSummary" element={<SaleReturnSummary/>} />
        


         
          
        </Route>
        <Route path="/HomeAddSales" element={<HomeAddSales />} />
        <Route path="/HomeAddPurchase" element={<HomeAddPurchase />} />
      </Routes>
    </BrowserRouter>
  );
}
