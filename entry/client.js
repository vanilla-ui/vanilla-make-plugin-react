import "react-hot-loader/patch";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

const defaultRender = (vdom, root) => {
  render(vdom, root);
};

export default (app, hot) => () => {
  const renderContent = () => {
    const root = document.querySelector("#root");
    (app.render || defaultRender)((
      <AppContainer>
        <BrowserRouter>
          {app()}
        </BrowserRouter>
      </AppContainer>
    ), root);
  };

  if (process.env.NODE_ENV === "development") {
    document.addEventListener("DOMContentLoaded", renderContent);
  } else {
    renderContent();
  }

  hot.accept(renderContent);
};
