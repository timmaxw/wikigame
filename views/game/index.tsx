var React = require('react');

export default function(props) {
  const script = `
    window.addEventListener('load', (event) => {
      document.getElementById('iframe').contentWindow.focus();
    });
  `;
  return (
    <html>
      <head>
        <title>WikiGame {props.game.gid}</title>
        <script dangerouslySetInnerHTML={{__html: script}} />
      </head>
      <body>
        <iframe id="iframe" width="640" height="640" src={`/game/${props.game.gid}/play`} />
        <h5>Description:</h5>
        <p>{props.game.instructions}</p>
        <h5>Code:</h5>
        <p>
          <textarea name="code" defaultValue={props.game.code} disabled style={{width: "640px", height: "300px"}} />
        </p>
        <form method="post" action={`/game/${props.game.gid}/fork`}>
          <input type="submit" value="Fork & edit this game" />
        </form>
      </body>
    </html>
  );
}

