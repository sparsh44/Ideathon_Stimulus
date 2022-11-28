import React from 'react'
// import logo from '../assets/unite.png'
import logo from '../assets/circular_favicon_light.png'
import Image from 'next/image'
import SidebarRow from '../components/SidebarRow'
import User from "../assets/User"

function Sidebar() {
    return (
        // <div className='col-span-2 flex flex-col fixed  w-1/5 overflow-auto'>
        <div className="ml-1 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto  pb-10 ">
            <div className='m-5'>
                {
                    User.map((e) => (
                        <SidebarRow avatar={e.image} title={e.name} />
                    ))
                }
            </div>
        </div>

    )
}

export default Sidebar