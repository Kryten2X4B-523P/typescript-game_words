import React, { ReactElement } from 'react'
import GameContainer from './GameContainer'

interface GameProps {}

export default function Game(props: GameProps): ReactElement {
   return (
      <div className="w ">
         <GameContainer />
      </div>
   )
}
