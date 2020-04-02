import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
import { AuthActions } from "../../store/ducks/auth-duck";
import * as utils from "../../../_metronic/utils/utils";
export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    utils.clearStorage();
    dispatch(AuthActions.logout());
  }, [])

  return utils.getToken() ? <LayoutSplashScreen /> : <Redirect to="/auth" />;
}

//TODO: Logout functionality here

