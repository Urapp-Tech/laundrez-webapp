import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DryCleaning from "./services-pages/DryCleaning";

export default function Services() {
    return (
        <Switch>
            <Redirect
                exact={true}
                from="/services"
                to="/services/drycleaning"
            />
            <Route path="/services/drycleaning" component={DryCleaning} />
        </Switch>
    )
}   
