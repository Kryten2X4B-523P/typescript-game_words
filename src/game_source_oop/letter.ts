import * as PIXI from 'pixi.js'
import { WordGame } from './wordGame'
import { HumanControl } from './humanControl'

/*
define single letter
*/
export class Letter {
   //position at app instance
   private positionHeight = 0
   private positionWidth = 0

   //size backgroundSquare and letter
   private sizeSquare = this.getRandomSize().square
   private sizeLetter = this.getRandomSize().letter

   //item to render
   private container = new PIXI.Container()

   //app width, height with padding
   private APP_HEIGHT?: number
   private APP_WIDTH?: number

   //remove container
   private removeFromGame = false

   constructor() {
      this.APP_HEIGHT = WordGame.app.renderer.height - 60
      this.APP_WIDTH = WordGame.app.renderer.width - 60
   }

   /*
   generate place to spawn (//TODO uniq places)
   */
   setPositionBackgroundLetter() {
      //word cant be at top + padding from bottom
      const getHeightGame = Math.floor(Math.random() * this.APP_HEIGHT!)
      if (getHeightGame < 100) {
         this.setPositionBackgroundLetter() // reset method
         return
      }
      this.positionHeight = getHeightGame
      //word place with padding from right
      this.positionWidth = Math.floor(Math.random() * this.APP_WIDTH!)
   }

   /*
   generate place for letter where will fall down (//TODO uniq places)
   */
   setPositionFallingLetter() {
      this.positionHeight = 0
      //word place with padding from right
      this.positionWidth = Math.floor(Math.random() * this.APP_WIDTH!)
   }

   /*
   we store random numbers but if we will need same size of square with letter size we can easily change there
   */
   getRandomSize() {
      const getSize = Math.floor(Math.random() * 4) + 1
      switch (getSize) {
         case 1:
            return { letter: 16, square: 20 }
         case 2:
            return { letter: 24, square: 30 }
         case 3:
            return { letter: 28, square: 34 }
         default:
            return { letter: 35, square: 39 }
      }
   }

   /*
   make background square
   */
   makeBackgroundSquare(backGroundColor: number) {
      const square = new PIXI.Graphics()

      if (this.sizeSquare < this.sizeLetter) {
         this.sizeSquare = this.sizeSquare + 12
      }
      square.beginFill(backGroundColor)
      square.drawRect(0, 0, this.sizeSquare, this.sizeSquare)
      square.endFill()
      square.position.set(this.positionWidth, this.positionHeight)

      return square
   }

   /*
   make letter to background and render it
   */
   makeLetter(getWord: string, backGroundColor: number) {
      const backgroundSquare = this.makeBackgroundSquare(backGroundColor)

      const textStyle = new PIXI.TextStyle({
         fontFamily: 'Arial',
         fontSize: this.sizeLetter + 'px',
         fontWeight: 'bold',
         fill: 0xffffff
      })

      const text = new PIXI.Text(getWord, textStyle)
      text.anchor.set(0.5)
      text.position.set(
         this.positionWidth + this.sizeSquare / 2,
         this.positionHeight + this.sizeSquare / 2
      )

      this.container.addChild(backgroundSquare, text)
      this.container.addChild(text)

      WordGame.app.stage.addChild(this.container)
   }

   /*
   letter fall down
   */
   letterFallDown(speedOfFallingLetter: number) {
      const moveContainerDown = () => {
         if (HumanControl.gameIsRunning) {
            this.container!.y += 1
         }

         // Check if the container has reached the bottom of this.app
         const containerBottom = this.container!.y + this.container!.height
         const appBottom = WordGame.app.renderer.height

         // Check if the container has reached the desired position
         if (containerBottom < appBottom) {
            setTimeout(moveContainerDown, speedOfFallingLetter)
         } else {
            if (!this.removeFromGame) {
               HumanControl.setMessage('You lose, please press start button')
               WordGame.app.ticker.stop()
               HumanControl.newGame = true
            }
         }
      }

      setTimeout(moveContainerDown, speedOfFallingLetter)
   }

   removeLetterFromGame() {
      this.removeFromGame = true
      WordGame.app.stage.removeChild(this.container)
   }
}
