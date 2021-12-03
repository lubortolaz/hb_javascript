// Classe Stylo
class Stylo {
	constructor() {
		this.posX = 0;
		this.posY = 0;
		this.color = '#000';
		this.thickness = 7;
	}

	setColor(color) {
		this.color = color;
	}

	setThickness(px) {
		this.thickness = px;
	}

	stopDrawing(ardoise) {
		ardoise.isDrawing = false;
	}

	startDrawing(ardoise, x, y) {
		ardoise.isDrawing = true;
		ardoise.ctx.strokeStyle = this.color;
		ardoise.ctx.lineWidth = this.thickness;
		this.posX = x;
		this.posY = y;
	}

	draw(ardoise, toX, toY) {
		if (ardoise.isDrawing) {
			ardoise.ctx.beginPath();
			ardoise.ctx.moveTo(this.posX,this.posY);
			ardoise.ctx.lineTo(toX,toY);
			ardoise.ctx.stroke();
			this.posX = toX;
			this.posY = toY;
		}
	}

}
