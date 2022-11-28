import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'

function Room() {
    return (
        <div>
            <ChatNavbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex justify-end w-4/5'>
                    <h1>Gopal</h1>
                </div>
            </div>
        </div>
    )
}

export default Room