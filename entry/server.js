import Koa from "koa";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";

export default app => ({ config, manifest }) => {
  const server = new Koa();

  server.use((ctx) => {
    const router = {};

    const content = renderToString((
      <StaticRouter location={ctx.url} context={router}>
        {app()}
      </StaticRouter>
    ));

    const head = Helmet.rewind();

    if (router.url) {
      ctx.redirect(router.url);
      return;
    }

    ctx.body = `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    ${head.title.toString()}
    <link rel="stylesheet" href="${manifest["app.css"]}" />
  </head>
  <body>
    <div id="app">${content}</div>
    <script src="${manifest["app.js"]}"></script>
    <script>main.default();</script>
  </body>
</html>

    `.trim();
  });

  server.listen(config.bind.server.port, config.bind.server.host);
};
