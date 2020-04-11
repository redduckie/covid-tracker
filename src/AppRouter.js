import React from "react";
import { Switch, Route } from "react-router-dom";

//Views
import CountryStats from "./components/views/CountryStats/index";
import InfectionMap from "./components/views/Map/InfectionMap";

const AppRouter = () => {
  return (
    <Switch>
      <Route
        path="/CountryStats"
        render={props => <CountryStats {...props} />}
        exact
      />
      <Route path="/" component={InfectionMap} exact />
    </Switch>
  );
};

export default AppRouter;
