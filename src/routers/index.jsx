import React from "react";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import myRoutes from "./routers";
import PublicRoute from "../components/PublicRoute";

const Routers = () => (
  <BrowserRouter>
    <Switch>
      {myRoutes
        .filter((route) => route.active)
        .map((item, index) => {
          return (
            <PublicRoute
              key={index}
              exact
              path={item.path}
              component={item.component}
              context={item.context}
              permissions={item.permissions}
              routerProps={item.routerProps}
            />
          );
        })}

      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default Routers;
