  
import React from "react";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Play from "./Play";
import Create from "./Create";


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
        </Switch>
      </BrowserRouter>
  );
};
export default AppRouter;