_entityIdNext = 1;
_entities = {};

class AbstractEntity {
  constructor({x, y}) {
    if (new.target === AbstractEntity) {
      throw new TypeError("Cannot construct a new AbstractEntity directly. " +
        "You must define a new 'class MyThing extends AbstractEntity ...' " +
        "and then construct a new MyThing instead.");
    }
    if (typeof this.draw !== 'function') {
      throw new TypeError("Subclasses of AbstractEntity must implement a " +
        "draw(ctx) {...} method.");
    }
    if (typeof x !== 'number') {
      throw new TypeError(`x must be a number (got ${x} instead)`);
    }
    if (typeof y !== 'number') {
      throw new TypeError(`y must be a number (got ${y} instead)`);
    }

    this.x = x;
    this.y = y;

    this._entityId = _entityIdNext;
    ++_entityIdNext;
    _entities[this._entityId] = this;
  }

  get destroyed() {
    return !!_entities[this._entityId];
  }
  destroy() {
    delete _entities[this._entityId];
  }
};

function _step() {
  if (_paused) {
    return;
  }

  if (step) {
    step();
  }

  for (var entityId in _entities) {
    var entity = _entities[entityId];
    if (entity.step) {
      entity.step();
    }
  }

  _draw();
}

function _draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var entityId in _entities) {
    var entity = _entities[entityId];
    entity.draw(ctx);
  }
  if (_paused) {
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(`Paused (click to play)`, 320, 320);
    ctx.restore();
  }
}

function _onClick(event) {
  _paused = false;
}

function _onBlur(event) {
  _paused = true;
  _draw();
}

_keyIsDown = {
  /* arrow keys */
  "ArrowDown": false,
  "ArrowLeft": false,
  "ArrowRight": false,
  "ArrowUp": false,

  /* printable characters */
  "Backquote": false,
  "Backslash": false,
  "BracketLeft": false,
  "BracketRight": false,
  "Comma": false,
  "Digit0": false,
  "Digit1": false,
  "Digit2": false,
  "Digit3": false,
  "Digit4": false,
  "Digit5": false,
  "Digit6": false,
  "Digit7": false,
  "Digit8": false,
  "Digit9": false,
  "Equal": false,
  "KeyA": false,
  "KeyB": false,
  "KeyC": false,
  "KeyD": false,
  "KeyE": false,
  "KeyF": false,
  "KeyG": false,
  "KeyH": false,
  "KeyI": false,
  "KeyJ": false,
  "KeyK": false,
  "KeyL": false,
  "KeyM": false,
  "KeyN": false,
  "KeyO": false,
  "KeyP": false,
  "KeyQ": false,
  "KeyR": false,
  "KeyS": false,
  "KeyT": false,
  "KeyU": false,
  "KeyV": false,
  "KeyW": false,
  "KeyX": false,
  "KeyY": false,
  "KeyZ": false,
  "Minus": false,
  "Period": false,
  "Quote": false,
  "Semicolon": false,
  "Slash": false,

  /* control keys */
  "AltLeft": false,
  "AltRight": false,
  "Backspace": false,
  "CapsLock": false,
  "ContextMenu": false,
  "ControlLeft": false,
  "ControlRight": false,
  "Enter": false,
  "MetaLeft": false,
  "MetaRight": false,
  "ShiftLeft": false,
  "ShiftRight": false,
  "Space": false,
  "Tab": false,
}

function _onKeyDown(event) {
  if (_keyIsDown[event.code] !== undefined && !event.repeat) {
    _keyIsDown[event.code] = true;
  }
}

function _onKeyUp(event) {
  if (_keyIsDown[event.code] !== undefined && !event.repeat) {
    _keyIsDown[event.code] = false;
  }
}

function key(code) {
  var res = _keyIsDown[code];
  if (res === undefined) {
    throw new TypeError(`'${code}' is not a valid keycode. ` +
      `Valid keycodes are: ${Object.keys(_keyIsDown)}`);
  }
  return res;
}

window.addEventListener('load', (event) => {
  if (init) {
    init();
  }
  window.setInterval(_step, 30);
  window.addEventListener('keydown', _onKeyDown);
  window.addEventListener('keyup', _onKeyUp);
  window.addEventListener('click', _onClick);
  window.addEventListener('blur', _onBlur);
  _onBlur();
});

