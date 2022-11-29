import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'
import ChatBox from '../../components/ChatBox'
import ChatInput from '../../components/ChatInput'

function Room() {
    return (
        <div>
            <ChatNavbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex justify-start w-4/5'>
                    <ChatBox />
                </div>
            </div>
            <div className=' w-screen'>
            </div>
            <ChatInput />
        </div>
    )
}

export default Room