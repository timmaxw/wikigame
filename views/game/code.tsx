var React = require('react');

export default function(props) {
  return (
    <html>
      <head><title>WikiGame {props.game.gid} Code</title></head>
      <body>
        <iframe src={`/game/${props.game.gid}/play`} />
        <form method="post">
          <label htmlFor="instructions">Edit instructions:</label>
          <textarea name="instructions" defaultValue={props.game.instructions} />
          <label htmlFor="code">Edit code:</label>
          <textarea name="code" defaultValue={props.game.code} />
          <input type="submit" value="Save changes" />
        </form>
        <form method="post" action={`/game/${props.game.gid}/code/copy`}>
          <input type="submit" value="Make a copy of this game" />
        </form>
      </body>
    </html>
  );
}
