import "react-hot-loader/patch";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

export default (app, hot) => () => {
  const root = document.querySelector("#root");
  const renderContent = () => {
    render((
      <AppContainer>
        <BrowserRouter>
          {app()}
        </BrowserRouter>
      </AppContainer>
    ), root);
  };

  renderContent();

  hot.accept(renderContent);
};
