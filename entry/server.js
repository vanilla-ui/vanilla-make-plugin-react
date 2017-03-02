import Koa from "koa";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { AppContainer } from "react-hot-loader";

import HTML from "../components/html";

const DOCTYPE = "<!DOCTYPE html>";

const defaultRender = vdom => ({ html: renderToString(vdom) });
const defaultInject = html => html;

export default app => ({ config, manifest }) => {
  const server = new Koa();

  server.use(async (ctx) => {
    const router = {};

    const content = await (app.render || defaultRender)((
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
      <HTML manifest={manifest} head={head} content={content.html} />
    ));

    ctx.body = (app.inject || defaultInject)(html, content);
  });

  server.listen(config.bind.server.port, config.bind.server.host);
};
