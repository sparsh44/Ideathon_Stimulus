import React from 'react'
import Image from 'next/image'

function MyAvatar() {
    return (
        <div className='relative h-10 w-10 rounded-full border-gray-300 bg-white'>
            <Image 
                layout='fill'
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />
        </div>
    )
}

export default MyAvatar