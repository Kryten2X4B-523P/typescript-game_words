import { Letter } from './letter'

/*
create a bunch of letter for a game with different behavior
*/
export class Letters {
   //the source of words for a game (at game these words can be showed)
   private alphabetSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

   //the source of word which are prepared for activation (at game these words are static at one place)
   private keyboardSource: string[] = []
   //the source of word which are active(at game these words fall down)
   private keyboardSourceActiveFalling: string[] = []
   //the source of instances
   private keyboardInstancesForDelete: {}[] = []

   //main method
   initializeBackgroundLetter(wordsToRenders: number) {
      for (let i = 0; i < wordsToRenders; i++) {
         if (this.alphabetSource.length !== 0) {
            const letter = new Letter()
            letter.setPositionBackgroundLetter()
            letter.makeLetter(this.getRandomUniqWordForBackGround(letter), 0x7d7d7d)
         }
      }
   }

   //main method
   initializeFallingLetter(speedOfFallingLetter: number) {
      if (this.keyboardSource.length !== 0) {
         const letter = new Letter()
         letter.setPositionFallingLetter()
         letter.makeLetter(this.getRandomUniqWordForFalling(letter), 0x000000)
         letter.letterFallDown(speedOfFallingLetter)
      }
   }

   /*
   get word from choosen  source
   */
   getRandomUniqWord(source: string[]) {
      const wordIndex = Math.floor(Math.random() * source.length) //(count from zero to length -1)
      const word = source[wordIndex]

      return word
   }

   /*
   get word from source from alphabet source and then place it to keboardSource which is used for fallen words
   */
   getRandomUniqWordForBackGround(letter: Letter) {
      const word = this.getRandomUniqWord(this.alphabetSource)
      this.alphabetSource = this.alphabetSource.filter((arrWord) => {
         return arrWord !== word
      })
      this.keyboardSource.push(word)
      this.keyboardInstancesForDelete.push({ key: word, letter })
      return word
   }

   /*
   get uniq word from keyboard source, store active value for keypress
   */
   getRandomUniqWordForFalling(letter: Letter) {
      const word = this.getRandomUniqWord(this.keyboardSource)
      this.keyboardSource = this.keyboardSource.filter((arrWord) => {
         return arrWord !== word
      })
      this.keyboardSourceActiveFalling.push(word)
      this.keyboardInstancesForDelete.push({ key: word, letter })
      return word
   }

   /*
   key pressed, remove from falling, save word back to source
   */
   removeFallingWord(word: string) {
      this.keyboardSourceActiveFalling = this.keyboardSourceActiveFalling.filter((arrWord) => {
         return arrWord !== word
      })
      this.alphabetSource.push(word)
   }

   /*
   remove letter from game
   */
   removeUniqInstanceOfLetter(word: string) {
      this.keyboardInstancesForDelete = this.keyboardInstancesForDelete.filter((arrWord: any) => {
         if (arrWord.key === word) {
            arrWord.letter.removeLetterFromGame()
            arrWord.key = ''
         }
         return arrWord.key !== word
      })
   }

   getKeyboardSourceActiveFalling() {
      return this.keyboardSourceActiveFalling
   }
}
