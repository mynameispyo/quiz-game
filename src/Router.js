  
import React from "react";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Play from "./Play";
import Create from "./Create";
import Host from "./Host";
import Profile from "./Profile";


const AppRouter = () => {
  return (
      <BrowserRouter>
        <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/play">
                    <Play />
                </Route>
                <Route exact path="/create">
                    <Create />
                </Route>
                <Route exact path="/host">
                    <Host />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
        </Switch>
      </BrowserRouter>
  );
};
export default AppRouter;