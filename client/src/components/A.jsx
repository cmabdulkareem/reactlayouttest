import {signal} from '@preact/signals-react'
import B from './B'

export const message = signal("Hi from A")


function A() {
    // here we are declaring a signal variable which is a reactive variable
    // reactive variable is a variable which is updated when the value of the variable is changed
    // to update this variable we can assign new value to rollNumber.value
  return (
    <>
    <h1>Message : {message}</h1>
    <B />
    </>
  )
}

export default A
