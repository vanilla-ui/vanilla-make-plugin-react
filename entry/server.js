import express from "express";
import { renderToString } from "react-dom/server";

export default app => ({ config, manifest }) => {
  const server = express();

  server.use((req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title></title>
          <link rel="stylesheet" href="${manifest["app.css"]}" />
        </head>
        <body>
          <div id="app">${renderToString(app())}</div>
          <script src="${manifest["app.js"]}"></script>
          <script>main.default();</script>
        </body>
      </html>
    `);
  });

  server.listen(config.bind.server.port, config.bind.server.host);
};
