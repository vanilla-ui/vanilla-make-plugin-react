import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router";

export default app => () => {
  render((
    <BrowserRouter>
      {app()}
    </BrowserRouter>
  ), document.querySelector("#app"));
};
