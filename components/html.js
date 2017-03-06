import React, { Component, PropTypes } from "react";

const development = process.env.NODE_ENV === "development";

class HTML extends Component {
  static propTypes = {
    manifest: PropTypes.object.isRequired,
    head: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  };

  render() {
    const { manifest, head, content } = this.props;
    const attrs = head.htmlAttributes.toComponent();

    const scripts = [
      <script key="app" src={manifest["app.js"]} />,
      <script key="app-execute">{"app.default();"}</script>,
    ];

    return (
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html {...attrs}>
        <head>
          <meta charSet="UTF-8" />

          {head.meta.toComponent()}
          {head.title.toComponent()}
          {head.link.toComponent()}

          {manifest["app.css"] && (
            <link rel="stylesheet" href={manifest["app.css"]} />
          )}

          {development && scripts}
        </head>
        <body>
          {/* eslint-disable react/no-danger */}
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {/* eslint-enable react/no-danger */}

          {!development && scripts}
        </body>
      </html>
    );
  }
}

export default HTML;
