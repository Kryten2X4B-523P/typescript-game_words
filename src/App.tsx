import React, { ReactElement } from 'react'
import './styles/app.scss'
import { BrowserRouter } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import Router from './routes/router'

interface AppProps {}

function App(props: AppProps): ReactElement {
   return (
      <BrowserRouter>
         <Layouts>
            <Router />
         </Layouts>
      </BrowserRouter>
   )
}

export default App
