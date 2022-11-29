import Image from 'next/image'
import React from 'react'

function MessageContainer(props) {
    return (
        <div className='flex w-full' >
            <div className=' flex-shrink-0'>
                <Image
                    className='rounded-full mx-2'
                    height={30}
                    width={30}
                    src={props.profilePic}
                    alt="Profile Picture"
                />
            </div>

            <div>
                <p className='text-[0.65rem] px-[2px] pb-[2px] text-red-400'>{props.username}</p>
                <div className='flex items-end'>
                    <div className='px-3 py-2 rounded-lg w-fit text-white bg-red-400' >
                        <p>{props.message}</p>
                    </div>
                    <p className='text-[0.65rem] italic px-2 text-gray-500'>{new Date(props.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageContainer