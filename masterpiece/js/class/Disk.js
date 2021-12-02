"use strict";

class Disk {
  constructor(posX = 0, posY = 0) {
    this.posX = posX;
    this.posY = posY;
    this.setColor();
    this.setRadius();

    //this.logs();
  }

  logs() {
    console.log(
      `Nouvel objet Disk avec les propriétés ${this.color} ${this.radius} ${this.posX} ${this.posY}`
    );
  }

  /**
   * Couleur aléatoire
   */
  setColor() {
    this.color = getRandomColor();
  }

  /**
   * Diamètre aléatoire
   */
  setRadius() {
    this.radius = getRandomInt(20, 95);
  }

  /**
   * Ajoute un cercle au canvas
   */
  draw() {
    //var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
