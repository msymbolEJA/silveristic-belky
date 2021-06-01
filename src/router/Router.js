import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";

//import createHistory from "history/createBrowserHistory";

// Pages
import Dashboard from "../components/dashboard/Dashboard";
import Account from "../components/account/Account";
import Settings from "../components/settings/Settings";
import Login from "../components/login/Login";
import Navbar from "../components/navbar/Navbar";
import NewOrder from "../components/orders/new/NewOrder";
import Register from "../components/register/Register";
import DueDate from "../components/orders/duedate/DueDate";
import OrderPrep from "../components/orders/orderprep/OrderPrep";
import ForgetPassword from "../components/forgetpassword/ForgetPassword";
import ResetPassword from "../components/forgetpassword/ResetPassword";
import AllOrdersTable from "../components/orders/allorders/AllOrdersTable";
import Search from "../components/search/Search";
import ReadyOrders from "../components/orders/readyorders/ReadyOrders";
import OrderDetails from "../components/orders/readyorders/orderdetails/OrderDetails";
// Private Router
import PrivateRouter from "./PrivateRouter";
import Approval from "../components/approval/Approval";
import CargoList from "../components/cargo/CargoList";
import CargoContent from "../components/cargo/CargoContent";
import WorkshopDueDates from "../components/cargo/WorkshopDueDates";
import ShipmentDueDates from "../components/cargo/ShipmentDueDates";
import StockList from "../components/stock/StockList";
import NewStock from "../components/stock/NewStock";
import CostTable from "../components/costtable/CostTable";

const history = require("history").createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/reset/:id" component={ResetPassword} />
        <Route path="/forgot" component={ForgetPassword} />
        <Route exact path="/login" component={Login} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
};

const DefaultContainer = () => (
  <div>
    <Navbar />
    <PrivateRouter exact path="/" component={Dashboard} />
    <PrivateRouter exact path="/all-orders" component={AllOrdersTable} />
    <PrivateRouter exact path="/account" component={Account} />
    <PrivateRouter exact path="/settings" component={Settings} />
    <PrivateRouter exact path="/new-order" component={NewOrder} />
    <PrivateRouter exact path="/due-date" component={DueDate} />
    <PrivateRouter exact path="/order-prep" component={OrderPrep} />
    <PrivateRouter exact path="/approval" component={Approval} />
    <PrivateRouter exact path="/search" component={Search} />
    <PrivateRouter exact path="/ready-orders" component={ReadyOrders} />
    <PrivateRouter exact path="/cargo-list" component={CargoList} />
    <PrivateRouter
      exact
      path="/workshop-due-dates"
      component={WorkshopDueDates}
    />
    <PrivateRouter
      exact
      path="/shipment-due-dates"
      component={ShipmentDueDates}
    />
    <PrivateRouter exact path="/order-details/:id" component={OrderDetails} />
    <PrivateRouter exact path="/cargo-content/:id" component={CargoContent} />
    <PrivateRouter exact path="/stock-list" component={StockList} />
    <PrivateRouter exact path="/new-stock" component={NewStock} />
    <PrivateRouter exact path="/cost-table" component={CostTable} />
  </div>
);

export default AppRouter;
