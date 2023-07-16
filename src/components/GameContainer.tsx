import React, { useEffect, useRef, useState } from 'react'
import '../styles/game.scss'
import { useEffectOnce, useLocalStorage } from '@orgreact/env/dist/cjs/hooks'
import { singletonWordGame } from '../game_source_oop/wordGame'
import Button from '@mui/material/Button'

const ScoreBoard = (props: { scoreRef: React.MutableRefObject<null> }) => {
   return (
      <div className="scoreBoard">
         <div>Your score: </div>
         <div className="number" ref={props.scoreRef}>
            0
         </div>
      </div>
   )
}

function GameContainer() {
   const gameContainerRef = useRef(null)
   const buttonRef = useRef(null)
   const scoreRef = useRef(null)
   const headlineRef = useRef(null)

   useEffectOnce(() => {
      if (gameContainerRef.current) {
         singletonWordGame.initialize(
            gameContainerRef.current,
            scoreRef.current!,
            buttonRef.current!,
            headlineRef.current!
         )
      }

      return () => {}
   })

   return (
      <>
         <div className="headline">
            <h2 ref={headlineRef}></h2>
         </div>
         <div className="wrap-game">
            <div id="game-container" ref={gameContainerRef}></div>
            <div className="scoreBoard-container">
               <ScoreBoard scoreRef={scoreRef} />
               <div className="button">
                  <Button variant="contained" ref={buttonRef}>
                     Start/Stop
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default GameContainer
