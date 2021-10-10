import React from 'react'

export default function index() {

  const hitEnter= async function(e){
    e.preventDefault()
    // Submit data to Firebase backend
    // Update the rendered list in this page
    // a) Re-fetch the data
    // b) Find a way to just add omto the list now in a fake way. It'll be updated on reload later
  }

  return (
    <div>
      <form>
        <input type="text" ref={inputRef1} onKeyPress={hitEnter}/>

      </form>
    </div>
  )
}
