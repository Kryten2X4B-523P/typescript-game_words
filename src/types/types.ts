import { ReactNode } from 'react'

export type ChildrenType = {
   children: ReactNode
}

export type ChildrenProps = {
   children: ReactNode & { props: any }
}

export interface PropIsStrings {
   [prop: string]: string
}

export interface PropIsNumbers {
   [prop: string]: number
}

export interface ErrorResponse extends Error {
   response: Response & { data: string & { messageId: string } }
   request: Request
}
