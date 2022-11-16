import React from 'react'
import Image from 'next/image'

function SidebarRow({ avatar, title }) {
    return (
        <div className=' flex hover:text-lg cursor-pointer items-start item-center space-x-2 rounded-full px-4 py-3 hover:bg-gray-100 transition-all duration-200'>
            <Image
                className=' mr-2'
                objectFit='contain'
                src={avatar}
                width={40}
                height={40}
                style={{ borderRadius: 50 }}
            />
            <p className='self-center text-1xl font-bold hidden md:inline-flex'>{title}</p>
        </div>
    )
}

export default SidebarRow