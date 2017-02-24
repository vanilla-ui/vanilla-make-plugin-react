import Koa from "koa";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { AppContainer } from "react-hot-loader";

import HTML from "../components/html";

const DOCTYPE = "<!DOCTYPE html>";

export default app => ({ config, manifest }) => {
  const server = new Koa();

  server.use((ctx) => {
    const router = {};

    const content = renderToString((
      <AppContainer>
        <StaticRouter location={ctx.url} context={router}>
          {app()}
        </StaticRouter>
      </AppContainer>
    ));

    const head = Helmet.rewind();

    if (router.url) {
      ctx.redirect(router.url);
      return;
    }

    const html = DOCTYPE + renderToStaticMarkup((
      <HTML manifest={manifest} head={head} content={content} />
    ));

    ctx.body = html;
  });

  server.listen(config.bind.server.port, config.bind.server.host);
};
