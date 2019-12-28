function step() {
  if (Math.random() < 0.03) {
    new Ball({
      x: Math.random() * 640,
      y: 0,
    });
  }
  if (key('ArrowLeft') && player.x > 0) {
    player.x -= 8;
  }
  if (key('ArrowRight') && player.x < 640) {
    player.x += 8;
  }
}

function init() {
  player = new Player({x: 320, y: 630});
  score = 0;
}

class Player extends AbstractEntity {
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x - 80, this.y);
    ctx.lineTo(this.x + 80, this.y);
    ctx.stroke();

    ctx.font = "30px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 10, 30); 
  }
};

class Ball extends AbstractEntity {
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }
  step() {
    this.y += 8;
    if (this.x > player.x - 80 && this.x < player.x + 80 && this.y > 600) {
      score += 1;
      this.destroy();
    }
    if (this.y > 640) {
      this.destroy();
    }
  }
};
