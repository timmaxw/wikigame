var React = require('react');

export default function(props) {
  const loadScript = `
    window.addEventListener('load', (event) => {
      document.getElementById('iframe').contentWindow.focus();
    });
  `;
  return (
    <html>
      <head>
        <title>WikiGame {props.game.gid}</title>
        <script dangerouslySetInnerHTML={{__html: loadScript}} />
      </head>
      <body>
        <iframe id="iframe" width="640" height="640" src={`/game/${props.game.gid}/play`} />
        <p>{props.game.instructions}</p>
      </body>
    </html>
  );
}

