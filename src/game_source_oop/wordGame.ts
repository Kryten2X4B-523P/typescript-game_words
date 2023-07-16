import { Application } from 'pixi.js'
import { Letters } from './letters'
import { HumanControl } from './humanControl'

/*
game settings
*/
export class WordGame {
   static app: any
   private run = false
   private updateCounter = 0
   private speedOfFallingLetter = 30
   private updateDelay = 100
   private letters = new Letters()
   private scoreRef!: HTMLElement
   private buttonRef!: HTMLButtonElement
   private headlineRef!: HTMLElement

   constructor() {
      WordGame.app = new Application()
   }

   //main method
   async initialize(
      gameContainerRef: HTMLElement,
      scoreRef: HTMLElement,
      buttonRef: HTMLButtonElement,
      headlineRef: HTMLElement
   ) {
      if (!this.run) {
         this.run = true
         if (gameContainerRef) {
            WordGame.app.renderer.resize(
               gameContainerRef.clientWidth,
               gameContainerRef.clientHeight
            )
            gameContainerRef.appendChild(WordGame.app.view)
            this.scoreRef = scoreRef
            this.buttonRef = buttonRef
            this.headlineRef = headlineRef
         }

         this.setRandomBackgroundColor()
         this.startGameLoop()
      }
   }

   //change color of game
   setRandomBackgroundColor() {
      const red = Math.random() * 255
      const green = Math.random() * 255
      const blue = Math.random() * 255

      //8 bits represent the red component, the next 8 bits represent the green component, and last 8 bits represent the blue component
      //shifted to 8 bits
      const color = (red << 16) + (green << 8) + blue

      WordGame.app.renderer.backgroundColor = color
   }

   //initialize at start of game
   startGameLoop() {
      //place some words
      this.letters.initializeBackgroundLetter(3)

      WordGame.app.ticker.add(() => {
         this.update()
      })
   }

   //initialize at start of game
   resetGame() {
      WordGame.app = new Application()
      this.letters = new Letters()

      this.setRandomBackgroundColor()
      this.startGameLoop()
   }

   //animation
   update() {
      this.makeGameFaster()
      const humanControl = new HumanControl(this.letters)
      humanControl.initializeEventListeners(this.scoreRef, this.buttonRef, this.headlineRef)

      if (HumanControl.gameIsRunning) {
         this.updateCounter++
         if (this.updateCounter >= this.updateDelay) {
            this.updateCounter = 0

            this.letters.initializeBackgroundLetter(1)
            this.letters.initializeFallingLetter(this.speedOfFallingLetter)
         }
      }
   }

   //when you successful the game is harder
   makeGameFaster() {
      const getValueOfScore = +this.scoreRef.textContent!

      if (getValueOfScore < 0) {
         this.speedOfFallingLetter = 40
      }
      if (getValueOfScore > 0) {
         this.speedOfFallingLetter = 25
      }
      if (getValueOfScore > 15) {
         this.speedOfFallingLetter = 15
         this.updateDelay = 70
      }
      if (getValueOfScore > 35) {
         this.speedOfFallingLetter = 11
         this.updateDelay = 60
      }
      if (getValueOfScore > 45) {
         this.speedOfFallingLetter = 7
         this.updateDelay = 45
      }
   }

   //we can because this class is main and we dont need pass variable to constructors
   static getApp() {
      return WordGame.app
   }
}

export const singletonWordGame = new WordGame()
