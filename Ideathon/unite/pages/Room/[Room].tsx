import React from 'react'
import Sidebar from '../../components/Sidebar'
import ChatNavbar from '../../components/ChatNavbar'
import ChatBox from '../../components/ChatBox'
import ChatInput from '../../components/ChatInput'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

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
            <form className='fixed -bottom-5 z-50 w-full  flex py-5 border-1 border-gray-100'>
                <input
                    type="text"
                    className='flex-1  border-gray-300 focus:outline-none px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    placeholder='Enter message here...'
                />
                <button
                    type="submit"
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4  disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <PaperAirplaneIcon className='w-6 h-6' />
                </button>
            </form>
        </div>
    )
}

export default Room