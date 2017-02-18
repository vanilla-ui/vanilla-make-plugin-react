import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

export default app => () => {
  render((
    <BrowserRouter>
      {app()}
    </BrowserRouter>
  ), document.querySelector("#root"));
};
