var React = require('react');

export default function(props) {
  return (
    <html style={{width: "100%", height: "100%", overflow: "hidden"}}>
      <head>
        <script src="/gameplay.js" />
        <script dangerouslySetInnerHTML={{__html: props.game.code}} />
      </head>
      <body style={{width: "100%", height: "100%", margin: "0"}}>
        <canvas id="canvas" width="640" height="640" />
      </body>
    </html>
  );
}
