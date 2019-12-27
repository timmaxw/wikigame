var React = require('react');

export default function(props) {
  return (
    <html>
      <head></head>
      <body>
        {props.game.code}
      </body>
    </html>
  );
}
