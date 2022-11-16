import React from 'react'
// import logo from '../assets/unite.png'
import logo from '../assets/circular_favicon_light.png'
import Image from 'next/image'
import SidebarRow from '../components/SidebarRow'
import Community from '../assets/Community'

function Sidebar() {
    return (
        <div className='col-span-2 flex flex-col'>
            <div className='flex hover:text-lg ml-2  cursor-pointer items-start space-x-2 rounded-full px-2 py-1'>
                <Image
                    objectFit='contain'
                    src={logo}
                    width={80}
                    height={80}
                    style={{ borderRadius: 50 }}
                />
            </div>
            <div className='m-5'>
                {
                    Community.map((e) => (
                        <SidebarRow avatar={e.image} title={e.title} />
                    ))
                }
            </div>
        </div>

    )
}

export default Sidebar