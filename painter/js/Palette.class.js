// Classe Palette
class Palette {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");

    this.height = this.canvas.height;
    this.width = this.canvas.width;

    this.build();
  }

  build() {
    let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);

    gradient.addColorStop(0, "hsl(0,     100%,   50%)");
    gradient.addColorStop(0.2, "hsl(60,    100%,   50%)");
    gradient.addColorStop(0.4, "hsl(120,   100%,   50%)");
    gradient.addColorStop(0.6, "hsl(180,   100%,   50%)");
    gradient.addColorStop(0.8, "hsl(240,   100%,   50%)");
    gradient.addColorStop(1, "hsl(300,   100%,   50%)");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);

    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.6, "rgba(0,     0,   0, 0)");
    gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  getColor(x, y) {
    let colorData = this.ctx.getImageData(x, y, 1, 1).data;

    let red = colorData[0];
    let green = colorData[1];
    let blue = colorData[2];

    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  zoomColor(x, y) {
    const curseur = document.querySelector(".zoom");
    curseur.style.display = "block";
    curseur.style.top = y + "px";
    curseur.style.left = x + "px";
    curseur.style.backgroundColor = this.getColor(x, y);
  }
}
