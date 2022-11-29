import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'
import ChatBox from '../../components/ChatBox'
import ChatInput from '../../components/ChatInput'

function Room() {
    return (
        <div className=' w-full'>
            <ChatNavbar room="WEB AND APP" />
            <div className='flex'>
                <Sidebar />
                <div className='ml-1 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto  pb-10 flex justify-start w-4/5'>
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