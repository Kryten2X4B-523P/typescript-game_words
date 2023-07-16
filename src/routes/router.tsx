import React, { lazy, ReactElement, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

interface RouterProps {}

export default function Router(props: RouterProps): ReactElement {
   const Home = lazy(() => import(/* webpackChunkName: "Home" */ './Home'))

   return (
      <Suspense fallback={<></>}>
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </Suspense>
   )
}
