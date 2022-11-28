import React from 'react'
import MyAvatar from './MyAvatar'
function SidebarRow({ avatar, title }) {
    return (
        <div className=' flex hover:text-lg cursor-pointer items-start item-center space-x-2 rounded-full px-3 py-3 hover:bg-slate-300 transition-all duration-200'>
            <div className=' shrink-0'>
                <MyAvatar />
            </div>
            <p className='self-center text-1xl font-bold hidden md:inline-flex'>{title}</p>
        </div>
    )
}

export default SidebarRow