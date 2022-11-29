import { ArrowLeftIcon } from '@heroicons/react/outline'
import React from 'react'

function ChatNavbar(props) {
    return (
        <div className='flex p-5'>
            <div className='ml-5'>
                <ArrowLeftIcon className='w-6 h-6 cursor-pointer' />
            </div>
            <div className='flex px-3'>
                <h1 className=' self-center font-bold'>{props.room}</h1>
            </div>
        </div>
    )
}

export default ChatNavbar