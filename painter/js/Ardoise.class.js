// Classe Ardoise
class Ardoise {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");

    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.isDrawing = false;

    // Configuration
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.fillStyle = "#fff";

    this.build();
  }

  build() {
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // CHALLENGE BONUS : Sauvegarder le canavas dans une image
  save() {
    // get base64 image
    let data = this.canvas.toDataURL();
    // show image
    document.querySelector("#img-saved").src = data;

    // afficher le popup
    document.querySelector("#img-container").style.bottom = 0;
  }

  hideImgContainer() {
    document.querySelector("#img-container").style.bottom = "100%";
  }
}
