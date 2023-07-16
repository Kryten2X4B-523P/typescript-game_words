import { useEventListener } from '@orgreact/env/dist/cjs/hooks'
import React, { ReactElement } from 'react'

interface LayoutsProps {
   children: ReactElement
}

export default function Layouts(props: LayoutsProps): ReactElement {
   const resize = () => {
      window.location.reload()
   }
   useEventListener('resize', resize)

   return <div className="">{props.children}</div>
}
