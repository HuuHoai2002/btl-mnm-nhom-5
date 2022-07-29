import React from "react";

import { Route, Switch } from "react-router-dom";
import ScrollToTop from "../components/scroll/ScrollToTop";
import AdminPage from "../pages/admin/AdminPage";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Watch from "../pages/watch/Watch";

const Routes = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={AdminPage} />

        <Route path="/:category/watch" component={Watch} />
        <Route path="/:category/search/:keyword" component={Catalog} />
        <Route path="/:category/:id" component={Detail} />
        <Route path="/:category" component={Catalog} />
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
