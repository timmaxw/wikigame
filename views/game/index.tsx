var React = require('react');

export default function(props) {
  return (
    <html>
      <head><title>WikiGame {props.game.gid}</title></head>
      <body>
        <iframe src={`/game/${props.game.gid}/play`} />
        <p>{props.game.instructions}</p>
      </body>
    </html>
  );
}

