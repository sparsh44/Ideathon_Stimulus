import { PaperAirplaneIcon } from '@heroicons/react/solid'
import React from 'react'

function ChatInput() {
    return (
        <form className='fixed -bottom-5 z-50 w-full  flex py-5 border-1 border-gray-100'>
            <input
                type="text"
                className='flex-1  border-gray-300 focus:outline-none px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='Enter message here...'
            />
            <button
                type="submit"
                className='bg-blue-400 text-white font-bold py-2 px-4 cursor-pointer'
            >
                <PaperAirplaneIcon className='w-6 h-6' />
            </button>
        </form>
    )
}

export default ChatInput