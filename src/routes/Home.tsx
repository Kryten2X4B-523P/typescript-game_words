import Game from '../components/Game'
import React, { ReactElement } from 'react'
import '../styles/Header.scss'

interface HomeProps {}

export default function Home(props: HomeProps): ReactElement {
   return (
      <>
         <div className="header">
            <h1>Letter game in pixi.js</h1>
         </div>
         <div className="shadow"></div>
         <Game />
      </>
   )
}
