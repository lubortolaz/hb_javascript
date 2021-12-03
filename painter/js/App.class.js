class App {
  constructor(selectorArdoise, selectorPalette) {
    this.ardoise = new Ardoise(selectorArdoise);
    this.palette = new Palette(selectorPalette);
    this.stylo = new Stylo();

    this.initEvents();
  }

  initEvents() {
    // enfoncement de la souris sur l'ardoise
    this.ardoise.canvas.addEventListener(
      "mousedown",
      function (event) {
        this.stylo.startDrawing(this.ardoise, event.offsetX, event.offsetY);
        console.log(this.ardoise.isDrawing);
      }.bind(this)
    );

    // mouvement au dessus de l'ardoise
    this.ardoise.canvas.addEventListener(
      "mousemove",
      function (event) {
        //event -> contient toutes les informations de cet événement
        this.stylo.draw(this.ardoise, event.offsetX, event.offsetY);
      }.bind(this)
    );

    // relachement de la souris (ou sorti de l'ardoise)
    this.ardoise.canvas.addEventListener(
      "mouseup",
      function (event) {
        this.stylo.stopDrawing(this.ardoise);
      }.bind(this)
    );
    this.ardoise.canvas.addEventListener(
      "mouseout",
      function (event) {
        this.stylo.stopDrawing(this.ardoise);
      }.bind(this)
    );

    // effacer l'ardoise
    document.querySelector("#eraser").addEventListener(
      "click",
      function () {
        this.ardoise.build();
      }.bind(this)
    );

    // changer d'epaisseur
    this.installClickThickness();

    // couleurs prédéfinies en dessous de l'ardoise : changement couleur du stylo
    this.installClickColor();

    // click sur la palette de couleur (selection dans le dégradé)
    this.palette.canvas.addEventListener(
      "mousedown",
      function (event) {
        //event.stopPropagation();
        if (event.button == 0) {
          let color = this.palette.getColor(event.offsetX, event.offsetY);
          this.stylo.setColor(color);
        }
      }.bind(this)
    );

    // mouvement au dessus de la palette de couleur
    this.palette.canvas.addEventListener(
      "mousemove",
      function (event) {
        this.palette.zoomColor(event.offsetX, event.offsetY);
      }.bind(this)
    );

    // cacher le color zoomer quand la souris sort de la palette
    this.palette.canvas.addEventListener(
      "mouseout",
      function (event) {
        document.querySelector(".zoom").style.display = "none";
      }.bind(this)
    );

    // CHALLENGE BONUS : Sauvegarder le dessin
    document.querySelector("#saver").addEventListener(
      "click",
      function () {
        this.ardoise.save();
      }.bind(this)
    );

    // cacher le popup
    document.querySelector("#img-container").addEventListener(
      "click",
      function (e) {
        this.ardoise.hideImgContainer();
      }.bind(this)
    );
  }

  //installer un gestionnaire d'événement aux 3 boutons d'épisseur
  installClickThickness() {
    let boutons = document.querySelectorAll(".epaisseur");
    for (let btn of boutons) {
      btn.addEventListener(
        "click",
        function (event) {
          let thickness = event.target.dataset.thickness;
          this.stylo.setThickness(thickness);
        }.bind(this)
      );
    }
  }

  //installer un gestionnaire d'événement aux couleurs prédéfinies
  installClickColor() {
    let boutons = document.querySelectorAll(".round");
    for (let btn of boutons) {
      btn.addEventListener(
        "click",
        function (event) {
          let color = event.target.dataset.color;
          this.stylo.setColor(color);
        }.bind(this)
      );
    }
  }
}
