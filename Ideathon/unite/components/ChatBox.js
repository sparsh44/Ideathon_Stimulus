import React from 'react'
import ChatInput from './ChatInput'
import Message from '../assets/Message'
import MessageContainer from './MessageContainer'

function ChatBox() {
    return (
        <div className='w-full'>
            {
                Message.map(e => (
                    <div className=' my-6'>
                        <MessageContainer username={e.username} message={e.message} profilePic={e.profilePic} created_at={e.created_at} />
                    </div>
                ))
            }

        </div>
    )
}

export default ChatBox