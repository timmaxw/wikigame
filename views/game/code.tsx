var React = require('react');

export default function(props) {
  const script = `
    window.addEventListener('keydown', (event) => {
      if (event.which == 83 && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
    window.addEventListener('load', (loadEvent) => {
      var textarea = document.getElementsByName('code')[0];
      textarea.addEventListener('keydown', (event) => {
        if (event.which == 9) {
          /* Ideally we'd insert spaces into the textarea, but this doesn't play
          nicely with undo. But at least we can prevent the focus switching. */
          event.preventDefault();
        }
      });
    });
  `;
  return (
    <html>
      <head>
        <title>WikiGame {props.game.gid} Code</title>
        <script dangerouslySetInnerHTML={{__html: script}} />
      </head>
      <body>
        <iframe width="640" height="640" src={`/game/${props.game.gid}/play`} />
        <form method="post" action={`/game/${props.game.gid}/code/save`}>
          <h5>Edit description:</h5>
          <p>
            <textarea name="instructions" defaultValue={props.game.instructions} style={{width: "640px", height: "50px"}} />
          </p>
          <h5>Edit code:</h5>
          <p>
            <textarea name="code" defaultValue={props.game.code} style={{width: "640px", height: "300px"}} />
          </p>
          <input id="submit" type="submit" value="Save changes" />
          <p>
            <a href={`/game/${props.game.gid}`}>URL to share this game</a>
          </p>
        </form>
      </body>
    </html>
  );
}
