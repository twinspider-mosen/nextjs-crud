import { InputForm } from '@/components/InputForm'
import React from 'react'

export default function page() {
  return (
    <div className='p-10 space-y-8'>
   <div>
    <h1 className='text-4xl font-bold'>
        Create New Post
    </h1>
   </div>
        <InputForm/>
        </div>  

  )
}
