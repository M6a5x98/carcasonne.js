class Game {
  /**
   *
   * @param {HTMLCanvasElement} canvas The canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 700;
    this.canvas.height = 500;
    this.ctx = canvas.getContext("2d");
  }
  /**
   *
   * @param {{tileNumber:number; X:number; Y:number; direction:number}} tile An object containing the number of the tile, the coords of the tile and its direction
   */
  placeTile(tile) {
    const mappedTile = new Image(102, 102);
    mappedTile.src = "../img/" + tile["tileNumber"] + ".png";
    mappedTile.onload = () => {
      this.ctx.save();
      this.ctx.translate(
        tile["X"] + mappedTile.width / 2,
        tile["Y"] + mappedTile.height / 2
      );
      this.ctx.rotate(tile["direction"] * (Math.PI / 180));
      this.ctx.drawImage(
        mappedTile,
        -mappedTile.width / 2,
        -mappedTile.height / 2
      );
      this.ctx.restore();
    };
  }
}
