import { Letters } from './letters'
import { WordGame } from './wordGame'

export class HumanControl {
   private scoreRef!: HTMLElement
   private static headlineRef: HTMLElement
   public static gameIsRunning = false
   public static newGame = true
   private letters: Letters

   constructor(letters: Letters) {
      this.letters = letters
   }

   initializeEventListeners(
      scoreRef: HTMLElement,
      buttonRef: HTMLButtonElement,
      headlineRef: HTMLElement
   ) {
      window.addEventListener('keydown', this.handleKeyDown)
      buttonRef.addEventListener('click', this.startStopButton)
      this.scoreRef = scoreRef
      HumanControl.headlineRef = headlineRef
      HumanControl.newGame = false
   }

   handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key

      const isAlphabetKey = /^[A-Za-z]$/.test(key)

      if (!event.defaultPrevented) {
         event.preventDefault()
         if (isAlphabetKey) {
            const ifKeyExistInActiveArr = this.letters
               .getKeyboardSourceActiveFalling()
               .includes(key.toUpperCase())

            if (ifKeyExistInActiveArr) {
               this.letters.removeFallingWord(key.toUpperCase())
               this.letters.removeUniqInstanceOfLetter(key.toUpperCase())

               this.scoreCount(1)
            } else {
               this.scoreCount(-2)
            }
         }
      }
   }

   scoreCount(add: number) {
      const getValueOfScore = +this.scoreRef.textContent!
      const addScore = getValueOfScore + add

      if (addScore >= 50) {
         HumanControl.setMessage('You win, please press start button')
         WordGame.app.ticker.stop()
         HumanControl.newGame = true
      }
      this.scoreRef.textContent = '' + addScore
   }

   startStopButton() {
      if (HumanControl.newGame) {
         HumanControl.newGame = false
         HumanControl.gameIsRunning = true
         window.location.reload()
      } else {
         if (HumanControl.gameIsRunning) {
            WordGame.app.ticker.stop()
         } else {
            WordGame.app.ticker.start()
         }

         HumanControl.gameIsRunning = !HumanControl.gameIsRunning
      }
   }

   static setMessage(message: string) {
      HumanControl.headlineRef.textContent = message
   }
}
