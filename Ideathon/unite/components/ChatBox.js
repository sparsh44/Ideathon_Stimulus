import React from 'react'
import ChatInput from './ChatInput'
import Message from '../assets/Message'

function ChatBox() {
    return (
        <div className='w-full'>
            {
                Message.map( e => (
                    <div><h1>{e.message}</h1></div>
                ))
            }
        </div>
    )
}

export default ChatBox