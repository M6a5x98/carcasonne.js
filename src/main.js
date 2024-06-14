export class Game {
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
    mappedTile.src = "./" + tile["tileNumber"] + ".png";
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
  /**
   *
   * @param {Array<{tileNumber: number; X: number; Y: number; direction:number;}>} tiles An array of object including the number of the tile, its coords and its direction
   * @returns {Array<{tileNumber: number; X: number; Y: number; direction: number;}>} The shuffled array given for input
   */
  #swapTiles(tiles) {
    // Code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = tiles.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [tiles[currentIndex], tiles[randomIndex]] = [
        tiles[randomIndex],
        tiles[currentIndex],
      ];
    }
    return tiles;
  }
  /**
   *
   * @param {Array<{tileNumber: number; X: number; Y: number; direction:number;}>} tilesArray An array of object including the number of the tile, its coords and its direction
   */
  initTiles(tilesArray) {
    const swappedTiles = this.#swapTiles(tilesArray);
    const stacksNumber = Math.floor(swappedTiles.length / 12);
    const stackingEndIndex =
      swappedTiles.length - (swappedTiles.length - 1 - stacksNumber * 12) - 1;
    const tilesToStack = swappedTiles.splice(0, stackingEndIndex);
    const tiles = [];
    for (let i = 0; i < tilesToStack.length; i += 12) {
      const tileStack = [];
      for (let j = 0; j < 12; j++) {
        tileStack.push(tilesToStack[i + j]);
      }
      tiles.push(tileStack);
    }
    const remainingTiles = swappedTiles.splice(0);
    tiles.push(remainingTiles);
    this.tiles = tiles;
  }
}
