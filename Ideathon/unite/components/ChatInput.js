import React from 'react'

function ChatInput() {
    return (
        <form className='fixed -bottom-5 z-50 w-full  flex py-5 border-1 border-gray-100'>
            <input
                type="text"
                className='flex-1 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='Enter message here...'
            />
            <button
                type="submit"
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
            >
                Send
            </button>
        </form>
    )
}

export default ChatInput