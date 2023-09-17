import React from 'react'
import { IoAddSharp } from "react-icons/io5"

export default function AddTodoBtn(props) {


  return (
    <>
        <div
            onClick={props.AddTodo}
            className='group w-[65px] h-[65px] bg-slate-100 hover:cursor-pointer shadow-2xl hover:opacity-80 rounded-full flex justify-center items-center'
        >
            <IoAddSharp className='text-[45px] group-hover:text-[#FA7436]'/>
        </div>
    </>
    
  )
}
