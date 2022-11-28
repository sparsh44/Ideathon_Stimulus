import { ArrowLeftIcon } from '@heroicons/react/outline'
import React from 'react'

function ChatNavbar() {
    return (
        <div className='flex p-5'>
            <div className=' w-1/5 ml-5'>
                <ArrowLeftIcon className='w-6 h-6 cursor-pointer ' />
            </div>
            <div className='flex w-4/5'>
                <h1 className=' self-center font-bold'>WEB AND APP</h1>
            </div>
        </div>
    )
}

export default ChatNavbar