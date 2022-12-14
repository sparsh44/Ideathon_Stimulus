import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'

function ChatNavbar(props) {
    const router=useRouter();
    return (
        <div className='flex p-5 absolute top-0 w-full z-50 bg-slate-200'>
            <div className='ml-5'>
                <ArrowLeftIcon onClick={()=>{router.back()}} className='w-6 h-6 cursor-pointer' />
            </div>
            <div className='flex px-3'>
                <h1 className=' self-center font-bold'>{props.room}</h1>
            </div>
        </div>
    )
}

export default ChatNavbar