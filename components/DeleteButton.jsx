import React from 'react'
import { Button } from './ui/button'

export default function DeleteButton({postID}) {

     async function  handleClick () {
        const post = await fetch('/api/post/'+postID);
        
    }


  return (
    <Button onClick={handleClick}>Delete</Button>
  )
}
